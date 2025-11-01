import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tweetme.settings.development')
django.setup()

from tweets.models import Tweet
from accounts.models import CustomUser
from django.utils import timezone

# Check if there are any tweets
tweet_count = Tweet.objects.count()
print(f"Current tweets in database: {tweet_count}")

# Check if there are users
user_count = CustomUser.objects.count()
print(f"Current users in database: {user_count}")

# Create some demo tweets if none exist
if tweet_count == 0:
    # Try to get or create a demo user
    demo_user, created = CustomUser.objects.get_or_create(
        email='demo@example.com',
        defaults={
            'first_name': 'Demo',
            'last_name': 'User',
            'is_active': True
        }
    )
    
    if created:
        demo_user.set_password('demo123')
        demo_user.save()
        print(f"Created demo user: {demo_user.email}")
    
    # Create demo tweets
    demo_tweets = [
        "Welcome to TweetMe! This is your first demo tweet. 🚀",
        "This is a sample tweet showing how the platform works. #demo",
        "TweetMe supports hashtags, mentions, and real-time updates! ✨",
        "Perfect for testing the frontend and backend integration. 💻",
        "Ready to explore the full-stack social media experience? 🎉"
    ]
    
    for content in demo_tweets:
        Tweet.objects.create(
            content=content,
            owner=demo_user,
            type='Original',
            created_date=timezone.now()
        )
    
    print(f"Created {len(demo_tweets)} demo tweets")
    print(f"Total tweets now: {Tweet.objects.count()}")
else:
    print("Tweets already exist in database")

# Display recent tweets
recent_tweets = Tweet.objects.all()[:5]
print("\nRecent tweets:")
for tweet in recent_tweets:
    print(f"- {tweet.content[:50]}... (by {tweet.owner.email})")