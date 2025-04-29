
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bus, 
  TramFront, 
  TrainFront, 
  Map, 
  Clock, 
  Search, 
  AlertCircle, 
  Info, 
  CreditCard, 
  MapPin,
  Navigation,
  Directions
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
    stops: ["Bucium", "Calea Turzii", "Piața Mihai Viteazu", "Piața Mărăști", "Strada Izlazului", "Mănăștur"],
    schedule: "5:30 - 23:00",
    frequency: "Every 10-12 minutes",
    type: "bus"
  },
  {
    id: "bus2",
    number: "30",
    name: "Aeroport - Piața Gării",
    stops: ["Aeroport", "Strada Traian Vuia", "Mărăști", "Piața Gării"],
    schedule: "5:00 - 23:30",
    frequency: "Every 15 minutes",
    type: "bus"
  },
  {
    id: "bus3",
    number: "5",
    name: "Piața Mihai Viteazu - Florești",
    stops: ["Piața Mihai Viteazu", "Opera Maghiară", "Str. Horea", "Piața 1 Mai", "Florești"],
    schedule: "5:15 - 23:15",
    frequency: "Every 8-10 minutes",
    type: "bus"
  },
  {
    id: "tram1",
    number: "101",
    name: "Mănăștur - Piața Gării",
    stops: ["Mănăștur", "Piața Cipariu", "Piața Avram Iancu", "Piața Gării"],
    schedule: "5:00 - 23:00",
    frequency: "Every 12 minutes",
    type: "tram"
  },
  {
    id: "tram2",
    number: "102",
    name: "Bucium - Piața Gării",
    stops: ["Bucium", "Iulius Mall", "Piața Mărăști", "Piața Gării"],
    schedule: "5:30 - 22:30",
    frequency: "Every 15 minutes",
    type: "tram"
  },
  {
    id: "metro1",
    number: "M1",
    name: "Florești - Mănăștur - Centru - Mărăști (Under Construction)",
    stops: ["Florești", "Mănăștur", "Piața Unirii", "Centru", "Piața Mărăști"],
    schedule: "Expected completion 2026",
    frequency: "Planned: Every 7 minutes",
    type: "metro",
    status: "planned"
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
      route.stops.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeRouteType === "all") return matchesSearch;
    return route.type === activeRouteType && matchesSearch;
  });

  const getRouteTypeIcon = (type: string) => {
    switch(type) {
      case "bus": return <Bus className="h-5 w-5" />;
      case "tram": return <TramFront className="h-5 w-5" />;
      case "metro": return <TrainFront className="h-5 w-5" />;
      default: return <Bus className="h-5 w-5" />;
    }
  };

  const getRouteTypeColor = (type: string) => {
    switch(type) {
      case "bus": return "bg-blue-500 hover:bg-blue-600";
      case "tram": return "bg-green-500 hover:bg-green-600";
      case "metro": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };
  
  const getHubTypeIcon = (type: string) => {
    switch(type) {
      case "train": return <TrainFront className="h-5 w-5" />;
      case "airport": return <Bus className="h-5 w-5" />;
      case "bus": return <Bus className="h-5 w-5" />;
      default: return <Map className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout
      title={isRomanian ? "Transport Public în Cluj-Napoca - Cluj Compass" : "Public Transportation in Cluj-Napoca - Cluj Compass"}
      description={isRomanian ? "Informații despre autobuze, tramvaie și opțiuni de transport în Cluj-Napoca." : "Find information about buses, trams, and transportation options in Cluj-Napoca."}
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
              {isRomanian ? "Transport Public în Cluj-Napoca" : "Public Transportation in Cluj-Napoca"}
            </h1>
            <p className="text-lg mb-6">
              {isRomanian 
                ? "Ghid complet al transportului public CTP în Cluj-Napoca și zona metropolitană" 
                : "Complete guide to CTP public transportation in Cluj-Napoca and the metropolitan area"}
            </p>
          </div>
        </div>
      </div>

      <div className="page-container">
        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="guide" className="flex gap-2 items-center">
              <Info className="h-4 w-4" />
              {isRomanian ? "Ghid CTP" : "CTP Guide"}
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex gap-2 items-center">
              <Bus className="h-4 w-4" />
              {isRomanian ? "Rute" : "Routes"}
            </TabsTrigger>
            <TabsTrigger value="hubs" className="flex gap-2 items-center">
              <Map className="h-4 w-4" />
              {isRomanian ? "Noduri de Transport" : "Transport Hubs"}
            </TabsTrigger>
            <TabsTrigger value="tariffs" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              {isRomanian ? "Tarife și Ticketing" : "Fares & Ticketing"}
            </TabsTrigger>
          </TabsList>
          
          {/* CTP Guide Tab */}
          <TabsContent value="guide" className="animate-fade-in">
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{isRomanian ? "Introducere" : "Introduction"}</h2>
                  <p className="mb-4 text-gray-700">
                    {isRomanian 
                      ? "Acest ghid servește ca o resursă detaliată pentru utilizarea sistemului de transport public din Cluj-Napoca și zona sa metropolitană. Scopul este de a centraliza informații esențiale despre operator, rețeaua de rute (urbane și metropolitane), tipurile de vehicule, modalitățile de achiziționare a titlurilor de călătorie și tarifele actualizate." 
                      : "This guide serves as a detailed resource for using the public transportation system in Cluj-Napoca and its metropolitan area. The aim is to centralize essential information about the operator, route network (urban and metropolitan), types of vehicles, methods of purchasing tickets, and updated fares."}
                  </p>
                  
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle>{isRomanian ? "Operatorul de Transport" : "Transport Operator"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        {isRomanian 
                          ? "Compania de Transport Public (CTP) Cluj-Napoca S.A., cunoscută anterior sub numele de RATUC, este operatorul oficial și principalul furnizor de servicii de transport public de persoane în municipiul Cluj-Napoca și în Zona Metropolitană Cluj." 
                          : "Compania de Transport Public (CTP) Cluj-Napoca S.A., formerly known as RATUC, is the official operator and main provider of public passenger transport services in Cluj-Napoca and the Cluj Metropolitan Area."}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="outline">
                          <a href="http://www.ctpcj.ro" target="_blank" rel="noopener noreferrer">www.ctpcj.ro</a>
                        </Badge>
                        <Badge variant="outline">
                          <span>{isRomanian ? "Tel: 0264-430917" : "Phone: 0264-430917"}</span>
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Urban Network Overview */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{isRomanian ? "Rețeaua de Transport Urban" : "Urban Transport Network"}</h2>
                  <p className="mb-6 text-gray-700">
                    {isRomanian 
                      ? "CTP Cluj-Napoca operează o rețea extinsă și complexă în interiorul municipiului, conectând eficient cartierele rezidențiale, zonele industriale, centrele comerciale, instituțiile de învățământ și alte puncte de interes major." 
                      : "CTP Cluj-Napoca operates an extensive and complex network within the city, efficiently connecting residential neighborhoods, industrial zones, shopping centers, educational institutions, and other major points of interest."}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {urbanNetworkInfo.vehicles.map((vehicle, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            {vehicle.icon}
                            <span>{isRomanian ? vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) : vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700">
                            {isRomanian ? vehicle.description : vehicle.description_en}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Line Suffix Explanation */}
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">{isRomanian ? "Semnificația Sufixelor Liniilor Urbane" : "Urban Line Suffix Meanings"}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {suffixExplanations.map((suffix, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>{suffix.suffix}</Badge>
                            <span className="font-medium">{suffix.meaning}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {isRomanian ? suffix.description : suffix.description_en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Metropolitan Network */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{isRomanian ? "Rețeaua de Transport Metropolitan" : "Metropolitan Transport Network"}</h2>
                  <p className="mb-4 text-gray-700">
                    {isRomanian 
                      ? "Pe lângă rețeaua urbană, CTP Cluj-Napoca joacă un rol esențial în conectarea municipiului cu localitățile învecinate din cadrul Zonei Metropolitane Cluj. Acest serviciu este vital pentru miile de persoane care locuiesc în comunele periurbane și lucrează, studiază sau accesează servicii în Cluj-Napoca." 
                      : "In addition to the urban network, CTP Cluj-Napoca plays an essential role in connecting the city with neighboring localities within the Cluj Metropolitan Area. This service is vital for thousands of people who live in suburban communes and work, study, or access services in Cluj-Napoca."}
                  </p>
                  
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{isRomanian ? "Comunele Deservite" : "Served Communes"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Florești", "Baciu", "Apahida", "Chinteni", "Feleacu", "Gilău", "Ciurila", "Aiton", "Petreștii de Jos", "Săvădisla"].map((commune, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">{commune}</Badge>
                        ))}
                      </div>
                      <p className="mt-4 text-sm text-gray-600">
                        {isRomanian 
                          ? "Lista este în continuă extindere pe măsură ce noi localități se alătură rețelei metropolitane." 
                          : "The list is continuously expanding as new localities join the metropolitan network."}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          {isRomanian 
                            ? "Tarifele pentru liniile metropolitane nu sunt uniforme, ci sunt stabilite în urma negocierilor dintre CTP și fiecare Unitate Administrativ-Teritorială (UAT - primăria comunei) deservită. Fiecare UAT decide nivelul de compensație pe care îl acordă CTP pentru operarea serviciului pe teritoriul său și, implicit, politica tarifară aplicată călătorilor din comuna respectivă." 
                            : "Fares for metropolitan lines are not uniform but are established following negotiations between CTP and each served Administrative-Territorial Unit (ATU - commune hall). Each ATU decides the level of compensation it provides to CTP for operating the service on its territory and, implicitly, the tariff policy applied to passengers from that commune."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Practical Recommendations */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{isRomanian ? "Recomandări Practice" : "Practical Recommendations"}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {practicalRecommendations.map((rec, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">{isRomanian ? rec.title : rec.title_en}</h3>
                        <p className="text-sm text-gray-600">
                          {isRomanian ? rec.description : rec.description_en}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">{isRomanian ? "Resurse Utile" : "Useful Resources"}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {usefulResources.map((resource, index) => (
                        <Card key={index} className="bg-gray-50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{isRomanian ? resource.name : resource.name_en}</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-gray-600 mb-2">{resource.url}</p>
                            <p className="text-xs text-gray-500">
                              {isRomanian ? resource.description : resource.description_en}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Routes Tab */}
          <TabsContent value="routes" className="animate-fade-in">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder={isRomanian ? "Caută rute, stații..." : "Search routes, stops..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cluj-primary"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={activeRouteType === "all" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("all")}
                  >
                    {isRomanian ? "Toate" : "All"}
                  </Button>
                  <Button 
                    variant={activeRouteType === "bus" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("bus")}
                    className="flex gap-2 items-center"
                  >
                    <Bus className="h-4 w-4" />
                    {isRomanian ? "Autobuze" : "Buses"}
                  </Button>
                  <Button 
                    variant={activeRouteType === "tram" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("tram")}
                    className="flex gap-2 items-center"
                  >
                    <TramFront className="h-4 w-4" />
                    {isRomanian ? "Tramvaie" : "Trams"}
                  </Button>
                  <Button 
                    variant={activeRouteType === "metro" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("metro")}
                    className="flex gap-2 items-center"
                  >
                    <TrainFront className="h-4 w-4" />
                    {isRomanian ? "Metrou" : "Metro"}
                  </Button>
                </div>
              </div>
              
              {/* Routes List */}
              <div className="space-y-4">
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route) => (
                    <div 
                      key={route.id} 
                      className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden animate-fade-in"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/6 flex items-center justify-center p-6 bg-gray-50">
                          <div className="flex flex-col items-center">
                            <Badge className={`${getRouteTypeColor(route.type)} mb-2 flex gap-1 items-center px-3 py-1`}>
                              {getRouteTypeIcon(route.type)}
                              <span>
                                {isRomanian 
                                  ? route.type === "bus" 
                                    ? "Autobuz" 
                                    : route.type === "tram" 
                                      ? "Tramvai" 
                                      : "Metrou"
                                  : route.type.charAt(0).toUpperCase() + route.type.slice(1)
                                }
                              </span>
                            </Badge>
                            <div className="text-2xl font-bold text-gray-800">{route.number}</div>
                            {route.status === "planned" && (
                              <Badge variant="outline" className="mt-2 text-yellow-600 border-yellow-300 bg-yellow-50">
                                {isRomanian ? "Planificat" : "Planned"}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-6 md:w-5/6">
                          <h3 className="font-semibold text-lg mb-3">{route.name}</h3>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {route.stops.map((stop, index) => (
                              <div key={index} className="flex items-center">
                                {index > 0 && <div className="h-px w-4 bg-gray-300 mx-1"></div>}
                                <span className="text-sm py-1 px-2 bg-gray-100 rounded-md">{stop}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-cluj-primary" />
                              <span>{isRomanian ? "Program: " : "Schedule: "}{route.schedule}</span>
                            </div>
                            <div className="flex items-center">
                              <Bus className="h-4 w-4 mr-2 text-cluj-primary" />
                              <span>
                                {isRomanian ? "Frecvență: " : "Frequency: "}
                                {route.frequency}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">
                      {isRomanian 
                        ? "Nu s-au găsit rute care să corespundă criteriilor tale." 
                        : "No routes found matching your criteria."}
                    </p>
                    <Button onClick={() => {setSearchTerm(''); setActiveRouteType('all');}}>
                      {isRomanian ? "Vezi Toate Rutele" : "View All Routes"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hubs" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {transportHubs.map((hub) => (
                <div 
                  key={hub.id}
                  className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-lg">{hub.name}</h3>
                      <div className="bg-cluj-primary/10 p-2 rounded-full">
                        {getHubTypeIcon(hub.type)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{hub.description}</p>
                    
                    <div className="text-sm mb-4">
                      <div className="font-medium text-gray-800 mb-1">{isRomanian ? "Adresă:" : "Address:"}</div>
                      <div className="text-gray-600">{hub.address}</div>
                    </div>
                    
                    <div className="text-sm mb-4">
                      <div className="font-medium text-gray-800 mb-1">{isRomanian ? "Facilități:" : "Facilities:"}</div>
                      <div className="flex flex-wrap gap-2">
                        {hub.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium text-gray-800 mb-1">{isRomanian ? "Conexiuni:" : "Connections:"}</div>
                      <div className="flex flex-wrap gap-2">
                        {hub.connections.map((connection, index) => (
                          <Badge key={index} variant="secondary" className="bg-cluj-primary/10 text-cluj-primary">
                            {connection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tariffs" className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6">{isRomanian ? "Tarife și Ticketing" : "Fares & Ticketing"}</h2>
              
              <div className="space-y-8">
                {/* ConnectCluj Card */}
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    {isRomanian ? "Cardul de Călătorie ConnectCluj" : "ConnectCluj Travel Card"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {ticketingInfo.cardTypes.map((card, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{card.type}</CardTitle>
                          <CardDescription>
                            {isRomanian ? card.description : card.description_en}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {(isRomanian ? card.features : card.features_en).map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    {isRomanian ? "Metode de Plată și Achiziție a Titlurilor de Călătorie" : "Payment Methods and Ticket Purchase"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {ticketingInfo.paymentMethods.map((method, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {method.icon}
                          <span className="font-medium">{method.method}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {isRomanian ? method.description : method.description_en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Urban Tariffs */}
                <div>
                  <h3 className="text-xl font-medium mb-3">{isRomanian ? "Tarife Urbane" : "Urban Fares"}</h3>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>
                        {isRomanian 
                          ? "Tarifele prezentate sunt cele cunoscute la momentul redactării (1 Iulie 2022). Verificați www.ctpcj.ro pentru tarifele curente." 
                          : "The tariffs presented are those known at the time of writing (July 1, 2022). Check www.ctpcj.ro for current tariffs."}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{isRomanian ? "Tip Bilet / Abonament" : "Ticket / Subscription Type"}</TableHead>
                          <TableHead>{isRomanian ? "Preț (Lei)" : "Price (Lei)"}</TableHead>
                          <TableHead>{isRomanian ? "Observații" : "Notes"}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ticketingInfo.urbanTariffs.map((tariff, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{tariff.type}</TableCell>
                            <TableCell>{tariff.price}</TableCell>
                            <TableCell className="text-sm text-gray-600">{isRomanian ? tariff.note : tariff.note_en}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Metropolitan Tariffs */}
                <div>
                  <h3 className="text-xl font-medium mb-3">{isRomanian ? "Tarife Metropolitane (Selecție)" : "Metropolitan Fares (Selection)"}</h3>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>
                        {isRomanian 
                          ? "Tarifele pentru transportul metropolitan variază în funcție de comună și distanță. Acestea sunt stabilite în colaborare cu UAT-urile locale." 
                          : "Metropolitan transport fares vary depending on the commune and distance. They are established in collaboration with local ATUs."}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{isRomanian ? "Destinație / Comuna" : "Destination / Commune"}</TableHead>
                          <TableHead>{isRomanian ? "Linii" : "Lines"}</TableHead>
                          <TableHead>{isRomanian ? "Preț Bilet (Lei)" : "Ticket Price (Lei)"}</TableHead>
                          <TableHead>{isRomanian ? "Abonament Lunar (Lei)" : "Monthly Pass (Lei)"}</TableHead>
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
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">{isRomanian ? "Gratuități și Reduceri" : "Free and Discounted Travel"}</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      {isRomanian 
                        ? "CTP Cluj-Napoca acordă facilități la transport (gratuități sau reduceri) pentru anumite categorii socio-profesionale, conform legislației în vigoare și hotărârilor locale." 
                        : "CTP Cluj-Napoca provides transport facilities (free or reduced fares) for certain socio-professional categories, according to current legislation and local decisions."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        isRomanian ? "Elevi" : "Students", 
                        isRomanian ? "Studenți" : "University students", 
                        isRomanian ? "Pensionari" : "Pensioners", 
                        isRomanian ? "Donatori de sânge" : "Blood donors", 
                        isRomanian ? "Persoane cu dizabilități" : "People with disabilities"
                      ].map((category, index) => (
                        <Badge key={index} variant="outline">{category}</Badge>
                      ))}
                    </div>
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
