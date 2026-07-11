from fastapi import APIRouter
from app.models.schemas import ForecastRequest, ForecastResponse
from app.services.forecasting import forecast
router = APIRouter(tags=["forecast"])
@router.post("/forecast", response_model=ForecastResponse)
def create_forecast(payload: ForecastRequest):
    return forecast(payload.productId, payload.history)
