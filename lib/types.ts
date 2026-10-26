export interface ActionItem {
  id: string;
  title: string;
  why: string;
  domain: 'Job' | 'Clinic' | 'Investor' | 'Personal';
  ctaLabel: string;
  status: 'todo' | 'doing' | 'done';
}

export interface BridgeMilestone {
  title: string;
  date: string;
  status: 'pending' | 'progress' | 'complete';
}

export interface JobApplication {
  company: string;
  role: string;
  stage: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  nextAction: string;
  dueDate: string;
}

export interface ClinicDeal {
  name: string;
  city: string;
  stage: 'Listed' | 'Claimed' | 'Called' | 'Setup Paid' | 'Live Leads';
  nextAction: string;
}

export interface InvestorTouch {
  firm: string;
  contact: string;
  stage: 'Sent' | 'Draft' | 'Interested' | 'Pass';
  lastTouch: string;
}

export interface OvernightEvent {
  time: string;
  summary: string;
  severity: 'info' | 'action';
}

export interface BriefSnapshot {
  generatedAt: string;
  timezone: string;
  topActions: ActionItem[];
  doNotDo: string[];
  bridge: BridgeMilestone[];
  jobs: JobApplication[];
  clinics: ClinicDeal[];
  investors: InvestorTouch[];
  overnight: OvernightEvent[];
  metrics: {
    clinicSetupsPaid: number;
    cashGoal: number;
    upsOrientationDate: string;
    ebtLoadDate: string;
  };
}
