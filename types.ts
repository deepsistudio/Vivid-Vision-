
export type Language = 'en' | 'pb' | 'hi';
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'portfolio' | 'about' | 'bollywood' | 'drill' | 'contact' | 'lab' | 'admin' | 'login';

export interface TranslationSet {
  nav: {
    home: string;
    portfolio: string;
    about: string;
    bollywood: string;
    drill: string;
    contact: string;
    lab: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    image: string; // Dynamic hero image
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: Array<{
      id: number;
      title: string;
      category: string;
      img: string;
      size: string;
    }>;
  };
  about: {
    title: string;
    vision: string;
    mission: string;
    image: string; // Founder image
    stats: {
      projects: string;
      clients: string;
      awards: string;
    };
  };
  lab: {
    title: string;
    description: string;
    placeholder: string;
    edit: string;
    upload: string;
  };
}
