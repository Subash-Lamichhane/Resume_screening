def map_degree_to_score(degree):
    """
    Map degree to score based on the degree level.
    """
    degree_score_map = {
        'DEGREE|BACHELOR': 1,
        'DEGREE|MASTER': 2,
        'DEGREE|PHD': 3,
        'Bachelor':1,
        'Master':2,
        'PHD':3
    }
    return degree_score_map.get(degree, 0)  # Default to 0 if degree is unknown

def calculate_degree_score(degrees, min_req_degree):
    """
    Calculate the total score for a resume based on degrees and minimum required degree.
    If the highest degree is greater than or equal to the minimum required degree, score is 1.
    Otherwise, score is calculated based on the difference between the highest degree and minimum degree.
    """
    # Mapping the degrees in the resume to their respective scores
    if(min_req_degree=='None'):
        return 1
    
    degree_scores = [map_degree_to_score(degree) for degree in degrees]

    # Find the highest degree score in the candidate's resume
    highest_degree_score = max(degree_scores) if degree_scores else 0

    # Get the score for the minimum required degree
    print(min_req_degree)
    min_degree_score = map_degree_to_score(min_req_degree)
    print("Minimum degree score:",min_degree_score)

    # If the highest degree meets or exceeds the minimum required degree, return 1 point
    if highest_degree_score >= min_degree_score:
        return 1

    # If the highest degree is less than the minimum required, calculate the score based on the difference
    degree_difference = min_degree_score - highest_degree_score

    # Apply formula: score is 1 minus half the degree difference (with a minimum score of 0)
    score = max(0, 1 - 0.5 * degree_difference)

    return score

# degree_score = calculate_resume_score(resume_degrees, min_req_degree)
# degree_score