from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.recommendation import RecommendationListResponse
from app.services.recommendation_service import generate_skill_recommendations

router = APIRouter()

@router.get("", response_model=RecommendationListResponse)
async def get_recommendations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    recommendations = await generate_skill_recommendations(db, current_user.id)
    return RecommendationListResponse(items=recommendations, total=len(recommendations))
