import { LinkifiedText } from '@/components/linkified-text';
import { Card, Pill, Section } from '@/components/ui';
import { formatLooseDate, formatMonthDay, formatUsd, relativeDay } from '@/lib/format';
import type { BridgeMilestone, BriefSnapshot } from '@/lib/types';

const statusLabel: Record<BridgeMilestone['status'], string> = {
  progress: 'In motion',
  pending: 'Waiting',
  complete: 'Done',
};

const statusTone: Record<BridgeMilestone['status'], 'mint' | 'warm' | 'plain'> = {
  progress: 'mint',
  pending: 'warm',
  complete: 'plain',
};

export function BridgeTab({ brief }: { brief: BriefSnapshot }) {
  const { metrics } = brief;
  const upsWhen = relativeDay(brief.generatedAt, metrics.upsOrientationDate, brief.timezone);

  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        Shelter and food come from the bridge until EBT. Keep cash for transit and the phone.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        <Fact label={`UPS orientation ${upsWhen}`} value={formatMonthDay(metrics.upsOrientationDate)} />
        <Fact label="EBT load" value={formatMonthDay(metrics.ebtLoadDate)} />
        <Fact label="First pay (est.)" value={formatMonthDay(metrics.firstPayEstimate)} />
        <Fact label="Cash goal" value={formatUsd(metrics.cashGoal)} />
      </dl>
      <p className="mt-3 text-sm leading-5 text-[#626B78]">
        {metrics.paidSetups} setups paid. Each setup is {formatUsd(metrics.setupPrice)}.
      </p>

      <Section title="Milestones" detail="In the order they need to happen.">
        <ol className="space-y-3">
          {brief.bridge.map((milestone) => (
            <li key={milestone.title}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-5">{milestone.title}</h3>
                  <Pill tone={statusTone[milestone.status]}>{statusLabel[milestone.status]}</Pill>
                </div>
                <p className="mt-2 text-sm font-medium tabular-nums text-[#005F58]">
                  {formatLooseDate(milestone.date)}
                </p>
                {milestone.notes ? (
                  <p className="mt-2 text-sm leading-5 text-[#626B78]">
                    <LinkifiedText text={milestone.notes} />
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E9E7] bg-white px-3 py-3">
      <dt className="text-xs font-medium leading-4 text-[#626B78]">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tabular-nums tracking-tight">{value}</dd>
    </div>
  );
}
