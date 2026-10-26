const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Calendar day in an IANA timezone, as YYYY-MM-DD. */
export function calendarDay(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

export function daysBetween(fromDay: string, toDay: string): number {
  const [fromYear, fromMonth, fromDate] = fromDay.split('-').map(Number);
  const [toYear, toMonth, toDate] = toDay.split('-').map(Number);
  const fromUtc = Date.UTC(fromYear, fromMonth - 1, fromDate);
  const toUtc = Date.UTC(toYear, toMonth - 1, toDate);
  return Math.round((toUtc - fromUtc) / 86_400_000);
}

export function relativeDay(fromIso: string, targetDay: string, timeZone: string): string {
  const days = daysBetween(calendarDay(fromIso, timeZone), targetDay.slice(0, 10));
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days > 1) return `in ${days} days`;
  if (days === -1) return 'yesterday';
  return `${Math.abs(days)} days ago`;
}

/** "Nov 3" from a YYYY-MM-DD date. Leaves any other string untouched. */
export function formatMonthDay(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return value;
  return `${MONTHS[month - 1]} ${day}`;
}

/** Replaces ISO dates inside labels such as "now → 2026-11-08". */
export function formatLooseDate(value: string): string {
  return value.replace(/\d{4}-\d{2}-\d{2}/g, (iso) => formatMonthDay(iso));
}

export function formatBriefStamp(iso: string, timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso));
}

/** Clock time in the brief timezone, labeled PT to match the brief. */
export function formatClock(iso: string, timeZone: string): string {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
  return `${formatted} PT`;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "2026-10-19 15:00:12 PDT" → "Oct 19, 3:00 PM PDT". */
export function formatSentAt(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::\d{2})?\s*(.*)$/.exec(value.trim());
  if (!match) return value;
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = match[5];
  const zone = match[6].trim();
  if (month < 1 || month > 12) return value;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${MONTHS[month - 1]} ${day}, ${hour12}:${minute} ${suffix}${zone ? ` ${zone}` : ''}`;
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return `tel:${digits}`;
}

export function firstPhone(text: string): string | null {
  return text.match(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/)?.[0] ?? null;
}

export function showToken(value: string): string {
  if (value === value.toLowerCase() && !value.includes(' ') && value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
}

export function hostLabel(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}
