import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from app.services.feed_refresh_service import refresh_all_feeds
from app.db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)

async def scheduled_feed_refresh():
    logger.info("Starting scheduled feed refresh...")
    async with AsyncSessionLocal() as session:
        await refresh_all_feeds(session)
    logger.info("Scheduled feed refresh completed.")

def start_scheduler():
    scheduler = AsyncIOScheduler()
    
    # Run every 6 hours
    scheduler.add_job(
        scheduled_feed_refresh,
        trigger=IntervalTrigger(hours=6),
        id="feed_refresh_job",
        replace_existing=True
    )
    
    scheduler.start()
    logger.info("Scheduler started.")
