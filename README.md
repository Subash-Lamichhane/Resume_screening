# ResuMatch: Automated Resume Screening System

## Overview

ResuMatch is an advanced automated resume screening system that leverages artificial intelligence and natural language processing to efficiently match resumes with job descriptions. The project aims to streamline the recruitment process by providing accurate and objective resume evaluation.

## Key Features

- **Automated Resume Parsing**: Extracts key information from resumes using advanced NLP techniques
- **Semantic Matching**: Utilizes cosine similarity to compare resumes with job descriptions
- **Multilayer Processing**:
  - Text preprocessing
  - Resume segmentation
  - Entity extraction
  - Semantic similarity scoring
- **User-Friendly Interface**: React-based frontend for easy resume and job description uploads
- **Robust Backend**: FastAPI-powered processing engine

## Technologies Used

- **Frontend**: React
- **Backend**: FastAPI
- **NLP Library**: spaCy
- **Machine Learning**:
  - Sentence Transformers
  - Named Entity Recognition (NER)
- **Text Processing**:
  - Cosine Similarity
  - TF-IDF Vectorization

## Project Highlights

- Processes a dataset of 2,000 unique skills
- Employs rule-based entity recognition
- Generates compatibility scores for resumes
- Achieved 0.6991 correlation with human evaluation

## Installation

### Prerequisites

- **Frontend**:
  - Node.js (with Yarn)
- **Backend**:
  - Python 3.7+
  - FastAPI
  - Uvicorn

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ResuMatch
```

### Step 2: Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn run dev
    ```

### Step 3: Backend Server Setup

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Create a virtual environment:

    ```bash
    python3 -m venv env
    ```

3. Activate the virtual environment:

    - On Windows:

      ```bash
      .\env\Scripts\activate
      ```

    - On macOS/Linux:

      ```bash
      source env/bin/activate
      ```

4. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Run the FastAPI server:

    ```bash
    uvicorn app:app --reload
    ```

## Usage

1. Open the **Frontend**:
   - Navigate to `http://localhost:3000` in your browser (assuming the frontend is running).

2. Upload Resumes:
   - Use the provided UI to upload one or more resumes.

3. Specify Job Description:
   - Input or upload the desired job description for matching.

4. View Results:
   - The system will process the resumes and job description, returning a ranked list of resumes based on their compatibility scores.

## Limitations

- Limited entity recognition for complex resume formats
- Dependence on predefined rules
- Language limitations (primarily English)

## Future Enhancements

- Domain-specific entity recognition
- Advanced NLP models for contextual understanding
- Semantic search capabilities
- Dynamic scoring mechanisms

## Contributors

- Rajesh Adhikari
- Subash Lamichhane
- Sujan Koirala

## Acknowledgments

Special thanks to Samsung Innovation Campus (SIC) for the opportunity to develop this project.
