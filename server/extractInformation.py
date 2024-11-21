import spacy
import re
# from dateutil import parser
# from dateutil.relativedelta import relativedelta
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

def get_email(text):
    """Extract email addresses using regular expression."""
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails =  re.findall(email_pattern, text)
    if not emails:
        return 'Not found'
    else:
        return emails[0]

def get_phone_number(text):
    """Extract phone numbers from a variety of countries using regular expressions."""
    # Define a more general phone number pattern
    phone_pattern = r'''(?:
        (?:(?:\+|00)\d{1,3})?       # Optional international prefix with country code (e.g., +1, +44, 00-33)
        [\s.-]?                      # Optional separator (space, dot, or hyphen)
        (?:\(?\d{1,4}\)?[\s.-]?)?    # Optional area code (may be in parentheses)
        \d{1,4}                      # First part of the local number
        [\s.-]?                      # Optional separator (space, dot, or hyphen)
        \d{1,4}                      # Second part of the local number
        [\s.-]?                      # Optional separator
        \d{1,4}                      # Optional third part of the local number (if present)
    )'''

    # Find all matches using the regex pattern
    matches = re.finditer(phone_pattern, text, re.VERBOSE | re.MULTILINE)

    # Extract and clean the matched phone numbers
    phone_numbers = []
    for match in matches:
        # Get the full matched phone number
        number = match.group().strip()
        # Remove any leading/trailing separators and clean up internal spaces
        number = ' '.join(number.split())
        # Only add if it's a valid number (contains at least 10 digits)
        if sum(c.isdigit() for c in number) >= 10:
            phone_numbers.append(number)

    if not phone_numbers:
        return 'Not found'
    else:
        return phone_numbers[0]


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
    email = get_email(text)
    phone_no = get_phone_number(text)
    (experience_years, experience_score) = get_experience(text, minExp)
    print("Email")
    print(email)
    print("Phone number")
    print(phone_no)
    # print(year)
    
    # Combine all extracted information into a dictionary
    extracted_info = {
        "SKILLS": skills,
        "SoftSkills": soft_skills,
        "Degree": degree,
        "Major": major,
        "Exp_Year": experience_years,
        "Exp_Score": experience_score,
        "Email": email,
        "Phone_No": phone_no
    }
    
    return extracted_info

