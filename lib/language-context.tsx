'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Dashboard',
    products: 'Products',
    services: 'Services',
    support: 'Support',

    // Hero
    heroTitle: 'Stay Connected, Stay Ahead',
    heroSubtitle:
      "Experience seamless connectivity with Camtel - Cameroon's leading telecommunications provider. Fast, reliable, and always there for you.",
    exploreProducts: 'Explore Products',
    contactUs: 'Contact Us',

    // User Section
    welcome: 'Welcome',
    customerInfo: 'Customer Information',
    changePassword: 'Change Password',
    logout: 'Logout',
    notLoggedIn: 'Not Logged In',

    // Products
    featuredOffer: 'Featured Offer',
    xtremNetDongle: 'X-tremNet Dongle',
    xtremNetDesc:
      'High-speed internet on the go with our 4G dongle. Perfect for work, study, or entertainment anywhere.',
    perMonth: 'per month',
    learnMore: 'Learn More',

    // Quick Actions
    quickActions: 'Quick Actions',
    viewBills: 'View Bills',
    recharge: 'Recharge',
    dataUsage: 'Data Usage',

    // Contact
    contactDetails: 'Contact Details',
    address: 'Address',
    addressValue: 'B.P. Box: 1571 Yaounde, Cameroon',
    phone: 'Phone',
    fax: 'Fax',
    website: 'Website',
    email: 'Email',
    followUs: 'Follow Us',

    // Footer
    copyright: 'Telecom Camtel. All rights reserved.',
    tagline: "...Et ce n'est pas fini!",
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    services: 'Services',
    support: 'Support',

    // Hero
    heroTitle: "Restez Connecte, Gardez l'Avance",
    heroSubtitle:
      'Decouvrez une connectivite sans faille avec Camtel - le principal fournisseur de telecommunications du Cameroun. Rapide, fiable et toujours la pour vous.',
    exploreProducts: 'Decouvrir les Produits',
    contactUs: 'Nous Contacter',

    // User Section
    welcome: 'Bienvenue',
    customerInfo: 'Informations Client',
    changePassword: 'Changer le Mot de Passe',
    logout: 'Deconnexion',
    notLoggedIn: 'Non Connecte',

    // Products
    featuredOffer: 'Offre Vedette',
    xtremNetDongle: 'Cle X-tremNet',
    xtremNetDesc:
      'Internet haut debit en deplacement avec notre cle 4G. Parfait pour le travail, les etudes ou le divertissement partout.',
    perMonth: 'par mois',
    learnMore: 'En Savoir Plus',

    // Quick Actions
    quickActions: 'Actions Rapides',
    viewBills: 'Voir les Factures',
    recharge: 'Recharger',
    dataUsage: 'Utilisation des Donnees',

    // Contact
    contactDetails: 'Coordonnees',
    address: 'Adresse',
    addressValue: 'B.P. Box: 1571 Yaounde, Cameroun',
    phone: 'Telephone',
    fax: 'Fax',
    website: 'Site Web',
    email: 'Email',
    followUs: 'Suivez-nous',

    // Footer
    copyright: 'Telecom Camtel. Tous droits reserves.',
    tagline: "...Et ce n'est pas fini!",
    privacyPolicy: 'Politique de Confidentialite',
    termsOfService: "Conditions d'Utilisation",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
