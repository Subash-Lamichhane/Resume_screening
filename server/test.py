from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re
# Load a pre-trained model like Sentence-BERT (SBERT)
model = SentenceTransformer('all-MiniLM-L6-v2')  # A lightweight SBERT model
# Example job descriptions and resumes
job_description = "Account Manager, responsible for managing client relationships and driving revenue."
resume = "Experienced account manager with a strong track record of increasing client satisfaction and sales."
def preprocess_text(text):
    # Convert the text to lowercase
    text = text.lower()
    # Remove punctuation from the text
    text = re.sub('[^a-z]', ' ', text)
    # Remove numerical values from the text
    text = re.sub(r'\d+', '', text)
    # Remove extra whitespaces
    text = ' '.join(text.split())
    return text
def get_cosine_similarity(job_description, resume):
  # Get embeddings for both job description and resume
  job_embedding = model.encode([preprocess_text(job_description)])
  resume_embedding = model.encode([preprocess_text(resume)])
  # Compute cosine similarity
  similarity_score = cosine_similarity(job_embedding, resume_embedding)
  # Print the similarity score
  print(f"Cosine Similarity: {similarity_score[0][0]}")
  return similarity_score[0][0]
# get_cosine_similarity(job_description, resume)