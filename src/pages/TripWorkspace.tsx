import { useParams, useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Share2, Edit3, ArrowLeft, Calendar, MapPin, Wallet, Map, Calendar as CalendarIcon, Wallet as WalletIcon, Save, Copy } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { OverviewTab } from '../components/workspace/OverviewTab';
import { ItineraryTab } from '../components/workspace/ItineraryTab';
import { CalendarTab } from '../components/workspace/CalendarTab';
import { BudgetTab } from '../components/workspace/BudgetTab';
import { ImageWithFallback } from '../components/shared/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useState } from 'react';
import { Trip } from '../data/mock';
import { formatMoney, CURRENCIES } from '../lib/currency';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

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
          <EditTripDialog trip={trip} updateTrip={updateTrip} />

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
              Budget: {formatMoney(trip.budget, trip.currency)}
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

// ---------- Edit Trip Dialog ----------

function EditTripDialog({ trip, updateTrip }: { trip: Trip; updateTrip: (trip: Trip) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'INR',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleOpen = (open: boolean) => {
    if (open) {
      // Pre-fill with current trip data
      setFormData({
        name: trip.name,
        startDate: trip.startDate.split('T')[0],
        endDate: trip.endDate.split('T')[0],
        budget: String(trip.budget),
        currency: trip.currency || 'INR',
      });
    }
    setIsOpen(open);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.startDate || !formData.endDate) return;
    setIsSaving(true);

    const updatedTrip: Trip = {
      ...trip, // preserve stops, expenses, and all other fields
      name: formData.name,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      budget: parseInt(formData.budget) || 0,
      currency: formData.currency,
    };

    updateTrip(updatedTrip);
    setIsSaving(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-full bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md">
          <Edit3 className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Trip</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-base font-semibold">Trip Name</Label>
            <div className="relative">
              <Map className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="edit-name"
                className="pl-10 h-11"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-start" className="text-base font-semibold">Start Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="edit-start"
                  type="date"
                  className="pl-10 h-11"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-end" className="text-base font-semibold">End Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="edit-end"
                  type="date"
                  className="pl-10 h-11"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-budget" className="text-base font-semibold">Budget</Label>
            <div className="flex gap-2">
              <Select value={formData.currency} onValueChange={(val) => setFormData({...formData, currency: val})}>
                <SelectTrigger className="w-[120px] h-11 text-base font-medium">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CURRENCIES).map(([code, symbol]) => (
                    <SelectItem key={code} value={code}>
                      {code} ({symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <WalletIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="edit-budget"
                  type="number"
                  className="pl-10 h-11"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
