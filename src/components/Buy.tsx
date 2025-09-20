import React, { useEffect } from "react";

const Buy: React.FC = () => {
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
    <div
      id="buy"
      className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-white dark:bg-[#000000]"
    >
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
                This widget is provided by a{" "}
                <strong>third-party service (LetsExchange.io)</strong>. It is
                not developed, maintained, or endorsed by the Xelis team.
                Please make sure to do your own due diligence and understand the
                risks before proceeding with any transactions.
              </p>
            </div>

            {/* Widget Column */}
            <div className="md:w-1/2 flex justify-center w-full">
              <div className="relative w-full max-w-md h-[450px] sm:h-[490px] md:h-[530px]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow"
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

export default Buy;
