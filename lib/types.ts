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
  notes?: string;
}

export interface JobApplication {
  company: string;
  role: string;
  stage: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  nextAction: string;
  dueDate: string;
}

export interface EmailedClinic {
  name: string;
  city: string;
  stage: string;
  nextAction: string;
  email: string;
  sentAt: string;
  result: string;
}

export interface DialClinic {
  name: string;
  city: string;
  state: string;
  phone: string;
  email: string | null;
  stage: string;
}

export interface InvestorTouch {
  firm: string;
  contact: string;
  email: string;
  token: string;
  link: string;
  stage: string;
}

export interface Batch4Draft {
  file: string;
  to: string;
  subject: string;
  token: string;
}

export interface ScheduledSend {
  when: string;
  routineFolder: string;
  count: number;
  attachment: string;
  status: string;
}

export interface InvestorPass {
  firm: string;
  contact: string;
  reason: string;
}

export interface OvernightEvent {
  time: string;
  summary: string;
  severity: 'info' | 'action';
}

export interface BriefMetrics {
  activeProspects: number;
  readyToCall: number;
  imported: number;
  paidSetups: number;
  interested: number;
  clinicEmailsSentBatch1: number;
  investorRefs: number;
  batch4Scheduled: number;
  cashGoal: number;
  setupPrice: number;
  upsOrientationDate: string;
  ebtLoadDate: string;
  firstPayEstimate: string;
  raise: string;
  stripePaymentLink: string;
  deckSlides: string;
  sites: {
    main: string;
    clinic: string;
    investor: string;
    gofundme: string;
  };
}

export interface ClinicPipelineSummary {
  active: number;
  ready_to_call: number;
  imported: number;
  paid: number;
  interested: number;
}

export interface BackendNotes {
  supabaseProjectId: string;
  tables: string[];
  imapMailbox: string;
  fromAddress: string;
}

/**
 * Shape of data/real-brief.json. Overnight will later overwrite a payload
 * with this same shape; see README.
 */
export interface BriefSnapshot {
  generatedAt: string;
  timezone: string;
  metrics: BriefMetrics;
  topActions: ActionItem[];
  doNotDo: string[];
  bridge: BridgeMilestone[];
  jobs: JobApplication[];
  clinicPipelineSummary: ClinicPipelineSummary;
  clinicsEmailedBatch1: EmailedClinic[];
  clinicsDialQueueBayArea: DialClinic[];
  investors: InvestorTouch[];
  batch4Drafts: Batch4Draft[];
  batch4ScheduledSend: ScheduledSend;
  investorPasses: InvestorPass[];
  overnight: OvernightEvent[];
  guardrails: string[];
  backendNotes: BackendNotes;
}
