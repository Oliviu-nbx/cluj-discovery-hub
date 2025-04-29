
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Calendar as CalIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Mock events data
const events = [
  {
    id: "event1",
    title: "UNTOLD Festival",
    description: "One of the largest electronic music festivals in Europe",
    location: "Central Park, Cluj-Napoca",
    date: "2025-08-01",
    endDate: "2025-08-04",
    time: "16:00",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60",
    category: "Music",
    attendance: "350,000+",
    featured: true
  },
  {
    id: "event2",
    title: "Electric Castle",
    description: "Music and arts festival held at Banffy Castle",
    location: "Banffy Castle, near Cluj-Napoca",
    date: "2025-07-15",
    endDate: "2025-07-19",
    time: "14:00",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
    category: "Music",
    attendance: "200,000+",
    featured: true
  },
  {
    id: "event3",
    title: "TIFF - Transilvania International Film Festival",
    description: "Romania's largest international feature film festival",
    location: "Various locations in Cluj-Napoca",
    date: "2025-05-28",
    endDate: "2025-06-06",
    time: "10:00",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60",
    category: "Film",
    attendance: "100,000+",
    featured: true
  },
  {
    id: "event4",
    title: "Cluj-Napoca Christmas Market",
    description: "Traditional Christmas market with local crafts and food",
    location: "Unirii Square, Cluj-Napoca",
    date: "2025-11-25",
    endDate: "2025-12-24",
    time: "11:00",
    imageUrl: "https://images.unsplash.com/photo-1482350325005-adeaf3f918b3?w=800&auto=format&fit=crop&q=60",
    category: "Cultural",
    attendance: "150,000+",
    featured: false
  },
  {
    id: "event5",
    title: "Cluj Innovation Days",
    description: "Conference focused on technology and innovation",
    location: "Grand Hotel Italia, Cluj-Napoca",
    date: "2025-10-15",
    endDate: "2025-10-16",
    time: "09:00",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
    category: "Business",
    attendance: "3,000+",
    featured: false
  },
  {
    id: "event6",
    title: "Jazz in the Park",
    description: "Open-air jazz festival in Central Park",
    location: "Central Park, Cluj-Napoca",
    date: "2025-07-01",
    endDate: "2025-07-03",
    time: "17:00",
    imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60",
    category: "Music",
    attendance: "50,000+",
    featured: false
  }
];

// Filter categories from events
const categories = [...new Set(events.map(event => event.category))];

const EventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    let filtered = events;
    
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, searchQuery]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <MainLayout 
      title="Events in Cluj-Napoca - Cluj Compass"
      description="Discover upcoming events in Cluj-Napoca, from music festivals to cultural happenings and more."
    >
      {/* Hero Section */}
      <div className="relative bg-cluj-dark text-white">
        <div 
          className="absolute inset-0 overflow-hidden opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold sm:text-4xl mb-4">
              Events in Cluj-Napoca
            </h1>
            <p className="text-lg mb-6">
              Discover the best festivals, concerts, exhibitions, and cultural happenings in Cluj-Napoca
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="animate-fade-in"
          >
            All Events
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="animate-fade-in"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cluj-primary"
          />
        </div>
        
        {/* Featured Events */}
        {!selectedCategory && !searchQuery && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {events.filter(event => event.featured).map((event) => (
                <div key={event.id} className="group relative h-80 rounded-lg overflow-hidden shadow-lg animate-fade-in">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <Badge className="self-start mb-2 bg-cluj-primary hover:bg-cluj-secondary">
                      {event.category}
                    </Badge>
                    <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-white/80 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex items-center text-white/90 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {/* All Events */}
        <h2 className="text-2xl font-semibold mb-4">
          {selectedCategory ? `${selectedCategory} Events` : "All Events"}
        </h2>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow animate-fade-in"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-cluj-primary hover:bg-cluj-secondary">
                      {event.category}
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {formatDate(event.date)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 hover:text-cluj-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-cluj-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-cluj-primary" />
                      <span>{event.time}</span>
                    </div>
                    {event.attendance && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2 text-cluj-primary" />
                        <span>Expected attendance: {event.attendance}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No events found matching your criteria.</p>
            <Button onClick={() => {setSelectedCategory(null); setSearchQuery('');}}>
              View All Events
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EventsPage;
