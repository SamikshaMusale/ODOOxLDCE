const fs = require('fs');
let content = fs.readFileSync('src/data/mock.ts', 'utf8');

const MOCK_ACTIVITIES = [
  { id: 'a1', name: 'Colosseum Tour', category: 'Sightseeing', duration: 120, cost: 2500, rating: 4.8, description: 'Guided tour of the iconic Colosseum.', image: 'https://loremflickr.com/800/600/colosseum,rome' },
  { id: 'a2', name: 'Roman Forum', category: 'Sightseeing', duration: 120, cost: 1800, rating: 4.6, description: 'Explore the ruins of ancient Rome.', image: 'https://loremflickr.com/800/600/roman,forum' },
  { id: 'a3', name: 'Trastevere Food Tour', category: 'Food', duration: 180, cost: 4500, rating: 4.9, description: 'Taste the best local dishes in Trastevere.', image: 'https://loremflickr.com/800/600/trastevere,food' },
  { id: 'a4', name: 'Uffizi Gallery', category: 'Culture', duration: 180, cost: 2200, rating: 4.8, description: 'World-renowned renaissance art museum.', image: 'https://loremflickr.com/800/600/uffizi,gallery' },
  { id: 'a5', name: 'Gondola Ride', category: 'Relaxation', duration: 45, cost: 7000, rating: 4.7, description: 'Romantic ride through the canals of Venice.', image: 'https://loremflickr.com/800/600/gondola,venice' },
  { id: 'a6', name: 'Eiffel Tower Visit', category: 'Sightseeing', duration: 120, cost: 2500, rating: 4.8, description: 'Iconic views from the top of the Eiffel Tower.', image: 'https://loremflickr.com/800/600/eiffel,tower' },
  { id: 'a7', name: 'Louvre Museum Tour', category: 'Culture', duration: 240, cost: 3000, rating: 4.9, description: 'Explore the worlds largest art museum.', image: 'https://loremflickr.com/800/600/louvre,museum' },
  { id: 'a8', name: 'Seine River Cruise', category: 'Relaxation', duration: 60, cost: 1500, rating: 4.7, description: 'Scenic evening boat ride along the Seine.', image: 'https://loremflickr.com/800/600/seine,river' },
  { id: 'a9', name: 'French Cooking Class', category: 'Experiences', duration: 180, cost: 8000, rating: 4.9, description: 'Learn to cook classic French pastries.', image: 'https://loremflickr.com/800/600/cooking,class' },
  { id: 'a10', name: 'Shibuya Crossing Visit', category: 'Experiences', duration: 60, cost: 0, rating: 4.8, description: 'Walk across the busiest intersection in the world.', image: 'https://loremflickr.com/800/600/shibuya,crossing' },
  { id: 'a11', name: 'Senso-ji Temple Tour', category: 'Culture', duration: 90, cost: 500, rating: 4.7, description: 'Visit Tokyos oldest and most significant temple.', image: 'https://loremflickr.com/800/600/sensoji,temple' },
  { id: 'a12', name: 'Sushi Making Class', category: 'Food', duration: 120, cost: 6000, rating: 4.9, description: 'Learn the art of sushi from a master chef.', image: 'https://loremflickr.com/800/600/sushi,making' },
  { id: 'a13', name: 'TeamLab Planets', category: 'Sightseeing', duration: 120, cost: 3500, rating: 4.8, description: 'Immersive digital art exhibition.', image: 'https://loremflickr.com/800/600/teamlab,art' },
  { id: 'a14', name: 'Ubud Rice Terrace Walk', category: 'Nature', duration: 120, cost: 1000, rating: 4.8, description: 'Scenic trek through the Tegalalang rice terraces.', image: 'https://loremflickr.com/800/600/ubud,rice,terrace' },
  { id: 'a15', name: 'Snorkeling in Nusa Penida', category: 'Adventure', duration: 360, cost: 5000, rating: 4.9, description: 'Swim with manta rays in crystal clear waters.', image: 'https://loremflickr.com/800/600/snorkeling,bali' },
  { id: 'a16', name: 'Balinese Cooking Class', category: 'Food', duration: 180, cost: 3000, rating: 4.7, description: 'Discover the secrets of authentic Balinese cuisine.', image: 'https://loremflickr.com/800/600/balinese,food' },
  { id: 'a17', name: 'Sunset Beach Club', category: 'Nightlife', duration: 240, cost: 4000, rating: 4.6, description: 'Enjoy cocktails and music by the beach.', image: 'https://loremflickr.com/800/600/beach,club' },
  { id: 'a18', name: 'Burj Khalifa At The Top', category: 'Sightseeing', duration: 90, cost: 8000, rating: 4.8, description: 'Views from the tallest building in the world.', image: 'https://loremflickr.com/800/600/burj,khalifa' },
  { id: 'a19', name: 'Desert Safari & Dinner', category: 'Adventure', duration: 360, cost: 6000, rating: 4.9, description: 'Dune bashing, camel rides, and a BBQ dinner.', image: 'https://loremflickr.com/800/600/desert,safari' },
  { id: 'a20', name: 'Dubai Mall Shopping', category: 'Shopping', duration: 240, cost: 5000, rating: 4.7, description: 'Explore one of the worlds largest shopping malls.', image: 'https://loremflickr.com/800/600/dubai,mall' },
  { id: 'a21', name: 'Statue of Liberty', category: 'Sightseeing', duration: 240, cost: 3000, rating: 4.8, description: 'Ferry ride and tour of the historic monument.', image: 'https://loremflickr.com/800/600/statue,of,liberty' },
  { id: 'a22', name: 'Central Park Walk', category: 'Nature', duration: 120, cost: 0, rating: 4.9, description: 'A relaxing stroll through NYCs famous park.', image: 'https://loremflickr.com/800/600/central,park' },
  { id: 'a23', name: 'Broadway Show', category: 'Experiences', duration: 180, cost: 12000, rating: 4.9, description: 'Catch a world-class musical performance.', image: 'https://loremflickr.com/800/600/broadway,show' },
  { id: 'a24', name: 'Tower of London', category: 'Culture', duration: 180, cost: 3500, rating: 4.8, description: 'Discover the history and the Crown Jewels.', image: 'https://loremflickr.com/800/600/tower,of,london' },
  { id: 'a25', name: 'London Eye', category: 'Sightseeing', duration: 60, cost: 3000, rating: 4.7, description: 'Panoramic views of the London skyline.', image: 'https://loremflickr.com/800/600/london,eye' },
  { id: 'a26', name: 'British Museum', category: 'Culture', duration: 240, cost: 0, rating: 4.9, description: 'A comprehensive collection of world history and art.', image: 'https://loremflickr.com/800/600/british,museum' },
  { id: 'a27', name: 'Scuba Diving', category: 'Adventure', duration: 240, cost: 4000, rating: 4.8, description: 'Explore the vibrant underwater marine life.', image: 'https://loremflickr.com/800/600/scuba,diving' },
  { id: 'a28', name: 'Old Goa Heritage Tour', category: 'Culture', duration: 120, cost: 1000, rating: 4.6, description: 'Visit ancient churches and historical landmarks.', image: 'https://loremflickr.com/800/600/old,goa' },
  { id: 'a29', name: 'Spice Plantation Tour', category: 'Experiences', duration: 150, cost: 1500, rating: 4.7, description: 'Guided walk through aromatic spice farms.', image: 'https://loremflickr.com/800/600/spice,plantation' },
  { id: 'a30', name: 'Table Mountain Cable Car', category: 'Nature', duration: 120, cost: 2000, rating: 4.9, description: 'Breathtaking views of Cape Town from the summit.', image: 'https://loremflickr.com/800/600/table,mountain' },
  { id: 'a31', name: 'Robben Island Tour', category: 'Culture', duration: 240, cost: 2500, rating: 4.8, description: 'Historic tour of Nelson Mandelas former prison.', image: 'https://loremflickr.com/800/600/robben,island' },
  { id: 'a32', name: 'Wine Tasting Experience', category: 'Food', duration: 180, cost: 3500, rating: 4.9, description: 'Sample premium wines in the local vineyards.', image: 'https://loremflickr.com/800/600/wine,tasting' },
  { id: 'a33', name: 'Sydney Opera House Tour', category: 'Sightseeing', duration: 60, cost: 2500, rating: 4.8, description: 'Behind the scenes at the iconic performance venue.', image: 'https://loremflickr.com/800/600/sydney,opera,house' },
  { id: 'a34', name: 'Bondi Beach Surfing Lesson', category: 'Adventure', duration: 120, cost: 4000, rating: 4.7, description: 'Learn to surf on Australias most famous beach.', image: 'https://loremflickr.com/800/600/surfing,bondi' },
  { id: 'a35', name: 'Blue Mountains Day Trip', category: 'Nature', duration: 480, cost: 6000, rating: 4.9, description: 'Explore the stunning landscapes and Three Sisters.', image: 'https://loremflickr.com/800/600/blue,mountains' },
  { id: 'a36', name: 'Hagia Sophia Tour', category: 'Culture', duration: 120, cost: 1500, rating: 4.9, description: 'Visit the magnificent Byzantine architectural marvel.', image: 'https://loremflickr.com/800/600/hagia,sophia' },
  { id: 'a37', name: 'Bosphorus Cruise', category: 'Relaxation', duration: 120, cost: 2000, rating: 4.8, description: 'Scenic boat ride between Europe and Asia.', image: 'https://loremflickr.com/800/600/bosphorus,cruise' },
  { id: 'a38', name: 'Grand Bazaar Shopping', category: 'Shopping', duration: 180, cost: 3000, rating: 4.7, description: 'Navigate the vibrant alleys of the historic market.', image: 'https://loremflickr.com/800/600/grand,bazaar' },
  { id: 'a39', name: 'Gateway of India Visit', category: 'Sightseeing', duration: 60, cost: 0, rating: 4.7, description: 'Historic arch monument overlooking the Arabian Sea.', image: 'https://loremflickr.com/800/600/gateway,india' },
  { id: 'a40', name: 'Elephanta Caves Tour', category: 'Culture', duration: 240, cost: 1500, rating: 4.6, description: 'Ferry ride to ancient rock-cut cave temples.', image: 'https://loremflickr.com/800/600/elephanta,caves' },
  { id: 'a41', name: 'Street Food Walking Tour', category: 'Food', duration: 180, cost: 1200, rating: 4.8, description: 'Taste local delicacies like Vada Pav and Pav Bhaji.', image: 'https://loremflickr.com/800/600/street,food' },
  { id: 'a42', name: 'Taj Mahal Sunrise Tour', category: 'Sightseeing', duration: 180, cost: 1500, rating: 5.0, description: 'Experience the stunning monument of love at dawn.', image: 'https://loremflickr.com/800/600/taj,mahal' },
  { id: 'a43', name: 'Agra Fort Visit', category: 'Culture', duration: 120, cost: 600, rating: 4.7, description: 'Explore the historic 16th-century Mughal fortress.', image: 'https://loremflickr.com/800/600/agra,fort' },
  { id: 'a44', name: 'Amber Fort Visit', category: 'Experiences', duration: 150, cost: 2000, rating: 4.6, description: 'Explore the majestic hilltop fort of Jaipur.', image: 'https://loremflickr.com/800/600/amber,fort' },
  { id: 'a45', name: 'City Palace Tour', category: 'Culture', duration: 120, cost: 800, rating: 4.8, description: 'Discover the royal residence in the heart of the city.', image: 'https://loremflickr.com/800/600/city,palace' },
  { id: 'a46', name: 'Vatican Museums Tour', category: 'Culture', duration: 240, cost: 3500, rating: 4.9, description: 'Home to immense collections of art and the Sistine Chapel.', image: 'https://loremflickr.com/800/600/vatican,museums' },
  { id: 'a47', name: 'Pasta Making Class', category: 'Food', duration: 180, cost: 5000, rating: 4.8, description: 'Master traditional Italian pasta techniques.', image: 'https://loremflickr.com/800/600/pasta,making' }
];

