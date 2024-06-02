"use client";

import React, { useState, useEffect } from "react";
import ClientOnly from "./clientOnly";

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ClientOnly>
      <div>
        <p>{formatTime(time)}</p>
      </div>
    </ClientOnly>
  );
};

export default Clock;
