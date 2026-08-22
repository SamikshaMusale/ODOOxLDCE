import { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { TripCard } from '../components/shared/TripCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Plus, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Trips() {
  const { trips } = useTripContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trip.stops.some(stop => stop.city.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const upcomingTrips = filteredTrips
    .filter(t => t.status === 'Upcoming')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const pastTrips = filteredTrips
    .filter(t => t.status === 'Past')
    .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
  const draftTrips = filteredTrips.filter(t => t.status === 'Draft');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
          <p className="text-muted-foreground mt-1">Manage and view all your travel itineraries</p>
        </div>
        <Button onClick={() => navigate('/trips/new')} className="sm:w-auto w-full rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Plan New Trip
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-border/50">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search trips or destinations..." 
            className="pl-9 bg-muted/50 border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px] mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <TripGrid trips={filteredTrips} />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-0">
          <TripGrid trips={upcomingTrips} />
        </TabsContent>
        <TabsContent value="past" className="mt-0">
          <TripGrid trips={pastTrips} />
        </TabsContent>
        <TabsContent value="drafts" className="mt-0">
          <TripGrid trips={draftTrips} />
        </TabsContent>
      </Tabs>

    </div>
  );
}

function TripGrid({ trips }: { trips: any[] }) {
  const navigate = useNavigate();

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-dashed border-border">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">No trips found</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          You don't have any trips in this category yet. Start planning your next adventure!
        </p>
        <Button onClick={() => navigate('/trips/new')}>Create a Trip</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