const formattedActivities = 'export const MOCK_ACTIVITIES: Activity[] = [\n' + MOCK_ACTIVITIES.map(a => `  ${JSON.stringify(a).replace(/"/g, "'").replace(/'id'/g, "id").replace(/'name'/g, "name").replace(/'category'/g, "category").replace(/'duration'/g, "duration").replace(/'cost'/g, "cost").replace(/'rating'/g, "rating").replace(/'description'/g, "description").replace(/'image'/g, "image")}`).join(',\n') + '\n];';

const regex = /export const MOCK_ACTIVITIES:\s*Activity\[\]\s*=\s*\[[\s\S]*?\];/;
content = content.replace(regex, formattedActivities);

if (!content.includes("| 'Experiences'")) {
  content = content.replace(
    /category:\s*'Sightseeing'\s*\|\s*'Food'\s*\|\s*'Culture'\s*\|\s*'Adventure'\s*\|\s*'Shopping'\s*\|\s*'Nature'\s*\|\s*'Nightlife'\s*\|\s*'Relaxation';/,
    "category: 'Sightseeing' | 'Food' | 'Culture' | 'Adventure' | 'Shopping' | 'Nature' | 'Nightlife' | 'Relaxation' | 'Experiences' | 'Family-Friendly';"
  );
}

fs.writeFileSync('src/data/mock.ts', content);
