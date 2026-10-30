import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  CalendarCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calculator,
  Percent
} from 'lucide-react';
import { CampaignConfig, FunnelStats, Lead } from '../../types';

interface ClientPerformanceProps {
  config: CampaignConfig;
  funnelStats: FunnelStats;
  leads: Lead[];
}

export const ClientPerformance: React.FC<ClientPerformanceProps> = ({
  config,
  funnelStats,
  leads,
}) => {
  const bookedCount = leads.filter((l) => l.status === 'meeting_booked').length;
  const interestedCount = 18;
  const contactedCount = 85;
  const qualifiedCount = 120;
  const totalSourced = 500;

  // Conversion calculations
  const meetingConversion = ((bookedCount / totalSourced) * 100).toFixed(1); // 1.0%
  const contactToMeeting = ((bookedCount / contactedCount) * 100).toFixed(1); // 5.9%
  const interestedToMeeting = ((bookedCount / interestedCount) * 100).toFixed(1); // 27.8%

  // Financial Value
  const estimatedPipeline = 'Rp 305.000.000'; // Sum of estimated budgets
  const hoursSaved = '68 Jam';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Nilai Bisnis & ROI Klien
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
          Laporan Kinerja Campaign (Performance)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Transparansi metrik efisiensi dan perbandingan nilai yang dihasilkan oleh jasa GTM Engineering Temuin.
        </p>
      </div>

      {/* 3 Executive Value Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Pipeline Value */}
        <div className="bg-slate-900   text-white rounded-2xl p-6 shadow-md space-y-2">
          <div className="flex items-center justify-between text-indigo-300">
            <span className="text-xs font-semibold uppercase tracking-wider">Potensi Pipeline Dihasilkan</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-semibold text-white">{estimatedPipeline}</div>
          <p className="text-xs text-indigo-200/90 leading-relaxed">
            Total estimasi nilai deal tahunan dari 5 akun terkualifikasi yang berhasil dijadwalkan meeting.
          </p>
        </div>

        {/* Card 2: Hours Saved */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Waktu SDR Manual Dihemat</span>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-semibold text-slate-900">{hoursSaved}</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eliminasi riset manual scraping data kontak, verifikasi email, drafting email satu-per-satu, dan follow-up.
          </p>
        </div>

        {/* Card 3: Meeting Conversion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Meeting Conversion Rate</span>
            <Percent className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-semibold text-emerald-600">{meetingConversion}%</div>
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong>5 / 500 Target Companies</strong> = 1.0% conversion (Sangat prima untuk outbound B2B mid-market).
          </p>
        </div>

      </div>

      {/* Detailed Funnel Conversion Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Tahapan Konversi Funnel Outbound
          </h2>
          <p className="text-xs text-slate-500">
            Setiap tahap difilter ketat oleh AI Scoring & deliverability engine Temuin
          </p>
        </div>

        {/* Funnel Progress Bars */}
        <div className="space-y-4 text-xs">
          
          {/* Step 1: Target Companies */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">1. Target Companies (Market Pool Sourced)</span>
              <span className="font-mono font-bold text-slate-900">500 Akun (100%)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-700 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Step 2: Qualified Leads */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">2. Qualified Leads (ICP Fit & Decision Maker Found)</span>
              <span className="font-mono font-bold text-indigo-600">120 Kontak (24.0% dari pool)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>

          {/* Step 3: Contacted */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">3. Contacted (Cold Email Sequence Dikirimkan)</span>
              <span className="font-mono font-bold text-sky-600">85 Kontak (70.8% dari qualified)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '17%' }}></div>
            </div>
          </div>

          {/* Step 4: Interested */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">4. Interested (Balasan Positif & Minta Presentasi)</span>
              <span className="font-mono font-bold text-amber-600">18 Prospek (21.2% dari contacted)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '3.6%' }}></div>
            </div>
          </div>

          {/* Step 5: Meetings Booked */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">5. Meetings Booked (Jadwal Konfirmasi di Kalender)</span>
              <span className="font-mono font-bold text-emerald-600">5 Qualified Meetings (27.8% dari interested)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '1.0%' }}></div>
            </div>
          </div>

        </div>

        {/* Funnel Formula Callout */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-semibold uppercase text-[10px]">Rangkuman Formula Rasio:</span>
            <div className="font-mono font-bold text-slate-800">
              500 Target → 120 Qualified → 85 Contacted → 18 Interested → 5 Meetings Booked
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-indigo-800 font-semibold shrink-0">
            Conversion: 5 / 500 = 1.0%
          </div>
        </div>

      </div>

      {/* Comparison: Temuin vs SDR In-House (Menunjukkan Value) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Perbandingan Nilai: Memakai Temuin vs Rekrut Tim SDR Sendiri
          </h2>
          <p className="text-xs text-slate-500">
            Alasan kenapa klien memilih outsourcing GTM Engineering ke Temuin daripada membangun sendiri dari nol
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Option A: In-House SDR */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Opsi 1: Rekrut 1 Orang SDR Internal</h3>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Biaya Tinggi & Lambat
              </span>
            </div>
            
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Gaji pokok SDR: Rp 6.000.000 – Rp 8.000.000 / bulan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Biaya langganan software sendiri (Apollo, Clay, Instantly): ~Rp 5.500.000 / bulan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Waktu onboarding & training 1–2 bulan sebelum ada hasil</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Risiko salah konfigurasi domain sehingga email masuk spam</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-200 font-bold text-slate-800 flex justify-between">
              <span>Total Est. Biaya Bulanan:</span>
              <span className="text-rose-600 font-mono">Rp 13.500.000+ / bln</span>
            </div>
          </div>

          {/* Option B: Temuin */}
          <div className="border-2 border-indigo-500 rounded-xl p-5 space-y-3 bg-indigo-50/40 relative">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-indigo-950 text-sm">Opsi 2: Temuin (GTM Engineering)</h3>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
                Rekomendasi
              </span>
            </div>

            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Langsung jalan dalam 3 hari, zero recruitment overhead</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Sudah termasuk seluruh biaya tool scraping, AI enrichment, & secondary domain</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Garansi qualified meeting langsung masuk ke kalender Google Meet sales Anda</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Disediakan Sales Cheat Sheet & briefing khusus setiap prospek</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-indigo-200 font-bold text-indigo-950 flex justify-between">
              <span>Biaya Jasa Temuin:</span>
              <span className="text-indigo-700 font-mono">Mulai Rp 8.000.000 / bln (Hemat 40%+)</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
