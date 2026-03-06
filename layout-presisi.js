(function() {
    // ==============================================================
    // 1. CSS DASAR (Menyiapkan Struktur)
    // ==============================================================
    const layoutPresisiStyles = `
        /* Paksa folder utama ke 1214px */
        @media (min-width: 1200px) {
            .container { max-width: 1214px !important; width: 1214px !important; }
        }

        /* Banner Slider Presisi 1204px */
        .sapatoto-banner-wrapper {
            max-width: 1204px !important; 
            width: 100% !important;
            margin: 0 auto 15px auto !important; 
            padding-left: 15px !important;  
            padding-right: 15px !important; 
            display: block !important;
            clear: both !important;
            box-sizing: border-box !important;
        }

        #main-slider, .carousel, .slider-wrapper {
            width: 100% !important; max-width: 100% !important; margin: 0 !important; border: none !important; border-radius: 0 !important; box-shadow: none !important; background-color: transparent !important;
        }

        #main-slider .carousel-inner { border-radius: 0 !important; }

        /* Tinggi Gambar 600px */
        #main-slider .carousel-item img, .carousel .carousel-item img {
            height: 600px !important; object-fit: cover !important; object-position: center top !important; width: 100% !important; border-radius: 0 !important;
        }

        /* Responsif HP */
        @media (max-width: 768px) {
            #navbar-top-wrapper, #navbar-top, .sapatoto-banner-wrapper { max-width: 100% !important; width: 100% !important; border-radius: 0 !important; border: none !important; }
            #main-slider .carousel-item img, .carousel .carousel-item img { height: 250px !important; }
        }
    `;

    function injectCSS() {
        if (document.getElementById('sapatoto-layout-presisi-vUltimate')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-layout-presisi-vUltimate';
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }
    injectCSS();

    // ==============================================================
    // 2. DOM MANIPULATION: BUNGKUS BANNER
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

    // ==============================================================
    // 3. JURUS AGRESIF JS: MENGUNCI HEADER SAAT MELAYANG (SCROLL)
    // ==============================================================
    function enforceFloatingHeader() {
        if (window.innerWidth <= 768) {
            // Biarkan bebas di HP
            const navTop = document.getElementById('navbar-top');
            if (navTop) { navTop.style.setProperty('max-width', '100%', 'important'); navTop.style.setProperty('border', 'none', 'important'); }
            return;
        }

        // A. LUCUTI WRAPPER LUAR: Paksa tembus pandang walaupun di-scroll
        const wrapper = document.getElementById('navbar-top-wrapper');
        if (wrapper) {
            wrapper.style.setProperty('background', 'transparent', 'important');
            wrapper.style.setProperty('background-color', 'transparent', 'important');
            wrapper.style.setProperty('box-shadow', 'none', 'important');
            wrapper.style.setProperty('border', 'none', 'important');
            wrapper.style.setProperty('pointer-events', 'none', 'important'); // Jangan halangi klik di area kosong
        }

        // B. KUNCI NAVIGASI DALAM: Pindahkan warna gelap ke sini dan potong 1204px
        const navTop = document.getElementById('navbar-top');
        if (navTop) {
            navTop.style.setProperty('max-width', '1204px', 'important');
            navTop.style.setProperty('width', '100%', 'important');
            navTop.style.setProperty('margin', '0 auto', 'important');
            navTop.style.setProperty('padding-left', '15px', 'important');
            navTop.style.setProperty('padding-right', '15px', 'important');
            navTop.style.setProperty('pointer-events', 'auto', 'important'); // Aktifkan klik menu
            
            // Tampilan Premium Sapatoto (Gelap + Border Pink)
            navTop.style.setProperty('background-color', '#1a252f', 'important');
            navTop.style.setProperty('border-left', '1px solid #ec4899', 'important');
            navTop.style.setProperty('border-right', '1px solid #ec4899', 'important');
            navTop.style.setProperty('border-bottom', '1px solid #ec4899', 'important');
            navTop.style.setProperty('border-radius', '0 0 4px 4px', 'important');
            navTop.style.setProperty('box-shadow', '0 4px 15px rgba(236, 72, 153, 0.4)', 'important');
        }
    }

    // ==============================================================
    // 4. MESIN PENGGERAK 20x PER DETIK (ANTI-TEMBUS)
    // ==============================================================
    setInterval(() => {
        applyBoxedStructure();
        enforceFloatingHeader();
    }, 50); // Menembak ulang aturan setiap 50 milidetik!

    document.addEventListener('DOMContentLoaded', () => {
        applyBoxedStructure();
        enforceFloatingHeader();
    });

})();
