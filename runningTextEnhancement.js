(function() {
    // CSS untuk styling announcement (TEMA SAPATOTO: DARK & NEON PINK)
    const announcementStyles = `
        #announcement.gavan-themed-announcement {
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
            border: 1px solid #ec4899 !important; /* Border Pink Sapatoto */
            border-radius: 8px !important;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important; /* Glow Pink */
            color: #ecf0f1 !important;
            padding: 10px 15px !important;
            display: flex;
            align-items: center;
            overflow: hidden;
            /* Margin spesifik posisi akan ditambahkan oleh JS */
        }

        #announcement.gavan-themed-announcement i.fa-solid.fa-bullhorn {
            color: #f472b6 !important; /* Pink Cerah */
            text-shadow: 0 0 8px #f472b6;
            margin-right: 12px;
            font-size: 1.2em;
            animation: pulse-glow-sapatoto 2s infinite ease-in-out;
            flex-shrink: 0;
        }

        #announcement.gavan-themed-announcement marquee {
            flex-grow: 1;
            color: #ffe600 !important; /* Ubah ke Kuning Terang */
            min-width: 0;
            letter-spacing: 0.5px;
            font-weight: 700; /* Dibuat tebal agar lebih jelas */
            text-shadow: 0 0 8px rgba(255, 230, 0, 0.5); /* Tambahan efek cahaya kuning tipis */
        }

        @keyframes pulse-glow-sapatoto {
            0%, 100% { transform: scale(1); text-shadow: 0 0 8px rgba(244, 114, 182, 0.6); }
            50% { transform: scale(1.1); text-shadow: 0 0 15px rgba(244, 114, 182, 0.8), 0 0 25px rgba(236, 72, 153, 0.6); }
        }
    `;

    // Fungsi untuk memindahkan dan men-style announcement (Logika Gabungan)
    function moveAndStyleAnnouncementConditional() {
        const announcement = document.getElementById('announcement');
        const mainSlider = document.getElementById('main-slider'); // Target homepage
        const memberPanel = document.getElementById('member-status-panel'); // Target member area

        // Jika announcement tidak ada atau sudah dipindahkan, hentikan
        if (!announcement || announcement.dataset.moved === 'true') {
            return;
        }

        let moved = false; // Penanda apakah pemindahan berhasil

        // === Logika untuk Homepage (ada #main-slider) ===
        if (mainSlider) {
            const sliderContainer = mainSlider.parentElement;
            if (sliderContainer) {
                // Pindahkan ke setelah container slider
                sliderContainer.insertAdjacentElement('afterend', announcement);
                // Atur margin spesifik homepage
                announcement.style.marginLeft = '12px';
                announcement.style.marginRight = '12px';
                announcement.style.marginTop = '1.5rem';
                announcement.style.marginBottom = '1rem';
                moved = true;
                console.log("Announcement moved for homepage (Sapatoto Theme).");
            }
        }
        // === Logika untuk Member Area (ada #member-status-panel) ===
        else if (memberPanel) {
            // Pindahkan ke sebelum panel member
            memberPanel.insertAdjacentElement('beforebegin', announcement);
            // Atur margin spesifik member area
            announcement.style.marginLeft = '6px';
            announcement.style.marginRight = '6px';
            announcement.style.marginTop = '1rem';
            announcement.style.marginBottom = '1rem';
            moved = true;
            console.log("Announcement moved for member area (Sapatoto Theme).");
        }

        // Jika berhasil dipindahkan, terapkan styling dasar
        if (moved) {
            announcement.classList.remove('bg-primary', 'p-1', 'my-3');
            announcement.classList.add('gavan-themed-announcement');
            announcement.dataset.moved = 'true'; // Tandai sudah dipindahkan
        } else {
             console.log("Could not find appropriate anchor point for announcement.");
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

    // Jalankan saat DOM siap dan gunakan Observer
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        moveAndStyleAnnouncementConditional();

        const observer = new MutationObserver((mutations) => {
            // Cek jika elemen target muncul DAN announcement belum dipindahkan
             const announcement = document.getElementById('announcement');
             const mainSlider = document.getElementById('main-slider');
             const memberPanel = document.getElementById('member-status-panel');
             if (announcement && !announcement.dataset.moved && (mainSlider || memberPanel)) {
                moveAndStyleAnnouncementConditional();
             }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        moveAndStyleAnnouncementConditional(); // Panggil lagi
    });

    // Panggil jika skrip di-inject setelah DOM load
    if (document.readyState === 'complete') {
         injectStyles();
         moveAndStyleAnnouncementConditional();
    }

})();






