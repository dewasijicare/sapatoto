(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. HEADER MENU: TEKNIK GHOST WRAPPER (PRESISI 1174PX)
           ============================================================== */
        /* Membuat bungkus luar menjadi transparan & tidak memblokir klik */
        #navbar-top-wrapper.fixed-top {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            pointer-events: none !important; 
        }

        /* Memotong Menu Dalam persis di 1174px (Menyesuaikan potong 40px padding) */
        #navbar-top {
            max-width: 1174px !important; /* UKURAN SUPER AKURAT */
            width: 100% !important;
            margin: 0 auto !important;
            pointer-events: auto !important; /* Kembalikan fungsi klik */
            border-radius: 0 0 4px 4px !important; /* Sedikit siku bawah */
        }

        /* Melindungi Menu Bawah (Mobile) agar tidak error */
        .fixed-bottom {
            pointer-events: auto !important;
        }

        /* ==============================================================
           2. BANNER SLIDER: KOTAK PRESISI (1174PX)
           ============================================================== */
        /* Bungkus baru untuk Banner Slider mengikuti lebar 1174px */
        .sapatoto-banner-wrapper {
            max-width: 1174px !important; /* UKURAN SUPER AKURAT */
            margin: 0 auto 15px auto !important; /* Posisi tengah, jarak bawah 15px */
            padding: 0 !important;
            display: block !important;
            clear: both !important;
        }

        #main-slider, .carousel, .slider-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background-color: transparent !important;
        }

        #main-slider .carousel-inner {
            border-radius: 0 !important;
        }

        /* Tinggi 600px & Anti-Gepeng */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           3. RESPONSIVE MOBILE / HP (KEMBALI 100%)
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top-wrapper.fixed-top { pointer-events: auto !important; }
            #navbar-top, .sapatoto-banner-wrapper {
                max-width: 100% !important;
                width: 100% !important;
                border-radius: 0 !important;
            }
            #main-slider .carousel-item img, .carousel .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectCSS() {
        const id = 'sapatoto-layout-presisi-v1174';
        if (document.getElementById(id)) return;
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }
    injectCSS();

    // ==============================================================
    // 4. DOM MANIPULATION: MEMBUNGKUS BANNER
    // ==============================================================
    function applyBoxedStructure() {
        if (window.innerWidth <= 768) return; 

        // Bungkus Banner Slider agar patuh pada 1174px
        const slider = document.getElementById('main-slider') || document.querySelector('.carousel');
        if (slider && slider.parentNode) {
            if (!slider.parentNode.classList.contains('sapatoto-banner-wrapper')) {
                const wrapper = document.createElement('div');
                
                // Gunakan class wrapper buatan kita sendiri (tanpa bawaan container website)
                wrapper.className = 'sapatoto-banner-wrapper'; 
                
                // Pindahkan slider ke dalam kotak pelindung ini
                slider.parentNode.insertBefore(wrapper, slider);
                wrapper.appendChild(slider);
            }
        }
    }

    // Jalankan mesin pembungkus secara agresif
    setInterval(applyBoxedStructure, 500);
    document.addEventListener('DOMContentLoaded', applyBoxedStructure);

})();
