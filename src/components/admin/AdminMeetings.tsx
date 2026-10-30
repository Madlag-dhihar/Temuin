import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Video, 
  ExternalLink, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  User, 
  FileText,
  Search,
  Check
} from 'lucide-react';
import { Lead, MeetingStatus } from '../../types';
import { SalesCheatSheetModal } from '../SalesCheatSheetModal';

interface AdminMeetingsProps {
  leads: Lead[];
  onUpdateLead: (updatedLead: Lead) => void;
}

export const AdminMeetings: React.FC<AdminMeetingsProps> = ({ leads, onUpdateLead }) => {
  const [selectedLeadForCheatSheet, setSelectedLeadForCheatSheet] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit modal fields
  const [editStatus, setEditStatus] = useState<MeetingStatus>('scheduled');
  const [editDateTime, setEditDateTime] = useState('');
  const [editMeetUrl, setEditMeetUrl] = useState('');
  const [editOutcomeNote, setEditOutcomeNote] = useState('');

  const bookedLeads = leads.filter((l) => l.status === 'meeting_booked' && l.meetingDetails);

  const filteredMeetings = bookedLeads.filter((l) =>
    l.companyName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.decisionMakerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (l.meetingDetails?.clientName || '').toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleOpenEdit = (lead: Lead) => {
    setEditingLead(lead);
    if (lead.meetingDetails) {
      setEditStatus(lead.meetingDetails.meetingStatus || 'scheduled');
      setEditDateTime(lead.meetingDetails.dateTime);
      setEditMeetUrl(lead.meetingDetails.googleMeetUrl);
      setEditOutcomeNote(lead.meetingDetails.pastOutcomeNote || '');
    }
  };

  const handleSaveEdit = () => {
    if (!editingLead || !editingLead.meetingDetails) return;

    const updatedLead: Lead = {
      ...editingLead,
      meetingDetails: {
        ...editingLead.meetingDetails,
        meetingStatus: editStatus,
        dateTime: editDateTime,
        googleMeetUrl: editMeetUrl,
        pastOutcomeNote: editOutcomeNote,
      },
    };

    onUpdateLead(updatedLead);
    setEditingLead(null);
    showToast(`Status meeting ${editingLead.companyName} diperbarui & tersinkronisasi ke Client Side!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getStatusBadge = (status: MeetingStatus = 'scheduled') => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            ● Scheduled (Tersedia di Kalender Klien)
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Completed (Selesai)
          </span>
        );
      case 'rescheduled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Rescheduled (Jadwal Ulang)
          </span>
        );
      case 'no_show':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            No-Show (Prospek Berhalangan)
          </span>
        );
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Meetings Delivery Operations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Manajemen Sales Meetings (Booking Dispatch)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola jadwal temu hasil kualifikasi Temuin. Perubahan status "Scheduled" otomatis tampil di portal klien secara realtime.
          </p>
        </div>

        <div className="bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-xs text-slate-600 flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-indigo-600" />
          <span>{bookedLeads.length} Total Booked Meetings</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari perusahaan, decision maker, atau klien..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
        <div className="text-xs text-slate-500 hidden sm:block">
          Sinkronisasi Otomatis: Status "Scheduled" langsung dapat diakses Sales Klien
        </div>
      </div>

      {/* Meetings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Company & Client</th>
                <th className="py-3.5 px-4">Decision Maker</th>
                <th className="py-3.5 px-4">Position</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4">Meeting Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMeetings.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Company & Client */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-bold text-slate-900">{lead.companyName}</div>
                    <div className="text-[11px] text-indigo-700 font-medium mt-0.5">
                      Klien: {lead.meetingDetails?.clientName || 'RestoTech Cloud POS'}
                    </div>
                  </td>

                  {/* Decision Maker */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{lead.decisionMakerName}</div>
                    <div className="text-[11px] text-slate-400">{lead.email}</div>
                  </td>

                  {/* Position */}
                  <td className="py-3.5 px-4 text-slate-600">
                    {lead.decisionMakerTitle}
                  </td>

                  {/* Date & Time */}
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{lead.meetingDetails?.dateTime}</span>
                    </div>
                  </td>

                  {/* Lead Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold px-2 py-0.5 rounded-full text-xs bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {lead.leadScore}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(lead.meetingDetails?.meetingStatus)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedLeadForCheatSheet(lead)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Cheat Sheet
                    </button>
                    <button
                      onClick={() => handleOpenEdit(lead)}
                      className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Status</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Meeting Status Modal */}
      {editingLead && editingLead.meetingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                Update Meeting Dispatch
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {editingLead.companyName}
              </h3>
              <p className="text-xs text-slate-500">
                Decision Maker: {editingLead.decisionMakerName} ({editingLead.decisionMakerTitle})
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Status Meeting:
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as MeetingStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="scheduled">Scheduled (Muncul di Kalender Upcoming Klien)</option>
                  <option value="completed">Completed (Sudah Selesai - Masuk Arsip Past Meetings)</option>
                  <option value="rescheduled">Rescheduled (Dijadwalkan Ulang)</option>
                  <option value="no_show">No-Show (Prospek Tidak Hadir)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hari & Jam Meeting (WIB):
                </label>
                <input
                  type="text"
                  value={editDateTime}
                  onChange={(e) => setEditDateTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Contoh: Kamis, 28 Mei 2026 • 14:00 - 14:30 WIB"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Link Google Meet:
                </label>
                <input
                  type="text"
                  value={editMeetUrl}
                  onChange={(e) => setEditMeetUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Catatan Evaluasi / Sales Outcome (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={editOutcomeNote}
                  onChange={(e) => setEditOutcomeNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Catatan perkembangan setelah meeting untuk feedback atau laporan..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
              >
                Simpan & Sinkronkan ke Klien
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sales Cheat Sheet Modal */}
      <SalesCheatSheetModal
        lead={selectedLeadForCheatSheet}
        onClose={() => setSelectedLeadForCheatSheet(null)}
      />

    </div>
  );
};
