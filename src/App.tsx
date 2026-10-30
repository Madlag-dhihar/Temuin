import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VenturePitchTab } from './components/VenturePitchTab';
import { PRESET_RESTAURANT_SAAS, ALL_PRESETS, PresetData } from './data/presetData';
import { CampaignConfig, FunnelStats, Lead, UserRole, ClientView, AdminView } from './types';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  UserCheck, 
  ShieldAlert,
  ArrowLeftRight,
  Info
} from 'lucide-react';

// Client Views
import { Page1SetupCampaign } from './components/Page1SetupCampaign';
import { ClientOverview } from './components/client/ClientOverview';
import { ClientLeads } from './components/client/ClientLeads';
import { ClientMeetings } from './components/client/ClientMeetings';
import { ClientPerformance } from './components/client/ClientPerformance';

// Admin Views
import { AdminCampaigns } from './components/admin/AdminCampaigns';
import { AdminIcpSetup } from './components/admin/AdminIcpSetup';
import { AdminLeadDatabase } from './components/admin/AdminLeadDatabase';
import { AdminAiScoring } from './components/admin/AdminAiScoring';
import { AdminOutreach } from './components/admin/AdminOutreach';
import { AdminPipeline } from './components/admin/AdminPipeline';
import { AdminMeetings } from './components/admin/AdminMeetings';

// Shared Modal
import { SalesCheatSheetModal } from './components/SalesCheatSheetModal';

