// Event Categories
export const CATEGORIES = [
  {
    id: "tech",
    label: "Technology",
    icon: "💻",
    description: "Tech meetups, hackathons, and developer conferences",
  },
  {
    id: "music",
    label: "Music",
    icon: "🎵",
    description: "Concerts, festivals, and live performances",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    description: "Sports events, tournaments, and fitness activities",
  },
  {
    id: "art",
    label: "Art & Culture",
    icon: "🎨",
    description: "Art exhibitions, cultural events, and creative workshops",
  },
  {
    id: "food",
    label: "Food & Drink",
    icon: "🍕",
    description: "Food festivals, cooking classes, and culinary experiences",
  },
  {
    id: "business",
    label: "Business",
    icon: "💼",
    description: "Networking events, conferences, and startup meetups",
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: "🧘",
    description: "Yoga, meditation, wellness workshops, and health seminars",
  },
  {
    id: "education",
    label: "Education",
    icon: "📚",
    description: "Workshops, seminars, and learning experiences",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: "🎮",
    description: "Gaming tournaments, esports, and gaming conventions",
  },
  {
    id: "networking",
    label: "Networking",
    icon: "🤝",
    description: "Professional networking and community building events",
  },
  {
    id: "outdoor",
    label: "Outdoor & Adventure",
    icon: "🏕️",
    description: "Hiking, camping, and outdoor activities",
  },
  {
    id: "community",
    label: "Community",
    icon: "👥",
    description: "Local community gatherings and social events",
  },
];

// Get category by ID
export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

// Get category label by ID
export const getCategoryLabel = (id) => {
  const category = getCategoryById(id);
  return category ? category.label : id;
};

// Get category icon by ID
export const getCategoryIcon = (id) => {
  const category = getCategoryById(id);
  return category ? category.icon : "📅";
};
// Bangladesh Divisions and Districts
export const BANGLADESH_LOCATIONS = {
  "Dhaka": [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Kishoreganj",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  "Chittagong": [
    "Chittagong",
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  "Khulna": [
    "Khulna",
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Magura",
    "Narail",
    "Satkhira",
  ],
  "Rajshahi": [
    "Rajshahi",
    "Bogra",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Sirajganj",
  ],
  "Barisal": [
    "Barisal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  "Sylhet": [
    "Sylhet",
    "Habiganj",
    "Moulvibazar",
    "Sunamganj",
  ],
  "Rangpur": [
    "Rangpur",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Thakurgaon",
  ],
  "Mymensingh": [
    "Mymensingh",
    "Jamalpur",
    "Netrokona",
    "Sherpur",
  ],
};