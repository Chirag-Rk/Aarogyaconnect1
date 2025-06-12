from gtts import gTTS

audio_tips = {
    "handwashing-tip.mp3": "Wash your hands thoroughly with soap and water for at least 20 seconds to prevent the spread of infections.",
    "healthy-diet-tip.mp3": "Include fresh fruits and vegetables in your diet daily to boost immunity and maintain overall health.",
    "mental-health-tip.mp3": "Take regular breaks, meditate, and connect with loved ones to support your mental well-being.",
    "exercise-tip.mp3": "Aim for at least 30 minutes of physical activity daily. Regular exercise improves your heart health and mood."
}

for filename, text in audio_tips.items():
    tts = gTTS(text)
    tts.save(filename)
    print(f"Saved {filename}")
