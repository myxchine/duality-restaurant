"use client";

import React, { useState, useEffect } from "react";

interface ClockProps {
  targetTime: string;
}

const Time: React.FC<ClockProps> = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date(targetTime);
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeRemaining(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      } else {
        setTimeRemaining("00:00:00");
      }
    };

    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return <span>{timeRemaining}</span>;
};

export default Time;
