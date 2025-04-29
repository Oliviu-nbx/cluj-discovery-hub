import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus, 
  TramFront, 
  Map, 
  Clock, 
  Search, 
  AlertCircle, 
  Info, 
  CreditCard, 
  MapPin,
  Navigation
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock public transportation data
const busRoutes = [
  {
    id: "bus1",
    number: "24B",
    name: "Bucium - Mănăștur",
    stops: [
      { name: "Bucium", coords: "46.7488,23.5644" },
      { name: "Calea Turzii", coords: "46.7611,23.5907" },
      { name: "Piața Mihai Viteazu", coords: "46.7704,23.5889" },
      { name: "Piața Mărăști", coords: "46.7764,23.6126" },
      { name: "Strada Izlazului", coords: "46.7584,23.5464" },
      { name: "Mănăștur", coords: "46.7543,23.5509" }
    ],
    schedule: "5:30 - 23:00",
    frequency: "Every 10-12 minutes",
    type: "bus"
  },
  {
    id: "bus2",
    number: "30",
    name: "Aeroport - Piața Gării",
    stops: [
      { name: "Aeroport", coords: "46.7849,23.6863" },
      { name: "Strada Traian Vuia", coords: "46.7931,23.6674" },
      { name: "Mărăști", coords: "46.7764,23.6126" },
      { name: "Piața Gării", coords: "46.7723,23.5722" }
    ],
    schedule: "5:00 - 23:30",
    frequency: "Every 15 minutes",
    type: "bus"
  },
  {
    id: "bus3",
    number: "5",
    name: "Piața Mihai Viteazu - Florești",
    stops: [
      { name: "Piața Mihai Viteazu", coords: "46.7704,23.5889" },
      { name: "Opera Maghiară", coords: "46.7688,23.5837" },
      { name: "Str. Horea", coords: "46.7717,23.5806" },
      { name: "Piața 1 Mai", coords: "46.7702,23.5613" },
      { name: "Florești", coords: "46.7481,23.4861" }
    ],
    schedule: "5:15 - 23:15",
    frequency: "Every 8-10 minutes",
    type: "bus"
  },
  {
    id: "tram1",
    number: "101",
    name: "Mănăștur - Piața Gării",
    stops: [
      { name: "Mănăștur", coords: "46.7543,23.5509" },
      { name: "Piața Cipariu", coords: "46.7729,23.5925" },
      { name: "Piața Avram Iancu", coords: "46.7714,23.5958" },
      { name: "Piața Gării", coords: "46.7723,23.5722" }
    ],
    schedule: "5:00 - 23:00",
    frequency: "Every 12 minutes",
    type: "tram"
  },
  {
    id: "tram2",
    number: "102",
    name: "Bucium - Piața Gării",
    stops: [
      { name: "Bucium", coords: "46.7488,23.5644" },
      { name: "Iulius Mall", coords: "46.7740,23.6230" },
      { name: "Piața Mărăști", coords: "46.7764,23.6126" },
      { name: "Piața Gării", coords: "46.7723,23.5722" }
    ],
    schedule: "5:30 - 22:30",
    frequency: "Every 15 minutes",
    type: "tram"
  },
  {
    id: "bus4",
    number: "25",
    name: "Piața Mihai Viteazu - Gheorgheni",
    stops: [
      { name: "Piața Mihai Viteazu", coords: "46.7704,23.5889" },
      { name: "Piața Cipariu", coords: "46.7729,23.5925" },
      { name: "Iulius Mall", coords: "46.7740,23.6230" },
      { name: "Gheorgheni", coords: "46.7645,23.6235" }
    ],
    schedule: "5:15 - 22:45",
    frequency: "Every 12 minutes",
    type: "bus"
  },
  {
    id: "bus5",
    number: "35",
    name: "Piața Gării - Zorilor",
    stops: [
      { name: "Piața Gării", coords: "46.7723,23.5722" },
      { name: "Memorandumului", coords: "46.7681,23.5799" },
      { name: "Universitatea Babeș-Bolyai", coords: "46.7658,23.5870" },
      { name: "Zorilor", coords: "46.7571,23.5861" }
    ],
    schedule: "5:30 - 22:30",
    frequency: "Every 15 minutes",
    type: "bus"
  },
  {
    id: "bus6",
    number: "46",
    name: "Piața Ștefan cel Mare - Europa",
    stops: [
      { name: "Piața Ștefan cel Mare", coords: "46.7699,23.5863" },
      { name: "Piața Cipariu", coords: "46.7729,23.5925" },
      { name: "Strada Eugen Ionesco", coords: "46.7543,23.5747" },
      { name: "Cartier Europa", coords: "46.7466,23.5733" }
    ],
    schedule: "5:20 - 22:40",
    frequency: "Every 15 minutes",
    type: "bus"
  },
  {
    id: "tram3",
    number: "100",
    name: "Piața Gării - Bd. Muncii",
    stops: [
      { name: "Piața Gării", coords: "46.7723,23.5722" },
      { name: "Piața Libertății", coords: "46.7701,23.5891" },
      { name: "Piața Unirii", coords: "46.7687,23.5897" },
      { name: "Bd. Muncii", coords: "46.7966,23.6304" }
    ],
    schedule: "5:10 - 22:50",
    frequency: "Every 12 minutes",
    type: "tram"
  },
  {
    id: "bus7",
    number: "31",
    name: "Piața Mihai Viteazu - Baciu",
    stops: [
      { name: "Piața Mihai Viteazu", coords: "46.7704,23.5889" },
      { name: "Memorandumului", coords: "46.7681,23.5799" },
      { name: "Calea Baciului", coords: "46.7861,23.5417" },
      { name: "Baciu", coords: "46.7959,23.5197" }
    ],
    schedule: "5:15 - 22:30",
    frequency: "Every 20 minutes",
    type: "bus"
  },
  {
    id: "bus8",
    number: "8",
    name: "Piața Mihai Viteazu - Aeroport",
    stops: [
      { name: "Piața Mihai Viteazu", coords: "46.7704,23.5889" },
      { name: "Piața Mărăști", coords: "46.7764,23.6126" },
      { name: "Strada Traian Vuia", coords: "46.7931,23.6674" },
      { name: "Aeroport", coords: "46.7849,23.6863" }
    ],
    schedule: "5:00 - 22:45",
    frequency: "Every 15 minutes",
    type: "bus"
  }
];

