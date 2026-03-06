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
           2. HEADER MENU: GHOST WRAPPER + BANTALAN 15PX
           ============================================================== */
        #navbar-top-wrapper.fixed-top {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            pointer-events: none !important; 
        }

        #navbar-top {
            max-width: 1214px !important;
            width: 100% !important;
            margin: 0 auto !important;
            
            /* KUNCI PRESISI: Menekan isi menu ke dalam agar sejajar dengan bawahnya */
            padding-left: 15px !important;  
            padding-right: 15px !important; 
            
            pointer-events: auto !important; 
            border-radius: 0 !important; 
        }

        .fixed-bottom { pointer-events: auto !important; }

        /* ==============================================================
           3. BANNER SLIDER: LEBAR 1214PX + BANTALAN 15PX
           ============================================================== */
        .sapatoto-banner-wrapper {
            max-width: 1214px !important;
            width: 100% !important;
            margin: 0 auto 15px auto !important; 
            
            /* KUNCI PRESISI: Menekan gambar ke dalam agar sejajar sempurna */
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
            #navbar-top, .sapatoto-banner-wrapper {
                max-width: 100% !important;
                width: 100% !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            #main-slider .carousel-item img, .carousel .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectCSS() {
        const id = 'sapatoto-layout-presisi-vPadding';
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
