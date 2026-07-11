from datetime import date, timedelta
from importlib.util import find_spec
from statistics import mean, pstdev

from app.services.dataset import synthetic_year


def _has_ml_stack() -> bool:
    return all(find_spec(package) is not None for package in ["numpy", "pandas", "sklearn"])


def _fallback_forecast(product_id: str, history: list[dict]) -> dict:
    rows = history or synthetic_year(product_id).to_dict("records")
    quantities = [float(row.get("quantity", row.get("sales", 0)) or 0) for row in rows]
    losses = [float(row.get("loss", 0) or 0) for row in rows]
    stock = float(rows[-1].get("stock", 0) or 0) if rows else 0
    base = mean(quantities[-28:] or [0])
    volatility = pstdev(quantities[-28:] or [0]) if len(quantities[-28:]) > 1 else 0
    last_date = date.fromisoformat(str(rows[-1].get("date"))) if rows and rows[-1].get("date") else date.today()
    forecast_rows = []
    demands = []
    for step in range(1, 8):
        future = last_date + timedelta(days=step)
        weekday_factor = 1.08 if future.weekday() in [4, 5] else 1.0
        demand = max(0, base * weekday_factor)
        demands.append(demand)
        forecast_rows.append({"date": future.isoformat(), "demand": round(demand, 2)})
    total = sum(demands)
    confidence = max(0.55, min(0.9, 1 - (volatility / (base + 1))))
    loss_mean = mean(losses[-30:] or [0])
    return {
        "productId": product_id,
        "horizonDays": 7,
        "forecast": forecast_rows,
        "suggestedPurchaseQuantity": round(max(0, total - stock) * 1.1, 2),
        "confidenceLevel": round(confidence, 2),
        "stockoutRisk": "alto" if stock < total * 0.4 else "medio" if stock < total else "baixo",
        "lossRisk": "alto" if loss_mean > base * 0.08 else "medio" if loss_mean > 1 else "baixo",
    }


def _ml_forecast(product_id: str, history: list[dict]) -> dict:
    import numpy as np
    import pandas as pd
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.metrics import mean_absolute_error

    df = pd.DataFrame(history) if history else synthetic_year(product_id)
    if "date" not in df:
        df["date"] = pd.date_range(end=date.today(), periods=len(df)).astype(str)
    if "quantity" not in df:
        df["quantity"] = df.get("sales", 0)
    df["date"] = pd.to_datetime(df["date"])
    df["quantity"] = pd.to_numeric(df["quantity"], errors="coerce").fillna(0)
    df["promotion"] = pd.to_numeric(df.get("promotion", 0), errors="coerce").fillna(0)
    df["loss"] = pd.to_numeric(df.get("loss", 0), errors="coerce").fillna(0)
    df = df.sort_values("date")
    df["dow"] = df["date"].dt.dayofweek
    df["month"] = df["date"].dt.month
    df["lag7"] = df["quantity"].shift(7).bfill()
    df["rolling14"] = df["quantity"].rolling(14, min_periods=1).mean()
    features = ["dow", "month", "promotion", "loss", "lag7", "rolling14"]
    train = df.iloc[:-14] if len(df) > 30 else df
    valid = df.iloc[-14:] if len(df) > 30 else df
    model = RandomForestRegressor(n_estimators=120, random_state=42, min_samples_leaf=2)
    model.fit(train[features], train["quantity"])
    mae = mean_absolute_error(valid["quantity"], model.predict(valid[features])) if len(valid) else 0
    last = df.iloc[-1]
    forecast_rows = []
    demands = []
    for step in range(1, 8):
        future = last["date"].date() + timedelta(days=step)
        row = {
            "dow": future.weekday(),
            "month": future.month,
            "promotion": 0,
            "loss": float(df["loss"].tail(14).mean()),
            "lag7": float(df["quantity"].tail(7).mean()),
            "rolling14": float(df["quantity"].tail(14).mean()),
        }
        demand = max(0, float(model.predict(pd.DataFrame([row]))[0]))
        forecast_rows.append({"date": future.isoformat(), "demand": round(demand, 2)})
        demands.append(demand)
    total = float(np.sum(demands))
    confidence = max(0.55, min(0.98, 1 - (mae / (np.mean(df["quantity"]) + 1))))
    stock = float(df.get("stock", pd.Series([0])).iloc[-1]) if "stock" in df else 0
    loss_mean = float(df["loss"].tail(30).mean())
    return {
        "productId": product_id,
        "horizonDays": 7,
        "forecast": forecast_rows,
        "suggestedPurchaseQuantity": round(max(0, total - stock) * 1.1, 2),
        "confidenceLevel": round(confidence, 2),
        "stockoutRisk": "alto" if stock < total * 0.4 else "medio" if stock < total else "baixo",
        "lossRisk": "alto" if loss_mean > np.mean(df["quantity"]) * 0.08 else "medio" if loss_mean > 1 else "baixo",
    }


def forecast(product_id: str, history: list[dict]) -> dict:
    if _has_ml_stack():
        return _ml_forecast(product_id, history)
    return _fallback_forecast(product_id, history)
