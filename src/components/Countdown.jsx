import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const launchDate = new Date('2026-01-01T00:00:00').getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-royalty text-luxury-silver mb-8 text-center">
          Launching January 2026
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="text-center"
          >
            <div className="bg-regal-purple/20 border border-luxury-silver/20 p-6 md:p-8 min-w-[80px] md:min-w-[120px]">
              <div className="text-4xl md:text-6xl font-royalty font-bold text-luxury-silver mb-2">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base text-luxury-silver/70 uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
