import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  Info, 
  Phone,
  Languages,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const translations = {
  English: {
    title: "AI Symptom Checker",
    subtitle: "Get preliminary health guidance based on your symptoms",
    chatTitle: "Chat with AI Health Assistant",
    disclaimer: "Important: This AI tool provides preliminary guidance only. Always consult qualified healthcare professionals for proper diagnosis and treatment.",
    initialMessage: "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help provide preliminary guidance. Remember, this is not a substitute for professional medical advice.",
    placeholder: "Describe your symptoms in detail...",
    sendHint: "Press Enter to send, Shift+Enter for new line",
    send: "Send",
    commonSymptoms: "Common Symptoms",
    commonSymptomsDesc: "Click on any of these common symptoms to get started",
    emergencyTitle: "Emergency Situations",
    emergencyDesc: "If you're experiencing any of these symptoms, seek immediate medical attention:",
    callEmergency: "Call Emergency: 102",
    symptoms: [
      "Fever and headache", "Stomach pain", "Cough and cold", "Joint pain", 
      "Skin rash", "Chest pain", "Nausea and vomiting", "Diarrhea", 
      "Dizziness", "Back pain", "Sore throat", "Fatigue", 
      "Shortness of breath", "Muscle pain", "Eye irritation", "Ear pain",
      "Tooth pain", "Anxiety", "Insomnia", "Constipation"
    ],
    emergencySymptoms: [
      "Chest pain or difficulty breathing",
      "Severe allergic reactions",
      "Loss of consciousness",
      "Severe bleeding or trauma",
      "Signs of stroke (sudden numbness, confusion, trouble speaking)"
    ]
  },
  Hindi: {
    title: "एआई लक्षण चेकर",
    subtitle: "अपने लक्षणों के आधार पर प्रारंभिक स्वास्थ्य मार्गदर्शन प्राप्त करें",
    chatTitle: "एआई स्वास्थ्य सहायक के साथ चैट करें",
    disclaimer: "महत्वपूर्ण: यह एआई उपकरण केवल प्रारंभिक मार्गदर्शन प्रदान करता है। उचित निदान और उपचार के लिए हमेशा योग्य स्वास्थ्य पेशेवरों से सलाह लें।",
    initialMessage: "नमस्ते! मैं आपका एआई स्वास्थ्य सहायक हूं। कृपया अपने लक्षणों का वर्णन करें और मैं प्रारंभिक मार्गदर्शन प्रदान करने में मदद करूंगा। याद रखें, यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
    placeholder: "अपने लक्षणों का विस्तार से वर्णन करें...",
    sendHint: "भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter",
    send: "भेजें",
    commonSymptoms: "सामान्य लक्षण",
    commonSymptomsDesc: "शुरुआत करने के लिए इन सामान्य लक्षणों में से किसी पर क्लिक करें",
    emergencyTitle: "आपातकालीन स्थितियां",
    emergencyDesc: "यदि आप इनमें से कोई भी लक्षण अनुभव कर रहे हैं, तो तुरंत चिकित्सा सहायता लें:",
    callEmergency: "आपातकाल कॉल करें: 102",
    symptoms: [
      "बुखार और सिरदर्द", "पेट दर्द", "खांसी और जुकाम", "जोड़ों का दर्द",
      "त्वचा पर चकत्ते", "छाती में दर्द", "मतली और उल्टी", "दस्त",
      "चक्कर आना", "कमर दर्द", "गले में खराश", "थकान",
      "सांस लेने में तकलीफ", "मांसपेशियों में दर्द", "आंखों में जलन", "कान में दर्द",
      "दांत दर्द", "चिंता", "अनिद्रा", "कब्ज"
    ],
    emergencySymptoms: [
      "छाती में दर्द या सांस लेने में कठिनाई",
      "गंभीर एलर्जी की प्रतिक्रिया",
      "बेहोशी",
      "गंभीर रक्तस्राव या आघात",
      "स्ट्रोक के लक्षण (अचानक सुन्नता, भ्रम, बोलने में परेशानी)"
    ]
  },
  Kannada: {
    title: "ಎಐ ಲಕ್ಷಣ ಪರೀಕ್ಷಕ",
    subtitle: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",
    chatTitle: "ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
    disclaimer: "ಮುಖ್ಯ: ಈ ಎಐ ಸಾಧನವು ಕೇವಲ ಪ್ರಾಥಮಿಕ ಮಾರ್ಗದರ್ಶನವನ್ನು ಒದಗಿಸುತ್ತದೆ. ಸರಿಯಾದ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಯಾವಾಗಲೂ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    initialMessage: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ ಮತ್ತು ನಾನು ಪ್ರಾಥಮಿಕ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಇದು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಲ್ಲ ಎಂಬುದನ್ನು ನೆನಪಿಡಿ.",
    placeholder: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿಸ್ತಾರವಾಗಿ ವಿವರಿಸಿ...",
    sendHint: "ಕಳುಹಿಸಲು Enter ಒತ್ತಿರಿ, ಹೊಸ ಸಾಲಿಗಾಗಿ Shift+Enter",
    send: "ಕಳುಹಿಸಿ",
    commonSymptoms: "ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು",
    commonSymptomsDesc: "ಪ್ರಾರಂಭಿಸಲು ಈ ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳಲ್ಲಿ ಯಾವುದಾದರೂ ಒಂದರ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ",
    emergencyTitle: "ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳು",
    emergencyDesc: "ನೀವು ಈ ಯಾವುದೇ ಲಕ್ಷಣಗಳನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದರೆ, ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ:",
    callEmergency: "ತುರ್ತು ಕರೆ: 102",
    symptoms: [
      "ಜ್ವರ ಮತ್ತು ತಲೆನೋವು", "ಹೊಟ್ಟೆ ನೋವು", "ಕೆಮ್ಮು ಮತ್ತು ಶೀತ", "ಕೀಲು ನೋವು",
      "ಚರ್ಮದ ಮೇಲೆ ದದ್ದು", "ಎದೆ ನೋವು", "ವಾಕರಿಕೆ ಮತ್ತು ವಾಂತಿ", "ಅತಿಸಾರ",
      "ತಲೆ ತಿರುಗುವಿಕೆ", "ಬೆನ್ನು ನೋವು", "ಗಂಟಲು ನೋವು", "ಆಯಾಸ",
      "ಉಸಿರಾಟದ ತೊಂದರೆ", "ಸ್ನಾಯು ನೋವು", "ಕಣ್ಣಿನ ಕಿರಿಕಿರಿ", "ಕಿವಿ ನೋವು",
      "ಹಲ್ಲು ನೋವು", "ಆತಂಕ", "ನಿದ್ರಾಹೀನತೆ", "ಮಲಬದ್ಧತೆ"
    ],
    emergencySymptoms: [
      "ಎದೆ ನೋವು ಅಥವಾ ಉಸಿರಾಟದ ಕಷ್ಟ",
      "ತೀವ್ರ ಅಲರ್ಜಿ ಪ್ರತಿಕ್ರಿಯೆಗಳು",
      "ಪ್ರಜ್ಞೆ ಕಳೆದುಕೊಳ್ಳುವುದು",
      "ತೀವ್ರ ರಕ್ತಸ್ರಾವ ಅಥವಾ ಆಘಾತ",
      "ಪಾರ್ಶ್ವವಾಯುವಿನ ಲಕ್ಷಣಗಳು (ಹಠಾತ್ ಮರಗಟ್ಟುವಿಕೆ, ಗೊಂದಲ, ಮಾತಿನ ತೊಂದರೆ)"
    ]
  }
};

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi' | 'Kannada'>('English');
  const [isLoading, setIsLoading] = useState(false);

  const languages = ['English', 'Hindi', 'Kannada'];
  const t = translations[selectedLanguage];

  // Initialize messages when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: t.initialMessage,
        timestamp: new Date()
      }
    ]);
  }, [selectedLanguage]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(currentMessage);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);

    setCurrentMessage('');
  };

  const generateBotResponse = (symptom: string) => {
    const responses = {
      English: {
        'fever': 'Based on your fever symptoms, here are some recommendations:\n\n• Stay hydrated with plenty of fluids\n• Rest and avoid strenuous activities\n• Monitor your temperature regularly\n• Consider paracetamol for temperature control\n\n⚠️ Seek immediate medical attention if fever exceeds 103°F (39.4°C) or persists for more than 3 days.',
        'headache': 'For headache relief:\n\n• Ensure adequate hydration\n• Rest in a quiet, dark room\n• Apply cold or warm compress\n• Check if it\'s related to stress or eye strain\n\n⚠️ Consult a doctor if headache is severe, sudden, or accompanied by vision changes.',
        'stomach': 'For stomach-related issues:\n\n• Stay hydrated with small sips of water\n• Avoid solid foods temporarily\n• Try BRAT diet (Bananas, Rice, Applesauce, Toast)\n• Rest and avoid dairy products\n\n⚠️ Seek medical help if you experience severe pain, blood in vomit/stool, or signs of dehydration.',
        'cough': 'For cough and respiratory symptoms:\n\n• Stay hydrated and use a humidifier\n• Try warm water with honey and lemon\n• Avoid irritants like smoke\n• Get adequate rest\n\n⚠️ Consult a doctor if cough persists >2 weeks, produces blood, or is accompanied by high fever.',
        'joint': 'For joint pain:\n\n• Apply ice for acute pain, heat for chronic pain\n• Gentle stretching and movement\n• Over-the-counter pain relievers\n• Rest the affected joint\n\n⚠️ See a doctor if joint is swollen, red, warm, or if pain is severe.',
        'fatigue': 'For fatigue:\n\n• Ensure adequate sleep (7-9 hours)\n• Stay hydrated\n• Eat balanced meals\n• Light exercise if possible\n\n⚠️ Consult a doctor if fatigue persists for weeks or is accompanied by other symptoms.',
        'anxiety': 'For anxiety symptoms:\n\n• Practice deep breathing exercises\n• Try meditation or mindfulness\n• Regular physical activity\n• Maintain a regular sleep schedule\n\n⚠️ Seek professional help if anxiety interferes with daily activities or causes panic attacks.',
        'default': 'Based on your symptoms, here are some general recommendations:\n\n• Monitor your symptoms closely\n• Stay hydrated and get adequate rest\n• Maintain good hygiene\n• Consider over-the-counter remedies if appropriate\n\n⚠️ Please consult with a healthcare professional for proper diagnosis and treatment, especially if symptoms worsen or persist.'
      },
      Hindi: {
        'fever': 'आपके बुखार के लक्षणों के आधार पर, यहाँ कुछ सुझाव हैं:\n\n• भरपूर तरल पदार्थ पिएं\n• आराम करें और कठिन गतिविधियों से बचें\n• नियमित रूप से तापमान की जांच करें\n• तापमान नियंत्रण के लिए पैरासिटामोल लें\n\n⚠️ यदि बुखार 103°F (39.4°C) से अधिक है या 3 दिनों से अधिक बना रहता है तो तुरंत चिकित्सा सहायता लें।',
        'headache': 'सिरदर्द से राहत के लिए:\n\n• पर्याप्त पानी पिएं\n• शांत, अंधेरे कमरे में आराम करें\n• ठंडी या गर्म सिकाई करें\n• देखें कि यह तनाव या आंखों के तनाव से संबंधित है या नहीं\n\n⚠️ यदि सिरदर्द गंभीर, अचानक है या दृष्टि में परिवर्तन के साथ है तो डॉक्टर से सलाह लें।',
        'stomach': 'पेट की समस्याओं के लिए:\n\n• थोड़ा-थोड़ा पानी पिएं\n• अस्थायी रूप से ठोस भोजन से बचें\n• BRAT आहार (केला, चावल, सेब, टोस्ट) लें\n• आराम करें और डेयरी उत्पादों से बचें\n\n⚠️ यदि गंभीर दर्द, खून की उल्टी/मल, या निर्जलीकरण के लक्षण हों तो चिकित्सा सहायता लें।',
        'cough': 'खांसी और श्वसन लक्षणों के लिए:\n\n• हाइड्रेटेड रहें और ह्यूमिडिफायर का उपयोग करें\n• शहद और नींबू के साथ गर्म पानी लें\n• धुआं जैसे परेशान करने वाले तत्वों से बचें\n• पर्याप्त आराम करें\n\n⚠️ यदि खांसी 2 सप्ताह से अधिक बनी रहे, खून निकले या तेज बुखार के साथ हो तो डॉक्टर से सलाह लें।',
        'joint': 'जोड़ों के दर्द के लिए:\n\n• तीव्र दर्द के लिए बर्फ, पुराने दर्द के लिए गर्मी लगाएं\n• हल्की स्ट्रेचिंग और हरकत करें\n• काउंटर दर्द निवारक लें\n• प्रभावित जोड़ को आराम दें\n\n⚠️ यदि जोड़ सूजा हुआ, लाल, गर्म है या दर्द गंभीर है तो डॉक्टर को दिखाएं।',
        'fatigue': 'थकान के लिए:\n\n• पर्याप्त नींद लें (7-9 घंटे)\n• हाइड्रेटेड रहें\n• संतुलित भोजन लें\n• यदि संभव हो तो हल्का व्यायाम करें\n\n⚠️ यदि थकान हफ्तों तक बनी रहे या अन्य लक्षणों के साथ हो तो डॉक्टर से सलाह लें।',
        'anxiety': 'चिंता के लक्षणों के लिए:\n\n• गहरी सांस की तकनीक अभ्यास करें\n• ध्यान या माइंडफुलनेस करें\n• नियमित शारीरिक गतिविधि करें\n• नियमित नींद का समय रखें\n\n⚠️ यदि चिंता दैनिक गतिविधियों में बाधा डाले या पैनिक अटैक का कारण बने तो पेशेवर मदद लें।',
        'default': 'आपके लक्षणों के आधार पर, यहाँ कुछ सामान्य सुझाव हैं:\n\n• अपने लक्षणों पर ध्यान दें\n• हाइड्रेटेड रहें और पर्याप्त आराम करें\n• अच्छी स्वच्छता बनाए रखें\n• यदि उपयुक्त हो तो काउंटर दवाएं लें\n\n⚠️ कृपया उचित निदान और उपचार के लिए स्वास्थ्य पेशेवर से सलाह लें।'
      },
      Kannada: {
        'fever': 'ನಿಮ್ಮ ಜ್ವರದ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ, ಇಲ್ಲಿ ಕೆಲವು ಶಿಫಾರಸುಗಳಿವೆ:\n\n• ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಸೇವಿಸಿ\n• ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ ಮತ್ತು ಕಠಿಣ ಚಟುವಟಿಕೆಗಳನ್ನು ತಪ್ಪಿಸಿ\n• ನಿಯಮಿತವಾಗಿ ತಾಪಮಾನವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ\n• ತಾಪಮಾನ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಪ್ಯಾರಾಸಿಟಮಾಲ್ ಪರಿಗಣಿಸಿ\n\n⚠️ ಜ್ವರವು 103°F (39.4°C) ಮೀರಿದರೆ ಅಥವಾ 3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಮುಂದುವರಿದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ।',
        'headache': 'ತಲೆನೋವಿಗೆ ಪರಿಹಾರಕ್ಕಾಗಿ:\n\n• ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ\n• ಶಾಂತ, ಕತ್ತಲೆ ಕೋಣೆಯಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ\n• ತಣ್ಣನೆಯ ಅಥವಾ ಬೆಚ್ಚಗಿನ ಸಿಕ್ಕಣ ಮಾಡಿ\n• ಇದು ಒತ್ತಡ ಅಥವಾ ಕಣ್ಣಿನ ಒತ್ತಡಕ್ಕೆ ಸಂಬಂಧಿಸಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ\n\n⚠️ ತಲೆನೋವು ತೀವ್ರ, ಹಠಾತ್ ಅಥವಾ ದೃಷ್ಟಿ ಬದಲಾವಣೆಗಳೊಂದಿಗೆ ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ।',
        // Continuation of the Kannada responses
        'stomach': 'ಹೊಟ್ಟೆ ಸಂಬಂಧಿತ ಸಮಸ್ಯೆಗಳಿಗೆ:\n\n• ಸ್ವಲ್ಪ ಸ್ವಲ್ಪ ನೀರು ಕುಡಿಯಿರಿ\n• ತಾತ್ಕಾಲಿಕವಾಗಿ ಘನ ಆಹಾರವನ್ನು ತಪ್ಪಿಸಿ\n• BRAT ಆಹಾರ (ಬಾಳೆಹಣ್ಣು, ಅನ್ನ, ಸೇಬು, ಟೋಸ್ಟ್) ಪ್ರಯತ್ನಿಸಿ\n• ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ ಮತ್ತು ಡೈರಿ ಉತ್ಪನ್ನಗಳನ್ನು ತಪ್ಪಿಸಿ\n\n⚠️ ತೀವ್ರ ನೋವು, ವಾಂತಿ/ಮಲದಲ್ಲಿ ರಕ್ತ, ಅಥವಾ ನಿರ್ಜಲೀಕರಣದ ಲಕ್ಷಣಗಳಿದ್ದರೆ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ।',
        'cough': 'ಕೆಮ್ಮು ಮತ್ತು ಉಸಿರಾಟದ ಲಕ್ಷಣಗಳಿಗೆ:\n\n• ಹೈಡ್ರೇಟ್ ಆಗಿರಿ ಮತ್ತು ಹ್ಯೂಮಿಡಿಫೈಯರ್ ಬಳಸಿ\n• ಜೇನುತುಪ್ಪ ಮತ್ತು ನಿಂಬೆ ರಸದೊಂದಿಗೆ ಬೆಚ್ಚಗಿನ ನೀರು ಪ್ರಯತ್ನಿಸಿ\n• ಧೂಮಪಾನ ಅಥವಾ ಇತರ ಉದ್ದೀಪಕಗಳನ್ನು ತಪ್ಪಿಸಿ\n• ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ\n\n⚠️ ಕೆಮ್ಮು 2 ವಾರಕ್ಕಿಂತ ಹೆಚ್ಚು ಮುಂದುವರಿದರೆ, ರಕ್ತದೊಡನೆ ಉಂಟಾದರೆ ಅಥವಾ ತೀವ್ರ ಜ್ವರದೊಂದಿಗೆ ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ।',
        'joint': 'ಸಂಯುಕ್ತ ನೋವಿಗೆ:\n\n• ತೀವ್ರ ನೋವಿಗೆ ಐಸ್ ಲಾಗಿಸಿ, ದೀರ್ಘಕಾಲದ ನೋವಿಗೆ ಹಾಟ್ ಪ್ಯಾಕ್\n• ಸರಳ ಸ್ಟ್ರೆಚಿಂಗ್ ಮತ್ತು ಚಲನೆ\n• ಕೌಂಟರ್ ಮೆಡಿಸಿನ್ ಬಳಸಿ\n• ಪೀಡಿತ ಸಂಯುಕ್ತಕ್ಕೆ ವಿಶ್ರಾಂತಿ\n\n⚠️ ಸಂಯುಕ್ತವು ಉಬ್ಬಿದರೆ, ಕೆಂಪಾಗಿದರೆ ಅಥವಾ ತೀವ್ರ ನೋವಿದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ।',
        'fatigue': 'ಆಯಾಸಕ್ಕೆ:\n\n• ಸಾಕಷ್ಟು ನಿದ್ರೆ ಪಡೆಯಿರಿ (7-9 ಗಂಟೆಗಳು)\n• ಹೈಡ್ರೇಟ್ ಆಗಿರಿ\n• ಸಮತೋಲನದ ಆಹಾರ ಸೇವಿಸಿ\n• ಸಾಧ್ಯವಾದರೆ ಹಗುರವಾದ ವ್ಯಾಯಾಮ ಮಾಡಿ\n\n⚠️ ಆಯಾಸವು ವಾರಗಳವರೆಗೆ ಮುಂದುವರಿದರೆ ಅಥವಾ ಇತರ ಲಕ್ಷಣಗಳೊಂದಿಗೆ ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ।',
        'anxiety': 'ಆತಂಕ ಲಕ್ಷಣಗಳಿಗೆ:\n\n• ಆಳವಾದ ಉಸಿರಾಟದ ಅಭ್ಯಾಸ ಮಾಡಿ\n• ಧ್ಯಾನ ಅಥವಾ ಮೈಂಡ್‌ಫುಲ್‌ನೆಸ್ ಪ್ರಯತ್ನಿಸಿ\n• ನಿಯಮಿತ ಶಾರೀರಿಕ ಚಟುವಟಿಕೆ\n• ನಿಯಮಿತ ನಿದ್ರಾ ವೇಳಾಪಟ್ಟಿ ಉಳಿಸಿ\n\n⚠️ ಆತಂಕವು ದೈನಂದಿನ ಚಟುವಟಿಕೆಗಳಿಗೆ ಅಡಚಣೆಯಾಗಿದರೆ ಅಥವಾ ಪ್ಯಾನಿಕ್ ಅಟ್ಯಾಕ್‌ಗಳಿಗೆ ಕಾರಣವಾಗಿದರೆ ತಜ್ಞರ ಸಹಾಯ ಪಡೆಯಿರಿ।',
        'default': 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ, ಇಲ್ಲಿವೆ ಕೆಲ ಸಾಮಾನ್ಯ ಶಿಫಾರಸುಗಳು:\n\n• ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ\n• ಹೈಡ್ರೇಟ್ ಆಗಿರಿ ಮತ್ತು ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ\n• ಉತ್ತಮ ಸ್ವಚ್ಛತೆ ಉಳಿಸಿ\n• ಕೌಂಟರ್ ಮೆಡಿಸಿನ್ ಪರಿಗಣಿಸಿ (ಯೋಗ್ಯವಾದರೆ)\n\n⚠️ ದಯವಿಟ್ಟು ಸರಿಯಾದ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ವೈದ್ಯಕೀಯ ತಜ್ಞರೊಂದಿಗೆ ಸಲಹೆ ಪಡೆಯಿರಿ।'
      }
    };

    symptom = symptom.toLowerCase();
    if (symptom.includes('fever')) return responses[selectedLanguage]['fever'];
    if (symptom.includes('headache')) return responses[selectedLanguage]['headache'];
    if (symptom.includes('stomach')) return responses[selectedLanguage]['stomach'];
    if (symptom.includes('cough') || symptom.includes('cold')) return responses[selectedLanguage]['cough'];
    if (symptom.includes('joint') || symptom.includes('pain')) return responses[selectedLanguage]['joint'];
    if (symptom.includes('fatigue') || symptom.includes('tired')) return responses[selectedLanguage]['fatigue'];
    if (symptom.includes('anxiety')) return responses[selectedLanguage]['anxiety'];

    return responses[selectedLanguage]['default'];
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle><Brain className="inline mr-2" /> {t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Languages />
            <Select value={selectedLanguage} onValueChange={(lang) => setSelectedLanguage(lang as any)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mb-4"><Info className="inline mr-2" />{t.disclaimer}</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle><MessageSquare className="inline mr-2" /> {t.chatTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[300px] overflow-y-auto p-2 border rounded bg-muted">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-white border'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-muted-foreground text-sm">AI is typing...</div>}
          </div>

          <div className="mt-4">
            <Textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t.placeholder}
              className="w-full resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">{t.sendHint}</p>
            <Button onClick={handleSendMessage} className="mt-2" disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" /> {t.send}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle><Bot className="inline mr-2" /> {t.commonSymptoms}</CardTitle>
          <CardDescription>{t.commonSymptomsDesc}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {t.symptoms.map((symptom, index) => (
            <Badge key={index} onClick={() => setCurrentMessage(symptom)} className="cursor-pointer">
              {symptom}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle><AlertTriangle className="inline mr-2" /> {t.emergencyTitle}</CardTitle>
          <CardDescription>{t.emergencyDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 mb-4">
            {t.emergencySymptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <Button variant="destructive">
            <Phone className="mr-2 h-4 w-4" /> {t.callEmergency}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;
