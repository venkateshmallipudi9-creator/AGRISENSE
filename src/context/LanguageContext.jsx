import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    name: 'English',

    dashboard: 'Dashboard',
    detection: 'AI Detection',
    weather: 'Weather',
    farm: 'Farm Intelligence',
    about: 'About',
    support: 'Support',
    signOut: 'Sign out',
    language: 'Language',

    welcome: 'Welcome to AGRISENSE AI',
    smartFarmingTitle: 'Smart farming starts with better decisions.',
    welcomeFarmer: 'Welcome back',
    homeDescription:
      'Use AI-powered tools to understand plant health, weather conditions, soil information and suitable crops.',

    scanPlant: 'Scan a Plant',
    viewWeather: 'Check Weather',

    fastAnalysis: 'Fast analysis',
    simpleRecommendations: 'Simple recommendations',
    builtForFarmers: 'Built for farmers',

    aiReady: 'AI Ready',
    cameraUpload: 'Camera & image upload',
    smartGuidance: 'Smart guidance',
    actionableCare: 'Actionable care tips',

    workspace: 'Your workspace',
    everythingYouNeed: 'Everything you need for smarter farming.',
    dashboardDescription:
      'Access plant detection, weather intelligence, soil information and farming recommendations from one place.',

    newPlantScan: 'New Plant Scan',
    cameraOrUpload: 'Use camera or upload a photo',

    checkWeatherDescription: 'View weather and 7-day forecast',

    farmIntelligence: 'Farm Intelligence',
    soilCropDescription: 'Explore soil, minerals and suitable crops',

    profile: 'Your Profile',
    accountPreferences: 'Account and preferences',

    threeSimpleSteps: 'Three simple steps',
    fromLeafToInsight: 'From leaf to insight.',

    capture: 'Capture',
    captureDescription:
      'Take a clear photo of the affected leaf or upload one from your device.',

    analyze: 'Analyze',
    analyzeDescription:
      'Our AI workflow reviews the image and provides a likely condition and confidence.',

    act: 'Act',
    actDescription:
      'Use the recommendations and next steps as a practical starting point for crop care.',

    plantHealthMadeClearer: 'Plant health and smart farming, made clearer.'
  },

  hi: {
    name: 'हिन्दी',

    dashboard: 'डैशबोर्ड',
    detection: 'AI पहचान',
    weather: 'मौसम',
    farm: 'कृषि जानकारी',
    about: 'हमारे बारे में',
    support: 'सहायता',
    signOut: 'साइन आउट',
    language: 'भाषा',

    welcome: 'AGRISENSE AI में आपका स्वागत है',
    smartFarmingTitle: 'बेहतर निर्णयों से स्मार्ट खेती शुरू होती है।',
    welcomeFarmer: 'स्वागत है',
    homeDescription:
      'पौधों के स्वास्थ्य, मौसम, मिट्टी और उपयुक्त फसलों को समझने के लिए AI आधारित उपकरणों का उपयोग करें।',

    scanPlant: 'पौधे की जांच करें',
    viewWeather: 'मौसम देखें',

    fastAnalysis: 'तेज़ विश्लेषण',
    simpleRecommendations: 'सरल सुझाव',
    builtForFarmers: 'किसानों के लिए बनाया गया',

    aiReady: 'AI तैयार है',
    cameraUpload: 'कैमरा और फोटो अपलोड',
    smartGuidance: 'स्मार्ट मार्गदर्शन',
    actionableCare: 'उपयोगी देखभाल सुझाव',

    workspace: 'आपका कार्यक्षेत्र',
    everythingYouNeed: 'स्मार्ट खेती के लिए आवश्यक सभी सुविधाएं।',
    dashboardDescription:
      'एक ही स्थान से पौधों की पहचान, मौसम, मिट्टी की जानकारी और खेती के सुझाव प्राप्त करें।',

    newPlantScan: 'नया पौधा स्कैन',
    cameraOrUpload: 'कैमरे का उपयोग करें या फोटो अपलोड करें',

    checkWeatherDescription: 'मौसम और 7 दिनों का पूर्वानुमान देखें',

    farmIntelligence: 'कृषि जानकारी',
    soilCropDescription: 'मिट्टी, खनिज और उपयुक्त फसलों की जानकारी',

    profile: 'आपकी प्रोफ़ाइल',
    accountPreferences: 'खाता और प्राथमिकताएं',

    threeSimpleSteps: 'तीन आसान चरण',
    fromLeafToInsight: 'पत्ते से जानकारी तक।',

    capture: 'फोटो लें',
    captureDescription:
      'प्रभावित पत्ते की साफ फोटो लें या अपने डिवाइस से फोटो अपलोड करें।',

    analyze: 'विश्लेषण करें',
    analyzeDescription:
      'AI फोटो का विश्लेषण करके संभावित समस्या और विश्वास स्तर बताता है।',

    act: 'कार्रवाई करें',
    actDescription:
      'फसल की देखभाल के लिए दिए गए सुझावों और अगले चरणों का उपयोग करें।',

    plantHealthMadeClearer:
      'पौधों का स्वास्थ्य और स्मार्ट खेती अब और आसान।'
  },

  kn: {
    name: 'ಕನ್ನಡ',

    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    detection: 'AI ಪತ್ತೆ',
    weather: 'ಹವಾಮಾನ',
    farm: 'ಕೃಷಿ ಮಾಹಿತಿ',
    about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    support: 'ಬೆಂಬಲ',
    signOut: 'ಸೈನ್ ಔಟ್',
    language: 'ಭಾಷೆ',

    welcome: 'AGRISENSE AI ಗೆ ಸ್ವಾಗತ',
    smartFarmingTitle: 'ಉತ್ತಮ ನಿರ್ಧಾರಗಳಿಂದ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.',
    welcomeFarmer: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    homeDescription:
      'ಸಸ್ಯ ಆರೋಗ್ಯ, ಹವಾಮಾನ, ಮಣ್ಣಿನ ಮಾಹಿತಿ ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು AI ಆಧಾರಿತ ಸಾಧನಗಳನ್ನು ಬಳಸಿ.',

    scanPlant: 'ಸಸ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ',
    viewWeather: 'ಹವಾಮಾನ ಪರಿಶೀಲಿಸಿ',

    fastAnalysis: 'ವೇಗದ ವಿಶ್ಲೇಷಣೆ',
    simpleRecommendations: 'ಸರಳ ಸಲಹೆಗಳು',
    builtForFarmers: 'ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ',

    aiReady: 'AI ಸಿದ್ಧವಾಗಿದೆ',
    cameraUpload: 'ಕ್ಯಾಮೆರಾ ಮತ್ತು ಚಿತ್ರ ಅಪ್‌ಲೋಡ್',
    smartGuidance: 'ಸ್ಮಾರ್ಟ್ ಮಾರ್ಗದರ್ಶನ',
    actionableCare: 'ಉಪಯುಕ್ತ ಆರೈಕೆ ಸಲಹೆಗಳು',

    workspace: 'ನಿಮ್ಮ ಕಾರ್ಯಕ್ಷೇತ್ರ',
    everythingYouNeed: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ.',
    dashboardDescription:
      'ಒಂದೇ ಸ್ಥಳದಿಂದ ಸಸ್ಯ ಪತ್ತೆ, ಹವಾಮಾನ, ಮಣ್ಣಿನ ಮಾಹಿತಿ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',

    newPlantScan: 'ಹೊಸ ಸಸ್ಯ ಸ್ಕ್ಯಾನ್',
    cameraOrUpload: 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಅಥವಾ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',

    checkWeatherDescription: 'ಹವಾಮಾನ ಮತ್ತು 7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ನೋಡಿ',

    farmIntelligence: 'ಕೃಷಿ ಮಾಹಿತಿ',
    soilCropDescription: 'ಮಣ್ಣು, ಖನಿಜಗಳು ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳ ಮಾಹಿತಿ',

    profile: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',
    accountPreferences: 'ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು',

    threeSimpleSteps: 'ಮೂರು ಸರಳ ಹಂತಗಳು',
    fromLeafToInsight: 'ಎಲೆಯಿಂದ ಮಾಹಿತಿಯವರೆಗೆ.',

    capture: 'ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ',
    captureDescription:
      'ಬಾಧಿತ ಎಲೆಯ ಸ್ಪಷ್ಟ ಚಿತ್ರ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಸಾಧನದಿಂದ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',

    analyze: 'ವಿಶ್ಲೇಷಿಸಿ',
    analyzeDescription:
      'AI ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಸಂಭವನೀಯ ಸಮಸ್ಯೆ ಮತ್ತು ವಿಶ್ವಾಸ ಮಟ್ಟವನ್ನು ನೀಡುತ್ತದೆ.',

    act: 'ಕ್ರಮ ಕೈಗೊಳ್ಳಿ',
    actDescription:
      'ಬೆಳೆ ಆರೈಕೆಗಾಗಿ ನೀಡಿರುವ ಸಲಹೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತಗಳನ್ನು ಬಳಸಿ.',

    plantHealthMadeClearer:
      'ಸಸ್ಯ ಆರೋಗ್ಯ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಈಗ ಇನ್ನಷ್ಟು ಸರಳ.'
  },

  te: {
    name: 'తెలుగు',

    dashboard: 'డాష్‌బోర్డ్',
    detection: 'AI గుర్తింపు',
    weather: 'వాతావరణం',
    farm: 'వ్యవసాయ సమాచారం',
    about: 'మా గురించి',
    support: 'సహాయం',
    signOut: 'సైన్ అవుట్',
    language: 'భాష',

    welcome: 'AGRISENSE AI కి స్వాగతం',
    smartFarmingTitle: 'మెరుగైన నిర్ణయాలతో స్మార్ట్ వ్యవసాయం ప్రారంభమవుతుంది.',
    welcomeFarmer: 'తిరిగి స్వాగతం',
    homeDescription:
      'మొక్కల ఆరోగ్యం, వాతావరణం, నేల సమాచారం మరియు సరైన పంటలను అర్థం చేసుకోవడానికి AI ఆధారిత సాధనాలను ఉపయోగించండి.',

    scanPlant: 'మొక్కను పరీక్షించండి',
    viewWeather: 'వాతావరణాన్ని చూడండి',

    fastAnalysis: 'వేగవంతమైన విశ్లేషణ',
    simpleRecommendations: 'సులభమైన సూచనలు',
    builtForFarmers: 'రైతుల కోసం రూపొందించబడింది',

    aiReady: 'AI సిద్ధంగా ఉంది',
    cameraUpload: 'కెమెరా & చిత్రం అప్‌లోడ్',
    smartGuidance: 'స్మార్ట్ మార్గదర్శకత్వం',
    actionableCare: 'ఉపయోగకరమైన సంరక్షణ సూచనలు',

    workspace: 'మీ వర్క్‌స్పేస్',
    everythingYouNeed: 'స్మార్ట్ వ్యవసాయానికి అవసరమైన ప్రతిదీ.',
    dashboardDescription:
      'ఒకే చోట మొక్కల గుర్తింపు, వాతావరణం, నేల సమాచారం మరియు వ్యవసాయ సూచనలను పొందండి.',

    newPlantScan: 'కొత్త మొక్క స్కాన్',
    cameraOrUpload: 'కెమెరా ఉపయోగించండి లేదా చిత్రాన్ని అప్‌లోడ్ చేయండి',

    checkWeatherDescription: 'వాతావరణం మరియు 7 రోజుల సూచన చూడండి',

    farmIntelligence: 'వ్యవసాయ సమాచారం',
    soilCropDescription: 'నేల, ఖనిజాలు మరియు సరైన పంటల సమాచారం',

    profile: 'మీ ప్రొఫైల్',
    accountPreferences: 'ఖాతా మరియు ప్రాధాన్యతలు',

    threeSimpleSteps: 'మూడు సులభమైన దశలు',
    fromLeafToInsight: 'ఆకు నుండి సమాచారం వరకు.',

    capture: 'చిత్రం తీయండి',
    captureDescription:
      'ప్రభావిత ఆకుకు స్పష్టమైన ఫోటో తీయండి లేదా మీ పరికరం నుండి అప్‌లోడ్ చేయండి.',

    analyze: 'విశ్లేషించండి',
    analyzeDescription:
      'AI చిత్రాన్ని విశ్లేషించి సంభావ్య సమస్య మరియు విశ్వాస స్థాయిని అందిస్తుంది.',

    act: 'చర్య తీసుకోండి',
    actDescription:
      'పంట సంరక్షణ కోసం సూచనలు మరియు తదుపరి దశలను ఉపయోగించండి.',

    plantHealthMadeClearer:
      'మొక్కల ఆరోగ్యం మరియు స్మార్ట్ వ్యవసాయం ఇప్పుడు మరింత సులభం.'
  },

  ta: {
    name: 'தமிழ்',

    dashboard: 'டாஷ்போர்டு',
    detection: 'AI கண்டறிதல்',
    weather: 'வானிலை',
    farm: 'விவசாய தகவல்',
    about: 'எங்களைப் பற்றி',
    support: 'ஆதரவு',
    signOut: 'வெளியேறு',
    language: 'மொழி',

    welcome: 'AGRISENSE AI-க்கு வரவேற்கிறோம்',
    smartFarmingTitle: 'சிறந்த முடிவுகளுடன் ஸ்மார்ட் விவசாயம் தொடங்குகிறது.',
    welcomeFarmer: 'மீண்டும் வரவேற்கிறோம்',
    homeDescription:
      'தாவர ஆரோக்கியம், வானிலை, மண் மற்றும் ஏற்ற பயிர்களைப் புரிந்துகொள்ள AI கருவிகளைப் பயன்படுத்துங்கள்.',

    scanPlant: 'தாவரத்தை பரிசோதிக்கவும்',
    viewWeather: 'வானிலையை பார்க்கவும்',

    fastAnalysis: 'வேகமான பகுப்பாய்வு',
    simpleRecommendations: 'எளிய பரிந்துரைகள்',
    builtForFarmers: 'விவசாயிகளுக்காக உருவாக்கப்பட்டது',

    aiReady: 'AI தயாராக உள்ளது',
    cameraUpload: 'கேமரா மற்றும் படம் பதிவேற்றம்',
    smartGuidance: 'ஸ்மார்ட் வழிகாட்டுதல்',
    actionableCare: 'பயனுள்ள பராமரிப்பு குறிப்புகள்',

    workspace: 'உங்கள் பணியிடம்',
    everythingYouNeed: 'ஸ்மார்ட் விவசாயத்திற்கு தேவையான அனைத்தும்.',
    dashboardDescription:
      'ஒரே இடத்தில் தாவர கண்டறிதல், வானிலை, மண் தகவல் மற்றும் விவசாய பரிந்துரைகளைப் பெறுங்கள்.',

    newPlantScan: 'புதிய தாவர ஸ்கேன்',
    cameraOrUpload: 'கேமராவைப் பயன்படுத்தவும் அல்லது படத்தை பதிவேற்றவும்',

    checkWeatherDescription: 'வானிலை மற்றும் 7 நாள் முன்னறிவிப்பைப் பார்க்கவும்',

    farmIntelligence: 'விவசாய தகவல்',
    soilCropDescription: 'மண், கனிமங்கள் மற்றும் ஏற்ற பயிர்கள் பற்றிய தகவல்',

    profile: 'உங்கள் சுயவிவரம்',
    accountPreferences: 'கணக்கு மற்றும் விருப்பங்கள்',

    threeSimpleSteps: 'மூன்று எளிய படிகள்',
    fromLeafToInsight: 'இலையிலிருந்து தகவல் வரை.',

    capture: 'படம் எடுக்கவும்',
    captureDescription:
      'பாதிக்கப்பட்ட இலையின் தெளிவான படத்தை எடுக்கவும் அல்லது சாதனத்திலிருந்து பதிவேற்றவும்.',

    analyze: 'பகுப்பாய்வு செய்யவும்',
    analyzeDescription:
      'AI படத்தை பகுப்பாய்வு செய்து சாத்தியமான பிரச்சனை மற்றும் நம்பகத்தன்மையை வழங்கும்.',

    act: 'செயல்படுங்கள்',
    actDescription:
      'பயிர் பராமரிப்பிற்கான பரிந்துரைகள் மற்றும் அடுத்த படிகளைப் பயன்படுத்துங்கள்.',

    plantHealthMadeClearer:
      'தாவர ஆரோக்கியம் மற்றும் ஸ்மார்ட் விவசாயம் இப்போது இன்னும் எளிது.'
  },

  ml: {
    name: 'മലയാളം',

    dashboard: 'ഡാഷ്ബോർഡ്',
    detection: 'AI പരിശോധന',
    weather: 'കാലാവസ്ഥ',
    farm: 'കാർഷിക വിവരം',
    about: 'ഞങ്ങളെക്കുറിച്ച്',
    support: 'സഹായം',
    signOut: 'സൈൻ ഔട്ട്',
    language: 'ഭാഷ',

    welcome: 'AGRISENSE AI-ലേക്ക് സ്വാഗതം',
    smartFarmingTitle: 'മികച്ച തീരുമാനങ്ങളിലൂടെ സ്മാർട്ട് കൃഷി ആരംഭിക്കുന്നു.',
    welcomeFarmer: 'വീണ്ടും സ്വാഗതം',
    homeDescription:
      'സസ്യങ്ങളുടെ ആരോഗ്യം, കാലാവസ്ഥ, മണ്ണിന്റെ വിവരങ്ങൾ, അനുയോജ്യമായ വിളകൾ എന്നിവ മനസ്സിലാക്കാൻ AI ഉപകരണങ്ങൾ ഉപയോഗിക്കുക.',

    scanPlant: 'ചെടി പരിശോധിക്കുക',
    viewWeather: 'കാലാവസ്ഥ കാണുക',

    fastAnalysis: 'വേഗത്തിലുള്ള വിശകലനം',
    simpleRecommendations: 'ലളിതമായ നിർദ്ദേശങ്ങൾ',
    builtForFarmers: 'കർഷകർക്കായി നിർമ്മിച്ചത്',

    aiReady: 'AI തയ്യാറാണ്',
    cameraUpload: 'ക്യാമറയും ചിത്രം അപ്‌ലോഡും',
    smartGuidance: 'സ്മാർട്ട് മാർഗനിർദ്ദേശം',
    actionableCare: 'പ്രായോഗിക പരിപാലന നിർദ്ദേശങ്ങൾ',

    workspace: 'നിങ്ങളുടെ പ്രവർത്തന സ്ഥലം',
    everythingYouNeed: 'സ്മാർട്ട് കൃഷിക്ക് ആവശ്യമായ എല്ലാം.',
    dashboardDescription:
      'ഒരിടത്ത് നിന്ന് സസ്യ പരിശോധന, കാലാവസ്ഥ, മണ്ണ് വിവരങ്ങൾ, കൃഷി നിർദ്ദേശങ്ങൾ എന്നിവ നേടുക.',

    newPlantScan: 'പുതിയ സസ്യ പരിശോധന',
    cameraOrUpload: 'ക്യാമറ ഉപയോഗിക്കുക അല്ലെങ്കിൽ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',

    checkWeatherDescription: 'കാലാവസ്ഥയും 7 ദിവസത്തെ പ്രവചനവും കാണുക',

    farmIntelligence: 'കാർഷിക വിവരം',
    soilCropDescription: 'മണ്ണ്, ധാതുക്കൾ, അനുയോജ്യമായ വിളകൾ എന്നിവ അറിയുക',

    profile: 'നിങ്ങളുടെ പ്രൊഫൈൽ',
    accountPreferences: 'അക്കൗണ്ടും മുൻഗണനകളും',

    threeSimpleSteps: 'മൂന്ന് ലളിതമായ ഘട്ടങ്ങൾ',
    fromLeafToInsight: 'ഇലയിൽ നിന്ന് വിവരത്തിലേക്ക്.',

    capture: 'ചിത്രം എടുക്കുക',
    captureDescription:
      'ബാധിച്ച ഇലയുടെ വ്യക്തമായ ചിത്രം എടുക്കുക അല്ലെങ്കിൽ ഉപകരണത്തിൽ നിന്ന് അപ്‌ലോഡ് ചെയ്യുക.',

    analyze: 'വിശകലനം ചെയ്യുക',
    analyzeDescription:
      'AI ചിത്രം വിശകലനം ചെയ്ത് സാധ്യതയുള്ള പ്രശ്നവും വിശ്വാസ്യതയും നൽകുന്നു.',

    act: 'നടപടി സ്വീകരിക്കുക',
    actDescription:
      'വിള പരിപാലനത്തിനായി നൽകിയിരിക്കുന്ന നിർദ്ദേശങ്ങളും അടുത്ത ഘട്ടങ്ങളും ഉപയോഗിക്കുക.',

    plantHealthMadeClearer:
      'സസ്യ ആരോഗ്യവും സ്മാർട്ട് കൃഷിയും ഇപ്പോൾ കൂടുതൽ എളുപ്പം.'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem('agrisense-language') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('agrisense-language', language);
  }, [language]);

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: translations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
}