import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Sparkles, 
  Send, 
  Mail, 
  ExternalLink, 
  Linkedin, 
  Phone, 
  CheckCircle2, 
  Flame, 
  Info, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  Layers,
  CalendarCheck
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';
import { EmailPreviewModal } from './EmailPreviewModal';

interface Page2LeadDatabaseProps {
  leads: Lead[];
  onUpdateLeads: (newLeads: Lead[]) => void;
  onProceedToDashboard: () => void;
}

export const Page2LeadDatabase: React.FC<Page2LeadDatabaseProps> = ({
  leads,
  onUpdateLeads,
  onProceedToDashboard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<'all' | 'high' | 'medium'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLeadForEmail, setSelectedLeadForEmail] = useState<Lead | null>(null);
  const [expandedScoreLeadId, setExpandedScoreLeadId] = useState<string | null>(null);
  const [isBulkOutreaching, setIsBulkOutreaching] = useState(false);
  const [bulkStatusText, setBulkStatusText] = useState('');

  // Metrics
  const totalLeads = leads.length;
  const avgScore = Math.round(
    leads.reduce((acc, curr) => acc + curr.leadScore, 0) / (totalLeads || 1)
  );
  const readyCount = leads.filter((l) => l.status === 'ready' || l.status === 'uncontacted').length;
  const bookedCount = leads.filter((l) => l.status === 'meeting_booked').length;

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.decisionMakerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.decisionMakerTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScore =
      scoreFilter === 'all' ||
      (scoreFilter === 'high' && lead.leadScore >= 90) ||
      (scoreFilter === 'medium' && lead.leadScore >= 80 && lead.leadScore < 90);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesScore && matchesStatus;
  });

  const handleSendSingleOutreach = (leadId: string) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          status: (l.status === 'meeting_booked' ? 'meeting_booked' : 'email_sent') as LeadStatus,
        };
      }
      return l;
    });
    onUpdateLeads(updated);
  };

  const handleBulkGenerateEmail = () => {
    alert('Email AI untuk semua leads telah di-generate dengan sudut pandang yang disesuaikan!');
  };

  const handleStartBulkOutreach = () => {
    setIsBulkOutreaching(true);
    setBulkStatusText('Menghubungkan ke email warmup domain & rotasi inbox...');

    setTimeout(() => {
      setBulkStatusText('Mengirim 420 personalized cold email bertahap (rate-limit safe)...');
    }, 700);

    setTimeout(() => {
      setBulkStatusText('Mengaktifkan sequence follow-up otomatis & tracking balasan...');
    }, 1400);

    setTimeout(() => {
      setIsBulkOutreaching(false);
      onProceedToDashboard();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-3 py-1 rounded-full w-fit mb-2.5">
            <Users className="w-3.5 h-3.5" />
            <span>LANGKAH 2 DARI 3: LEAD DATABASE & AI SCORING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Database Prospek & Skor Minat (Lead Scoring)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Data kontak decision maker yang telah diverifikasi, dihitung skornya berdasarkan sinyal bisnis, dan siap dihubungi.
          </p>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            id="bulk-generate-email-btn"
            onClick={handleBulkGenerateEmail}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Generate Email AI (Semua)</span>
          </button>

          <button
            id="start-outreach-btn"
            onClick={handleStartBulkOutreach}
            disabled={isBulkOutreaching}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isBulkOutreaching ? 'Memproses Sequence...' : 'Mulai Outreach Sequence (420 Kontak)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progressing state if bulk outreach active */}
      {isBulkOutreaching && (
        <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-indigo-700 font-semibold text-sm ">
            <Send className="w-4 h-4 animate-spin" />
            <span>{bulkStatusText}</span>
          </div>
          <div className="w-full bg-indigo-100 rounded-full h-1.5 max-w-md mx-auto overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full animate-[progress_1.8s_ease-in-out_infinite]" style={{ width: '85%' }}></div>
          </div>
        </div>
      )}

      {/* Metric Cards Top Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Sample Leads</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-semibold text-slate-900">{totalLeads} Perusahaan</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Dari 500 pool pasar sasaran</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Rata-Rata Lead Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-semibold text-emerald-600">{avgScore} / 100</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Kesesuaian ICP sangat tinggi</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Email Terverifikasi</span>
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-semibold text-slate-900">100% Valid</div>
          <div className="text-[11px] text-indigo-600 mt-0.5">Cek MX Record & Zero-bounce</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Qualified Meeting Set</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-semibold text-indigo-600">{bookedCount} Meeting</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Siap di-handover ke sales</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 mb-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="lead-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari perusahaan atau decision maker..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium text-xs flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" />
            <span>Skor:</span>
          </span>

          <button
            onClick={() => setScoreFilter('all')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors shrink-0 ${
              scoreFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({leads.length})
          </button>

          <button
            onClick={() => setScoreFilter('high')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors shrink-0 ${
              scoreFilter === 'high'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Skor &gt; 90 (Tier 1)
          </button>

          <button
            onClick={() => setScoreFilter('medium')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-colors shrink-0 ${
              scoreFilter === 'medium'
                ? 'bg-indigo-700 text-white'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            Skor 80–89
          </button>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Perusahaan (Company)</th>
                <th className="py-3 px-4">Decision Maker</th>
                <th className="py-3 px-4">Lead Score</th>
                <th className="py-3 px-4">Kontak Terverifikasi</th>
                <th className="py-3 px-4">AI Trigger Signal / Angle</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => {
                const isScoreExpanded = expandedScoreLeadId === lead.id;

                return (
                  <React.Fragment key={lead.id}>
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      {/* Company Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-sm">
                          {lead.companyName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{lead.employeeCount}</span>
                          <span>•</span>
                          <span>{lead.location}</span>
                        </div>
                        <a
                          href={`https://${lead.companyWebsite}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <span>{lead.companyWebsite}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>

                      {/* Decision Maker */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            {lead.decisionMakerName
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                              <span>{lead.decisionMakerName}</span>
                              <a
                                href={`https://${lead.linkedinUrl}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Lihat profil LinkedIn"
                                className="text-sky-600 hover:text-sky-800"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            <div className="text-[11px] text-slate-500">{lead.decisionMakerTitle}</div>
                          </div>
                        </div>
                      </td>

                      {/* Lead Score */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() =>
                            setExpandedScoreLeadId(isScoreExpanded ? null : lead.id)
                          }
                          className="flex items-center gap-2 group cursor-pointer"
                          title="Klik untuk melihat breakdown skor"
                        >
                          <div
                            className={`px-2.5 py-1 rounded-lg font-semibold text-xs flex items-center gap-1 ${
                              lead.leadScore >= 92
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/80'
                                : lead.leadScore >= 88
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                            }`}
                          >
                            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{lead.leadScore}</span>
                          </div>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform ${
                              isScoreExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                            <Mail className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                        </div>
                      </td>

                      {/* AI Hook / Angle */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {lead.aiHook}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {lead.status === 'meeting_booked' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <CalendarCheck className="w-3 h-3" />
                            Meeting Set
                          </span>
                        ) : lead.status === 'interested' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                            Interested
                          </span>
                        ) : lead.status === 'reply_received' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                            Reply Masuk
                          </span>
                        ) : lead.status === 'email_sent' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                            Email Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Siap Kontak
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLeadForEmail(lead)}
                            className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                            title="Buka draf email AI"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Preview Email</span>
                          </button>

                          <button
                            onClick={() => handleSendSingleOutreach(lead.id)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                            title="Kirim outreach individual"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expandable Score Breakdown Row */}
                    {isScoreExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-200">
                        <td colSpan={7} className="py-3 px-6">
                          <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                              <span>Komponen Penilaian AI Lead Score: {lead.companyName} ({lead.leadScore}/100)</span>
                              <span className="text-[11px] text-slate-400 font-normal">Algoritma GTM Engineering Signal</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                              {lead.scoreFactors.map((factor, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-xs"
                                >
                                  <div className="flex items-center justify-between font-semibold text-slate-800 mb-0.5">
                                    <span>{factor.label}</span>
                                    <span className="text-emerald-600 font-bold">+{factor.points}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-tight">
                                    {factor.note}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Venture Creation Presentation Note */}
      <div className="mt-6 bg-slate-100/80 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Kenapa ini bukan sekadar cold email?</strong> Sistem GTM Engineering melakukan <em>enrichment</em> (mengumpulkan data teknis perusahaan & sinyal pembuka cabang baru) dan <em>scoring</em> (memilah akun berpotensi tertinggi). Email yang dikirim bukan blast massal acak, melainkan pesan ultra-relevan yang terasa seperti ditulis oleh konsultan bisnis.
        </div>
      </div>

      {/* Email Modal */}
      {selectedLeadForEmail && (
        <EmailPreviewModal
          lead={selectedLeadForEmail}
          onClose={() => setSelectedLeadForEmail(null)}
          onSendSingleOutreach={handleSendSingleOutreach}
        />
      )}

    </div>
  );
};
