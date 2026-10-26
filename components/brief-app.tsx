'use client';

import { useEffect, useRef, useState } from 'react';
import { BridgeTab } from '@/components/tabs/bridge-tab';
import { InvestorsTab } from '@/components/tabs/investors-tab';
import { JobsTab } from '@/components/tabs/jobs-tab';
import { NovalyteTab } from '@/components/tabs/novalyte-tab';
import { OvernightTab } from '@/components/tabs/overnight-tab';
import { SettingsTab } from '@/components/tabs/settings-tab';
import { TodayTab } from '@/components/tabs/today-tab';
import { tapFocus } from '@/components/ui';
import { markActionDone, withActionDone } from '@/lib/api';
import { formatBriefStamp, formatMonthDay, relativeDay } from '@/lib/format';
import { TABS, type TabId } from '@/lib/tabs';
import type { BriefSnapshot } from '@/lib/types';
import { cn } from '@/lib/utils';

export function BriefApp({ initialBrief }: { initialBrief: BriefSnapshot }) {
  const [brief, setBrief] = useState(initialBrief);
  const [tab, setTab] = useState<TabId>('Today');
  const [anchor, setAnchor] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.getElementById(`tab-${tab}`)?.scrollIntoView({
      inline: 'nearest',
      block: 'nearest',
    });
    const node = scrollerRef.current;
    if (!node) return;
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
      return;
    }
    node.scrollTo({ top: 0 });
  }, [tab, anchor]);

  function selectTab(next: TabId, nextAnchor?: string) {
    setTab(next);
    setAnchor(nextAnchor ?? null);
  }

  async function handleDone(id: string) {
    setPendingId(id);
    try {
      await markActionDone(id);
      setBrief((current) => withActionDone(current, id));
    } finally {
      setPendingId(null);
    }
  }

  const top = brief.topActions.slice(0, 3);
  const open = top.filter((action) => action.status !== 'done').length;
  const openLabel = open === 0 ? `All ${top.length} done` : `${open} open`;
  const ups = relativeDay(brief.generatedAt, brief.metrics.upsOrientationDate, brief.timezone);
  const headerLine = `${formatBriefStamp(brief.generatedAt, brief.timezone)} · ${openLabel} · UPS ${ups}`;
  const summary = `${open} open · ${brief.metrics.paidSetups} paid setups · UPS ${formatMonthDay(brief.metrics.upsOrientationDate)} · EBT ${formatMonthDay(brief.metrics.ebtLoadDate)}`;

  return (
    <main className="mx-auto flex h-full min-h-0 w-full max-w-lg flex-col">
      <header className="border-b border-[#E5E9E7] bg-[#FAF9F6]/95 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#005F58]">Novalyte AI</p>
        <h1 className="text-2xl font-bold tracking-tight text-[#171D27]">Command Brief</h1>
        <p className="mt-1 text-sm text-[#626B78]">{headerLine}</p>
      </header>

      <nav aria-label="Brief sections" className="scroll-tabs flex gap-2 overflow-x-auto border-b border-[#E5E9E7] bg-white px-4 py-3">
        {TABS.map((item) => {
          const selected = item === tab;
          return (
            <button
              key={item}
              id={`tab-${item}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="brief-panel"
              onClick={() => selectTab(item)}
              className={cn(
                'min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold',
                tapFocus,
                selected ? 'bg-[#009B87] text-white' : 'bg-[#EAFBF5] text-[#005F58]',
              )}
            >
              {item}
            </button>
          );
        })}
      </nav>

      {tab === 'Today' ? (
        <p
          aria-live="polite"
          className="border-b border-[#E5E9E7] bg-[#EAFBF5] px-4 py-2.5 text-sm font-medium text-[#005F58]"
        >
          {summary}
        </p>
      ) : null}

      <section
        id="brief-panel"
        ref={scrollerRef}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
      >
        {tab === 'Today' ? (
          <TodayTab brief={brief} pendingId={pendingId} onDone={handleDone} onNavigate={selectTab} />
        ) : null}
        {tab === 'Bridge' ? <BridgeTab brief={brief} /> : null}
        {tab === 'Jobs' ? <JobsTab brief={brief} /> : null}
        {tab === 'Novalyte' ? <NovalyteTab brief={brief} /> : null}
        {tab === 'Investors' ? <InvestorsTab brief={brief} /> : null}
        {tab === 'Overnight' ? <OvernightTab brief={brief} /> : null}
        {tab === 'Settings' ? <SettingsTab brief={brief} /> : null}
      </section>

      <footer className="border-t border-[#E5E9E7] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-xs leading-5 text-[#626B78]">
        Seeded from the real brief. Overnight will replace it once the backend is connected.
      </footer>
    </main>
  );
}
