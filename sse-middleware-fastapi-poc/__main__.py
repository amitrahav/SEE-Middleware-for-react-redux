import asyncio
from main import app
from hypercorn.config import Config
from hypercorn.asyncio import serve

if __name__ == "__main__":
    asyncio.run(serve(app, Config()))

