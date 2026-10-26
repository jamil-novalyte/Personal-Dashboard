import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const tapFocus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009B87]';

export const primaryTap = cn(
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009B87] px-4 py-3 text-center text-sm font-semibold text-white active:bg-[#005F58]',
  tapFocus,
);

export const secondaryTap = cn(
  'inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#E5E9E7] bg-white px-4 py-3 text-center text-sm font-semibold text-[#171D27] active:bg-[#F4F7F6]',
  tapFocus,
);

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn('rounded-2xl border border-[#E5E9E7] bg-white p-4 shadow-sm', className)}>
      {children}
    </article>
  );
}

export function Section({
  id,
  title,
  detail,
  children,
}: {
  id?: string;
  title: string;
  detail?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-8 scroll-mt-4 first:mt-0">
      <h2 className="text-lg font-semibold tracking-tight text-[#171D27]">{title}</h2>
      {detail ? <p className="mt-1 text-sm leading-5 text-[#626B78]">{detail}</p> : null}
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function Pill({
  children,
  tone = 'mint',
}: {
  children: ReactNode;
  tone?: 'mint' | 'ink' | 'warm' | 'plain';
}) {
  const tones = {
    mint: 'bg-[#EAFBF5] text-[#005F58]',
    ink: 'bg-[#171D27] text-white',
    warm: 'bg-[#FBF6EE] text-[#8A5A12]',
    plain: 'bg-[#F4F7F6] text-[#626B78]',
  } as const;

  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone])}>
      {children}
    </span>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E9E7] bg-white px-3 py-3 shadow-sm">
      <p className="text-2xl font-semibold tabular-nums tracking-tight text-[#171D27]">{value}</p>
      <p className="mt-1 text-xs font-medium leading-4 text-[#626B78]">{label}</p>
    </div>
  );
}

export function ExternalAnchor({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={primaryTap}>
      <span>{children}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
