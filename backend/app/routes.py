from fastapi import APIRouter, HTTPException
from models import ProblemRequest
from generator import LeetCodeEditorialGenerator

router = APIRouter()

@router.post("/generate")
async def generate_solution(request: ProblemRequest):
    try:
        generator = LeetCodeEditorialGenerator()
        data = generator.generate(request.problem, request.language)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
