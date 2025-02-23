from pydantic import BaseModel, Field
from typing import List, Dict

class LeetCodeSolution(BaseModel):
    understanding: str = Field(description="Problem explanation in simple terms")
    approach: str = Field(description="Solution approach and algorithm")
    complexity: Dict[str, str] = Field(description="Time and space complexity")
    code: str = Field(description="Implementation with comments")
    test_cases: List[Dict[str, str]] = Field(description="Example test cases")

class ProblemRequest(BaseModel):
    problem: str
    language: str = "c++"  # Default language
