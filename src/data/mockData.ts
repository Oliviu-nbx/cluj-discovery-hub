// Mock Categories
export const categories = [
  {
    id: "1",
    name: "Restaurants",
    slug: "restaurants",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=60",
    count: 38
  },
  {
    id: "2",
    name: "Cafes",
    slug: "cafes",
    imageUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=60",
    count: 24
  },
  {
    id: "3",
    name: "Attractions",
    slug: "attractions",
    imageUrl: "https://images.unsplash.com/photo-1558462610-cbb02a8a12e2?w=800&auto=format&fit=crop&q=60",
    count: 16
  },
  {
    id: "4",
    name: "Parks",
    slug: "parks",
    imageUrl: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&auto=format&fit=crop&q=60",
    count: 8
  },
  {
    id: "5",
    name: "Museums",
    slug: "museums",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&auto=format&fit=crop&q=60",
    count: 6
  },
  {
    id: "6",
    name: "Hotels",
    slug: "hotels",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
    count: 12
  },
  {
    id: "7",
    name: "Malls",
    slug: "malls",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60",
    count: 4
  },
  {
    id: "8",
    name: "Gyms",
    slug: "gyms",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
    count: 6
  },
  {
    id: "9",
    name: "Libraries",
    slug: "libraries",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
    count: 3
  },
  {
    id: "10",
    name: "Bakeries",
    slug: "bakeries",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=60",
    count: 7
  }
];

