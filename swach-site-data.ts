// ============================================================
// SWACH SOUTH INDIAN CAFE — Complete Website Data
// Madhapur, Hyderabad | swach.southindiancafe
// ============================================================

// ─────────────────────────────────────────────
// 1. RESTAURANT INFO (used across all pages)
// ─────────────────────────────────────────────
export const restaurantInfo = {
  name: "Swach South Indian Cafe",
  tagline: "Authentic South Indian Food that is going to take your heart and tummy to places!",
  shortTagline: "Pure. Authentic. South Indian.",
  description:
    "Swach South Indian Cafe is Madhapur's favourite neighbourhood cafe for genuine South Indian flavours. Born out of a passion for traditional Karnataka-style breakfast, we bring you crispy dosas, cloud-soft idlis, and soul-warming filter coffee — all at prices that won't break the bank.",
  phone: "+91 90637 42044",
  email: "swach.southindiancafe@gmail.com",
  instagram: "@swach.southindiancafe",
  address: {
    line1: "Plot no 4/3-A & B, Siddi Vinayak Nagar",
    line2: "Opp. to V Convention, beside Chase Skating",
    area: "Madhapur, Serilingampally",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500019",
    full: "Plot no 4/3-A & B, Siddi Vinayak Nagar, Opp. to V Convention, beside Chase Skating, Madhapur, Hyderabad, Telangana 500019",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Swach+South+Indian+Cafe/@17.4467,78.3726,17z",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3!2d78.3726!3d17.4467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSwach+South+Indian+Cafe!5e0!3m2!1sen!2sin!4v1700000000000",
  timings: {
    breakfast: "6:00 AM – 12:00 PM",
    evening: "5:30 PM – 10:30 PM",
    note: "Open all days of the week",
  },
  ratings: {
    google: 4.3,
    totalReviews: 3539,
    platform: "Google",
  },
  priceRange: "₹30 – ₹150 per dish",
  priceForTwo: "₹150 – ₹250",
  cuisine: ["South Indian", "Karnataka Style", "Street Food"],
  features: ["Takeaway", "Dine-in", "Catering", "Delivery (select areas)"],
  keywords: [
    "best south indian cafe in madhapur",
    "swach south indian cafe hyderabad",
    "authentic dosa madhapur",
    "Karnataka style breakfast hyderabad",
    "filter coffee madhapur",
    "swach restaurant menu",
    "idli vada madhapur",
  ],
};

// ─────────────────────────────────────────────
// 2. HOME PAGE DATA
// ─────────────────────────────────────────────
export const homePageData = {
  seo: {
    title: "Swach South Indian Cafe | Best Dosa & Idli in Madhapur, Hyderabad",
    description:
      "Experience the authentic taste of South India at Swach, Madhapur's top-rated South Indian cafe. Crispy dosas, fluffy idlis, vadas, filter coffee and more — all freshly made every day. Order online now!",
    keywords: restaurantInfo.keywords.join(", "),
    ogImage: "/images/og-home.jpg",
  },

  hero: {
    heading: "Swach South Indian Cafe",
    subheading: "Pure. Authentic. South Indian.",
    body: "Crispy dosas, cloud-soft idlis, rich filter coffee — straight from the heart of South India to Madhapur's most loved cafe.",
    cta: { label: "Order Now", href: "/menu" },
    secondaryCta: { label: "View Menu", href: "/menu" },
    backgroundImage: "/images/hero-bg.jpg",
    // Unsplash fallback for hero (royalty-free South Indian food spread)
    backgroundImageFallback:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=1600&q=80",
  },

  about: {
    heading: "A Taste of Tradition",
    subheading: "Our Story",
    body: [
      "Swach was born from a simple idea: that everyone in Madhapur deserves authentic South Indian food that tastes like it was made at home — with care, fresh ingredients, and zero compromise.",
      "We specialise in Karnataka-style breakfast, from perfectly crisped masala dosas and ghee karam dosas to pillowy-soft chitti idlis dipped in flavourful sambar. Our chutneys — coconut, groundnut, ginger, and mint — are ground fresh every morning.",
      "The name 'Swach' means clean and pure — and that is exactly what we stand for. Clean food, clean kitchen, and a clean conscience when you walk out.",
    ],
    image: "/images/restaurant-interior.jpg",
    imageFallback:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    stats: [
      { value: "4.3★", label: "Google Rating" },
      { value: "3500+", label: "Happy Reviews" },
      { value: "₹30", label: "Starting Price" },
      { value: "2 Sessions", label: "Daily — 6AM & 5:30PM" },
    ],
  },

  highlights: {
    heading: "Why Madhapur Loves Us",
    subheading: "Our Bestsellers",
    items: [
      {
        id: "masala-dosa",
        name: "Masala Dosa",
        description:
          "Crisp, golden Karnataka-style dosa filled with spiced potato masala, paired with coconut & groundnut chutney. Our most-ordered dish.",
        image: "/images/menu/masala-dosa.jpg",
        imageFallback:
          "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
        badge: "🔥 Bestseller",
        price: 60,
      },
      {
        id: "ghee-karam-idli",
        name: "Ghee Karam Idli",
        description:
          "Fluffy idlis generously smeared with spiced ghee karam powder — a Swach signature. Melt-in-your-mouth perfection.",
        image: "/images/menu/ghee-karam-idli.jpg",
        imageFallback:
          "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80",
        badge: "⭐ Chef's Pick",
        price: 50,
      },
      {
        id: "filter-coffee",
        name: "Filter Coffee",
        description:
          "Authentic South Indian filter coffee — decoction brewed fresh, served in a traditional davara-tumbler set. The perfect morning companion.",
        image: "/images/menu/filter-coffee.jpg",
        imageFallback:
          "https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&q=80",
        badge: "☕ Fan Favourite",
        price: 30,
      },
    ],
  },

  whyChooseUs: {
    heading: "The Swach Difference",
    points: [
      {
        icon: "🌿",
        title: "Fresh Every Day",
        description:
          "Batter ground fresh daily. Chutneys made every morning. No shortcuts, no compromises.",
      },
      {
        icon: "🧹",
        title: "Spotlessly Clean",
        description:
          "Hygiene is in our name — 'Swach' means pure. Our kitchen and dining area are sanitised continuously.",
      },
      {
        icon: "⚡",
        title: "Served Fast",
        description:
          "Our self-service system is efficient and well-managed. Minimal wait, maximum freshness.",
      },
      {
        icon: "💸",
        title: "Pocket-Friendly",
        description:
          "Most dishes under ₹100. Great South Indian food that doesn't cost a fortune.",
      },
      {
        icon: "🏡",
        title: "Homely Ambience",
        description:
          "Breezy, comfortable, and welcoming. Dine-in feels like eating at a friend's place.",
      },
      {
        icon: "🍃",
        title: "Authentic Recipes",
        description:
          "Karnataka-style flavours passed down through tradition. No fusion, no gimmicks.",
      },
    ],
  },

  cta: {
    heading: "Hungry? Let's Fix That.",
    subheading: "Order online and get authentic South Indian food delivered to your doorstep.",
    buttonLabel: "Order Online Now",
    buttonHref: "/menu",
    backgroundImage: "/images/cta-bg.jpg",
    backgroundFallback:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1400&q=80",
  },
};

// ─────────────────────────────────────────────
// 3. MENU DATA
// ─────────────────────────────────────────────

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  imageFallback: string;
  isVeg: boolean;
  tags?: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
};

