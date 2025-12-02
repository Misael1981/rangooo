// Exemplo conceitual: ajuste se quiser salvar timezone por restaurante
const TZ_OFFSET_MINUTES = -180; // -03:00
function toUTCDate(year, month, day, hour, minute) {
  const utc = Date.UTC(year, month - 1, day, hour, minute);
  return new Date(utc - TZ_OFFSET_MINUTES * 60 * 1000);
}

function buildWindowsForDate(bhByDay, date) {
  const dow = date.getDay(); // 0..6
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate();
  const prev = new Date(date);
  prev.setDate(d - 1);
  const pdow = prev.getDay();
  const windows = [];

  // Dia atual
  for (const slot of bhByDay[dow]?.timeSlots ?? []) {
    const [ho, mo] = slot.open.split(":").map(Number);
    const [hc, mc] = slot.close.split(":").map(Number);
    const start = toUTCDate(y, m, d, ho, mo);
    let end = toUTCDate(y, m, d, hc, mc);
    if (hc < ho || (hc === ho && mc < mo)) {
      // overnight
      const next = new Date(date);
      next.setDate(d + 1);
      end = toUTCDate(
        next.getFullYear(),
        next.getMonth() + 1,
        next.getDate(),
        hc,
        mc,
      );
    }
    windows.push({ start, end });
  }

  // Overnight do dia anterior que invade o atual
  for (const slot of bhByDay[pdow]?.timeSlots ?? []) {
    const [ho, mo] = slot.open.split(":").map(Number);
    const [hc, mc] = slot.close.split(":").map(Number);
    const overnight = hc < ho || (hc === ho && mc < mo);
    if (overnight) {
      const pY = prev.getFullYear(),
        pM = prev.getMonth() + 1,
        pD = prev.getDate();
      const start = toUTCDate(pY, pM, pD, ho, mo);
      const end = toUTCDate(y, m, d, hc, mc); // termina hoje
      windows.push({ start, end });
    }
  }

  return windows;
}
