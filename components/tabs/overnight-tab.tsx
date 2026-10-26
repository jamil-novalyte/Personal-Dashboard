import { Card, Pill } from '@/components/ui';
import { formatClock } from '@/lib/format';
import type { BriefSnapshot } from '@/lib/types';

export function OvernightTab({ brief }: { brief: BriefSnapshot }) {
  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        What the night log actually recorded. A later job will replace this list with the next snapshot.
      </p>
      <ol className="mt-4 space-y-3">
        {brief.overnight.map((event) => (
          <li key={`${event.time}-${event.summary}`}>
            <Card className={event.severity === 'action' ? 'border-[#B7E6DC]' : undefined}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-[#626B78]">
                  {formatClock(event.time, brief.timezone)}
                </p>
                <Pill tone={event.severity === 'action' ? 'mint' : 'plain'}>
                  {event.severity === 'action' ? 'Needs you' : 'Note'}
                </Pill>
              </div>
              <p className="mt-3 text-sm font-medium leading-5">{event.summary}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
