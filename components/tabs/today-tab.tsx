import { LinkifiedText } from '@/components/linkified-text';
import { Card, Pill, primaryTap, secondaryTap } from '@/components/ui';
import { firstPhone, telHref } from '@/lib/format';
import type { TabId } from '@/lib/tabs';
import type { ActionItem, BriefSnapshot } from '@/lib/types';

const domainTone = {
  Job: 'mint',
  Personal: 'warm',
  Investor: 'ink',
  Clinic: 'mint',
} as const;

function destination(action: ActionItem): { tab: TabId; anchor?: string } {
  if (action.domain === 'Investor') return { tab: 'Investors', anchor: 'batch4-drafts' };
  if (action.domain === 'Job') return { tab: 'Jobs' };
  if (action.domain === 'Clinic') return { tab: 'Novalyte' };
  return { tab: 'Bridge' };
}

export function TodayTab({
  brief,
  pendingId,
  onDone,
  onNavigate,
}: {
  brief: BriefSnapshot;
  pendingId: string | null;
  onDone: (id: string) => void;
  onNavigate: (tab: TabId, anchor?: string) => void;
}) {
  const actions = brief.topActions.slice(0, 3);

  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">
        Three things worth doing. The rest of the list can wait.
      </p>

      <ol className="mt-4 space-y-3">
        {actions.map((action, index) => {
          const phone = firstPhone(action.ctaLabel);
          const done = action.status === 'done';
          const target = destination(action);

          return (
            <li key={action.id}>
              <Card className={done ? 'opacity-70' : undefined}>
                <div className="flex items-center justify-between gap-3">
                  <Pill tone={domainTone[action.domain]}>
                    {index + 1} · {action.domain}
                  </Pill>
                  <Pill tone={done ? 'mint' : 'plain'}>
                    {done ? 'Done' : action.status === 'doing' ? 'Doing' : 'To do'}
                  </Pill>
                </div>
                <h2 className="mt-3 text-lg font-semibold leading-6 tracking-tight text-[#171D27]">
                  {action.title}
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#626B78]">{action.why}</p>
                <div className="mt-4 space-y-2">
                  {phone ? (
                    <a href={telHref(phone)} className={primaryTap}>
                      {action.ctaLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={primaryTap}
                      onClick={() => onNavigate(target.tab, target.anchor)}
                    >
                      {action.ctaLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    className={secondaryTap}
                    disabled={done || pendingId === action.id}
                    onClick={() => onDone(action.id)}
                  >
                    {done ? 'Done' : 'Mark done'}
                  </button>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Leave these alone</h2>
        <ul className="mt-3 space-y-2">
          {brief.doNotDo.map((item) => (
            <li key={item}>
              <Card className="border-[#F0E4D4] bg-[#FBF6EE]">
                <p className="text-sm font-medium leading-5 text-[#171D27]">
                  <LinkifiedText text={item} />
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-4 text-xs leading-5 text-[#626B78]">
        Marking done stays on this screen until you refresh. Nothing is saved yet.
      </p>
    </div>
  );
}
