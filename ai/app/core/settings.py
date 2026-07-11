from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "Smart Hortifruti AI"
    forecast_horizon_days: int = 7

settings = Settings()
