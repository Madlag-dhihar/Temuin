import React, { useState } from 'react';
import { 
  Kanban, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Building2, 
  CalendarCheck, 
  Clock, 
  Flame,
  ChevronRight,
  MoveRight
} from 'lucide-react';
import { Lead, LeadStatus } from '../../types';

interface AdminPipelineProps {
  leads: Lead[];
  onUpdateLead: (updatedLead: Lead) => void;
  onOpenMeetingSheet?: (lead: Lead) => void;
}

type PipelineStage = {
  id: LeadStatus;
  title: string;
  badgeColor: string;
  count: number;
};

export const AdminPipeline: React.FC<AdminPipelineProps> = ({
  leads,
  onUpdateLead,
  onOpenMeetingSheet,
}) => {
  // Define the stages
  const STAGES: { id: LeadStatus; title: string; count: number; color: string }[] = [
    { id: 'uncontacted', title: 'NEW LEADS', count: 5, color: 'bg-slate-100 text-slate-700 border-slate-200' },
    { id: 'ready', title: 'QUALIFIED', count: 8, color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'email_sent', title: 'CONTACTED', count: 12, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    { id: 'reply_received', title: 'REPLIED', count: 10, color: 'bg-sky-100 text-sky-800 border-sky-200' },
    { id: 'interested', title: 'INTERESTED', count: 18, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'meeting_booked', title: 'MEETING BOOKED', count: 5, color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  ];

  const handleMoveStage = (lead: Lead, newStatus: LeadStatus) => {
    const updated: Lead = {
      ...lead,
      status: newStatus,
    };
    onUpdateLead(updated);
  };

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter((l) => l.status === status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Visual Pipeline CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            GTM Pipeline & Opportunity Funnel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor progres setiap akun dari tahap scraping data mentah hingga booked meeting siap serah terima ke klien.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-emerald-600" />
          <span>5 Deals Siap Temu di Kolom <strong>MEETING BOOKED</strong></span>
        </div>
      </div>

      {/* Kanban Board Container (Scrollable horizontally) */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          
          {STAGES.map((stage, colIdx) => {
            const stageLeads = getLeadsByStatus(stage.id);
            // Display count: if we have local leads matching, use local length or the representative count
            const displayCount = stageLeads.length > 0 ? stageLeads.length : stage.count;

            return (
              <div
                key={stage.id}
                className="w-72 shrink-0 bg-slate-100/80 rounded-2xl border border-slate-200 p-3.5 flex flex-col space-y-3"
              >
                
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-wider text-slate-800">
                      {stage.title}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border font-mono ${stage.color}`}>
                    {displayCount}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 overflow-y-auto max-h-[620px] pr-1">
                  {stageLeads.length > 0 ? (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-md transition-all space-y-2.5"
                      >
                        {/* Company & Score */}
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="font-bold text-xs text-slate-900 leading-tight">
                            {lead.companyName}
                          </h4>
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                            {lead.leadScore}
                          </span>
                        </div>

                        {/* Decision Maker */}
                        <div className="text-[11px] text-slate-600 space-y-0.5">
                          <div className="font-semibold text-slate-800">{lead.decisionMakerName}</div>
                          <div className="text-slate-400 truncate">{lead.decisionMakerTitle}</div>
                        </div>

                        {/* Signal Hook snippet */}
                        <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-150 line-clamp-2">
                          "{lead.aiHook}"
                        </p>

                        {/* Meeting indicator if booked */}
                        {lead.status === 'meeting_booked' && lead.meetingDetails && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-[10px] text-emerald-800 flex items-center justify-between">
                            <span className="font-semibold">{lead.meetingDetails.dateTime}</span>
                            {onOpenMeetingSheet && (
                              <button
                                onClick={() => onOpenMeetingSheet(lead)}
                                className="font-bold underline text-emerald-900"
                              >
                                Brief
                              </button>
                            )}
                          </div>
                        )}

                        {/* Stage Mover Selector */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                          <span className="text-[10px] text-slate-400 font-medium">Stage:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleMoveStage(lead, e.target.value as LeadStatus)}
                            className="bg-slate-50 border border-slate-200 text-slate-700 rounded px-1.5 py-0.5 text-[10px] font-semibold cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="uncontacted">New Lead</option>
                            <option value="ready">Qualified</option>
                            <option value="email_sent">Contacted</option>
                            <option value="reply_received">Replied</option>
                            <option value="interested">Interested</option>
                            <option value="meeting_booked">Meeting Booked</option>
                          </select>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
                      {stage.count} akun pipeline diproses
                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};
