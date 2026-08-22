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
  category: 'Sightseeing' | 'Food' | 'Culture' | 'Adventure' | 'Shopping' | 'Nature' | 'Nightlife' | 'Relaxation';
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
  { id: 'c1', name: 'Rome', country: 'Italy', region: 'Europe', costIndex: 'Medium', popularity: 4.8, description: 'Historic ruins, art, and vibrant street life.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
  { id: 'c2', name: 'Florence', country: 'Italy', region: 'Europe', costIndex: 'Medium', popularity: 4.7, description: 'The cradle of the Renaissance.', image: 'https://images.pexels.com/photos/1761921/pexels-photo-1761921.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'c3', name: 'Venice', country: 'Italy', region: 'Europe', costIndex: 'High', popularity: 4.9, description: 'Canals, gondolas, and romance.', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', name: 'Paris', country: 'France', region: 'Europe', costIndex: 'High', popularity: 5.0, description: 'City of light, love, and the Eiffel Tower.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800' },
  { id: 'c5', name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: 'High', popularity: 4.9, description: 'Neon lights and ancient temples.', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800' },
  { id: 'c6', name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: 'Low', popularity: 4.8, description: 'Tropical beaches and spiritual retreats.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
  { id: 'c7', name: 'New York', country: 'USA', region: 'North America', costIndex: 'High', popularity: 4.9, description: 'The city that never sleeps.', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800' },
  { id: 'c8', name: 'Mumbai', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Mumbai.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c9', name: 'Delhi', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Delhi.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c10', name: 'Goa', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Goa.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c11', name: 'Jaipur', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Jaipur.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c12', name: 'Udaipur', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Udaipur.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c13', name: 'Agra', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Agra.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c14', name: 'Bengaluru', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Bengaluru.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c15', name: 'Hyderabad', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Hyderabad.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c16', name: 'Chennai', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Chennai.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c17', name: 'Kolkata', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Kolkata.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c18', name: 'Pune', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Pune.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c19', name: 'Manali', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Manali.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c20', name: 'Shimla', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Shimla.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c21', name: 'Rishikesh', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Rishikesh.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c22', name: 'Varanasi', country: 'India', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Varanasi.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c23', name: 'Milan', country: 'Italy', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Milan.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c24', name: 'London', country: 'UK', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of London.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c25', name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Amsterdam.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c26', name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Barcelona.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c27', name: 'Madrid', country: 'Spain', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Madrid.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c28', name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Lisbon.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c29', name: 'Berlin', country: 'Germany', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Berlin.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c30', name: 'Vienna', country: 'Austria', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Vienna.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c31', name: 'Prague', country: 'Czech Republic', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Prague.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c32', name: 'Budapest', country: 'Hungary', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Budapest.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c33', name: 'Athens', country: 'Greece', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Athens.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c34', name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Santorini.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c35', name: 'Zurich', country: 'Switzerland', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Zurich.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c36', name: 'Interlaken', country: 'Switzerland', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Interlaken.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c37', name: 'Brussels', country: 'Belgium', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Brussels.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c38', name: 'Copenhagen', country: 'Denmark', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Copenhagen.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c39', name: 'Stockholm', country: 'Sweden', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Stockholm.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c40', name: 'Oslo', country: 'Norway', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Oslo.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c41', name: 'Dublin', country: 'Ireland', region: 'Europe', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Dublin.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c42', name: 'Kyoto', country: 'Japan', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Kyoto.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c43', name: 'Osaka', country: 'Japan', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Osaka.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c44', name: 'Seoul', country: 'South Korea', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Seoul.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c45', name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Singapore.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c46', name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Bangkok.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c47', name: 'Phuket', country: 'Thailand', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Phuket.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c48', name: 'Jakarta', country: 'Indonesia', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Jakarta.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c49', name: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Kuala Lumpur.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c50', name: 'Hong Kong', country: 'China', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Hong Kong.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c51', name: 'Beijing', country: 'China', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Beijing.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c52', name: 'Shanghai', country: 'China', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Shanghai.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c53', name: 'Taipei', country: 'Taiwan', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Taipei.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c54', name: 'Hanoi', country: 'Vietnam', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Hanoi.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c55', name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Ho Chi Minh City.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c56', name: 'Manila', country: 'Philippines', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Manila.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c57', name: 'Maldives', country: 'Maldives', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Maldives.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c58', name: 'Kathmandu', country: 'Nepal', region: 'Asia', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Kathmandu.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c59', name: 'Dubai', country: 'UAE', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Dubai.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c60', name: 'Abu Dhabi', country: 'UAE', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Abu Dhabi.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c61', name: 'Doha', country: 'Qatar', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Doha.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c62', name: 'Istanbul', country: 'Turkey', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Istanbul.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c63', name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Riyadh.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c64', name: 'Muscat', country: 'Oman', region: 'Middle East', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Muscat.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c65', name: 'Los Angeles', country: 'USA', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Los Angeles.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c66', name: 'San Francisco', country: 'USA', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of San Francisco.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c67', name: 'Las Vegas', country: 'USA', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Las Vegas.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c68', name: 'Miami', country: 'USA', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Miami.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c69', name: 'Chicago', country: 'USA', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Chicago.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c70', name: 'Toronto', country: 'Canada', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Toronto.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c71', name: 'Vancouver', country: 'Canada', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Vancouver.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c72', name: 'Mexico City', country: 'Mexico', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Mexico City.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c73', name: 'Cancun', country: 'Mexico', region: 'North America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Cancun.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c74', name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Rio de Janeiro.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c75', name: 'Buenos Aires', country: 'Argentina', region: 'South America', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Buenos Aires.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c76', name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Sydney.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c77', name: 'Melbourne', country: 'Australia', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Melbourne.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c78', name: 'Brisbane', country: 'Australia', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Brisbane.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c79', name: 'Gold Coast', country: 'Australia', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Gold Coast.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c80', name: 'Auckland', country: 'New Zealand', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Auckland.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c81', name: 'Queenstown', country: 'New Zealand', region: 'Oceania', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Queenstown.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c82', name: 'Cairo', country: 'Egypt', region: 'Africa', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Cairo.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c83', name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Cape Town.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c84', name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Marrakech.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
  { id: 'c85', name: 'Nairobi', country: 'Kenya', region: 'Africa', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of Nairobi.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', name: 'Colosseum Tour', category: 'Sightseeing', duration: 120, cost: 2500, rating: 4.8, description: 'Guided tour of the iconic Colosseum.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
  { id: 'a2', name: 'Roman Forum', category: 'Sightseeing', duration: 120, cost: 1800, rating: 4.6, description: 'Explore the ruins of ancient Rome.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
  { id: 'a3', name: 'Trastevere Food Tour', category: 'Food', duration: 180, cost: 4500, rating: 4.9, description: 'Taste the best local dishes in Trastevere.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'a4', name: 'Uffizi Gallery', category: 'Culture', duration: 180, cost: 2200, rating: 4.8, description: 'World-renowned renaissance art museum.', image: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&q=80&w=800' },
  { id: 'a5', name: 'Gondola Ride', category: 'Relaxation', duration: 45, cost: 7000, rating: 4.7, description: 'Romantic ride through the canals of Venice.', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800' },
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
