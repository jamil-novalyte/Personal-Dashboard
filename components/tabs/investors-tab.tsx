'use client';

import { useMemo, useState } from 'react';
import { Card, Pill, Section } from '@/components/ui';
import { formatClock } from '@/lib/format';
import type { BriefSnapshot, InvestorPass, InvestorTouch } from '@/lib/types';

function findPass(investor: InvestorTouch, passes: InvestorPass[]): InvestorPass | undefined {
  const firm = investor.firm.trim().toLowerCase();
  if (!firm) return undefined;
  return passes.find((pass) => {
    const name = pass.firm.trim().toLowerCase();
    return firm === name || firm.startsWith(`${name} `);
  });
}

export function InvestorsTab({ brief }: { brief: BriefSnapshot }) {
  const [query, setQuery] = useState('');
  const send = brief.batch4ScheduledSend;
  const byToken = useMemo(
    () => new Map(brief.investors.map((investor) => [investor.token, investor])),
    [brief.investors],
  );
  const batch4Tokens = useMemo(
    () => new Set(brief.batch4Drafts.map((draft) => draft.token)),
    [brief.batch4Drafts],
  );
  const needle = query.trim().toLowerCase();
  const investors = useMemo(() => {
    if (!needle) return brief.investors;
    return brief.investors.filter((investor) => {
      const pass = findPass(investor, brief.investorPasses);
      return `${investor.firm} ${investor.contact} ${investor.email} ${investor.stage} ${pass?.reason ?? ''}`
        .toLowerCase()
        .includes(needle);
    });
  }, [brief.investors, brief.investorPasses, needle]);

  const trackedLabel =
    brief.investors.length === brief.metrics.investorRefs
      ? `${brief.investors.length} tracked`
      : `${brief.investors.length} listed · ${brief.metrics.investorRefs} refs`;

  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        {brief.metrics.raise}. Batch 4 is already on the clock. This screen does not send it.
      </p>

      <Card className="mt-4 border-[#B7E6DC] bg-[#EAFBF5]">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#005F58]">
          {send.status}
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-6 tracking-tight">
          Batch 4 · {formatClock(send.when, brief.timezone)}
        </h2>
        <p className="mt-2 text-sm leading-5 text-[#171D27]">
          {send.count} emails plus {send.attachment}. Folder {send.routineFolder}.
        </p>
        {brief.batch4Drafts.length !== send.count ? (
          <p className="mt-2 text-sm text-[#8A5A12]">
            Draft list has {brief.batch4Drafts.length} files. The schedule says {send.count}.
          </p>
        ) : null}
      </Card>

      <Section
        id="batch4-drafts"
        title="Drafts to review"
        detail="Already scheduled. Open the investor page if you want the tracked link. Nothing sends from here."
      >
        {brief.batch4Drafts.map((draft) => {
          const investor = byToken.get(draft.token);
          const name = investor?.firm.trim() || investor?.contact || draft.to;
          return (
            <Card key={draft.file}>
              <p className="text-xs font-medium text-[#626B78]">{draft.file}</p>
              <h3 className="mt-1 font-semibold leading-5">{name}</h3>
              <p className="mt-1 break-words text-sm text-[#626B78]">{draft.to}</p>
              <p className="mt-2 text-sm leading-5">{draft.subject}</p>
              {investor ? (
                <a
                  href={investor.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#005F58] underline decoration-[#009B87]/40 underline-offset-2"
                >
                  Their page
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </Card>
          );
        })}
      </Section>

      <Section title="Passes" detail="Recorded separately. Their tracker stage is still whatever the list says.">
        {brief.investorPasses.map((pass) => (
          <Card key={`${pass.firm}-${pass.contact}`} className="border-[#F0E4D4] bg-[#FBF6EE]">
            <h3 className="font-semibold">{pass.firm}</h3>
            <p className="mt-1 text-sm text-[#626B78]">{pass.contact}</p>
            <p className="mt-2 text-sm font-medium">{pass.reason}</p>
          </Card>
        ))}
      </Section>

      <Section title="Tracked" detail={trackedLabel}>
        <label className="block">
          <span className="sr-only">Filter investors</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Firm, name, or email"
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-[#E5E9E7] bg-white px-4 text-base text-[#171D27] outline-none focus:border-[#009B87]"
          />
        </label>
        {investors.length === 0 ? (
          <p className="text-sm text-[#626B78]">No one on this brief matches that.</p>
        ) : (
          investors.map((investor) => {
            const pass = findPass(investor, brief.investorPasses);
            const title = investor.firm.trim() || investor.contact;
            const subtitle = investor.firm.trim() ? investor.contact : null;
            return (
              <Card key={investor.token}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-5">{title}</h3>
                  <Pill tone="plain">{investor.stage}</Pill>
                </div>
                {subtitle ? <p className="mt-1 text-sm text-[#626B78]">{subtitle}</p> : null}
                <a
                  href={`mailto:${investor.email}`}
                  className="mt-2 block break-words text-sm font-medium text-[#005F58]"
                >
                  {investor.email}
                </a>
                {pass ? (
                  <p className="mt-2 text-sm font-medium text-[#8A5A12]">Pass on file: {pass.reason}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={investor.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center rounded-xl bg-[#EAFBF5] px-3 text-sm font-semibold text-[#005F58]"
                  >
                    Their page
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {batch4Tokens.has(investor.token) ? <Pill tone="mint">Batch 4</Pill> : null}
                  {pass ? <Pill tone="warm">Pass</Pill> : null}
                </div>
              </Card>
            );
          })
        )}
      </Section>
    </div>
  );
}
