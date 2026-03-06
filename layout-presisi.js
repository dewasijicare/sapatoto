(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. KUNCI CONTAINER GLOBAL 1214PX
           ============================================================== */
        @media (min-width: 1200px) {
            .container {
                max-width: 1214px !important;
                width: 1214px !important;
            }
        }

        /* ==============================================================
           2. HEADER PALING ATAS: PRESISI 1209PX (POTONG 2.5PX KIRI-KANAN)
           ============================================================== */
        /* Bungkus luar dibiarkan tembus pandang */
        #navbar-top-wrapper.fixed-top {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            pointer-events: none !important; 
        }

        /* Navigasi dalam dipotong menjadi 1209px agar pas dengan fitur bawah */
        #navbar-top {
            max-width: 1209px !important; /* UKURAN SUPER AKURAT */
            width: 100% !important;
            margin: 0 auto !important;
            padding-left: 15px !important;  
            padding-right: 15px !important; 
            pointer-events: auto !important; 
            
            /* Tampilan Premium Header */
            background-color: #1a252f !important; /* Warna Gelap Sapatoto */
            border-left: 1px solid #ec4899 !important;
            border-right: 1px solid #ec4899 !important;
            border-bottom: 1px solid #ec4899 !important;
            border-radius: 0 0 4px 4px !important; /* Sedikit siku manis di bawah */
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3) !important;
        }

        .fixed-bottom { pointer-events: auto !important; }

        /* ==============================================================
           3. BANNER SLIDER: PRESISI 1209PX (POTONG 2.5PX KIRI-KANAN)
           ============================================================== */
        .sapatoto-banner-wrapper {
            max-width: 1209px !important; /* UKURAN SUPER AKURAT */
            width: 100% !important;
            margin: 0 auto 15px auto !important; 
            padding-left: 15px !important;  
            padding-right: 15px !important; 
            display: block !important;
            clear: both !important;
            box-sizing: border-box !important;
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
           4. RESPONSIVE MOBILE / HP
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top-wrapper.fixed-top { pointer-events: auto !important; }
            #navbar-top {
                max-width: 100% !important;
                width: 100% !important;
                border-radius: 0 !important;
                border-left: none !important;
                border-right: none !important;
            }
            .sapatoto-banner-wrapper {
                max-width: 100% !important;
                width: 100% !important;
            }
            #main-slider .carousel-item img, .carousel .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectCSS() {
        const id = 'sapatoto-layout-presisi-v1209';
        if (document.getElementById(id)) return;
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }
    injectCSS();

    // ==============================================================
    // 5. DOM MANIPULATION: MEMBUNGKUS BANNER
    // ==============================================================
    function applyBoxedStructure() {
        if (window.innerWidth <= 768) return; 

        const slider = document.getElementById('main-slider') || document.querySelector('.carousel');
        if (slider && slider.parentNode) {
            if (!slider.parentNode.classList.contains('sapatoto-banner-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'sapatoto-banner-wrapper'; 
                slider.parentNode.insertBefore(wrapper, slider);
                wrapper.appendChild(slider);
            }
        }
    }

    setInterval(applyBoxedStructure, 500);
    document.addEventListener('DOMContentLoaded', applyBoxedStructure);

})();
