import spacy

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

def extractInformation(text):
    skills = get_skills(text)
    soft_skills = get_soft_skills(text)
    degree = get_degrees(text)
    major = get_major(text)
    
    # Combine all extracted information into a dictionary
    extracted_info = {
        "SKILLS": skills,
        "Soft Skills": soft_skills,
        "Degree": degree,
        "Major": major
    }
    
    return extracted_info

