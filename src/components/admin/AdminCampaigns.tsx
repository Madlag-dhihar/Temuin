import React from 'react';
import { 
  Building2, 
  Layers, 
  CalendarCheck, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Briefcase,
  PlayCircle,
  Plus
} from 'lucide-react';
import { CampaignConfig, FunnelStats, Lead } from '../../types';
import { PresetData, ALL_PRESETS } from '../../data/presetData';

interface AdminCampaignsProps {
  currentConfig: CampaignConfig;
  selectedPreset: PresetData;
  onSelectPreset: (preset: PresetData) => void;
  onOpenCampaign: () => void;
  leads: Lead[];
}

export const AdminCampaigns: React.FC<AdminCampaignsProps> = ({
  currentConfig,
  selectedPreset,
  onSelectPreset,
  onOpenCampaign,
  leads,
}) => {
  const bookedCount = leads.filter((l) => l.status === 'meeting_booked').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Temuin Internal Agency Ops
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Client campaigns
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar seluruh campaign klien yang sedang dioperasikan oleh tim GTM Engineering Temuin.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-600 font-medium">
            Workspace demo
          </div>
        </div>
      </div>

      {/* Main Active Campaign Card (Highlighted) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          Currently Operating
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ● ACTIVE
              </span>
              <span className="text-xs font-semibold text-indigo-700">
                Klien: {currentConfig.clientName || 'RestoTech Cloud POS'}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {currentConfig.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Target Industri: <strong>{currentConfig.industry}</strong> • Lokasi: <strong>{currentConfig.locationDetail}</strong> • Skala: <strong>{currentConfig.companySize} Karyawan</strong>
            </p>
          </div>

          <button
            onClick={onOpenCampaign}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all shrink-0"
          >
            <span>Tinjau brief client</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">
              Progress Qualified Meetings: <span className="text-emerald-700">{bookedCount} dari 8 Target Bulan Ini</span>
            </span>
            <span className="font-mono font-bold text-indigo-600">{Math.round(bookedCount / 8 * 100)}% Tercapai</span>
          </div>
          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: Math.min(bookedCount / 8 * 100, 100) + '%' }}></div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-slate-400 font-medium">Market Pool</div>
            <div className="text-lg font-bold text-slate-900 mt-0.5">500 Accounts</div>
          </div>
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <div className="text-indigo-600 font-medium">Qualified Leads</div>
            <div className="text-lg font-bold text-indigo-900 mt-0.5">120 Verified</div>
          </div>
          <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl">
            <div className="text-sky-600 font-medium">Contacted</div>
            <div className="text-lg font-bold text-sky-900 mt-0.5">85 Emails Sent</div>
          </div>
          <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
            <div className="text-amber-600 font-medium">Interested</div>
            <div className="text-lg font-bold text-amber-900 mt-0.5">18 Replies</div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl col-span-2 sm:col-span-1">
            <div className="text-emerald-700 font-bold">Meetings Booked</div>
            <div className="text-lg font-semibold text-emerald-800 mt-0.5">{bookedCount} Meetings</div>
          </div>
        </div>

      </div>

      {/* Other Preset Campaigns */}
      <details className="space-y-4">
        <summary className="cursor-pointer text-sm text-slate-600">Lihat skenario demo lainnya</summary>
        <h3 className="text-base font-bold text-slate-900">
          Pilihan Preset Campaign Klien Lainnya:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_PRESETS.map((preset) => {
            const isCurrent = preset.id === selectedPreset.id;
            return (
              <div
                key={preset.id}
                className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
                  isCurrent
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {preset.badge}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] font-bold text-indigo-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {preset.config.productPitch}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-600">
                    Target: <strong>{preset.funnelStats.meetingsBooked} Meetings Booked</strong>
                  </div>
                  <button
                    onClick={() => {
                      onSelectPreset(preset);
                      onOpenCampaign();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isCurrent ? 'Buka Campaign Ini' : 'Pilih & Simulasi'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </details>

    </div>
  );
};
