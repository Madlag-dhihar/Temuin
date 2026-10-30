import React from 'react';
import { 
  Sparkles, 
  Presentation, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Layers, 
  Cpu, 
  Target, 
  Users, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Briefcase
} from 'lucide-react';

export const VenturePitchTab: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3.5 py-1 rounded-full mb-3">
          <Presentation className="w-3.5 h-3.5 text-emerald-700" />
          <span>MATA KULIAH VENTURE CREATION • CHEAT SHEET & DECK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
          Panduan Konsep Bisnis: Jasa GTM Engineering
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
          Struktur lengkap ide bisnis, validasi masalah, batasan tanggung jawab jasa, dan skema model monetisasi yang siap dipresentasikan di depan dosen dan tim evaluator.
        </p>
      </div>

      {/* SECTION 1: ELEVATOR PITCH & PENJELASAN CASUAL */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>1. Contoh Pitch & Penjelasan Sederhana (Tanpa Jargon)</span>
        </div>

        <div className="p-5 bg-indigo-50/60 border border-indigo-200/80 rounded-xl text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
          &ldquo;Jasa GTM Engineering adalah bisnis yang membantu startup atau perusahaan mencari calon customer baru dengan memanfaatkan data, AI, dan automasi. Misalnya, kalau sebuah startup ingin mencari perusahaan yang cocok dengan produknya, kita akan membantu mencari perusahaan tersebut, menemukan kontak orang yang tepat, lalu menghubungi mereka melalui email secara otomatis.
          <br /><br />
          Kalau calon customer tertarik, kita bantu sampai mereka melakukan meeting dengan tim sales dari startup tersebut. Setelah itu, proses deal atau closing menjadi tanggung jawab startup. Jadi sederhananya, kita membantu perusahaan mencari customer dan mendapatkan meeting tanpa harus melakukan semuanya secara manual.&rdquo;
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block mb-1">Bukan Cold Email Biasa</strong>
            Bukan sekadar mengirim ribuan email blast, tapi merancang sistem data, verifikasi kontak, dan AI personalization.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block mb-1">Model Jasa (Service Agency)</strong>
            Klien membayar untuk setup & operasional sistem, tidak perlu pusing mengotak-atik software rumit sendiri.
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <strong className="text-slate-800 block mb-1">Finish Line: Qualified Meeting</strong>
            Batas jasa berhenti ketika meeting sales sudah masuk kalender klien.
          </div>
        </div>
      </div>

      {/* SECTION 2: PERBEDAAN COLD EMAIL BIASA VS GTM ENGINEERING */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>2. Mengapa Disebut &ldquo;GTM Engineering&rdquo; dan Bukan Sekadar &ldquo;Jasa Cold Email&rdquo;?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cold email tradisional */}
          <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Jasa Cold Email Tradisional</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Membeli list database kontak umum yang sering usang/bounced.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Pesan generik berbasis template satu-untuk-semua (&ldquo;Halo, kami dari PT ABC...&rdquo;).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Sering masuk folder Spam karena domain pengirim tidak di-warmup dengan benar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>Fokus pada metrik semu (berapa ribu email terkirim, bukan hasil meeting).</span>
              </li>
            </ul>
          </div>

          {/* GTM Engineering */}
          <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Jasa GTM Engineering (Bisnis Kami)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Data Waterfall & Enrichment:</strong> Mencari perusahaan berdasarkan trigger event nyata (misal: baru buka 5 cabang, baru ganti direksi, atau rekrut posisi baru).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Lead Scoring Intentional:</strong> Menyaring hanya prospek yang paling relevan (skor &gt; 85/100).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>AI Personalization:</strong> Setiap email menyebutkan fakta nyata perusahaan prospek sehingga tidak terasa seperti bot spam.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>End-to-End Handover:</strong> Hasil akhirnya bukan &ldquo;email terkirim&rdquo;, melainkan <strong>booking sales meeting nyata</strong> di Google Meet / Zoom.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 3: SCOPE MATRIX (PEMBAGIAN TANGGUNG JAWAB) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>3. Matriks Pembagian Tanggung Jawab (Scope Jasa)</span>
        </div>
        <p className="text-xs text-slate-600">
          Kunci keberhasilan model bisnis ini adalah batasan yang jelas agar klien tidak menuntut hal di luar kapasitas teknis GTM.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold">
                <th className="p-3 border-b border-slate-200">Tahapan Aktivitas</th>
                <th className="p-3 border-b border-slate-200 text-indigo-700">Tanggung Jawab Kami (GTM Agency)</th>
                <th className="p-3 border-b border-slate-200 text-slate-800">Tanggung Jawab Klien (Startup)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-800">1. Penentuan Target (ICP)</td>
                <td className="p-3 text-indigo-700">Menyusun filter data, industri, ukuran, & jabatan target.</td>
                <td className="p-3 text-slate-600">Menjelaskan profil customer ideal & product knowledge.</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-800">2. Pencarian Data Kontak</td>
                <td className="p-3 text-indigo-700">Scraping data, verifikasi email, dan pengecekan LinkedIn.</td>
                <td className="p-3 text-slate-600">Terima beres (tidak perlu riset manual).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">3. Lead Scoring & Sinyal</td>
                <td className="p-3 text-indigo-700">Menghitung skor probabilitas minat berdasarkan data publik.</td>
                <td className="p-3 text-slate-600">Memberikan feedback jika ada kriteria diskualifikasi.</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="p-3 font-semibold text-slate-800">4. Copywriting & AI Hook</td>
                <td className="p-3 text-indigo-700">Menulis angle pesan yang menarik dan relevan untuk tiap prospek.</td>
                <td className="p-3 text-slate-600">Meninjau & menyetujui materi pitch awal produk.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-800">5. Outreach & Follow-up</td>
                <td className="p-3 text-indigo-700">Mengelola domain warmup, pengiriman email, & follow-up otomatis.</td>
                <td className="p-3 text-slate-600">Tidak perlu repot operasional inbox pengiriman.</td>
              </tr>
              <tr className="bg-emerald-50/70">
                <td className="p-3 font-bold text-emerald-950">6. Booking Sales Meeting (HANDOVER)</td>
                <td className="p-3 text-emerald-900 font-semibold">Memasukkan jadwal ke Google Meet klien + memberikan cheat sheet briefing.</td>
                <td className="p-3 text-emerald-950 font-bold">Menerima jadwal & menghadiri meeting tepat waktu.</td>
              </tr>
              <tr className="bg-amber-50/60">
                <td className="p-3 font-bold text-amber-950">7. Demo, Negosiasi & Closing Deal</td>
                <td className="p-3 text-slate-400 italic">Bukan tanggung jawab kami (di luar scope).</td>
                <td className="p-3 text-amber-900 font-bold">100% Tanggung jawab tim sales klien.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: MODEL BISNIS & PRICING */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <DollarSign className="w-4 h-4" />
          <span>4. Model Bisnis & Skema Tarif (Monetization Options)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Paket 1 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Opsi A: Paling Populer</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">Fixed Monthly Retainer</h4>
              <div className="text-xl font-semibold text-indigo-600 mt-2">Rp 8.000.000 <span className="text-xs font-normal text-slate-500">/ bulan</span></div>
              <p className="text-xs text-slate-600 mt-2">
                Cocok untuk startup yang ingin arus meeting stabil tiap bulan tanpa beban rekrutmen.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-1.5">✓ 400–600 Verified Leads / bulan</li>
                <li className="flex items-center gap-1.5">✓ Setup domain & email warmup</li>
                <li className="flex items-center gap-1.5">✓ Target 4–8 Qualified Meetings / bln</li>
                <li className="flex items-center gap-1.5">✓ Briefing sheet sebelum meeting</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              Predictable revenue bagi agency.
            </div>
          </div>

          {/* Paket 2 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Opsi B: Enterprise Setup</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">Setup Fee + Retainer</h4>
              <div className="text-xl font-semibold text-indigo-600 mt-2">Rp 5 Jt <span className="text-xs font-normal text-slate-500">setup</span> + Rp 7 Jt/bln</div>
              <p className="text-xs text-slate-600 mt-2">
                Ada biaya komprehensif di awal untuk audit pasar, integrasi CRM klien, dan riset mendalam.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-1.5">✓ Custom enrichment logic (Clay)</li>
                <li className="flex items-center gap-1.5">✓ 800+ Verified Leads / bulan</li>
                <li className="flex items-center gap-1.5">✓ Integrasi HubSpot / Salesforce</li>
                <li className="flex items-center gap-1.5">✓ Target 8–15 Qualified Meetings</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              Mengunci komitmen klien di awal.
            </div>
          </div>

          {/* Paket 3 */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Opsi C: Performance Hybrid</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">Pay-Per-Qualified-Meeting</h4>
              <div className="text-xl font-semibold text-emerald-600 mt-2">Rp 3.5 Jt <span className="text-xs font-normal text-slate-500">base</span> + Rp 750rb / meeting</div>
              <p className="text-xs text-slate-600 mt-2">
                Sangat menarik bagi calon klien yang ragu karena risiko hasil dibagi bersama.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-1.5">✓ Base fee menutupi biaya tools</li>
                <li className="flex items-center gap-1.5">✓ Klien hanya bayar meeting yang hadir</li>
                <li className="flex items-center gap-1.5">✓ Ada kriteria minimum ICP terverifikasi</li>
                <li className="flex items-center gap-1.5">✓ Win-win alignment</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              Tingkat konversi closing klien tinggi.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: TECH STACK YANG DIJALANKAN DI BELAKANG LAYAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>5. Tech Stack & Automasi yang Dioperasikan (Behind The Scenes)</span>
        </div>
        <p className="text-xs text-slate-600">
          Klien tidak perlu membeli lisensi tools mahal ini satu per satu. Biaya langganan tools ditanggung oleh kami dan kami yang mengoperasikannya:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Clay.com</span>
            <span className="text-[11px] text-slate-500 block">Waterfall data enrichment, scraping info web, & AI scoring flow.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Apollo / LinkedIn</span>
            <span className="text-[11px] text-slate-500 block">Database direktori B2B decision makers & verifikasi email.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Instantly / Smartlead</span>
            <span className="text-[11px] text-slate-500 block">Domain rotation, automated email warmup, & high deliverability.</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">Cal.com / Google Meet</span>
            <span className="text-[11px] text-slate-500 block">Booking kalender otomatis langsung ke jadwal tim sales klien.</span>
          </div>
        </div>
      </div>

      {/* SECTION 6: FAQ / ANTISIPASI PERTANYAAN DOSEN */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>6. Antisipasi Pertanyaan Kritis dari Dosen / Tim Penilai</span>
        </div>

        <div className="space-y-3.5 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">
              T: &ldquo;Kenapa startup tidak membeli software Apollo atau Clay sendiri saja?&rdquo;
            </strong>
            <p className="leading-relaxed text-slate-600">
              <strong>J:</strong> Tools seperti Clay atau Apollo sangat powerful tapi kurva pembelajarannya tinggi (kompleks), harganya mahal (bisa $500–$1.000/bulan hanya untuk software), dan butuh skill data engineering untuk mengintegrasikannya. Startup biasanya tidak punya waktu atau staf khusus untuk itu. Lebih murah dan cepat menyewa jasa kami yang langsung terima beres.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">
              T: &ldquo;Apakah email outreach seperti ini tidak dianggap spam atau merusak reputasi klien?&rdquo;
            </strong>
            <p className="leading-relaxed text-slate-600">
              <strong>J:</strong> Tidak, karena dua hal: Pertama, kami menggunakan secondary domain terpisah yang sudah di-warmup, bukan domain email utama perusahaan klien. Kedua, email kami sangat segmented (hanya ratusan leads berkualitas dengan hook spesifik), bukan mengirimkan ribuan pesan spam acak. Pesan terasa seperti email konsultatif 1-on-1.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 font-bold block text-sm">
              T: &ldquo;Kenapa bisnis kalian berhenti di qualified meeting dan tidak ikut closing deal?&rdquo;
            </strong>
            <p className="leading-relaxed text-slate-600">
              <strong>J:</strong> Karena closing deal software B2B memerlukan pemahaman produk mendalam, kemampuan negosiasi harga, dan penyesuaian teknis kontrak yang hanya dimiliki oleh internal founder atau sales executive perusahaan klien. Peran kami adalah memecahkan bottleneck terbesar mereka: yaitu membuka pintu awal (pipeline generation).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
