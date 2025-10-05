from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5174",                    #front link 
    "http://127.0.0.1:5174",                    # alternate localhost
    "https://ccd95b7f1247.ngrok-free.app"      # model link hosteds through ngrok 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],     # allow GET, POST, OPTIONS
    allow_headers=["*"],     # allow headers like Content-Type
)

# Define what data you expect to receive
#prompt engineering 
class UserPrompt(BaseModel):
    prompt: str

# Load your system prompt from file
with open('prompt.txt', 'r') as file:
    system_prompt = file.read()

# Initialize tyhe client ( we used groq for a faster output for the demo as the same model is heavy locally )

client = Groq(api_key="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")

# API endpoint for chatbot
@app.post("/chat")
async def chat(user_prompt: UserPrompt):
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt.prompt}
        ]
    )
    return {"reply": response.choices[0].message.content}

# Root endpoint to check if API is working
@app.get("/")
async def root():
    return {"message": "Startup Assistant API is running!"}


