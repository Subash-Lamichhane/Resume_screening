# app.py
from fastapi import FastAPI, File, UploadFile
from PyPDF2 import PdfReader
from io import BytesIO
from predict import predict


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or use ["*"] to allow all origins (for testing only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app = FastAPI()

@app.post("/model/predict")
async def resume_screening(files: list[UploadFile] = File(...)):
    results = {}
    for file in files:
        if file.content_type != "application/pdf":
            results[file.filename] = {"error": "File is not a PDF"}
            continue

        pdf_reader = PdfReader(BytesIO(await file.read()))
        text = ""

        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

        predicted_category, category_probabilities = predict(text)
        results[file.filename] = {
            "predicted_category": predicted_category,
            "category_probabilities": str(category_probabilities)
        }

    return results

