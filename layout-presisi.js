(function() {
    // ==============================================================
    // 1. INJEKSI CSS SUPER SPESIFIK (PRIORITAS 1214PX)
    // ==============================================================
    const layoutPresisiStyles = `
        /* Paksa folder container agar sejajar di 1214px */
        @media (min-width: 1200px) {
            body .container, 
            body .container-lg, 
            body .container-md, 
            body .container-sm, 
            body .container-xl {
                max-width: 1214px !important;
                width: 1214px !important;
            }
        }

        /* Kunci Header di 1214px - Memotong background agar tidak panjang */
        body #navbar-top-wrapper.fixed-top,
        body #navbar-top {
            width: 100% !important;
            max-width: 1214px !important;
            margin: 0 auto !important;
            left: 0 !important;
            right: 0 !important;
        }

        /* Kunci Banner Slider di 1214px */
        body #main-slider, 
        body .carousel, 
        body .slider-wrapper {
            width: 100% !important;
            max-width: 1214px !important;
            margin: 0 auto 15px auto !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
        }

        /* Tinggi Banner 600px Tetap Dipertahankan */
        body #main-slider .carousel-item img, 
        body .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* Pengecualian untuk Mobile (Kembali Full Layar) */
        @media (max-width: 768px) {
            body #navbar-top-wrapper.fixed-top,
            body #navbar-top,
            body #main-slider {
                max-width: 100% !important;
                width: 100% !important;
            }
            body #main-slider .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectCSS() {
        const id = 'sapatoto-layout-presisi-v1214';
        if (document.getElementById(id)) return;
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }
    injectCSS();

    // ==============================================================
    // 2. JURUS PAKSA (BRUTE FORCE) UNTUK LEBAR 1214PX
    // ==============================================================
    function enforceAbsoluteLayout() {
        if (window.innerWidth <= 768) return; 

        // 1. PAKSA HEADER (Menghilangkan background pink yang bablas)
        const headerWrapper = document.getElementById('navbar-top-wrapper');
        const headerNav = document.getElementById('navbar-top');
        [headerWrapper, headerNav].forEach(el => {
            if (el) {
                el.style.setProperty('max-width', '1214px', 'important');
                el.style.setProperty('width', '1214px', 'important');
                el.style.setProperty('margin', '0 auto', 'important');
                el.style.setProperty('left', '0', 'important');
                el.style.setProperty('right', '0', 'important');
            }
        });

        // 2. PAKSA BANNER SLIDER
        const sliderElement = document.getElementById('main-slider') || document.querySelector('.carousel');
        if (sliderElement) {
            sliderElement.style.setProperty('max-width', '1214px', 'important');
            sliderElement.style.setProperty('width', '1214px', 'important');
            sliderElement.style.setProperty('margin', '0 auto 15px auto', 'important');
        }

        // 3. PAKSA SEMUA CONTAINER
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.setProperty('max-width', '1214px', 'important');
            container.style.setProperty('width', '1214px', 'important');
        });
    }

    setInterval(enforceAbsoluteLayout, 300);
    window.addEventListener('resize', enforceAbsoluteLayout);
    document.addEventListener('DOMContentLoaded', enforceAbsoluteLayout);

})();
