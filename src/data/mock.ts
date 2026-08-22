export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  costIndex: 'Low' | 'Medium' | 'High';
  popularity: number; // 1-5
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  category: 'Sightseeing' | 'Food' | 'Culture' | 'Adventure' | 'Shopping' | 'Nature' | 'Nightlife' | 'Relaxation' | 'Experiences' | 'Family-Friendly';
  duration: number; // minutes
  cost: number;
  rating: number;
  image: string;
  description: string;
}

export interface TripActivity extends Activity {
  tripActivityId: string;
  startTime: string; // ISO or HH:mm
  date?: string; // YYYY-MM-DD
}

export interface TripStop {
  id: string;
  city: City;
  startDate: string; // ISO
  endDate: string; // ISO
  activities: TripActivity[];
}

export interface Expense {
  id: string;
  category: 'Transport' | 'Accommodation' | 'Activities' | 'Meals' | 'Other';
  amount: number;
  date: string;
}

export interface Trip {
  id: string;
  name: string;
  coverImage: string;
  startDate: string; // ISO
  endDate: string; // ISO
  status: 'Upcoming' | 'Past' | 'Draft';
  budget: number;
  currency?: string; // e.g. INR, USD
  stops: TripStop[];
  expenses: Expense[];
  travelStyle: string;
}

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Samiksha',
  email: 'samiksha@example.com',
  avatar: 'https://i.pravatar.cc/150?u=samiksha',
};

