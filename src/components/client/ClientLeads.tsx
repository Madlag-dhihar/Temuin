import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  Linkedin, 
  Phone, 
  Mail, 
  Building2, 
  Sparkles, 
  CalendarCheck,
  CheckCircle2,
  X,
  FileText
} from 'lucide-react';
import { Lead } from '../../types';

interface ClientLeadsProps {
  leads: Lead[];
  onOpenMeetingSheet?: (lead: Lead) => void;
}

export const ClientLeads: React.FC<ClientLeadsProps> = ({ leads, onOpenMeetingSheet }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'meeting' | 'interested' | 'contacted'>('all');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);

  // Helper status label
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'meeting_booked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 "></span>
            Meeting terjadwal
          </span>
        );
      case 'interested':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Tertarik
          </span>
        );
      case 'reply_received':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            Sudah membalas
          </span>
        );
      case 'email_sent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 border border-sky-200">
            Sudah dihubungi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Ditemukan
          </span>
        );
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.decisionMakerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.decisionMakerTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'meeting' && lead.status === 'meeting_booked') ||
      (statusFilter === 'interested' && (lead.status === 'interested' || lead.status === 'reply_received')) ||
      (statusFilter === 'contacted' && lead.status === 'email_sent');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              DICARIKAN UNTUK ANDA
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Calon pelanggan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Temuin mencari dan menghubungi calon pelanggan. Lihat siapa yang sudah tertarik di sini.
          </p>
        </div>

        {/* Read-Only Badge for Client */}
        <div className="bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span>Dikelola tim Temuin</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari perusahaan, nama, jabatan, kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({leads.length})
          </button>
          <button
            onClick={() => setStatusFilter('meeting')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'meeting'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Meeting terjadwal ({leads.filter((l) => l.status === 'meeting_booked').length})
          </button>
          <button
            onClick={() => setStatusFilter('interested')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'interested'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tertarik / Sudah membalas ({leads.filter((l) => l.status === 'interested' || l.status === 'reply_received').length})
          </button>
          <button
            onClick={() => setStatusFilter('contacted')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === 'contacted'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sudah dihubungi ({leads.filter((l) => l.status === 'email_sent').length})
          </button>
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Company</th>
                <th className="py-3.5 px-4">Decision Maker</th>
                <th className="py-3.5 px-4 text-center">Lead Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Company */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-bold text-slate-900">{lead.companyName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{lead.companyWebsite}</span>
                      <span>•</span>
                      <span>{lead.employeeCount}</span>
                    </div>
                  </td>

                  {/* Decision Maker */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{lead.decisionMakerName}</div>
                    <div className="text-[11px] text-slate-400">{lead.decisionMakerTitle}</div>
                  </td>

                  {/* Lead Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                      lead.leadScore >= 90
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : lead.leadScore >= 80
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.leadScore}/100
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(lead.status)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedLeadForDetail(lead)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-semibold transition-colors"
                    >
                      Lihat Profil
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            Tidak ada data prospek yang cocok dengan pencarian / filter ini.
          </div>
        )}
      </div>

      {/* Lead Profile Detail Modal for Client */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div role="dialog" aria-modal="true" aria-label="Profil prospek" className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  Profil Calon Pelanggan
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedLeadForDetail.companyName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedLeadForDetail.location} • {selectedLeadForDetail.employeeCount}
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadForDetail(null)}
                aria-label="Tutup profil" className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
              <div className="font-semibold text-slate-700">Kontak Decision Maker:</div>
              <div className="font-bold text-slate-900 text-sm">{selectedLeadForDetail.decisionMakerName}</div>
              <div className="text-slate-600">{selectedLeadForDetail.decisionMakerTitle}</div>
              <div className="text-slate-500 pt-1 flex items-center gap-3">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {selectedLeadForDetail.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {selectedLeadForDetail.phone}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700">Sinyal Minat / AI Reasoning:</span>
              <p className="text-slate-600 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                "{selectedLeadForDetail.aiReasoning || selectedLeadForDetail.aiHook}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs font-mono font-bold text-indigo-700">
                Lead Score: {selectedLeadForDetail.leadScore}/100
              </span>
              <div className="flex items-center gap-2">
                {selectedLeadForDetail.status === 'meeting_booked' && onOpenMeetingSheet && (
                  <button
                    onClick={() => {
                      const l = selectedLeadForDetail;
                      setSelectedLeadForDetail(null);
                      onOpenMeetingSheet(l);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
                  >
                    Buka Cheat Sheet Meeting
                  </button>
                )}
                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
                >
                  Tutup
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
