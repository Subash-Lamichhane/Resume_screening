# app.py
from fastapi import FastAPI, File, UploadFile
from PyPDF2 import PdfReader
from io import BytesIO

app = FastAPI()

@app.post("/model/predict")
async def resume_screening(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "File is not a PDF"}

    pdf_reader = PdfReader(BytesIO(await file.read()))
    text = ""

    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    
    print(text)

    return {"text": text}
