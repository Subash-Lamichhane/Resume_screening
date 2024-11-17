# Backend Server Setup

This is a simple FastAPI backend server with basic routes. The project uses FastAPI and Uvicorn to serve API endpoints.

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn

## Installation

### Step 1: Clone the Repository

### Step 2: Create a Virtual Environment

```bash
python3 -m venv env
```

### Step 3: Activate the Virtual Environment

```bash
.\env\Scripts\activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the FastAPI Server

```bash
uvicorn app:app --reload
```