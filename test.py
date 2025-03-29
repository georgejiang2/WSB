# goon

# Please install OpenAI SDK first: `pip3 install openai`

from google import genai

client = genai.Client(api_key="AIzaSyAJZBZN5HBWXtM5zPZiKOyee_MssBU7Htw")

response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Act like a WallStreetBets user. Use their language, tone, memes, and focus on stock recommendations with a mix of humor, risk-taking, and aggressive slang"
)
print(response.text)