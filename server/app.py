from fastapi import FastAPI, Form, File, UploadFile
from typing import List
import json
import os
from fastapi.responses import JSONResponse
from test import get_cosine_similarity
from PyPDF2 import PdfReader
from io import BytesIO

app = FastAPI()

# Define the upload folder where you want to store the files
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload_resume")
async def upload_resume(
    jobTitle: str = Form(...),
    jobDescription: str = Form(...),
    degree: str = Form(...),
    major: str = Form(...),
    experience: str = Form(...),
    skills: str = Form(...),  # Skills will be received as a JSON string
    files: List[UploadFile] = File(...),  # This will handle multiple files
):
    # Parse the skills string as a JSON array
    try:
        skills_list = json.loads(skills)
    except json.JSONDecodeError:
        skills_list = []

    # Process the files
    file_names = []
    results = {}

    for file in files:
        if file.content_type != "application/pdf":
            results[file.filename] = {"error": "File is not a PDF"}
            continue

        # Read the file directly as bytes
        file_bytes = await file.read()

        # Use BytesIO for PyPDF2
        try:
            pdf_reader = PdfReader(BytesIO(file_bytes))
            text = ""

            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text()

            # Compute cosine similarity
            score = get_cosine_similarity(jobDescription, text)
            results[file.filename] = {"cosine_similarity_score": float(score)}
        except Exception as e:
            results[file.filename] = {"error": str(e)}

    # Prepare the response
    response_data = {
        "jobTitle": jobTitle,
        "jobDescription": jobDescription,
        "degree": degree,
        "major": major,
        "experience": experience,
        "skills": skills_list,
        "results": results,
    }

    return JSONResponse(content=response_data)
