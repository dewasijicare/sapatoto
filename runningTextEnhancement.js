(function() {
    // CSS untuk styling announcement (TEMA SAPATOTO: DARK, NEON PINK & PURPLE)
    const announcementStyles = `
        /* ==============================================================
           BUNGKUSAN LUAR: LEBAR PASTI 1296PX & POSISI TENGAH
           ============================================================== */
        #announcement-outer-wrapper {
            width: 100%;
            max-width: 1296px !important; /* LEBAR DIKUNCI 1296PX */
            margin: 15px auto 15px auto !important; /* OTOMATIS DI TENGAH */
            padding: 0; 
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
            border-radius: 4px !important; /* Lengkungan siku 4px */
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important; 
            color: #ecf0f1 !important;
            padding: 10px 20px !important; 
            display: flex !important;
            align-items: center !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important; 
            margin: 0 !important; 
            box-sizing: border-box !important;
        }

        /* ICON NOTICE BERWARNA UNGU NEON & GLOW UNGU */
        #announcement.gavan-themed-announcement i.fa-solid.fa-bullhorn,
        #announcement.gavan-themed-announcement i.bi-megaphone {
            color: #a855f7 !important; /* Ungu Sapatoto */
            text-shadow: 0 0 8px #a855f7;
            margin-right: 12px;
            font-size: 1.2em;
            animation: pulse-glow-purple 2s infinite ease-in-out; 
            flex-shrink: 0;
        }

        #announcement.gavan-themed-announcement marquee {
            flex-grow: 1;
            color: #ffe600 !important; /* Teks Kuning */
            min-width: 0;
            letter-spacing: 0.5px;
            font-weight: 700; 
            text-shadow: 0 0 8px rgba(255, 230, 0, 0.5); 
        }

        /* ANIMASI CAHAYA UNGU KHUSUS ICON */
        @keyframes pulse-glow-purple {
            0%, 100% { transform: scale(1); text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }
            50% { transform: scale(1.1); text-shadow: 0 0 15px rgba(168, 85, 247, 0.8), 0 0 25px rgba(147, 51, 234, 0.6); }
        }

        /* PERLINDUNGAN MOBILE / HP: KEMBALI 100% LEBAR LAYAR */
        @media (max-width: 768px) {
            #announcement-outer-wrapper { max-width: 100% !important; margin: 10px auto 10px auto !important; padding: 0 !important; }
            .announcement-inner-spacing { padding: 0 !important; } 
            #announcement.gavan-themed-announcement { border-radius: 4px !important; padding: 8px 15px !important; }
        }
    `;

    // Fungsi untuk memindahkan dan membungkus pengumuman
    function moveAndStyleAnnouncementConditional() {
        const announcement = document.getElementById('announcement');
        const mainSlider = document.getElementById('main-slider'); 
        
        // PERBAIKAN 1: Deteksi wrapper baru agar tidak salah masuk ke dalam bungkusan Member Panel
        const memberPanel = document.getElementById('sapatoto-member-panel-wrapper') || document.getElementById('member-status-panel'); 
        const actionBtns = document.getElementById('sapatoto-action-buttons-wrapper'); 

        // Jika announcement tidak ada atau sudah dipindahkan, hentikan
        if (!announcement || announcement.dataset.moved === 'true') {
            return;
        }

        let moved = false; 

        // Membuat pembungkus ganda 
        const outerWrapper = document.createElement('div');
        outerWrapper.id = 'announcement-outer-wrapper';
        const innerSpacing = document.createElement('div');
        innerSpacing.className = 'announcement-inner-spacing';
        outerWrapper.appendChild(innerSpacing);

        // Prioritas penempatan letak
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

            // PERBAIKAN 2: Timpa class sepenuhnya agar terbebas dari jeratan .container Bootstrap
            announcement.className = 'gavan-themed-announcement';
            announcement.dataset.moved = 'true'; 

            // PERBAIKAN 3: Percepat laju teks agar tidak menunggu lama saat refresh
            const marqueeTag = announcement.querySelector('marquee');
            if (marqueeTag) {
                // 1. Naikkan kecepatan secara drastis ke 25 (default bawaannya 6)
                marqueeTag.setAttribute('scrollamount', '25'); 
                
                // 2. Bersihkan spasi kosong/gaib berlebih di awal teks yang membuatnya lama muncul
                let currentText = marqueeTag.innerHTML;
                currentText = currentText.replace(/^(&nbsp;|\s)+/g, '').trim();
                marqueeTag.innerHTML = currentText;
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
        
        // FUNGSI SENSOR AUTO-SYNC DIHAPUS KARENA SUDAH MENGGUNAKAN LEBAR PASTI 1296PX
    });

    if (document.readyState === 'complete') {
         injectStyles();
         moveAndStyleAnnouncementConditional();
    }

})();




