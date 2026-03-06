(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. PRESISI HEADER MENU (TERKUNCI 1296PX DI TENGAH)
           ============================================================== */
        /* Memaksa pembungkus header dan navigasi atas untuk patuh di 1296px */
        header, .fixed-top, #navbar-top-wrapper, #navbar-top, nav.navbar.bg-dark:not(.fixed-bottom) {
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
           2. PRESISI BANNER SLIDER (TINGGI 600PX, TANPA BORDER/SIKU)
           ============================================================== */
        /* Menembak semua kemungkinan Class/ID Banner di sistem Pay4D/Nexus */
        #main-slider, .carousel, .slider-wrapper, #myCarousel {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto 15px auto !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            display: block !important;
            clear: both !important;
            background-color: transparent !important;
        }

        #main-slider .carousel-inner, .carousel .carousel-inner {
            border-radius: 0 !important;
        }

        /* Menarik tinggi gambar menjadi persis 600px (Anti-Gepeng) */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           3. RESPONSIVE MOBILE / HP (KEMBALI KE LAYAR PENUH)
           ============================================================== */
        @media (max-width: 768px) {
            header, .fixed-top, #navbar-top-wrapper, #navbar-top, nav.navbar:not(.fixed-bottom),
            #main-slider, .carousel, .slider-wrapper, #myCarousel {
                max-width: 100% !important;
            }
            
            /* Banner di HP diturunkan tingginya agar tidak memenuhi 1 layar utuh */
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
