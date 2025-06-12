from gtts import gTTS

tips = {
    "hydration.mp3": "Drinking enough water helps maintain bodily functions and prevents dehydration.",
    "sleep.mp3": "Sleeping seven to eight hours helps your brain and body recover and function optimally.",
}

for filename, text in tips.items():
    tts = gTTS(text)
    tts.save(filename)
    print(f"✅ Saved: {filename}")
