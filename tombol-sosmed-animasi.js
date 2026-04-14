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
                background: linear-gradient(135deg, #ffe600, #ffb300) !important;
                border: none !important;
                color: #1a1a1a !important; 
                font-weight: 700 !important; /* Disamakan dengan ketebalan tombol LOGIN/DAFTAR */
                padding: 10px 15px !important; /* Padding disamakan dengan standar tombol Bootstrap */
                border-radius: 8px !important; 
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-transform: uppercase !important;
                text-decoration: none;
                box-shadow: 0 4px 15px rgba(255, 179, 0, 0.5) !important;
                transition: all 0.3s ease;
                z-index: 1;
            }

            .btn-digital-promo:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 8px 25px rgba(255, 179, 0, 0.8) !important;
                background: linear-gradient(135deg, #fff04d, #ffc107) !important;
            }

            /* --- TEKS & ICON TENGAH --- */
            .promo-center-text {
                display: flex;
                align-items: center;
                gap: 8px; /* Jarak icon dan teks sedikit dirapatkan */
                font-size: 1rem !important; /* Ukuran font disamakan persis dengan tombol LOGIN */
                z-index: 10;
                text-shadow: none; 
            }
            .promo-center-text i {
                font-size: 1.15rem; /* Ukuran icon disesuaikan agar proporsional */
            }

            /* --- PANAH SAMPING --- */
            .digital-arrow-container {
                position: absolute;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.2rem; /* Ukuran panah diperkecil agar seimbang dengan tombol baru */
                line-height: 0;
                z-index: 5;
                pointer-events: none;
                font-family: "Arial Black", Impact, sans-serif;
                letter-spacing: -0.15em; 
            }
            .arrow-pos-left { left: 8px; }
            .arrow-pos-right { right: 8px; }

            /* --- ANIMASI LAMPU BERJALAN: UNGU PIXEL/KOTAK --- */
            .running-light-effect {
                color: transparent; 
                background: repeating-linear-gradient(
                    90deg,
                    #7e22ce 0px,     
                    #7e22ce 12px,    /* Lebar blok disesuaikan dengan ukuran panah baru */
                    #d8b4fe 12px,    
                    #d8b4fe 24px     
                );
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                animation: ledScrollPurple 0.9s infinite linear;
                filter: drop-shadow(0 2px 4px rgba(126, 34, 206, 0.4)); 
            }

            .running-light-reverse {
                animation-direction: reverse;
            }

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
                    link: "https://wa.me/6282379884286",
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
