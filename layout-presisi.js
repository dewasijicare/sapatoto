(function() {
    const layoutStyles = `
        /* KUNCI RAHASIA: MEMAKSA SEMUA FOLDER MENJADI 1214PX */
        @media (min-width: 1200px) {
            .container {
                max-width: 1214px !important;
                width: 1214px !important;
            }
        }

        /* BANNER SLIDER: NUMPANG CETAKAN CONTAINER */
        .sapatoto-banner-sync {
            margin: 0 auto 15px auto !important;
            padding-left: var(--bs-gutter-x, 12px) !important;
            padding-right: var(--bs-gutter-x, 12px) !important; 
        }

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

        /* Tinggi 600px proporsional */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;
            object-position: center top !important;
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* RESPONSIVE MOBILE */
        @media (max-width: 768px) {
            .sapatoto-banner-sync { padding: 0 !important; margin-bottom: 5px !important; }
            #main-slider .carousel-item img, .carousel .carousel-item img { height: 250px !important; }
        }
    `;

    function injectCSS() {
        if (document.getElementById('sapatoto-layout-sync')) return;
        const style = document.createElement('style');
        style.id = 'sapatoto-layout-sync';
        style.innerHTML = layoutStyles;
        document.head.appendChild(style);
    }
    injectCSS();

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

    setInterval(syncBanner, 250);
    document.addEventListener('DOMContentLoaded', syncBanner);
})();
