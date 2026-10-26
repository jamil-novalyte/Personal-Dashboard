export const TABS = [
  'Today',
  'Bridge',
  'Jobs',
  'Novalyte',
  'Investors',
  'Overnight',
  'Settings',
] as const;

export type TabId = (typeof TABS)[number];
