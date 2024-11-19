from fastapi import FastAPI, Form, File, UploadFile
from typing import List
import json
import os
from fastapi.responses import JSONResponse
from numpy import ndarray
from test import get_cosine_similarity  # Assuming this is your similarity function
from PyPDF2 import PdfReader
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from extractInformation import extractInformation
from model.skillScore import get_skills_score
from model.degreeScore import calculate_degree_score
app = FastAPI()
import pandas as pd

# Enable CORS for communication between the frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the upload folder for storing files (if needed)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload_resume")
async def upload_resume(
    jobTitle: str = Form(...),
    jobDescription: str = Form(...),
    degree: str = Form(...),
    major: str = Form(...),
    experience: str = Form(...),
    skills: str = Form(...),  # Skills will be sent as a JSON string
    files: List[UploadFile] = File(...),  # Handling multiple files
):
    try:
        # Parse the skills string as a JSON array
        skills_list = json.loads(skills)
    except json.JSONDecodeError:
        return JSONResponse(
            status_code=400,
            content={"error": "Invalid skills format. Ensure it's a valid JSON array."},
        )

    results = {}

    # Process each uploaded file
    for file in files:
        if file.content_type != "application/pdf":
            results[file.filename] = {"error": "File is not a PDF"}
            continue

        try:
            # Read the file bytes
            file_bytes = await file.read()

            # Extract text using PyPDF2
            pdf_reader = PdfReader(BytesIO(file_bytes))
            text = "".join(page.extract_text() for page in pdf_reader.pages)

            # Calculate cosine similarity
            score = get_cosine_similarity(jobDescription, text)

            # Extract information from the resume
            info = extractInformation(text)

            # Convert extracted SKILLS into a format suitable for processing
            df_resume = pd.DataFrame({
                "SKILLS": [", ".join(info["SKILLS"])]  # Combine skills into a single comma-separated string
            })

            # Calculate skills score
            skills_score_result = get_skills_score(df_resume, {
                "jobTitle": jobTitle,
                "jobDescription": jobDescription,
                "degree": degree,
                "major": major,
                "experience": experience,
                "skills": ", ".join(skills_list)  # Convert list of skills to comma-separated string
            })

            # Calculate degree score
            degree_score_result = calculate_degree_score(info["Degree"], degree)

            # Print debugging information
            print("Information: ", info)
            print("Skill score: ", skills_score_result)
            print("Degree score: ", degree_score_result)

            # Add results for this file
            results[file.filename] = {
                "cosine_similarity_score": float(score),
                "skills_score": (
                    skills_score_result.tolist() if isinstance(skills_score_result, ndarray)
                    else float(skills_score_result) if isinstance(skills_score_result, (float, int))
                    else skills_score_result
                ),
                "degree_score": (
                    degree_score_result.tolist() if isinstance(degree_score_result, ndarray)
                    else float(degree_score_result) if isinstance(degree_score_result, (float, int))
                    else degree_score_result
                ),
            }

        except Exception as e:
            results[file.filename] = {"error": str(e)}

    # Prepare the response data
    response_data = {
        "jobTitle": jobTitle,
        "jobDescription": jobDescription,
        "degree": degree,
        "major": major,
        "experience": experience,
        "skills": skills_list,
        "results": results,
    }

    # Return JSON response
    return JSONResponse(content=response_data)