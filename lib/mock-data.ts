import { BriefSnapshot } from './types';

export const mockSnapshot: BriefSnapshot = {
  generatedAt: new Date().toISOString(),
  timezone: 'America/Los_Angeles',
  topActions: [
    { id: '1', title: 'Attend UPS Orientation', why: 'Stability/Weekly pay', domain: 'Personal', ctaLabel: 'Open Directions', status: 'todo' },
    { id: '2', title: 'Follow up with Dr. Smith', why: 'Novalyte setup payment', domain: 'Clinic', ctaLabel: 'Email', status: 'todo' },
    { id: '3', title: 'Batch4 Investors Followup', why: 'Pre-seed traction', domain: 'Investor', ctaLabel: 'Review', status: 'todo' },
  ],
  doNotDo: [
    'Check LinkedIn feed',
    'Update website CSS',
    'Email old contacts',
  ],
  bridge: [
    { title: 'Lodging/food bridge', date: 'Now - Nov 3', status: 'progress' },
    { title: 'UPS orientation', date: 'Nov 3', status: 'pending' },
    { title: 'First UPS paycheck', date: 'Nov 13-14', status: 'pending' },
  ],
  jobs: [
    { company: 'UPS', role: 'Driver Helper', stage: 'Hired', nextAction: 'Orientation', dueDate: 'Nov 3' },
    { company: 'Acme Corp', role: 'Robot Operator', stage: 'Applied', nextAction: 'Wait', dueDate: 'TBD' },
  ],
  clinics: [
    { name: 'Downtown Health', city: 'SF', stage: 'Setup Paid', nextAction: 'Onboard' },
    { name: 'Bay Area Family', city: 'Oakland', stage: 'Claimed', nextAction: 'Call' },
  ],
  investors: [
    { firm: 'Sequoia', contact: 'John Doe', stage: 'Sent', lastTouch: 'Oct 24' },
    { firm: 'Looking Glass', contact: 'Jane Smith', stage: 'Pass', lastTouch: 'Oct 23' },
  ],
  overnight: [
    { time: '02:15 AM', summary: 'System health check: All clear', severity: 'info' },
    { time: '04:00 AM', summary: 'Investor tracker: 14 emails queued', severity: 'action' },
  ],
  metrics: {
    clinicSetupsPaid: 1,
    cashGoal: 2250,
    upsOrientationDate: '2026-11-03',
    ebtLoadDate: '2026-11-08',
  },
};
