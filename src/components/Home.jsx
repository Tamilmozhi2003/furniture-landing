import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { 
  Search, 
  User, 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Star, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Menu,
  Check,
  Eye
} from 'lucide-react';
import { assets } from '../assets/images/assets';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

// Custom Brand Icons for Socials
const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Scroll-driven Text Scrub / Word Opacity Fill Component (Matching Framer reference)
const ScrollRevealHeadline = ({ text }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 88%", "end 58%"]
  });

  const words = text.split(" ");
  return (
    <h2 ref={targetRef} className="story-large-editorial-heading">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + (1.2 / words.length), 1);
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </h2>
  );
};

const ScrollWord = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [5, 0]);
  return (
    <span className="editorial-word-wrapper">
      <motion.span style={{ opacity, y, display: 'inline-block' }}>
        {children}
      </motion.span>
      <span className="editorial-space">&nbsp;</span>
    </span>
  );
};

// Scroll-driven Parallax Component for the Interior Showcase Card (Top to Bottom glide on scroll)
const EditorialParallaxInterior = ({ src, alt }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // When scrolling down, image translates from top (0%) down to bottom (-28%)
  // At scroll start, top of architectural room is shown; as user scrolls down, desk & chair are revealed
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const y = useSpring(rawY, { stiffness: 100, damping: 26, mass: 0.35 });

  return (
    <div ref={containerRef} className="interior-tall-viewport">
      <motion.img 
        src={src} 
        alt={alt} 
        className="editorial-tall-interior-img"
        style={{ y }}
      />
    </div>
  );
};

