(function() {
    const layoutStyles = `
        /* ==============================================================
           1. KUNCI RAHASIA: MEMAKSA SEMUA FOLDER MENJADI 1214PX
           ============================================================== */
        @media (min-width: 1200px) {
            .container {
                max-width: 1214px !important;
                width: 1214px !important;
            }
        }

        /* ==============================================================
           2. BANNER SLIDER: BORDER PINK & SIKU TAJAM (TANPA ROUND)
           ============================================================== */
        .sapatoto-banner-sync {
            margin: 0 auto 15px auto !important;
            padding-left: var(--bs-gutter-x, 12px) !important;
            padding-right: var(--bs-gutter-x, 12px) !important; 
        }

        #main-slider, .carousel, .slider-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            
            /* --- PERUBAHAN BARU: BORDER PINK --- */
            border: 1px solid #ec4899 !important; 
            
            /* --- PERUBAHAN BARU: SIKU KOTAK TAJAM (TANPA ROUND CORNER) --- */
            border-radius: 0 !important; 
            
            /* Tambahan efek cahaya tipis agar menyatu dengan tema neon web Anda */
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.3) !important; 
            
            background-color: transparent !important;
            display: block !important;
            box-sizing: border-box !important;
        }

        /* Memastikan bagian dalam banner juga siku tajam */
        #main-slider .carousel-inner { 
            border-radius: 0 !important; 
        }

        /* Tinggi 600px proporsional dan siku tajam pada gambar */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important; /* WAJIB 0 AGAR GAMBAR TIDAK MELENGKUNG */
        }

        /* ==============================================================
           3. RESPONSIVE MOBILE / HP
           ============================================================== */
        @media (max-width: 768px) {
            .sapatoto-banner-sync { padding: 0 !important; margin-bottom: 5px !important; }
            #main-slider .carousel-item img, .carousel .carousel-item img { height: 250px !important; }
            
            /* Di HP, border kiri-kanan dimatikan agar gambar bisa mentok ke ujung layar */
            #main-slider, .carousel, .slider-wrapper {
                border-left: none !important;
                border-right: none !important;
                border-radius: 0 !important;
            }
        }
    `;

    // Pasang CSS
    function injectCSS() {
        let style = document.getElementById('sapatoto-layout-sync');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sapatoto-layout-sync';
            document.head.appendChild(style);
        }
        style.innerHTML = layoutStyles;
    }
    injectCSS();

    // Mesin Pembungkus Banner
    function syncBanner() {
        if (window.innerWidth > 768) {
            const slider = document.getElementById('main-slider') || document.querySelector('.carousel');
            if (slider && slider.parentNode && !slider.parentNode.classList.contains('sapatoto-banner-sync')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'container sapatoto-banner-sync';
                slider.parentNode.insertBefore(wrapper, slider);
                wrapper.appendChild(slider);
            }
        }
    }

    // Eksekusi
    setInterval(syncBanner, 250);
    document.addEventListener('DOMContentLoaded', syncBanner);
})();
