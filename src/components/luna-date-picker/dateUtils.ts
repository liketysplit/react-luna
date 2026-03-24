import type { LunaDateRangeValue } from "./LunaDatePicker.props";

export function parseDateValue(value?: string) {
  if (!value) {
    return null;
  }

  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatInputDate(value?: string) {
  const date = parseDateValue(value);
  if (!date) {
    return "";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${month}/${day}/${year}`;
}

export function parseInputDate(value?: string) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const match = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const nextDate = new Date(year, month - 1, day);

  if (
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    Number.isNaN(year) ||
    nextDate.getFullYear() !== year ||
    nextDate.getMonth() !== month - 1 ||
    nextDate.getDate() !== day
  ) {
    return null;
  }

  return formatDateValue(nextDate);
}

export function formatDisplayDate(value?: string) {
  const date = parseDateValue(value);
  if (!date) {
    return "";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function formatDisplayRange(value?: LunaDateRangeValue) {
  const start = formatDisplayDate(value?.start);
  const end = formatDisplayDate(value?.end);

  if (start && end) {
    return `${start} - ${end}`;
  }

  if (start) {
    return `${start} -`;
  }

  return "";
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(left: Date | null, right: Date | null) {
  if (!left || !right) {
    return false;
  }

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isBeforeDay(left: Date | null, right: Date | null) {
  if (!left || !right) {
    return false;
  }

  return left.getTime() < right.getTime();
}

export function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) {
    return false;
  }

  const value = date.getTime();
  return value > start.getTime() && value < end.getTime();
}

export function isOutsideLimits(date: Date, min?: string, max?: string) {
  const minDate = parseDateValue(min);
  const maxDate = parseDateValue(max);

  if (minDate && isBeforeDay(date, minDate)) {
    return true;
  }

  if (maxDate && isBeforeDay(maxDate, date)) {
    return true;
  }

  return false;
}

export function buildMonthGrid(visibleMonth: Date) {
  const monthStart = startOfMonth(visibleMonth);
  const monthIndex = monthStart.getMonth();
  const firstWeekday = monthStart.getDay();
  const gridStart = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth(),
    monthStart.getDate() - firstWeekday
  );

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    return {
      date,
      value: formatDateValue(date),
      day: date.getDate(),
      inMonth: date.getMonth() === monthIndex
    };
  });
}
