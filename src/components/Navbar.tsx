import React from 'react';
import { ArrowUpRight, LayoutDashboard, Users, CalendarCheck, TrendingUp, Building2, Sliders, Database, BrainCircuit, Mail, Kanban, RotateCcw, Presentation } from 'lucide-react';
import { ConnectionMark } from './ConnectionMark';
import { PresetData, ALL_PRESETS } from '../data/presetData';
import { UserRole, ClientView, AdminView } from '../types';

interface NavbarProps {
  currentTab: 'prototype' | 'pitch';
  setCurrentTab: (tab: 'prototype' | 'pitch') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  clientView: ClientView;
  setClientView: (view: ClientView) => void;
  adminView: AdminView;
  setAdminView: (view: AdminView) => void;
  selectedPreset: PresetData;
  onSelectPreset: (preset: PresetData) => void;
  onResetData: () => void;
  clientName?: string;
  bookedMeetingsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({currentTab, setCurrentTab, userRole, setUserRole, clientView, setClientView, adminView, setAdminView, selectedPreset, onSelectPreset, onResetData, clientName = 'RestoTech POS', bookedMeetingsCount = 5}) => {
  const clientItems = [['overview','Ringkasan',LayoutDashboard],['campaign_setup','Target pelanggan',Sliders],['leads','Calon pelanggan',Users],['meetings','Meeting & hasil',CalendarCheck]] as const;
  const adminItems = [['campaigns','Campaigns',Building2],['icp_setup','Review brief',Sliders],['lead_database','Lead database',Database],['ai_scoring','AI scoring',BrainCircuit],['outreach','Outreach',Mail],['pipeline','Pipeline',Kanban],['meetings','Meetings',CalendarCheck]] as const;
  return <header className="temuin-sidebar">
    <div className="temuin-brand"><img className="temuin-logo" src="/assets/brand/temuin-logo.jpeg" alt="Temuin" width="1280" height="421"/></div>
    <div className="temuin-workspace"><span className="temuin-avatar">{userRole === 'client' ? clientName.slice(0,2).toUpperCase() : 'TM'}</span><div><strong>{userRole === 'client' ? clientName : 'Temuin workspace'}</strong><span>{userRole === 'client' ? 'Ruang kerja Anda' : 'Internal operations'}</span></div></div>
    <div className="temuin-role" aria-label="Pilih tampilan">{(['client','admin'] as const).map(role => <button key={role} aria-pressed={userRole === role} className={userRole === role ? 'is-selected' : ''} onClick={() => {setUserRole(role);setCurrentTab('prototype');}}>{role === 'client' ? 'Client' : 'Admin'}</button>)}</div>
    <p className="temuin-nav-label">WORKSPACE</p>
    <nav className="temuin-nav" aria-label="Navigasi utama">{(userRole === 'client' ? clientItems : adminItems).map(([id,label,Icon]) => <button key={id} aria-current={currentTab === 'prototype' && (userRole === 'client' ? clientView : adminView) === id ? 'page' : undefined} onClick={() => {setCurrentTab('prototype');if(userRole === 'client') setClientView(id as ClientView);else setAdminView(id as AdminView);}}><Icon size={18}/><span>{label}</span>{id === 'meetings' && <small>{bookedMeetingsCount}</small>}</button>)}</nav>
    <div className="sidebar-brand-note" aria-hidden="true"><ConnectionMark/><p>Anda fokus menjual.<br/><em>Kami bantu temukan.</em></p><span>THE TEMUIN WAY</span></div>
    <details className="temuin-sidebar-bottom"><summary>Demo & panduan</summary>
      <p className="temuin-nav-label">EXPLORE</p>
      <button className="temuin-deck" aria-pressed={currentTab === 'pitch'} onClick={() => setCurrentTab(currentTab === 'pitch' ? 'prototype' : 'pitch')}><Presentation size={18}/><span>Konsep & model bisnis</span><ArrowUpRight size={14}/></button>
      <label className="temuin-nav-label" htmlFor="demo-preset">DEMO SCENARIO</label>
      <select id="demo-preset" value={selectedPreset.id} onChange={e => {const preset=ALL_PRESETS.find(p => p.id === e.target.value);if(preset) onSelectPreset(preset);}}>{ALL_PRESETS.map(p => <option key={p.id} value={p.id}>{p.badge}</option>)}</select>
      <button className="temuin-reset" onClick={onResetData}><RotateCcw size={14}/>Reset demo data</button>
      <div className="temuin-sidebar-note"><span/>Service prototype <small>v4.0</small></div>
    </details>
  </header>;
};
