import { Trip } from '../../data/mock';
import { formatMoney } from '../../lib/currency';
import { DestinationCard } from '../shared/DestinationCard';
import { Card, CardContent } from '../ui/card';
import { differenceInDays } from 'date-fns';
import { ArrowRight, Info, CheckCircle2, Wallet } from 'lucide-react';

export function OverviewTab({ trip }: { trip: Trip }) {
  const duration = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  const numActivities = trip.stops.reduce((acc, stop) => acc + stop.activities.length, 0);

  return (
    <div className="space-y-8">
      
      {/* Route Timeline */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
        <h3 className="text-xl font-bold mb-6">Your Route</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between relative">
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
          <div className="sm:hidden absolute top-0 bottom-0 left-[15px] w-0.5 bg-muted z-0" />
          
          {trip.stops.map((stop, index) => (
            <div key={stop.id} className="relative z-10 flex sm:flex-col items-center gap-4 sm:gap-2 mb-6 sm:mb-0 bg-white sm:bg-transparent">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md border-4 border-white">
                {index + 1}
              </div>
              <div className="sm:text-center">
                <p className="font-semibold">{stop.city.name}</p>
                <p className="text-xs text-muted-foreground">{differenceInDays(new Date(stop.endDate), new Date(stop.startDate)) + 1} days</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Info className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Style</p>
            <p className="font-bold text-lg">{trip.travelStyle}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Activities</p>
            <p className="font-bold text-lg">{numActivities} Planned</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Est. Cost</p>
            <p className="font-bold text-lg">
              {formatMoney(trip.expenses.reduce((sum, e) => sum + e.amount, 0), trip.currency)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Remaining</p>
            <p className="font-bold text-lg">
              {formatMoney(trip.budget - trip.expenses.reduce((sum, e) => sum + e.amount, 0), trip.currency)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Destinations detail */}
      <section>
        <h3 className="text-xl font-bold mb-6">Destinations in this trip</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.stops.map(stop => (
            <DestinationCard key={stop.id} city={stop.city} />
          ))}
        </div>
      </section>

    </div>
  );
}
