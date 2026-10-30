import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  User, 
  Building, 
  Mail, 
  Lightbulb, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Lead } from '../types';

interface EmailPreviewModalProps {
  lead: Lead;
  onClose: () => void;
  onSendSingleOutreach: (leadId: string) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  lead,
  onClose,
  onSendSingleOutreach,
}) => {
  const [activeTab, setActiveTab] = useState<'email1' | 'followup1'>('email1');
  const [isCopied, setIsCopied] = useState(false);
  const [subject, setSubject] = useState(lead.personalizedEmail.subject);
  const [body, setBody] = useState(lead.personalizedEmail.body);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Subject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegenerateAngle = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setSubject(`Ide efisiensi operasional F&B untuk ${lead.companyName}?`);
      setBody(
        `Halo ${lead.decisionMakerName.split(' ')[0]},\n\nMelihat ekspansi agresif ${lead.companyName} belakangan ini, sinkronisasi pesanan kasir dan laporan stok tentu menjadi fokus harian tim ${lead.decisionMakerTitle}.\n\nKami membantu grup F&B terkemuka mengeliminasi selisih stok kasir hingga 0% dengan automasi inventory cloud.\n\nBoleh saya kirimkan 1-pager studi kasusnya atau kita luangkan 10 menit via Google Meet minggu ini?`
      );
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Personalized Cold Email Draft
              </h3>
              <p className="text-xs text-slate-500">
                Otomatis disesuaikan dengan pain point & data intelijen perusahaan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prospect Mini Info Bar */}
        <div className="px-6 py-3 bg-indigo-50/50 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Building className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-900">{lead.companyName}</span>
            <span className="text-slate-400">•</span>
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span>{lead.decisionMakerName} ({lead.decisionMakerTitle})</span>
          </div>

          <div className="flex items-center gap-1.5 text-indigo-700 bg-white border border-indigo-200 px-2.5 py-1 rounded-full font-medium">
            <Mail className="w-3 h-3 text-indigo-500" />
            <span>{lead.email}</span>
          </div>
        </div>

        {/* AI Hook Explanation */}
        <div className="px-6 py-2.5 bg-amber-50/70 border-b border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>AI Trigger Signal:</strong> {lead.aiHook}
          </div>
        </div>

        {/* Tab Sequence: Email 1 vs Follow Up */}
        <div className="px-6 pt-3 flex items-center gap-2 border-b border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('email1')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeTab === 'email1'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Touchpoint 1: Initial Cold Email (Hari 1)
          </button>

          {lead.personalizedEmail.followUpDay3 && (
            <button
              onClick={() => setActiveTab('followup1')}
              className={`pb-2.5 border-b-2 transition-all ${
                activeTab === 'followup1'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Touchpoint 2: Soft Follow-up (Hari 4)
            </button>
          )}
        </div>

        {/* Email Editor / Viewer Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'email1' ? (
            <>
              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Subject Email
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Isi Pesan (Casual & Profesional B2B Indonesia)</span>
                  <span className="text-[11px] text-slate-400 font-normal">Dapat diedit langsung</span>
                </label>
                <textarea
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 focus:bg-white focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Automated Follow-up (Terkirim jika tidak ada balasan dalam 3 hari)
              </label>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                {lead.personalizedEmail.followUpDay3}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Sistem otomatis menghentikan follow-up begitu calon customer membalas email atau booking jadwal meeting.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerateAngle}
              disabled={isGenerating}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isGenerating ? 'Regenerating...' : 'Ubah Angle AI'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
            >
              Tutup
            </button>

            <button
              onClick={() => {
                onSendSingleOutreach(lead.id);
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim & Mulai Sequence</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
