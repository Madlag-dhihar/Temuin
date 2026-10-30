# Temuin — prototype v4

## Menjalankan
Gunakan Node.js 22.12+ atau versi LTS yang kompatibel dengan Vite 8.
Ekstrak ZIP ke folder baru, buka terminal di folder tersebut:

```bash
npm install
npm run dev
```
Buka http://localhost:3000.

## Revisi feedback
- Empat menu klien: Ringkasan, Target pelanggan, Calon pelanggan, Meeting & hasil.
- Ringkasan berfokus pada progres meeting berkualitas, langkah berikutnya, dan kerja sama yang dicatat.
- Ketersediaan sales: nama, hari kerja, jam dalam WIB; validasi jam dan penyimpanan lokal.
- Hasil meeting: tindak lanjut, proposal, kerja sama, belum cocok, tidak hadir. Konfirmasi kualitas dan catatan tersimpan di browser.
- Target empat meeting dan Rp8 juta merupakan SIMULASI paket untuk presentasi, belum penawaran tervalidasi. Rancangan kompensasi perlu kesepakatan sebelum layanan nyata.
- UI ivory, navy, lavender dan mint, menggunakan logo yang tersedia.
- Brief tiga langkah dan review admin tetap dipertahankan; operasional admin tetap tersedia.

## Coba demo
1. Ringkasan → Target pelanggan → lengkapi tiga langkah → Kirim ke Temuin.
2. Admin → Review brief → setujui atau minta revisi.
3. Client → Meeting & hasil → Atur ketersediaan → Simpan.
4. Pada meeting terjadwal, buka Ringkasan atau Catat hasil.
5. Pilih hasil; centang kualitas hanya jika peserta hadir dan memenuhi seluruh kriteria.
6. Buka Ringkasan untuk melihat progres; reload mempertahankan hasil lokal.
7. Demo & panduan → Reset demo data menghapus hasil dan ketersediaan lokal.

## Batas prototype
Data prospek, jadwal, dan ringkasan merupakan contoh. Tidak ada pengiriman email, undangan kalender, pencarian prospek, pembayaran, autentikasi, ataupun jaminan deal nyata. Ketersediaan dan hasil hanya tersimpan pada browser yang digunakan. Catatan hasil digunakan untuk menunjukkan siklus feedback; belum ada mesin optimasi otomatis. Pergantian role hanya simulasi. Halaman Konsep & model bisnis bawaan v3 tetap merupakan materi konsep lama.

## Validasi
`npm run lint` dan `npm run build`.
Pengujian browser: penyimpanan ketersediaan, pencatatan hasil dan persistensi, pembaruan progres, navigasi semua halaman klien/admin, dan overflow lebar 390/768/1440.
