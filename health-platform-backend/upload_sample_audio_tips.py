import os
import datetime
from gtts import gTTS
import firebase_admin
from firebase_admin import credentials, firestore, storage

# Initialize Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {
    'storageBucket': 'health-platform-ab04e.firebasestorage.app'  # ✅ correct bucket name
    })

db = firestore.client()
bucket = storage.bucket()

# Sample tips
sample_tips = [
    {
        "title": "Stay Hydrated",
        "transcript": "Drinking enough water helps maintain bodily functions and prevents dehydration.",
        "audio_file": "hydration.mp3",
    },
    {
        "title": "Get Enough Sleep",
        "transcript": "Sleeping 7-8 hours helps your brain and body recover and function optimally.",
        "audio_file": "sleep.mp3",
    }
]

# Generate + Upload each tip
for tip in sample_tips:
    file_path = tip["audio_file"]

    # ✅ Generate audio
    if not os.path.exists(file_path):
        tts = gTTS(tip["transcript"])
        tts.save(file_path)
        print(f"✅ Generated: {file_path}")

    try:
        # ✅ Upload to Firebase Storage
        blob = bucket.blob(f"audioTips/{file_path}")
        blob.upload_from_filename(file_path)
        blob.make_public()
        audio_url = blob.public_url

        # ✅ Add to Firestore
        doc_ref = db.collection("audioHealthTips").document()
        doc_ref.set({
            "title": tip["title"],
            "transcript": tip["transcript"],
            "audioURL": audio_url,
            "createdAt": datetime.datetime.utcnow()
        })

        print(f"✅ Uploaded: {tip['title']} - {audio_url}")

    except Exception as e:
        print(f"❌ Failed to upload {file_path}: {e}")
