export interface ReservationFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
}

export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString("en-UK", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export const generateTimeSlots = (
  start: number,
  end: number,
  interval: number
) => {
  const timeSlots = [];
  let current = start;

  while (current < end) {
    const hours = Math.floor(current / 60);
    const minutes = current % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    timeSlots.push(timeString);
    current += interval;
  }

  return timeSlots;
};

export const generateDateOptions = (): { value: string; label: string }[] => {
  const options = [];
  const today = new Date();
  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    let label = "";
    if (i === 0) {
      label = "Today";
    } else if (i === 1) {
      label = "Tomorrow";
    } else {
      label = formatShortDate(date);
    }
    options.push({ value: date.toISOString().split("T")[0], label });
  }
  return options;
};
