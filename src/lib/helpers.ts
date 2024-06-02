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
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export const generateTimeSlots = (
  start: number,
  end: number,
  interval: number
): string[] => {
  const timeSlots: string[] = [];
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
  const options: { value: string; label: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 8; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    let label: string;
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

export const generateDateOptionsPlus = (): {
  value: string;
  label: string;
}[] => {
  const options: { value: string; label: string }[] = [];
  const today = new Date();

  for (let i = -5; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    let label: string;
    if (i === 0) {
      label = "Today";
    } else if (i === 1) {
      label = "Tomorrow";
    } else if (i === -1) {
      label = "Yesterday";
    } else {
      label = formatShortDate(date);
    }

    options.push({ value: date.toISOString().split("T")[0], label });
  }

  return options;
};

export const getCurrentTimePlusHour = (addHours: number): string => {
  const now = new Date();
  now.setHours(now.getHours() + addHours);

  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 15) * 15;
  if (roundedMinutes === 60) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  } else {
    now.setMinutes(roundedMinutes);
  }

  return now.toTimeString().substr(0, 5); // Format as "HH:MM"
};

export const isTimeAtLeast30MinutesAway = (
  date: string,
  time: string
): boolean => {
  const now = new Date();
  const selectedDateTime = new Date(`${date}T${time}`);

  const differenceInMinutes =
    (selectedDateTime.getTime() - now.getTime()) / (1000 * 60);

  return differenceInMinutes >= 30;
};
