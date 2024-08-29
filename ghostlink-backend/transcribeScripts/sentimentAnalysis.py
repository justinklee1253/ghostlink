import json
import os
from dotenv import load_dotenv
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, EntitiesOptions, KeywordsOptions

load_dotenv()

authenticator = IAMAuthenticator(os.getenv("WATSON_API_KEY"))
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2022-04-07',
    authenticator=authenticator)

natural_language_understanding.set_service_url(os.getenv("WATSON_URL"))

response = natural_language_understanding.analyze(
    text="""
    You know who makes the most money off TikTok videos? It's low key. The people who put the least effort into their video. I think this dude is a little fucking sales genius thing. I've heard him say in his videos that he makes over three hundred k a month off this offer. If you click on his TikTok video, he's just running a copywriting course offer. So he's obviously ripping an insane number of views, an insane number of leads, and an insane number of conversions to this offer. But the crazy thing is, this is what his videos look like. He doesn't edit them at all. Does that kind of piss you off, the fact that you can just do this to the camera, to his fucking iPhone, for like, ten minutes a day, and make $300,000 a month? But you can choose to be bitter or be better. And I think there's a lot of important lessons to be learned from his marketing strategy. His biggest sales tool isn't necessarily the information he knows about copywriting or online business, because there's so many people out there who know this stuff that are absolutely getting no views on TikTok. Like 300 views a video. So what's the difference? It's simply the energy that he brings on camera. It's not what he says, it's how he says it. So how can we apply this kind of marketing genius strategy to our own TikTok videos? And I think it's really simple. You can rigorously script out all the information that you want, but if you're not in the right state of mind and body, when you actually pick up the camera and start talking, you won't feel comfortable enough to deliver your information efficiently. So your energy comes off in a way where people will want to even listen to you, let alone buy from you or follow you. So something I like to do is that when I pick up a camera, I try as hard as possible to get into an absolute flow state where I am not thinking about anything. I'm not thinking about what anybody else around me is thinking of me, because I'm, like, talking in the middle of my college campus. I'm not having these intrusive thoughts about how much I suck as a communicator and how boring or cringe or, like, awkward I sound on camera. Just take a deep breath, be calm, and talk. And I'm not the best at this, but when I see a lot of beginner tiktokers pick up the camera, it's very obvious that there's a bit of tension that they have when they talk, they're a bit on edge. A little anxiety you can sense, and viewers can pick up on that, unfortunately. And that's usually a huge reason why people with great information and experience will still absolutely get no views. I hate to sound woo, but once you pick up the camera, let your soul flow into the video and it'll come out just the way it needs to.
    """
    ,
    # features=Features(
    #     entities=EntitiesOptions(emotion=True, sentiment=True, limit=2))).get_result()
    features=Features(
        entities=EntitiesOptions(emotion=True, sentiment=True, limit=5),
        keywords=KeywordsOptions(emotion=True, sentiment=True,
                                 limit=2))).get_result()

print(json.dumps(response, indent=2))