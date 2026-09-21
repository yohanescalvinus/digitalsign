/* =====================================================================
   DISCLAIMER MODAL — Personal Digital Sign
   File: disclaimer.js
   ---------------------------------------------------------------------
   Cara pakai: tambahkan baris berikut di bagian PALING BAWAH <body>
   pada generate.html dan verify.html:

       <script src="disclaimer.js"></script>

   Modal akan otomatis muncul saat halaman dibuka dan hanya bisa
   ditutup dengan klik tombol "Ya, Saya Setuju".
   ===================================================================== */
(function () {
  'use strict';

  const CSS = `
    .disclaimer-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      z-index: 10000;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      font-family: 'Segoe UI', Arial, sans-serif;
      animation: discFadeIn 0.3s ease;
    }
    @keyframes discFadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    .disclaimer-modal {
      background: #f8fafc;
      color: #1a202c;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      margin: auto;
      box-shadow: 0 25px 70px rgba(0,0,0,0.5);
      overflow: hidden;
      animation: discSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes discSlideIn {
      from { opacity: 0; transform: translateY(40px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }

    /* ===== HEADER ===== */
    .disc-header {
      background: linear-gradient(135deg, #e8eef5 0%, #dce5ef 100%);
      padding: 22px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      border-bottom: 2px solid #c7d2dd;
    }
    .disc-brand { display: flex; align-items: center; gap: 16px; }
    .disc-shield {
      font-size: 46px; line-height: 1;
      filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3));
    }
    .disc-title {
      font-size: 24px; font-weight: 800; margin: 0;
      color: #1a3355; letter-spacing: -0.5px; line-height: 1.1;
    }
    .disc-title .disc-blue { color: #2563eb; display: block; }
    .disc-tagline {
      font-size: 12px; color: #4a5568; margin-top: 6px;
      font-weight: 600; letter-spacing: 0.5px;
    }
    .disc-subtagline {
      font-size: 11px; color: #718096;
      font-style: italic; margin-top: 2px;
    }
    .disc-dev { text-align: right; }
    .disc-dev-label { font-size: 11px; color: #718096; margin-bottom: 2px; }
    .disc-dev-name {
      font-family: 'Brush Script MT', 'Segoe Script', cursive;
      font-size: 26px; color: #1a3355; font-style: italic;
      line-height: 1.1;
    }
    .disc-dev-role {
      font-size: 10px; color: #718096;
      letter-spacing: 2px; margin-top: 4px;
    }

    /* ===== WARNING BANNER ===== */
    .disc-warning {
      margin: 20px 28px 0;
      border: 3px solid #dc2626;
      border-radius: 12px;
      background: #fef2f2;
      padding: 16px 20px;
      text-align: center;
    }
    .disc-warning-head {
      display: flex; align-items: center; justify-content: center;
      gap: 14px; font-size: 38px; font-weight: 900;
      color: #dc2626; letter-spacing: 3px; line-height: 1;
    }
    .disc-warning-sub {
      font-size: 14px; color: #1a202c;
      font-weight: 600; margin-top: 10px;
    }

    /* ===== GRID ===== */
    .disc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 20px 28px;
    }
    .disc-card {
      display: flex; gap: 12px;
      padding: 14px 16px;
      border-radius: 10px;
      align-items: flex-start;
      border-left: 4px solid;
    }
    .disc-card h4 {
      margin: 0 0 4px; font-size: 14px;
      font-weight: 700; line-height: 1.2;
    }
    .disc-card p {
      margin: 0; font-size: 12px;
      line-height: 1.5; color: #2d3748;
    }
    .disc-icon {
      flex-shrink: 0;
      width: 36px; height: 36px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700;
      color: #fff;
    }
    .disc-green { background: #f0fdf4; border-color: #16a34a; }
    .disc-green .disc-icon { background: #16a34a; }
    .disc-green h4 { color: #15803d; }

    .disc-red { background: #fef2f2; border-color: #dc2626; }
    .disc-red .disc-icon { background: #dc2626; }
    .disc-red h4 { color: #b91c1c; }

    .disc-blue { background: #eff6ff; border-color: #2563eb; }
    .disc-blue .disc-icon { background: #2563eb; }
    .disc-blue h4 { color: #1d4ed8; }

    .disc-yellow { background: #fefce8; border-color: #ca8a04; }
    .disc-yellow .disc-icon { background: #ca8a04; }
    .disc-yellow h4 { color: #a16207; }

    .disc-purple { background: #f5f3ff; border-color: #7c3aed; }
    .disc-purple .disc-icon { background: #7c3aed; }
    .disc-purple h4 { color: #6d28d9; }

    .disc-gray { background: #f1f5f9; border-color: #64748b; }
    .disc-gray .disc-icon { background: #64748b; }
    .disc-gray h4 { color: #475569; }

    /* ===== FOOTER ===== */
    .disc-footer {
      background: #1e3a5f;
      color: #fff;
      padding: 20px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .disc-footer-text {
      font-size: 13px;
      line-height: 1.6;
      color: #e0e7ef;
      flex: 1; min-width: 250px;
    }
    .disc-footer-text b { color: #fbbf24; }
    .disc-btn {
      background: #16a34a;
      color: #fff;
      border: none;
      padding: 14px 28px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.2s, transform 0.1s;
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.35);
      font-family: inherit;
    }
    .disc-btn:hover { background: #15803d; }
    .disc-btn:active { transform: scale(0.97); }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 700px) {
      .disclaimer-overlay { padding: 10px; }
      .disc-header { flex-direction: column; align-items: flex-start; padding: 18px 20px; }
      .disc-dev { text-align: left; }
      .disc-grid { grid-template-columns: 1fr; padding: 16px 20px; }
      .disc-warning { margin: 16px 20px 0; }
      .disc-warning-head { font-size: 26px; gap: 8px; }
      .disc-footer { flex-direction: column; align-items: stretch; padding: 18px 20px; }
      .disc-btn { width: 100%; }
      .disc-title { font-size: 20px; }
    }

    /* Lock scroll saat modal terbuka */
    body.disclaimer-locked {
      overflow: hidden !important;
      height: 100vh;
    }
  `;

  const HTML = `
    <div id="disclaimerOverlay" class="disclaimer-overlay">
      <div class="disclaimer-modal">

        <!-- HEADER -->
        <div class="disc-header">
          <div class="disc-brand">
            <div class="disc-shield">🛡️</div>
            <div>
              <h2 class="disc-title">Personal <span class="disc-blue">Digital Sign</span></h2>
              <div class="disc-tagline">Create • Encrypt • QR • Verify</div>
              <div class="disc-subtagline">Simple. Secure. For You.</div>
            </div>
          </div>
          <div class="disc-dev">
            <div class="disc-dev-label">Developed by</div>
            <div class="disc-dev-name">Yohanes Calvinus</div>
            <div class="disc-dev-role">CREATOR</div>
          </div>
        </div>

        <!-- WARNING -->
        <div class="disc-warning">
          <div class="disc-warning-head">
            <span>⚠️</span>
            <span>DISCLAIMER</span>
          </div>
          <div class="disc-warning-sub">Harap baca dengan saksama sebelum menggunakan aplikasi ini.</div>
        </div>

        <!-- GRID -->
        <div class="disc-grid">
          <div class="disc-card disc-green">
            <div class="disc-icon">✓</div>
            <div>
              <h4>Untuk Penggunaan Pribadi / Internal</h4>
              <p>Aplikasi ini dikembangkan untuk kebutuhan pribadi atau internal, bukan untuk layanan publik sebagai penyelenggara sertifikasi elektronik.</p>
            </div>
          </div>

          <div class="disc-card disc-red">
            <div class="disc-icon">⊘</div>
            <div>
              <h4>Bukan PSrE</h4>
              <p>Aplikasi ini bukan Penyelenggara Sertifikasi Elektronik (PSrE). Tidak menerbitkan Sertifikat Elektronik dan tidak melakukan sertifikasi identitas pengguna oleh pihak ketiga.</p>
            </div>
          </div>

          <div class="disc-card disc-blue">
            <div class="disc-icon">🔒</div>
            <div>
              <h4>Enkripsi AES + Password</h4>
              <p>Data yang dimasukkan pengguna dienkripsi menggunakan AES dan disimpan dalam QR Code. Password berfungsi sebagai kunci untuk membuka kembali data tersebut.</p>
            </div>
          </div>

          <div class="disc-card disc-yellow">
            <div class="disc-icon">👤</div>
            <div>
              <h4>Bukan Bukti Identitas Resmi</h4>
              <p>Password hanya membuktikan penguasaan kunci untuk mengakses payload, bukan sertifikasi identitas pengguna oleh pihak independen.</p>
            </div>
          </div>

          <div class="disc-card disc-purple">
            <div class="disc-icon">▦</div>
            <div>
              <h4>Verifikasi Balik</h4>
              <p>QR Code dapat dipindai kembali melalui aplikasi verifikasi untuk menampilkan informasi yang tersimpan apabila password yang digunakan sesuai.</p>
            </div>
          </div>

          <div class="disc-card disc-gray">
            <div class="disc-icon">📄</div>
            <div>
              <h4>Bukan Pengganti TTE Tersertifikasi</h4>
              <p>Aplikasi ini tidak dimaksudkan sebagai pengganti Tanda Tangan Elektronik Tersertifikasi yang menggunakan layanan PSrE sesuai regulasi yang berlaku.</p>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="disc-footer">
          <div class="disc-footer-text">
            Dengan menggunakan aplikasi ini, Anda dianggap telah memahami dan menyetujui keterbatasan serta tujuan penggunaan sebagaimana dijelaskan di atas.<br>
            <b>Gunakan secara bijak dan bertanggung jawab.</b>
          </div>
          <button class="disc-btn" onclick="acceptDisclaimer()">✓ Ya, Saya Setuju</button>
        </div>

      </div>
    </div>
  `;

  /* ===== Inject CSS ===== */
  function injectCSS() {
    if (document.getElementById('disclaimerStyle')) return;
    const s = document.createElement('style');
    s.id = 'disclaimerStyle';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ===== Inject HTML ===== */
  function injectHTML() {
    if (document.getElementById('disclaimerOverlay')) return;
    const container = document.createElement('div');
    container.innerHTML = HTML.trim();
    document.body.appendChild(container.firstElementChild);
    document.body.classList.add('disclaimer-locked');
  }

  /* ===== Init ===== */
  function init() {
    injectCSS();
    injectHTML();
  }

  /* ===== Accept ===== */
  window.acceptDisclaimer = function () {
    const el = document.getElementById('disclaimerOverlay');
    if (el) {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '0';
      setTimeout(() => { el.style.display = 'none'; }, 300);
    }
    document.body.classList.remove('disclaimer-locked');
  };

  /* ===== Cegah tutup via ESC ===== */
  document.addEventListener('keydown', function (e) {
    const overlay = document.getElementById('disclaimerOverlay');
    if (overlay && overlay.style.display !== 'none' && e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* ===== Cegah tutup via klik overlay ===== */
  document.addEventListener('click', function (e) {
    const overlay = document.getElementById('disclaimerOverlay');
    if (overlay && overlay.style.display !== 'none' && e.target === overlay) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  /* ===== Jalankan ===== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
