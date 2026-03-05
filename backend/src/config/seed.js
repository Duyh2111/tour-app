const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

const sampleTours = [
  {
    title: 'Ha Long Bay Luxury Cruise',
    description:
      "Sail through one of the world's most breathtaking UNESCO World Heritage Sites aboard a premium junk boat. Ha Long Bay's emerald waters are scattered with over 1,600 limestone karsts and islets, each shrouded in mystery and legend. Kayak through hidden lagoons, explore Thien Cung cave lit by shimmering stalactites, witness the golden sunrise over silent waters, and dine on fresh seafood under a canopy of stars. This is Vietnam at its most magical.",
    price: 599,
    duration: 3,
    maxGroupSize: 20,
    difficulty: 'easy',
    location: 'Ha Long Bay, Quảng Ninh',
    category: 'Luxury',
    highlights: [
      'Sunrise over limestone karsts',
      'Kayaking through hidden lagoons',
      'Thien Cung cave exploration',
      'Fresh seafood dinner on deck',
      'Fishing village visit by boat',
    ],
    included: [
      'Premium overnight cruise cabin',
      'All meals on board',
      'Kayaking & swimming',
      'Cave entrance fees',
      'English-speaking guide',
    ],
    notIncluded: [
      'Transfer from Hanoi',
      'Travel insurance',
      'Alcoholic beverages',
      'Personal expenses',
    ],
    image:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=800&fit=crop',
    featured: true,
    rating: 4.9,
    ratingsCount: 214,
  },
  {
    title: 'Sapa Trek & Ethnic Village Homestay',
    description:
      "Trek through the spectacular terraced rice fields of Sapa — a mosaic of vivid green and gold draped over the Hoàng Liên Son mountains. Meet the warm-hearted Hmong, Red Dao, and Tay ethnic communities, visit local markets bursting with colour and handwoven textiles, and spend the night in a traditional wooden stilt house. Wake up to mist rolling over the valleys as the mountains slowly reveal themselves. This journey goes far beyond sightseeing — it is a genuine human connection.",
    price: 379,
    duration: 4,
    maxGroupSize: 12,
    difficulty: 'medium',
    location: 'Sapa, Lào Cai',
    category: 'Mountain',
    highlights: [
      'Terraced rice field trekking',
      'Hmong & Red Dao village visits',
      'Traditional stilt house homestay',
      'Bac Ha colourful highland market',
      'Fansipan mountain views',
    ],
    included: [
      'Homestay accommodation',
      'All meals with local family',
      'Expert local trekking guide',
      'Train tickets Hanoi–Lào Cai',
      'Village entrance fees',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal shopping',
      'Fansipan cable car (optional)',
    ],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    featured: true,
    rating: 4.8,
    ratingsCount: 178,
  },
  {
    title: 'Hoi An Lantern Town & Da Nang Coast',
    description:
      "Step into the living museum of Hội An, where centuries-old trading houses glow with hundreds of silk lanterns reflected in the Thu Bon River. Cycle through rice paddies to a local farm, join a hands-on Vietnamese cooking class, and have a tailor-made áo dài sewn in just 24 hours. Then head to Da Nang — the 'City of Bridges' — for the golden sands of My Khe Beach, the panoramic views from the Marble Mountains, and the spectacular Dragon Bridge breathing fire on weekend nights.",
    price: 469,
    duration: 5,
    maxGroupSize: 15,
    difficulty: 'easy',
    location: 'Hội An & Đà Nẵng, Quảng Nam',
    category: 'Cultural',
    highlights: [
      'Hoi An Ancient Town by lantern light',
      'Vietnamese cooking class',
      'Marble Mountains & Da Nang beaches',
      'Tra Que organic farm cycle tour',
      'Dragon Bridge fire-breathing show',
    ],
    included: [
      'Boutique hotel (4 nights)',
      'Daily breakfast',
      'Cooking class with market tour',
      'Guided bicycle tour',
      'All entrance fees',
    ],
    notIncluded: [
      'International flights',
      'Lunches & dinners',
      'Travel insurance',
      'Custom tailoring (optional)',
    ],
    image:
      'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200&h=800&fit=crop',
    featured: true,
    rating: 4.8,
    ratingsCount: 193,
  },
  {
    title: 'Imperial Hue Heritage Trail',
    description:
      "Wander through the grandeur of the Nguyễn Dynasty in Huế, Vietnam's last imperial capital. The walled Citadel and its Forbidden Purple City once housed emperors and concubines behind vast stone walls and ornate pavilions. Glide along the perfumed Perfume River by dragon boat to Thiên Mụ Pagoda, explore the lavish royal tombs of Emperor Minh Mạng and Tự Đức carved into the misty hillsides, and savour Hue's legendary cuisine — including bánh khoái and bún bò Huế — considered the most refined in all of Vietnam.",
    price: 289,
    duration: 3,
    maxGroupSize: 16,
    difficulty: 'easy',
    location: 'Huế, Thừa Thiên Huế',
    category: 'Cultural',
    highlights: [
      'The Imperial Citadel & Forbidden City',
      'Perfume River dragon boat cruise',
      'Thien Mu Pagoda',
      'Royal tombs of Minh Mang & Tu Duc',
      'Royal Hue cuisine dinner',
    ],
    included: [
      'Hotel accommodation (2 nights)',
      'Daily breakfast',
      'Dragon boat cruise',
      'Licensed cultural guide',
      'All citadel & tomb entrance fees',
    ],
    notIncluded: [
      'International flights',
      'Lunches & dinners',
      'Travel insurance',
      'Personal expenses',
    ],
    image:
      'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=1200&h=800&fit=crop',
    featured: false,
    rating: 4.7,
    ratingsCount: 134,
  },
  {
    title: 'Phong Nha Cave Expedition',
    description:
      "Venture into the heart of the Phong Nha–Kẻ Bàng National Park, a UNESCO World Heritage Site and home to the world's largest cave system. Wade through crystal-clear rivers into the dark cathedral chambers of Phong Nha Cave, its ceiling ablaze with ancient stalactite formations. For the truly adventurous, a guided trek leads into the jungle-fringed entrance of Hang En — the third-largest cave on earth — where you camp overnight on a pristine white sandbar beneath a sky of stars, serenaded by the sound of underground rivers.",
    price: 419,
    duration: 4,
    maxGroupSize: 10,
    difficulty: 'hard',
    location: 'Phong Nha, Quảng Bình',
    category: 'Adventure',
    highlights: [
      'Phong Nha cave by boat',
      'Hang En cave overnight camp',
      'Jungle trekking in UNESCO park',
      'Underground river swimming',
      'Paradise Cave illuminated walk',
    ],
    included: [
      'Camping equipment & sleeping bag',
      'All meals during trek',
      'Expert cave guide & safety team',
      'National park entry permits',
      'Hotel (1 night before trek)',
    ],
    notIncluded: [
      'Transport to Phong Nha',
      'Travel insurance',
      'Personal gear',
      'International flights',
    ],
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop',
    featured: false,
    rating: 4.9,
    ratingsCount: 98,
  },
  {
    title: 'Mekong Delta River Life Discovery',
    description:
      "Drift by sampan through a labyrinth of waterways, canals, and fruit orchards that form the lifeblood of southern Vietnam. Rise before dawn to witness the Cai Rang floating market — a riot of colour and commerce where vendors hawk fruits, vegetables, and freshly brewed cà phê straight from their boats. Visit a honey-bee farm, taste coconut candy made by hand, cycle through sleepy riverside villages, and share a home-cooked meal with a local family. The Mekong Delta offers a Vietnam still untouched by modern hurry.",
    price: 229,
    duration: 3,
    maxGroupSize: 14,
    difficulty: 'easy',
    location: 'Cần Thơ, Mekong Delta',
    category: 'Cultural',
    highlights: [
      'Cai Rang floating market at dawn',
      'Sampan boat through fruit orchards',
      'Coconut candy workshop visit',
      'Bicycle ride through riverside villages',
      'Home-cooked family dinner',
    ],
    included: [
      'Guesthouse accommodation (2 nights)',
      'All meals',
      'Private sampan & rowboat',
      'Bicycle rental',
      'Local expert guide',
    ],
    notIncluded: [
      'Transfers from Ho Chi Minh City',
      'Travel insurance',
      'Personal expenses',
      'Alcoholic beverages',
    ],
    image:
      'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=1200&h=800&fit=crop',
    featured: false,
    rating: 4.6,
    ratingsCount: 119,
  },
  {
    title: 'Phu Quoc Island Paradise',
    description:
      "Escape to Phú Quốc — Vietnam's 'Pearl Island' — where powdery white sands meet the clearest turquoise waters of the Gulf of Thailand. Snorkel vibrant coral reefs teeming with clownfish and sea turtles, watch the sky explode in colour at Sunset Town, sip pepper-infused cocktails from the island's famous plantations, and explore the untouched northern jungle on a 4x4 adventure. Whether you seek a romantic hideaway or a family adventure, Phu Quoc's unspoiled beauty will leave you breathless.",
    price: 649,
    duration: 5,
    maxGroupSize: 18,
    difficulty: 'easy',
    location: 'Phú Quốc Island, Kiên Giang',
    category: 'Beach',
    highlights: [
      'Snorkeling at An Thoi Archipelago',
      'Sunset Town & cable car ride',
      'North island 4x4 jungle safari',
      'Phu Quoc pepper farm visit',
      'Night squid fishing excursion',
    ],
    included: [
      'Beachfront resort (4 nights)',
      'Daily breakfast & 2 dinners',
      'Snorkeling trip with equipment',
      'Island 4x4 tour',
      'Airport transfers',
    ],
    notIncluded: [
      'International flights',
      'Lunches',
      'Travel insurance',
      'Personal expenses & spa',
    ],
    image:
      'https://images.unsplash.com/photo-1559742811-822873691df8?w=1200&h=800&fit=crop',
    featured: true,
    rating: 4.8,
    ratingsCount: 167,
  },
  {
    title: 'Hanoi City Break & Ninh Binh Scenery',
    description:
      "Begin in Hanoi — one of Southeast Asia's most atmospheric capitals — where French colonial architecture meets ancient pagodas and the tantalising aromas of street food drift through the narrow lanes of the Old Quarter. Sip cà phê trứng (egg coffee) at a lakeside café, watch the water puppet theatre on Hoan Kiem Lake, and join a street food walking tour at twilight. Then venture south to Ninh Bình, 'Halong Bay on Land', where limestone pinnacles rise from emerald rice fields and the ancient capital of Hoa Lư hides among sacred caves.",
    price: 329,
    duration: 4,
    maxGroupSize: 16,
    difficulty: 'easy',
    location: 'Hà Nội & Ninh Bình',
    category: 'City',
    highlights: [
      'Hanoi Old Quarter street food tour',
      'Water puppet theatre at Hoan Kiem Lake',
      'Trang An Landscape boat tour (UNESCO)',
      'Hoa Lu ancient capital temples',
      'Mua Cave hilltop panorama trek',
    ],
    included: [
      'Hotel accommodation (3 nights)',
      'Daily breakfast',
      'Day trip to Ninh Binh',
      'Street food walking tour',
      'All entrance fees & boat tickets',
    ],
    notIncluded: [
      'International flights',
      'Lunches & dinners',
      'Travel insurance',
      'Personal shopping',
    ],
    image:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&h=800&fit=crop',
    featured: true,
    rating: 4.7,
    ratingsCount: 201,
  },
  {
    title: 'Ho Chi Minh City & Cu Chi Tunnels',
    description:
      "Dive into the electric energy of Hồ Chí Minh City — a megacity that never sleeps. Explore the ornate Reunification Palace, the moving War Remnants Museum, and the art deco Central Post Office designed by Gustave Eiffel. Lose yourself in the maze of Bến Thành Market and finish the day on a rooftop bar watching the sea of motorbikes below. The following day, travel 40 km to the Cu Chi Tunnels — an extraordinary underground network stretching over 250 km, built by Viet Cong soldiers and offering a profound insight into the resilience of the Vietnamese people.",
    price: 279,
    duration: 3,
    maxGroupSize: 18,
    difficulty: 'easy',
    location: 'Hồ Chí Minh City',
    category: 'City',
    highlights: [
      'Cu Chi Tunnels underground tour',
      'Reunification Palace & War Museum',
      'Ben Thanh Market local experience',
      'Street food motorbike tour at dusk',
      'Mekong Delta half-day speedboat',
    ],
    included: [
      'Hotel accommodation (2 nights)',
      'Daily breakfast',
      'Cu Chi Tunnels full-day tour',
      'Evening street food motorbike tour',
      'English-speaking guide',
    ],
    notIncluded: [
      'International flights',
      'Lunches & dinners',
      'Travel insurance',
      'Personal expenses',
    ],
    image:
      'https://images.unsplash.com/photo-1615485736781-44265c2ba661?w=1200&h=800&fit=crop',
    featured: false,
    rating: 4.6,
    ratingsCount: 156,
  },
  {
    title: 'Ha Giang Loop — Off the Beaten Path',
    description:
      "The Ha Giang Loop is the most spectacular road journey in Vietnam — and arguably in all of Southeast Asia. Wind through the Đồng Văn Karst Plateau Geopark, a UNESCO-recognised landscape of prehistoric geology where jagged limestone peaks plunge into deep river gorges. Cross the vertigo-inducing Ma Pi Leng Pass, one of the four great mountain passes of Vietnam, and stop in remote Hmong and Lô Lô minority villages where traditions remain unchanged for centuries. This is raw, untamed, unforgettable Vietnam.",
    price: 359,
    duration: 4,
    maxGroupSize: 8,
    difficulty: 'hard',
    location: 'Hà Giang Province',
    category: 'Adventure',
    highlights: [
      'Ma Pi Leng Pass — panoramic mountain views',
      'Dong Van Karst Plateau (UNESCO Geopark)',
      'Hmong & Lo Lo minority village visits',
      'Lung Cu Flag Tower — Vietnam\'s northernmost point',
      'Nho Que River valley viewpoint',
    ],
    included: [
      'Guesthouse accommodation (3 nights)',
      'All meals',
      'Motorbike hire & fuel',
      'Experienced local guide',
      'Geopark entry permits',
    ],
    notIncluded: [
      'Transport to Ha Giang city',
      'Travel insurance',
      'International flights',
      'Personal expenses',
    ],
    image:
      'https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&h=800&fit=crop',
    featured: true,
    rating: 5.0,
    ratingsCount: 87,
  },
];

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  await prisma.tour.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('🗑️  Cleared existing data');

  const salt = await bcrypt.genSalt(12);

  // Create admin
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123456', salt);
  const admin = await prisma.user.create({
    data: {
      name: process.env.ADMIN_NAME || 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@tourapp.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Create sample user
  const userPassword = await bcrypt.hash('User@123456', salt);
  const user = await prisma.user.create({
    data: {
      name: 'John Traveler',
      email: 'user@tourapp.com',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log(`✅ Sample user created: ${user.email}`);

  // Create tours
  for (const tour of sampleTours) {
    await prisma.tour.create({
      data: { ...tour, createdById: admin.id },
    });
  }
  console.log(`✅ ${sampleTours.length} Vietnam tours created`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Admin email: ${admin.email}`);
  console.log('   Password:   [set via ADMIN_PASSWORD env var]');
  console.log(`📧 Sample user: ${user.email}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
