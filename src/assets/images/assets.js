// Furnexa High-Resolution Verified Assets
import logoIcon from './furnexa-logo.png';

// Hero Panoramic Backgrounds (Matching Video Frame 000 & 001)
import heroImg1 from './hero-console-living.jpg'; // Warm Living Room console with blue flowers in gold vase & pendant lights
import heroImg2 from './hero-luxe-sofa.jpg'; // Luxe Sofa with plant & floor lamp
import heroImg3 from './hero-ivory-armchair.jpg'; // Ivory Curve & Armchair Scandinavian living space
import heroImg4 from './hero-minimalist-chair.jpg'; // Minimalist armchair with wood slats

// Category Transparent PNGs (Matching Video Frame 005)
import catLivingRoom from './category-living-sofa.png'; // Living Room Sofa ($2,099 - $5,099)
import catDining from './category-dining-chair.png'; // Dining Chair with wood curved seat ($1,099 - $3,099)
import catOffice from './category-office-swivel.png'; // Office Swivel Boucle Chair ($3,099 - $6,099)
import catBedroom from './product-king-bed.jpg'; // King Size Wood Bed ($2,099 - $9,099)
import catLamps from './category-modern-lamp.jpg'; // Modern Dome Lamp ($1,099 - $6,099)

// Editorial Section 4: Our Story Images (Matching Video Frame 015)
import storyArmchair from './story-sculptural-armchair.png'; // Sculptural mid-century armchair with curved wood
import storyInterior from './story-office-interior.jpg'; // Editorial office interior architectural view

// Promotional Section 5: 50% Off Banner (Matching Video Frame 020)
import promoLeftChair from './category-dining-chair.png'; // Bentwood Terra Chair ($99 / $149.00)
import promoRightInterior from './promo-terra-chair.jpg'; // Studio Dining Chair ($99.00 / $129.00)

// Best Sellers / Product Grid (Matching Video Frame 025)
import prodModernArmchair from './product-modern-armchair.jpg'; // Modern armchair ($2,099)
import prodKingBed from './product-king-bed.jpg'; // King size bed ($3,399)
import prodCozyTable from './product-cozy-table.jpg'; // Cozy table ($1,199)
import prodCupboard from './product-rattan-cupboard.jpg'; // Cupboard rattan doors ($1,500)
import prodHanger from './product-wooden-hanger.jpg'; // Hanger solid wood ($699)
import prodNightstand from './product-luna-nightstand.png'; // Luna Nightstand / Accent piece ($299)
import prodBoucleChair from './product-boucle-armchair.jpg'; // Boucle Armchair ($1,499)
import prodDeskOffice from './product-terra-desk.jpg'; // Terra Desk ($2,499)

// Testimonial Avatars (Matching Video Testimonials)
import avatarEmily from './testimonial-emily.jpg';
import avatarDaniel from './testimonial-daniel.jpg';
import avatarSophia from './testimonial-sophia.jpg';
import avatarAlex from './testimonial-alex.jpg';

// Blog / Editorial Articles (Matching Video Frame 035)
import blogImg1 from './blog-living-spaces.jpg'; // Design styling tips (Living Spaces)
import blogImg2 from './product-terra-desk.jpg'; // Office setup ideas (Office Design)
import blogImg3 from './blog-home-decor.jpg'; // Home decor inspiration (Furniture Guides)

// Community Instagram Feed (Matching Video Frame 035)
import insta1 from './insta-scandinavian-sofa.jpg'; // Scandinavian white 2-seater sofa
import insta2 from './insta-mint-sofa.jpg'; // Mint green contemporary curved sofa
import insta3 from './insta-dining-lounge.jpg'; // Living room with round mirrors & dining
import insta4 from './blog-living-spaces.jpg'; // Warm dining space
import insta5 from './blog-home-decor.jpg'; // Fireplace luxury living room

