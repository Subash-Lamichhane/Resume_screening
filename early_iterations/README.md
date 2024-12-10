# Early Resume Category Predictor

## ⚠️ **Important Note: No Relevance to the Final Project**

This folder is **not relevant** to the final implementation of our project and can be ignored for practical purposes. However, it is retained here as an early experiment, showcasing exploratory work that may serve as a learning resource for others.

---

## Overview

This folder contains:

- A Jupyter Notebook (`.ipynb`) demonstrating the training and evaluation of various models to predict resume categories. The dataset used is the [Resume Dataset](https://www.kaggle.com) from Kaggle.
- A synthetic resume dataset (`.csv`) created for testing various resume formats within predefined categories.  
  **Note:** This synthetic dataset is of moderate quality and was not used in the final implementation of our project.

---

## Models Explored

This experiment involved training multiple models for resume category prediction, including:

### 1. **LSTM Model**
- Achieved **97.93% accuracy** on the validation set.
- Provided strong results in predicting resume categories.

### 2. **Other Machine Learning Models**
Several models from the scikit-learn library were trained and evaluated using the `OneVsRestClassifier` strategy. Below is a summary of their performance:

| Model                               | Training Accuracy | Test Accuracy  |
|-------------------------------------|-------------------|----------------|
| K-Nearest Neighbors                 | 91.98%            | 83.45%         |
| Logistic Regression                 | 100.00%           | 94.48%         |
| Support Vector Machine (SVC)        | 99.11%            | 94.48%         |
| Random Forest                       | 100.00%           | 96.55%         |

These results highlight the potential of these models for achieving high accuracy in resume category classification.

---

## Educational Value

This experiment, while exploratory, highlights:

- The process of developing and evaluating machine learning models for resume classification.
- Insights into preprocessing, feature extraction, and validation techniques specific to resume data.

---

## Why It Was Not Included in the Final Project

The final project, **ResuMatch: Automated Resume Screening System**, went beyond category prediction to focus on:

- Extracting key information from resumes (e.g., skills, experience, education).
- Comparing resumes to job descriptions using semantic similarity measures.
- Implementing advanced rule-based and transformer-based models (e.g., spaCy and sentence transformers).

The models trained here were limited to predicting resume categories and did not align with these broader objectives.

---

## Acknowledgment of Effort

Although this work did not contribute directly to the final project, it provided valuable learning opportunities and informed the development of more advanced techniques. It is shared here for reference and educational purposes.

---

## Disclaimer

The models and datasets in this folder are intended for exploratory and educational purposes. They may not represent best practices for production-level solutions.