export const menuCategories = [
  { id: "starters", label: "Starters & Snacks" },
  { id: "breakfast", label: "Breakfast" },
  { id: "dosas", label: "Dosas" },
  { id: "thali", label: "Thali & Meals" },
  { id: "rice", label: "Rice & Curd" },
  { id: "beverages", label: "Beverages" },
  { id: "desserts", label: "Desserts & Sweets" },
];

export const menuItems: MenuItem[] = [
  // ── STARTERS & SNACKS ──
  {
    id: "vada-2pc",
    name: "Vada (2 Pcs) test",
    description: "Crispy medu vada with a soft, fluffy interior. Served with coconut chutney and sambar.",
    price: 40,
    category: "starters",
    image: "/images/food/vada2.png",
    imageFallback: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    isVeg: true,
    tags: ["Bestseller"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "masala-vada-3pc",
    name: "Masala Vada (3 Pcs)",
    description: "Crunchy chana dal fritters packed with onion, green chilli, and curry leaves.",
    price: 50,
    category: "starters",
    image: "/images/food/masala vada 3.webp",
    imageFallback: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "mirchi-bajji-3pc",
    name: "Mirchi Bajji (3 Pcs)",
    description: "Long green chillies dipped in spiced gram flour batter, deep-fried to golden perfection. Pairs beautifully with mint chutney.",
    price: 45,
    category: "starters",
    image: "/images/food/mirchi-bajji.jpg",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: ["Spicy"],
    isAvailable: true,
    isFeatured: true,
  },

  // ── BREAKFAST ──
  {
    id: "idli-2pc",
    name: "Idli (2 Pcs)",
    description: "Steamed rice-lentil cakes, feather-light and fluffy. Served with coconut chutney, groundnut chutney, and sambar.",
    price: 40,
    category: "breakfast",
    image: "/images/food/IDLI-2.jpg",
    imageFallback: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80",
    isVeg: true,
    tags: ["Bestseller"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "ghee-karam-idli-2pc",
    name: "Ghee Karam Idli (2 Pcs)",
    description: "Classic idlis coated in our signature spiced ghee karam powder. Rich, aromatic, and completely irresistible.",
    price: 50,
    category: "breakfast",
    image: "/images/food/GHEE KARAM IDLI.jpg",
    imageFallback: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80",
    isVeg: true,
    tags: ["Chef's Pick", "Bestseller"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "chitti-idli-8pc",
    name: "Chitti Idli Sambhar Dip (8 Pcs)",
    description: "Eight bite-sized mini idlis dunked in rich, flavourful sambar. The dish that keeps you coming back.",
    price: 60,
    category: "breakfast",
    image: "/images/food/Chitti-Sambaridli.jpg",
    imageFallback: "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80",
    isVeg: true,
    tags: ["Must Try"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "idli-vada-combo",
    name: "Idli Vada Combo",
    description: "2 soft idlis + 1 crispy vada — the classic South Indian combo served with coconut chutney, groundnut chutney, and sambar.",
    price: 65,
    category: "breakfast",
    image: "/images/food/idli vada.jpg",
    imageFallback: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    isVeg: true,
    tags: ["Combo"],
    isAvailable: true,
  },
  {
    id: "pongal",
    name: "Pongal",
    description: "Comforting rice-and-moong dal khichdi seasoned with black pepper, cumin, ghee, and curry leaves.",
    price: 55,
    category: "breakfast",
    image: "/images/food/pongal.webp",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "kesari-bath",
    name: "Kesari Bath",
    description: "Semolina halwa cooked with ghee, saffron, sugar, and cardamom. A sweet start to any morning.",
    price: 40,
    category: "breakfast",
    image: "/images/food/kesari bath.webp",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: ["Must Try", "Sweet"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "poori-saagu-3pc",
    name: "Poori Saagu (3 Pcs)",
    description: "Three fluffy deep-fried pooris served with a mildly spiced potato-and-vegetable saagu, coconut chutney, and groundnut chutney.",
    price: 65,
    category: "breakfast",
    image: "/images/food/poori saagu.jpg",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },

  // ── DOSAS ──
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    description: "Our iconic Karnataka-style dosa — thin, crispy, and perfectly golden, filled with spiced potato masala. Served with coconut & groundnut chutney.",
    price: 60,
    category: "dosas",
    image: "/images/food/masala dosa.jpg",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: ["Bestseller", "Must Try"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "ghee-karam-dosa",
    name: "Ghee Karam Dosa",
    description: "A Swach signature — crispy dosa finished with a generous smear of spiced ghee karam powder. Simple, bold, unforgettable.",
    price: 65,
    category: "dosas",
    image: "/images/food/ghee-karam-dosa-.webp",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: ["Chef's Pick", "Bestseller"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "plain-dosa",
    name: "Plain Dosa",
    description: "Classic thin crispy dosa served with coconut chutney, groundnut chutney, and sambar.",
    price: 45,
    category: "dosas",
    image: "/images/food/plain dosa.jpg",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "rava-dosa",
    name: "Rava Dosa",
    description: "Lacy, crispy semolina dosa with a uniquely delicate texture. Served with chutneys.",
    price: 65,
    category: "dosas",
    image: "/images/food/rava-dosa.webp",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "set-dosa-3pc",
    name: "Set Dosa (3 Pcs)",
    description: "Three soft, spongy dosas — lighter and fluffier than a regular dosa. Served with sambar and coconut chutney.",
    price: 60,
    category: "dosas",
    image: "/images/food/set-dosa-3-dosas.webp",
    imageFallback: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },

  // ── THALI & MEALS ──
  {
    id: "mini-thali-parcel",
    name: "Mini Thali (Parcel)",
    description: "A complete South Indian meal: 1 Pulka, 2 Papad, Dal, Fry, Rice Roti Pachadi, Kesari Bath (sweet), Curd Rice, Veg Kurma, Bisi Bele Bath & Veg Pulao.",
    price: 150,
    category: "thali",
    image: "/images/food/mini thali parcel.jpg",
    imageFallback: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    isVeg: true,
    tags: ["Value for Money", "Meal"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "bisi-bele-bath",
    name: "Bisi Bele Bath",
    description: "Karnataka's beloved one-pot comfort food — rice, lentils, and vegetables slow-cooked with a special spice blend and finished with ghee.",
    price: 80,
    category: "thali",
    image: "/images/food/Bisi_Bele_Bath.jpg",
    imageFallback: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    isVeg: true,
    tags: ["Karnataka Special"],
    isAvailable: true,
    isFeatured: true,
  },

  // ── RICE & CURD ──
  {
    id: "curd-rice-small",
    name: "Curd Rice (Small)",
    description: "Cool, creamy curd rice tempered with mustard seeds, curry leaves, and green chilli. The perfect comfort bowl.",
    price: 50,
    category: "rice",
    image: "/images/food/curd rice small.jpg",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "curd-rice-large",
    name: "Curd Rice (Large)",
    description: "Our popular curd rice in a larger portion — garnished with pomegranate and grated ginger.",
    price: 70,
    category: "rice",
    image: "/images/food/curd rice large.jpg",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "veg-pulao",
    name: "Veg Pulao",
    description: "Fragrant basmati rice cooked with mixed vegetables, whole spices, and aromatic herbs.",
    price: 80,
    category: "rice",
    image: "/images/food/Veg-Pulao.jpg",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },

  // ── BEVERAGES ──
  {
    id: "filter-coffee",
    name: "Filter Coffee",
    description: "Authentic South Indian filter coffee — slow-brewed decoction mixed with fresh milk and sugar, served in a traditional davara-tumbler set.",
    price: 30,
    category: "beverages",
    image: "/images/food/indian-filter-coffee.jpg",
    imageFallback: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=600&q=80",
    isVeg: true,
    tags: ["Fan Favourite"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    description: "Strong, spiced tea brewed with ginger, cardamom, and cinnamon. A perfect companion to your dosa.",
    price: 25,
    category: "beverages",
    image: "/images/food/masala chai.jpg",
    imageFallback: "https://images.unsplash.com/photo-1565951151685-c6e1d20a7b98?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "grape-juice",
    name: "Fresh Grape Juice",
    description: "Freshly pressed grape juice — naturally sweet, refreshing, and served chilled.",
    price: 50,
    category: "beverages",
    image: "/images/food/grape juice.jpg",
    imageFallback: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "buttermilk",
    name: "Spiced Buttermilk",
    description: "Thin, cool buttermilk tempered with cumin, curry leaves, and ginger. The best way to end a South Indian meal.",
    price: 30,
    category: "beverages",
    image: "/images/food/Spiced Buttermilk.jpg",
    imageFallback: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },
  {
    id: "fresh-lime-soda",
    name: "Fresh Lime Soda",
    description: "Fizzy fresh lime with a choice of sweet, salted, or masala. Refreshing and zingy.",
    price: 40,
    category: "beverages",
    image: "/images/food/lime soda.jpg",
    imageFallback: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
    isVeg: true,
    tags: [],
    isAvailable: true,
  },

  // ── DESSERTS ──
  {
    id: "kesari-bath-dessert",
    name: "Kesari Bath (Dessert)",
    description: "Semolina-based halwa cooked in ghee with saffron, cashews, and raisins. A classic South Indian sweet.",
    price: 40,
    category: "desserts",
    image: "/images/food/Kesari Bath (Dessert).webp",
    imageFallback: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    isVeg: true,
    tags: ["Sweet", "Must Try"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "pineapple-halwa",
    name: "Pineapple Halwa",
    description: "Unique and delightful pineapple-flavoured halwa — tangy-sweet and rich. A standout on our dessert menu.",
    price: 60,
    category: "desserts",
    image: "/images/food/Pineapple-Halwa.jpg",
    imageFallback: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=600&q=80",
    isVeg: true,
    tags: ["Seasonal", "Must Try"],
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "jackfruit-halwa",
    name: "Jackfruit Halwa",
    description: "Seasonal jackfruit halwa — intensely fragrant and naturally sweet. Only available when jackfruit is in season.",
    price: 60,
    category: "desserts",
    image: "/images/food/Jackfruit Halwa.jpg",
    imageFallback: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=600&q=80",
    isVeg: true,
    tags: ["Seasonal", "Rare"],
    isAvailable: false, // seasonal
    isFeatured: false,
  },
  {
    id: "payasam",
    name: "Rice Payasam",
    description: "Classic South Indian milk pudding with rice, jaggery, cardamom, and a garnish of cashews and raisins.",
    price: 55,
    category: "desserts",
    image: "/images/food/Rice Payasam.jpg",
    imageFallback: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=600&q=80",
    isVeg: true,
    tags: ["Sweet"],
    isAvailable: true,
  },
];

// ─────────────────────────────────────────────
// 4. SPECIALS PAGE DATA
// ─────────────────────────────────────────────
export const specialsPageData = {
  seo: {
    title: "Specials & Chef's Picks | Swach South Indian Cafe Madhapur",
    description:
      "Discover Swach's chef-curated specials — from the legendary Ghee Karam Dosa to seasonal jackfruit halwa. See what's cooking today.",
    keywords: "swach specials, ghee karam dosa, kesari bath, swach chef picks, south indian specials hyderabad",
  },
  heading: "Today's Specials",
  subheading: "Chef-curated picks and seasonal delights you won't find anywhere else.",
  featuredItems: menuItems.filter((item) => item.isFeatured),
  seasonalNote:
    "⚠️ Jackfruit Halwa is available only during jackfruit season (April–June). Ask us when you visit!",
  chefNote:
    '"Every morning I start at 5 AM to make sure the batter is right, the chutneys are fresh, and the first dosa of the day is perfect." — Head Chef, Swach',
};

// ─────────────────────────────────────────────
// 5. REVIEWS DATA
// ─────────────────────────────────────────────
export const reviewsData = {
  averageRating: 4.3,
  totalReviews: 3539,
  platform: "Google Reviews",
  breakdown: {
    5: 68,
    4: 18,
    3: 7,
    2: 4,
    1: 3,
  },
  reviews: [
    {
      id: "r1",
      name: "Ananya Krishnamurthy",
      avatar: "AK",
      rating: 5,
      date: "2 weeks ago",
      text: "Absolutely loved my experience at Swach! The food was incredibly flavorful and authentic — every dish tasted fresh and perfectly spiced. The ambience is warm, clean, and inviting. What really stood out was the service — staff were friendly, attentive, and made sure everything was just right. Highly recommend for anyone craving authentic South Indian cuisine. Will definitely come back! 🙌",
      dish: "Ghee Karam Dosa, Filter Coffee",
    },
    {
      id: "r2",
      name: "Rahul Srinivasan",
      avatar: "RS",
      rating: 5,
      date: "1 month ago",
      text: "Best South Indian breakfast spot in Madhapur, hands down. The Ghee Karam Idli and Ghee Karam Dosa were absolutely yum 😋 — soft, flavorful, and perfectly cooked. The ghee karam creations melt in your mouth. Highly recommend this place for anyone craving authentic delicious South Indian food!",
      dish: "Ghee Karam Idli, Masala Dosa",
    },
    {
      id: "r3",
      name: "Priya Nair",
      avatar: "PN",
      rating: 4,
      date: "3 weeks ago",
      text: "The food was good. Highly recommend you try Kesari Bath, idli, and filter coffee. The whole experience felt great — the place has a traditional and rustic touch to it. The poori saagu was a bit oily, but everything else was spot on. Will revisit for sure.",
      dish: "Kesari Bath, Idli, Filter Coffee",
    },
    {
      id: "r4",
      name: "Vikram Reddy",
      avatar: "VR",
      rating: 5,
      date: "1 week ago",
      text: "Swach took me on a flavorful journey through South India. The Idli and Masala Dosa were perfectly executed — idlis soft and fluffy, dosa perfectly crispy. The coconut and mint chutneys added real depth. Sambar was a perfect blend of spices. And the Mirchi Bajji?! Absolute delight.",
      dish: "Masala Dosa, Idli, Mirchi Bajji",
    },
    {
      id: "r5",
      name: "Sunita Rao",
      avatar: "SR",
      rating: 5,
      date: "2 months ago",
      text: "Hidden gem! Hygiene is top-notch — dining area, kitchen counters, restrooms, everything spotless. Tables are cleaned after every guest. Staff are always present to help despite being a self-service restaurant. The Chitti Idli Sambhar Dip is something else — I ate 2 plates!",
      dish: "Chitti Idli, Vada, Kesari Bath",
    },
    {
      id: "r6",
      name: "Aditya Mehta",
      avatar: "AM",
      rating: 4,
      date: "3 months ago",
      text: "Really enjoyed the Pineapple Halwa — something I'd never seen anywhere else. The Bisi Bele Bath is comfort food at its finest. Prices are very reasonable, perfect for a daily breakfast spot. The self-service system works really well and the wait time is minimal.",
      dish: "Bisi Bele Bath, Pineapple Halwa",
    },
  ],
};

// ─────────────────────────────────────────────
// 6. CONTACT PAGE DATA
// ─────────────────────────────────────────────
export const contactPageData = {
  seo: {
    title: "Contact & Location | Swach South Indian Cafe Madhapur Hyderabad",
    description:
      "Find Swach South Indian Cafe at Madhapur, Hyderabad. Call us at +91 90637 42044. We're open for breakfast (6AM–12PM) and evening (5:30PM–10:30PM).",
    keywords: "swach south indian cafe contact, swach madhapur location, swach hyderabad phone",
  },
  heading: "Visit Us",
  subheading: "We're conveniently located in the heart of Madhapur. Come hungry.",
  address: restaurantInfo.address,
  phone: restaurantInfo.phone,
  email: restaurantInfo.email,
  timings: restaurantInfo.timings,
  googleMapsUrl: restaurantInfo.googleMapsUrl,
  googleMapsEmbed: restaurantInfo.googleMapsEmbed,
  landmarks: [
    "Opposite V Convention",
    "Beside Chase Skating",
    "Near Siddi Vinayak Nagar",
    "Close to HITEC City",
  ],
  parking: "Street parking available. Ola/Uber drop-off convenient.",
  nearbyStops: ["Madhapur Bus Stop", "HITEC City Metro Station (~10 min)"],
  catering: {
    heading: "Catering & Bulk Orders",
    description:
      "Planning an event? We offer catering for small family functions to large corporate gatherings — the same fresh, authentic flavours your guests will love.",
    cta: "Call us at +91 90637 42044 to discuss your requirements.",
  },
};

// ─────────────────────────────────────────────
// 7. SEO / METADATA (Global)
// ─────────────────────────────────────────────
export const globalSEO = {
  siteName: "Swach South Indian Cafe",
  siteUrl: "https://swach.southindiancafe.in", // update with actual domain
  defaultOgImage: "/images/og-default.jpg",
  twitterHandle: "@swachcafe",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Swach South Indian Cafe",
    description:
      "Authentic South Indian cafe in Madhapur, Hyderabad. Known for crispy dosas, fluffy idlis, ghee karam specials, and filter coffee.",
    url: "https://swach.southindiancafe.in",
    telephone: "+91-90637-42044",
    servesCuisine: ["South Indian", "Karnataka"],
    priceRange: "₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot no 4/3-A & B, Siddi Vinayak Nagar, Opp. to V Convention",
      addressLocality: "Madhapur",
      addressRegion: "Telangana",
      postalCode: "500019",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4467,
      longitude: 78.3726,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "06:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "17:30",
        closes: "22:30",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "3539",
    },
  },
};

// ─────────────────────────────────────────────
// 8. IMAGE ASSET MAP
// (Use these paths; replace with actual images in /public/images)
// ─────────────────────────────────────────────
export const imageAssets = {
  // Hero & OG
  heroBg: "/images/hero-bg.jpg",
  ogDefault: "/images/og-default.jpg",
  ogHome: "/images/og-home.jpg",
  ctaBg: "/images/cta-bg.jpg",

  // Restaurant
  interior1: "/images/restaurant-interior.jpg",
  interior2: "/images/restaurant-interior-2.jpg",
  exterior: "/images/restaurant-exterior.jpg",

  // Menu (replace with actual food photos)
  menu: {
    masalaDosa: "/images/menu/masala-dosa.jpg",
    gheeKaramDosa: "/images/menu/ghee-karam-dosa.jpg",
    gheeKaramIdli: "/images/menu/ghee-karam-idli.jpg",
    chittiIdli: "/images/menu/chitti-idli.jpg",
    idliVada: "/images/menu/idli-vada.jpg",
    pongal: "/images/menu/pongal.jpg",
    kesariBath: "/images/menu/kesari-bath.jpg",
    pooriSaagu: "/images/menu/poori-saagu.jpg",
    vada: "/images/menu/vada.jpg",
    masalaVada: "/images/menu/masala-vada.jpg",
    mirchiBajji: "/images/menu/mirchi-bajji.jpg",
    miniThali: "/images/menu/mini-thali.jpg",
    bisiBeleBath: "/images/menu/bisi-bele-bath.jpg",
    curdRice: "/images/menu/curd-rice.jpg",
    filterCoffee: "/images/menu/filter-coffee.jpg",
    masalaChai: "/images/menu/masala-chai.jpg",
    grapeJuice: "/images/menu/grape-juice.jpg",
    buttermilk: "/images/menu/buttermilk.jpg",
    pineappleHalwa: "/images/menu/pineapple-halwa.jpg",
    jackfruitHalwa: "/images/menu/jackfruit-halwa.jpg",
    payasam: "/images/menu/payasam.jpg",
  },
};
