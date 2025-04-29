
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bus, Train, Map, Clock, Search, AlertCircle } from "lucide-react";

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

const TransportationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRouteType, setActiveRouteType] = useState("all");
  
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
      case "tram": return <Train className="h-5 w-5" />;
      case "metro": return <Map className="h-5 w-5" />;
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
      case "train": return <Train className="h-5 w-5" />;
      case "airport": return <Bus className="h-5 w-5" />;
      case "bus": return <Bus className="h-5 w-5" />;
      default: return <Map className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout
      title="Public Transportation in Cluj-Napoca - Cluj Compass"
      description="Find information about buses, trams, and transportation options in Cluj-Napoca."
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
              Public Transportation in Cluj-Napoca
            </h1>
            <p className="text-lg mb-6">
              Explore buses, trams, and transportation options in Cluj-Napoca
            </p>
          </div>
        </div>
      </div>

      <div className="page-container">
        <Tabs defaultValue="routes" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="routes" className="flex gap-2 items-center">
              <Bus className="h-4 w-4" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="hubs" className="flex gap-2 items-center">
              <Map className="h-4 w-4" />
              Transport Hubs
            </TabsTrigger>
            <TabsTrigger value="info" className="flex gap-2 items-center">
              <AlertCircle className="h-4 w-4" />
              Travel Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="routes" className="animate-fade-in">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search routes, stops..."
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
                    All
                  </Button>
                  <Button 
                    variant={activeRouteType === "bus" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("bus")}
                    className="flex gap-2 items-center"
                  >
                    <Bus className="h-4 w-4" />
                    Buses
                  </Button>
                  <Button 
                    variant={activeRouteType === "tram" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("tram")}
                    className="flex gap-2 items-center"
                  >
                    <Train className="h-4 w-4" />
                    Trams
                  </Button>
                  <Button 
                    variant={activeRouteType === "metro" ? "default" : "outline"}
                    onClick={() => setActiveRouteType("metro")}
                    className="flex gap-2 items-center"
                  >
                    <Map className="h-4 w-4" />
                    Metro
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
                              <span>{route.type.charAt(0).toUpperCase() + route.type.slice(1)}</span>
                            </Badge>
                            <div className="text-2xl font-bold text-gray-800">{route.number}</div>
                            {route.status === "planned" && (
                              <Badge variant="outline" className="mt-2 text-yellow-600 border-yellow-300 bg-yellow-50">
                                Planned
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
                              <span>Schedule: {route.schedule}</span>
                            </div>
                            <div className="flex items-center">
                              <Bus className="h-4 w-4 mr-2 text-cluj-primary" />
                              <span>Frequency: {route.frequency}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">No routes found matching your criteria.</p>
                    <Button onClick={() => {setSearchTerm(''); setActiveRouteType('all');}}>
                      View All Routes
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
                      <div className="font-medium text-gray-800 mb-1">Address:</div>
                      <div className="text-gray-600">{hub.address}</div>
                    </div>
                    
                    <div className="text-sm mb-4">
                      <div className="font-medium text-gray-800 mb-1">Facilities:</div>
                      <div className="flex flex-wrap gap-2">
                        {hub.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium text-gray-800 mb-1">Connections:</div>
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
          
          <TabsContent value="info" className="animate-fade-in">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Travel Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-3">Tickets and Passes</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Single Trip Ticket</h4>
                      <p className="text-sm text-gray-600 mb-2">Valid for one trip on any bus or tram line.</p>
                      <div className="text-cluj-primary font-medium">Price: 3 RON</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Day Pass</h4>
                      <p className="text-sm text-gray-600 mb-2">Unlimited travel on all buses and trams for 24 hours.</p>
                      <div className="text-cluj-primary font-medium">Price: 14 RON</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Weekly Pass</h4>
                      <p className="text-sm text-gray-600 mb-2">Unlimited travel on all buses and trams for 7 days.</p>
                      <div className="text-cluj-primary font-medium">Price: 40 RON</div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Monthly Pass</h4>
                      <p className="text-sm text-gray-600 mb-2">Unlimited travel on all buses and trams for 30 days.</p>
                      <div className="text-cluj-primary font-medium">Price: 80 RON</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Where to Buy Tickets</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Ticket kiosks at major stops (Piața Unirii, Piața Mihai Viteazu, Piața Mărăști)</li>
                    <li>CTP mobile app (available on iOS and Android)</li>
                    <li>SMS ticket service</li>
                    <li>Ticket machines at major stops</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Transportation Apps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Cluj Public Transport (CTP)</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Official app with real-time schedules, route planning, and mobile tickets.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">iOS</Button>
                        <Button size="sm" variant="outline">Android</Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Moovit</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Popular transit app with real-time arrivals and departures.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">iOS</Button>
                        <Button size="sm" variant="outline">Android</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-3">Transportation Rules</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Validate your ticket immediately after boarding</li>
                    <li>Keep your ticket until the end of your journey</li>
                    <li>Give up your seat to elderly, pregnant women, and people with disabilities</li>
                    <li>Large luggage items may require an additional ticket</li>
                    <li>Pets must be in carriers or muzzled and on a leash</li>
                  </ul>
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
