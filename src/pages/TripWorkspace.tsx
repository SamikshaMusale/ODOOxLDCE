import { useParams, useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Share2, Edit3, ArrowLeft, Calendar, MapPin, Wallet } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { OverviewTab } from '../components/workspace/OverviewTab';
import { ItineraryTab } from '../components/workspace/ItineraryTab';
import { CalendarTab } from '../components/workspace/CalendarTab';
import { BudgetTab } from '../components/workspace/BudgetTab';
import { ImageWithFallback } from '../components/shared/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export function TripWorkspace() {
  const { id } = useParams<{ id: string }>();
  const { trips, updateTrip } = useTripContext();
  const navigate = useNavigate();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const trip = trips.find(t => t.id === id);

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Trip not found</h2>
        <Button onClick={() => navigate('/trips')}>Back to Trips</Button>
      </div>
    );
  }

  let duration = 0;
  let startDate = new Date();
  let endDate = new Date();

  try {
    startDate = new Date(trip.startDate);
    endDate = new Date(trip.endDate);
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      duration = differenceInDays(endDate, startDate) + 1;
    }
  } catch (e) {
    // ignore
  }

  const numCities = trip.stops?.length || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">

      {/* Header / Hero */}
      <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 shadow-sm">
        <ImageWithFallback
          src={trip.coverImage}
          alt={trip.name}
          className="absolute inset-0 w-full h-full object-cover"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-4 left-4">
          <Button variant="secondary" size="icon" className="rounded-full bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md" onClick={() => navigate('/trips')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" className="rounded-full bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share this trip</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2 mt-4">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={`https://globetrotter.app/trips/${trip.id}/share`}
                    readOnly
                  />
                </div>
                <Button size="sm" className="px-3" onClick={() => {
                  navigator.clipboard.writeText(`https://globetrotter.app/trips/${trip.id}/share`);
                }}>
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/trips/${trip.id}/share`)}>
                  View public page
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">{trip.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base font-medium">
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Calendar className="h-4 w-4" />
              {!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) ? (
                <>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')} ({duration} days)</>
              ) : (
                <>Invalid Dates</>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4" />
              {numCities} Cities
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Wallet className="h-4 w-4" />
              Budget: ₹{trip.budget?.toLocaleString() || 0}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px] mb-8 bg-white shadow-sm border border-border/50 h-12 rounded-full p-1">
          <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="itinerary" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Itinerary</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Calendar</TabsTrigger>
          <TabsTrigger value="budget" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 outline-none">
          <OverviewTab trip={trip} />
        </TabsContent>
        <TabsContent value="itinerary" className="mt-0 outline-none">
          <ItineraryTab trip={trip} updateTrip={updateTrip} />
        </TabsContent>
        <TabsContent value="calendar" className="mt-0 outline-none">
          <CalendarTab trip={trip} />
        </TabsContent>
        <TabsContent value="budget" className="mt-0 outline-none">
          <BudgetTab trip={trip} />
        </TabsContent>
      </Tabs>

    </div>
  );
}
