import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Calendar, 
  Video, 
  Clock, 
  ArrowDown, 
  Sparkles, 
  FileText, 
  Download, 
  TrendingUp, 
  Building, 
  User, 
  ShieldAlert, 
  HelpCircle,
  Briefcase,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CampaignConfig, FunnelStats, Lead } from '../types';

interface Page3CampaignDashboardProps {
  config: CampaignConfig;
  funnelStats: FunnelStats;
  leads: Lead[];
  onRestartCampaign: () => void;
  onGoToDatabase: () => void;
}

export const Page3CampaignDashboard: React.FC<Page3CampaignDashboardProps> = ({
  config,
  funnelStats,
  leads,
  onRestartCampaign,
  onGoToDatabase,
}) => {
  const [selectedMeetingLead, setSelectedMeetingLead] = useState<Lead | null>(null);
  const [exportNotice, setExportNotice] = useState(false);

  const bookedLeads = leads.filter(
    (l) => l.status === 'meeting_booked' && l.meetingDetails
  );

  const handleExportBrief = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full w-fit mb-2.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>LANGKAH 3 DARI 3: HASIL CAMPAIGN & HANDOVER MEETING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Campaign Performance & Sales Meeting Handover
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Campaign: <strong className="text-slate-800">{config.name}</strong> • Target: {config.industry} ({config.locationDetail})
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportBrief}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Ekspor Briefing Meeting (PDF/CSV)</span>
          </button>

          <button
            onClick={onRestartCampaign}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Ubah Target ICP Baru</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Cheat Sheet & Briefing Meeting berhasil diekspor untuk tim sales klien!</span>
        </div>
      )}

      {/* CORE FUNNEL: 500 Leads -> 420 Contacted -> 65 Replies -> 12 Interested -> 5 Meetings */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Pipeline Funnel: Dari Data hingga Sales Call</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Alur konversi otomatis yang dijalankan oleh tim GTM Engineering untuk klien
            </p>
          </div>

          <div className="text-xs bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full font-semibold border border-indigo-200/60 self-start sm:self-auto">
            Meeting Booking Rate: 1.2% (Tier 1 B2B Benchmark)
          </div>
        </div>

        {/* Funnel Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          
          {/* Stage 1 */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tahap 1</span>
              <div className="text-2xl font-semibold text-slate-900 mt-1">
                {funnelStats.leadsSourced}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Leads Disaring</div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
              Database perusahaan sesuai kriteria ICP di Indonesia.
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tahap 2</span>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">84%</span>
              </div>
              <div className="text-2xl font-semibold text-slate-900 mt-1">
                {funnelStats.contacted}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">Leads Dihubungi</div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
              Email terverifikasi + sequence follow-up multi-touch.
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-sky-50/60 rounded-xl p-4 border border-sky-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Tahap 3</span>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded">15.5%</span>
              </div>
              <div className="text-2xl font-semibold text-sky-950 mt-1">
                {funnelStats.replies}
              </div>
              <div className="text-xs font-semibold text-sky-900 mt-0.5">Balasan Masuk (Replies)</div>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-200 text-[11px] text-sky-700">
              Merespons pesan karena relevansi problem spesifik.
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-indigo-50/70 rounded-xl p-4 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Tahap 4</span>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded">18.5%</span>
              </div>
              <div className="text-2xl font-semibold text-indigo-950 mt-1">
                {funnelStats.interested}
              </div>
              <div className="text-xs font-semibold text-indigo-900 mt-0.5">Tertarik & Terkualifikasi</div>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-200 text-[11px] text-indigo-700">
              Meminta jadwal presentasi atau informasi demo.
            </div>
          </div>

          {/* Stage 5: Final Handover */}
          <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-500 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Final Goal</span>
                <span className="text-[10px] font-semibold text-white bg-emerald-600 px-1.5 py-0.5 rounded">GOAL</span>
              </div>
              <div className="text-2xl font-semibold text-emerald-950 mt-1 flex items-center gap-1">
                <span>{funnelStats.meetingsBooked}</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs font-bold text-emerald-900 mt-0.5">Qualified Meetings!</div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 font-medium">
              Terkonfirmasi di kalender & siap diserah-terimakan.
            </div>
          </div>

        </div>

        {/* Visual Summary Flow Text */}
        <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-center text-xs text-slate-600 font-medium text-center">
          <span>500 Leads Terpilih</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
          <span>420 Kontak Terkirim</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
          <span>65 Balasan Masuk</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
          <span>12 Minat Terkualifikasi</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1" />
          <strong className="text-emerald-700 font-bold">5 Sales Calls Terjadwal</strong>
        </div>
      </div>

      {/* SCOPE HANDOVER SECTION: THE 5 BOOKED MEETINGS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Handover Announcement Banner */}
        <div className="bg-slate-900    text-white rounded-xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>HANDOVER MILESTONE KE TIM SALES KLIEN</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              5 Calon Customer Siap Melakukan Sales Call
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              <strong>Batas Scope Jasa Kami:</strong> Seluruh riset prospek, verifikasi email, copywriting email, hingga booking kalender meeting telah kami selesaikan. Sekarang giliran tim sales klien untuk hadir di Google Meet, melakukan demo produk, dan menutup transaksi (closing).
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-4 py-3 text-center">
            <div className="text-xs text-slate-300">Estimasi Pipeline Value</div>
            <div className="text-lg font-semibold text-emerald-400 mt-0.5">Rp 320 - 450 Juta</div>
            <div className="text-[10px] text-slate-400">Potensi nilai kontrak tahunan</div>
          </div>
        </div>

        {/* Meeting Cards List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Jadwal Sales Call Minggu Ini ({bookedLeads.length} Pertemuan)</span>
            </h4>
            <button
              onClick={onGoToDatabase}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Lihat semua database leads</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookedLeads.map((lead) => {
              const meeting = lead.meetingDetails!;
              const isSelected = selectedMeetingLead?.id === lead.id;

              return (
                <div
                  key={lead.id}
                  className={`bg-slate-50/80 rounded-xl border p-4.5 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/30'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top row: Company & Score */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">{lead.companyName}</h5>
                        <p className="text-xs text-slate-500">{lead.employeeCount} • {lead.location}</p>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">
                        Score {lead.leadScore}
                      </span>
                    </div>

                    {/* Attendee Info */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                        <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{meeting.attendeeName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-5">
                        {meeting.attendeeTitle}
                      </div>
                    </div>

                    {/* Meeting Schedule */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 bg-emerald-50/80 border border-emerald-200 px-3 py-2 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{meeting.dateTime}</span>
                    </div>

                    {/* Briefing notes snippet */}
                    <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 space-y-1">
                      <span className="font-bold text-slate-700 block">Brief untuk Tim Sales:</span>
                      <p className="line-clamp-2 leading-relaxed">
                        {meeting.briefingNotes}
                      </p>
                    </div>
                  </div>

                  {/* Action Link to Google Meet & Detailed Cheat Sheet */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedMeetingLead(isSelected ? null : lead)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      {isSelected ? 'Tutup Cheat Sheet' : 'Buka Cheat Sheet'}
                    </button>

                    <a
                      href={meeting.googleMeetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Video className="w-3 h-3" />
                      <span>Masuk Meet</span>
                    </a>
                  </div>

                  {/* Expandable Cheat Sheet in card */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-indigo-200 bg-white p-3 rounded-lg text-xs space-y-2 animate-in fade-in">
                      <div className="font-bold text-slate-900 text-xs">
                        Panduan Pitch Sales Call:
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div>
                          <strong className="text-slate-700">Estimasi Budget:</strong>{' '}
                          <span className="text-emerald-700 font-semibold">{meeting.estimatedBudget}</span>
                        </div>
                        <div>
                          <strong className="text-slate-700">Fokus Kebutuhan Mendesak:</strong>
                          <ul className="list-disc pl-4 mt-0.5 text-slate-600 space-y-0.5">
                            {meeting.urgentNeeds.map((need, i) => (
                              <li key={i}>{need}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ROI & BUSINESS IMPACT FOR THE CLIENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            65+ Jam Waktu Sales Klien Dihemat
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tim sales klien tidak perlu membuang waktu browsing LinkedIn, mencari nomor telepon, atau mengetik ratusan email manual. Mereka hanya fokus presentasi di meeting.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Briefcase className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Efisiensi Biaya vs Gaji Tim SDR Internal
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Merekrut 2 orang SDR in-house + langganan tools (Apollo, ZoomInfo, SalesNav, Instantly) menghabiskan Rp 25-35 juta/bulan. Jasa GTM Engineering menghemat hingga 60% biaya akuisisi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Kualitas Prospek Terkualifikasi (ICP)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Setiap meeting yang dijadwalkan dipastikan memenuhi kriteria minimum (budget, jabatan decision maker, dan kebutuhan nyata), bukan sekadar asal booking meeting.
          </p>
        </div>

      </div>

    </div>
  );
};
