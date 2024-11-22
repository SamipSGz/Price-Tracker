from crewai import Crew, Task, Agent, LLM
import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from crewai_tools import ScrapeWebsiteTool
from litellm import completion



load_dotenv()
llm = LLM(
    model="gemini/gemini-1.5-flash-latest",
    api_key=os.getenv("GEMINI_API_KEY"),
    # verbose = True,
    # temperature = 0.6
)

site = "https://www.amazon.com/Apple-2024-MacBook-13-inch-Laptop/dp/B0DLHY19N3?crid=14XM7J0O8XW29&dib=eyJ2IjoiMSJ9.ZQx2ELLKL01NG8Q2Vzm4EtQnorU_g4dJVoNn6Lam8NQguPSkfFKXC6o_ceS5QueA61RnLzjEcqznICxRUIa_E4evfDWaFCp_dAz4dwtxutasfHqbd7dRLK3R1T8fOwPLH_v0UGiFFTrCRf7qDviwrV7bWGvv9uKeaXH3xmBQKnPZwjRB4ORrbd61aKCkO2J9_5OAUSU7nyEsDhWjCRcLoP4BhOKvQGBZZ6hGQvTjpV0.l8glYFbwGqs6yIoaIdogGKqLmrNYwR-qpQ6IjNp7ubs&dib_tag=se&keywords=apple&psr=EY17&qid=1732252502&s=black-friday&sprefix=app%2Cblack-friday%2C422&sr=1-3&th=1"
tool = ScrapeWebsiteTool(website_url=site)
product = """Apple 2024 MacBook Air 13-inch Laptop with M3 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, Backlit Keyboard, Touch ID; Midnight """,

web_scrapping = Agent(
    role = "Price extractor from Daraz",
    goal = f"Extract the details and price of the {product} from the site {site}",
    verboe = True,
    memory = True,
    backstory = (
    f"""
    You are expert web scraper, your job is to scrape all the data for efficient
    price tracking in the e-commerce sector. With the rapid expansion of online marketplaces
    like Daraz, businesses and consumers alike found it challenging to monitor dynamic pricing.
    Find the details for {product}
    """),
    tools = [tool],
    llm = llm, 
    allow_delegation = False, 
)



scrapping_task = Task(
    description = (
        """Create a detailed and structured display for any product,
        showcasing its key features, specifications, and unique selling points in an organized format.
        Include sections like Performance, Design, Key Features, Compatibility, Connectivity, and Price. Ensure the details are clear
        , concise, and visually appealing, using bullet points or subheadings where necessary. Tailor the tone to emphasize the product's
        strengths and practicality, while providing a brief note for additional details or disclaimers.  The output should be in the format:

Performance:
	The product performance details here.
Design:
	The product Design details here.
Key Features:
	The product key features details here.
Compatibility:
	The product Compatibility details here.
Price:
	The product Price details here.	
"""
    ),
    
    tools = [tool],
    expected_output= (f"""Details of {product} and its price
                      in the format,
                      Details of {product}:
                    
                      
                      Price:
                      price of the product
                      """),
    agent = web_scrapping,
    # output_file = 'output.txt'
)



crew = Crew(
    agents = [web_scrapping],
    tasks = [scrapping_task],
    # memory = True,
    # cache = True,
    embedder={
        "provider": "huggingface",
        "config": {"model": "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"},
    },
    verbose = True
)

print('Starting')

result = crew.kickoff()
print(result)