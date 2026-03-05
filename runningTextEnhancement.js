(function() {
    // CSS untuk styling announcement (TEMA SAPATOTO: DARK & NEON PINK)
    const announcementStyles = `
        /* BUNGKUSAN LUAR: Akan disinkronkan ukurannya oleh JS mengikuti kerangka web (Tombol & Pintas) */
        #announcement-outer-wrapper {
            width: 100%;
            margin: 15px auto 15px auto !important;
            padding: 0; /* KUNCI: Jangan beri !important agar JS bisa mengatur jaraknya */
            box-sizing: border-box;
            transition: max-width 0.3s ease;
        }

        /* BUNGKUSAN DALAM: Menggunakan jarak 8px agar sejajar lurus dengan Tombol & Pintas Widget */
        .announcement-inner-spacing {
            padding: 0 8px;
            width: 100%;
            box-sizing: border-box;
        }

        /* STYLING KOTAK PENGUMUMAN */
        #announcement.gavan-themed-announcement {
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
            border: 1px solid #ec4899 !important; 
            border-radius: 12px !important; /* Disamakan dengan lengkungan tombol */
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important; 
            color: #ecf0f1 !important;
            padding: 10px 20px !important; 
            display: flex !important;
            align-items: center !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important; 
            margin: 0 !important; /* Direset karena margin sudah diurus wrapper luar */
            box-sizing: border-box !important;
        }

        #announcement.gavan-themed-announcement i.fa-solid.fa-bullhorn {
            color: #f472b6 !important; 
            text-shadow: 0 0 8px #f472b6;
            margin-right: 12px;
            font-size: 1.2em;
            animation: pulse-glow-sapatoto 2s infinite ease-in-out;
            flex-shrink: 0;
        }

        #announcement.gavan-themed-announcement marquee {
            flex-grow: 1;
            color: #ffe600 !important; 
            min-width: 0;
            letter-spacing: 0.5px;
            font-weight: 700; 
            text-shadow: 0 0 8px rgba(255, 230, 0, 0.5); 
        }

        @keyframes pulse-glow-sapatoto {
            0%, 100% { transform: scale(1); text-shadow: 0 0 8px rgba(244, 114, 182, 0.6); }
            50% { transform: scale(1.1); text-shadow: 0 0 15px rgba(244, 114, 182, 0.8), 0 0 25px rgba(236, 72, 153, 0.6); }
        }

        /* PERLINDUNGAN MOBILE / HP */
        @media (max-width: 768px) {
            #announcement-outer-wrapper { padding: 0 !important; margin: 10px auto 10px auto !important; }
            .announcement-inner-spacing { padding: 0 15px !important; } /* Jarak aman tepi HP */
            #announcement.gavan-themed-announcement { border-radius: 8px !important; padding: 8px 15px !important; }
        }
    `;

    // Fungsi untuk memindahkan dan membungkus pengumuman
    function moveAndStyleAnnouncementConditional() {
        const announcement = document.getElementById('announcement');
        const mainSlider = document.getElementById('main-slider'); 
        const memberPanel = document.getElementById('member-status-panel'); 
        const actionBtns = document.getElementById('sapatoto-action-buttons-wrapper'); 

        // Jika announcement tidak ada atau sudah dipindahkan, hentikan
        if (!announcement || announcement.dataset.moved === 'true') {
            return;
        }

        let moved = false; 

        // Membuat pembungkus ganda (seperti tombol dan pintas widget)
        const outerWrapper = document.createElement('div');
        outerWrapper.id = 'announcement-outer-wrapper';
        const innerSpacing = document.createElement('div');
        innerSpacing.className = 'announcement-inner-spacing';
        outerWrapper.appendChild(innerSpacing);

        // Prioritas utama: Pasang di atas tombol jika tombolnya ada
        if (actionBtns) {
            actionBtns.insertAdjacentElement('beforebegin', outerWrapper);
            innerSpacing.appendChild(announcement);
            moved = true;
        }
        else if (mainSlider && mainSlider.parentElement) {
            mainSlider.parentElement.insertAdjacentElement('afterend', outerWrapper);
            innerSpacing.appendChild(announcement);
            moved = true;
        }
        else if (memberPanel) {
            memberPanel.insertAdjacentElement('beforebegin', outerWrapper);
            innerSpacing.appendChild(announcement);
            moved = true;
        }

        if (moved) {
            // Hapus CSS bawaan yang mengganggu
            announcement.style.marginLeft = '';
            announcement.style.marginRight = '';
            announcement.style.marginTop = '';
            announcement.style.marginBottom = '';

            announcement.classList.remove('bg-primary', 'p-1', 'my-3');
            announcement.classList.add('gavan-themed-announcement');
            announcement.dataset.moved = 'true'; 
        }
    }

    // ==========================================================
    // FUNGSI SENSOR PRESISI (Sama persis dengan sapatoto.js)
    // ==========================================================
    function syncAnnouncementWidth() {
        var outerWrapper = document.getElementById('announcement-outer-wrapper');
        
        // Di layar HP: Biarkan CSS yang mengatur agar terlindungi
        if (window.innerWidth <= 768) {
            if (outerWrapper) {
                outerWrapper.style.maxWidth = '100%';
                outerWrapper.style.paddingLeft = '0px';
                outerWrapper.style.paddingRight = '0px';
            }
            return;
        }

        // Di layar PC: Sensor ukuran kerangka utama website
        var referenceElement = document.querySelector('#row-togel');
        
        if (outerWrapper && referenceElement && referenceElement.parentElement) {
            var mainContainer = referenceElement.parentElement;
            var exactWidth = mainContainer.getBoundingClientRect().width;
            var computedStyle = window.getComputedStyle(mainContainer);
            
            if (exactWidth > 0) {
                // Tarik Running Text agar lebarnya 100% mengikuti batas tombol di bawahnya
                outerWrapper.style.maxWidth = exactWidth + 'px';
                outerWrapper.style.paddingLeft = computedStyle.paddingLeft;
                outerWrapper.style.paddingRight = computedStyle.paddingRight;
            }
        }
    }

    // Fungsi untuk inject CSS ke head
    function injectStyles() {
        if (document.getElementById('gavan-announcement-styles')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'gavan-announcement-styles';
        styleElement.innerHTML = announcementStyles;
        document.head.appendChild(styleElement);
    }

    // Jalankan saat DOM siap
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        moveAndStyleAnnouncementConditional();

        const observer = new MutationObserver((mutations) => {
             const announcement = document.getElementById('announcement');
             if (announcement && !announcement.dataset.moved) {
                moveAndStyleAnnouncementConditional();
             }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Aktifkan Sensor Auto-Sync (Cek setiap setengah detik)
        setTimeout(syncAnnouncementWidth, 50);
        setInterval(syncAnnouncementWidth, 500);
        window.addEventListener('resize', syncAnnouncementWidth);
    });

    if (document.readyState === 'complete') {
         injectStyles();
         moveAndStyleAnnouncementConditional();
         setTimeout(syncAnnouncementWidth, 50);
    }

})();
