import json
from pathlib import Path
from typing import List
from datetime import datetime

from app.adapters.base import OpportunityProvider
from app.schemas.opportunity import OpportunityCreate
from app.models.opportunity import OpportunityType, OpportunitySource

class UnstopAdapter(OpportunityProvider):
    def __init__(self, seed_file: str = "app/seed_data/unstop_sample.json"):
        self.seed_file = Path(seed_file)

    async def fetch(self) -> List[OpportunityCreate]:
        if not self.seed_file.exists():
            return []

        try:
            with open(self.seed_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            opportunities = []
            for item in data:
                opp = OpportunityCreate(
                    external_id=item.get("id"),
                    title=item.get("title"),
                    org=item.get("organization"),
                    type=OpportunityType(item.get("type", "hackathon")),
                    tags=item.get("tags", []),
                    deadline=datetime.fromisoformat(item.get("deadline")) if item.get("deadline") else None,
                    url=item.get("url"),
                    source=OpportunitySource.unstop,
                    raw_payload=item
                )
                opportunities.append(opp)
            
            return opportunities
        except Exception as e:
            print(f"Failed to fetch from Unstop seed: {e}")
            return []
