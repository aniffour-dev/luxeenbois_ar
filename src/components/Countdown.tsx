import React, { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 5,
    minutes: 50,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <>
      <div className="h-1 bg-slate-200 w-full mb-2"></div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mt-4 text-violet-50 text-2xl flex justify-between items-center gap-10">
            <span className="rounded-xl h-10 w-10 text-black uppercase flex justify-center items-center font-black text-2xl">
              {String(days).padStart(2, "0")}d
            </span>
            <span className="text-2xl font-bold text-slate-400 uppercase">:</span>
            <span className="rounded-xl h-10 w-10 text-black uppercase flex justify-center items-center font-black text-2xl">
              {String(hours).padStart(2, "0")}h
            </span>
            <span className="text-2xl font-bold text-slate-400 uppercase">:</span>
            <span className="rounded-xl h-10 w-10 text-black uppercase flex justify-center items-center font-black text-2xl">
              {String(minutes).padStart(2, "0")}m
            </span>
            <span className="text-2xl font-bold text-slate-400 uppercase">:</span>
            <span className="rounded-xl h-10 w-10 text-black uppercase flex justify-center items-center font-black text-2xl">
              {String(seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Countdown;
