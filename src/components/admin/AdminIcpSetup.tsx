import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CampaignConfig } from '../../types';
interface Props {config:CampaignConfig;onChangeConfig:(config:CampaignConfig)=>void;onProceedToLeads:()=>void}
export const AdminIcpSetup: React.FC<Props> = ({config,onChangeConfig,onProceedToLeads}) => {
 const [note,setNote]=useState(config.reviewNote || '');
 const [error,setError]=useState('');
 const status = config.briefStatus || 'sample';
 const labels = {sample:'Brief contoh',pending_review:'Menunggu review',approved:'Disetujui',changes_requested:'Perlu revisi'};
 return <div className="campaign-page">
  <div className="campaign-heading"><p className="eyebrow">CLIENT BRIEF</p><h1>Tinjau arah campaign.</h1><p>Client menentukan kebutuhan dan target. Tim Temuin meninjau kecocokan, membantu menyempurnakan brief, lalu menjalankan campaign.</p></div>
  <section className="campaign-card">
   <div className="campaign-section-heading"><h2>{config.name}</h2><span className="brief-status" role="status">{labels[status]}</span></div>
   {config.needsHelp && <div className="brief-notice"><strong>Client meminta bantuan menentukan target.</strong><p>Berikan rekomendasi industri, wilayah, atau jabatan melalui catatan review.</p></div>}
   <dl className="campaign-summary">
    <div><dt>Client</dt><dd>{config.clientName}</dd></div>
    <div><dt>Solusi produk</dt><dd>{config.productPitch}</dd></div>
    <div><dt>Industri</dt><dd>{config.industry}</dd></div>
    <div><dt>Ukuran perusahaan</dt><dd>{config.companySize} karyawan</dd></div>
    <div><dt>Wilayah</dt><dd>{config.locationDetail}, {config.country}</dd></div>
    <div><dt>Jabatan</dt><dd>{config.targetJobTitles.join(', ') || 'Memerlukan rekomendasi'}</dd></div>
   </dl>
   <p className="campaign-demo-note">Parameter diisi oleh client melalui Campaign setup. Data di bawah ini merupakan brief, bukan hasil pencarian prospek.</p>
   {status === 'pending_review' && <div className="campaign-field mt-6"><label htmlFor="review-note">Rekomendasi untuk client</label><textarea id="review-note" rows={3} value={note} onChange={e=>{setNote(e.target.value);setError('');}} placeholder="Contoh: Fokus pada Head of Operations untuk restoran multi-outlet."/>{error && <p className="field-error" role="alert">{error}</p>}<div className="campaign-actions"><button className="campaign-secondary" onClick={()=>{if(!note.trim()){setError('Tambahkan catatan agar client tahu apa yang perlu direvisi.');return;}onChangeConfig({...config,briefStatus:'changes_requested',reviewNote:note.trim()});}}>Minta revisi client</button><button className="campaign-primary" onClick={()=>onChangeConfig({...config,briefStatus:'approved',reviewNote:note.trim() || undefined})}><CheckCircle2 size={16}/>Setujui brief</button></div></div>}
   {status === 'changes_requested' && <div className="brief-notice"><strong>Menunggu pembaruan client</strong><p>{config.reviewNote}</p></div>}
   {status === 'approved' && config.reviewNote && <div className="brief-notice"><strong>Catatan review</strong><p>{config.reviewNote}</p></div>}
   <div className="campaign-actions"><p className="campaign-demo-note">Dataset demo tetap tersedia untuk mencoba alur operasional.</p><button className="campaign-secondary" onClick={onProceedToLeads}>Buka lead database<ArrowRight size={15}/></button></div>
  </section>
 </div>;
};
