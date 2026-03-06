(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. KUNCI RAHASIA: MEMAKSA FOLDER UTAMA MENJADI 1296PX
           ============================================================== */
        /* Ini akan membebaskan fitur di bawahnya agar bisa sejajar dengan Header */
        @media (min-width: 1200px) {
            .container {
                max-width: 1296px !important;
            }
        }

        /* ==============================================================
           2. PRESISI HEADER MENU (TERKUNCI 1296PX DI TENGAH)
           ============================================================== */
        #navbar-top-wrapper, .fixed-top {
            max-width: 1296px !important;
            margin: 0 auto !important;
            left: 0 !important;
            right: 0 !important;
        }

        /* Melindungi Menu Bawah (Mobile) agar tetap 100% layar */
        .fixed-bottom {
            max-width: 100% !important;
            left: 0 !important;
            right: 0 !important;
        }

        /* ==============================================================
           3. PRESISI BANNER SLIDER (TINGGI 600PX, TANPA BORDER/SIKU)
           ============================================================== */
        #main-slider, .slider-wrapper {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto 15px auto !important;
            border: none !important;           /* MENGHILANGKAN BORDER */
            border-radius: 0 !important;       /* MENGHILANGKAN ROUND CORNER */
            box-shadow: none !important;
            display: block !important;
            background-color: transparent !important;
        }

        #main-slider .carousel-inner {
            border-radius: 0 !important;
        }

        /* Menarik tinggi gambar menjadi persis 600px (Anti-Gepeng) */
        #main-slider .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           4. RESPONSIVE MOBILE / HP (KEMBALI KE LAYAR PENUH)
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top-wrapper, .fixed-top, #main-slider, .slider-wrapper {
                max-width: 100% !important;
            }
            
            /* Banner di HP diturunkan tingginya agar tidak memenuhi 1 layar utuh */
            #main-slider .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectLayoutStyles() {
        const existingStyle = document.getElementById('sapatoto-layout-presisi');
        if (existingStyle) {
            existingStyle.innerHTML = layoutPresisiStyles;
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-layout-presisi';
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }

    injectLayoutStyles();
    document.addEventListener('DOMContentLoaded', injectLayoutStyles);
})();
