import { LinkifiedText } from '@/components/linkified-text';
import { Card, Pill } from '@/components/ui';
import { formatMonthDay } from '@/lib/format';
import type { BriefSnapshot } from '@/lib/types';

export function JobsTab({ brief }: { brief: BriefSnapshot }) {
  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        {brief.jobs.length === 1 ? 'One role on this brief.' : `${brief.jobs.length} roles on this brief.`}
      </p>
      <ul className="mt-4 space-y-3">
        {brief.jobs.map((job) => {
          const bridgeNote = brief.bridge.find((item) => item.date === job.dueDate);
          return (
            <li key={`${job.company}-${job.role}`}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">{job.company}</h2>
                    <p className="mt-1 text-sm text-[#626B78]">{job.role}</p>
                  </div>
                  <Pill tone="mint">{job.stage}</Pill>
                </div>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-[#626B78]">Next</dt>
                    <dd className="mt-1 font-medium leading-5">{job.nextAction}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-[#626B78]">Due</dt>
                    <dd className="mt-1 font-medium tabular-nums">{formatMonthDay(job.dueDate)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-[#626B78]">First paycheck estimate</dt>
                    <dd className="mt-1 font-medium tabular-nums">
                      {formatMonthDay(brief.metrics.firstPayEstimate)}
                    </dd>
                  </div>
                </dl>
                {bridgeNote?.notes ? (
                  <p className="mt-4 border-t border-[#E5E9E7] pt-3 text-sm leading-5 text-[#626B78]">
                    From the bridge: <LinkifiedText text={bridgeNote.notes} />
                  </p>
                ) : null}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
