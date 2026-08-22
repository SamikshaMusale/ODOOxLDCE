import { useState } from 'react';
import { MOCK_CITIES } from '../data/mock';
import { DestinationCard } from '../components/shared/DestinationCard';
import { Input } from '../components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  
  const regions = ['All', ...Array.from(new Set(MOCK_CITIES.map(c => c.region)))];

  const filteredCities = MOCK_CITIES.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'All' || city.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Discover the World</h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8">
            Find your next perfect destination. Browse by region, popularity, or just get inspired.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for cities, countries..." 
              className="pl-12 h-12 rounded-full bg-white text-black border-none text-base focus-visible:ring-2 focus-visible:ring-primary/50 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="font-medium text-foreground">Filters</span>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="popular">
            <SelectTrigger className="w-full sm:w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="cost-low">Cost: Low to High</SelectItem>
              <SelectItem value="cost-high">Cost: High to Low</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCities.slice(0, 8).map(city => (
          <DestinationCard key={city.id} city={city} />
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No destinations found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearchQuery(''); setRegionFilter('All'); }}>
            Clear all filters
          </Button>
        </div>
      )}

    </div>
  );
}
