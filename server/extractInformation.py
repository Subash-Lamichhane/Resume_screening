import spacy
from dateutil import parser
from dateutil.relativedelta import relativedelta
from datetime import datetime
from model.experienceScore import get_experience_score

nlp = spacy.load("en_core_web_lg")
skill_pattern_path = "jz_skill_patterns.jsonl"
ruler = nlp.add_pipe("entity_ruler", before="ner")
ruler.from_disk(skill_pattern_path)
nlp.pipe_names

def get_skills(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            subset.append(ent.text)
    myset.append(subset)
    return list(set(subset))

def get_soft_skills(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if ent.label_ == "SOFT_SKILL":
            subset.append(ent.text)
    myset.append(subset)
    return list(set(subset))

def get_degrees(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if "DEGREE" in ent.label_:
            subset.append(ent.label_)
    myset.append(subset)
    return list(set(subset))


def get_major(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if 'MAJOR' in ent.label_:
            subset.append(ent.text)
    myset.append(subset)
    return list(set(subset))

###



# Load SpaCy model and add the date patterns for experience extraction
def create_nlp_for_experience():
    # nlp = spacy.load("en_core_web_lg")

    # Define month names and patterns for matching date ranges
    VALID_MONTH_NAMES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
    patterns = [
        {"label": "DATE", "pattern": [{"SHAPE": "dd/dddd"}, {"TEXT": "-"}, {"SHAPE": "dd/dddd"}]},  # e.g. 05/2015 - 06/2017
        {"label": "DATE", "pattern": [{"SHAPE": "dd/dddd"}, {"TEXT": "-"}, {"LOWER": "present"}]},  # e.g. 10/2020 - Present
        {"label": "DATE", "pattern": [{"SHAPE": "dd/dddd"}, {"TEXT": "-"}, {"LOWER": "current"}]},  # e.g. 10/2020 - current
        {"label": "DATE", "pattern": [{"LOWER": {"in": VALID_MONTH_NAMES}}, {"TEXT": {"REGEX": "^\d{4}$"}}, {"TEXT": "-"}, {"LOWER": {"in": ["current", "present"]}}]},  # e.g. Jan 2020 - current
        {"label": "DATE", "pattern": [{"LOWER": {"in": VALID_MONTH_NAMES}}, {"TEXT": {"REGEX": "^\d{4}$"}}, {"TEXT": "-"}, {"LOWER": {"in": ["current", "present"]}}]},  # e.g. March 2018 - Present
        {"label": "DATE", "pattern": [{"LOWER": {"in": VALID_MONTH_NAMES}}, {"TEXT": {"REGEX": "^\d{4}$"}}, {"TEXT": "-"}, {"LOWER": {"in": VALID_MONTH_NAMES}}, {"TEXT": {"REGEX": "^\d{4}$"}}]},  # e.g. Jun 2016 - Sep 2016
        {"label": "DATE", "pattern": [{"SHAPE": "dddd"}, {"TEXT": "-"}, {"LOWER": {"in": ["current", "present"]}}]}  # e.g. 2020 - current
    ]

    # ruler = nlp.add_pipe("entity_ruler", before='ner')
    ruler.add_patterns(patterns)

    return nlp



# Function to extract experience (dates)
def get_experience(text, minExp):
    # Example usage
    nlp = create_nlp_for_experience()
    # resume_text = "I worked at ABC Corp from Jan 2020 - present and at XYZ Ltd from Mar 2015 - Dec 2019."

    experience_years, experience_score = get_experience_score(text, nlp, int(minExp))
    # print("jere")
    # print(experience_score)
    return experience_years, experience_score



def extractInformation(text, minExp):
    skills = get_skills(text)
    soft_skills = get_soft_skills(text)
    degree = get_degrees(text)
    major = get_major(text)
    (experience_years, experience_score) = get_experience(text, minExp)
    # print(year)
    
    # Combine all extracted information into a dictionary
    extracted_info = {
        "SKILLS": skills,
        "SoftSkills": soft_skills,
        "Degree": degree,
        "Major": major,
        "Exp_Year": experience_years,
        "Exp_Score": experience_score
    }
    
    return extracted_info

