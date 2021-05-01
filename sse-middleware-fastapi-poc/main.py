from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
from typing import AsyncGenerator
import asyncio
import json 
from fastapi.middleware.cors import CORSMiddleware

# Creating my app
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


progress_bar = ["10", "30", "50", "60", "80", "100"]


async def subscribe() -> AsyncGenerator:
    for progress in progress_bar:
        print("started")
        await asyncio.sleep(2)
        print(f"after sleep {progress}")
        yield {"event": "pipeline_progress", "data": json.dumps({"progress" : progress})}


@app.get("/videos/subscribe")
async def stram_sse():
    print("here")
    # This function is mapped for the url which the inital connection request form client sends to
    return EventSourceResponse(subscribe())