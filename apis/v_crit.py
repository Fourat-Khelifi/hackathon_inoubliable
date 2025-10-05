from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import json

app = FastAPI()

# -------------------- CORS CONFIG --------------------
origins = [
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://ccd95b7f1247.ngrok-free.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LOAD PERSONAS --------------------
# persona.txt should contain descriptions like:
# Persona 1: A business strategist...
# Persona 2: A marketing expert...
# Persona 3: A technical engineer...
with open("persona.txt", "r") as file:
    persona_data = file.read()

# -------------------- GROQ CLIENT --------------------
client = Groq(api_key="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")

# -------------------- MODEL --------------------
class StartupIdea(BaseModel):
    idea: str

# -------------------- ENDPOINT --------------------
@app.post("/criticize")
async def criticize_startup(idea_data: StartupIdea):
    """
    Receives a startup idea from the frontend,
    uses the persona.txt file for personas,
    and returns 3 different persona-based criticisms in JSON format.
    """
    
    prompt = f"""
You are a group of 3 virtual personas described below:
{persona_data}

Your task:
- Each persona must provide a short and distinct criticism (3-5 sentences)
  about the following startup idea:
  "{idea_data.idea}"

- Each message should reflect the persona's unique perspective and expertise.
- Output must be in JSON format only, like this:
{{
  "message1": "criticism from persona 1",
  "message2": "criticism from persona 2",
  "message3": "criticism from persona 3"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You generate realistic persona-based critical feedback."},
            {"role": "user", "content": prompt},
        ],
    )

    raw_output = response.choices[0].message.content

    try:
        result = json.loads(raw_output)
    except json.JSONDecodeError:
        # fallback if model returns text with some noise
        result = {"message1": raw_output}

    return result


# -------------------- ROOT --------------------
@app.get("/")
async def root():
    return {"message": "Persona Criticism API is running!"}
