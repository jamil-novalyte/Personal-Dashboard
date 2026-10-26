import rawBrief from '@/data/real-brief.json';
import type { BriefSnapshot } from './types';

/**
 * BACKEND: Supabase project dpamtdstacxfeqtlbivu
 *   Read prospect_clinics and investor_refs when the overnight job builds the
 *   next BriefSnapshot. clinic_claims is on the same project for listing claims.
 *   Do not query or write that project from this dashboard yet.
 *
 * BACKEND: Hostinger IMAP mailbox admin@novalyteai.com
 *   Overnight can read sent clinic mail and investor drafts from this mailbox.
 *   Planned From address: jamil@novalyteai.com.
 *   This module must not send mail.
 */

function isBriefSnapshot(value: unknown): value is BriefSnapshot {
  if (!value || typeof value !== 'object') return false;
  const brief = value as Record<string, unknown>;
  return (
    typeof brief.generatedAt === 'string' &&
    typeof brief.timezone === 'string' &&
    Array.isArray(brief.topActions) &&
    Array.isArray(brief.doNotDo) &&
    Array.isArray(brief.bridge) &&
    Array.isArray(brief.jobs) &&
    Array.isArray(brief.investors) &&
    Array.isArray(brief.overnight) &&
    Array.isArray(brief.clinicsEmailedBatch1) &&
    Array.isArray(brief.clinicsDialQueueBayArea) &&
    Array.isArray(brief.guardrails) &&
    Array.isArray(brief.investorPasses) &&
    Array.isArray(brief.batch4Drafts) &&
    typeof brief.metrics === 'object' &&
    brief.metrics !== null
  );
}

export async function fetchBrief(): Promise<BriefSnapshot> {
  // BACKEND: Replace this file import with GET /api/brief. That route should
  // return the BriefSnapshot the overnight job last wrote from Supabase
  // project dpamtdstacxfeqtlbivu (prospect_clinics, investor_refs) and from
  // Hostinger IMAP admin@novalyteai.com. Until then, serve the committed seed.
  const snapshot: unknown = structuredClone(rawBrief);
  if (!isBriefSnapshot(snapshot)) {
    throw new Error('data/real-brief.json is not a BriefSnapshot');
  }
  return snapshot;
}

export async function markActionDone(id: string): Promise<void> {
  // BACKEND: PATCH /api/actions/:id on the stored snapshot. Client state only
  // for now — BriefApp applies withActionDone() in the browser. Do not write
  // Supabase project dpamtdstacxfeqtlbivu. Do not send mail from
  // admin@novalyteai.com.
  void id;
}

/** Local-only update. Refresh reloads data/real-brief.json. */
export function withActionDone(brief: BriefSnapshot, id: string): BriefSnapshot {
  return {
    ...brief,
    topActions: brief.topActions.map((action) =>
      action.id === id ? {...action, status: 'done'} : action,
    ),
  };
}
