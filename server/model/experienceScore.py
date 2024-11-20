from dateutil import parser
from dateutil.relativedelta import relativedelta
from datetime import datetime

# Define the function to extract years from date ranges
def extract_years(dates):
    years = 0
    for date in dates:
        # Check if the date is in the "start - end" format
        if '-' not in date:
            continue

        try:
            # Split the date range into start and end dates
            start_date, end_date = date.split('-')

            # Replace 'Present' or 'current' with today's date
            if 'present' in end_date.lower() or 'current' in end_date.lower():
                end_date = datetime.today().strftime('%m/%Y')

            # Parse the dates
            start_date = parser.parse(start_date)
            end_date = parser.parse(end_date)

            # Calculate the difference in years (considering months)
            diff = relativedelta(end_date, start_date)
            years += round(diff.years + diff.months / 12, 2)

        except ValueError as e:
            print(f"Error parsing dates: {e}. Skipping this entry.")

    return years


# Function to calculate experience score
def get_experience_score(resume_text, nlp, target_job_experience=0):
    # Replace En-dash '–' with Hyphen '-' before NER
    resume_text = resume_text.replace('–', '-').replace("—", "-")

    # Process the resume text using Spacy
    doc = nlp(resume_text)

    # Extract the dates that are in the 'start - end' format
    extracted_dates = [ent.text for ent in doc.ents if ent.label_ == 'DATE' and '-' in ent.text]

    # Extract the years from the date ranges
    applicant_years = extract_years(extracted_dates)

    # Calculate the similarity score for the applicant
    if target_job_experience == 0:  # No experience required
        similarity_score = 1.0
    else:
        similarity_score = min(applicant_years / target_job_experience, 1.0)

    return applicant_years, similarity_score