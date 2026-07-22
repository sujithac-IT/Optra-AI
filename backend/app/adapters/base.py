from abc import ABC, abstractmethod
from typing import List
from app.schemas.opportunity import OpportunityCreate

class OpportunityProvider(ABC):
    @abstractmethod
    async def fetch(self) -> List[OpportunityCreate]:
        """
        Fetch opportunities from the provider and return a list of OpportunityCreate schemas.
        """
        pass
