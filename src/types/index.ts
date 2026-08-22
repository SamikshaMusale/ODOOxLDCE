export type TravelStyle = 'Relaxation' | 'Adventure' | 'Cultural' | 'Food & Drink' | 'Nightlife' | 'Shopping' | 'Nature' | 'Mixed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
  imageUrl: string;
  costIndex: number; // 1 to 5 (e.g., 5 = very expensive)
  popularity: number; // 1 to 5
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  cityId: string;
  category: string;
  duration: number; // in minutes
  cost: number;
  rating: number;
  imageUrl: string;
  description: string;
}

export interface TripActivity {
  id: string;
  activityId: string;
  startTime: string; // ISO 8601 or HH:mm
  date: string; // YYYY-MM-DD
  notes?: string;
  // Denormalized for easier rendering
  activity?: Activity;
}

export interface TripStop {
  id: string;
  cityId: string;
  arrivalDate: string; // YYYY-MM-DD
  departureDate: string; // YYYY-MM-DD
  order: number;
  activities: TripActivity[];
  // Denormalized
  city?: City;
}

export interface Trip {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  description?: string;
  initialBudget: number;
  travelStyle: TravelStyle;
  coverImage: string;
  status: 'Draft' | 'Upcoming' | 'Past';
  stops: TripStop[];
}

export interface Expense {
  id: string;
  tripId: string;
  amount: number;
  category: 'Transport' | 'Accommodation' | 'Activities' | 'Meals' | 'Other';
  description: string;
  date: string; // YYYY-MM-DD
}
