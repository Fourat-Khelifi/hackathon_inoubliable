from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tavily import TavilyClient

app = FastAPI()

origins = [
    "http://localhost:8000",                    # Local frontend
    "https://0e72595d9f3e.ngrok-free.app",     # Your ngrok URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request model
class MarketAnalysisRequest(BaseModel):
    city: str
    industry: str

# Initialize Tavily client
client = TavilyClient("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")

# Market analysis endpoint
@app.post("/market-analysis")
async def market_analysis(request: MarketAnalysisRequest):
    queries = [
        f"average salaries {request.city} Tunisia 2024 {request.industry}",
        f"business competition {request.industry} {request.city},Tunisia",
        f"startup success rate {request.city},Tunisia",
        f"commercial rent prices {request.city},Tunisia 2025"
    ]
    
    all_results = []
    for query in queries:
        print(f"Searching: {query}")
        try:
            result = client.search(query=query)
            all_results.append({
                'query': query,
                'results': result['results']
            })
        except Exception as e:
            print(f"Error with query '{query}': {e}")
            all_results.append({
                'query': query,
                'error': str(e),
                'results': []
            })
    
    return {
        "city": request.city,
        "industry": request.industry, 
        "analysis": all_results
    }


# Test root endpoint
@app.get("/")
async def root():
    return {"message": "Market Analysis API running"}