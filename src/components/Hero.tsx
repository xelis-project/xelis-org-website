
import React from 'react';
import AnimatedButton from './AnimatedButton';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-white dark:bg-[#000000]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full bg-blue-100/40 dark:bg-[#000000] blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-100/30 dark:bg-[#000000] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-fade-in">
            <span className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-[#02FFCF] border border-white dark:border-[#02FFCF] text-sm font-bold text-black">
              Next Generation Privacy & Programmability
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
            <span className="block mb-4 dark:text-white">Fast. Private. Scalable.</span>
            <span className="block text-xelis-blue">Confidential BlockDAG</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            XELIS is a modern Layer 1 blockDAG, built to prioritize confidentiality, speed, usability, and scalability. By leveraging Homomorphic Encryption, XELIS keeps wallet balances and transaction amounts fully confidential—while maintaining publicly visible addresses. It also introduces advanced features like a high-performance Virtual Machine, powerful smart contracts, and native integration with DeFi.
            <br />
            <br />Built for the people, by the people.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
            <a href="https://playground.xelis.io" target="_blank" rel="noopener noreferrer">
              <AnimatedButton size="lg" className="w-full sm:w-auto">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </a>
            <a href="https://docs.xelis.io" target="_blank" rel="noopener noreferrer">
              <AnimatedButton variant="secondary" size="lg" className="w-full sm:w-auto">
                Read Documentation
              </AnimatedButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
