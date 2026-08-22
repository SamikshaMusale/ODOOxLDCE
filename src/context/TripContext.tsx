import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, MOCK_TRIPS, MOCK_USER, User } from '../data/mock';

interface TripContextType {
  trips: Trip[];
  user: User;
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);
  const [user, setUser] = useState<User>(MOCK_USER);

  const addTrip = (trip: Trip) => setTrips([...trips, trip]);
  const updateTrip = (updatedTrip: Trip) => setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  const deleteTrip = (id: string) => setTrips(trips.filter(t => t.id !== id));

  return (
    <TripContext.Provider value={{ trips, user, addTrip, updateTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
