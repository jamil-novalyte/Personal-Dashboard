'use client';

import { useMemo, useState } from 'react';
import { Card, ExternalAnchor, Pill, Section, Stat } from '@/components/ui';
import { formatSentAt, formatUsd, hostLabel, showToken, telHref } from '@/lib/format';
import type { BriefSnapshot } from '@/lib/types';

export function NovalyteTab({ brief }: { brief: BriefSnapshot }) {
  const { metrics, clinicPipelineSummary: summary } = brief;
  const [query, setQuery] = useState('');
  const pipelineAgrees =
    metrics.activeProspects === summary.active &&
    metrics.readyToCall === summary.ready_to_call &&
    metrics.imported === summary.imported &&
    metrics.paidSetups === summary.paid &&
    metrics.interested === summary.interested;

  const needle = query.trim().toLowerCase();
  const emailed = useMemo(() => {
    if (!needle) return brief.clinicsEmailedBatch1;
    return brief.clinicsEmailedBatch1.filter((clinic) =>
      `${clinic.name} ${clinic.email} ${clinic.city}`.toLowerCase().includes(needle),
    );
  }, [brief.clinicsEmailedBatch1, needle]);

  const links = [
    { href: metrics.sites.main, label: hostLabel(metrics.sites.main) },
    { href: metrics.sites.clinic, label: hostLabel(metrics.sites.clinic) },
    { href: metrics.sites.investor, label: hostLabel(metrics.sites.investor) },
    { href: metrics.stripePaymentLink, label: `Stripe ${formatUsd(metrics.setupPrice)} setup` },
    { href: metrics.deckSlides, label: 'Pre-seed deck' },
    { href: metrics.sites.gofundme, label: 'GoFundMe' },
  ];

  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        {metrics.raise}. A clinic can claim a free listing, or pay {formatUsd(metrics.setupPrice)} for setup.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat label="Active prospects" value={String(metrics.activeProspects)} />
        <Stat label="Ready to call" value={String(metrics.readyToCall)} />
        <Stat label="Imported" value={String(metrics.imported)} />
        <Stat label="Paid setups" value={String(metrics.paidSetups)} />
        <Stat label="Interested" value={String(metrics.interested)} />
        <Stat label="Batch 1 emails" value={String(metrics.clinicEmailsSentBatch1)} />
      </div>
      {pipelineAgrees ? null : (
        <p className="mt-3 text-sm leading-5 text-[#8A5A12]">
          Pipeline summary differs from the metrics above: {summary.active} active,{' '}
          {summary.ready_to_call} ready to call, {summary.imported} imported, {summary.paid} paid,{' '}
          {summary.interested} interested.
        </p>
      )}

      <Section title="Open these">
        {links.map((link) => (
          <ExternalAnchor key={link.href} href={link.href}>
            {link.label}
          </ExternalAnchor>
        ))}
      </Section>

      <Section title="Guardrails" detail="Say the raise and the price. Leave the rest out.">
        <Card className="border-[#F0E4D4] bg-[#FBF6EE]">
          <ul className="space-y-2">
            {brief.guardrails.map((rule) => (
              <li key={rule} className="text-sm font-medium leading-5 text-[#171D27]">
                {rule}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section
        title="Batch 1 emailed"
        detail={`${brief.clinicsEmailedBatch1.length} clinics. Follow up or call if they have not claimed.`}
      >
        <label className="block">
          <span className="sr-only">Filter emailed clinics</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Clinic or email"
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-[#E5E9E7] bg-white px-4 text-base text-[#171D27] outline-none focus:border-[#009B87]"
          />
        </label>
        {emailed.length === 0 ? (
          <p className="text-sm text-[#626B78]">No clinic on this brief matches that.</p>
        ) : (
          emailed.map((clinic) => (
            <Card key={clinic.email}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-5">{clinic.name}</h3>
                <Pill tone="plain">{showToken(clinic.result)}</Pill>
              </div>
              {clinic.city ? <p className="mt-1 text-sm text-[#626B78]">{clinic.city}</p> : null}
              <p className="mt-2 text-sm leading-5 text-[#626B78]">{clinic.stage}</p>
              <p className="mt-1 text-sm leading-5">{clinic.nextAction}</p>
              <a
                href={`mailto:${clinic.email}`}
                className="mt-3 block break-words text-sm font-semibold text-[#005F58] underline decoration-[#009B87]/40 underline-offset-2"
              >
                {clinic.email}
              </a>
              <p className="mt-2 text-xs tabular-nums text-[#626B78]">{formatSentAt(clinic.sentAt)}</p>
            </Card>
          ))
        )}
      </Section>

      <Section
        id="dial-queue"
        title="Bay Area dial queue"
        detail={`${brief.clinicsDialQueueBayArea.length} clinics marked ready to call.`}
      >
        {brief.clinicsDialQueueBayArea.map((clinic) => (
          <Card key={`${clinic.name}-${clinic.phone}`}>
            <h3 className="font-semibold leading-5">{clinic.name}</h3>
            <p className="mt-1 text-sm text-[#626B78]">
              {clinic.city}, {clinic.state}
            </p>
            <p className="mt-1 text-xs font-medium text-[#626B78]">
              {clinic.stage === 'ready_to_call' ? 'Ready to call' : clinic.stage}
            </p>
            <div className="mt-3 space-y-2">
              <a href={telHref(clinic.phone)} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#009B87] px-4 text-sm font-semibold text-white active:bg-[#005F58]">
                Call {clinic.phone}
              </a>
              {clinic.email ? (
                <a
                  href={`mailto:${clinic.email}`}
                  className="inline-flex min-h-12 w-full items-center justify-center break-words rounded-xl border border-[#E5E9E7] bg-white px-4 text-sm font-semibold text-[#171D27]"
                >
                  {clinic.email}
                </a>
              ) : (
                <p className="text-sm text-[#626B78]">No email on file.</p>
              )}
            </div>
          </Card>
        ))}
      </Section>
    </div>
  );
}
