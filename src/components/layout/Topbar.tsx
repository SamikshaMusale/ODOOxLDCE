import { Bell, Menu, Search, MapPin, PlaneTakeoff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTripContext } from '../../context/TripContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_CITIES } from '../../data/mock';
import { useState, useRef, useEffect } from 'react';

export function TopBar() {
  const { user, trips } = useTripContext();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b bg-background z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex relative w-64 lg:w-96" ref={searchContainerRef}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search destinations, trips..."
            className="pl-9 bg-muted/50 border-none h-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />
          
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto">
              {(() => {
                const query = searchQuery.toLowerCase();
                const matchedCities = MOCK_CITIES.filter(city => 
                  city.name.toLowerCase().includes(query) || 
                  city.country.toLowerCase().includes(query)
                ).slice(0, 5);
                
                const matchedTrips = trips.filter(trip => 
                  trip.name.toLowerCase().includes(query)
                ).slice(0, 5);

                if (matchedCities.length === 0 && matchedTrips.length === 0) {
                  return <div className="p-4 text-sm text-muted-foreground text-center">No results found</div>;
                }

                return (
                  <div className="py-2">
                    {matchedCities.length > 0 && (
                      <div className="mb-2">
                        <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Destinations
                        </div>
                        {matchedCities.map(city => (
                          <div 
                            key={city.id} 
                            className="flex items-center gap-3 px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setSearchQuery('');
                              navigate('/explore');
                            }}
                          >
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{city.name}</span>
                              <span className="text-xs text-muted-foreground">{city.country}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {matchedCities.length > 0 && matchedTrips.length > 0 && (
                      <div className="h-px bg-border my-2" />
                    )}

                    {matchedTrips.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          My Trips
                        </div>
                        {matchedTrips.map(trip => (
                          <div 
                            key={trip.id} 
                            className="flex items-center gap-3 px-4 py-2 hover:bg-muted cursor-pointer transition-colors"
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setSearchQuery('');
                              navigate(`/trips/${trip.id}`);
                            }}
                          >
                            <PlaneTakeoff className="h-4 w-4 text-muted-foreground" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{trip.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/trips">My Trips</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
