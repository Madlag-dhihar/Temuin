import React from 'react';
import { Page2LeadDatabase } from '../Page2LeadDatabase';
import { Lead } from '../../types';
import { Database, Sparkles, Filter, ShieldCheck } from 'lucide-react';

interface AdminLeadDatabaseProps {
  leads: Lead[];
  onUpdateLeads: (leads: Lead[]) => void;
  onProceedToDashboard: () => void;
}

export const AdminLeadDatabase: React.FC<AdminLeadDatabaseProps> = ({
  leads,
  onUpdateLeads,
  onProceedToDashboard,
}) => {
  return (
    <div className="space-y-4">
      {/* Admin Context Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-900 text-white rounded-2xl p-4.5 border border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-indigo-300">
                  Data Enrichment Engine
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-semibold border border-slate-700">
                  Full Admin Access (Editing & Verification)
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Tahap 2: Database Hasil Pencarian & AI Personalization Engine
              </h2>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-sm text-right hidden lg:block">
            Tim Temuin memvalidasi akurasi kontak decision maker, memeriksa skor intent, dan menyetujui email sebelum dieksekusi.
          </div>
        </div>
      </div>

      {/* Main Database Table & Scoring Tools */}
      <Page2LeadDatabase
        leads={leads}
        onUpdateLeads={onUpdateLeads}
        onProceedToDashboard={onProceedToDashboard}
      />
    </div>
  );
};
