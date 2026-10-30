export type CampaignIndustry = 
  | 'Restoran & F&B'
  | 'B2B SaaS & Tech'
  | 'Logistik & Supply Chain'
  | 'Retail & FMCG'
  | 'Fintech & Payment'
  | 'Agensi Digital & B2B Service';

export type CompanySize = '10–50' | '50–200' | '200–500' | '500+';

export type LeadStatus = 
  | 'uncontacted' 
  | 'ready' 
  | 'email_sent' 
  | 'reply_received' 
  | 'interested'
  | 'meeting_booked';

export type UserRole = 'client' | 'admin';

export type ClientView = 'overview' | 'campaign_setup' | 'leads' | 'meetings' | 'performance';

export type AdminView = 
  | 'campaigns'
  | 'icp_setup'
  | 'lead_database'
  | 'ai_scoring'
  | 'outreach'
  | 'pipeline'
  | 'meetings'
  | 'admin_meetings';

export type MeetingStatus = 'scheduled' | 'completed' | 'no_show' | 'rescheduled';

export type OutreachStatus = 'draft' | 'approved' | 'sent' | 'opened' | 'replied' | 'interested';

export interface ScoreFactor {
  label: string;
  points: number;
  positive: boolean;
  note: string;
}

export interface PersonalizedEmail {
  subject: string;
  body: string;
  angle: string;
  followUpDay3?: string;
  followUpDay7?: string;
}

export interface MeetingDetails {
  dateTime: string;
  calendarTime: string;
  googleMeetUrl: string;
  attendeeName: string;
  attendeeTitle: string;
  briefingNotes: string;
  estimatedBudget: string;
  urgentNeeds: string[];
  reasonForInterest?: string;
  meetingStatus?: MeetingStatus;
  clientName?: string;
  pastOutcomeNote?: string;
}

export interface Lead {
  id: string;
  companyName: string;
  companyWebsite: string;
  industry: CampaignIndustry;
  employeeCount: string;
  location: string;
  decisionMakerName: string;
  decisionMakerTitle: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  leadScore: number;
  scoreFactors: ScoreFactor[];
  aiHook: string;
  personalizedEmail: PersonalizedEmail;
  status: LeadStatus;
  meetingDetails?: MeetingDetails;
  aiReasoning?: string;
  outreachStatus?: OutreachStatus;
  followUpStep?: number;
}

export interface CampaignConfig {
  briefStatus?: 'pending_review' | 'approved' | 'changes_requested';
  needsHelp?: boolean;
  reviewNote?: string;
  id: string;
  name: string;
  industry: CampaignIndustry;
  country: string;
  locationDetail: string;
  companySize: CompanySize;
  targetJobTitles: string[];
  productPitch: string;
  totalMarketPool: number;
  status: 'draft' | 'running' | 'completed';
  clientName?: string;
}

export interface FunnelStats {
  leadsSourced: number;
  contacted: number;
  replies: number;
  interested: number;
  meetingsBooked: number;
}
