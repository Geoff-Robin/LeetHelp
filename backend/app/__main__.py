from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as editorial_router

app = FastAPI()

# Configure CORS to allow requests from your frontend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set this to your frontend domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(editorial_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
