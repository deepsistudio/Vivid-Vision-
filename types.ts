
export type Language = 'en' | 'pb' | 'hi';
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'portfolio' | 'about' | 'bollywood' | 'drill' | 'contact' | 'lab';

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
  };
  portfolio: {
    title: string;
    subtitle: string;
    categories: {
      music: string;
      commercial: string;
      films: string;
    };
  };
  about: {
    title: string;
    vision: string;
    mission: string;
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
