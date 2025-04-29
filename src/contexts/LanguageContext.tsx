
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "ro";

type TranslationsType = {
  [key: string]: {
    en: string;
    ro: string;
  };
};

// Common translations for the website
export const translations: TranslationsType = {
  // Navigation
  "nav.home": {
    en: "Home",
    ro: "Acasă"
  },
  "nav.explore": {
    en: "Explore",
    ro: "Explorează"
  },
  "nav.events": {
    en: "Events",
    ro: "Evenimente"
  },
  "nav.transportation": {
    en: "Transportation",
    ro: "Transport"
  },
  "nav.about": {
    en: "About",
    ro: "Despre"
  },
  "nav.login": {
    en: "Login",
    ro: "Autentificare"
  },
  "nav.register": {
    en: "Register",
    ro: "Înregistrare"
  },
  "nav.favorites": {
    en: "Favorites",
    ro: "Favorite"
  },
  "nav.profile": {
    en: "Profile",
    ro: "Profil"
  },
  
  // Categories
  "categories.title": {
    en: "Categories",
    ro: "Categorii"
  },
  "category.restaurant": {
    en: "Restaurant",
    ro: "Restaurant"
  },
  "category.cafe": {
    en: "Cafe",
    ro: "Cafenea"
  },
  "category.bar": {
    en: "Bar",
    ro: "Bar"
  },
  "category.attraction": {
    en: "Attraction",
    ro: "Atracție"
  },
  "category.hotel": {
    en: "Hotel",
    ro: "Hotel"
  },
  "category.museum": {
    en: "Museum",
    ro: "Muzeu"
  },
  "category.mall": {
    en: "Mall",
    ro: "Mall"
  },
  "category.gym": {
    en: "Gym",
    ro: "Sală de fitness"
  },
  "category.library": {
    en: "Library",
    ro: "Bibliotecă"
  },
  "category.bakery": {
    en: "Bakery",
    ro: "Brutărie"
  },

  // Admin dashboard
  "admin.dashboard": {
    en: "Admin Dashboard",
    ro: "Panou Administrator"
  },
  "admin.locations": {
    en: "Locations",
    ro: "Locații"
  },
  "admin.claims": {
    en: "Business Claims",
    ro: "Cereri Afaceri"
  },
  "admin.settings": {
    en: "Admin Settings",
    ro: "Setări Administrator"
  },
  "admin.addLocation": {
    en: "Add New Location",
    ro: "Adaugă Locație Nouă"
  },
  "admin.editLocation": {
    en: "Edit Location",
    ro: "Editează Locație"
  },
  "admin.deleteLocation": {
    en: "Delete Location",
    ro: "Șterge Locație"
  },
  "admin.confirmDelete": {
    en: "Are you sure you want to delete this location? This action cannot be undone.",
    ro: "Sigur doriți să ștergeți această locație? Această acțiune nu poate fi anulată."
  },
  
  // Location form fields
  "location.name": {
    en: "Location Name",
    ro: "Nume Locație"
  },
  "location.category": {
    en: "Category",
    ro: "Categorie"
  },
  "location.address": {
    en: "Address",
    ro: "Adresă"
  },
  "location.description": {
    en: "Description",
    ro: "Descriere"
  },
  "location.website": {
    en: "Website",
    ro: "Site web"
  },
  "location.phone": {
    en: "Phone Number",
    ro: "Număr de Telefon"
  },
  "location.priceLevel": {
    en: "Price Level",
    ro: "Nivel de Preț"
  },
  "location.selectCategory": {
    en: "Select category",
    ro: "Selectați categoria"
  },
  
  // Buttons
  "button.cancel": {
    en: "Cancel",
    ro: "Anulare"
  },
  "button.create": {
    en: "Create Location",
    ro: "Creare Locație"
  },
  "button.update": {
    en: "Update Location",
    ro: "Actualizare Locație"
  },
  "button.delete": {
    en: "Delete",
    ro: "Șterge"
  },
  "button.approve": {
    en: "Approve",
    ro: "Aprobă"
  },
  "button.reject": {
    en: "Reject",
    ro: "Respinge"
  },
  
  // General
  "search.placeholder": {
    en: "Search locations...",
    ro: "Caută locații..."
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRomanian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get stored language from local storage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem("language");
    return (storedLanguage === "ro" ? "ro" : "en") as Language;
  });
  
  // Update the language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key; // Return the key if translation is not found
  };
  
  const isRomanian = language === "ro";
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRomanian }}>
      {children}
    </LanguageContext.Provider>
  );
};
