import React, { useEffect, useState } from 'react';
import AnimatedButton from './AnimatedButton';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target date: Dec 13th 2025, 17:00 UTC
  const targetDate = new Date('2025-12-13T17:00:00Z').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Scroll handler for in-page navigation
  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-white dark:bg-[#000000]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-blue-100/40 dark:bg-[#000000] blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-100/30 dark:bg-[#000000] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#02FFCF] border border-white dark:border-[#02FFCF] text-sm font-bold text-black">
              Next Generation Privacy & Programmability
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
            <span className="block mb-4 dark:text-white">Fast. Private. Scalable.</span>
            <span className="block text-xelis-blue">Confidential BlockDAG</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            XELIS is a modern Layer 1 blockDAG, built to prioritize confidentiality, speed, usability, and scalability. By leveraging Homomorphic Encryption, XELIS keeps wallet balances and transaction amounts fully confidential—while maintaining publicly visible addresses. It also introduces advanced features like a high-performance Virtual Machine, powerful smart contracts, and native integration with DeFi.
            <br /><br />Built for the people, by the people.
          </p>

          {/* Countdown Section */}
          <div className="animate-fade-in animate-delay-300 mb-12">
            <div className="inline-block px-8 py-6 rounded-2xl border border-xelis-blue/40 dark:border-xelis-blue/60 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-[0_0_25px_rgba(2,255,207,0.2)] hover:shadow-[0_0_35px_rgba(2,255,207,0.35)] transition-shadow duration-500">
              <h2 className="text-2xl md:text-3xl font-bold text-xelis-blue mb-4">
                Smart Contracts on Mainnet
              </h2>
              <div className="flex justify-center items-center gap-6">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl md:text-5xl font-extrabold text-xelis-blue animate-pulse">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-sm uppercase tracking-widest text-gray-600 dark:text-gray-300">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-400 w-full">
            {/* Start Building */}
            <a
              href="https://playground.xelis.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <AnimatedButton size="lg" className="w-full sm:w-auto">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </a>

            {/* Read Documentation */}
            <a
              href="https://docs.xelis.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <AnimatedButton variant="secondary" size="lg" className="w-full sm:w-auto">
                Read Documentation
              </AnimatedButton>
            </a>

            {/* Buy Xelis */}
            <div className="w-full sm:w-auto">
              <AnimatedButton
                size="lg"
                className="w-full sm:w-auto bg-xelis-blue hover:bg-xelis-dark-blue text-black"
                onClick={() => handleScrollTo('buy')}
              >
                Buy Xelis
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;



