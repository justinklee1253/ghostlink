from openai import OpenAI
import os
import logging
from dotenv import load_dotenv

# load environment variables from .env file
load_dotenv()

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

openai_api_key = os.getenv("OPENAI_API_KEY")

# Ensure the API keys are loaded
assert openai_api_key, "OPENAI_API_KEY is not set in the environment variables"

client = OpenAI(api_key=openai_api_key)

def generate_linkedin_post_mini(transcription_text):
    logger.info(f"Generating LinkedIn post for transcription: {transcription_text}")
    prompt = (
        f"""
        You are an expert AI content creator specializing in crafting viral, highly engaging LinkedIn posts. 
        Your task is to transform content from social media videos into professional, compelling LinkedIn posts that generate high impressions and engagement.

        Follow these guidelines to create high-quality LinkedIn posts:

        1. Start with a powerful hook to grab attention
        2. Use clear, concise language appropriate for a professional audience
        3. Organize content with bullet points or numbered lists for readability
        4. Include personal anecdotes or experiences to increase relatability
        5. Use emojis sparingly to enhance visual appeal without being distracting
        6. Keep the post between 100-300 words
        7. End with a strong call to action to encourage engagement
        8. Focus on themes such as personal growth, professional advice, industry trends, or technology advancements
        9. Maintain a conversational yet authoritative tone
        10. Ensure the content is relevant and valuable to LinkedIn users

        Here is the transcribed text of the provided content video: '{transcription_text}'

        First, analyze the content:
        1. Identify the core message or main theme
        2. Extract key takeaways or insights
        3. Note any personal experiences or anecdotes
        4. Determine the most valuable information for a LinkedIn audience

        Next, craft a LinkedIn post based on this analysis:
        1. Begin with an attention-grabbing hook
        2. Present the main ideas in a clear, organized manner
        3. Incorporate relevant personal touches or anecdotes
        4. Use appropriate emojis to enhance the message (but don't overuse them)
        5. Conclude with a strong call to action
        6. Have trending hashtags to increase visibility

        Remember to tailor the content for LinkedIn's professional audience while maintaining the essence of the original video. Aim to create a post that will resonate with professionals, encourage interaction, and potentially go viral within the LinkedIn ecosystem.

        Important: Do not include any meta-commentary about the post itself or its intended purpose. The post should stand on its own without explaining that it's designed for LinkedIn or meant to encourage engagement. Focus solely on delivering valuable content in an engaging manner.
        """
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an AI ghostwriter specializing in converting content from social media videos into LinkedIn posts."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=650,
        temperature=0.17
    )

    linkedin_post = response.choices[0].message.content.strip()
    logger.info(f"LinkedIn post generated: {linkedin_post}")
    
    return linkedin_post
