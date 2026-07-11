from datetime import date, timedelta
from importlib.util import find_spec
import math
import random


def synthetic_year(product_id: str):
    random.seed(product_id)
    start = date.today() - timedelta(days=365)
    rows = []
    for i in range(365):
        day = start + timedelta(days=i)
        seasonal = 8 * math.sin(i / 365 * 2 * math.pi) + 4 * math.sin(i / 7 * 2 * math.pi)
        promo = 1 if i % 45 in range(0, 5) else 0
        demand = max(1, 35 + seasonal + promo * 10 + random.gauss(0, 4))
        rows.append({"date": day.isoformat(), "quantity": round(demand, 2), "promotion": promo, "loss": max(0, random.gauss(1, 1.5))})
    if find_spec("pandas") is not None:
        import pandas as pd
        return pd.DataFrame(rows)
    return SyntheticDataset(rows)


class SyntheticDataset(list):
    def __init__(self, rows: list[dict]):
        super().__init__(rows)

    def to_dict(self, orient: str = "records") -> list[dict]:
        if orient != "records":
            raise ValueError("Only records orientation is supported without pandas")
        return list(self)
