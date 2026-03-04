(function() {
    // ID unik untuk style ini agar tidak bentrok
    const STYLE_ID = 'sapatoto-digital-promo-styles';

    // 1. Injeksi CSS Khusus "Digital Running Light"
    function injectPromoStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `
            /* --- BASE BUTTON STYLE (Warna Pink Lebih Cerah & Neon) --- */
            .btn-digital-promo {
                position: relative;
                overflow: hidden;
                /* Gradien Neon Fuchsia ke Ungu Terang - Jauh lebih cerah dari sebelumnya */
                background: linear-gradient(135deg, #ff4081, #d500f9) !important;
                border: none !important;
                color: #fff !important;
                font-weight: 800 !important; /* Font lebih tebal */
                padding: 14px 15px !important; /* Sedikit lebih tinggi */
                border-radius: 12px !important; /* Sudut lebih tumpul */
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-transform: uppercase !important;
                text-decoration: none;
                /* Glow effect yang lebih terang */
                box-shadow: 0 0 25px rgba(255, 64, 129, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3) !important;
                transition: all 0.3s ease;
                z-index: 1;
            }

            .btn-digital-promo:hover {
                transform: translateY(-3px) scale(1.02);
                /* Saat dihover, glow makin terang dan warnanya bergeser */
                box-shadow: 0 10px 30px rgba(213, 0, 249, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.6) !important;
                background: linear-gradient(135deg, #d500f9, #ff4081) !important;
            }

            /* Teks & Ikon di tengah */
            .promo-center-text {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1.1em;
                z-index: 10; /* Pastikan teks di atas panah */
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }

            /* --- CONTAINER PANAH SAMPING (Mengisi Penuh Tinggi) --- */
            .digital-arrow-container {
                position: absolute;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.5rem; /* Ukuran ikon SANGAT BESAR */
                opacity: 0.9;
                z-index: 5;
                pointer-events: none; /* Agar tidak mengganggu klik */
            }
            .arrow-pos-left { left: -8px; }
            .arrow-pos-right { right: -8px; }


            /* --- EFEK ANIMASI "RUNNING LIGHT" DIGITAL --- */
            .running-light-effect {
                /* Trik: Warna teks transparan */
                color: transparent; 
                /* Membuat background garis-garis kuning & transparan (efek pixel/led) */
                background: repeating-linear-gradient(
                    90deg,
                    #fbbf24 0px,    /* Warna Kuning Emas Menyala */
                    #fbbf24 5px,    /* Lebar "pixel" lampu */
                    transparent 5px,
                    transparent 10px /* Jarak antar lampu */
                );
                background-size: 200% 100%; /* Ukuran background 2x lipat agar bisa digeser */
                
                /* KUNCI: Memotong background agar hanya muncul di dalam bentuk ikon panah */
                -webkit-background-clip: text;
                background-clip: text;

                /* Menjalankan animasi geser background */
                animation: digitalLedScroll 1s infinite linear;
                filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.8)); /* Glow kuning di panahnya */
            }

            /* Membalik arah animasi untuk panah kanan */
            .running-light-reverse {
                animation-direction: reverse;
            }

            /* Definisi Animasi Geser Background */
            @keyframes digitalLedScroll {
                0%   { background-position: 0% 0%; }
                100% { background-position: -200% 0%; }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Fungsi Pembuat Tombol
    function createDigitalPromoButtons() {
        // Target tetap sama: di dalam card-body milik #row-quicklogin
        const targetContainer = document.querySelector("#row-quicklogin .card-body");
        
        // Cek container dan pastikan tombol belum ada
        if (targetContainer && !document.querySelector(".custom-digital-buttons-wrapper")) {
            
            const buttonsData = [
                {
                    text: "WHATSAPP SAPATOTO",
                    link: "https://wa.me/6282312054466",
                    icon: "bi-whatsapp"
                },
                {
                    text: "GROUP FACEBOOK",
                    link: "https://www.facebook.com/groups/1633061267257649",
                    icon: "bi-facebook"
                }
            ];

            const wrapper = document.createElement("div");
            wrapper.className = "custom-digital-buttons-wrapper mt-4 d-grid gap-3"; // Gap lebih lebar

            buttonsData.forEach(data => {
                const btn = document.createElement("a");
                btn.href = data.link;
                btn.target = "_blank";
                // Gunakan class baru kita
                btn.className = "btn btn-digital-promo";
                
                // STRUKTUR HTML BARU:
                // Menggunakan ikon panah besar (bi-chevron-compact) di kiri dan kanan
                btn.innerHTML = `
                    <div class="digital-arrow-container arrow-pos-left">
                        <i class="bi bi-chevron-compact-right running-light-effect"></i>
                    </div>

                    <span class="promo-center-text">
                        <i class="bi ${data.icon}"></i> ${data.text}
                    </span>

                    <div class="digital-arrow-container arrow-pos-right">
                        <i class="bi bi-chevron-compact-left running-light-effect running-light-reverse"></i>
                    </div>
                `;
                
                wrapper.appendChild(btn);
            });

            // Masukkan ke halaman
            const lastElement = targetContainer.lastElementChild;
            if (lastElement) {
                lastElement.parentNode.insertBefore(wrapper, lastElement.nextSibling);
            } else {
                targetContainer.appendChild(wrapper);
            }
            
            return true;
        }
        return false;
    }

    // 3. Eksekutor (Menggunakan Observer untuk memastikan elemen ada)
    function init() {
        injectPromoStyles();
        // Coba langsung
        if (!createDigitalPromoButtons()) {
            // Jika gagal, pantau perubahan DOM (untuk halaman yang loading dinamis)
            const observer = new MutationObserver((mutations, obs) => {
                if (createDigitalPromoButtons()) {
                    obs.disconnect(); // Berhenti memantau jika sudah berhasil
                }
            });
            // Pantau body untuk penambahan child list
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    // Jalankan
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
