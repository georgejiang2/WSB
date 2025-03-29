import json
import time
import os
import re
from google import genai

# Initialize Gemini client
client = genai.Client(api_key="AIzaSyBK510Y6ikadkYmNKwy0f_LKdEoJjquGVo")

# Load WSB posts
with open("wsb_posts.json", "r") as f:
    posts = json.load(f)

# Always start fresh
output_file = "final_ticker_sentiments.json"
ticker_sentiments = []
batch_size = 10
posts_to_process = posts

# Process posts in batches
i = 0
while i < len(posts_to_process):
    batch = posts_to_process[i:i + batch_size]

    # Build prompt for the batch
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
        upvotes = post.get("upvotes", 0)
        comments = "\n".join(post["comments"][:5])
        
        prompt += f"\nPost ID: {post_id}\nTitle: {title}\nText: {text}\nTop Comments: {comments}\n---"

    try:
        # Call Gemini
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        print(f"\nProcessing batch {i // batch_size + 1} of {(len(posts_to_process) + batch_size - 1) // batch_size}")

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

            # ✅ Filter out neutral or unknown
            filtered = [item for item in parsed if item["sentiment_score"] != 0.0 and item["ticker"] != "UNKNOWN"]
            ticker_sentiments.extend(filtered)
            print(f"Filtered out {len(parsed) - len(filtered)} neutral/unknown posts.")

            # Save progress
            with open(output_file, "w") as f:
                json.dump(ticker_sentiments, f, indent=2)

            print(f"Sample results: {filtered[:2]}")
            i += batch_size  # move to next batch

        else:
            print("Could not find JSON in response")
            print(f"Response text: {response_text[:200]}...")
            i += batch_size  # skip this batch and move on

    except Exception as e:
        error_str = str(e)
        print(f"\n❌ Error in batch {i // batch_size + 1}: {e}")

        if "RESOURCE_EXHAUSTED" in error_str or "429" in error_str:
            # Extract retry delay if available
            match = re.search(r"'retryDelay': '(\d+)s'", error_str)
            delay = int(match.group(1)) if match else 60
            print(f"Rate limit hit. Sleeping for {delay} seconds before retrying batch...")
            time.sleep(delay)
            # Retry same batch (do not increment i)
        else:
            # Other error — save and break
            with open(output_file, "w") as f:
                json.dump(ticker_sentiments, f, indent=2)
            break

print(f"✅ Completed processing. Total entries: {len(ticker_sentiments)}")
