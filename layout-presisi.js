(function() {
    // ==============================================================
    // 1. INJEKSI CSS SUPER SPESIFIK (Tingkat Prioritas Tertinggi)
    // ==============================================================
    const layoutPresisiStyles = `
        /* Paksa semua Folder Container menjadi 1296px di Desktop */
        @media (min-width: 1200px) {
            body .container, 
            body .container-lg, 
            body .container-md, 
            body .container-sm, 
            body .container-xl {
                max-width: 1296px !important;
            }
        }

        /* Kunci Header di 1296px dan posisikan di tengah */
        body #navbar-top-wrapper.fixed-top, 
        body header.fixed-top {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto !important;
            left: 0 !important;
            right: 0 !important;
        }

        /* Kunci Banner Slider di 1296px, Hapus Border/Siku */
        body #main-slider, 
        body .carousel, 
        body .slider-wrapper {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto 15px auto !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background-color: transparent !important;
        }
        
        body #main-slider .carousel-inner, 
        body .carousel .carousel-inner {
            border-radius: 0 !important;
        }

        /* Tinggi Banner 600px proporsional */
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
            body header.fixed-top,
            body #main-slider, 
            body .carousel {
                max-width: 100% !important;
            }
            body #main-slider .carousel-item img, 
            body .carousel .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    function injectCSS() {
        if (document.getElementById('sapatoto-layout-presisi')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-layout-presisi';
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }
    injectCSS();

    // ==============================================================
    // 2. JURUS PAKSA (BRUTE FORCE) JAVASCRIPT INLINE-STYLE
    // ==============================================================
    // Fungsi ini akan terus memantau dan memaksa elemen patuh pada 1296px
    function enforceAbsoluteLayout() {
        // Jangan paksa jika dibuka di layar HP
        if (window.innerWidth <= 768) {
            const header = document.getElementById('navbar-top-wrapper');
            if (header) header.style.setProperty('max-width', '100%', 'important');
            const slider = document.getElementById('main-slider') || document.querySelector('.carousel');
            if (slider) slider.style.setProperty('max-width', '100%', 'important');
            return; 
        }

        // 1. PAKSA HEADER
        const headerWrapper = document.getElementById('navbar-top-wrapper');
        if (headerWrapper) {
            headerWrapper.style.setProperty('max-width', '1296px', 'important');
            headerWrapper.style.setProperty('margin', '0 auto', 'important');
            headerWrapper.style.setProperty('left', '0', 'important');
            headerWrapper.style.setProperty('right', '0', 'important');
        }

        // 2. PAKSA BANNER SLIDER
        const sliderElement = document.getElementById('main-slider') || document.querySelector('.carousel');
        if (sliderElement) {
            sliderElement.style.setProperty('max-width', '1296px', 'important');
            sliderElement.style.setProperty('margin', '0 auto 15px auto', 'important');
            sliderElement.style.setProperty('border', 'none', 'important');
            sliderElement.style.setProperty('border-radius', '0', 'important');
            sliderElement.style.setProperty('box-shadow', 'none', 'important');
        }

        // 3. PAKSA FOLDER CONTAINER UTAMA
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.setProperty('max-width', '1296px', 'important');
        });
    }

    // Jalankan setiap setengah detik (mengalahkan script bawaan website)
    setInterval(enforceAbsoluteLayout, 500);
    
    // Jalankan juga saat layar diubah ukurannya
    window.addEventListener('resize', enforceAbsoluteLayout);
    
    // Jalankan pertama kali saat siap
    document.addEventListener('DOMContentLoaded', enforceAbsoluteLayout);

})();