export const assets = {
  logoIcon,
  hero: [
    {
      id: 1,
      title: "Armchair",
      tagline: "Modern armchair",
      bg: heroImg1,
      desc: "Architectural console with warm rattan details and serene ambiance.",
    },
    {
      id: 2,
      title: "Living Room",
      tagline: "Luxe Sofa",
      bg: heroImg2,
      desc: "Contemporary plush seating designed for refined everyday relaxation.",
    },
    {
      id: 3,
      title: "Sculptural Space",
      tagline: "Ivory Curve",
      bg: heroImg3,
      desc: "Artisanal wooden armchairs blending Scandinavian warmth and modern form.",
    },
    {
      id: 4,
      title: "Lounge Haven",
      tagline: "Minimalist Armchair",
      bg: heroImg4,
      desc: "Elegantly tailored armchairs paired with tactile organic wood accents.",
    },
  ],
  categories: [
    {
      id: 'living-room',
      title: 'Living Room',
      range: '₹2,099 - ₹5,099',
      image: catLivingRoom,
    },
    {
      id: 'dining',
      title: 'Dining',
      range: '₹1,099 - ₹3,099',
      image: catDining,
    },
    {
      id: 'office',
      title: 'Office',
      range: '₹3,099 - ₹6,099',
      image: catOffice,
    },
    {
      id: 'bedroom',
      title: 'Bedroom',
      range: '₹2,099 - ₹9,099',
      image: catBedroom,
    },
    {
      id: 'lamps',
      title: 'Lamps',
      range: '₹1,099 - ₹6,099',
      image: catLamps,
    },
    {
      id: 'armchairs',
      title: 'Armchairs',
      range: '₹1,499 - ₹3,299',
      image: storyArmchair,
    },
    {
      id: 'storage',
      title: 'Storage',
      range: '₹299 - ₹1,500',
      image: prodNightstand,
    },
  ],
  story: {
    armchair: storyArmchair,
    interior: storyInterior,
  },
  promo: {
    leftChair: promoLeftChair,
    rightInterior: promoRightInterior,
  },
  products: [
    {
      id: 1,
      name: "Modern armchair",
      category: "Chairs",
      price: 2099,
      formattedPrice: "₹2,099",
      image: prodModernArmchair,
      rating: 4.9,
      reviews: 42,
      desc: "Curved wool-blend silhouette with tapered matte black oak legs. Engineered for supreme ergonomic comfort.",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "King size bed",
      category: "Beds",
      price: 3399,
      formattedPrice: "₹3,399",
      image: prodKingBed,
      rating: 5.0,
      reviews: 38,
      desc: "Solid Japanese cedar wood slatted headboard and floating base with organic linen bedding upholstery.",
      tag: "Popular",
    },
    {
      id: 3,
      name: "Cozy table",
      category: "Tables",
      price: 1199,
      formattedPrice: "₹1,199",
      image: prodCozyTable,
      rating: 4.8,
      reviews: 29,
      desc: "Round natural oak coffee table with integrated black granite recessed tray and hidden storage cavity.",
      tag: "Featured",
    },
    {
      id: 4,
      name: "Cupboard",
      category: "Storage",
      price: 1500,
      formattedPrice: "₹1,500",
      image: prodCupboard,
      rating: 4.9,
      reviews: 31,
      desc: "Handcrafted four-panel sideboard with natural French cane rattan doors and brass hardware pulls.",
      tag: "New",
    },
    {
      id: 5,
      name: "Hanger",
      category: "Storage",
      price: 699,
      formattedPrice: "₹699",
      image: prodHanger,
      rating: 4.7,
      reviews: 19,
      desc: "Solid steamed beechwood coat hanger set crafted with stainless steel swivel hook and natural satin oil finish.",
      tag: "Essential",
    },
    {
      id: 6,
      name: "Luna Nightstand",
      category: "Storage",
      price: 299,
      formattedPrice: "₹299",
      image: prodNightstand,
      rating: 4.8,
      reviews: 26,
      desc: "Sculptural curved nightstand with soft-close tambour drawer and bevelled solid wood top rim.",
      tag: "Trending",
    },
    {
      id: 7,
      name: "Boucle Swivel Lounge",
      category: "Chairs",
      price: 1499,
      formattedPrice: "₹1,499",
      image: prodBoucleChair,
      rating: 4.9,
      reviews: 33,
      desc: "Cocooning low-profile armchair in textured Italian bouclé with hidden 360-degree silent swivel mechanism.",
      tag: "Staff Pick",
    },
    {
      id: 8,
      name: "Terra Executive Desk",
      category: "Tables",
      price: 2499,
      formattedPrice: "₹2,499",
      image: prodDeskOffice,
      rating: 5.0,
      reviews: 21,
      desc: "Substantial European solid white oak work desk with cable pass-through, dual drawers, and fluted column leg.",
      tag: "Luxury",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Emily K.",
      role: "Architect & Interior Stylist",
      quote: "Our workspace finally feels organized and inspiring. The desk and chair set are sturdy, elegant, and incredibly comfortable for long hours. Highly recommended.",
      avatar: avatarEmily,
      rating: 5,
      project: "Modern Home Office",
    },
    {
      id: 2,
      name: "Daniel R.",
      role: "Creative Director",
      quote: "Beautifully designed furniture that feels premium and comfortable. Our living room looks refined and welcoming now. The quality truly exceeded expectations.",
      avatar: avatarDaniel,
      rating: 5,
      project: "Loft Renovation",
    },
    {
      id: 3,
      name: "Sophia M.",
      role: "Design Enthusiast",
      quote: "Furnexa pieces transformed our home office completely. Thoughtful design, great comfort, and smooth delivery made the entire experience feel effortless.",
      avatar: avatarSophia,
      rating: 5,
      project: "Penthouse Suite",
    },
    {
      id: 4,
      name: "Alex T.",
      role: "Homeowner",
      quote: "Stylish, comfortable, and timeless furniture. Furnexa helped us create a warm, modern home without compromising on quality or functionality.",
      avatar: avatarAlex,
      rating: 5,
      project: "Family Residence",
    },
  ],
  blogs: [
    {
      id: 1,
      title: "Design styling tips",
      category: "Living Spaces",
      readTime: "4 min read",
      date: "Oct 2026",
      summary: "How to harmoniously layer organic wood tones, bouclé textiles, and atmospheric low-level illumination.",
      image: blogImg1,
    },
    {
      id: 2,
      title: "Office setup ideas",
      category: "Office Design",
      readTime: "5 min read",
      date: "Sep 2026",
      summary: "Transforming everyday workstations into ergonomic sanctuaries that stimulate creative clarity and comfort.",
      image: blogImg2,
    },
    {
      id: 3,
      title: "Home décor inspiration",
      category: "Furniture Guides",
      readTime: "6 min read",
      date: "Aug 2026",
      summary: "Curating timeless statement furniture that enriches daily rituals and withstands generational trends.",
      image: blogImg3,
    },
  ],
  instagram: [
    { id: 1, image: insta1, caption: "Quiet mornings in refined comfort." },
    { id: 2, image: insta2, caption: "Sculptural forms in soft sage nuances." },
    { id: 3, image: insta3, caption: "The art of warm minimalism." },
    { id: 4, image: insta4, caption: "Dining experiences crafted to linger." },
    { id: 5, image: insta5, caption: "Grounded spaces anchored by tactile oak." },
  ],
};
