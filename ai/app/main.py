from fastapi import FastAPI
from app.api.forecast import router
app = FastAPI(title="Smart Hortifruti AI", version="1.0.0")
app.include_router(router)
