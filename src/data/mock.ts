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
  { id: 'c2', name: 'Florence', country: 'Italy', region: 'Europe', costIndex: 'Medium', popularity: 4.7, description: 'The cradle of the Renaissance.', image: 'https://images.unsplash.com/photo-1543429776-27826ac1223e?auto=format&fit=crop&q=80&w=800' },
  { id: 'c3', name: 'Venice', country: 'Italy', region: 'Europe', costIndex: 'High', popularity: 4.9, description: 'Canals, gondolas, and romance.', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', name: 'Paris', country: 'France', region: 'Europe', costIndex: 'High', popularity: 5.0, description: 'City of light, love, and the Eiffel Tower.', image: 'https://images.unsplash.com/photo-1502602881469-4478f7004fdb?auto=format&fit=crop&q=80&w=800' },
  { id: 'c5', name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: 'High', popularity: 4.9, description: 'Neon lights and ancient temples.', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800' },
  { id: 'c6', name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: 'Low', popularity: 4.8, description: 'Tropical beaches and spiritual retreats.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800' },
  { id: 'c7', name: 'New York', country: 'USA', region: 'North America', costIndex: 'High', popularity: 4.9, description: 'The city that never sleeps.', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a1', name: 'Colosseum Tour', category: 'Sightseeing', duration: 120, cost: 2500, rating: 4.8, description: 'Guided tour of the iconic Colosseum.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
  { id: 'a2', name: 'Roman Forum', category: 'Sightseeing', duration: 120, cost: 1800, rating: 4.6, description: 'Explore the ruins of ancient Rome.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800' },
  { id: 'a3', name: 'Trastevere Food Tour', category: 'Food', duration: 180, cost: 4500, rating: 4.9, description: 'Taste the best local dishes in Trastevere.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800' },
  { id: 'a4', name: 'Uffizi Gallery', category: 'Culture', duration: 180, cost: 2200, rating: 4.8, description: 'World-renowned renaissance art museum.', image: 'https://images.unsplash.com/photo-1543429776-27826ac1223e?auto=format&fit=crop&q=80&w=800' },
  { id: 'a5', name: 'Gondola Ride', category: 'Relaxation', duration: 45, cost: 7000, rating: 4.7, description: 'Romantic ride through the canals of Venice.', image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800' },
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 't1',
    name: 'European Summer Escape',
    coverImage: 'https://images.unsplash.com/photo-1516483638261-f40af5a528aa?auto=format&fit=crop&q=80&w=800',
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
