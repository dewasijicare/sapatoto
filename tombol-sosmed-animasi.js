(function() {
    // 1. Injeksi CSS Khusus untuk Tombol dan Animasi
    function injectPromoStyles() {
        if (document.getElementById('sapatoto-promo-styles')) return;
        const style = document.createElement('style');
        style.id = 'sapatoto-promo-styles';
        style.innerHTML = `
            .btn-animated-promo {
                position: relative;
                overflow: hidden;
                background: linear-gradient(90deg, #be185d, #9d174d) !important;
                border: none !important;
                color: #fff !important;
                font-weight: 700 !important;
                padding: 12px 15px !important;
                border-radius: 8px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-transform: uppercase !important;
                text-decoration: none;
                box-shadow: 0 0 15px rgba(190, 24, 93, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.3);
                transition: all 0.3s ease;
            }

            .btn-animated-promo:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 5px 25px rgba(190, 24, 93, 0.7), 0 0 30px rgba(244, 114, 182, 0.5), inset 0 0 8px rgba(255, 255, 255, 0.5);
                color: #fef3c7 !important;
                background: linear-gradient(90deg, #ec4899, #be185d) !important;
            }

            .promo-center-text {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 1em;
                z-index: 2;
            }

            /* --- ANIMASI PANAH DIGITAL KUNING --- */
            .digital-arrow {
                color: #fbbf24; /* Warna Kuning Terang */
                font-weight: 900;
                font-size: 1.2em;
                position: absolute;
                top: 50%;
                z-index: 1;
                text-shadow: 0 0 8px rgba(251, 191, 36, 0.8);
            }

            .arrow-left {
                left: 15px;
                animation: digitalMoveInwardLeft 0.8s infinite alternate ease-in-out;
            }

            .arrow-right {
                right: 15px;
                animation: digitalMoveInwardRight 0.8s infinite alternate ease-in-out;
            }

            /* Panah Kiri bergerak ke kanan (masuk) */
            @keyframes digitalMoveInwardLeft {
                0% { transform: translate(-4px, -50%); opacity: 0.6; }
                100% { transform: translate(4px, -50%); opacity: 1; }
            }

            /* Panah Kanan bergerak ke kiri (masuk) */
            @keyframes digitalMoveInwardRight {
                0% { transform: translate(4px, -50%); opacity: 0.6; }
                100% { transform: translate(-4px, -50%); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Fungsi untuk membuat dan menempatkan tombol
    function createPromoButtons() {
        const targetContainer = document.querySelector("#row-quicklogin .card-body");
        
        // Cek apakah target ada dan tombol belum pernah dibuat
        if (targetContainer && !document.querySelector(".custom-promo-buttons-container")) {
            
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
            wrapper.className = "custom-promo-buttons-container mt-4 d-grid gap-2";

            buttonsData.forEach(data => {
                const btn = document.createElement("a");
                btn.href = data.link;
                btn.target = "_blank";
                btn.className = "btn btn-animated-promo";
                
                // Susunan HTML: Panah Kiri >> Teks + Icon Tengah << Panah Kanan
                btn.innerHTML = `
                    <span class="digital-arrow arrow-left"><i class="bi bi-chevron-double-right"></i></span>
                    <span class="promo-center-text"><i class="bi ${data.icon}"></i> ${data.text}</span>
                    <span class="digital-arrow arrow-right"><i class="bi bi-chevron-double-left"></i></span>
                `;
                
                wrapper.appendChild(btn);
            });

            // Masukkan tepat di atas elemen terakhir (biasanya di bawah form login)
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

    // 3. Eksekutor
    function init() {
        injectPromoStyles();
        if (!createPromoButtons()) {
            // Jika elemen login belum dirender, tunggu dan coba lagi (cocok untuk website dinamis)
            const observer = new MutationObserver((mutations, obs) => {
                if (createPromoButtons()) {
                    obs.disconnect(); // Hentikan pantauan jika sudah berhasil
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    // Jalankan saat halaman dimuat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();