const transportHubs = [
  {
    id: "hub1",
    name: "Cluj-Napoca Train Station",
    description: "The main train station serving Cluj-Napoca with connections to major cities in Romania and international destinations.",
    address: "Piața Gării 1-3, Cluj-Napoca",
    facilities: ["Ticket offices", "Waiting area", "Shops", "Cafes", "Luggage storage"],
    connections: ["Buses: 30, 5, 8", "Trams: 101, 102"],
    type: "train"
  },
  {
    id: "hub2",
    name: "Cluj-Napoca International Airport",
    description: "Avram Iancu International Airport serves Cluj-Napoca and the surrounding region.",
    address: "Strada Traian Vuia 149-151, Cluj-Napoca",
    facilities: ["Check-in counters", "Duty-free shops", "Restaurants", "Car rental", "Currency exchange"],
    connections: ["Bus: 30", "Taxi services"],
    type: "airport"
  },
  {
    id: "hub3",
    name: "Piața Mărăști Bus Terminal",
    description: "A major bus hub serving routes throughout the city and suburban areas.",
    address: "Piața Mărăști, Cluj-Napoca",
    facilities: ["Ticket kiosks", "Waiting shelters"],
    connections: ["Buses: 24B, 30, 5, 8, 9", "Trams: 101, 102"],
    type: "bus"
  }
];

