from google import genai

# Initialize the client
client = genai.Client(api_key="AIzaSyAJZBZN5HBWXtM5zPZiKOyee_MssBU7Htw")

user_input = "Act like a wallstreetbets user. Make responses short and sweet. "
# Start a conversation with the first request
response = client.models.generate_content(model="gemini-2.0-flash", contents=user_input)
print(response.text)

# Store the response to maintain context for the next request
conversation_history = user_input + response.text

print("----------------------------------------------------------------------------------------------------")

while user_input != "end":
    user_input = input()
    response = client.models.generate_content(model="gemini-2.0-flash", contents=user_input + "\nconversation history, use only for context: \n" + conversation_history)
    print(response.text)

    # Store the response to maintain context for the next request
    conversation_history =user_input + response.text + conversation_history

    print("----------------------------------------------------------------------------------------------------")