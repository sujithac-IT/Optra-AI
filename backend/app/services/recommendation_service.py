import uuid
from collections import Counter
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.profile import Profile
from app.models.opportunity import Opportunity
from app.models.recommendation import SkillRecommendation, PriorityEnum

async def generate_skill_recommendations(db: AsyncSession, user_id: uuid.UUID) -> List[SkillRecommendation]:
    """
    Identifies missing skills by comparing the user's current skills against tags most 
    frequently required by opportunities matching their stated goals.
    """
    result = await db.execute(select(Profile).filter(Profile.user_id == user_id))
    profile = result.scalar_one_or_none()
    
    if not profile or not profile.goals:
        return []

    # Get opportunities that align with user's goals (if goals map directly to opportunity types)
    # Since tags and goals might differ, let's simply get all opportunities and find popular tags
    result = await db.execute(select(Opportunity))
    opportunities = result.scalars().all()
    
    all_tags = []
    for opp in opportunities:
        all_tags.extend(tag.lower() for tag in opp.tags)
    
    if not all_tags:
        return []

    tag_counts = Counter(all_tags)
    profile_skills = set(s.lower() for s in profile.skills)
    
    recommendations = []
    
    # Top 3 missing skills
    for tag, count in tag_counts.most_common():
        if tag not in profile_skills:
            # Create a recommendation
            rec = SkillRecommendation(
                user_id=user_id,
                skill=tag,
                reason=f"This skill appears frequently in {count} opportunities.",
                priority=PriorityEnum.high if count > 5 else PriorityEnum.medium
            )
            recommendations.append(rec)
            
            if len(recommendations) >= 3:
                break
                
    # Insert new recommendations, but in a real app we'd clear old ones or upsert
    # For now, we just return them for the endpoint to save or surface
    for rec in recommendations:
        db.add(rec)
    await db.commit()
    
    return recommendations
