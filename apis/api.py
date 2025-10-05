import ollama
import re
from beldi.diden import get_market_analysis
import json
from fastapi import FastAPI

app = FastAPI()

import json
from groq import Groq

@app.post("/summary/{city}/{sector}")
def get_summary(city: str, sector: str):
    # Get market analysis data for the specified city and sector
    data = get_market_analysis(city, sector)
    # Summarize the market data using LLM
    summary_text = summarize_market_data(data)
    # Extract JSON block from the summary text using regex
    json_match = re.search(r"```\s*({.*?})\s*```", summary_text, re.DOTALL)
    if json_match:
        json_text = json_match.group(1)
        try:
            # Try to parse JSON
            summary_json = json.loads(json_text)
        except json.JSONDecodeError:
            # Fallback to eval if JSON parsing fails
            summary_json = eval(json_text)
    else:
        summary_json = {}
    # Print the summary JSON for debugging
    print(json.dumps(summary_json, indent=2))
    # Return the summary JSON as response
    return summary_json

def remove_surrogates(text):
    # Remove characters in the surrogate range to clean text for LLM
    return text.encode("utf-8", "surrogatepass").decode("utf-8", "ignore")

from pocketgroq import GroqProvider
from groq import Groq
from dotenv import load_dotenv
import os

def summarize_market_data(data):
    """
    Summarize key insights from market data using LLM.
    Returns a concise bullet point summary in JSON format.
    """
    # Initialize Groq client with API key
    client = Groq(
        api_key="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"
    )
    # Collect all relevant text entries from analysis results
    entries = [
        f"Title: {remove_surrogates(r['title'])}\nContent: {remove_surrogates(r['content'])}"
        for d in data['analysis'] for r in d.get('results', [])
    ]
    # Merge entries into a single string, limit to first 15 to avoid overload
    joined_text = "\n\n".join(entries[:15])

    # System prompt instructs LLM to extract quantitative insights and format output as JSON
    system_prompt = """
    You are an analytical assistant specialized in summarizing Tunisian market data.

    From the provided text entries, extract the **most relevant factual insights** about the Tunisian market.

    Your output MUST include these keys:
    - average_salary (with value not a list, a single value so it can be easily displayed)
    - startup_access (with value not a list, a single value so it can be easily displayed)
    - SME_growth (with value not a list, a single value so it can be easily displayed)
    - competitors (as a list of strings)
    - average_rent (with value not a list, a single value so it can be easily displayed)
    - average_pricing (with value not a list, a single value so it can be easily displayed)

    Focus primarily on identifying **quantitative information** (numeric values, percentages, counts, or rankings) for these categories.

    If additional insights are present (such as partnerships, funding, or performance trends), include them only if they are **noteworthy and factual** — avoid long commentary.

    Organize your output into **JSON format** with short, clear key-value pairs grouped by category.

    ### Output format example:

    {
    "average_salary": "1570 TND/month",
    "startup_access": "85 startups, $20.8M funding",
    "SME_growth": "+18%",
    "competitors": ["Ooredoo", "Orange", "Tunisie Télécom"],
    "average_rent": "42,500 TND/month (commercial)",
    "average_pricing": "289 TND/m² (Berges du Lac 2)",
    "misc": {
        "notable_event": "OECD Competition Review 2023",
        "trend": "new innovation hubs emerging in Tunis"
    }
    }

    ### General rules:
    - Always use lowercase keys for categories and fields.
    - Prioritize numeric data: salaries, rent, rates, percentages, counts.
    - Add qualitative insights **only if they are factual and concise** (e.g., “new competitors entering”, “growth slowing”, “exports up 10%”).
    - Group insights logically by category.
    - Keep the style compact, data-oriented, and easy to parse.
    - Avoid repetition, adjectives, or vague wording.
    - Use TND or USD consistently and specify the year or quarter when available.

    """

    # Send prompt and data to LLM for summarization
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": joined_text}
        ],
        model="llama-3.3-70b-versatile",
    )
    # Get summary text from LLM response
    summary_text = chat_completion.choices[0].message.content
    return summary_text.strip()

def parse_bullet_dict(text):
    """
    Parse bullet-point style text into a dictionary.
    Used for extracting structured data from LLM output.
    """
    result = {}
    current_category = None
    for line in text.splitlines():
        # Match category headers like "### Salary:"
        cat_match = re.match(r"^###\s*([A-Za-z ]+):", line)
        if cat_match:
            current_category = cat_match.group(1).strip().lower().replace(" ", "_")
            result[current_category] = {}
            continue
        # Match bullet lines like "- key: value"
        bullet_match = re.match(r"^- ([^:]+):\s*(.*)", line)
        if bullet_match and current_category:
            key = bullet_match.group(1).strip()
            value = bullet_match.group(2).strip()
            # Try to eval lists or quoted strings
            if value.startswith("[") and value.endswith("]"):
                try:
                    value = eval(value)
                except Exception:
                    pass
            elif value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            result[current_category][key] = value
    return result
