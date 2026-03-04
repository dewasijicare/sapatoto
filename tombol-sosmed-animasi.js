(function() {
    // ID unik untuk style ini
    const STYLE_ID = 'sapatoto-digital-promo-styles';

    // 1. Injeksi CSS Khusus
    function injectPromoStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `
            /* --- BASE BUTTON: KUNING TERANG --- */
            .btn-digital-promo {
                position: relative;
                overflow: hidden;
                /* Background Kuning Terang yang Mencolok */
                background: linear-gradient(135deg, #ffe600, #ffb300) !important;
                border: none !important;
                color: #1a1a1a !important; /* Teks Warna Gelap / Hampir Hitam */
                font-weight: 900 !important; 
                padding: 12px 15px !important; 
                border-radius: 8px !important; 
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-transform: uppercase !important;
                text-decoration: none;
                /* Glow Kuning Emas di luar */
                box-shadow: 0 4px 15px rgba(255, 179, 0, 0.5) !important;
                transition: all 0.3s ease;
                z-index: 1;
            }

            .btn-digital-promo:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 8px 25px rgba(255, 179, 0, 0.8) !important;
                background: linear-gradient(135deg, #fff04d, #ffc107) !important;
            }

            /* --- TEKS & ICON TENGAH: GELAP & JELAS --- */
            .promo-center-text {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1.15em;
                z-index: 10;
                text-shadow: none; /* Tidak butuh shadow karena background sudah terang */
            }
            .promo-center-text i {
                font-size: 1.3em; /* Icon sosmed dibesarkan sedikit */
            }

            /* --- PANAH SUPER TEBAL (MENGISI PANEL) --- */
            .digital-arrow-container {
                position: absolute;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                /* Ukuran font sangat besar agar panah membentang dari atas ke bawah */
                font-size: 2.8rem; 
                line-height: 0;
                z-index: 5;
                pointer-events: none;
                font-family: "Arial Black", Impact, sans-serif;
                letter-spacing: -0.15em; /* Merapatkan panah ganda agar menempel */
            }
            .arrow-pos-left { left: 8px; }
            .arrow-pos-right { right: 8px; }

            /* --- ANIMASI LAMPU BERJALAN: UNGU PIXEL/KOTAK --- */
            .running-light-effect {
                color: transparent; 
                /* Gradien Ungu dengan pola patah/kotak-kotak (Hard Stop) */
                background: repeating-linear-gradient(
                    90deg,
                    #7e22ce 0px,     /* Ungu Tua (Base) */
                    #7e22ce 15px,    /* Lebar blok ungu tua */
                    #d8b4fe 15px,    /* Ungu Terang / Menyala (Lampu) */
                    #d8b4fe 30px     /* Lebar blok lampu menyala */
                );
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                
                /* Kecepatan lampu bergerak */
                animation: ledScrollPurple 0.9s infinite linear;
                filter: drop-shadow(0 2px 4px rgba(126, 34, 206, 0.4)); /* Sedikit bayangan di panah */
            }

            /* Balik arah untuk panah sebelah kanan */
            .running-light-reverse {
                animation-direction: reverse;
            }

            /* Keyframes menggeser background warna ungu */
            @keyframes ledScrollPurple {
                0%   { background-position: 0% 0%; }
                100% { background-position: -200% 0%; }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Fungsi Pembuat Tombol
    function createDigitalPromoButtons() {
        const targetContainer = document.querySelector("#row-quicklogin .card-body");
        
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
            wrapper.className = "custom-digital-buttons-wrapper mt-4 d-grid gap-3";

            buttonsData.forEach(data => {
                const btn = document.createElement("a");
                btn.href = data.link;
                btn.target = "_blank";
                btn.className = "btn btn-digital-promo";
                
                // STRUKTUR HTML BARU: Menggunakan Karakter Segitiga Geometris Padat (▶ & ◀)
                btn.innerHTML = `
                    <div class="digital-arrow-container arrow-pos-left">
                        <span class="running-light-effect">&#9654;&#9654;</span>
                    </div>

                    <span class="promo-center-text">
                        <i class="bi ${data.icon}"></i> ${data.text}
                    </span>

                    <div class="digital-arrow-container arrow-pos-right">
                        <span class="running-light-effect running-light-reverse">&#9664;&#9664;</span>
                    </div>
                `;
                
                wrapper.appendChild(btn);
            });

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

    // 3. Eksekutor Utama
    function init() {
        injectPromoStyles();
        if (!createDigitalPromoButtons()) {
            const observer = new MutationObserver((mutations, obs) => {
                if (createDigitalPromoButtons()) {
                    obs.disconnect(); 
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
