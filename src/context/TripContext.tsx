import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Trip, TripStop, TripActivity, Expense, MOCK_CITIES, User, City } from '../data/mock';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface TripContextType {
  trips: Trip[];
  user: User;
  loading: boolean;
  addTrip: (trip: Trip) => Promise<string | null>;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  refreshTrips: () => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

// Helper: find a matching MOCK_CITIES entry for display enrichment, or build a minimal City object
function buildCity(cityName: string, cityCountry: string, cityImage: string): City {
  const match = MOCK_CITIES.find(
    c => c.name.toLowerCase() === cityName.toLowerCase() && c.country.toLowerCase() === cityCountry.toLowerCase()
  );
  if (match) {
    return { ...match, image: cityImage || match.image };
  }
  return {
    id: `city-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
    name: cityName,
    country: cityCountry,
    region: '',
    image: cityImage,
    costIndex: 'Medium',
    popularity: 0,
    description: '',
  };
}

// Dynamically compute trip status from actual dates
function computeTripStatus(startDate: string, endDate: string): Trip['status'] {
  const now = new Date();
  // Strip time component for date-only comparison
  now.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  if (end < now) return 'Past';
  return 'Upcoming';
}

// Transform Supabase rows into the existing Trip interface
function transformTrip(
  tripRow: any,
  stopRows: any[],
  activityRows: any[],
  expenseRows: any[]
): Trip {
  const stops: TripStop[] = stopRows
    .sort((a, b) => a.order_index - b.order_index)
    .map(stop => {
      const stopActivities: TripActivity[] = activityRows
        .filter(a => a.trip_stop_id === stop.id)
        .map(a => ({
          id: a.id,
          tripActivityId: a.id,
          name: a.name,
          description: a.description || '',
          category: a.category as TripActivity['category'],
          duration: a.duration,
          cost: Number(a.cost),
          rating: Number(a.rating) || 0,
          image: a.image || '',
          startTime: a.start_time,
          date: a.date, // YYYY-MM-DD
        }));

      return {
        id: stop.id,
        city: buildCity(stop.city_name, stop.city_country, stop.city_image),
        startDate: stop.arrival_date,
        endDate: stop.departure_date,
        activities: stopActivities,
      };
    });

  const expenses: Expense[] = expenseRows.map(e => ({
    id: e.id,
    category: e.category as Expense['category'],
    amount: Number(e.amount),
    date: e.date,
  }));

  return {
    id: tripRow.id,
    name: tripRow.name,
    coverImage: tripRow.cover_image || '',
    startDate: tripRow.start_date,
    endDate: tripRow.end_date,
    status: computeTripStatus(tripRow.start_date, tripRow.end_date),
    budget: Number(tripRow.budget),
    currency: tripRow.currency || 'INR',
    travelStyle: tripRow.travel_style || 'Balanced',
    stops,
    expenses,
  };
}

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // Derive the app-level User from the Supabase auth user
  const user: User = authUser
    ? {
        id: authUser.id,
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Traveler',
        email: authUser.email || '',
        avatar: `https://i.pravatar.cc/150?u=${authUser.id}`,
      }
    : { id: '', name: 'Guest', email: '', avatar: '' };

  const fetchTrips = useCallback(async () => {
    if (!authUser) {
      setTrips([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch only this user's trips
      const { data: tripRows, error: tripsError } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

      if (tripsError) {
        console.error('Error fetching trips:', tripsError);
        setLoading(false);
        return;
      }

      if (!tripRows || tripRows.length === 0) {
        setTrips([]);
        setLoading(false);
        return;
      }

      const tripIds = tripRows.map(t => t.id);

      // Fetch all stops for these trips
      const { data: stopRows } = await supabase
        .from('trip_stops')
        .select('*')
        .in('trip_id', tripIds)
        .order('order_index');

      // Fetch all activities for these stops
      const stopIds = (stopRows || []).map(s => s.id);
      let activityRows: any[] = [];
      if (stopIds.length > 0) {
        const { data } = await supabase
          .from('activities')
          .select('*')
          .in('trip_stop_id', stopIds)
          .order('date')
          .order('start_time');
        activityRows = data || [];
      }

      // Fetch all expenses for these trips
      const { data: expenseRows } = await supabase
        .from('expenses')
        .select('*')
        .in('trip_id', tripIds);

      // Transform into Trip objects
      const transformed = tripRows.map(tripRow => {
        const tStops = (stopRows || []).filter(s => s.trip_id === tripRow.id);
        const tStopIds = tStops.map(s => s.id);
        const tActivities = activityRows.filter(a => tStopIds.includes(a.trip_stop_id));
        const tExpenses = (expenseRows || []).filter(e => e.trip_id === tripRow.id);
        return transformTrip(tripRow, tStops, tActivities, tExpenses);
      });

      setTrips(transformed);
    } catch (err) {
      console.error('Error loading trips:', err);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const addTrip = async (trip: Trip): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert({
          name: trip.name,
          cover_image: trip.coverImage,
          start_date: trip.startDate,
          end_date: trip.endDate,
          status: trip.status,
          budget: trip.budget,
          currency: trip.currency || 'INR',
          travel_style: trip.travelStyle,
          user_id: authUser?.id,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error adding trip:', error);
        return null;
      }

      const newId = data.id;
      // Optimistic update
      setTrips(prev => [{ ...trip, id: newId }, ...prev]);
      return newId;
    } catch (err) {
      console.error('Error adding trip:', err);
      return null;
    }
  };

  const updateTrip = async (updatedTrip: Trip) => {
    // Optimistic UI update immediately
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));

    try {
      // 1. Update trip metadata
      await supabase
        .from('trips')
        .update({
          name: updatedTrip.name,
          cover_image: updatedTrip.coverImage,
          start_date: updatedTrip.startDate,
          end_date: updatedTrip.endDate,
          status: updatedTrip.status,
          budget: updatedTrip.budget,
          currency: updatedTrip.currency || 'INR',
          travel_style: updatedTrip.travelStyle,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedTrip.id);

      // 2. Sync stops: delete existing (CASCADE deletes activities too), re-insert
      await supabase.from('trip_stops').delete().eq('trip_id', updatedTrip.id);

      if (updatedTrip.stops.length > 0) {
        // Do NOT pass id — let Supabase auto-generate valid UUIDs
        const stopInserts = updatedTrip.stops.map((stop, index) => ({
          trip_id: updatedTrip.id,
          city_name: stop.city.name,
          city_country: stop.city.country,
          city_image: stop.city.image,
          arrival_date: stop.startDate,
          departure_date: stop.endDate,
          order_index: index,
        }));

        const { data: insertedStops, error: stopsError } = await supabase
          .from('trip_stops')
          .insert(stopInserts)
          .select('id, order_index');

        if (stopsError) {
          console.error('Error syncing stops:', stopsError);
        }

        // 3. Insert activities — map to the real Supabase stop IDs by order_index
        if (insertedStops && insertedStops.length > 0) {
          const allActivities = updatedTrip.stops.flatMap((stop, stopIndex) => {
            const realStop = insertedStops.find(s => s.order_index === stopIndex);
            if (!realStop) return [];
            return stop.activities.map(act => ({
              // Do NOT pass id — let Supabase auto-generate
              trip_stop_id: realStop.id,
              name: act.name,
              description: act.description || '',
              category: act.category,
              duration: act.duration,
              cost: act.cost,
              rating: act.rating || 0,
              image: act.image || '',
              date: act.date || stop.startDate.split('T')[0],
              start_time: act.startTime,
            }));
          });

          if (allActivities.length > 0) {
            const { error: actError } = await supabase.from('activities').insert(allActivities);
            if (actError) {
              console.error('Error syncing activities:', actError);
            }
          }
        }
      }

      // 4. Sync expenses: delete existing, re-insert
      await supabase.from('expenses').delete().eq('trip_id', updatedTrip.id);

      if (updatedTrip.expenses.length > 0) {
        // Do NOT pass id — let Supabase auto-generate
        const expenseInserts = updatedTrip.expenses.map(exp => ({
          trip_id: updatedTrip.id,
          category: exp.category,
          amount: exp.amount,
          date: exp.date,
        }));

        const { error: expError } = await supabase.from('expenses').insert(expenseInserts);
        if (expError) {
          console.error('Error syncing expenses:', expError);
        }
      }

      // 5. Refetch to sync real Supabase UUIDs back into state
      await fetchTrips();
    } catch (err) {
      console.error('Error updating trip:', err);
    }
  };

  const deleteTrip = async (id: string) => {
    // Optimistic
    setTrips(prev => prev.filter(t => t.id !== id));

    try {
      const { error } = await supabase.from('trips').delete().eq('id', id);
      if (error) console.error('Error deleting trip:', error);
    } catch (err) {
      console.error('Error deleting trip:', err);
    }
  };

  return (
    <TripContext.Provider value={{ trips, user, loading, addTrip, updateTrip, deleteTrip, refreshTrips: fetchTrips }}>
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
