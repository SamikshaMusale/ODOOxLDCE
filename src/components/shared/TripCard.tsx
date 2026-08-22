import { MapPin, Calendar, Wallet } from 'lucide-react';
import { Trip } from '../../data/mock';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { format, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './ImageWithFallback';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  const duration = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  const numCities = trip.stops.length;

  return (
    <Link to={`/trips/${trip.id}`} className="block transition-transform hover:-translate-y-1">
      <Card className="overflow-hidden group h-full flex flex-col cursor-pointer border-none shadow-sm hover:shadow-md">
        <div className="relative h-48 w-full overflow-hidden">
          <ImageWithFallback 
            src={trip.coverImage} 
            alt={trip.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            containerClassName="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <Badge variant={trip.status === 'Upcoming' ? 'default' : 'secondary'} className="font-medium bg-black/40 backdrop-blur-md hover:bg-black/60 text-white border-none">
              {trip.status}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-bold text-xl truncate">{trip.name}</h3>
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col gap-3">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="truncate">{format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}</span>
            <span className="shrink-0">• {duration} days</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{numCities} {numCities === 1 ? 'City' : 'Cities'}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Wallet className="h-4 w-4 shrink-0" />
            <span>₹{trip.budget.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
