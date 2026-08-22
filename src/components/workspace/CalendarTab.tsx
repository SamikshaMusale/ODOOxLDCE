import { Trip, TripActivity, TripStop } from '../../data/mock';
import { format, differenceInDays, addDays } from 'date-fns';
import { MapPin, Utensils, Camera, Palette, Mountain, ShoppingBag, Leaf, Moon, Sparkles, Navigation } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../shared/ImageWithFallback';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food': return <Utensils className="h-4 w-4" />;
    case 'Sightseeing': return <Camera className="h-4 w-4" />;
    case 'Culture': return <Palette className="h-4 w-4" />;
    case 'Adventure': return <Mountain className="h-4 w-4" />;
    case 'Shopping': return <ShoppingBag className="h-4 w-4" />;
    case 'Nature': return <Leaf className="h-4 w-4" />;
    case 'Nightlife': return <Moon className="h-4 w-4" />;
    case 'Relaxation': return <Sparkles className="h-4 w-4" />;
    default: return <Navigation className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Food': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Sightseeing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Culture': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Adventure': return 'bg-red-100 text-red-700 border-red-200';
    case 'Shopping': return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'Nature': return 'bg-green-100 text-green-700 border-green-200';
    case 'Nightlife': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'Relaxation': return 'bg-teal-100 text-teal-700 border-teal-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function CalendarTab({ trip }: { trip: Trip }) {
  // Build a timeline structure grouping by actual dates
  // Since we only have pseudo-dates in stops, we will interpolate them
  // For each stop, we generate days, and assign activities.

  const timelineDays: { date: Date; city: string; activities: TripActivity[] }[] = [];

  trip.stops.forEach(stop => {
    let currentDate = new Date(stop.startDate);
    const endDate = new Date(stop.endDate);
    
    // Distribute activities linearly across days (mock behavior)
    let actIndex = 0;
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const dailyActivities = stop.activities
        .filter((a, i) => {
          if (a.date) return a.date === dateString;
          // Fallback for older data
          const daysTotal = differenceInDays(endDate, new Date(stop.startDate)) + 1;
          const dayIndex = differenceInDays(currentDate, new Date(stop.startDate));
          return i % daysTotal === dayIndex;
        })
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      timelineDays.push({
        date: currentDate,
        city: stop.city.name,
        activities: dailyActivities
      });
      currentDate = addDays(currentDate, 1);
    }
  });

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Timeline View</h2>
        <p className="text-muted-foreground mt-1">A high-level visual overview of your trip schedule</p>
      </div>

      <div className="relative ml-4 sm:ml-8 space-y-8 py-4">
        {/* Main timeline line */}
        <div className="absolute left-[-1px] top-4 bottom-4 w-[2px] bg-border" />

        {timelineDays.map((day, dayIndex) => (
          <div key={dayIndex} className="relative pl-8 sm:pl-12">
            
            {/* Date marker */}
            <div className="absolute left-[-6px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
            
            <div className="mb-4">
              <h3 className="font-bold text-lg leading-none">{format(day.date, 'EEEE, MMMM d')}</h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {day.city}
              </p>
            </div>

            <div className="space-y-4">
              {day.activities.length > 0 ? (
                day.activities.map(activity => (
                  <div key={activity.tripActivityId} className="relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border bg-card hover:shadow-md transition-shadow">
                    
                    {/* Activity marker dot */}
                    <div className="absolute left-[-38px] sm:left-[-54px] top-7 h-2 w-2 rounded-full bg-muted-foreground/40" />

                    <div className="font-bold text-lg min-w-[70px] shrink-0 sm:pt-1">
                      {activity.startTime}
                    </div>
                    
                    <div className="h-24 w-full sm:w-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <ImageWithFallback src={activity.image} alt={activity.name} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-lg">{activity.name}</h4>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getCategoryColor(activity.category)}`}>
                          {getCategoryIcon(activity.category)}
                          <span className="hidden sm:inline">{activity.category}</span>
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{activity.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground mt-3">
                        <span>{activity.duration / 60} hours</span>
                        <span className="text-emerald-600 font-bold">₹{activity.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="relative">
                   <div className="absolute left-[-38px] sm:left-[-54px] top-3 h-2 w-2 rounded-full bg-border" />
                   <p className="text-sm text-muted-foreground italic pl-4 border-l-2 border-border/50 py-1">Free time to explore</p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* End of trip marker */}
        <div className="relative pl-8 sm:pl-12 pt-4">
          <div className="absolute left-[-6px] top-6 h-3 w-3 rounded-full bg-muted border-2 border-white ring-2 ring-border" />
          <div className="font-medium text-muted-foreground">
            End of Trip • {format(new Date(trip.endDate), 'MMMM d, yyyy')}
          </div>
        </div>

      </div>
    </div>
  );
}
