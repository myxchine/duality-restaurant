"use client";

import React, { useState, useEffect } from "react";

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

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div>
      <p>
        {formatTime(time)} {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;
