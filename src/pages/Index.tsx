import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import News from '@/components/News'; // Assuming you have a News component
import Buy from '@/components/Buy';
import Footer from '@/components/Footer';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const GA_MEASUREMENT_ID = "G-8FC9METHBL"; // Replace with your GA ID

// Function to initialize Google Analytics
const initGA = () => {
  if (!window.gtag) {
    // Load the gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    `;
    document.head.appendChild(script2);
  }
};

// Function to track page views
const trackPage = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    // Initialize GA on first load
    initGA();
    trackPage(window.location.pathname);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    // Track page views on route changes (if using React Router)
    const handleRouteChange = () => trackPage(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <Hero />
      <About /> {/* Moved above Features */}
      <Features />
      <News /> {/* Assuming you have a News component */}
      {/* Buy Section */}
      <div id="buy">
        <Buy />
      </div>
      <Footer />

      {/* Scroll to top button */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={cn(
          "fixed right-6 bottom-6 p-3 rounded-full bg-xelis-blue text-black shadow-lg transition-all duration-300 hover:bg-xelis-dark-blue",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;

