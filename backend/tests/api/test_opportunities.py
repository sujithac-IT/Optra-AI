import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.opportunity import Opportunity, OpportunityType, OpportunitySource
from app.models.user import User

@pytest.mark.asyncio
async def test_list_opportunities_unauthenticated(client: AsyncClient):
    response = await client.get("/api/opportunities")
    # Should require auth
    assert response.status_code == 401

# In a full test suite we would mock get_current_user to bypass auth
