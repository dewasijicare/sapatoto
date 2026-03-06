(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. KUNCI RAHASIA: MEMAKSA KERANGKA BAWAH MENYUSUL KE 1296PX
           ============================================================== */
        /* Ini membebaskan fitur-fitur agar bisa sejajar dengan Header & Banner */
        @media (min-width: 1200px) {
            .container {
                max-width: 1296px !important;
            }
        }

        /* ==============================================================
           2. PRESISI HEADER MENU FIX (DIKUNCI KE TENGAH LAYAR)
           ============================================================== */
        /* Trik Transform agar posisi "fixed" bisa tepat di tengah tanpa menabrak layar */
        #navbar-top-wrapper.fixed-top, header.fixed-top {
            width: 100% !important;
            max-width: 1296px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
        }

        /* Melindungi Menu Bawah di HP agar tetap layar penuh */
        nav.navbar.fixed-bottom {
            max-width: 100% !important;
            left: 0 !important;
            transform: none !important;
            right: 0 !important;
        }

        /* ==============================================================
           3. PRESISI BANNER SLIDER FIX (ANTI-LEBAR & TINGGI 600PX)
           ============================================================== */
        #main-slider, .slider-wrapper, #myCarousel {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto 15px auto !important; /* Jarak pas 15px ke Running text */
            display: block !important;
            overflow: hidden !important; 
            border: none !important;             /* HAPUS BORDER */
            border-radius: 0 !important;         /* HAPUS LENGKUNGAN */
            box-shadow: none !important;         /* HAPUS CAHAYA */
            background-color: transparent !important;
        }

        #main-slider .carousel-inner {
            border-radius: 0 !important;
        }

        /* Menarik tinggi gambar menjadi 600px proporsional (Anti-Gepeng) */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            width: 100% !important;
            object-fit: cover !important;
            object-position: center top !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           4. RESPONSIVE MOBILE / HP (KEMBALI KE LAYAR PENUH)
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top-wrapper.fixed-top, header.fixed-top {
                max-width: 100% !important;
                left: 0 !important;
                transform: none !important; /* Matikan efek tengah di HP */
            }
            
            #main-slider, .slider-wrapper, #myCarousel {
                max-width: 100% !important;
            }
            
            /* Tinggi gambar Banner di HP diturunkan agar tidak menutupi 1 layar penuh */
            #main-slider .carousel-item img, .carousel .carousel-item img {
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