// New data structures for CTP information
const urbanNetworkInfo = {
  vehicles: [
    {
      type: "bus",
      icon: <Bus className="h-5 w-5" />,
      description: "Reprezintă coloana vertebrală a sistemului de transport urban, deservind majoritatea liniilor, inclusiv rutele care ajung în zone mai puțin accesibile altor tipuri de vehicule. Autobuzele operează și pe rute speciale, cum ar fi linia express A1E care leagă centrul orașului de Aeroportul Internațional Avram Iancu Cluj, și liniile de noapte (5N, 25N, 54N).",
      description_en: "Forms the backbone of the urban transport system, serving most lines, including routes to areas less accessible to other vehicle types. Buses also operate on special routes, such as the A1E express line connecting downtown to Avram Iancu Cluj International Airport, and night lines (5N, 25N, 54N)."
    },
    {
      type: "trolleybus",
      icon: <Bus className="h-5 w-5" />,
      description: "Constituie o componentă ecologică importantă a rețelei CTP, operând pe linii cu flux mare de călători. Acestea leagă în principal marile cartiere precum Mănăștur, Gheorgheni, Mărăști de zona centrală și de Gară.",
      description_en: "An important ecological component of the CTP network, operating on high-traffic lines. They mainly connect major neighborhoods like Mănăștur, Gheorgheni, Mărăști to the central area and the Railway Station."
    },
    {
      type: "tram",
      icon: <TramFront className="h-5 w-5" />,
      description: "Sistemul de tramvai din Cluj-Napoca constă într-o linie magistrală care traversează orașul de la Est la Vest (Mănăștur - Gară - Bulevardul Muncii), modernizată în anii 2010. Flota a fost reînnoită prin achiziția de tramvaie moderne, precum Pesa Swing și Astra Imperio.",
      description_en: "Cluj-Napoca's tram system consists of a main line that crosses the city from East to West (Mănăștur - Railway Station - Bulevardul Muncii), modernized in the 2010s. The fleet has been renewed with modern trams such as Pesa Swing and Astra Imperio."
    }
  ]
};

// Urban lines suffixes explanation
const suffixExplanations = [
  {
    suffix: "L",
    meaning: "Limitat/Lungit/Lucrători",
    description: "Adesea indică o rută extinsă sau limitată care deservește zone industriale majore (precum Emerson, Bulevardul Muncii) sau Depoul de vehicule.",
    description_en: "Often indicates an extended or limited route serving major industrial areas (such as Emerson, Muncii Boulevard) or the vehicle depot."
  },
  {
    suffix: "B",
    meaning: "Business/Branch",
    description: "Deseori semnifică o variantă a rutei care deservește centre comerciale importante sau o ramificație specifică a traseului principal.",
    description_en: "Often signifies a route variant serving important shopping centers or a specific branch of the main route."
  },
  {
    suffix: "P",
    meaning: "Polus/Parc Industrial",
    description: "Similar cu 'B', poate indica o rută spre un centru comercial sau parc industrial. Linia 43P deservește VIVO! Cluj-Napoca.",
    description_en: "Similar to 'B', may indicate a route to a shopping center or industrial park. Line 43P serves VIVO! Cluj-Napoca."
  },
  {
    suffix: "S",
    meaning: "Scurtat",
    description: "Indică o versiune a traseului care operează pe o porțiune mai scurtă a liniei de bază, de obicei terminând într-un punct intermediar important.",
    description_en: "Indicates a version of the route that operates on a shorter portion of the base line, usually ending at an important intermediate point."
  },
  {
    suffix: "D",
    meaning: "Deviat/Diferit",
    description: "Poate indica o deviere specifică sau o rută care deservește o destinație particulară, cum ar fi ERS CUG pe linia 50D.",
    description_en: "May indicate a specific deviation or a route that serves a particular destination, such as ERS CUG on line 50D."
  }
];

