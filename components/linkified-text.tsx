import type { ReactNode } from 'react';
import { telHref } from '@/lib/format';

export function LinkifiedText({ text }: { text: string }) {
  const phone = /\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g;
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(phone)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const raw = match[0];
    nodes.push(
      <a
        key={`${start}-${raw}`}
        href={telHref(raw)}
        className="font-semibold text-[#005F58] underline decoration-[#009B87]/40 underline-offset-2"
      >
        {raw}
      </a>,
    );
    last = start + raw.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
