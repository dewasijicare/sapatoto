(function() {
    const backgroundStyles = `
        /* ==============================================================
           1. PAKSA GAMBAR BACKGROUND DI LAPISAN PALING BAWAH
           ============================================================== */
        html, body {
            /* Ganti URL di bawah ini dengan link gambar yang SUDAH PASTI BISA DIBUKA */
            background-image: url('https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@b935462141bedbe895a01c2f317e45fb92313e40/bg.jpg') !important;
            background-color: #0c0c1e !important; 
            background-attachment: fixed !important; 
            background-position: center top !important; 
            background-repeat: no-repeat !important; 
            background-size: cover !important; 
            min-height: 100vh !important;
        }

        /* ==============================================================
           2. JURUS PENEMBUS "TEMBOK" (TRANSPARANSI)
           ============================================================== */
        /* Menghapus warna dasar dari kotak-kotak pembungkus bawaan website */
        body #content, 
        body #maincontent,
        body .main-wrapper,
        body .wrapper {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }

        /* ==============================================================
           3. PENGATURAN UNTUK MOBILE (HP)
           ============================================================== */
        @media (max-width: 768px) {
            html, body {
                /* Di HP, kita matikan agar tidak berat */
                background-image: none !important;
                background-color: #0c0c1e !important; 
            }
        }
    `;

    function injectStaticBackground() {
        if (document.getElementById('sapatoto-static-bg')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-static-bg';
        styleElement.innerHTML = backgroundStyles;
        document.head.appendChild(styleElement);
    }

    injectStaticBackground();
    document.addEventListener('DOMContentLoaded', injectStaticBackground);
})();