// Ticketing information
const ticketingInfo = {
  cardTypes: [
    {
      type: "ConnectCluj Nominal",
      description: "Card personalizat cu fotografia și numele titularului. Poate fi utilizat exclusiv de persoana pe numele căreia a fost emis și este netransmisibil.",
      description_en: "Personalized card with the holder's photo and name. Can be used exclusively by the person in whose name it was issued and is non-transferable.",
      features: [
        "Personalizat cu fotografie și nume",
        "Netransmisibil",
        "Poate conține abonamente nominale (inclusiv cu reduceri)",
        "Se obține de la Centrele de vânzare carduri CTP"
      ],
      features_en: [
        "Personalized with photo and name",
        "Non-transferable",
        "Can contain nominal subscriptions (including discounted ones)",
        "Available from CTP card sales centers"
      ]
    },
    {
      type: "ConnectCluj Nenominal",
      description: "Nu este personalizat și nu conține datele de identificare ale unei persoane anume. Poate fi utilizat de mai multe persoane, însă nu simultan.",
      description_en: "Not personalized and does not contain identification data of a specific person. Can be used by multiple people, but not simultaneously.",
      features: [
        "Nepersonalizat (fără fotografie și nume)",
        "Poate fi utilizat de mai multe persoane (dar nu simultan)",
        "Poate conține bilete electronice și abonamente nenominale",
        "Se poate achiziționa de la Automate sau Centre de vânzare"
      ],
      features_en: [
        "Non-personalized (no photo or name)",
        "Can be used by multiple people (but not simultaneously)",
        "Can contain electronic tickets and non-nominal subscriptions",
        "Available from Ticket Machines or Sales Centers"
      ]
    }
  ],
  paymentMethods: [
    {
      method: "Automate de Bilete",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Permit achiziționarea cardurilor nenominale, a biletelor de hârtie și încărcarea/reîncărcarea cardurilor ConnectCluj cu diverse titluri electronice.",
      description_en: "Allow purchasing non-nominal cards, paper tickets, and loading/reloading ConnectCluj cards with various electronic tickets."
    },
    {
      method: "Centre de Vânzare",
      icon: <MapPin className="h-5 w-5" />,
      description: "Aici se pot obține atât carduri nominale (cu personalizare), cât și nenominale, bilete pe suport de hârtie și se pot încărca toate tipurile de titluri electronice.",
      description_en: "Here you can obtain both nominal cards (with personalization) and non-nominal cards, paper tickets, and load all types of electronic tickets."
    },
    {
      method: "POS în Vehicule",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Majoritatea vehiculelor sunt echipate cu validatoare care permit plata directă cu cardul bancar contactless pentru un bilet de 1 călătorie.",
      description_en: "Most vehicles are equipped with validators that allow direct payment with contactless bank cards for a 1-journey ticket."
    },
    {
      method: "SMS",
      icon: <Info className="h-5 w-5" />,
      description: "Călătorii pot achiziționa anumite tipuri de bilete trimițând un SMS la un număr scurt dedicat (ex: 7479). Este obligatoriu ca SMS-ul să fie trimis înainte de urcarea în vehicul.",
      description_en: "Travelers can purchase certain types of tickets by sending an SMS to a dedicated short number (e.g., 7479). The SMS must be sent before boarding the vehicle."
    },
    {
      method: "Aplicația 24Pay",
      icon: <Navigation className="h-5 w-5" />,
      description: "Permite achiziționarea direct de pe smartphone a unei game variate de titluri de călătorie: bilete de 1 călătorie, bilete de timp urban și abonamente.",
      description_en: "Allows purchasing a variety of travel tickets directly from a smartphone: 1-journey tickets, urban time tickets, and subscriptions."
    }
  ],
  urbanTariffs: [
    { type: "Bilet 1 călătorie", price: "3 Lei", note: "Valabil o singură urcare", note_en: "Valid for a single boarding" },
    { type: "Bilet 2 călătorii", price: "6 Lei", note: "Valabil pentru două urcări separate", note_en: "Valid for two separate boardings" },
    { type: "Bilet transport noapte", price: "5 Lei", note: "Singurul valabil pe cursele de noapte (23:00-05:00)", note_en: "The only valid ticket for night services (23:00-05:00)" },
    { type: "Bilet urban 30 minute", price: "3 Lei", note: "Permite schimbări, validare în 30 min", note_en: "Allows changes, validation within 30 min" },
    { type: "Bilet urban 60 minute", price: "6 Lei", note: "Permite schimbări, validare în 60 min", note_en: "Allows changes, validation within 60 min" },
    { type: "Portofel Electronic", price: "N/A", note: "Deduce 3 Lei/validare (echivalent bilet 30 min)", note_en: "Deducts 3 Lei/validation (equivalent to a 30 min ticket)" },
    { type: "Abonament 1 zi (toate liniile)", price: "20 Lei", note: "Valabil 24h de la prima validare", note_en: "Valid for 24h from first validation" },
    { type: "Abonament 3 zile (toate liniile)", price: "33 Lei", note: "Valabil 72h de la prima validare", note_en: "Valid for 72h from first validation" },
    { type: "Abonament lunar (1 linie)", price: "90 Lei", note: "Nominal", note_en: "Nominal" },
    { type: "Abonament lunar (2 linii)", price: "122 Lei", note: "Nominal", note_en: "Nominal" },
    { type: "Abonament lunar (toate liniile, nelimitat)", price: "177 Lei", note: "Nominal (personalizat)", note_en: "Nominal (personalized)" },
    { type: "Abonament lunar (toate liniile, nelimitat)", price: "214 Lei", note: "Nenominal (nepersonalizat, transmisibil)", note_en: "Non-nominal (non-personalized, transferable)" }
  ],
  metropolitanSampleTariffs: [
    { destination: "Florești", lines: "M21, M22, M24, M26", ticket: "4-5.5 Lei", monthly: "115 Lei" },
    { destination: "Baciu", lines: "M31", ticket: "5 Lei", monthly: "114-180 Lei" },
    { destination: "Apahida", lines: "M41", ticket: "7-8 Lei", monthly: "165 Lei" },
    { destination: "Chinteni", lines: "M39", ticket: "8.5-9.5 Lei", monthly: "195 Lei" },
    { destination: "Feleacu", lines: "M11", ticket: "4.5-6.5 Lei", monthly: "133 Lei" },
    { destination: "Gilău", lines: "M51", ticket: "7 Lei", monthly: "200 Lei" },
    { destination: "Săvădisla", lines: "M81", ticket: "14 Lei", monthly: "384 Lei" },
    { destination: "Aiton", lines: "M61", ticket: "12 Lei", monthly: "320 Lei" }
  ]
};

