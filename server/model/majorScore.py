from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
def major_present(major, description):
    """
    Check if a skill is present in the given description using word boundaries.
    """
    pattern = r"\b" + re.escape(major) + r"\b"
    return bool(re.search(pattern, description, re.IGNORECASE))

# Helper function to vectorize education majors
def vectorize_education(df_resume, target_job):
    """
    Convert applicant education majors into binary vectors based on the target job's education majors.
    """
    # Process target job education majors: split into a list
    target_job_majors = target_job['education_major'].lower().split(", ")

    # Initialize MultiLabelBinarizer with target job education majors
    mlb = MultiLabelBinarizer(classes=target_job_majors)

    # Generate binary education major vectors for each applicant's resume
    applicant_majors_vector = df_resume['major'].apply(
        # lambda x: [major.lower() for major in target_job_majors if major.lower() in map(str.lower, x)]
        lambda x: [major for major in target_job_majors if major_present(major,x)]
    )
    applicant_binary_vectors = mlb.fit_transform(applicant_majors_vector)

    return applicant_binary_vectors.tolist()

# Main function to calculate education similarity scores
def get_education_score(df_resume, target_job):
    """
    Calculate education similarity scores for each applicant compared to the target job.
    """
    # Vectorize education majors from resumes
    df_resume["education_vector"] = vectorize_education(df_resume, target_job)

    # Create a binary vector for target job education majors
    target_job_majors = target_job["education_major"].split(", ")
    target_job["education_vector"] = np.ones(len(target_job_majors))

    # Compute cosine similarity between target job vector and applicant vectors
    target_vector = np.array(target_job["education_vector"]).reshape(1, -1)
    applicant_vectors = np.array(df_resume["education_vector"].tolist())
    similarity_scores = cosine_similarity(target_vector, applicant_vectors)

    return similarity_scores
