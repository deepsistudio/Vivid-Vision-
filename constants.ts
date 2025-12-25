
import { TranslationSet } from './types';

export const TRANSLATIONS: Record<'en' | 'pb' | 'hi', TranslationSet> = {
  en: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About',
      bollywood: 'Bollywood',
      drill: 'Hip-Hop',
      contact: 'Contact',
      lab: 'Creative Lab'
    },
    hero: {
      title: 'Crafting Visual Legacies',
      subtitle: 'Premium music videos, commercials, and cinematic storytelling from the heart of the industry.',
      cta: 'View Our Work'
    },
    portfolio: {
      title: 'Our Masterpieces',
      subtitle: 'A selection of our finest visual journeys.',
      categories: {
        music: 'Music Videos',
        commercial: 'Commercials',
        films: 'Short Films'
      }
    },
    about: {
      title: 'The Vision Behind the Lens',
      vision: 'To redefine visual excellence through bold storytelling and innovative cinematography.',
      mission: 'We bring your imagination to life with precision, passion, and premium production standards.',
      stats: {
        projects: 'Projects Completed',
        clients: 'Global Clients',
        awards: 'Creative Awards'
      }
    },
    lab: {
      title: 'AI Creative Lab',
      description: 'Upload a frame and use AI to transform your vision. Powered by Gemini 2.5 Flash.',
      placeholder: 'Describe the edit (e.g., "Make it a vintage film look")',
      edit: 'Transform Frame',
      upload: 'Upload Image'
    }
  },
  pb: {
    nav: {
      home: 'ਹੋਮ',
      portfolio: 'ਪੋਰਟਫੋਲੀਓ',
      about: 'ਬਾਰੇ',
      bollywood: 'ਬਾਲੀਵੁੱਡ',
      drill: 'ਹਿਪ-ਹੌਪ',
      contact: 'ਸੰਪਰਕ',
      lab: 'ਕ੍ਰਿਏਟਿਵ ਲੈਬ'
    },
    hero: {
      title: 'ਵਿਜ਼ੂਅਲ ਵਿਰਾਸਤ ਤਿਆਰ ਕਰਨਾ',
      subtitle: 'ਉਦਯੋਗ ਦੇ ਦਿਲ ਤੋਂ ਪ੍ਰੀਮੀਅਮ ਸੰਗੀਤ ਵੀਡੀਓ, ਇਸ਼ਤਿਹਾਰ ਅਤੇ ਸਿਨੇਮੈਟਿਕ ਕਹਾਣੀ ਸੁਣਾਉਣਾ।',
      cta: 'ਸਾਡਾ ਕੰਮ ਦੇਖੋ'
    },
    portfolio: {
      title: 'ਸਾਡੇ ਮਾਸਟਰਪੀਸ',
      subtitle: 'ਸਾਡੀ ਸਭ ਤੋਂ ਵਧੀਆ ਵਿਜ਼ੂਅਲ ਯਾਤਰਾਵਾਂ ਦੀ ਚੋਣ।',
      categories: {
        music: 'ਸੰਗੀਤ ਵੀਡੀਓ',
        commercial: 'ਵਪਾਰਕ',
        films: 'ਲਘੂ ਫਿਲਮਾਂ'
      }
    },
    about: {
      title: 'ਲੈਂਸ ਦੇ ਪਿੱਛੇ ਦੀ ਨਜ਼ਰ',
      vision: 'ਦਲੇਰ ਕਹਾਣੀ ਸੁਣਾਉਣ ਅਤੇ ਨਵੀਨਤਾਕਾਰੀ ਸਿਨੇਮੈਟੋਗ੍ਰਾਫੀ ਦੁਆਰਾ ਵਿਜ਼ੂਅਲ ਉੱਤਮਤਾ ਨੂੰ ਮੁੜ ਪਰਿਭਾਸ਼ਤ ਕਰਨਾ।',
      mission: 'ਅਸੀਂ ਤੁਹਾਡੀ ਕਲਪਨਾ ਨੂੰ ਸ਼ੁੱਧਤਾ, ਜਨੂੰਨ ਅਤੇ ਪ੍ਰੀਮੀਅਮ ਉਤਪਾਦਨ ਦੇ ਮਿਆਰਾਂ ਨਾਲ ਜੀਵਨ ਵਿੱਚ ਲਿਆਉਂਦੇ ਹਾਂ।',
      stats: {
        projects: 'ਪ੍ਰੋਜੈਕਟ ਪੂਰੇ ਹੋਏ',
        clients: 'ਗਲੋਬਲ ਕਲਾਇੰਟਸ',
        awards: 'ਰਚਨਾਤਮਕ ਪੁਰਸਕਾਰ'
      }
    },
    lab: {
      title: 'AI ਕ੍ਰਿਏਟਿਵ ਲੈਬ',
      description: 'ਇੱਕ ਫਰੇਮ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਆਪਣੇ ਦ੍ਰਿਸ਼ਟੀਕੋਣ ਨੂੰ ਬਦਲਣ ਲਈ AI ਦੀ ਵਰਤੋਂ ਕਰੋ।',
      placeholder: 'ਸੰਪਾਦਨ ਦਾ ਵਰਣਨ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, "ਇਸਨੂੰ ਵਿੰਟੇਜ ਫਿਲਮ ਦੀ ਦਿੱਖ ਦਿਓ")',
      edit: 'ਫਰੇਮ ਬਦਲੋ',
      upload: 'ਚਿੱਤਰ ਅੱਪਲੋਡ ਕਰੋ'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      portfolio: 'पोर्टफोलियो',
      about: 'परिचय',
      bollywood: 'बॉलीवुड',
      drill: 'हिप-हॉप',
      contact: 'संपर्क',
      lab: 'क्रिएटिव लैब'
    },
    hero: {
      title: 'विजुअल विरासत का निर्माण',
      subtitle: 'उद्योग के केंद्र से प्रीमियम संगीत वीडियो, विज्ञापन और सिनेमाई कहानी।',
      cta: 'हमारा काम देखें'
    },
    portfolio: {
      title: 'हमारी उत्कृष्ट कृतियाँ',
      subtitle: 'हमारी बेहतरीन विजुअल यात्राओं का चयन।',
      categories: {
        music: 'संगीत वीडियो',
        commercial: 'विज्ञापन',
        films: 'लघु फिल्में'
      }
    },
    about: {
      title: 'लेंस के पीछे की दृष्टि',
      vision: 'साहसिक कहानी और अभिनव सिनेमैटोग्राफी के माध्यम से विजुअल उत्कृष्टता को फिर से परिभाषित करना।',
      mission: 'हम आपकी कल्पना को सटीकता, जुनून और प्रीमियम उत्पादन मानकों के साथ जीवंत करते हैं।',
      stats: {
        projects: 'पूर्ण परियोजनाएं',
        clients: 'वैश्विक ग्राहक',
        awards: 'रचनात्मक पुरस्कार'
      }
    },
    lab: {
      title: 'AI क्रिएटिव लैब',
      description: 'एक फ्रेम अपलोड करें और अपनी दृष्टि को बदलने के लिए AI का उपयोग करें।',
      placeholder: 'संपादन का वर्णन करें (जैसे, "इसे विंटेज फिल्म लुक दें")',
      edit: 'फ्रेम बदलें',
      upload: 'इमेज अपलोड करें'
    }
  }
};
