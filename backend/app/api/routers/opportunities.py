from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from datetime import datetime

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.profile import Profile
from app.models.opportunity import Opportunity, OpportunityType, OpportunitySource
from app.schemas.opportunity import OpportunityListResponse, OpportunitySchema
from app.services.matching_service import rank_opportunities

router = APIRouter()

@router.get("", response_model=OpportunityListResponse)
async def list_opportunities(
    type: Optional[OpportunityType] = None,
    source: Optional[OpportunitySource] = None,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Base query
    stmt = select(Opportunity)
    
    if type:
        stmt = stmt.filter(Opportunity.type == type)
    if source:
        stmt = stmt.filter(Opportunity.source == source)
        
    # Get total count (for simplicity in v1 we just fetch all matching to rank them, 
    # but in prod we'd paginate after ranking or use a more efficient way)
    result = await db.execute(stmt)
    opportunities = result.scalars().all()
    total = len(opportunities)
    
    # Get user profile for matching score
    profile_result = await db.execute(select(Profile).filter(Profile.user_id == current_user.id))
    profile = profile_result.scalar_one_or_none()
    
    # Rank opportunities
    ranked = rank_opportunities(profile, opportunities)
    
    # Paginate manually since we need to sort by match score first
    paginated_ranked = ranked[offset : offset + limit]
    
    # Construct response
    items = []
    for opp, score in paginated_ranked:
        # Convert ORM to schema and add match_score
        opp_schema = OpportunitySchema.model_validate(opp)
        opp_schema.match_score = score
        items.append(opp_schema)
        
    return OpportunityListResponse(items=items, total=total)

@router.get("/{id}", response_model=OpportunitySchema)
async def get_opportunity(
    id: str,
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Opportunity).filter(Opportunity.id == id))
    opportunity = result.scalar_one_or_none()
    
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
        
    return opportunity
