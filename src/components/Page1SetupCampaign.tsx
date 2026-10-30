import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, HelpCircle, Send } from 'lucide-react';
import { CampaignConfig, CampaignIndustry, CompanySize } from '../types';

interface Page1SetupCampaignProps {
  config: CampaignConfig;
  reviewConfig: CampaignConfig;
  onChangeConfig: (config: CampaignConfig) => void;
  onSaveDraft: (config: CampaignConfig) => void;
  onSubmit: (config: CampaignConfig) => void;
}
const industries: CampaignIndustry[] = ['Restoran & F&B','B2B SaaS & Tech','Logistik & Supply Chain','Retail & FMCG','Fintech & Payment','Agensi Digital & B2B Service'];
const sizes: CompanySize[] = ['10–50','50–200','200–500','500+'];
const titles = ['Founder','CEO','COO','Head of Operations','VP Sales / BD','Procurement Director'];
const steps = ['Bisnis Anda','Target pelanggan','Periksa & kirim'];
export const Page1SetupCampaign: React.FC<Page1SetupCampaignProps> = ({config,reviewConfig,onChangeConfig,onSaveDraft,onSubmit}) => {
  const [step,setStep] = useState(0);
  const [errors,setErrors] = useState<Record<string,string>>({});
  const [notice,setNotice] = useState('');
  const [customTitle,setCustomTitle] = useState('');
  const [helpOpen,setHelpOpen] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const update = (patch: Partial<CampaignConfig>) => {onChangeConfig({...config,...patch});setNotice('');setErrors({});};
  const validate = () => {
    const next: Record<string,string> = {};
    if(step === 0 || step === 2) {
      if(!config.name.trim()) next.name='Masukkan nama campaign.';
      if(!config.productPitch.trim()) next.productPitch='Ceritakan solusi produk Anda.';
    }
    if(step === 1 || step === 2) {
      if(!config.country.trim()) next.country='Masukkan negara target.';
      if(!config.locationDetail.trim()) next.locationDetail='Masukkan kota atau wilayah target.';
      if(!config.targetJobTitles.length && !config.needsHelp) next.titles='Pilih minimal satu jabatan atau minta bantuan Temuin.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const navigate = (next: number) => {setStep(next);setErrors({});setNotice('');requestAnimationFrame(()=>heading.current?.focus());};
  const toggleTitle = (title: string) => update({targetJobTitles:config.targetJobTitles.includes(title) ? config.targetJobTitles.filter(t=>t!==title) : [...config.targetJobTitles,title]});
  const addTitle = () => {const title=customTitle.trim();if(title && !config.targetJobTitles.includes(title)) update({targetJobTitles:[...config.targetJobTitles,title]});setCustomTitle('');};
  const submitted = reviewConfig.briefStatus === 'pending_review';
  return <div className="campaign-page">
    <div className="campaign-heading"><p className="eyebrow"><span className="eyebrow-dot"/> MULAI DARI TARGET ANDA</p><h1>Temukan pelanggan yang tepat.</h1><p>Ceritakan bisnis dan target Anda. Tim Temuin menangani pencarian prospek hingga meeting.</p></div>
    {reviewConfig.briefStatus === 'changes_requested' && <div className="brief-notice" role="status"><strong>Masukan dari tim Temuin</strong><p>{reviewConfig.reviewNote || 'Lengkapi brief sebelum mengirimkannya kembali.'}</p></div>}
    {submitted && <div className="brief-notice" role="status"><strong>Brief sedang ditinjau.</strong><p>Tim Temuin akan memeriksa target dan kebutuhan Anda. Mengirim revisi akan memperbarui brief yang sedang ditinjau.</p></div>}
    {reviewConfig.briefStatus === 'approved' && <div className="brief-notice"><strong>Brief telah disetujui.</strong><p>Anda tetap bisa mengubah target. Perubahan perlu ditinjau ulang oleh tim Temuin.</p></div>}
    <ol className="campaign-steps" aria-label="Tahapan setup">{steps.map((label,i)=><li key={label} aria-current={step===i?'step':undefined}><span>{i<step?<Check size={14}/>:i+1}</span>{label}</li>)}</ol>
    <form className="campaign-card" onSubmit={e=>{e.preventDefault();if(!validate()) return;if(step<2) navigate(step+1);else {onSubmit({...config,briefStatus:'pending_review',reviewNote:undefined});setNotice('Brief terkirim untuk ditinjau tim Temuin.');}}}>
      <div className="campaign-section-heading"><h2 ref={heading} tabIndex={-1}>{steps[step]}</h2><span>{step+1} / 3</span></div>
      {step === 0 && <div className="campaign-fields">
        <div className="campaign-field"><label htmlFor="campaign-name">Nama pencarian <span>*</span></label><input id="campaign-name" value={config.name} onChange={e=>update({name:e.target.value})} placeholder="Contoh: Ekspansi pelanggan POS di Jakarta" aria-invalid={!!errors.name} aria-describedby="campaign-name-hint"/><p id="campaign-name-hint">Gunakan nama yang mudah dikenali oleh tim Anda.</p>{errors.name && <p className="field-error" role="alert">{errors.name}</p>}</div>
        <div className="campaign-field"><label htmlFor="product-pitch">Apa yang produk Anda bantu selesaikan? <span>*</span></label><textarea id="product-pitch" rows={4} value={config.productPitch} onChange={e=>update({productPitch:e.target.value})} placeholder="Kami membantu restoran mengelola stok dan transaksi dari satu sistem." aria-invalid={!!errors.productPitch} aria-describedby="product-pitch-hint"/><p id="product-pitch-hint">Sebutkan produk, masalah pelanggan, dan manfaat utamanya dalam 2–3 kalimat.</p>{errors.productPitch && <p className="field-error" role="alert">{errors.productPitch}</p>}</div>
        <details className="campaign-example"><summary>Lihat contoh brief yang jelas</summary><p>“Kami menyediakan POS untuk restoran multi-outlet. Produk kami menyatukan laporan penjualan dan stok agar pemilik dapat memantau seluruh cabang tanpa rekap manual.”</p></details>
      </div>}
      {step === 1 && <div className="campaign-fields">
        <div className="campaign-field"><label htmlFor="target-industry">Industri target</label><select id="target-industry" value={config.industry} onChange={e=>update({industry:e.target.value as CampaignIndustry})}>{industries.map(i=><option key={i}>{i}</option>)}</select><p>Pilih industri calon pelanggan Anda.</p></div>
        <div className="campaign-two-cols">
          <div className="campaign-field"><label htmlFor="target-country">Negara <span>*</span></label><input id="target-country" value={config.country} onChange={e=>update({country:e.target.value})} aria-invalid={!!errors.country}/>{errors.country && <p className="field-error" role="alert">{errors.country}</p>}</div>
          <div className="campaign-field"><label htmlFor="target-location">Kota / wilayah <span>*</span></label><input id="target-location" value={config.locationDetail} onChange={e=>update({locationDetail:e.target.value})} placeholder="Contoh: Jabodetabek, Bandung" aria-invalid={!!errors.locationDetail}/>{errors.locationDetail && <p className="field-error" role="alert">{errors.locationDetail}</p>}</div>
        </div>
        <div className="campaign-field"><label htmlFor="company-size">Ukuran perusahaan target</label><select id="company-size" value={config.companySize} onChange={e=>update({companySize:e.target.value as CompanySize})}>{sizes.map(s=><option key={s} value={s}>{s} karyawan</option>)}</select><p>Perkiraan cukup. Tim Temuin membantu menilai kecocokan target Anda.</p></div>
        <fieldset className="campaign-field"><legend>Siapa yang ingin Anda temui?</legend><p>Pilih jabatan pengambil keputusan. Anda bisa menambahkan jabatan sendiri.</p><div className="campaign-title-options">{Array.from(new Set([...titles,...config.targetJobTitles])).map(t=><button key={t} type="button" aria-pressed={config.targetJobTitles.includes(t)} onClick={()=>toggleTitle(t)}>{config.targetJobTitles.includes(t)&&<Check size={13}/>} {t}</button>)}</div>
          <details className="campaign-custom-title"><summary>Tambah jabatan lain</summary><div className="campaign-inline"><input aria-label="Jabatan lain" value={customTitle} onChange={e=>setCustomTitle(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTitle();}}} placeholder="Contoh: Head of Procurement"/><button type="button" onClick={addTitle}>Tambah</button></div></details>
          {errors.titles && <p className="field-error" role="alert">{errors.titles}</p>}
        </fieldset>
        <label className="campaign-help-check"><input type="checkbox" checked={!!config.needsHelp} onChange={e=>update({needsHelp:e.target.checked})}/><span>Saya butuh bantuan Temuin untuk menentukan target.<small>Tim akan meninjau kebutuhan ini bersama brief Anda.</small></span></label>
      </div>}
      {step === 2 && <div className="campaign-fields">
        <p className="campaign-intro">Pastikan target sudah sesuai. Tim Temuin akan meninjau brief sebelum menjalankan campaign.</p>
        <dl className="campaign-summary">
          <div><dt>Campaign</dt><dd>{config.name}<button type="button" onClick={()=>navigate(0)}>Ubah</button></dd></div>
          <div><dt>Solusi produk</dt><dd>{config.productPitch}</dd></div>
          <div><dt>Target pelanggan</dt><dd>{config.industry} · {config.companySize} karyawan<button type="button" onClick={()=>navigate(1)}>Ubah</button></dd></div>
          <div><dt>Wilayah</dt><dd>{config.locationDetail}, {config.country}</dd></div>
          <div><dt>Jabatan</dt><dd>{config.targetJobTitles.join(', ') || 'Perlu rekomendasi Temuin'}</dd></div>
          <div><dt>Bantuan target</dt><dd>{config.needsHelp?'Diminta':'Tidak diperlukan'}</dd></div>
        </dl>
        <div className="campaign-handover"><strong>Setelah brief dikirim</strong><p>Temuin meninjau target, menyiapkan prospek, dan mengelola outreach. Anda memantau hasil serta melanjutkan sales call dan closing.</p></div>
        <p className="campaign-demo-note">Prototype: perubahan brief tersimpan di browser ini dan terlihat di tampilan Admin. Data prospek contoh tidak otomatis berubah atau dicari dari internet.</p>
      </div>}
      {Object.keys(errors).length > 0 && step === 2 && <p className="field-error" role="alert">Brief belum lengkap. Periksa nama, solusi produk, wilayah, dan jabatan pada langkah sebelumnya.</p>}
      <div className="campaign-actions"><div>{step>0 && <button className="campaign-secondary" type="button" onClick={()=>navigate(step-1)}><ArrowLeft size={15}/>Kembali</button>}<button className="campaign-text" type="button" onClick={()=>{onSaveDraft(config);setNotice('Draft tersimpan di browser ini.');}}>Simpan draft</button></div><button className="campaign-primary" type="submit">{step<2?'Lanjut':'Kirim ke Temuin'}{step<2?<ArrowRight size={15}/>:<Send size={15}/>}</button></div>
      <p className="campaign-save-message" role="status" aria-live="polite">{notice}</p>
    </form>
    <div className="campaign-support"><button type="button" aria-expanded={helpOpen} onClick={()=>setHelpOpen(!helpOpen)}><HelpCircle size={16}/>Belum yakin dengan target Anda?</button>{helpOpen && <p>Mulai dari pelanggan yang paling terbantu oleh produk Anda. Pilih industri dan wilayahnya, lalu centang “Saya butuh bantuan” pada langkah Target pelanggan. Tim Temuin dapat membantu menyempurnakan target; Anda menentukan kebutuhan bisnisnya.</p>}</div>
  </div>;
};
