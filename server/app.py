from fastapi import FastAPI, Form, File, UploadFile
from typing import List
import json
import os
from fastapi.responses import JSONResponse
from test import get_cosine_similarity  # Assuming this is your similarity function
from PyPDF2 import PdfReader
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
            results[file.filename] = {"cosine_similarity_score": float(score)}

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
