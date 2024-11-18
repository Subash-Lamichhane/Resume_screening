import re
#spacy
import spacy

import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer

from tqdm import tqdm
from sklearn.metrics.pairwise import cosine_similarity
# #gensim
# import gensim
# from gensim import corpora


#Data loading/ Data manipulation
import pandas as pd
import numpy as np

#nltk
# import re
# import nltk
# from nltk.corpus import stopwords
# from nltk.stem import WordNetLemmatizer
# nltk.download(['stopwords','wordnet'])

# #warning
# import warnings
# warnings.filterwarnings('ignore')

# nlp = spacy.load("en_core_web_lg")
# skill_pattern_path = "/content/jz_skill_patterns.jsonl"
# ruler = nlp.add_pipe("entity_ruler", before="ner")
# ruler.from_disk(skill_pattern_path)
# nlp.pipe_names

# # Load a pre-trained sentence transformer model
MODEL_NAME = 'all-MiniLM-L12-v2'
model = SentenceTransformer(MODEL_NAME)

# def get_skills(text):
#     doc = nlp(text)
#     myset = []
#     subset = []
#     for ent in doc.ents:
#         if ent.label_ == "SKILL":
#             subset.append(ent.text)
#     myset.append(subset)
#     return list(set(subset))

# def get_soft_skills(text):
#     doc = nlp(text)
#     myset = []
#     subset = []
#     for ent in doc.ents:
#         if ent.label_ == "SOFT_SKILL":
#             subset.append(ent.text)
#     myset.append(subset)
#     return list(set(subset))

# def get_degrees(text):
#     doc = nlp(text)
#     myset = []
#     subset = []
#     for ent in doc.ents:
#         if "DEGREE" in ent.label_:
#             subset.append(ent.label_)
#     myset.append(subset)
#     return list(set(subset))


# def get_major(text):
#     doc = nlp(text)
#     myset = []
#     subset = []
#     for ent in doc.ents:
#         if 'MAJOR' in ent.label_:
#             subset.append(ent.text)
#     myset.append(subset)
#     return list(set(subset))

# def segment_text(text, patterns):
#     segmented_sections = {category: "" for category in section_keywords.keys()}

#     # Split the text into lines for easier processing
#     lines = text.splitlines()
#     current_section = None

#     for line in lines:
#         line = line.strip().upper()  # Normalize to uppercase and strip whitespace

#         # Check if the line matches any of the section headers
#         matched = False
#         for category, pattern in patterns:
#             if pattern.search(line):
#                 current_section = category
#                 matched = True
#                 break

#         # If a match was found, add the rest of the line to the corresponding section
#         if matched:
#             segmented_sections[current_section] += line + "\n"
#         elif current_section:
#             # Otherwise, continue appending the content to the current section
#             segmented_sections[current_section] += line + "\n"

#     return segmented_sections



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

def predict(job_description,text):

    section_keywords = {
    "PROFILE": [
        r"\bPROFILE\b", r"\bSUMMARY\b", r"\bABOUT ME\b", r"\bPERSONAL PROFILE\b", r"\bPERSONAL SUMMARY\b",
    ],
    "EXPERIENCE": [
        r"\bEXPERIENCE\b", r"\bWORK EXPERIENCE\b", r"\bPROFESSIONAL EXPERIENCE\b", r"\bRELEVANT WORK EXPERIENCE\b",
        r"\bJOB HISTORY\b", r"\bEMPLOYMENT HISTORY\b",
    ],
    "EDUCATION": [
        r"\bEDUCATION\b", r"\bEDUCATIONAL BACKGROUND\b", r"\bACADEMIC HISTORY\b",
    ],
    "SKILLS": [
        r"\bSKILLS\b", r"\bTECHNICAL SKILLS\b", r"\bPROGRAMMING SKILLS\b", r"\bABILITIES\b", r"\bCOMPETENCIES\b",
        r"\bEXPERTISE\b",
    ],
    "PROJECTS": [
        r"\bPROJECTS\b", r"\bPORTFOLIO\b",
    ],
    "CERTIFICATIONS": [
        r"\bCERTIFICATIONS\b", r"\bCREDENTIALS\b", r"\bACCREDITATIONS\b",
    ],
    "AWARDS": [
        r"\bAWARDS\b", r"\bHONORS\b", r"\bACHIEVEMENTS\b",
    ],
    "INTERESTS": [
        r"\bINTERESTS\b", r"\bHOBBIES\b", r"\bACTIVITIES\b",
    ],
    }
    # Flatten the section_keywords dictionary into a list of regex patterns
    patterns = [(category, re.compile("|".join(keywords))) for category, keywords in section_keywords.items()]
    # Segment the text into categories
    get_cosine_similarity(job_description, text)
    # segmented_text = segment_text(text, patterns)
    return 0



