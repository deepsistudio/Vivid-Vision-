
import { TranslationSet } from './types';

export const DEFAULT_PORTFOLIO = [
  { id: 1, title: 'Echoes of the North', category: 'Commercial', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop', size: 'large' },
  { id: 2, title: 'Concrete Dreams', category: 'Music Video', img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop', size: 'small' },
  { id: 3, title: 'Lost in Translation', category: 'Short Film', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop', size: 'small' },
  { id: 4, title: 'Neon Pulse', category: 'Music Video', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop', size: 'medium' },
];

export const TRANSLATIONS: Record<'en' | 'pb' | 'hi', TranslationSet> = {
  en: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'Studio',
      bollywood: 'Bollywood',
      drill: 'Hip-Hop',
      contact: 'Contact',
      lab: 'Creative Lab'
    },
    hero: {
      title: 'Vivid Vision Films',
      subtitle: 'Directed by Vision & Vivid. Premium music videos and cinematic storytelling from Toronto to Mumbai.',
      cta: 'Explore Showreel',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop'
    },
    portfolio: {
      title: 'Selected Works',
      subtitle: 'A curated selection of cinematic legacies.',
      items: DEFAULT_PORTFOLIO
    },
    about: {
      title: 'Vision & Vivid',
      vision: 'Founded by the creative duo Vision and Vivid, we aim to merge architectural precision with raw cinematic emotion.',
      mission: 'Our studio is a playground for bold ideas. Vision leads the cinematic aesthetic while Vivid orchestrates the creative narrative.',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
      stats: {
        projects: 'Films Directed',
        clients: 'Global Artists',
        awards: 'Industry Honors'
      }
    },
    lab: {
      title: 'The Vision Lab',
      description: 'Step into the futuristic workspace of Vision. Upload a frame and let AI expand the world.',
      placeholder: 'Describe your visual evolution...',
      edit: 'Generate Frame',
      upload: 'Input Source'
    }
  },
  pb: {
    nav: {
      home: 'ਹੋਮ',
      portfolio: 'ਪੋਰਟਫੋਲੀਓ',
      about: 'ਸਟੂਡੀਓ',
      bollywood: 'ਬਾਲੀਵੁੱਡ',
      drill: 'ਹਿਪ-ਹੌਪ',
      contact: 'ਸੰਪਰਕ',
      lab: 'ਕ੍ਰਿਏਟਿਵ ਲੈਬ'
    },
    hero: {
      title: 'ਵਿਵਿਡ ਵਿਜ਼ਨ ਫਿਲਮਜ਼',
      subtitle: 'ਵਿਜ਼ਨ ਅਤੇ ਵਿਵਿਡ ਦੁਆਰਾ ਨਿਰਦੇਸ਼ਤ। ਟੋਰਾਂਟੋ ਤੋਂ ਮੁੰਬਈ ਤੱਕ ਪ੍ਰੀਮੀਅਮ ਸਿਨੇਮੈਟਿਕ ਕਹਾਣੀ ਸੁਣਾਉਣਾ।',
      cta: 'ਸ਼ੋਰੀਲ ਦੇਖੋ',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop'
    },
    portfolio: {
      title: 'ਚੋਣਵਾਂ ਕੰਮ',
      subtitle: 'ਸਿਨੇਮੈਟਿਕ ਵਿਰਾਸਤ ਦੀ ਇੱਕ ਚੋਣ।',
      items: DEFAULT_PORTFOLIO
    },
    about: {
      title: 'ਵਿਜ਼ਨ ਅਤੇ ਵਿਵਿਡ',
      vision: 'ਰਚਨਾਤਮਕ ਜੋੜੀ ਵਿਜ਼ਨ ਅਤੇ ਵਿਵਿਡ ਦੁਆਰਾ ਸਥਾਪਿਤ, ਸਾਡਾ ਉਦੇਸ਼ ਆਰਕੀਟੈਕਚਰਲ ਸ਼ੁੱਧਤਾ ਨੂੰ ਕੱਚੀ ਸਿਨੇਮੈਟਿਕ ਭਾਵਨਾ ਨਾਲ ਜੋੜਨਾ ਹੈ।',
      mission: 'ਸਾਡਾ ਸਟੂਡੀਓ ਦਲੇਰ ਵਿਚਾਰਾਂ ਲਈ ਇੱਕ ਖੇਡ ਦਾ ਮੈਦਾਨ ਹੈ। ਵਿਜ਼ਨ ਸਿਨੇਮੈਟਿਕ ਸੁਹਜ ਦੀ ਅਗਵਾਈ ਕਰਦਾ ਹੈ ਜਦੋਂ ਕਿ ਵਿਵਿਡ ਰਚਨਾਤਮਕ ਕਹਾਣੀ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦਾ ਹੈ।',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
      stats: {
        projects: 'ਨਿਰਦੇਸ਼ਿਤ ਫਿਲਮਾਂ',
        clients: 'ਗਲੋਬਲ ਕਲਾਕਾਰ',
        awards: 'ਉਦਯੋਗ ਸਨਮਾਨ'
      }
    },
    lab: {
      title: 'ਵਿਜ਼ਨ ਲੈਬ',
      description: 'ਵਿਜ਼ਨ ਦੇ ਭਵਿੱਖਮੁਖੀ ਕਾਰਜਸਥਾਨ ਵਿੱਚ ਕਦਮ ਰੱਖੋ। ਇੱਕ ਫਰੇਮ ਅਪਲੋਡ ਕਰੋ ਅਤੇ AI ਨੂੰ ਦੁਨੀਆ ਦਾ ਵਿਸਤਾਰ ਕਰਨ ਦਿਓ।',
      placeholder: 'ਆਪਣੇ ਵਿਜ਼ੂਅਲ ਵਿਕਾਸ ਦਾ ਵਰਣਨ ਕਰੋ...',
      edit: 'ਫਰੇਮ ਤਿਆਰ ਕਰੋ',
      upload: 'ਇਨਪੁਟ ਸਰੋਤ'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      portfolio: 'पोर्टफोलियो',
      about: 'स्टूडियो',
      bollywood: 'बॉलीवुड',
      drill: 'हिप-हॉप',
      contact: 'संपर्क',
      lab: 'क्रिएटिव लैब'
    },
    hero: {
      title: 'विविड विजन फिल्म्स',
      subtitle: 'विजन और विविड द्वारा निर्देशित। टोरंटो से मुंबई तक प्रीमियम सिनेमाई कहानी।',
      cta: 'शोरील देखें',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop'
    },
    portfolio: {
      title: 'चुनिंदा कार्य',
      subtitle: 'सिनेमाई विरासतों का एक चयन।',
      items: DEFAULT_PORTFOLIO
    },
    about: {
      title: 'विजन और विविड',
      vision: 'रचनात्मक जोड़ी विजन और विविड द्वारा स्थापित, हमारा लक्ष्य वास्तुशिल्प सटीकता को सिनेमाई भावना के साथ मिलाना है।',
      mission: 'हमारा स्टूडियो साहसिक विचारों के लिए एक खेल का मैदान है। विजन सिनेमाई सौंदर्य का नेतृत्व करते हैं जबकि विविड रचनात्मक कहानी का संचालन करते हैं।',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
      stats: {
        projects: 'निर्देशित फिल्में',
        clients: 'वैश्विक कलाकार',
        awards: 'उद्योग सम्मान'
      }
    },
    lab: {
      title: 'विजन लैब',
      description: 'विजन के भविष्य के कार्यक्षेत्र में कदम रखें। एक फ्रेम अपलोड करें और एआई को दुनिया का विस्तार करने दें।',
      placeholder: 'अपने दृश्य विकास का वर्णन करें...',
      edit: 'फ्रेम जेनरेट करें',
      upload: 'इनपुट स्रोत'
    }
  }
};
