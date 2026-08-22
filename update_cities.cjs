const fs = require('fs');

let content = fs.readFileSync('src/data/mock.ts', 'utf8');

// We need to parse MOCK_CITIES carefully.
// It's a JS array of objects. We can use a regex to find each city object and replace its image.
// Or we can just extract the MOCK_CITIES array text, eval it to a JS array, manipulate it, and stringify it back.
// Since eval works fine here:
const citiesStart = content.indexOf('export const MOCK_CITIES: City[] = [');
const citiesEnd = content.indexOf('];', citiesStart) + 2;
const citiesBlock = content.substring(citiesStart, citiesEnd);

const jsArrayString = citiesBlock.replace('export const MOCK_CITIES: City[] = ', '').trim();
const cities = eval(jsArrayString);

const seenImages = new Set();
let uniqueBefore = 0;
let uniqueAfter = 0;

for (let i = 0; i < cities.length; i++) {
  const city = cities[i];
  
  if (!seenImages.has(city.image)) {
    uniqueBefore++;
  }
  
  // Rule: preserve first 8 exactly as they are
  if (i < 8) {
    seenImages.add(city.image);
    continue;
  }
  
  // Rule: For destinations AFTER the first 8, replace repeated/duplicate images with unique, relevant images.
  if (seenImages.has(city.image)) {
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    city.image = `https://loremflickr.com/800/600/${slug},city?lock=${i}`;
  }
  
  seenImages.add(city.image);
}

const finalSeen = new Set(cities.map(c => c.image));
uniqueAfter = finalSeen.size;

console.log(`Total cities: ${cities.length}`);
console.log(`Unique image URLs before (approx): ${uniqueBefore}`);
console.log(`Unique image URLs after: ${uniqueAfter}`);

const formattedCities = 'export const MOCK_CITIES: City[] = [\n' + cities.map(c => `  ${JSON.stringify(c).replace(/"/g, "'").replace(/'id'/g, 'id').replace(/'name'/g, 'name').replace(/'country'/g, 'country').replace(/'description'/g, 'description').replace(/'image'/g, 'image').replace(/'rating'/g, 'rating').replace(/'costLevel'/g, 'costLevel')}`).join(',\n') + '\n];';

content = content.substring(0, citiesStart) + formattedCities + content.substring(citiesEnd);

fs.writeFileSync('src/data/mock.ts', content);
console.log('Update complete.');
