import { createContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import de from '../locales/de.json';
import { Language } from '../types/types';

type LanguageContextType = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  translations: typeof en;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    setTranslations(language === Language.ENGLISH ? en : de);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
