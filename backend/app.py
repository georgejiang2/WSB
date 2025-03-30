from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Enable CORS for frontend communication

# Configure API key
API_KEY = "AIzaSyAJZBZN5HBWXtM5zPZiKOyee_MssBU7Htw"  # Replace with your real API key
genai.configure(api_key=API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel("gemini-2.0-flash")

# File to store conversation history
base_file = "base.txt"

HISTORY_FILE = "history.txt"

# Function to load conversation history
def load_history():
    if os.path.exists(base_file):
        with open(base_file, "r", encoding="utf-8") as file:
            return file.read()
    return ""

# Function to save conversation history
def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as file:
        file.write(history)

# Load existing history when the server starts
conversation_history = load_history()

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history

    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Generate response using Gemini
    response = model.generate_content(user_input + "\nConversation history:\n" + conversation_history)
    bot_response = response.text

    # Update and save conversation history
    conversation_history = user_input + "\n" + bot_response + "\n" + conversation_history
    save_history(conversation_history)

    return jsonify({"response": bot_response})

@app.route("/history", methods=["GET"])
def get_history():
    history = load_history()
    return jsonify({"history": history})

if __name__ == "__main__":
    app.run(debug=True)
