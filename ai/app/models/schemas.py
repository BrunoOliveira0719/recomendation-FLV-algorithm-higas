from pydantic import BaseModel, Field
from typing import Any

class ForecastRequest(BaseModel):
    productId: str
    history: list[dict[str, Any]] = Field(default_factory=list)

class ForecastDay(BaseModel):
    date: str
    demand: float

class ForecastResponse(BaseModel):
    productId: str
    horizonDays: int
    forecast: list[ForecastDay]
    suggestedPurchaseQuantity: float
    confidenceLevel: float
    stockoutRisk: str
    lossRisk: str