// Mock Locations
export const locations = [
  {
    id: "1",
    name: "Samsara Foodhouse",
    slug: "samsara-foodhouse",
    category: "Restaurants",
    categoryId: "1",
    address: "Str. Stephan Ludwig Roth 5, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    reviewCount: 348,
    priceLevel: 2,
    isOpenNow: true,
    phone: "+40 364 145 850",
    website: "https://samsara.ro/",
    description: "Samsara Foodhouse is a vegan and vegetarian restaurant in Cluj-Napoca, offering a diverse menu of plant-based dishes in a relaxed and cozy atmosphere.",
    googleRating: 4.7,
    trustpilotRating: 4.5,
    compositeScore: 4.6,
    latitude: 46.7712,
    longitude: 23.5876,
    amenities: ["Vegan Options", "Vegetarian Options", "Gluten-Free Options"],
    openingHours: {
      monday: "10:00 AM - 10:00 PM",
      tuesday: "10:00 AM - 10:00 PM",
      wednesday: "10:00 AM - 10:00 PM",
      thursday: "10:00 AM - 10:00 PM",
      friday: "10:00 AM - 10:00 PM",
      saturday: "10:00 AM - 10:00 PM",
      sunday: "10:00 AM - 10:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1567966563153-9declare126a34?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r1",
        author: "John Doe",
        rating: 5,
        text: "Amazing vegan food! Highly recommend the Buddha bowl.",
        date: "2023-05-15",
        source: "Google"
      },
      {
        id: "r2",
        author: "Jane Smith",
        rating: 4,
        text: "Great atmosphere and delicious food. A bit pricey but worth it.",
        date: "2023-04-20",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "2",
    name: "Olivo Restaurant",
    slug: "olivo-restaurant",
    category: "Restaurants",
    categoryId: "1",
    address: "Str. Republicii 25, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=60",
    rating: 4.8,
    reviewCount: 512,
    priceLevel: 3,
    isOpenNow: true,
    phone: "+40 364 730 146",
    website: "https://olivorestaurant.ro/",
    description: "Olivo Restaurant offers Italian specialties in an elegant setting in the heart of Cluj-Napoca.",
    googleRating: 4.8,
    trustpilotRating: 4.7,
    compositeScore: 4.75,
    latitude: 46.7683,
    longitude: 23.5899,
    amenities: ["Wine Bar", "Outdoor Seating", "Reservations"],
    openingHours: {
      monday: "12:00 PM - 11:00 PM",
      tuesday: "12:00 PM - 11:00 PM",
      wednesday: "12:00 PM - 11:00 PM",
      thursday: "12:00 PM - 11:00 PM",
      friday: "12:00 PM - 12:00 AM",
      saturday: "12:00 PM - 12:00 AM",
      sunday: "12:00 PM - 10:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r3",
        author: "Michael Brown",
        rating: 5,
        text: "Best Italian food in Cluj! The pasta is homemade and delicious.",
        date: "2023-06-10",
        source: "Google"
      },
      {
        id: "r4",
        author: "Sarah Johnson",
        rating: 4,
        text: "Excellent service and lovely atmosphere. Food was amazing but a bit expensive.",
        date: "2023-05-28",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "3",
    name: "Koffer",
    slug: "koffer",
    category: "Cafes",
    categoryId: "2",
    address: "Str. Universității 2, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=60",
    rating: 4.6,
    reviewCount: 289,
    priceLevel: 2,
    isOpenNow: true,
    phone: "+40 751 144 525",
    website: "https://www.facebook.com/koffercafe/",
    description: "Koffer is a cozy cafe in the center of Cluj-Napoca, known for its excellent specialty coffee and friendly atmosphere.",
    googleRating: 4.6,
    trustpilotRating: 4.4,
    compositeScore: 4.5,
    latitude: 46.7676,
    longitude: 23.5899,
    amenities: ["Free Wi-Fi", "Outdoor Seating", "Specialty Coffee"],
    openingHours: {
      monday: "8:00 AM - 10:00 PM",
      tuesday: "8:00 AM - 10:00 PM",
      wednesday: "8:00 AM - 10:00 PM",
      thursday: "8:00 AM - 10:00 PM",
      friday: "8:00 AM - 12:00 AM",
      saturday: "9:00 AM - 12:00 AM",
      sunday: "9:00 AM - 8:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r5",
        author: "David Wilson",
        rating: 5,
        text: "Perfect coffee shop with amazing atmosphere. Their flat white is the best in town!",
        date: "2023-06-05",
        source: "Google"
      },
      {
        id: "r6",
        author: "Emma Davis",
        rating: 4,
        text: "Great place to work remotely. Good coffee and nice pastries.",
        date: "2023-05-22",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "4",
    name: "Botanical Garden",
    slug: "botanical-garden",
    category: "Attractions",
    categoryId: "3",
    address: "Str. Republicii 42, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviewCount: 876,
    priceLevel: 1,
    isOpenNow: true,
    phone: "+40 264 597 604",
    website: "https://gradinabotanica.ubbcluj.ro/",
    description: "The Alexandru Borza Botanical Garden is a large botanical garden in Cluj-Napoca, featuring over 10,000 plant species from around the world.",
    googleRating: 4.5,
    trustpilotRating: 4.3,
    compositeScore: 4.4,
    latitude: 46.7603,
    longitude: 23.5882,
    amenities: ["Guided Tours", "Gift Shop", "Accessible"],
    openingHours: {
      monday: "8:00 AM - 8:00 PM",
      tuesday: "8:00 AM - 8:00 PM",
      wednesday: "8:00 AM - 8:00 PM",
      thursday: "8:00 AM - 8:00 PM",
      friday: "8:00 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "8:00 AM - 8:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1564512480839-f2da8a4c99db?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1590690516200-1fa0834e6d18?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r7",
        author: "Thomas Green",
        rating: 5,
        text: "Beautiful garden with a wide variety of plants. Perfect for a relaxing walk.",
        date: "2023-06-15",
        source: "Google"
      },
      {
        id: "r8",
        author: "Lisa Taylor",
        rating: 4,
        text: "Lovely place to visit in spring when everything is blooming. Well maintained.",
        date: "2023-05-30",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "5",
    name: "Central Park",
    slug: "central-park",
    category: "Parks",
    categoryId: "4",
    address: "Strada Emil Isac, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1588714477688-cf28a50e27dd?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    reviewCount: 1254,
    priceLevel: 1,
    isOpenNow: true,
    phone: "",
    website: "",
    description: "Central Park (Parcul Central) is the main park in Cluj-Napoca, offering beautiful landscapes, a lake, and various recreational activities.",
    googleRating: 4.7,
    trustpilotRating: 4.6,
    compositeScore: 4.65,
    latitude: 46.7706,
    longitude: 23.5783,
    amenities: ["Playgrounds", "Lake", "Bike Rental"],
    openingHours: {
      monday: "Open 24 hours",
      tuesday: "Open 24 hours",
      wednesday: "Open 24 hours",
      thursday: "Open 24 hours",
      friday: "Open 24 hours",
      saturday: "Open 24 hours",
      sunday: "Open 24 hours"
    },
    photos: [
      "https://images.unsplash.com/photo-1588714477688-cf28a50e27dd?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568480571644-c2819a62e477?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1615554514546-a4a05e6bd05d?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r9",
        author: "Robert Jones",
        rating: 5,
        text: "Perfect place for a picnic or a jog. The lake is beautiful and there's plenty of space.",
        date: "2023-06-20",
        source: "Google"
      },
      {
        id: "r10",
        author: "Jennifer Miller",
        rating: 4,
        text: "Well-maintained park in the heart of the city. Great for families.",
        date: "2023-06-02",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "6",
    name: "National History Museum of Transylvania",
    slug: "national-history-museum-of-transylvania",
    category: "Museums",
    categoryId: "5",
    address: "Strada Constantin Daicoviciu 2, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop&q=60",
    rating: 4.4,
    reviewCount: 560,
    priceLevel: 1,
    isOpenNow: false,
    phone: "+40 264 595 677",
    website: "https://www.muzeul-etnografic.ro/",
    description: "The National History Museum of Transylvania is one of the most important history museums in Romania, with exhibits covering the region's rich history.",
    googleRating: 4.4,
    trustpilotRating: 4.2,
    compositeScore: 4.3,
    latitude: 46.7702,
    longitude: 23.5892,
    amenities: ["Guided Tours", "Gift Shop", "Accessible"],
    openingHours: {
      monday: "Closed",
      tuesday: "10:00 AM - 4:00 PM",
      wednesday: "10:00 AM - 4:00 PM",
      thursday: "10:00 AM - 4:00 PM",
      friday: "10:00 AM - 4:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "10:00 AM - 4:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566096650255-98ba2641071c?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582554234327-8a7e6e729917?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r11",
        author: "Paul Adams",
        rating: 4,
        text: "Very informative museum with great exhibits about Transylvanian history.",
        date: "2023-05-25",
        source: "Google"
      },
      {
        id: "r12",
        author: "Maria Garcia",
        rating: 5,
        text: "Fascinating collection of artifacts. The Roman exhibits are particularly impressive.",
        date: "2023-04-30",
        source: "Trustpilot"
      }
    ]
  },
  {
    id: "7",
    name: "Hotel Beyfin",
    slug: "hotel-beyfin",
    category: "Hotels",
    categoryId: "6",
    address: "Piața Avram Iancu 3, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=60",
    rating: 4.6,
    reviewCount: 324,
    priceLevel: 3,
    isOpenNow: true,
    phone: "+40 264 598 686",
    website: "https://hotelbeyfin.ro/",
    description: "Hotel Beyfin is a luxurious hotel located in the heart of Cluj-Napoca, offering comfortable rooms and excellent service.",
    googleRating: 4.6,
    trustpilotRating: 4.5,
    compositeScore: 4.55,
    latitude: 46.7714,
    longitude: 23.5916,
    amenities: ["Free Wi-Fi", "Restaurant", "Spa", "Fitness Center"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    photos: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r13",
        author: "Daniel Lee",
        rating: 5,
        text: "Excellent hotel with great amenities. The staff was very friendly and helpful.",
        date: "2023-06-18",
        source: "Google"
      },
      {
        id: "r14",
        author: "Laura White",
        rating: 4,
        text: "Comfortable rooms and great location in the city center. Breakfast was delicious.",
        date: "2023-05-15",
        source: "Booking.com"
      }
    ]
  },
  {
    id: "8",
    name: "The Office",
    slug: "the-office",
    category: "Cafes",
    categoryId: "2",
    address: "Strada Brassai Sámuel 12, Cluj-Napoca",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviewCount: 412,
    priceLevel: 2,
    isOpenNow: true,
    phone: "+40 264 450 052",
    website: "http://www.theofficecluj.ro/",
    description: "The Office is a popular cafe and workspace in Cluj-Napoca, offering great coffee and a perfect environment for work or meetings.",
    googleRating: 4.5,
    trustpilotRating: 4.4,
    compositeScore: 4.45,
    latitude: 46.7694,
    longitude: 23.5833,
    amenities: ["Free Wi-Fi", "Power Outlets", "Meeting Rooms"],
    openingHours: {
      monday: "8:00 AM - 10:00 PM",
      tuesday: "8:00 AM - 10:00 PM",
      wednesday: "8:00 AM - 10:00 PM",
      thursday: "8:00 AM - 10:00 PM",
      friday: "8:00 AM - 11:00 PM",
      saturday: "9:00 AM - 11:00 PM",
      sunday: "9:00 AM - 8:00 PM"
    },
    photos: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1545665277-5937489579f2?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800&auto=format&fit=crop&q=60"
    ],
    reviews: [
      {
        id: "r15",
        author: "Richard Thompson",
        rating: 5,
        text: "Great place to work remotely. Excellent coffee and friendly staff.",
        date: "2023-06-14",
        source: "Google"
      },
      {
        id: "r16",
        author: "Amanda Harris",
        rating: 4,
        text: "Nice atmosphere and good coffee. Can get busy during peak hours.",
        date: "2023-05-28",
        source: "Trustpilot"
      }
    ]
  }
];