export const MOCK_CITIES: City[] = [
  {id:'c1',name:'Rome',country:'Italy','region':'Europe','costIndex':'Medium','popularity':4.8,description:'Historic ruins, art, and vibrant street life.',image:'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800'},
  {id:'c2',name:'Florence',country:'Italy','region':'Europe','costIndex':'Medium','popularity':4.7,description:'The cradle of the Renaissance.',image:'https://images.pexels.com/photos/1761921/pexels-photo-1761921.jpeg?auto=compress&cs=tinysrgb&w=800'},
  {id:'c3',name:'Venice',country:'Italy','region':'Europe','costIndex':'High','popularity':4.9,description:'Canals, gondolas, and romance.',image:'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800'},
  {id:'c4',name:'Paris',country:'France','region':'Europe','costIndex':'High','popularity':5,description:'City of light, love, and the Eiffel Tower.',image:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800'},
  {id:'c5',name:'Tokyo',country:'Japan','region':'Asia','costIndex':'High','popularity':4.9,description:'Neon lights and ancient temples.',image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800'},
  {id:'c6',name:'Bali',country:'Indonesia','region':'Asia','costIndex':'Low','popularity':4.8,description:'Tropical beaches and spiritual retreats.',image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'},
  {id:'c7',name:'New York',country:'USA','region':'North America','costIndex':'High','popularity':4.9,description:'The city that never sleeps.',image:'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800'},
  {id:'c8',name:'Mumbai',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Mumbai.',image:'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800'},
  {id:'c9',name:'Delhi',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Delhi.',image:'https://loremflickr.com/800/600/delhi,city?lock=8'},
  {id:'c10',name:'Goa',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Goa.',image:'https://loremflickr.com/800/600/goa,city?lock=9'},
  {id:'c11',name:'Jaipur',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Jaipur.',image:'https://loremflickr.com/800/600/jaipur,city?lock=10'},
  {id:'c12',name:'Udaipur',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Udaipur.',image:'https://loremflickr.com/800/600/udaipur,city?lock=11'},
  {id:'c13',name:'Agra',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Agra.',image:'https://loremflickr.com/800/600/agra,city?lock=12'},
  {id:'c14',name:'Bengaluru',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Bengaluru.',image:'https://loremflickr.com/800/600/bengaluru,city?lock=13'},
  {id:'c15',name:'Hyderabad',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Hyderabad.',image:'https://loremflickr.com/800/600/hyderabad,city?lock=14'},
  {id:'c16',name:'Chennai',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Chennai.',image:'https://loremflickr.com/800/600/chennai,city?lock=15'},
  {id:'c17',name:'Kolkata',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Kolkata.',image:'https://loremflickr.com/800/600/kolkata,city?lock=16'},
  {id:'c18',name:'Pune',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Pune.',image:'https://loremflickr.com/800/600/pune,city?lock=17'},
  {id:'c19',name:'Manali',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Manali.',image:'https://loremflickr.com/800/600/manali,city?lock=18'},
  {id:'c20',name:'Shimla',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Shimla.',image:'https://loremflickr.com/800/600/shimla,city?lock=19'},
  {id:'c21',name:'Rishikesh',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Rishikesh.',image:'https://loremflickr.com/800/600/rishikesh,city?lock=20'},
  {id:'c22',name:'Varanasi',country:'India','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Varanasi.',image:'https://loremflickr.com/800/600/varanasi,city?lock=21'},
  {id:'c23',name:'Milan',country:'Italy','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Milan.',image:'https://loremflickr.com/800/600/milan,city?lock=22'},
  {id:'c24',name:'London',country:'UK','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of London.',image:'https://loremflickr.com/800/600/london,city?lock=23'},
  {id:'c25',name:'Amsterdam',country:'Netherlands','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Amsterdam.',image:'https://loremflickr.com/800/600/amsterdam,city?lock=24'},
  {id:'c26',name:'Barcelona',country:'Spain','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Barcelona.',image:'https://loremflickr.com/800/600/barcelona,city?lock=25'},
  {id:'c27',name:'Madrid',country:'Spain','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Madrid.',image:'https://loremflickr.com/800/600/madrid,city?lock=26'},
  {id:'c28',name:'Lisbon',country:'Portugal','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Lisbon.',image:'https://loremflickr.com/800/600/lisbon,city?lock=27'},
  {id:'c29',name:'Berlin',country:'Germany','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Berlin.',image:'https://loremflickr.com/800/600/berlin,city?lock=28'},
  {id:'c30',name:'Vienna',country:'Austria','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Vienna.',image:'https://loremflickr.com/800/600/vienna,city?lock=29'},
  {id:'c31',name:'Prague',country:'Czech Republic','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Prague.',image:'https://loremflickr.com/800/600/prague,city?lock=30'},
  {id:'c32',name:'Budapest',country:'Hungary','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Budapest.',image:'https://loremflickr.com/800/600/budapest,city?lock=31'},
  {id:'c33',name:'Athens',country:'Greece','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Athens.',image:'https://loremflickr.com/800/600/athens,city?lock=32'},
  {id:'c34',name:'Santorini',country:'Greece','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Santorini.',image:'https://loremflickr.com/800/600/santorini,city?lock=33'},
  {id:'c35',name:'Zurich',country:'Switzerland','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Zurich.',image:'https://loremflickr.com/800/600/zurich,city?lock=34'},
  {id:'c36',name:'Interlaken',country:'Switzerland','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Interlaken.',image:'https://loremflickr.com/800/600/interlaken,city?lock=35'},
  {id:'c37',name:'Brussels',country:'Belgium','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Brussels.',image:'https://loremflickr.com/800/600/brussels,city?lock=36'},
  {id:'c38',name:'Copenhagen',country:'Denmark','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Copenhagen.',image:'https://loremflickr.com/800/600/copenhagen,city?lock=37'},
  {id:'c39',name:'Stockholm',country:'Sweden','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Stockholm.',image:'https://loremflickr.com/800/600/stockholm,city?lock=38'},
  {id:'c40',name:'Oslo',country:'Norway','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Oslo.',image:'https://loremflickr.com/800/600/oslo,city?lock=39'},
  {id:'c41',name:'Dublin',country:'Ireland','region':'Europe','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Dublin.',image:'https://loremflickr.com/800/600/dublin,city?lock=40'},
  {id:'c42',name:'Kyoto',country:'Japan','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Kyoto.',image:'https://loremflickr.com/800/600/kyoto,city?lock=41'},
  {id:'c43',name:'Osaka',country:'Japan','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Osaka.',image:'https://loremflickr.com/800/600/osaka,city?lock=42'},
  {id:'c44',name:'Seoul',country:'South Korea','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Seoul.',image:'https://loremflickr.com/800/600/seoul,city?lock=43'},
  {id:'c45',name:'Singapore',country:'Singapore','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Singapore.',image:'https://loremflickr.com/800/600/singapore,city?lock=44'},
  {id:'c46',name:'Bangkok',country:'Thailand','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Bangkok.',image:'https://loremflickr.com/800/600/bangkok,city?lock=45'},
  {id:'c47',name:'Phuket',country:'Thailand','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Phuket.',image:'https://loremflickr.com/800/600/phuket,city?lock=46'},
  {id:'c48',name:'Jakarta',country:'Indonesia','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Jakarta.',image:'https://loremflickr.com/800/600/jakarta,city?lock=47'},
  {id:'c49',name:'Kuala Lumpur',country:'Malaysia','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Kuala Lumpur.',image:'https://loremflickr.com/800/600/kualalumpur,city?lock=48'},
  {id:'c50',name:'Hong Kong',country:'China','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Hong Kong.',image:'https://loremflickr.com/800/600/hongkong,city?lock=49'},
  {id:'c51',name:'Beijing',country:'China','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Beijing.',image:'https://loremflickr.com/800/600/beijing,city?lock=50'},
  {id:'c52',name:'Shanghai',country:'China','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Shanghai.',image:'https://loremflickr.com/800/600/shanghai,city?lock=51'},
  {id:'c53',name:'Taipei',country:'Taiwan','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Taipei.',image:'https://loremflickr.com/800/600/taipei,city?lock=52'},
  {id:'c54',name:'Hanoi',country:'Vietnam','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Hanoi.',image:'https://loremflickr.com/800/600/hanoi,city?lock=53'},
  {id:'c55',name:'Ho Chi Minh City',country:'Vietnam','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Ho Chi Minh City.',image:'https://loremflickr.com/800/600/hochiminhcity,city?lock=54'},
  {id:'c56',name:'Manila',country:'Philippines','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Manila.',image:'https://loremflickr.com/800/600/manila,city?lock=55'},
  {id:'c57',name:'Maldives',country:'Maldives','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Maldives.',image:'https://loremflickr.com/800/600/maldives,city?lock=56'},
  {id:'c58',name:'Kathmandu',country:'Nepal','region':'Asia','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Kathmandu.',image:'https://loremflickr.com/800/600/kathmandu,city?lock=57'},
  {id:'c59',name:'Dubai',country:'UAE','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Dubai.',image:'https://loremflickr.com/800/600/dubai,city?lock=58'},
  {id:'c60',name:'Abu Dhabi',country:'UAE','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Abu Dhabi.',image:'https://loremflickr.com/800/600/abudhabi,city?lock=59'},
  {id:'c61',name:'Doha',country:'Qatar','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Doha.',image:'https://loremflickr.com/800/600/doha,city?lock=60'},
  {id:'c62',name:'Istanbul',country:'Turkey','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Istanbul.',image:'https://loremflickr.com/800/600/istanbul,city?lock=61'},
  {id:'c63',name:'Riyadh',country:'Saudi Arabia','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Riyadh.',image:'https://loremflickr.com/800/600/riyadh,city?lock=62'},
  {id:'c64',name:'Muscat',country:'Oman','region':'Middle East','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Muscat.',image:'https://loremflickr.com/800/600/muscat,city?lock=63'},
  {id:'c65',name:'Los Angeles',country:'USA','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Los Angeles.',image:'https://loremflickr.com/800/600/losangeles,city?lock=64'},
  {id:'c66',name:'San Francisco',country:'USA','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of San Francisco.',image:'https://loremflickr.com/800/600/sanfrancisco,city?lock=65'},
  {id:'c67',name:'Las Vegas',country:'USA','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Las Vegas.',image:'https://loremflickr.com/800/600/lasvegas,city?lock=66'},
  {id:'c68',name:'Miami',country:'USA','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Miami.',image:'https://loremflickr.com/800/600/miami,city?lock=67'},
  {id:'c69',name:'Chicago',country:'USA','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Chicago.',image:'https://loremflickr.com/800/600/chicago,city?lock=68'},
  {id:'c70',name:'Toronto',country:'Canada','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Toronto.',image:'https://loremflickr.com/800/600/toronto,city?lock=69'},
  {id:'c71',name:'Vancouver',country:'Canada','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Vancouver.',image:'https://loremflickr.com/800/600/vancouver,city?lock=70'},
  {id:'c72',name:'Mexico City',country:'Mexico','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Mexico City.',image:'https://loremflickr.com/800/600/mexicocity,city?lock=71'},
  {id:'c73',name:'Cancun',country:'Mexico','region':'North America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Cancun.',image:'https://loremflickr.com/800/600/cancun,city?lock=72'},
  {id:'c74',name:'Rio de Janeiro',country:'Brazil','region':'South America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Rio de Janeiro.',image:'https://loremflickr.com/800/600/riodejaneiro,city?lock=73'},
  {id:'c75',name:'Buenos Aires',country:'Argentina','region':'South America','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Buenos Aires.',image:'https://loremflickr.com/800/600/buenosaires,city?lock=74'},
  {id:'c76',name:'Sydney',country:'Australia','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Sydney.',image:'https://loremflickr.com/800/600/sydney,city?lock=75'},
  {id:'c77',name:'Melbourne',country:'Australia','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Melbourne.',image:'https://loremflickr.com/800/600/melbourne,city?lock=76'},
  {id:'c78',name:'Brisbane',country:'Australia','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Brisbane.',image:'https://loremflickr.com/800/600/brisbane,city?lock=77'},
  {id:'c79',name:'Gold Coast',country:'Australia','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Gold Coast.',image:'https://loremflickr.com/800/600/goldcoast,city?lock=78'},
  {id:'c80',name:'Auckland',country:'New Zealand','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Auckland.',image:'https://loremflickr.com/800/600/auckland,city?lock=79'},
  {id:'c81',name:'Queenstown',country:'New Zealand','region':'Oceania','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Queenstown.',image:'https://loremflickr.com/800/600/queenstown,city?lock=80'},
  {id:'c82',name:'Cairo',country:'Egypt','region':'Africa','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Cairo.',image:'https://loremflickr.com/800/600/cairo,city?lock=81'},
  {id:'c83',name:'Cape Town',country:'South Africa','region':'Africa','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Cape Town.',image:'https://loremflickr.com/800/600/capetown,city?lock=82'},
  {id:'c84',name:'Marrakech',country:'Morocco','region':'Africa','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Marrakech.',image:'https://loremflickr.com/800/600/marrakech,city?lock=83'},
  {id:'c85',name:'Nairobi',country:'Kenya','region':'Africa','costIndex':'Medium','popularity':4.5,description:'Experience the beauty of Nairobi.',image:'https://loremflickr.com/800/600/nairobi,city?lock=84'}
];

export const MOCK_ACTIVITIES: Activity[] = [
  {id:'a1',name:'Colosseum Tour',category:'Sightseeing',duration:120,cost:2500,rating:4.8,description:'Guided tour of the iconic Colosseum.',image:'https://loremflickr.com/800/600/colosseum,rome'},
  {id:'a2',name:'Roman Forum',category:'Sightseeing',duration:120,cost:1800,rating:4.6,description:'Explore the ruins of ancient Rome.',image:'https://loremflickr.com/800/600/roman,forum'},
  {id:'a3',name:'Trastevere Food Tour',category:'Food',duration:180,cost:4500,rating:4.9,description:'Taste the best local dishes in Trastevere.',image:'https://loremflickr.com/800/600/trastevere,food'},
  {id:'a4',name:'Uffizi Gallery',category:'Culture',duration:180,cost:2200,rating:4.8,description:'World-renowned renaissance art museum.',image:'https://loremflickr.com/800/600/uffizi,gallery'},
  {id:'a5',name:'Gondola Ride',category:'Relaxation',duration:45,cost:7000,rating:4.7,description:'Romantic ride through the canals of Venice.',image:'https://loremflickr.com/800/600/gondola,venice'},
  {id:'a6',name:'Eiffel Tower Visit',category:'Sightseeing',duration:120,cost:2500,rating:4.8,description:'Iconic views from the top of the Eiffel Tower.',image:'https://loremflickr.com/800/600/eiffel,tower'},
  {id:'a7',name:'Louvre Museum Tour',category:'Culture',duration:240,cost:3000,rating:4.9,description:'Explore the worlds largest art museum.',image:'https://loremflickr.com/800/600/louvre,museum'},
  {id:'a8',name:'Seine River Cruise',category:'Relaxation',duration:60,cost:1500,rating:4.7,description:'Scenic evening boat ride along the Seine.',image:'https://loremflickr.com/800/600/seine,river'},
  {id:'a9',name:'French Cooking Class',category:'Experiences',duration:180,cost:8000,rating:4.9,description:'Learn to cook classic French pastries.',image:'https://loremflickr.com/800/600/cooking,class'},
  {id:'a10',name:'Shibuya Crossing Visit',category:'Experiences',duration:60,cost:0,rating:4.8,description:'Walk across the busiest intersection in the world.',image:'https://loremflickr.com/800/600/shibuya,crossing'},
  {id:'a11',name:'Senso-ji Temple Tour',category:'Culture',duration:90,cost:500,rating:4.7,description:'Visit Tokyos oldest and most significant temple.',image:'https://loremflickr.com/800/600/sensoji,temple'},
  {id:'a12',name:'Sushi Making Class',category:'Food',duration:120,cost:6000,rating:4.9,description:'Learn the art of sushi from a master chef.',image:'https://loremflickr.com/800/600/sushi,making'},
  {id:'a13',name:'TeamLab Planets',category:'Sightseeing',duration:120,cost:3500,rating:4.8,description:'Immersive digital art exhibition.',image:'https://loremflickr.com/800/600/teamlab,art'},
  {id:'a14',name:'Ubud Rice Terrace Walk',category:'Nature',duration:120,cost:1000,rating:4.8,description:'Scenic trek through the Tegalalang rice terraces.',image:'https://loremflickr.com/800/600/ubud,rice,terrace'},
  {id:'a15',name:'Snorkeling in Nusa Penida',category:'Adventure',duration:360,cost:5000,rating:4.9,description:'Swim with manta rays in crystal clear waters.',image:'https://loremflickr.com/800/600/snorkeling,bali'},
  {id:'a16',name:'Balinese Cooking Class',category:'Food',duration:180,cost:3000,rating:4.7,description:'Discover the secrets of authentic Balinese cuisine.',image:'https://loremflickr.com/800/600/balinese,food'},
  {id:'a17',name:'Sunset Beach Club',category:'Nightlife',duration:240,cost:4000,rating:4.6,description:'Enjoy cocktails and music by the beach.',image:'https://loremflickr.com/800/600/beach,club'},
  {id:'a18',name:'Burj Khalifa At The Top',category:'Sightseeing',duration:90,cost:8000,rating:4.8,description:'Views from the tallest building in the world.',image:'https://loremflickr.com/800/600/burj,khalifa'},
  {id:'a19',name:'Desert Safari & Dinner',category:'Adventure',duration:360,cost:6000,rating:4.9,description:'Dune bashing, camel rides, and a BBQ dinner.',image:'https://loremflickr.com/800/600/desert,safari'},
  {id:'a20',name:'Dubai Mall Shopping',category:'Shopping',duration:240,cost:5000,rating:4.7,description:'Explore one of the worlds largest shopping malls.',image:'https://loremflickr.com/800/600/dubai,mall'},
  {id:'a21',name:'Statue of Liberty',category:'Sightseeing',duration:240,cost:3000,rating:4.8,description:'Ferry ride and tour of the historic monument.',image:'https://loremflickr.com/800/600/statue,of,liberty'},
  {id:'a22',name:'Central Park Walk',category:'Nature',duration:120,cost:0,rating:4.9,description:'A relaxing stroll through NYCs famous park.',image:'https://loremflickr.com/800/600/central,park'},
  {id:'a23',name:'Broadway Show',category:'Experiences',duration:180,cost:12000,rating:4.9,description:'Catch a world-class musical performance.',image:'https://loremflickr.com/800/600/broadway,show'},
  {id:'a24',name:'Tower of London',category:'Culture',duration:180,cost:3500,rating:4.8,description:'Discover the history and the Crown Jewels.',image:'https://loremflickr.com/800/600/tower,of,london'},
  {id:'a25',name:'London Eye',category:'Sightseeing',duration:60,cost:3000,rating:4.7,description:'Panoramic views of the London skyline.',image:'https://loremflickr.com/800/600/london,eye'},
  {id:'a26',name:'British Museum',category:'Culture',duration:240,cost:0,rating:4.9,description:'A comprehensive collection of world history and art.',image:'https://loremflickr.com/800/600/british,museum'},
  {id:'a27',name:'Scuba Diving',category:'Adventure',duration:240,cost:4000,rating:4.8,description:'Explore the vibrant underwater marine life.',image:'https://loremflickr.com/800/600/scuba,diving'},
  {id:'a28',name:'Old Goa Heritage Tour',category:'Culture',duration:120,cost:1000,rating:4.6,description:'Visit ancient churches and historical landmarks.',image:'https://loremflickr.com/800/600/old,goa'},
  {id:'a29',name:'Spice Plantation Tour',category:'Experiences',duration:150,cost:1500,rating:4.7,description:'Guided walk through aromatic spice farms.',image:'https://loremflickr.com/800/600/spice,plantation'},
  {id:'a30',name:'Table Mountain Cable Car',category:'Nature',duration:120,cost:2000,rating:4.9,description:'Breathtaking views of Cape Town from the summit.',image:'https://loremflickr.com/800/600/table,mountain'},
  {id:'a31',name:'Robben Island Tour',category:'Culture',duration:240,cost:2500,rating:4.8,description:'Historic tour of Nelson Mandelas former prison.',image:'https://loremflickr.com/800/600/robben,island'},
  {id:'a32',name:'Wine Tasting Experience',category:'Food',duration:180,cost:3500,rating:4.9,description:'Sample premium wines in the local vineyards.',image:'https://loremflickr.com/800/600/wine,tasting'},
  {id:'a33',name:'Sydney Opera House Tour',category:'Sightseeing',duration:60,cost:2500,rating:4.8,description:'Behind the scenes at the iconic performance venue.',image:'https://loremflickr.com/800/600/sydney,opera,house'},
  {id:'a34',name:'Bondi Beach Surfing Lesson',category:'Adventure',duration:120,cost:4000,rating:4.7,description:'Learn to surf on Australias most famous beach.',image:'https://loremflickr.com/800/600/surfing,bondi'},
  {id:'a35',name:'Blue Mountains Day Trip',category:'Nature',duration:480,cost:6000,rating:4.9,description:'Explore the stunning landscapes and Three Sisters.',image:'https://loremflickr.com/800/600/blue,mountains'},
  {id:'a36',name:'Hagia Sophia Tour',category:'Culture',duration:120,cost:1500,rating:4.9,description:'Visit the magnificent Byzantine architectural marvel.',image:'https://loremflickr.com/800/600/hagia,sophia'},
  {id:'a37',name:'Bosphorus Cruise',category:'Relaxation',duration:120,cost:2000,rating:4.8,description:'Scenic boat ride between Europe and Asia.',image:'https://loremflickr.com/800/600/bosphorus,cruise'},
  {id:'a38',name:'Grand Bazaar Shopping',category:'Shopping',duration:180,cost:3000,rating:4.7,description:'Navigate the vibrant alleys of the historic market.',image:'https://loremflickr.com/800/600/grand,bazaar'},
  {id:'a39',name:'Gateway of India Visit',category:'Sightseeing',duration:60,cost:0,rating:4.7,description:'Historic arch monument overlooking the Arabian Sea.',image:'https://loremflickr.com/800/600/gateway,india'},
  {id:'a40',name:'Elephanta Caves Tour',category:'Culture',duration:240,cost:1500,rating:4.6,description:'Ferry ride to ancient rock-cut cave temples.',image:'https://loremflickr.com/800/600/elephanta,caves'},
  {id:'a41',name:'Street Food Walking Tour',category:'Food',duration:180,cost:1200,rating:4.8,description:'Taste local delicacies like Vada Pav and Pav Bhaji.',image:'https://loremflickr.com/800/600/street,food'},
  {id:'a42',name:'Taj Mahal Sunrise Tour',category:'Sightseeing',duration:180,cost:1500,rating:5,description:'Experience the stunning monument of love at dawn.',image:'https://loremflickr.com/800/600/taj,mahal'},
  {id:'a43',name:'Agra Fort Visit',category:'Culture',duration:120,cost:600,rating:4.7,description:'Explore the historic 16th-century Mughal fortress.',image:'https://loremflickr.com/800/600/agra,fort'},
  {id:'a44',name:'Amber Fort Visit',category:'Experiences',duration:150,cost:2000,rating:4.6,description:'Explore the majestic hilltop fort of Jaipur.',image:'https://loremflickr.com/800/600/amber,fort'},
  {id:'a45',name:'City Palace Tour',category:'Culture',duration:120,cost:800,rating:4.8,description:'Discover the royal residence in the heart of the city.',image:'https://loremflickr.com/800/600/city,palace'},
  {id:'a46',name:'Vatican Museums Tour',category:'Culture',duration:240,cost:3500,rating:4.9,description:'Home to immense collections of art and the Sistine Chapel.',image:'https://loremflickr.com/800/600/vatican,museums'},
  {id:'a47',name:'Pasta Making Class',category:'Food',duration:180,cost:5000,rating:4.8,description:'Master traditional Italian pasta techniques.',image:'https://loremflickr.com/800/600/pasta,making'}
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't1',
    name: 'European Summer Escape',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
    startDate: '2026-06-12T00:00:00Z',
    endDate: '2026-06-20T00:00:00Z',
    status: 'Upcoming',
    budget: 50000,
    travelStyle: 'Balanced',
    expenses: [
      { id: 'e1', category: 'Transport', amount: 12000, date: '2026-06-12T00:00:00Z' },
      { id: 'e2', category: 'Accommodation', amount: 18000, date: '2026-06-12T00:00:00Z' },
      { id: 'e3', category: 'Activities', amount: 9500, date: '2026-06-12T00:00:00Z' },
      { id: 'e4', category: 'Meals', amount: 7000, date: '2026-06-12T00:00:00Z' }
    ],
    stops: [
      {
        id: 's1',
        city: MOCK_CITIES[0], // Rome
        startDate: '2026-06-12T00:00:00Z',
        endDate: '2026-06-14T00:00:00Z',
        activities: [
          { ...MOCK_ACTIVITIES[0], tripActivityId: 'ta1', startTime: '09:00', date: '2026-06-12' },
          { ...MOCK_ACTIVITIES[2], tripActivityId: 'ta2', startTime: '12:30', date: '2026-06-13' },
          { ...MOCK_ACTIVITIES[1], tripActivityId: 'ta3', startTime: '15:00', date: '2026-06-14' },
        ]
      },
      {
        id: 's2',
        city: MOCK_CITIES[1], // Florence
        startDate: '2026-06-14T00:00:00Z',
        endDate: '2026-06-16T00:00:00Z',
        activities: [
          { ...MOCK_ACTIVITIES[3], tripActivityId: 'ta4', startTime: '10:00', date: '2026-06-14' },
        ]
      },
      {
        id: 's3',
        city: MOCK_CITIES[2], // Venice
        startDate: '2026-06-16T00:00:00Z',
        endDate: '2026-06-20T00:00:00Z',
        activities: [
          { ...MOCK_ACTIVITIES[4], tripActivityId: 'ta5', startTime: '17:00', date: '2026-06-16' },
        ]
      }
    ]
  },
  {
    id: 't2',
    name: 'Bali Retreat',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    startDate: '2025-10-05T00:00:00Z',
    endDate: '2025-10-15T00:00:00Z',
    status: 'Past',
    budget: 30000,
    travelStyle: 'Relaxation',
    expenses: [],
    stops: [
      {
        id: 's4',
        city: MOCK_CITIES[5], // Bali
        startDate: '2025-10-05T00:00:00Z',
        endDate: '2025-10-15T00:00:00Z',
        activities: []
      }
    ]
  }
];
