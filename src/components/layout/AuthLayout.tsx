import { Outlet, Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';
import { ImageWithFallback } from '../shared/ImageWithFallback';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200" 
          alt="Travel landscape" 
          className="absolute inset-0 w-full h-full object-cover"
          containerClassName="absolute inset-0 w-full h-full"
        />
        <div className="relative z-20 text-white text-center p-12 max-w-lg">
          <div className="flex items-center justify-center gap-2 mb-6 text-4xl font-bold">
            <PlaneTakeoff className="h-10 w-10" />
            GlobeTrotter
          </div>
          <p className="text-xl text-white/90">
            Plan your perfect itinerary, discover hidden gems, and travel like a local.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8 text-2xl font-bold text-primary">
            <PlaneTakeoff className="h-8 w-8" />
            GlobeTrotter
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
