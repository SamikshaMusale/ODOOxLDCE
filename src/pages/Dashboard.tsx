import { Plus, Compass, Map, Lightbulb } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTripContext } from '../context/TripContext';
import { TripCard } from '../components/shared/TripCard';
import { DestinationCard } from '../components/shared/DestinationCard';
import { MOCK_CITIES } from '../data/mock';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, trips } = useTripContext();
  const navigate = useNavigate();

  const upcomingTrips = trips.filter(t => t.status === 'Upcoming');
  const pastTrips = trips.filter(t => t.status === 'Past');

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-primary">
            <path d="M0₹00 C30,40 70,20 100,0 L100₹00 Z" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Good morning, {user.name.split(' ')[0]} ✈️
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Where will your next adventure take you? Discover new destinations or continue planning your upcoming trips.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full font-medium" onClick={() => navigate('/trips/new')}>
              <Plus className="mr-2 h-5 w-5" />
              Plan a New Trip
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-medium bg-white" onClick={() => navigate('/explore')}>
              <Compass className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Trips */}
      {upcomingTrips.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upcoming Trips</h2>
            <Button variant="link" onClick={() => navigate('/trips')}>View all</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions & Insight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 md:col-span-2 flex flex-col justify-center">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-full text-primary shrink-0">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Travel Insight</h3>
              <p className="text-muted-foreground">
                Booking flights on Tuesdays generally saves you up to 15%. Consider tracking flights for your upcoming trip to Rome to stay within your ₹50,000 budget!
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/trips')}>
            <Map className="mr-3 h-5 w-5 text-muted-foreground" />
            My Trips
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/explore')}>
            <Compass className="mr-3 h-5 w-5 text-muted-foreground" />
            City Discovery
          </Button>
        </div>
      </section>

      {/* Recommended Destinations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Destinations</h2>
          <Button variant="link" onClick={() => navigate('/explore')}>Explore all</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CITIES.slice(0, 4).map(city => (
            <DestinationCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      {/* Past Trips (if any) */}
      {pastTrips.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Memories from Past Trips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
