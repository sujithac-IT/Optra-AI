import pytest
from app.models.profile import Profile
from app.models.opportunity import Opportunity, OpportunityType, OpportunitySource
from app.services.matching_service import compute_match_score

def test_compute_match_score_exact_match():
    profile = Profile(skills=["Python", "FastAPI"], goals=["backend"])
    opportunity = Opportunity(
        title="Backend Dev", 
        org="Test", 
        type=OpportunityType.job, 
        source=OpportunitySource.unstop,
        tags=["python", "fastapi", "backend"]
    )
    
    score = compute_match_score(profile, opportunity)
    # 3 matching tags / 3 opp tags = 100.0
    assert score == 100.0

def test_compute_match_score_partial_match():
    profile = Profile(skills=["Python"], goals=["backend"])
    opportunity = Opportunity(
        title="Backend Dev", 
        org="Test", 
        type=OpportunityType.job, 
        source=OpportunitySource.unstop,
        tags=["python", "fastapi", "react"]
    )
    
    score = compute_match_score(profile, opportunity)
    # 1 matching tag / 3 opp tags = 33.333...
    assert abs(score - 33.33) < 0.1
