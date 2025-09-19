import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const BuyWidget: React.FC = () => {
  // Load LetsExchange widget script once when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://letsexchange.io/init_widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-white dark:bg-[#000000]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-blue-100/40 dark:bg-[#000000] blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-100/30 dark:bg-[#000000] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

            {/* Text Column */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#02FFCF] border border-white dark:border-[#02FFCF] text-sm font-bold text-black">
                  Buy Xelis
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="block mb-2 dark:text-white">Purchase Xelis</span>
                <span className="block text-xelis-blue">via LetsExchange</span>
              </h1>

              <p className="text-md md:text-lg text-gray-600 dark:text-white">
                This widget is provided by a <strong>third-party service (LetsExchange.io)</strong>.  
                It is not developed, maintained, or endorsed by the Xelis team.  
                Please make sure to do your own due diligence and understand the
                risks before proceeding with any transactions.
              </p>
            </div>

            {/* Widget Column */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md" style={{ paddingTop: "100%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://letsexchange.io/v2/widget?affiliate_id=0EJubVqWb68EJYIN&is_iframe=true"
                  frameBorder={0}
                  allow="clipboard-read; clipboard-write"
                  title="LetsExchange Widget"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Exchanges = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exchanges = [
    {
      name: "MEXC Global",
      logo: "/uploads/mexc.png",
      url: "https://www.mexc.com/exchange/XEL_USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["High liquidity", "Mobile app", "1000s of trading pairs"]
    },
    {
      name: "CoinEx",
      logo: "/uploads/coinex.png",
      url: "https://www.coinex.com/exchange/xel-usdt",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["Low Fees", "Wide Asset Pairs", "Spot Trading"]
    },
    {
      name: "Biconomy",
      logo: "/uploads/biconomy.png",
      url: "https://www.biconomy.com/exchange/XEL_USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["USA Friendly", "Simple interface", "Low fees"]
    },
    {
      name: "BIT",
      logo: "/uploads/bit.png",
      url: "https://www.bit.com/spot?pair=XEL-USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["Mobile App", "Alt Coins", "Institutional Services"]
    },
    {
      name: "NonKYC",
      logo: "/uploads/nonkyc.png",
      url: "https://nonkyc.io/market/XEL_USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["KYC Not Required", "Easy to Use", "Low Fees"]
    },
    {
      name: "SafeTrade",
      logo: "/uploads/safetrade.png",
      url: "https://safetrade.com/exchange/XEL-USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["PoW Projects", "Alt Coins", "No KYC Required"]
    },
    {
      name: "Exbitron",
      logo: "/uploads/exbitron.png",
      url: "https://exbitron.com/trade?market=XEL-USDT",
      pairs: ["XEL-USDT"],
      type: "Centralized",
      features: ["PoW Projects", "No KYC Required", "Low fees"]
    },
    {
      name: "Trocador",
      logo: "/uploads/trocador.png",
      url: "https://trocador.app/en/?ref=1JXff8w6Gx&ticker_to=xel",
      pairs: ["Many"],
      type: "Swap",
      features: ["No KYC required", "Many Pairs", "In-Wallet Swaps"]
    },
    {
      name: "Swapter.io",
      logo: "/uploads/swapter.jpg",
      url: "https://swapter.io/",
      pairs: ["Many"],
      type: "Swap",
      features: ["Many Pairs", "Simple interface", "Aggregator"]
    },
    {
      name: "Exolix",
      logo: "/uploads/exolix.png",
      url: "https://exolix.com/currencies/xel",
      pairs: ["Many"],
      type: "Swap",
      features: ["Many Pairs", "Simple interface", "Aggregator"]
    },
    {
      name: "LetsExchange",
      logo: "/uploads/letsexchange.png",
      url: "https://letsexchange.io/coin/xel",
      pairs: ["Many"],
      type: "Swap",
      features: ["Many Pairs", "Simple interface", "Aggregator"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center dark:text-white mb-6">XELIS Exchanges</h1>
          <p className="text-lg text-gray-600 dark:text-white text-center max-w-3xl mx-auto">
            Buy, sell, and trade XELIS on these supported cryptocurrency exchanges.
            Choose the platform that best suits your trading needs.
          </p>
        </div>
      </section>

      {/* Exchanges Grid Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exchanges.map(exchange => (
              <div key={exchange.name} className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg group">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <img 
                        src={exchange.logo} 
                        alt={`${exchange.name} logo`}
                        className="h-8 w-8 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{exchange.name}</h3>
                      <span className="text-sm text-gray-500">{exchange.type} Exchange</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Trading Pairs</h4>
                    <div className="flex flex-wrap gap-2">
                      {exchange.pairs.map(pair => (
                        <span key={pair} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{pair}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Features</h4>
                    <ul className="space-y-1">
                      {exchange.features.map((feature, i) => (
                        <li key={i} className="text-gray-700 text-sm flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-xelis-blue mr-2 mt-1.5"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href={exchange.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-xelis-blue text-white py-3 rounded-lg font-medium group-hover:bg-xelis-dark-blue transition-colors"
                  >
                    Trade XELIS
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto mb-8">
              The XELIS team is working continuously to expand exchange listings. 
              More trading options will be added as the project grows. All exchanges are run by third parties and you must assess the risk of using them.
              <br />
              <br />
              Reminder: Not your Keys, not your crypto. 
              <br />
              Always hold your XELIS in a wallet and not on exchanges!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="/resources" className="button-secondary">Get a Wallet</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Guide Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center dark:text-white mb-12">How to Trade XELIS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-xelis-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-xelis-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up for an account on your preferred exchange that lists XELIS. Complete any required verification steps.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-xelis-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-xelis-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Deposit Funds</h3>
              <p className="text-gray-600">
                Deposit BTC, USDT, or other supported currencies to your exchange account to use for trading.
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-xelis-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-xelis-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Trade XELIS</h3>
              <p className="text-gray-600">
                Navigate to the XELIS trading pair, enter your desired amount, and complete your purchase or sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buy Widget Section */}
      <BuyWidget />

      <Footer />

      {/* Scroll to top button */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={cn(
          "fixed right-6 bottom-6 p-3 rounded-full bg-xelis-blue text-white shadow-lg transition-all duration-300 hover:bg-xelis-dark-blue",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Exchanges;
