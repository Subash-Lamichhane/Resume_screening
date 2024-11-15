from fastapi import FastAPI, Form, File, UploadFile
from typing import List
import json
import os
from fastapi.responses import JSONResponse

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
    for file in files:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_names.append(file.filename)

    # Prepare the response
    response_data = {
        "jobTitle": jobTitle,
        "jobDescription": jobDescription,
        "degree": degree,
        "major": major,
        "experience": experience,
        "skills": skills_list,
        "uploaded_files": file_names
    }
    print(response_data)
    return JSONResponse(content=response_data)
