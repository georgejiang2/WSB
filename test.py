import json
import time
import os
from google import genai

client = genai.Client(api_key="AIzaSyBK510Y6ikadkYmNKwy0f_LKdEoJjquGVo")

# Load WSB posts
with open("wsb_posts.json", "r") as f:
    posts = json.load(f)

# Final result: each item is {post_id: ..., ticker: ..., sentiment_score: ..., upvotes: ...}
ticker_sentiments = []

# Save to resume if needed
output_file = "final_ticker_sentiments.json"
if os.path.exists(output_file):
    with open(output_file, "r") as f:
        ticker_sentiments = json.load(f)

# Track which posts we've already processed
processed_ids = {item["post_id"] for item in ticker_sentiments}
batch_size = 10  # Increased batch size for efficiency

# Filter out already processed posts
posts_to_process = [post for post in posts if post["id"] not in processed_ids]

for i in range(0, len(posts_to_process), batch_size):
    batch = posts_to_process[i:i + batch_size]

    prompt = """
You are analyzing Reddit posts from r/wallstreetbets. For each post, extract ONLY THE MAIN stock ticker being discussed and assign a sentiment score.

Score meaning (now from -1.0 to 1.0):
-1.0: Very bearish (strongly negative)
-0.5: Somewhat bearish (mildly negative)
0.0: Neutral
0.5: Somewhat bullish (mildly positive)
1.0: Very bullish (strongly positive)

Return ONLY a JSON list with this exact format:
[
  {"post_id": "abc123", "ticker": "AAPL", "sentiment_score": 0.8},
  {"post_id": "def456", "ticker": "TSLA", "sentiment_score": -0.6}
]

If a post doesn't clearly mention a specific ticker, use "UNKNOWN" as the ticker value.
Only return ONE ticker per post - the most prominently discussed one.
Here are the posts:
"""

    for post in batch:
        post_id = post["id"]
        title = post["title"]
        text = post["text"]
        upvotes = post.get("upvotes", 0)  # Ensure we get upvotes if available
        comments = "\n".join(post["comments"][:5])
        
        prompt += f"\nPost ID: {post_id}\nTitle: {title}\nText: {text}\nTop Comments: {comments}\n---"

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        print(f"\nProcessing batch {i // batch_size + 1} of {(len(posts_to_process) + batch_size - 1) // batch_size}")

        try:
            response_text = response.text
            json_start = response_text.find('[')
            json_end = response_text.rfind(']') + 1

            if json_start >= 0 and json_end > json_start:
                json_str = response_text[json_start:json_end]
                parsed = json.loads(json_str)

                # Add upvotes to parsed results
                for item in parsed:
                    matching_post = next((p for p in batch if p["id"] == item["post_id"]), None)
                    item["upvotes"] = matching_post.get("upvotes", 0) if matching_post else 0

                ticker_sentiments.extend(parsed)

                # Save after each batch
                with open(output_file, "w") as f:
                    json.dump(ticker_sentiments, f, indent=2)

                print(f"Sample results: {parsed[:2]}")
            else:
                print("Could not find JSON in response")
                print(f"Response text: {response_text[:200]}...")

        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            print(f"Response text: {response_text[:200]}...")

        time.sleep(1)  # Rate limit

    except Exception as e:
        print(f"\n❌ Error in batch {i // batch_size + 1}: {e}")
        with open(output_file, "w") as f:
            json.dump(ticker_sentiments, f, indent=2)
        break

print(f"✅ Completed processing. Total entries: {len(ticker_sentiments)}")
