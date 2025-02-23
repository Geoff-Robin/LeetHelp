import os
import json
from datetime import datetime
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

class LeetCodeEditorialGenerator:
    def __init__(self, groq_api_key: str = None):
        if groq_api_key is None:
            groq_api_key = os.getenv('GROQ_API_KEY')
            if not groq_api_key:
                raise ValueError("GROQ_API_KEY not found in environment variables")
        self.llm = ChatGroq(
            groq_api_key=groq_api_key,
            model_name="mixtral-8x7b-32768"
        )
        # Prompt instructs the LLM to output valid JSON without additional section partitioning.
        self.prompt = ChatPromptTemplate.from_template(
            """
Generate a detailed solution for this LeetCode problem and output it in valid JSON format which is easy for json.load() function in python, make sure to put it in valid json.
The JSON object must have the following keys:
- "understanding": A clear explanation of the problem in simple terms.
- "approach": A detailed explanation of the solution approach and algorithm.
- "complexity": An object containing "time" and "space" complexity details.
- "code": A well-commented code implementation in {language}.
- "test_cases": An array of example test cases, each represented as an object with an "example" key.

Problem:
{problem}
            """
        )
    
    def generate(self, problem: str, language: str = "c++") -> dict:
        formatted_prompt = self.prompt.format_messages(problem=problem, language=language)
        response = self.llm.invoke(formatted_prompt)
        try:
            start = response.content.find("{")
            end = response.content.rfind("}") + 1
            json_text = response.content[start:end]
            data = json.loads(json_text)
        except Exception as e:
            raise ValueError("Response is not valid JSON: " + str(e))
        
        # Append metadata
        data["metadata"] = {
            "generated_at": datetime.now().isoformat(),
            "model": "mixtral-8x7b-32768"
        }
        return data