const STORAGE_KEY = 'temuin-campaign-brief-v2';
function readCampaignSession(): {config: CampaignConfig; draft: CampaignConfig; presetId: string} | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const data = JSON.parse(raw);
    const valid = (value: any) => value && typeof value.name === 'string' && typeof value.productPitch === 'string' && typeof value.country === 'string' && typeof value.locationDetail === 'string' && Array.isArray(value.targetJobTitles) && value.targetJobTitles.every((t: unknown)=>typeof t === 'string');
    return valid(data.config) && valid(data.draft) && ALL_PRESETS.some(p=>p.id===data.presetId) ? data : null;
  } catch { return null; }
}
export default function App() {
  const [savedSession] = useState(readCampaignSession);
  const initialPreset = ALL_PRESETS.find(p=>p.id===savedSession?.presetId) || PRESET_RESTAURANT_SAAS;
  const [currentTab, setCurrentTab] = useState<'prototype' | 'pitch'>('prototype');
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [clientView, setClientView] = useState<ClientView>('overview');
  const [adminView, setAdminView] = useState<AdminView>('campaigns');
  const [selectedPreset, setSelectedPreset] = useState<PresetData>(initialPreset);

  const [config, setConfig] = useState<CampaignConfig>(savedSession?.config || initialPreset.config);
  const [leads, setLeads] = useState<Lead[]>(initialPreset.leads);
  const [funnelStats, setFunnelStats] = useState<FunnelStats>(initialPreset.funnelStats);

  const [clientDraft, setClientDraft] = useState<CampaignConfig>(savedSession?.draft || initialPreset.config);
  const [storageWarning, setStorageWarning] = useState('');
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({config, draft: clientDraft, presetId: selectedPreset.id}));
      setStorageWarning('');
    } catch { setStorageWarning('Penyimpanan browser tidak tersedia. Brief hanya tersimpan selama halaman ini terbuka.'); }
  }, [config, clientDraft, selectedPreset.id]);

  // Modal cheat sheet helper
  const [activeCheatSheetLead, setActiveCheatSheetLead] = useState<Lead | null>(null);

  const handleSelectPreset = (preset: PresetData) => {
    setSelectedPreset(preset);
    setConfig(preset.config);
    setClientDraft(preset.config);
    setLeads(preset.leads);
    setFunnelStats(preset.funnelStats);
  };

  const handleResetData = () => {
    try { localStorage.removeItem('temuin-results-v4'); localStorage.removeItem('temuin-availability-v4'); } catch {}
    window.dispatchEvent(new Event('temuin-reset-results')); 
    setConfig(selectedPreset.config);
    setClientDraft(selectedPreset.config);
    setLeads(selectedPreset.leads);
    setFunnelStats(selectedPreset.funnelStats);
    setClientView('overview');
    setAdminView('campaigns');
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
  };

  const bookedMeetingsCount = leads.filter((l) => l.status === 'meeting_booked').length;

  return (
    <div className="temuin-app min-h-screen flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        clientView={clientView}
        setClientView={setClientView}
        adminView={adminView}
        setAdminView={setAdminView}
        selectedPreset={selectedPreset}
        onSelectPreset={handleSelectPreset}
        onResetData={handleResetData}
        clientName={config.clientName || 'RestoTech POS'}
        bookedMeetingsCount={bookedMeetingsCount}
      />

      <div className="temuin-topbar"><div className="topbar-location"><span className="topbar-symbol" aria-hidden="true">↗</span><span className="temuin-breadcrumb">Workspace / </span><strong>{currentTab === 'pitch' ? 'Konsep bisnis' : userRole === 'client' ? ({overview: 'Ringkasan', campaign_setup: 'Target pelanggan', leads: 'Calon pelanggan', meetings: 'Meeting & hasil', performance: 'Hasil campaign'}[clientView]) : ({campaigns: 'Campaigns', icp_setup: 'Review brief', lead_database: 'Lead database', ai_scoring: 'AI scoring', outreach: 'Outreach', pipeline: 'Pipeline', meetings: 'Meetings', admin_meetings: 'Meetings'}[adminView])}</strong></div><div className="topbar-meta"><span className="temuin-live"><span/>Demo workspace</span><span className="topbar-avatar" aria-hidden="true">{userRole === 'client' ? 'CL' : 'TM'}</span></div></div>
      {storageWarning && <p className="brief-notice" role="alert">{storageWarning}</p>}
      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'pitch' ? (
          <VenturePitchTab />
        ) : (
          <div>
            {/* CLIENT SIDE RENDERING */}
            {userRole === 'client' && (
              <div>
                {clientView === 'overview' && (
                  <ClientOverview
                    config={config}
                    funnelStats={funnelStats}
                    leads={leads}
                    onNavigateToSetup={() => setClientView('campaign_setup')}
                    onNavigateToMeetings={() => setClientView('meetings')}
                    onNavigateToLeads={() => setClientView('leads')}
                    onNavigateToPerformance={() => setClientView('performance')}
                  />
                )}

                {clientView === 'campaign_setup' && (
                  <Page1SetupCampaign config={clientDraft} reviewConfig={config}
                    onChangeConfig={setClientDraft}
                    onSaveDraft={setClientDraft}
                    onSubmit={(brief) => {setConfig(brief);setClientDraft(brief);}} />
                )}
                {clientView === 'leads' && (
                  <ClientLeads
                    leads={leads}
                    onOpenMeetingSheet={(lead) => setActiveCheatSheetLead(lead)}
                  />
                )}

                {clientView === 'meetings' && (
                  <ClientMeetings leads={leads} onUpdateLead={handleUpdateLead} />
                )}

                {clientView === 'performance' && (
                  <ClientPerformance
                    config={config}
                    funnelStats={funnelStats}
                    leads={leads}
                  />
                )}
              </div>
            )}

            {/* ADMIN SIDE RENDERING */}
            {userRole === 'admin' && (
              <div>
                {adminView === 'campaigns' && (
                  <AdminCampaigns
                    currentConfig={config}
                    selectedPreset={selectedPreset}
                    onSelectPreset={handleSelectPreset}
                    onOpenCampaign={() => setAdminView('icp_setup')}
                    leads={leads}
                  />
                )}

                {adminView === 'icp_setup' && (
                  <AdminIcpSetup
                    config={config}
                    onChangeConfig={setConfig}
                    onProceedToLeads={() => setAdminView('lead_database')}
                  />
                )}

                {adminView === 'lead_database' && (
                  <AdminLeadDatabase
                    leads={leads}
                    onUpdateLeads={setLeads}
                    onProceedToDashboard={() => setAdminView('pipeline')}
                  />
                )}

                {adminView === 'ai_scoring' && (
                  <AdminAiScoring leads={leads} />
                )}

                {adminView === 'outreach' && (
                  <AdminOutreach
                    leads={leads}
                    onUpdateLead={handleUpdateLead}
                  />
                )}

                {adminView === 'pipeline' && (
                  <AdminPipeline
                    leads={leads}
                    onUpdateLead={handleUpdateLead}
                    onOpenMeetingSheet={(lead) => setActiveCheatSheetLead(lead)}
                  />
                )}

                {adminView === 'meetings' && (
                  <AdminMeetings
                    leads={leads}
                    onUpdateLead={handleUpdateLead}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global Sales Cheat Sheet Modal */}
      <SalesCheatSheetModal
        lead={activeCheatSheetLead}
        onClose={() => setActiveCheatSheetLead(null)}
      />

      {/* Bottom Sticky Helper Footer */}
      <footer className="bg-white border-t border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 "></span>
            <span className="font-semibold text-slate-700">Temuin</span>
            <span>— Qualified connections, thoughtfully.</span>
          </div>

          <div className="flex items-center gap-4">
            {currentTab === 'prototype' ? (
              <button
                onClick={() => setCurrentTab('pitch')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Konsep bisnis</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('prototype')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Kembali ke workspace</span>
              </button>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
}
