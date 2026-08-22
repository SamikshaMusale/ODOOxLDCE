const fs = require('fs');

const path = 'src/data/mock.ts';
let content = fs.readFileSync(path, 'utf8');

const cities = [
  // India
  { name: 'Mumbai', country: 'India', region: 'Asia' },
  { name: 'Delhi', country: 'India', region: 'Asia' },
  { name: 'Goa', country: 'India', region: 'Asia' },
  { name: 'Jaipur', country: 'India', region: 'Asia' },
  { name: 'Udaipur', country: 'India', region: 'Asia' },
  { name: 'Agra', country: 'India', region: 'Asia' },
  { name: 'Bengaluru', country: 'India', region: 'Asia' },
  { name: 'Hyderabad', country: 'India', region: 'Asia' },
  { name: 'Chennai', country: 'India', region: 'Asia' },
  { name: 'Kolkata', country: 'India', region: 'Asia' },
  { name: 'Pune', country: 'India', region: 'Asia' },
  { name: 'Manali', country: 'India', region: 'Asia' },
  { name: 'Shimla', country: 'India', region: 'Asia' },
  { name: 'Rishikesh', country: 'India', region: 'Asia' },
  { name: 'Varanasi', country: 'India', region: 'Asia' },
  
  // Europe
  { name: 'Milan', country: 'Italy', region: 'Europe' },
  { name: 'London', country: 'UK', region: 'Europe' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe' },
  { name: 'Barcelona', country: 'Spain', region: 'Europe' },
  { name: 'Madrid', country: 'Spain', region: 'Europe' },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe' },
  { name: 'Berlin', country: 'Germany', region: 'Europe' },
  { name: 'Vienna', country: 'Austria', region: 'Europe' },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe' },
  { name: 'Budapest', country: 'Hungary', region: 'Europe' },
  { name: 'Athens', country: 'Greece', region: 'Europe' },
  { name: 'Santorini', country: 'Greece', region: 'Europe' },
  { name: 'Zurich', country: 'Switzerland', region: 'Europe' },
  { name: 'Interlaken', country: 'Switzerland', region: 'Europe' },
  { name: 'Brussels', country: 'Belgium', region: 'Europe' },
  { name: 'Copenhagen', country: 'Denmark', region: 'Europe' },
  { name: 'Stockholm', country: 'Sweden', region: 'Europe' },
  { name: 'Oslo', country: 'Norway', region: 'Europe' },
  { name: 'Dublin', country: 'Ireland', region: 'Europe' },
  
  // Asia
  { name: 'Kyoto', country: 'Japan', region: 'Asia' },
  { name: 'Osaka', country: 'Japan', region: 'Asia' },
  { name: 'Seoul', country: 'South Korea', region: 'Asia' },
  { name: 'Singapore', country: 'Singapore', region: 'Asia' },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia' },
  { name: 'Phuket', country: 'Thailand', region: 'Asia' },
  { name: 'Jakarta', country: 'Indonesia', region: 'Asia' },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia' },
  { name: 'Hong Kong', country: 'China', region: 'Asia' },
  { name: 'Beijing', country: 'China', region: 'Asia' },
  { name: 'Shanghai', country: 'China', region: 'Asia' },
  { name: 'Taipei', country: 'Taiwan', region: 'Asia' },
  { name: 'Hanoi', country: 'Vietnam', region: 'Asia' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Asia' },
  { name: 'Manila', country: 'Philippines', region: 'Asia' },
  { name: 'Maldives', country: 'Maldives', region: 'Asia' },
  { name: 'Kathmandu', country: 'Nepal', region: 'Asia' },
  
  // Middle East
  { name: 'Dubai', country: 'UAE', region: 'Middle East' },
  { name: 'Abu Dhabi', country: 'UAE', region: 'Middle East' },
  { name: 'Doha', country: 'Qatar', region: 'Middle East' },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East' },
  { name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East' },
  { name: 'Muscat', country: 'Oman', region: 'Middle East' },
  
  // Americas
  { name: 'New York City', country: 'USA', region: 'North America' },
  { name: 'Los Angeles', country: 'USA', region: 'North America' },
  { name: 'San Francisco', country: 'USA', region: 'North America' },
  { name: 'Las Vegas', country: 'USA', region: 'North America' },
  { name: 'Miami', country: 'USA', region: 'North America' },
  { name: 'Chicago', country: 'USA', region: 'North America' },
  { name: 'Toronto', country: 'Canada', region: 'North America' },
  { name: 'Vancouver', country: 'Canada', region: 'North America' },
  { name: 'Mexico City', country: 'Mexico', region: 'North America' },
  { name: 'Cancun', country: 'Mexico', region: 'North America' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America' },
  { name: 'Buenos Aires', country: 'Argentina', region: 'South America' },
  
  // Australia / New Zealand
  { name: 'Sydney', country: 'Australia', region: 'Oceania' },
  { name: 'Melbourne', country: 'Australia', region: 'Oceania' },
  { name: 'Brisbane', country: 'Australia', region: 'Oceania' },
  { name: 'Gold Coast', country: 'Australia', region: 'Oceania' },
  { name: 'Auckland', country: 'New Zealand', region: 'Oceania' },
  { name: 'Queenstown', country: 'New Zealand', region: 'Oceania' },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', region: 'Africa' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa' },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa' },
  { name: 'Nairobi', country: 'Kenya', region: 'Africa' },
];

const filteredCities = cities.filter(c => c.name !== 'New York' && c.name !== 'New York City');

const newCitiesBlock = filteredCities.map((c, i) => {
  const id = `c${i + 8}`;
  return `  { id: '${id}', name: '${c.name}', country: '${c.country}', region: '${c.region}', costIndex: 'Medium', popularity: 4.5, description: 'Experience the beauty of ${c.name}.', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800' },`;
}).join('\n');

const existingBlockStart = content.indexOf('export const MOCK_CITIES: City[] = [');
const existingBlockEnd = content.indexOf('];', existingBlockStart) + 2;

const originalCitiesText = content.substring(existingBlockStart, existingBlockEnd);
const newMockCities = originalCitiesText.replace('];', newCitiesBlock + '\n];');
const newContent = content.replace(originalCitiesText, newMockCities);

fs.writeFileSync(path, newContent);
console.log('Done!');
