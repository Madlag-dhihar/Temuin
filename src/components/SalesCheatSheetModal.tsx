import React from 'react';
import { 
  X, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  Video, 
  Building2, 
  User, 
  AlertCircle,
  Sparkles,
  ExternalLink,
  Target
} from 'lucide-react';
import { Lead } from '../types';

interface SalesCheatSheetModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const SalesCheatSheetModal: React.FC<SalesCheatSheetModalProps> = ({ lead, onClose }) => {
  if (!lead || !lead.meetingDetails) return null;

  const { meetingDetails } = lead;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Sales Briefing & Cheat Sheet
                </span>
                <span className="bg-indigo-900/80 text-indigo-200 text-[10px] px-2 py-0.5 rounded-full font-mono border border-indigo-700/50">
                  Score: {lead.leadScore}/100
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {lead.companyName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scope Guarantee Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
            <span><strong>Handover Temuin:</strong> Prospek ini telah dikualifikasi & mengonfirmasi kehadiran meeting.</span>
          </div>
          <span className="font-semibold text-emerald-700">Tahap Klien: Sales Pitch & Closing</span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Meeting Time & Join */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>{meetingDetails.dateTime}</span>
              </div>
              <p className="text-xs text-indigo-700">
                Waktu konfirmasi via kalender undangan terintegrasi (Google Calendar / Cal.com).
              </p>
            </div>
            <a
              href={meetingDetails.googleMeetUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs shrink-0"
            >
              <Video className="w-4 h-4" />
              <span>Masuk Google Meet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Decision Maker & Profile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Decision Maker</span>
              </div>
              <p className="font-bold text-slate-900">{meetingDetails.attendeeName}</p>
              <p className="text-xs text-slate-600">{meetingDetails.attendeeTitle}</p>
              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>{lead.location}</span>
                <span>{lead.employeeCount}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estimasi Budget Pembelian</span>
              </div>
              <p className="font-bold text-emerald-700 text-base">{meetingDetails.estimatedBudget}</p>
              <p className="text-xs text-slate-500 mt-1">
                Berdasarkan jumlah lisensi cabang & sinyal spending.
              </p>
            </div>
          </div>

          {/* Why They're Interested */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wide">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Mengapa Mereka Mau Meeting (Reason for Interest)</span>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
              "{meetingDetails.reasonForInterest || lead.aiHook}"
            </p>
          </div>

          {/* Urgent Needs Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Prioritas & Kebutuhan Mendesak Prospek:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meetingDetails.urgentNeeds.map((need, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{need}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Briefing Notes for Sales Rep */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>Briefing Khusus untuk Sales Executive Klien</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-lg p-3">
              {meetingDetails.briefingNotes}
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              💡 <strong>Tips Pitching:</strong> Fokuskan 10 menit pertama pada validasi pain point di atas sebelum membuka demo slide. Jangan sebutkan harga sebelum prospek setuju pada solusi modul yang ditawarkan.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Temuin Qualified Meeting Briefing Document</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors"
          >
            Tutup Cheat Sheet
          </button>
        </div>

      </div>
    </div>
  );
};
