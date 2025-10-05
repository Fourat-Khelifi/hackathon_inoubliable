from tavily import TavilyClient


#using tavily client to do some researchs about the wanted to topic which is linked to city and the category of the 
client = TavilyClient("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")
def comprehensive_analysis(city, industry):
    queries = [
        f"average salaries {city} Tunisia 2024 {industry}",
        f"business competition {industry} {city},Tunisia",
        f"startup success rate {city},Tunisia",
        f"commercial rent prices {city},Tunisia 2025"
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
    
    return all_results

analysis = comprehensive_analysis(
    city="Tunis",
    industry="restaurant and food services"
)
print(analysis)




#https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8065,10.1815&radius=5000&keyword=tax%20office&key=YOUR_API_KEY
