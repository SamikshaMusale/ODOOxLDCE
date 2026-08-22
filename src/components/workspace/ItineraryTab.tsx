import { useState } from 'react';
import { Trip, TripActivity, TripStop, MOCK_CITIES, MOCK_ACTIVITIES, City, Activity } from '../../data/mock';
import { formatMoney } from '../../lib/currency';
import { format, addDays, differenceInDays } from 'date-fns';
import { Button } from '../ui/button';
import { Plus, GripVertical, Clock, MapPin, MoreHorizontal, ArrowDown, Trash, Calendar as CalendarIcon, Save, Wallet } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../shared/ImageWithFallback';

interface ItineraryTabProps {
  trip: Trip;
  updateTrip: (trip: Trip) => void;
}

export function ItineraryTab({ trip, updateTrip }: ItineraryTabProps) {
  // Modals state
  const [isAddStopOpen, setIsAddStopOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [selectedStopIdForActivity, setSelectedStopIdForActivity] = useState<string | null>(null);

  // Form states
  const [newStopCityId, setNewStopCityId] = useState<string>('');
  const [newStopArrival, setNewStopArrival] = useState('');
  const [newStopDeparture, setNewStopDeparture] = useState('');

  const [newActivityId, setNewActivityId] = useState<string>('');
  const [newActivityDate, setNewActivityDate] = useState('');
  const [newActivityTime, setNewActivityTime] = useState('09:00');

  // --- Handlers ---
  
  const handleAddStop = () => {
    if (!newStopCityId || !newStopArrival || !newStopDeparture) return;
    const city = MOCK_CITIES.find(c => c.id === newStopCityId);
    if (!city) return;

    const newStop: TripStop = {
      id: `s${Date.now()}`,
      city,
      startDate: new Date(newStopArrival).toISOString(),
      endDate: new Date(newStopDeparture).toISOString(),
      activities: []
    };

    const updatedTrip = { ...trip, stops: [...trip.stops, newStop] };
    // adjust trip start/end date if needed based on stops
    updateTrip(updatedTrip);
    setIsAddStopOpen(false);
    setNewStopCityId('');
    setNewStopArrival('');
    setNewStopDeparture('');
  };

  const handleRemoveStop = (stopId: string) => {
    if (confirm("Remove this stop from the trip?")) {
      const updatedTrip = { ...trip, stops: trip.stops.filter(s => s.id !== stopId) };
      updateTrip(updatedTrip);
    }
  };

  const handleMoveStop = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === trip.stops.length - 1)) return;
    const stops = [...trip.stops];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [stops[index], stops[swapIndex]] = [stops[swapIndex], stops[index]];
    updateTrip({ ...trip, stops });
  };

  const handleAddActivity = () => {
    if (!newActivityId || !selectedStopIdForActivity || !newActivityDate || !newActivityTime) return;
    const activityBase = MOCK_ACTIVITIES.find(a => a.id === newActivityId);
    if (!activityBase) return;

    const newActivity: TripActivity = {
      ...activityBase,
      tripActivityId: `ta${Date.now()}`,
      startTime: newActivityTime,
      date: newActivityDate
    };

    const updatedStops = trip.stops.map(stop => {
      if (stop.id === selectedStopIdForActivity) {
        return { ...stop, activities: [...stop.activities, newActivity] };
      }
      return stop;
    });

    // Update the trip, also adding to expenses
    const newExpense = {
      id: `e${Date.now()}`,
      category: 'Activities' as const,
      amount: newActivity.cost,
      date: new Date(newActivityDate).toISOString()
    };

    updateTrip({ 
      ...trip, 
      stops: updatedStops,
      expenses: [...trip.expenses, newExpense]
    });
    
    setIsAddActivityOpen(false);
    setNewActivityId('');
    setNewActivityDate('');
  };

  const handleRemoveActivity = (stopId: string, activityId: string, cost: number) => {
    if (confirm("Remove this activity?")) {
      const updatedStops = trip.stops.map(stop => {
        if (stop.id === stopId) {
          return { ...stop, activities: stop.activities.filter(a => a.tripActivityId !== activityId) };
        }
        return stop;
      });
      // Try to remove a matching expense
      const expenseIndex = trip.expenses.findIndex(e => e.category === 'Activities' && e.amount === cost);
      const newExpenses = [...trip.expenses];
      if (expenseIndex >= 0) newExpenses.splice(expenseIndex, 1);

      updateTrip({ ...trip, stops: updatedStops, expenses: newExpenses });
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Route Manager section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your Route</h2>
            <p className="text-muted-foreground mt-1">Manage cities, dates, and order</p>
          </div>
          <Button onClick={() => setIsAddStopOpen(true)} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Stop
          </Button>
        </div>

        <div className="space-y-4">
          {trip.stops.map((stop, index) => {
            const nights = differenceInDays(new Date(stop.endDate), new Date(stop.startDate));
            return (
              <div key={stop.id}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/20 p-4 rounded-2xl border">
                  
                  {/* Controls */}
                  <div className="flex sm:flex-col gap-1 items-center shrink-0 w-8">
                    <span className="font-bold text-muted-foreground text-sm mb-1">{String(index + 1).padStart(2, '0')}</span>
                    <button onClick={() => handleMoveStop(index, 'up')} disabled={index === 0} className="hover:text-primary disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveStop(index, 'down')} disabled={index === trip.stops.length - 1} className="hover:text-primary disabled:opacity-30">▼</button>
                  </div>

                  {/* Image */}
                  <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 shadow-sm hidden sm:block">
                    <ImageWithFallback src={stop.city.image} alt={stop.city.name} />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{stop.city.name} <span className="text-sm font-normal text-muted-foreground ml-2">{stop.city.country}</span></h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border shadow-sm">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(stop.startDate), 'MMM d')} – {format(new Date(stop.endDate), 'MMM d')}
                      </span>
                      <span className="font-medium bg-white px-2 py-1 rounded-md border shadow-sm">{nights} nights</span>
                      <span className="font-medium bg-white px-2 py-1 rounded-md border shadow-sm">{stop.activities.length} activities</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedStopIdForActivity(stop.id);
                      setNewActivityDate(stop.startDate.split('T')[0]);
                      setIsAddActivityOpen(true);
                    }}>
                      <Plus className="mr-1 h-3 w-3" /> Activity
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemoveStop(stop.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>

                </div>

                {/* Visual Connector */}
                {index < trip.stops.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            );
          })}
          {trip.stops.length === 0 && (
             <div className="text-center py-10 border-2 border-dashed rounded-2xl">
               <p className="text-muted-foreground mb-4">No cities added yet.</p>
               <Button onClick={() => setIsAddStopOpen(true)}>Add your first stop</Button>
             </div>
          )}
        </div>
      </div>

      {/* Day-by-Day Itinerary Builder */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Day-by-Day Itinerary</h2>
          <p className="text-muted-foreground mt-1">Organize your schedule</p>
        </div>

        <div className="space-y-12 relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-border hidden sm:block z-0" />

          {trip.stops.map((stop) => {
            const days = [];
            let currentDate = new Date(stop.startDate);
            const endDate = new Date(stop.endDate);
            let dayNum = differenceInDays(new Date(stop.startDate), new Date(trip.startDate)) + 1;
            
            while (currentDate <= endDate) {
              days.push({ date: currentDate, dayNum: dayNum++ });
              currentDate = addDays(currentDate, 1);
            }

            return days.map(({ date, dayNum }, dayIndex) => {
              const dateString = date.toISOString().split('T')[0];
              const dayActivities = stop.activities
                .filter((a, i) => {
                  if (a.date) return a.date === dateString;
                  // Fallback for older data without dates
                  return i % days.length === dayIndex;
                })
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
              
              return (
                <div key={`${stop.id}-${dayIndex}`} className="relative z-10 flex flex-col sm:flex-row gap-6">
                  {/* Left gutter */}
                  <div className="sm:w-32 shrink-0">
                    <div className="sticky top-20 bg-white sm:bg-transparent">
                      <div className="font-black text-primary text-sm tracking-wider uppercase mb-1">
                        Day {dayNum}
                      </div>
                      <div className="font-bold text-xl leading-none">
                        {format(date, 'MMM d')}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium mt-1 uppercase tracking-wider">
                        {stop.city.name}
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 space-y-3">
                    {dayActivities.map(activity => (
                      <div key={activity.tripActivityId} className="group flex flex-col sm:flex-row bg-white border border-border/60 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md transition-all gap-4">
                        
                        {/* Time */}
                        <div className="font-bold text-lg w-16 shrink-0 sm:pt-2">
                          {activity.startTime}
                        </div>

                        {/* Image */}
                        <div className="h-32 sm:h-24 w-full sm:w-24 shrink-0 rounded-xl overflow-hidden shadow-sm">
                          <ImageWithFallback src={activity.image} alt={activity.name} />
                        </div>

                        {/* Details */}
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg leading-tight mb-1">{activity.name}</h4>
                              <Badge variant="secondary" className="mb-2 bg-muted/50">{activity.category}</Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full shrink-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleRemoveActivity(stop.id, activity.tripActivityId, activity.cost)} className="text-destructive">
                                  Remove Activity
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2 font-medium">
                            <span className="flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-md">
                              <Clock className="h-3.5 w-3.5" />
                              {activity.duration / 60} hours
                            </span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/50 rounded-full font-medium">
                              <Wallet className="h-4 w-4" />
                              {formatMoney(activity.cost, trip.currency)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-2">
                      <Button variant="outline" className="w-full sm:w-auto border-dashed rounded-xl" onClick={() => {
                        setSelectedStopIdForActivity(stop.id);
                        setNewActivityDate(date.toISOString().split('T')[0]);
                        setIsAddActivityOpen(true);
                      }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Activity Here
                      </Button>
                    </div>

                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>

      {/* ADD STOP MODAL */}
      <Dialog open={isAddStopOpen} onOpenChange={setIsAddStopOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a City Stop</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Search City</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={newStopCityId}
                onChange={(e) => setNewStopCityId(e.target.value)}
              >
                <option value="">Select a destination...</option>
                {MOCK_CITIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Arrival Date</Label>
                <Input type="date" value={newStopArrival} onChange={(e) => setNewStopArrival(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Departure Date</Label>
                <Input type="date" value={newStopDeparture} onChange={(e) => setNewStopDeparture(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStopOpen(false)}>Cancel</Button>
            <Button onClick={handleAddStop}>Add to Trip</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ADD ACTIVITY MODAL */}
      <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Add Activity</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 shrink-0 grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={newActivityDate} onChange={(e) => setNewActivityDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" value={newActivityTime} onChange={(e) => setNewActivityTime(e.target.value)} />
              </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <Label>Select Activity</Label>
            {MOCK_ACTIVITIES.map(a => (
              <div 
                key={a.id} 
                className={`flex gap-4 p-3 rounded-xl border cursor-pointer transition-all ${newActivityId === a.id ? 'ring-2 ring-primary border-primary bg-primary/5' : 'hover:bg-muted'}`}
                onClick={() => setNewActivityId(a.id)}
              >
                <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden">
                  <ImageWithFallback src={a.image} alt={a.name} />
                </div>
                <div>
                  <h4 className="font-bold">{a.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-1">{a.description}</p>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto whitespace-nowrap">
                    <Wallet className="h-3 w-3" />
                    <span>{formatMoney(a.cost, trip.currency)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="shrink-0 pt-4">
            <Button variant="outline" onClick={() => setIsAddActivityOpen(false)}>Cancel</Button>
            <Button onClick={handleAddActivity} disabled={!newActivityId}>Add Activity</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