// Practical recommendations
const practicalRecommendations = [
  {
    title: "Validarea Obligatorie",
    title_en: "Mandatory Validation",
    description: "Indiferent de tipul titlului de călătorie, acesta trebuie validat la fiecare urcare în mijlocul de transport, folosind aparatele de validare portocalii.",
    description_en: "Regardless of the type of travel ticket, it must be validated each time you board a vehicle, using the orange validation devices."
  },
  {
    title: "Verificarea Orarelor",
    title_en: "Check Schedules",
    description: "Consultați orarele actualizate pe site-ul CTP sau în aplicații mobile înainte de plecare. Fiți atenți la diferențele de program între zilele lucrătoare, sâmbăta și duminica/sărbătorile legale.",
    description_en: "Check updated schedules on the CTP website or mobile apps before departure. Pay attention to schedule differences between weekdays, Saturdays, and Sundays/holidays."
  },
  {
    title: "Identificarea Stațiilor",
    title_en: "Station Identification",
    description: "Folosiți hărțile online, aplicațiile mobile sau orarele PDF pentru a identifica stațiile de îmbarcare și debarcare. Fiți atenți la denumirile stațiilor anunțate în vehicule sau afișate.",
    description_en: "Use online maps, mobile apps, or PDF schedules to identify boarding and alighting stations. Pay attention to the station names announced in vehicles or displayed."
  },
  {
    title: "Alegerea Titlului de Călătorie",
    title_en: "Choosing the Right Ticket",
    description: "Pentru utilizatori ocazionali: bilete de 1 călătorie sau bilete de timp. Pentru utilizare frecventă: abonamente săptămânale sau lunare. Pentru navetiști metropolitani: abonamente lunare specifice rutei.",
    description_en: "For occasional users: 1-journey or time tickets. For frequent use: weekly or monthly passes. For metropolitan commuters: monthly passes specific to your route."
  }
];

// Useful resources
const usefulResources = [
  {
    name: "Site Oficial CTP",
    name_en: "CTP Official Website",
    url: "www.ctpcj.ro",
    description: "Sursa principală pentru orare, tarife, anunțuri, hărți.",
    description_en: "Main source for schedules, fares, announcements, maps."
  },
  {
    name: "Aplicația Tranzy",
    name_en: "Tranzy App",
    url: "Disponibilă în Google Play și App Store",
    description: "Recomandată de CTP pentru informații în timp real.",
    description_en: "Recommended by CTP for real-time information."
  },
  {
    name: "Aplicația 24Pay",
    name_en: "24Pay App",
    url: "Disponibilă în Google Play și App Store",
    description: "Pentru achiziționarea electronică a biletelor și abonamentelor.",
    description_en: "For electronic purchase of tickets and subscriptions."
  },
  {
    name: "Contact CTP",
    name_en: "CTP Contact",
    url: "E-mail: sugestii@ctpcj.ro, Telefon: 0264-430917",
    description: "Pentru sugestii sau reclamații.",
    description_en: "For suggestions or complaints."
  }
];

const TransportationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRouteType, setActiveRouteType] = useState("all");
  const { language, t, isRomanian } = useLanguage();
  
  const filteredRoutes = busRoutes.filter(route => {
    const matchesSearch = 
      route.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.stops.some(stop => stop.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeRouteType === "all") return matchesSearch;
    return route.type === activeRouteType && matchesSearch;
  });

  const getRouteTypeIcon = (type: string) => {
    switch(type) {
      case "bus": return <Bus className="h-5 w-5" />;
      case "tram": return <TramFront className="h-5 w-5" />;
      default: return <Bus className="h-5 w-5" />;
    }
  };

  const getRouteTypeColor = (type: string) => {
    switch(type) {
      case "bus": return "bg-blue-500 hover:bg-blue-600";
      case "tram": return "bg-green-500 hover:bg-green-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const getHubTypeIcon = (type: string) => {
    switch(type) {
      case "train": return <TramFront className="h-5 w-5" />;
      case "airport": return <Bus className="h-5 w-5" />;
      case "bus": return <Bus className="h-5 w-5" />;
      default: return <Map className="h-5 w-5" />;
    }
  };

  const getLocalizedDescription = (item: any) => {
    return language === "ro" ? item.description : item.description_en;
  };

  const getLocalizedText = (roText: string, enText: string) => {
    return language === "ro" ? roText : enText;
  };

  return (
    <MainLayout
      title={t("transport.title") + " - Cluj Compass"}
      description={t("transport.subtitle")}
    >
      {/* Hero Section */}
      <div className="relative bg-cluj-dark text-white">
        <div 
          className="absolute inset-0 overflow-hidden opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold sm:text-4xl mb-4">
              {t("transport.title")}
            </h1>
            <p className="text-lg mb-6">
              {t("transport.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="page-container">
        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="guide" className="flex gap-2 items-center">
              <Info className="h-4 w-4" />
              {t("transport.tab.guide")}
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex gap-2 items-center">
              <Bus className="h-4 w-4" />
              {t("transport.tab.routes")}
            </TabsTrigger>
            <TabsTrigger value="hubs" className="flex gap-2 items-center">
              <Map className="h-4 w-4" />
              {t("transport.tab.hubs")}
            </TabsTrigger>
            <TabsTrigger value="tariffs" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              {t("transport.tab.tariffs")}
            </TabsTrigger>
          </TabsList>
          
          {/* CTP Guide Tab */}
          <TabsContent value="guide" className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{t("transport.intro.title")}</h2>
                  <p className="mb-4 text-gray-700">
                    {t("transport.intro.text")}
                  </p>
                  
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>{t("transport.intro.network")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {urbanNetworkInfo.vehicles.map((vehicle, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                              {vehicle.icon}
                            </div>
                            <div>
                              <h4 className="font-medium capitalize">{vehicle.type}</h4>
                              <p className="text-sm text-gray-600">
                                {getLocalizedDescription(vehicle)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Line Numbering System */}
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>{t("transport.intro.lineNumbers")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-700">
                        {t("transport.intro.lineNumbersDesc")}
                      </p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("transport.intro.suffix")}</TableHead>
                            <TableHead>{t("transport.intro.meaning")}</TableHead>
                            <TableHead>{t("transport.intro.description")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {suffixExplanations.map((suffix, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{suffix.suffix}</TableCell>
                              <TableCell>{suffix.meaning}</TableCell>
                              <TableCell>
                                {language === "ro" ? suffix.description : suffix.description_en}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Practical Information */}
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">{t("transport.practical.title")}</h2>
                  
                  <Accordion type="single" collapsible className="mb-6">
                    {practicalRecommendations.map((rec, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {language === "ro" ? rec.title : rec.title_en}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700">
                            {language === "ro" ? rec.description : rec.description_en}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  {/* Resources */}
                  <h3 className="text-xl font-semibold mb-3">{t("transport.practical.resources")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {usefulResources.map((res, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <h4 className="font-medium">{language === "ro" ? res.name : res.name_en}</h4>
                        <p className="text-sm text-gray-600 mt-1">{res.url}</p>
                        <p className="text-sm text-gray-700 mt-2">
                          {language === "ro" ? res.description : res.description_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="animate-fade-in">
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("transport.routes.searchPlaceholder")}
                    className="pl-10 pr-4 py-2 border rounded-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant={activeRouteType === "all" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("all")}
                    className="flex-1 sm:flex-auto"
                  >
                    {t("transport.routes.allRoutes")}
                  </Button>
                  <Button
                    variant={activeRouteType === "bus" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("bus")}
                    className="flex-1 sm:flex-auto"
                  >
                    <Bus className="h-4 w-4 mr-2" />
                    {t("transport.routes.busRoutes")}
                  </Button>
                  <Button
                    variant={activeRouteType === "tram" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("tram")}
                    className="flex-1 sm:flex-auto"
                  >
                    <TramFront className="h-4 w-4 mr-2" />
                    {t("transport.routes.tramRoutes")}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Routes List */}
            <div className="space-y-6">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <div key={route.id} className="border rounded-lg overflow-hidden bg-white">
                    <div className={`p-4 text-white ${getRouteTypeColor(route.type)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getRouteTypeIcon(route.type)}
                          <span className="text-xl font-bold ml-2">
                            {route.number}
                          </span>
                          <span className="ml-4 text-lg">
                            {route.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm">{route.frequency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          {t("transport.routes.schedule")}
                        </h3>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-600 mr-2" />
                          <span>{route.schedule}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          {t("transport.routes.stops")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {route.stops.map((stop, index) => (
                            <a
                              key={index}
                              href={`https://www.google.com/maps/search/?api=1&query=${stop.coords}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-2 rounded-md hover:bg-gray-100 transition"
                            >
                              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{stop.name}</span>
                              <Map className="h-3 w-3 text-gray-500 ml-auto" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-white">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {t("transport.routes.noRoutes")}
                  </h3>
                  <p className="text-center text-gray-500">
                    {t("transport.routes.tryDifferent")}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Hubs Tab */}
          <TabsContent value="hubs" className="animate-fade-in">
            <div className="space-y-6">
              {transportHubs.map((hub) => (
                <div key={hub.id} className="border rounded-lg overflow-hidden bg-white">
                  <div className="p-4 bg-gray-800 text-white">
                    <div className="flex items-center">
                      {getHubTypeIcon(hub.type)}
                      <span className="text-xl font-bold ml-2">
                        {hub.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <p className="text-gray-600">{hub.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          {t("transport.hubs.address")}
                        </h3>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                          <span>{hub.address}</span>
                          <Map className="h-3 w-3 text-gray-500 ml-2" />
                        </a>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          {t("transport.hubs.connections")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {hub.connections.map((connection, index) => (
                            <Badge key={index} variant="outline">{connection}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        {t("transport.hubs.facilities")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {hub.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary">{facility}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Tariffs Tab */}
          <TabsContent value="tariffs" className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{t("transport.tariffs.title")}</h2>
                
                {/* Ticket Types */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{t("transport.tariffs.cardTypes")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ticketingInfo.cardTypes.map((card, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{card.type}</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === "ro" ? card.description : card.description_en}
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {(language === "ro" ? card.features : card.features_en).map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{t("transport.tariffs.paymentMethods")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {ticketingInfo.paymentMethods.map((method, index) => (
                      <div key={index} className="border rounded-lg p-4 flex flex-col">
                        <div className="flex items-center mb-3">
                          {method.icon}
                          <h4 className="font-medium ml-2">{method.method}</h4>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">
                          {language === "ro" ? method.description : method.description_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Urban Tariffs */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{t("transport.tariffs.urbanTariffs")}</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("transport.tariffs.ticketType")}</TableHead>
                          <TableHead>{t("transport.tariffs.price")}</TableHead>
                          <TableHead>{t("transport.tariffs.notes")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ticketingInfo.urbanTariffs.map((tariff, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{tariff.type}</TableCell>
                            <TableCell>{tariff.price}</TableCell>
                            <TableCell>
                              {language === "ro" ? tariff.note : tariff.note_en}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Metropolitan Tariffs */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("transport.tariffs.metropolitanTariffs")}</h3>
                  <p className="text-gray-700 mb-4">
                    {t("transport.tariffs.metropolitanDesc")}
                  </p>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("transport.tariffs.destination")}</TableHead>
                          <TableHead>{t("transport.tariffs.lines")}</TableHead>
                          <TableHead>{t("transport.tariffs.singleTicket")}</TableHead>
                          <TableHead>{t("transport.tariffs.monthlyPass")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ticketingInfo.metropolitanSampleTariffs.map((tariff, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{tariff.destination}</TableCell>
                            <TableCell>{tariff.lines}</TableCell>
                            <TableCell>{tariff.ticket}</TableCell>
                            <TableCell>{tariff.monthly}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TransportationPage;
