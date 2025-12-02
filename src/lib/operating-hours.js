export function mapBusinessHoursToByDay(rows) {
  const byDay = Array.from({ length: 7 }, () => ({
    timeSlots: [],
    isClosed: false,
  }));
  for (const row of rows)
    byDay[row.dayOfWeek] = {
      timeSlots: row.timeSlots || [],
      isClosed: !!row.isClosed,
    };
  return byDay;
}

function makeDate(base, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m);
}

export function buildWindows(byDay, date) {
  const dow = date.getDay();
  const prev = new Date(date);
  prev.setDate(date.getDate() - 1);
  const pdow = prev.getDay();
  const windows = [];

  for (const s of byDay[dow]?.timeSlots ?? []) {
    const start = makeDate(date, s.open);
    const endCandidate = makeDate(date, s.close);
    const end =
      endCandidate < start
        ? new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1,
            ...s.close.split(":").map(Number),
          )
        : endCandidate;
    windows.push({ start, end });
  }

  for (const s of byDay[pdow]?.timeSlots ?? []) {
    const startPrev = makeDate(prev, s.open);
    const endPrev = makeDate(prev, s.close);
    if (endPrev < startPrev) {
      const end = makeDate(date, s.close);
      windows.push({ start: startPrev, end });
    }
  }

  return windows;
}
