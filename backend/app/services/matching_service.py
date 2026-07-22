from typing import List
from app.models.profile import Profile
from app.models.opportunity import Opportunity

def compute_match_score(profile: Profile | None, opportunity: Opportunity) -> float:
    """
    Computes a match score between a user profile and an opportunity (0-100).
    v1: Overlap between profile skills/goals and opportunity tags.
    """
    if not profile:
        return 0.0

    profile_tags = set(tag.lower() for tag in profile.skills + profile.goals)
    opp_tags = set(tag.lower() for tag in opportunity.tags)

    if not opp_tags:
        return 50.0  # Baseline if opportunity has no tags

    intersection = profile_tags.intersection(opp_tags)
    
    # Simple overlap ratio
    score = (len(intersection) / len(opp_tags)) * 100.0
    
    # Cap at 100
    return min(score, 100.0)

def rank_opportunities(profile: Profile | None, opportunities: List[Opportunity]) -> List[tuple[Opportunity, float]]:
    """
    Ranks opportunities based on match score.
    Returns a sorted list of tuples (Opportunity, score) descending.
    """
    scored = [(opp, compute_match_score(profile, opp)) for opp in opportunities]
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored
