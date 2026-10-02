# PRD — Landing Page ARTOMORO

Dokumen ini adalah sumber kebenaran proyek. AI/developer berikutnya: baca file ini lalu `HANDOFF.md` sebelum mengubah apa pun.

## 1. Ringkasan
- **Produk:** landing page satu halaman untuk kedai kopi nyata **ARTOMORO**.
- **Tagline:** "dari kopi turun ke hati".
- **Tujuan:** memperkenalkan brand, menampilkan menu (kopi dan non kopi) dengan preview, menceritakan usaha, dan memudahkan kontak/pesan via WhatsApp.
- **Audiens:** anak muda dan keluarga di sekitar lokasi kedai; mayoritas membuka lewat HP.
- **Bahasa:** Indonesia.
- **Deploy:** Vercel (situs statis, tanpa build step).

## 2. Brand dan Arah Visual
- **Karakter:** semi vintage berpadu modern; premium dan elegan tetapi ramah anak muda.
- **Gaya UI:** glassmorphism (panel kaca buram di atas latar gelap hangat dengan gumpalan warna blur).
- **Palet (token Tailwind):** `roast #2B1B15` (latar), `bean #3D2820`, `brass #C8A25E` (aksen/CTA), `sage #7D9484` (aksen sekunder), `ivory #F2E8D8` (teks).
- **Tipografi:** Fraunces (judul, nuansa vintage) dan Manrope (isi). Gaya judul: huruf kecil sesuai tagline.
- **Prinsip:** satu momen utama (hero: cangkir mengepul + judul masuk berurutan); sisanya tenang. Animasi ringan, hanya `transform` dan `opacity`.

## 3. Struktur Halaman
1. **Navigasi:** pill kaca melayang; di mobile menjadi drawer.
2. **Beranda (hero):** judul tagline, deskripsi singkat, CTA "Lihat menu" dan "Kunjungi kami", kartu kaca berisi ilustrasi SVG cangkir dengan uap beranimasi.
3. **Tentang:** cerita usaha + 3 nilai. Teks masih placeholder.
4. **Menu:** tab Kopi / Non kopi; kartu menu berfoto; klik kartu membuka modal preview (foto, nama, deskripsi, harga, tombol "Pesan via WhatsApp"). Menu saat ini: Espresso (Rp 12.000, "Espresso aroma yang nikmat") dan Matcha X Coklat (Rp 13.000, "Matcha dengan pilihan coklat").
5. **Kontak:** alamat Jl. Teuku Umar, Kota Subulussalam; jam buka Senin–Sabtu 16.00–00.00; Instagram @artomoro_koptea; TikTok @mas_hendro77; tombol WhatsApp (085833856599) dan Google Maps (pencarian alamat).
6. **Footer.**

## 4. Kebutuhan Fungsional
- F1. Tab menu memfilter berdasarkan kategori tanpa reload.
- F2. Modal preview: tutup dengan tombol, klik latar, atau Esc; fokus dikembalikan.
- F3. Tombol WhatsApp membuat tautan `wa.me` dengan pesan otomatis (nama menu).
- F4. Tombol pojok kanan atas mobile: ikon hamburger berubah menjadi X dengan animasi, drawer terbuka halus (tinggi + fade, tautan muncul bergantian); menutup lewat tombol, memilih tautan, atau Esc.
- F5. Konten menu (termasuk `img`) dan nomor WA dikelola dari satu tempat: `js/main.js` (`WA`, `MENU`).

## 5. Interaksi dan Animasi
- Masuk halaman: elemen hero muncul berurutan (fade + naik).
- Uap kopi (SVG, loop), gumpalan latar bergerak pelan.
- Glow kaca mengikuti pointer; tilt 3D ringan pada kartu bertanda `.tilt` hanya di perangkat dengan hover.
- Reveal saat scroll untuk section besar (IntersectionObserver).
- `prefers-reduced-motion` mematikan semua animasi.

## 6. Kebutuhan Non-Fungsional
- Responsif: mobile-first; uji di 360px, 768px, 1280px.
- Performa: tanpa framework, JS kecil, hanya animasi GPU-friendly; `backdrop-filter` dibatasi pada panel (hindari ditumpuk banyak).
- Aksesibilitas: fokus terlihat, `aria` pada tab/drawer/modal, kontras teks ivory di atas roast.
- SEO dasar: `title`, `meta description`, `lang="id"`.

## 7. Stack dan Struktur Folder
HTML + Tailwind (CDN play script, konfigurasi inline di `index.html`) + CSS kustom + JavaScript murni. Tanpa build step.
```
index.html      struktur dan konfigurasi Tailwind
css/style.css   glass, blob, animasi, komponen tombol/tab
js/main.js      data menu, render, modal, glow/tilt, nav, reveal
assets/         logo, foto, favicon (menyusul)
vercel.json     konfigurasi Vercel
PRD.md, HANDOFF.md, README.md
```

## 8. Konten yang Masih Placeholder
Teks "Tentang" (ditandai `[Ganti dengan cerita asli ARTOMORO]` di `index.html`). Data menu, kontak, dan nomor WA sudah asli dari pemilik.

## 9. Aset
Sudah ada: `assets/espresso.jpg` dan `assets/matcha-coklat.jpg` (dipotong rasio 4:5 dan dikompres dari foto pemilik). Belum ada: logo, foto suasana, favicon, OG image. Menambah menu: tambah objek di `MENU` dengan `img` ke folder `assets/`.

## 10. Roadmap
- **Fase 1 (selesai, plus foto menu, kontak asli, animasi nav mobile):** kerangka, design system, semua section, modal menu, WA, animasi dasar.
- **Fase 2:** logo, favicon, galeri suasana, peta embed, menu tambahan, ganti Tailwind CDN dengan CLI build untuk produksi.
- **Fase 3:** polish animasi (hero parallax halus), OG image, audit Lighthouse (target performa mobile 90+), uji di perangkat nyata.
- **Fase 4:** deploy Vercel dan domain.

## 11. Deploy ke Vercel
Unggah folder ini ke repo GitHub, impor di Vercel, framework preset "Other", tanpa build command, output directory kosong (root).

## 12. Kriteria Selesai
Semua section tampil rapi di mobile dan desktop, menu dan modal berfungsi, tautan WA benar, tidak ada scroll horizontal, animasi lancar di HP menengah, konten placeholder sudah diganti.
