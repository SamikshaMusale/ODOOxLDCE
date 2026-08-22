import { MapPin, TrendingUp } from 'lucide-react';
import { City } from '../../data/mock';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ImageWithFallback } from './ImageWithFallback';

interface DestinationCardProps {
  city: City;
}

export function DestinationCard({ city }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden group flex flex-col border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <ImageWithFallback 
          src={city.image} 
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 text-black hover:bg-white border-none shadow-sm">
            {city.popularity} <TrendingUp className="ml-1 h-3 w-3" />
          </Badge>
          <Badge variant="secondary" className="bg-black/50 text-white border-none backdrop-blur-sm hover:bg-black/60">
            {city.costIndex} Cost
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-lg leading-tight">{city.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3" />
              {city.country}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {city.description}
        </p>
        <Button variant="outline" className="w-full">
          Add to Trip
        </Button>
      </CardContent>
    </Card>
  );
}
