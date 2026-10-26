'use client';

import { useState } from 'react';
import { Card } from '@/components/ui';
import { formatClock } from '@/lib/format';
import type { BriefSnapshot } from '@/lib/types';

export function SettingsTab({ brief }: { brief: BriefSnapshot }) {
  const [pingNote, setPingNote] = useState<string | null>(null);
  const notes = brief.backendNotes;

  return (
    <div>
      <p className="text-sm leading-5 text-[#626B78]">Nothing on this screen is live yet.</p>

      <Card className="mt-4">
        <h2 className="text-base font-semibold">Clock</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-medium text-[#626B78]">Timezone</dt>
            <dd className="mt-1 font-medium">{brief.timezone}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#626B78]">This brief</dt>
            <dd className="mt-1 font-medium">{formatClock(brief.generatedAt, brief.timezone)}</dd>
          </div>
        </dl>
      </Card>

      <Card className="mt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Morning ping</h2>
            <p className="mt-1 text-sm text-[#626B78]">8:00 AM Pacific. Stub. Not scheduled anywhere.</p>
          </div>
          <span className="rounded-full bg-[#F4F7F6] px-2.5 py-1 text-xs font-semibold text-[#626B78]">
            Stub
          </span>
        </div>
        <button
          type="button"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#E5E9E7] bg-white px-4 text-sm font-semibold"
          onClick={() => setPingNote('Not connected. No ping will be sent.')}
        >
          Try the 8:00 AM stub
        </button>
        {pingNote ? (
          <p role="status" className="mt-3 text-sm font-medium text-[#8A5A12]">
            {pingNote}
          </p>
        ) : null}
      </Card>

      <Card className="mt-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Connected</h2>
          <span className="rounded-full bg-[#FBF1EF] px-3 py-1 text-sm font-semibold text-[#8F3D32]">
            No
          </span>
        </div>
        <p className="mt-2 text-sm leading-5 text-[#626B78]">
          Demo only, until Supabase and the mailbox are wired. This build does not connect, send, or write.
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-medium text-[#626B78]">Supabase project</dt>
            <dd className="mt-1 font-medium">
              <code className="break-all">{notes.supabaseProjectId}</code>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#626B78]">Tables</dt>
            <dd className="mt-1 font-medium">{notes.tables.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#626B78]">Hostinger IMAP</dt>
            <dd className="mt-1 font-medium">{notes.imapMailbox}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-[#626B78]">Planned from address</dt>
            <dd className="mt-1 font-medium">{notes.fromAddress}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
