import { useParams, Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { useTripContext } from '../context/TripContext';
import { Button } from '../components/ui/button';
import { MapPin, Calendar, PlaneTakeoff, Copy, Share2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/shared/ImageWithFallback';

export function SharedTrip() {
  const { id } = useParams<{ id: string }>();
  const { trips } = useTripContext();
  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Shared Trip Not Found</h2>
        <Link to="/"><Button>Go to Homepage</Button></Link>
      </div>
    );
  }

  const duration = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  const numCities = trip.stops.length;

  return (
    <div className="min-h-screen bg-muted/20">
      
      {/* Top Navbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <PlaneTakeoff className="h-6 w-6" />
          <span>GlobeTrotter</span>
        </Link>
        <div className="flex gap-2 text-sm font-medium text-muted-foreground items-center">
          <span>Read-only view</span>
          <Button size="sm" className="ml-4 rounded-full">
            <Copy className="mr-2 h-4 w-4" />
            Copy Trip
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-lg">
          <ImageWithFallback 
            src={trip.coverImage} 
            alt={trip.name}
            className="absolute inset-0 w-full h-full object-cover"
            containerClassName="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" className="rounded-full bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md">
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{trip.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                <Calendar className="h-5 w-5" />
                {format(new Date(trip.startDate), 'MMMM d')} - {format(new Date(trip.endDate), 'MMMM d, yyyy')} ({duration} days)
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                {numCities} Cities
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border/50">
          <h2 className="text-2xl font-bold mb-8 text-center">The Itinerary</h2>
          
          <div className="space-y-12 relative">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-primary/20 hidden md:block" />
            
            {trip.stops.map((stop, index) => (
              <div key={stop.id} className="relative z-10">
                <div className="flex items-center gap-4 mb-6 md:bg-white p-2 rounded-2xl md:inline-flex md:pr-6 md:border shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{stop.city.name}</h3>
                    <p className="text-muted-foreground">{format(new Date(stop.startDate), 'MMM d')} - {format(new Date(stop.endDate), 'MMM d')}</p>
                  </div>
                </div>

                <div className="md:pl-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stop.activities.map(activity => (
                    <Card key={activity.tripActivityId} className="border-none bg-muted/30 shadow-sm overflow-hidden">
                      <div className="h-32 w-full">
                        <ImageWithFallback src={activity.image} alt={activity.name} />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold mb-1">{activity.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{activity.category}</p>
                        <Badge variant="outline" className="bg-white">{activity.duration / 60}h duration</Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {stop.activities.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">Free time to explore!</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Inspired by this trip?</h2>
          <p className="text-lg text-muted-foreground mb-6">Create your own version or build something entirely new.</p>
          <Link to="/signup">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg">
              Start Planning for Free
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
