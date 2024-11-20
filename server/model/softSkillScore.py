from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re

# Helper function to check if a skill is present in the resume description
def skill_present(skill, description):
    """
    Check if a skill is present in the given description using word boundaries.
    """
    pattern = r"\b" + re.escape(skill) + r"\b"
    return bool(re.search(pattern, description, re.IGNORECASE))

# Function to vectorize skills for applicants based on the target job's skills
def vectorize_skills(resume_texts, target_job):
    """
    Convert applicant skills into binary vectors based on target job skills.
    """
    # Process target job skills: remove '.js' extension and split into a list
    target_job_skills_text = target_job['softSkills'].replace('.js', '')
    target_job_skills = target_job_skills_text.lower().split(", ")

    # Initialize MultiLabelBinarizer with target job skills
    mlb = MultiLabelBinarizer(classes=target_job_skills)

    # Generate binary skill vectors for each applicant's resume
    applicant_skills_vector = resume_texts.apply(
        lambda x: [skill for skill in target_job_skills if skill_present(skill, x)]
    )
    applicant_binary_vectors = mlb.fit_transform(applicant_skills_vector)

    return applicant_binary_vectors.tolist()

# Main function to calculate skill similarity scores
def get_soft_skills_score(df_resume, target_job):
    """
    Calculate skill similarity scores for each applicant compared to the target job.
    """
    # Vectorize skills from resumes
    df_resume["skills_vector"] = vectorize_skills(df_resume["SoftSkills"], target_job)

    # Create a binary vector for target job skills
    target_job_skills = target_job["softSkills"].split(", ")
    target_job["skills_vector"] = np.ones(len(target_job_skills))

    # Compute cosine similarity between target job vector and applicant vectors
    target_vector = np.array(target_job["skills_vector"]).reshape(1, -1)
    applicant_vectors = np.array(df_resume["skills_vector"].tolist())
    similarity_scores = cosine_similarity(target_vector, applicant_vectors)

    # # Add similarity scores to the DataFrame
    # df_resume["skills_score"] = similarity_scores.flatten()

    return similarity_scores
