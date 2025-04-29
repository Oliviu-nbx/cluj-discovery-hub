
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

  // Transportation page
  "transport.title": {
    en: "Public Transportation in Cluj-Napoca",
    ro: "Transport Public în Cluj-Napoca"
  },
  "transport.subtitle": {
    en: "Complete guide to CTP public transportation in Cluj-Napoca and the metropolitan area",
    ro: "Ghid complet al transportului public CTP în Cluj-Napoca și zona metropolitană"
  },
  "transport.tab.guide": {
    en: "CTP Guide",
    ro: "Ghid CTP"
  },
  "transport.tab.routes": {
    en: "Routes",
    ro: "Rute"
  },
  "transport.tab.hubs": {
    en: "Transport Hubs",
    ro: "Noduri de Transport"
  },
  "transport.tab.tariffs": {
    en: "Fares & Ticketing",
    ro: "Tarife și Ticketing"
  },
  "transport.intro.title": {
    en: "Introduction",
    ro: "Introducere"
  },
  "transport.intro.text": {
    en: "This guide serves as a detailed resource for using the public transportation system in Cluj-Napoca and its metropolitan area. The aim is to centralize essential information about the operator, route network (urban and metropolitan), types of vehicles, methods of purchasing tickets, and updated fares.",
    ro: "Acest ghid servește ca o resursă detaliată pentru utilizarea sistemului de transport public din Cluj-Napoca și zona sa metropolitană. Scopul este de a centraliza informații esențiale despre operator, rețeaua de rute (urbane și metropolitane), tipurile de vehicule, modalitățile de achiziționare a titlurilor de călătorie și tarifele actualizate."
  },
  "transport.operator.title": {
    en: "Transport Operator",
    ro: "Operatorul de Transport"
  },
  "transport.operator.text": {
    en: "Compania de Transport Public (CTP) Cluj-Napoca S.A., formerly known as RATUC, is the official operator and main provider of public passenger transport services in Cluj-Napoca and the Cluj Metropolitan Area.",
    ro: "Compania de Transport Public (CTP) Cluj-Napoca S.A., cunoscută anterior sub numele de RATUC, este operatorul oficial și principalul furnizor de servicii de transport public de persoane în municipiul Cluj-Napoca și în Zona Metropolitană Cluj."
  },
  "transport.network.title": {
    en: "Urban Transport Network",
    ro: "Rețeaua de Transport Urban"
  },
  "transport.network.text": {
    en: "CTP Cluj-Napoca operates an extensive and complex network within the city, efficiently connecting residential neighborhoods, industrial zones, shopping centers, educational institutions, and other major points of interest.",
    ro: "CTP Cluj-Napoca operează o rețea extinsă și complexă în interiorul municipiului, conectând eficient cartierele rezidențiale, zonele industriale, centrele comerciale, instituțiile de învățământ și alte puncte de interes major."
  },
  "transport.suffix.title": {
    en: "Urban Line Suffix Meanings",
    ro: "Semnificația Sufixelor Liniilor Urbane"
  },
  "transport.metro.title": {
    en: "Metropolitan Transport Network",
    ro: "Rețeaua de Transport Metropolitan"
  },
  "transport.metro.text": {
    en: "In addition to the urban network, CTP Cluj-Napoca plays an essential role in connecting the city with neighboring localities within the Cluj Metropolitan Area. This service is vital for thousands of people who live in suburban communes and work, study, or access services in Cluj-Napoca.",
    ro: "Pe lângă rețeaua urbană, CTP Cluj-Napoca joacă un rol esențial în conectarea municipiului cu localitățile învecinate din cadrul Zonei Metropolitane Cluj. Acest serviciu este vital pentru miile de persoane care locuiesc în comunele periurbane și lucrează, studiază sau accesează servicii în Cluj-Napoca."
  },
  "transport.communes.title": {
    en: "Served Communes",
    ro: "Comunele Deservite"
  },
  "transport.metro.warning": {
    en: "Fares for metropolitan lines are not uniform but are established following negotiations between CTP and each served Administrative-Territorial Unit (ATU - commune hall). Each ATU decides the level of compensation it provides to CTP for operating the service on its territory and, implicitly, the tariff policy applied to passengers from that commune.",
    ro: "Tarifele pentru liniile metropolitane nu sunt uniforme, ci sunt stabilite în urma negocierilor dintre CTP și fiecare Unitate Administrativ-Teritorială (UAT - primăria comunei) deservită. Fiecare UAT decide nivelul de compensație pe care îl acordă CTP pentru operarea serviciului pe teritoriul său și, implicit, politica tarifară aplicată călătorilor din comuna respectivă."
  },
  "transport.recommendations.title": {
    en: "Practical Recommendations",
    ro: "Recomandări Practice"
  },
  "transport.resources.title": {
    en: "Useful Resources",
    ro: "Resurse Utile"
  },
  "transport.search.placeholder": {
    en: "Search routes, stops...",
    ro: "Caută rute, stații..."
  },
  "transport.routes.all": {
    en: "All",
    ro: "Toate"
  },
  "transport.routes.buses": {
    en: "Buses",
    ro: "Autobuze"
  },
  "transport.routes.trams": {
    en: "Trams",
    ro: "Tramvaie"
  },
  "transport.routes.bus": {
    en: "Bus",
    ro: "Autobuz"
  },
  "transport.routes.tram": {
    en: "Tram",
    ro: "Tramvai"
  },
  "transport.routes.schedule": {
    en: "Schedule: ",
    ro: "Program: "
  },
  "transport.routes.frequency": {
    en: "Frequency: ",
    ro: "Frecvență: "
  },
  "transport.routes.noResults": {
    en: "No routes found matching your criteria.",
    ro: "Nu s-au găsit rute care să corespundă criteriilor tale."
  },
  "transport.routes.viewAll": {
    en: "View All Routes",
    ro: "Vezi Toate Rutele"
  },
  "transport.hub.address": {
    en: "Address:",
    ro: "Adresă:"
  },
  "transport.hub.facilities": {
    en: "Facilities:",
    ro: "Facilități:"
  },
  "transport.hub.connections": {
    en: "Connections:",
    ro: "Conexiuni:"
  },
  "transport.tariffs.title": {
    en: "Fares & Ticketing",
    ro: "Tarife și Ticketing"
  },
  "transport.card.title": {
    en: "ConnectCluj Travel Card",
    ro: "Cardul de Călătorie ConnectCluj"
  },
  "transport.payment.title": {
    en: "Payment Methods and Ticket Purchase",
    ro: "Metode de Plată și Achiziție a Titlurilor de Călătorie"
  },
  "transport.fares.urban": {
    en: "Urban Fares",
    ro: "Tarife Urbane"
  },
  "transport.fares.caption": {
    en: "The tariffs presented are those known at the time of writing (July 1, 2022). Check www.ctpcj.ro for current tariffs.",
    ro: "Tarifele prezentate sunt cele cunoscute la momentul redactării (1 Iulie 2022). Verificați www.ctpcj.ro pentru tarifele curente."
  },
  "transport.fares.type": {
    en: "Ticket / Subscription Type",
    ro: "Tip Bilet / Abonament"
  },
  "transport.fares.price": {
    en: "Price (Lei)",
    ro: "Preț (Lei)"
  },
  "transport.fares.notes": {
    en: "Notes",
    ro: "Observații"
  },
  "transport.fares.metropolitan": {
    en: "Metropolitan Fares (Selection)",
    ro: "Tarife Metropolitane (Selecție)"
  },
  "transport.fares.metroCaption": {
    en: "Metropolitan transport fares vary depending on the commune and distance. They are established in collaboration with local ATUs.",
    ro: "Tarifele pentru transportul metropolitan variază în funcție de comună și distanță. Acestea sunt stabilite în colaborare cu UAT-urile locale."
  },
  "transport.fares.destination": {
    en: "Destination / Commune",
    ro: "Destinație / Comuna"
  },
  "transport.fares.lines": {
    en: "Lines",
    ro: "Linii"
  },
  "transport.fares.ticketPrice": {
    en: "Ticket Price (Lei)",
    ro: "Preț Bilet (Lei)"
  },
  "transport.fares.monthlyPass": {
    en: "Monthly Pass (Lei)",
    ro: "Abonament Lunar (Lei)"
  },
  "transport.discounts.title": {
    en: "Free and Discounted Travel",
    ro: "Gratuități și Reduceri"
  },
  "transport.discounts.text": {
    en: "CTP Cluj-Napoca provides transport facilities (free or reduced fares) for certain socio-professional categories, according to current legislation and local decisions.",
    ro: "CTP Cluj-Napoca acordă facilități la transport (gratuități sau reduceri) pentru anumite categorii socio-profesionale, conform legislației în vigoare și hotărârilor locale."
  },
  "transport.discounts.students": {
    en: "Students",
    ro: "Elevi"
  },
  "transport.discounts.university": {
    en: "University students",
    ro: "Studenți"
  },
  "transport.discounts.pensioners": {
    en: "Pensioners",
    ro: "Pensionari"
  },
  "transport.discounts.donors": {
    en: "Blood donors",
    ro: "Donatori de sânge"
  },
  "transport.discounts.disabilities": {
    en: "People with disabilities",
    ro: "Persoane cu dizabilități"
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
