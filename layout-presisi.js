(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. HEADER: PINDAHKAN DESAIN KE DALAM CONTAINER
           ============================================================== */
        /* Lucuti bungkus luar agar benar-benar tembus pandang 100% layar */
        #navbar-top-wrapper, #navbar-top, header.fixed-top {
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
            pointer-events: none !important; /* Jangan halangi klik di luar area */
        }

        /* Terapkan desain HANYA pada .container di dalam Header */
        /* Ini dijamin sejajar dengan konten di bawahnya! */
        #navbar-top > .container {
            background-color: #1a252f !important;
            border-left: 1px solid #ec4899 !important;
            border-right: 1px solid #ec4899 !important;
            border-bottom: 1px solid #ec4899 !important;
            border-radius: 0 0 4px 4px !important;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4) !important;
            pointer-events: auto !important; /* Kembalikan fungsi klik menu */
            transition: all 0.3s ease;
        }

        .fixed-bottom { pointer-events: auto !important; }

        /* ==============================================================
           2. BANNER SLIDER: NUMPANG CETAKAN CONTAINER
           ============================================================== */
        /* Class pembungkus yang menggunakan sistem padding asli website */
        .sapatoto-banner-sync {
            margin: 0 auto 15px auto !important;
            /* Kita numpang bantalan asli agar tidak meleset 1px pun */
            padding-left: var(--bs-gutter-x, 12px) !important;
            padding-right: var(--bs-gutter-x, 12px) !important; 
        }

        /* Hilangkan Siku dan Border sesuai permintaan */
        #main-slider, .carousel, .slider-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background-color: transparent !important;
            display: block !important;
        }

        #main-slider .carousel-inner { border-radius: 0 !important; }

        /* Tinggi 600px proporsional tanpa gepeng */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           3. RESPONSIVE MOBILE / HP
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top > .container { border: none !important; border-radius: 0 !important; padding: 0 !important;}
            .sapatoto-banner-sync { padding: 0 !important; margin-bottom: 5px !important; }
            #main-slider .carousel-item img, .carousel .carousel-item img { height: 250px !important; }
        }
    `;

    // Pasang CSS
    function injectCSS() {
        if (document.getElementById('sapatoto-layout-sync')) return;
        const style = document.createElement('style');
        style.id = 'sapatoto-layout-sync';
        style.innerHTML = layoutPresisiStyles;
        document.head.appendChild(style);
    }
    injectCSS();

    // ==============================================================
    // 4. MESIN PENGGERAK & PEMBERSIH CACHE
    // ==============================================================
    function syncLayout() {
        // A. BERSIHKAN INLINE-STYLE DARI PERCOBAAN SEBELUMNYA
        // Ini untuk membuang max-width: 1204px / 1214px yang masih tersangkut
        const navTop = document.getElementById('navbar-top');
        if (navTop) {
            navTop.style.removeProperty('max-width');
            navTop.style.removeProperty('width');
            navTop.style.removeProperty('margin');
            navTop.style.removeProperty('padding-left');
            navTop.style.removeProperty('padding-right');
            navTop.style.removeProperty('background-color');
            navTop.style.removeProperty('border');
            navTop.style.removeProperty('box-shadow');
        }

        // B. BUNGKUS BANNER DENGAN CLASS .container
        if (window.innerWidth > 768) {
            const slider = document.getElementById('main-slider') || document.querySelector('.carousel');
            if (slider && slider.parentNode && !slider.parentNode.classList.contains('sapatoto-banner-sync')) {
                const wrapper = document.createElement('div');
                // INI KUNCINYA: Memasukkan class 'container' bawaan website
                wrapper.className = 'container sapatoto-banner-sync';
                slider.parentNode.insertBefore(wrapper, slider);
                wrapper.appendChild(slider);
            }
        }
    }

    // Eksekusi secara agresif untuk mengalahkan sistem bawaan
    setInterval(syncLayout, 50);
    document.addEventListener('DOMContentLoaded', syncLayout);
})();
