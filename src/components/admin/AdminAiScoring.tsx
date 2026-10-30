import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Target, 
  CheckCircle2, 
  SlidersHorizontal, 
  Building2, 
  MapPin, 
  Users, 
  TrendingUp, 
  Info,
  ChevronRight,
  Flame,
  Search
} from 'lucide-react';
import { Lead } from '../../types';

interface AdminAiScoringProps {
  leads: Lead[];
}

export const AdminAiScoring: React.FC<AdminAiScoringProps> = ({ leads }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || 'lead-01');
  const [searchFilter, setSearchFilter] = useState('');

  // Interactive weights simulation
  const [weightIcp, setWeightIcp] = useState(30);
  const [weightSize, setWeightSize] = useState(20);
  const [weightSignal, setWeightSignal] = useState(20);
  const [weightDm, setWeightDm] = useState(15);
  const [weightLocation, setWeightLocation] = useState(15);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const filteredLeads = leads.filter((l) =>
    l.companyName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.decisionMakerName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Engine Intelligence
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
          AI Lead Scoring & Intent Breakdown
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Penjelasan algoritmik mengapa suatu prospek mendapatkan skor kelayakan (ICP Fit, sinyal ekspansi, & intent data).
        </p>
      </div>

      {/* Main Grid: Left Selector & Right Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lead List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3 flex flex-col h-[650px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pilih Akun Lead:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {leads.length} Accounts
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari perusahaan..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
            {filteredLeads.map((lead) => {
              const isSelected = lead.id === selectedLeadId;
              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-indigo-50/90 border border-indigo-200 text-indigo-950 font-semibold shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{lead.companyName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{lead.decisionMakerName} • {lead.decisionMakerTitle}</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      lead.leadScore >= 90
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {lead.leadScore}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lead Scoring Breakdown (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Selected Lead Score Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Lead Score Analysis
                  </span>
                  <span className="text-[11px] text-slate-400">• Verified by Temuin Intent Engine</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedLead.companyName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedLead.decisionMakerName} ({selectedLead.decisionMakerTitle}) • {selectedLead.location} • {selectedLead.employeeCount}
                </p>
              </div>

              {/* Big Score Gauge */}
              <div className="flex items-center gap-3 bg-slate-900   border border-indigo-100 px-5 py-3 rounded-2xl shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Total Score</div>
                  <div className="text-3xl font-semibold text-indigo-700 font-mono">
                    {selectedLead.leadScore}<span className="text-base text-slate-400 font-normal">/100</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 text-amber-300" />
                </div>
              </div>
            </div>

            {/* AI Reasoning Narrative Box */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4.5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Reasoning & Sinyal Intent:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                "{selectedLead.aiReasoning || selectedLead.aiHook}"
              </p>
            </div>

            {/* Factor Breakdown List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Rincian Bobot Skor (Factors Breakdown):</span>
                <span className="text-slate-400 text-[11px]">Formula Transparan Temuin</span>
              </div>

              <div className="space-y-2.5">
                {selectedLead.scoreFactors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{factor.label}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] pl-6">
                        {factor.note}
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0 pl-6 sm:pl-0">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">
                        +{factor.points} Poin
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Line */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Total Akumulasi Poin:</span>
                <span className="font-mono text-indigo-700 text-sm">
                  {selectedLead.leadScore} / 100
                </span>
              </div>
            </div>

          </div>

          {/* Scoring Engine Configurator Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Simulasi Penyetelan Bobot Kriteria (Scoring Model Tuning)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Total Bobot: 100%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>ICP Fit (Industri)</span>
                  <span className="font-mono text-indigo-600 font-bold">{weightIcp}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={weightIcp}
                  onChange={(e) => setWeightIcp(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Company Size Fit</span>
                  <span className="font-mono text-indigo-600 font-bold">{weightSize}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={weightSize}
                  onChange={(e) => setWeightSize(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Expansion Signal</span>
                  <span className="font-mono text-indigo-600 font-bold">{weightSignal}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  value={weightSignal}
                  onChange={(e) => setWeightSignal(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Decision Maker Power</span>
                  <span className="font-mono text-indigo-600 font-bold">{weightDm}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={weightDm}
                  onChange={(e) => setWeightDm(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Location Fit</span>
                  <span className="font-mono text-indigo-600 font-bold">{weightLocation}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={weightLocation}
                  onChange={(e) => setWeightLocation(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

            </div>

            <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>AI Lead Scoring Temuin mengeliminasi 76% leads tidak relevan sebelum tim sales menghabiskan waktu pada prospek dingin.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