// Scroll-driven Fan-out Showcase for Instagram Grid (Cards fan out from behind center card)
const InstagramFanoutShowcase = ({ items }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "center 52%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.4
  });

  // Calculate transforms for each of the 5 cards
  // Card 0 (Far Left): starts behind center (+200% + 36px) -> moves to 0
  const x0 = useTransform(smoothProgress, [0, 1], ["calc(200% + 36px)", "0%"]);
  const rotate0 = useTransform(smoothProgress, [0, 1], [-6, 0]);
  const scale0 = useTransform(smoothProgress, [0, 1], [0.92, 1]);
  const opacity0 = useTransform(smoothProgress, [0, 0.2, 1], [0.2, 0.75, 1]);

  // Card 1 (Mid Left): starts behind center (+100% + 18px) -> moves to 0
  const x1 = useTransform(smoothProgress, [0, 1], ["calc(100% + 18px)", "0%"]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [-3, 0]);
  const scale1 = useTransform(smoothProgress, [0, 1], [0.95, 1]);
  const opacity1 = useTransform(smoothProgress, [0, 0.15, 1], [0.4, 0.85, 1]);

  // Card 2 (Center): stays in place in front
  const scale2 = useTransform(smoothProgress, [0, 0.5, 1], [0.98, 1.02, 1]);

  // Card 3 (Mid Right): starts behind center (-100% - 18px) -> moves to 0
  const x3 = useTransform(smoothProgress, [0, 1], ["calc(-100% - 18px)", "0%"]);
  const rotate3 = useTransform(smoothProgress, [0, 1], [3, 0]);
  const scale3 = useTransform(smoothProgress, [0, 1], [0.95, 1]);
  const opacity3 = useTransform(smoothProgress, [0, 0.15, 1], [0.4, 0.85, 1]);

  // Card 4 (Far Right): starts behind center (-200% - 36px) -> moves to 0
  const x4 = useTransform(smoothProgress, [0, 1], ["calc(-200% - 36px)", "0%"]);
  const rotate4 = useTransform(smoothProgress, [0, 1], [6, 0]);
  const scale4 = useTransform(smoothProgress, [0, 1], [0.92, 1]);
  const opacity4 = useTransform(smoothProgress, [0, 0.2, 1], [0.2, 0.75, 1]);

  const cardStyles = [
    { x: x0, rotate: rotate0, scale: scale0, opacity: opacity0, zIndex: 1 },
    { x: x1, rotate: rotate1, scale: scale1, opacity: opacity1, zIndex: 3 },
    { x: "0%", rotate: 0, scale: scale2, opacity: 1, zIndex: 5 },
    { x: x3, rotate: rotate3, scale: scale3, opacity: opacity3, zIndex: 3 },
    { x: x4, rotate: rotate4, scale: scale4, opacity: opacity4, zIndex: 1 },
  ];

  return (
    <div ref={containerRef} className="insta-grid">
      {items.map((item, idx) => {
        const motionStyle = cardStyles[idx] || {};
        return (
          <motion.div 
            key={item.id} 
            className={`insta-item-box ${idx === 2 ? 'insta-center-card' : ''}`}
            style={motionStyle}
          >
            <img src={item.image} alt={item.caption} loading="lazy" />
            <div className="insta-overlay">
              <Instagram size={24} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Scroll-driven Parallax Category Card (Images scroll into top position and fix in place)
const CategoryParallaxCard = ({ cat, idx, smoothProgress, onCategoryClick }) => {
  // Staggered vertical travel starting from bottom (95px - 140px) up to 0px
  const startOffset = 95 + (idx % 4) * 15;
  const y = useTransform(smoothProgress, [0, 1], [startOffset, 0]);
  const imgY = useTransform(smoothProgress, [0, 1], [35, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 1], [0.35, 0.85, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.93, 1]);

  return (
    <motion.div 
      className="category-card"
      style={{ y, opacity, scale }}
      onClick={() => onCategoryClick(cat)}
    >
      <div className="category-img-box">
        <motion.img 
          src={cat.image} 
          alt={cat.title} 
          draggable="false" 
          loading="lazy" 
          style={{ y: imgY }}
        />
      </div>
      <div className="category-info-box">
        <h3 className="category-name">{cat.title}</h3>
        <span className="category-price-range">{cat.range}</span>
      </div>
    </motion.div>
  );
};

// 3D Flipping Rolling Button (Matching Framer Signature Interaction)
const FlipButton = ({ text, href = "#best-sellers" }) => {
  return (
    <a href={href} className="promo-flip-btn-wrapper">
      <div className="promo-flip-btn-cube">
        <div className="promo-flip-btn-face promo-flip-btn-front">
          <span>{text}</span>
          <ArrowRight size={15} className="promo-btn-arrow" />
        </div>
        <div className="promo-flip-btn-face promo-flip-btn-bottom">
          <span>{text}</span>
          <ArrowRight size={15} className="promo-btn-arrow" />
        </div>
      </div>
    </a>
  );
};

// Reusable Product Card Component with Staggered Entrance & Interactive States
const ProductCard = ({ product, index = 0, onQuickView, onAddToCart, isWishlisted, onToggleWishlist }) => {
  const originalPrice = product.price ? Math.round(product.price * 1.25) : null;
  const formattedOriginalPrice = originalPrice ? `₹${originalPrice.toLocaleString('en-IN')}` : null;

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="product-image-container">
        {product.tag && (
          <span className="product-tag-badge">{product.tag}</span>
        )}
        <button 
          className={`product-wish-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Save to Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? "#e54b4b" : "none"} />
        </button>

        <img src={product.image} alt={product.name} loading="lazy" />

        <div className="product-overlay-actions">
          <button 
            className="quickview-btn"
            onClick={() => onQuickView(product)}
          >
            <Eye size={15} style={{ marginRight: 6 }} /> Quick View
          </button>
          <button 
            className="add-cart-icon-btn"
            onClick={() => onAddToCart(product)}
            title="Add to Bag"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-info-body">
        <span className="product-category-label">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price-row">
          <div className="product-pricing-stack">
            <span className="product-price">{product.formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="product-old-price">{formattedOriginalPrice}</span>
            )}
          </div>
          <div className="product-rating">
            <Star size={14} className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Carousel State
  const [activeHero, setActiveHero] = useState(0);

  // Category Slider Ref & Scroll-driven Parallax
  const categoryScrollRef = useRef(null);
  const categoriesSectionRef = useRef(null);

  const { scrollYProgress: categoriesScrollProgress } = useScroll({
    target: categoriesSectionRef,
    offset: ["start 92%", "center 50%"]
  });

  const smoothCategoriesProgress = useSpring(categoriesScrollProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.5
  });

  // Product Filter & Wishlist State
  const [activeFilter, setActiveFilter] = useState('All');
  const [wishlist, setWishlist] = useState(new Set([1, 4]));

  // Modals & Cart State
  const [cartItems, setCartItems] = useState([
    { ...assets.products[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Stats Counter Animation State
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [countProjects, setCountProjects] = useState(0);
  const [countCustomers, setCountCustomers] = useState(0);
  const [countSatisfaction, setCountSatisfaction] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  // Scroll listener for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero auto-rotation every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % assets.hero.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeHero]);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
      offset: 80,
    });
    AOS.refresh();
  }, []);

  // Stats count-up trigger
  const triggerStatsAnimation = () => {
    if (statsAnimated) return;
    setStatsAnimated(true);

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCountProjects(Math.floor(ease * 12));
      setCountCustomers(Math.floor(ease * 25));
      setCountSatisfaction(Math.floor(ease * 99));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Cart operations
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Handle Luxury Checkout Order Placement
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const orderNumber = 'FNX-' + Math.floor(100000 + Math.random() * 900000);
    const placedItems = [...cartItems];
    const total = cartTotal;

    setOrderSuccessData({
      orderId: orderNumber,
      items: placedItems,
      total: total,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });

    // Reset shopping bag and close drawer
    setCartItems([]);
    setIsCartOpen(false);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Category scroll & mouse drag navigation
  const isCategoryDragging = useRef(false);
  const categoryStartX = useRef(0);
  const categoryScrollLeft = useRef(0);
  const [isCategoryDragActive, setIsCategoryDragActive] = useState(false);

  const handleCategoryMouseDown = (e) => {
    if (!categoryScrollRef.current) return;
    isCategoryDragging.current = true;
    setIsCategoryDragActive(true);
    categoryStartX.current = e.pageX - categoryScrollRef.current.offsetLeft;
    categoryScrollLeft.current = categoryScrollRef.current.scrollLeft;
  };

  const handleCategoryMouseLeave = () => {
    isCategoryDragging.current = false;
    setIsCategoryDragActive(false);
  };

  const handleCategoryMouseUp = () => {
    isCategoryDragging.current = false;
    setIsCategoryDragActive(false);
  };

  const handleCategoryMouseMove = (e) => {
    if (!isCategoryDragging.current || !categoryScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - categoryStartX.current) * 1.5;
    categoryScrollRef.current.scrollLeft = categoryScrollLeft.current - walk;
  };

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filtered Products
  const filteredProducts = activeFilter === 'All' 
    ? assets.products 
    : assets.products.filter(p => p.category === activeFilter);

  // Search Results
  const searchResults = searchQuery.trim() === ''
    ? []
    : assets.products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="furnexa-landing-page">
      
      {/* =========================================================================
          SECTION 1: NAVBAR
         ========================================================================= */}
      <header className={`furnexa-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-brand">
          <span className="brand-logo-text">FURNEXA</span>
        </a>

        <nav className="nav-center-links">
          <a href="#hero" className="nav-link active">Home</a>
          <a href="#categories" className="nav-link">Shop</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#promo" className="nav-link">Offers</a>
          <a href="#best-sellers" className="nav-link">Best Sellers</a>
          <a href="#editorial" className="nav-link">Blog</a>
          <a href="#footer" className="nav-link">Contact</a>
        </nav>

        <div className="nav-actions">
          <button 
            className="nav-icon-btn" 
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search Furniture"
          >
            <Search size={20} />
          </button>
          
          <button 
            className="nav-icon-btn" 
            onClick={() => alert("Account portal is active. Welcome to Furnexa Luxury Client Services.")}
            aria-label="Account"
          >
            <User size={20} />
          </button>

          <button 
            className="nav-icon-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="cart-count-badge">{cartItemCount}</span>
            )}
          </button>

          <button 
            className="nav-icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cart-drawer-header">
                <span className="brand-logo-text">FURNEXA</span>
                <button className="close-drawer-btn" onClick={() => setMobileMenuOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="cart-drawer-items" style={{ gap: '28px', paddingTop: '40px' }}>
                <a href="#hero" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Home</a>
                <a href="#categories" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Shop</a>
                <a href="#promo" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Special Offers</a>
                <a href="#best-sellers" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Best Sellers</a>
                <a href="#about" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>About Us</a>
                <a href="#editorial" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Journal</a>
                <a href="#footer" className="nav-link" style={{ fontSize: '18px' }} onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 2: FULL-SCREEN CINEMATIC HERO
         ========================================================================= */}
      <section id="hero" className="furnexa-hero">
        <div className="hero-bg-container">
          <AnimatePresence>
            <motion.div
              key={assets.hero[activeHero].id}
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${assets.hero[activeHero].bg})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="hero-overlay-gradient" />
        </div>

        <div className="hero-content">
          <motion.div
            key={assets.hero[activeHero].id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hero-subtitle-badge"
          >
            <span>{assets.hero[activeHero].title}</span>
          </motion.div>

          <motion.h1 
            className="hero-brand-oversized"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            FURNEXA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          
          </motion.div>
        </div>

        {/* Hero Slide Tabs / Navigation */}
        <div className="hero-slider-nav">
          {assets.hero.map((slide, idx) => (
            <button
              key={slide.id}
              className={`hero-tab-btn ${activeHero === idx ? 'active' : ''}`}
              onClick={() => setActiveHero(idx)}
            >
              {slide.tagline}
            </button>
          ))}
        </div>
      </section>

      {/* TICKER MARQUEE BAR */}
      <div className="ticker-marquee-bar">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item">Free Shipping Worldwide <span className="ticker-dot" /></span>
              <span className="ticker-item">50% Off This Week <span className="ticker-dot" /></span>
              <span className="ticker-item">New Arrivals Just Dropped <span className="ticker-dot" /></span>
              <span className="ticker-item">Enjoy exclusive deals and discounts <span className="ticker-dot" /></span>
              <span className="ticker-item">Limited Stock Available <span className="ticker-dot" /></span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: SHOP BY CATEGORIES
         ========================================================================= */}
      <section id="categories" ref={categoriesSectionRef} className="categories-section">
        <div className="categories-header-centered">
          <motion.h2 
            className="categories-main-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Shop by categories
          </motion.h2>
        </div>

        <div className="category-slider-wrapper">
          <div 
            className={`category-slider-track ${isCategoryDragActive ? 'dragging' : ''}`}
            ref={categoryScrollRef}
            onMouseDown={handleCategoryMouseDown}
            onMouseLeave={handleCategoryMouseLeave}
            onMouseUp={handleCategoryMouseUp}
            onMouseMove={handleCategoryMouseMove}
          >
            {assets.categories.map((cat, idx) => (
              <CategoryParallaxCard
                key={cat.id}
                cat={cat}
                idx={idx}
                smoothProgress={smoothCategoriesProgress}
                onCategoryClick={(selectedCat) => {
                  if (selectedCat.title === 'Living Room' || selectedCat.title === 'Dining' || selectedCat.title === 'Office' || selectedCat.title === 'Armchairs') {
                    setActiveFilter('Chairs');
                  } else if (selectedCat.title === 'Bedroom') {
                    setActiveFilter('Beds');
                  } else if (selectedCat.title === 'Storage') {
                    setActiveFilter('Storage');
                  } else {
                    setActiveFilter('All');
                  }
                  const el = document.getElementById('best-sellers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          <div className="slider-controls-centered">
            <button 
              className="slider-arrow-btn" 
              onClick={() => scrollCategories('left')}
              aria-label="Previous Category"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="slider-arrow-btn" 
              onClick={() => scrollCategories('right')}
              aria-label="Next Category"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BRAND INTRODUCTION / OUR STORY (TOP-TO-BOTTOM SCROLLING IMAGES)
         ========================================================================= */}
      {/* =========================================================================
          SECTION 3: BRAND INTRODUCTION / OUR STORY (TOP-TO-BOTTOM SCROLLING IMAGES)
         ========================================================================= */}
      <section id="about" className="brand-editorial-section">
        <div className="brand-editorial-container">
          
          {/* Top Giant Headline with Scroll Scrub Text Opacity Fill */}
          <ScrollRevealHeadline text="Find pieces designed to transform your home one room, one moment, one feeling at a time." />

          {/* 2-Column Editorial Grid matching Reference */}
          <div className="editorial-two-column-layout">
            
            {/* Left Column: Story text -> Armchair Card -> Modern Living */}
            <div className="editorial-column-left">
              <div className="editorial-story-intro-block">
                <a href="#about" className="editorial-story-link">OUR STORY &rarr;</a>
                <p className="editorial-story-paragraph">
                  Enhance your indoor and outdoor spaces with our timeless, century-old solid oak beam furniture. Designed to withstand the test of time, our pieces will enrich your daily life now and for generations to come.
                </p>
              </div>

              {/* Armchair Card */}
              <div className="editorial-armchair-card-wrapper">
                <motion.div 
                  className="editorial-armchair-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={assets.story.armchair} 
                    alt="Curved Oak Cane Armchair" 
                    className="editorial-armchair-img" 
                  />
                </motion.div>
              </div>

              {/* Modern Living Text */}
              <motion.div 
                className="editorial-modern-living-block"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="modern-living-title">Modern Living</h3>
                <p className="modern-living-desc">
                  Clean, sculptural sofas and lounge pieces
                </p>
              </motion.div>
            </div>

            {/* Right Column: Quality tag -> Tall Parallax Interior Showcase */}
            <div className="editorial-column-right">
              <div className="editorial-right-tag-wrap">
                <span className="editorial-quality-tag">HIGH QUALITY AND LONG LASTING</span>
              </div>

              <motion.div 
                className="editorial-interior-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <EditorialParallaxInterior 
                  src={assets.story.interior} 
                  alt="Editorial Office Living Space" 
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 50% OFF PROMO / BEST SELLER BANNER WITH 3D BLACK BACKDROP & PARALLAX GLIDE
         ========================================================================= */}
      <section id="promo" className="promo-split-section">
        {/* 3D Black Luxury Sweep Sheet (Extracted directly from Framer: $i / ea) */}
        <motion.div 
          className="promo-3d-bg-sheet"
          initial={{ opacity: 0.8, rotate: 17, rotateY: -90, scale: 0.5 }}
          whileInView={{ opacity: 1, rotate: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.44, 0, 0.56, 1] }}
          style={{ originX: 0.1, originY: 0.5 }}
        />

        <div className="promo-perspective-wrapper">
          <div className="promo-grid-container">
            
            {/* Left Column: Featured Designer Chair (Terra Chair) - Enters from left x: -300 */}
            <motion.div 
              className="promo-side-card terra-card"
              initial={{ opacity: 0, x: -300 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 180, damping: 70, mass: 4, delay: 0.15 }}
            >
              <div className="promo-card-top-header">
                <span className="promo-item-name">Terra Chair</span>
                <div className="promo-item-pricing">
                  <span className="promo-now-price">₹8,499</span>
                  <span className="promo-was-price">₹12,499</span>
                </div>
              </div>
              
              <div className="promo-chair-display">
                {/* Concentric Target Watermark Rings */}
                <div className="promo-target-rings" aria-hidden="true">
                  <div className="target-ring-outer"></div>
                  <div className="target-ring-mid"></div>
                  <div className="target-ring-inner"></div>
                </div>
                {/* Chair Cutout Image with Parallax Gliding Slide (x: 100 -> 0) */}
                <motion.img 
                  src={assets.promo.leftChair} 
                  alt="Terra Chair Limited Offer" 
                  className="promo-terra-img"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 180, damping: 70, mass: 4, delay: 0.35 }}
                />
              </div>
            </motion.div>

            {/* Center Column: Main Promotional Content (Appears Centered on Full Black Section) */}
            <motion.div 
              className="promo-center-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 180, damping: 70, mass: 4, delay: 0.1 }}
            >
              {/* Concentric Ellipse Eye Watermark Graphic */}
              <div className="promo-eye-backdrop" aria-hidden="true">
                <svg className="promo-eye-svg" viewBox="0 0 420 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="210" cy="120" rx="195" ry="95" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" />
                  <ellipse cx="210" cy="120" rx="145" ry="70" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" />
                  <ellipse cx="210" cy="120" rx="90" ry="44" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="1.2" />
                  <ellipse cx="210" cy="120" rx="35" ry="18" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" />
                </svg>
              </div>

              <div className="promo-center-content-inner">
                <span className="promo-badge-outline">LIMITED-TIME OFFER</span>
                <h2 className="promo-huge-discount">50% Off</h2>
                <span className="promo-offer-sub">Select Best Sellers</span>
                <p className="promo-offer-desc">
                  Artisanal seating crafted from solid oak and sculpted for lasting comfort.
                </p>
                <FlipButton text="SHOP DEALS" href="#best-sellers" />
              </div>
            </motion.div>

            {/* Right Column: Studio Dining Chair - Enters from right x: 300 */}
            <motion.div 
              className="promo-side-card dining-card"
              initial={{ opacity: 0, x: 300 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 180, damping: 70, mass: 4, delay: 0.2 }}
            >
              <img 
                src={assets.promo.rightInterior} 
                alt="Dining Chair" 
                className="promo-dining-img" 
              />
              <div className="promo-card-bottom-overlay">
                <h3 className="promo-bottom-title">Dining Chair</h3>
                <div className="promo-bottom-pricing">
                  <span className="promo-bottom-now">₹8,499</span>
                  <span className="promo-bottom-was">₹10,999</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BEST SELLERS PRODUCT COLLECTION
         ========================================================================= */}
      <section id="best-sellers" className="products-section">
        <div className="best-sellers-header-wrap">
          <motion.h2 
            className="best-sellers-main-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Best Sellers
          </motion.h2>

          {/* Filter Pills */}
          <div className="filter-tabs-row">
            {['All', 'Chairs', 'Beds', 'Tables', 'Storage'].map((category) => (
              <button
                key={category}
                className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with Staggered Scroll-Triggered Fade-In Reveal */}
        <div className="products-grid-container">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
              isWishlisted={wishlist.has(product.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BRAND STATISTICS (WHY FROM US)
         ========================================================================= */}
      <section className="brand-stats-section" onMouseEnter={triggerStatsAnimation}>
        <motion.div 
          className="stats-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={triggerStatsAnimation}
        >
          <div className="stats-top-editorial">
            <div>
              <span className="stats-label">Why From Us</span>
              <h2 className="stats-main-title">Trusted by Homeowners</h2>
            </div>
            <div>
              <p className="stats-editorial-desc">
                Experience timeless design, exceptional comfort, and premium craftsmanship crafted to elevate every home and workspace. Each piece is thoughtfully designed to blend beauty and longevity.
              </p>
            </div>
          </div>

          <div className="stats-numbers-grid">
            <div className="stat-item">
              <div className="stat-number-row">
                <span className="stat-counter-value">{countProjects}</span>
                <span className="stat-suffix">k+</span>
              </div>
              <p className="stat-description">
                Completed projects delivered with premium quality and meticulous attention to detail.
              </p>
            </div>

            <div className="stat-item">
              <div className="stat-number-row">
                <span className="stat-counter-value">{countCustomers}</span>
                <span className="stat-suffix">k+</span>
              </div>
              <p className="stat-description">
                Happy customers trusting our modern designs across the country.
              </p>
            </div>

            <div className="stat-item">
              <div className="stat-number-row">
                <span className="stat-counter-value">{countSatisfaction}</span>
                <span className="stat-suffix">%</span>
              </div>
              <p className="stat-description">
                Client satisfaction achieved through exceptional service and warranty.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          SECTION 8: TESTIMONIALS
         ========================================================================= */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <motion.div
            key={activeTestimonial}
            className="testimonial-quote-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="testimonial-quote-text">
              "{assets.testimonials[activeTestimonial].quote}"
            </p>

            <div className="testimonial-author-row">
              <div className="author-avatar">
                <img 
                  src={assets.testimonials[activeTestimonial].avatar} 
                  alt={assets.testimonials[activeTestimonial].name} 
                />
              </div>
              <div className="author-meta">
                <h4 className="author-name">{assets.testimonials[activeTestimonial].name}</h4>
                <span className="author-role">
                  {assets.testimonials[activeTestimonial].role} • {assets.testimonials[activeTestimonial].project}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="testimonial-nav-arrows">
            <button 
              className="t-nav-btn"
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + assets.testimonials.length) % assets.testimonials.length)}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              className="t-nav-btn"
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % assets.testimonials.length)}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: EDITORIAL / BLOGS & COMMUNITY
         ========================================================================= */}
      <section id="editorial" className="editorial-section">
        <div className="editorial-container">
          <div className="section-header-center" data-aos="fade-up">
            <span className="section-super-title">Our Blogs</span>
            <h2 className="section-main-heading">Transform your space today</h2>
            <p className="section-sub-desc">
              Insights, design perspectives, and styling guides from our creative atelier.
            </p>
          </div>

          <div className="blogs-grid">
            {assets.blogs.map((blog, idx) => (
              <article 
                key={blog.id} 
                className="blog-card"
                data-aos="flip-right"
                data-aos-delay={idx * 160}
                data-aos-duration="900"
              >
                <div className="blog-image-box">
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                  <span className="blog-category-tag">{blog.category}</span>
                </div>
                <div className="blog-meta-row">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-summary">{blog.summary}</p>
                <span className="blog-read-more-link">
                  Read Article <ArrowRight size={15} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Community Showcase */}
      <section className="instagram-showcase-section">
        <div className="insta-header">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="insta-handle">
            <Instagram size={20} />
            <span>Follow @furnexa_home</span>
          </a>
        </div>
        <InstagramFanoutShowcase items={assets.instagram} />
      </section>

      {/* Membership Banner */}
      <section className="membership-banner-section">
        <div className="membership-card">
          <div className="membership-text">
            <span className="membership-label">Membership</span>
            <h3 className="membership-title">Unlock savings made just for you</h3>
            <p className="membership-desc">
              Gain exclusive perks, early access to new collections, and member-only bespoke offers.
            </p>
          </div>
          <form className="membership-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="membership-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="membership-btn">
              {newsletterSubscribed ? 'Joined!' : 'Join Now'}
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: LUXURY FOOTER
         ========================================================================= */}
      <footer id="footer" className="furnexa-footer">
        <div className="footer-main-container">
          <div className="footer-top-grid">
            
            {/* Brand Column */}
            <div className="footer-brand-col">
              <span className="footer-brand-logo">FURNEXA</span>
              <p className="footer-brand-desc">
                Premium furniture designed for modern living and inspired workspaces. Handcrafted with generational timber and sustainable fabrics.
              </p>
              <div className="footer-contact-list">
                <a href="mailto:support@furnexa.com" className="footer-contact-item">
                  <div className="contact-icon-bubble"><Mail size={16} /></div>
                  <span>support@furnexa.com</span>
                </a>
                <a href="tel:+18004528392" className="footer-contact-item">
                  <div className="contact-icon-bubble"><Phone size={16} /></div>
                  <span>+1 (800) 452-8392</span>
                </a>
                <div className="footer-contact-item">
                  <div className="contact-icon-bubble"><MapPin size={16} /></div>
                  <span>214 Westwood Avenue, California, USA</span>
                </div>
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="footer-col-heading">Links</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><a href="#hero">Home</a></li>
                <li className="footer-link-item"><a href="#categories">Shop</a></li>
                <li className="footer-link-item"><a href="#about">About Us</a></li>
                <li className="footer-link-item"><a href="#editorial">Blog</a></li>
                <li className="footer-link-item"><a href="#best-sellers">FAQ</a></li>
              </ul>
            </div>

            {/* Categories Column */}
            <div>
              <h4 className="footer-col-heading">Categories</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><a href="#categories">Living Room</a></li>
                <li className="footer-link-item"><a href="#categories">Bedroom</a></li>
                <li className="footer-link-item"><a href="#categories">Office</a></li>
                <li className="footer-link-item"><a href="#categories">Dining</a></li>
                <li className="footer-link-item"><a href="#categories">Lamps</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="footer-col-heading">Support</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item"><a href="#about">Shipping Information</a></li>
                <li className="footer-link-item"><a href="#about">Return & Refund Policy</a></li>
                <li className="footer-link-item"><a href="#about">Privacy Policy</a></li>
                <li className="footer-link-item"><a href="#about">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer-newsletter-col">
              <h4 className="footer-col-heading">Newsletter</h4>
              <p>Receive weekly design digests and private client previews.</p>
              <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="footer-nl-input"
                  required 
                />
                <button type="submit" className="footer-nl-submit" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>

          <div className="footer-bottom-bar">
            <span className="footer-copyright">
              © 2026 Furnexa. All rights reserved.
            </span>

            <div className="footer-social-row">
              <a href="https://instagram.com" className="footer-social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://twitter.com" className="footer-social-icon" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://linkedin.com" className="footer-social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Back to top">
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODALS: CART DRAWER, QUICK VIEW & SEARCH
         ========================================================================= */}

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div 
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cart-drawer-header">
                <h3 className="cart-drawer-title">Shopping Bag ({cartItemCount})</h3>
                <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="cart-drawer-items">
                {cartItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                    <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600 }}>Your bag is empty</p>
                    <p style={{ fontSize: '14px', marginTop: '6px' }}>Discover our timeless pieces in the store.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <span className="cart-item-price">{item.formattedPrice} × {item.quantity}</span>
                      </div>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="cart-drawer-footer">
                  <div className="cart-subtotal-row">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    Checkout Now
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div 
              className="quickview-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setQuickViewProduct(null)}>
                <X size={20} />
              </button>

              <div className="quickview-img-box">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>

              <div className="quickview-details-box">
                <span className="qv-category">{quickViewProduct.category}</span>
                <h3 className="qv-title">{quickViewProduct.name}</h3>
                <span className="qv-price">{quickViewProduct.formattedPrice}</span>
                <p className="qv-desc">{quickViewProduct.desc}</p>
                
                <button 
                  className="qv-add-btn"
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Shopping Bag</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              className="search-modal-box"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={() => setIsSearchOpen(false)}>
                <X size={20} />
              </button>

              <div className="search-input-wrapper">
                <Search size={24} color="#888" />
                <input 
                  type="text"
                  placeholder="Search chairs, beds, tables, storage..."
                  className="search-input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="search-results-list">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div 
                      key={item.id} 
                      className="search-result-item"
                      onClick={() => {
                        setQuickViewProduct(item);
                        setIsSearchOpen(false);
                      }}
                    >
                      <img src={item.image} alt={item.name} className="search-result-img" />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700 }}>{item.name}</h4>
                        <span style={{ fontSize: '13px', color: '#777' }}>{item.category} • {item.formattedPrice}</span>
                      </div>
                      <ArrowRight size={16} color="#aaa" />
                    </div>
                  ))
                ) : searchQuery.trim() !== '' ? (
                  <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No furniture pieces found matching "{searchQuery}".</p>
                ) : (
                  <div style={{ color: '#888', fontSize: '13px', textAlign: 'center', padding: '16px 0' }}>
                    Type to search through our luxury catalog.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Placed Success Modal Popup */}
      <AnimatePresence>
        {orderSuccessData && (
          <motion.div 
            className="modal-backdrop order-success-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOrderSuccessData(null)}
          >
            <motion.div 
              className="order-success-modal"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn" 
                onClick={() => setOrderSuccessData(null)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="order-success-badge-wrapper">
                <div className="order-success-ripple" />
                <div className="order-success-circle">
                  <Check size={38} strokeWidth={2.8} color="#ffffff" />
                </div>
              </div>

              <span className="order-success-tag">ORDER CONFIRMED</span>
              <h3 className="order-success-title">Order Placed Successfully!</h3>
              <p className="order-success-desc">
                Thank you for your order with Furnexa. We’re preparing your bespoke artisanal pieces with the finest craftsmanship.
              </p>

              <div className="order-details-card">
                <div className="order-details-row">
                  <span className="order-detail-label">Order Number</span>
                  <span className="order-detail-val order-id-pill">#{orderSuccessData.orderId}</span>
                </div>
                <div className="order-details-row">
                  <span className="order-detail-label">Date Placed</span>
                  <span className="order-detail-val">{orderSuccessData.date}</span>
                </div>
                <div className="order-details-row">
                  <span className="order-detail-label">Estimated Delivery</span>
                  <span className="order-detail-val">3 – 5 Business Days (Free Express)</span>
                </div>
                <div className="order-details-row order-total-row">
                  <span className="order-detail-label">Total Amount Paid</span>
                  <span className="order-detail-val order-total-val">₹{orderSuccessData.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="order-items-scroll">
                {orderSuccessData.items.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <img src={item.image} alt={item.name} className="order-item-thumbnail" />
                    <div className="order-item-details">
                      <h4 className="order-item-name">{item.name}</h4>
                      <span className="order-item-sub">{item.formattedPrice} • Qty: {item.quantity}</span>
                    </div>
                    <span className="order-item-status-pill">Ready to Pack</span>
                  </div>
                ))}
              </div>

              <button 
                className="order-continue-btn"
                onClick={() => setOrderSuccessData(null)}
              >
                <span>Continue Shopping</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
