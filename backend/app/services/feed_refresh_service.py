import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert

from app.models.opportunity import Opportunity
from app.adapters.base import OpportunityProvider
from app.adapters.unstop_adapter import UnstopAdapter
from app.adapters.generic_feed_adapter import GenericFeedAdapter

logger = logging.getLogger(__name__)

async def refresh_all_feeds(db: AsyncSession):
    """
    Pulls from all registered adapters and upserts into the opportunities table.
    """
    adapters: list[OpportunityProvider] = [
        UnstopAdapter(),
        # GenericFeedAdapter(url="https://example.com/feed.json", source="generic")
    ]

    total_upserted = 0

    for adapter in adapters:
        try:
            opportunities_data = await adapter.fetch()
            
            for opp_data in opportunities_data:
                # Upsert logic based on external_id
                stmt = insert(Opportunity).values(
                    external_id=opp_data.external_id,
                    title=opp_data.title,
                    org=opp_data.org,
                    type=opp_data.type,
                    tags=opp_data.tags,
                    deadline=opp_data.deadline,
                    url=opp_data.url,
                    source=opp_data.source,
                    raw_payload=opp_data.raw_payload
                )
                
                # On conflict do update
                stmt = stmt.on_conflict_do_update(
                    index_elements=['external_id'],
                    set_=dict(
                        title=stmt.excluded.title,
                        org=stmt.excluded.org,
                        type=stmt.excluded.type,
                        tags=stmt.excluded.tags,
                        deadline=stmt.excluded.deadline,
                        url=stmt.excluded.url,
                        raw_payload=stmt.excluded.raw_payload,
                        fetched_at=stmt.excluded.fetched_at
                    )
                )
                
                await db.execute(stmt)
                total_upserted += 1

            logger.info(f"Refreshed {len(opportunities_data)} items from {adapter.__class__.__name__}")
        
        except Exception as e:
            logger.error(f"Error refreshing from {adapter.__class__.__name__}: {e}")

    await db.commit()
    logger.info(f"Total opportunities upserted: {total_upserted}")
    return total_upserted
