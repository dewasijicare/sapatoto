(function() {
    const backgroundStyles = `
        /* ==============================================================
           PENGATURAN BACKGROUND STATIC UNTUK DESKTOP (PC)
           ============================================================== */
        body {
            /* 1. GANTI URL DI BAWAH INI DENGAN LINK GAMBAR WALLPAPER ANDA */
            background-image: url('https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@b935462141bedbe895a01c2f317e45fb92313e40/bg.jpg') !important;
            
            /* Warna dasar gelap untuk berjaga-jaga sebelum gambar selesai loading */
            background-color: #0c0c1e !important; 
            
            /* KUNCI STATIC: Membuat gambar diam saat layar di-scroll */
            background-attachment: fixed !important; 
            
            /* Posisi gambar di tengah-atas */
            background-position: center top !important; 
            
            /* Jangan biarkan gambar berulang (tile) */
            background-repeat: no-repeat !important; 
            
            /* Tarik gambar agar menutupi seluruh layar monitor */
            background-size: cover !important; 
        }

        /* ==============================================================
           PENGATURAN UNTUK MOBILE (HP)
           ============================================================== */
        @media (max-width: 768px) {
            body {
                /* Di layar HP, background gambar dimatikan agar web ringan & rapi */
                background-image: none !important;
                background-color: #0c0c1e !important; 
            }
        }
    `;

    // Fungsi untuk menyuntikkan pengaturan ke dalam website
    function injectStaticBackground() {
        if (document.getElementById('sapatoto-static-bg')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-static-bg';
        styleElement.innerHTML = backgroundStyles;
        document.head.appendChild(styleElement);
    }

    // Jalankan skrip saat website dimuat
    injectStaticBackground();
    document.addEventListener('DOMContentLoaded', injectStaticBackground);

})();
