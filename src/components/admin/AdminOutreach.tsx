import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  User, 
  Building2, 
  ExternalLink, 
  Flame, 
  AlertCircle,
  Eye,
  MessageSquare,
  ThumbsUp,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { Lead, OutreachStatus } from '../../types';

interface AdminOutreachProps {
  leads: Lead[];
  onUpdateLead: (updatedLead: Lead) => void;
}

export const AdminOutreach: React.FC<AdminOutreachProps> = ({ leads, onUpdateLead }) => {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || 'lead-01');
  const [isEditing, setIsEditing] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeStepTab, setActiveStepTab] = useState<1 | 2 | 3>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // Editable email state
  const [editedSubject, setEditedSubject] = useState(selectedLead.personalizedEmail.subject);
  const [editedBody, setEditedBody] = useState(selectedLead.personalizedEmail.body);

  // Sync state when switching lead
  const handleSelectLead = (lead: Lead) => {
    setSelectedLeadId(lead.id);
    setIsEditing(false);
    setEditedSubject(lead.personalizedEmail.subject);
    setEditedBody(lead.personalizedEmail.body);
    setActiveStepTab(1);
  };

  const handleSaveEdit = () => {
    const updated: Lead = {
      ...selectedLead,
      personalizedEmail: {
        ...selectedLead.personalizedEmail,
        subject: editedSubject,
        body: editedBody,
      },
    };
    onUpdateLead(updated);
    setIsEditing(false);
    showToast('Draf email berhasil disimpan!');
  };

  const handleApproveAndSend = () => {
    const updated: Lead = {
      ...selectedLead,
      status: 'email_sent',
      outreachStatus: 'sent',
    };
    onUpdateLead(updated);
    showToast(`Email berhasil di-approve & dikirimkan ke ${selectedLead.email}!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status badge helper
  const getOutreachStatusBadge = (status: OutreachStatus = 'draft') => {
    switch (status) {
      case 'interested':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Interested (Ready for Call)</span>;
      case 'replied':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">Replied (Balasan Masuk)</span>;
      case 'opened':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">Opened (Dibaca)</span>;
      case 'sent':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 border border-sky-200">Sent (Terkirim)</span>;
      case 'approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Approved (Siap Kirim)</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Draft</span>;
    }
  };

  const filteredLeads = leads.filter((l) =>
    l.companyName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.decisionMakerName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Outbound Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
          AI Outreach & Sequence Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Review, kustomisasi draf pesan hasil personalisasi AI, approval pengiriman email, dan tracking sequence follow-up.
        </p>
      </div>

      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lead Selector (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3 flex flex-col h-[700px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pilih Akun Outreach:
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {leads.length} Leads
              </span>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari perusahaan / kontak..."
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
                  onClick={() => handleSelectLead(lead)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-50/90 border border-indigo-200 text-indigo-950 shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{lead.companyName}</span>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                      Score {lead.leadScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {lead.decisionMakerName} ({lead.decisionMakerTitle})
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 truncate max-w-[140px]">{lead.email}</span>
                    <span className="text-[10px] font-medium text-indigo-700">
                      {lead.outreachStatus || 'sent'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Email Editor & Follow-up Sequence (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Email Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Box Header */}
            <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-indigo-300">
                      Outreach Draft
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-indigo-200 font-medium">
                      AI Angle: {selectedLead.personalizedEmail.angle}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {selectedLead.companyName}
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div className="self-start sm:self-auto">
                {getOutreachStatusBadge(selectedLead.outreachStatus || 'sent')}
              </div>
            </div>

            {/* Email Metadata Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-2 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold w-16">TO:</span>
                <span className="text-slate-900 font-bold bg-white px-2 py-1 rounded border border-slate-200">
                  {selectedLead.email}
                </span>
                <span className="text-slate-500 font-sans text-[11px]">
                  ({selectedLead.decisionMakerName} — {selectedLead.decisionMakerTitle})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold w-16">SUBJECT:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-xs border border-indigo-300 rounded font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                ) : (
                  <span className="text-slate-800 font-semibold font-sans">
                    {selectedLead.personalizedEmail.subject}
                  </span>
                )}
              </div>
            </div>

            {/* Email Content Body */}
            <div className="p-6 space-y-4">
              {isEditing ? (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500">Edit Body Email:</span>
                  <textarea
                    rows={10}
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed font-sans"
                  />
                </div>
              ) : (
                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {selectedLead.personalizedEmail.body}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Draf dibuat otomatis oleh Temuin AI berdasarkan signal ekspansi & pain point ICP.</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                      >
                        Simpan Perubahan
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Email</span>
                      </button>
                      <button
                        onClick={handleApproveAndSend}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Approve & Send</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Follow-up Sequence Diagram */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Alur Follow-Up Sequence Terjadwal (Instantly / Smartlead Engine)
                </h4>
                <p className="text-xs text-slate-500">
                  Sequence otomatis jika prospek belum membalas email dalam jeda hari tertentu
                </p>
              </div>
            </div>

            {/* Sequence Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              
              {/* Step 1 */}
              <div className="border border-indigo-200 bg-indigo-50/50 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950">Email 1 (Hari 0)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">Initial Hook</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Menyapa sopan dan menyinggung masalah spesifik operasional atau pembukaan cabang baru.
                </p>
              </div>

              {/* Step 2 */}
              <div className="border border-slate-200 bg-slate-50 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Follow-up 1 (Hari +3)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">Case Study</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  "{selectedLead.personalizedEmail.followUpDay3 || 'Izin menyapa kembali, kami sempat merangkum lembar PDF penghematan waste outlet...'}"
                </p>
              </div>

              {/* Step 3 */}
              <div className="border border-slate-200 bg-slate-50 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Follow-up 2 (Hari +7)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">Break-up Call</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  "{selectedLead.personalizedEmail.followUpDay7 || 'Jika saat ini belum prioritas saya maklum. Pintu kami selalu terbuka kapan pun Anda butuh automasi.'}"
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
