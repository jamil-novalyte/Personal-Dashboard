# Command Brief

Personal morning dashboard for Jamil Yakasai at Novalyte AI. It is phone-first. Clinics, investors, metrics, and dates come from `data/real-brief.json`. The screen does not invent a second list.

## Run

```bash
npm install
npm run dev
npm run build
```

## Where the brief comes from

`fetchBrief()` in `lib/api.ts` imports `data/real-brief.json` and returns it as a `BriefSnapshot`. That file is the seed checked against the investor link list, the batch 4 drafts, and the batch 1 sent log. Those spreadsheets are not read at runtime.

Marking a Today action done calls `markActionDone()`. That function does not persist. `BriefApp` then applies `withActionDone()` in React state. Refresh loads the JSON again.

This build does not send email and does not connect to Supabase or the mailbox.

## How overnight will overwrite the snapshot

A later night job replaces the committed seed. The dashboard should keep reading one `BriefSnapshot`, not a hardcoded clinic or investor list.

1. Read clinic and investor rows from Supabase project `dpamtdstacxfeqtlbivu`. The tables named on the snapshot are `prospect_clinics`, `clinic_claims`, and `investor_refs`.
2. Read mailbox state over Hostinger IMAP for `admin@novalyteai.com` (sent clinic mail and investor drafts). Keep credentials out of this repo. The planned From address is `jamil@novalyteai.com`.
3. Write a new `BriefSnapshot` with the same shape as `data/real-brief.json`.
4. Point `fetchBrief()` at `GET /api/brief`, which returns the snapshot the job last wrote.
5. Point `markActionDone()` at `PATCH /api/actions/:id` on that stored snapshot.

Until those steps exist, the app serves the committed JSON. Replacing that file, or replacing the response from `/api/brief`, is the overwrite. Settings stays **Connected: No** until that backend is real. The 8:00 AM morning ping is a stub and does not send.

## Copy

Outreach language on this brief is the pre-seed $150K raise, a free listing, and a $750 setup. Guardrail lines in the Novalyte tab are rules about what not to say. Do not turn them into product claims.
