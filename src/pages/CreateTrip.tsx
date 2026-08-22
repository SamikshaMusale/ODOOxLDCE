import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Map, Calendar as CalendarIcon, Wallet, ArrowRight } from 'lucide-react';
import { useTripContext } from '../context/TripContext';
import { Trip } from '../data/mock';

export function CreateTrip() {
  const navigate = useNavigate();
  const { addTrip } = useTripContext();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create mock trip
    setTimeout(() => {
      const newTrip: Trip = {
        id: `t${Date.now()}`,
        name: formData.name,
        coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        status: 'Draft',
        budget: parseInt(formData.budget) || 0,
        travelStyle: 'Balanced',
        stops: [],
        expenses: []
      };
      
      addTrip(newTrip);
      setIsLoading(false);
      navigate(`/trips/${newTrip.id}`);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Plan a New Trip</h1>
        <p className="text-muted-foreground text-lg">Every great journey begins with a single step. Where to next?</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold">Trip Name</Label>
            <div className="relative">
              <Map className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="name" 
                placeholder="e.g. Summer Backpacking in Europe" 
                className="pl-10 h-12 text-base"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-base font-semibold">Start Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="startDate" 
                  type="date" 
                  className="pl-10 h-12 text-base"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-base font-semibold">End Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="endDate" 
                  type="date" 
                  className="pl-10 h-12 text-base"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-base font-semibold">Estimated Budget</Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="budget" 
                type="number" 
                placeholder="0" 
                className="pl-10 h-12 text-base"
                required
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="What's the main goal of this trip?" 
              className="resize-none h-24 text-base"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t">
            <Button type="button" variant="ghost" onClick={() => navigate(-1)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" size="lg" className="rounded-full px-8" disabled={isLoading}>
              {isLoading ? "Creating..." : (
                <>
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
