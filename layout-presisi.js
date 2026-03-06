(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           PRESISI HEADER MENU (NAVBAR TOP)
           ============================================================== */
        #navbar-top {
            width: 100% !important;
            max-width: 1296px !important; /* LEBAR DIKUNCI 1296PX */
            margin: 0 auto !important; /* OTOMATIS TENGAH */
            transition: max-width 0.3s ease;
        }

        /* ==============================================================
           PRESISI BANNER SLIDER & EFEK BORDER
           ============================================================== */
        #main-slider {
            width: 100% !important;
            max-width: 1296px !important; /* LEBAR DIKUNCI 1296PX */
            margin: 0 auto 15px auto !important; /* TENGAH & JARAK 15PX KE RUNNING TEXT */
            border-radius: 4px !important; /* SIKU TAJAM 4PX */
            overflow: hidden !important; /* Memotong gambar agar ikut melengkung */
            box-sizing: border-box !important;
            transition: max-width 0.3s ease;
        }
        
        #main-slider .carousel-inner {
            border-radius: 4px !important;
        }

        /* TAMPILAN KHUSUS DESKTOP/PC (Efek Neon & Border) */
        @media (min-width: 769px) {
            #main-slider {
                border: 1px solid #ec4899 !important; /* Border Pink Sapatoto */
                box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important; /* Cahaya Pink */
            }
            
            /* Opsional: Membuat Header seperti menggantung elegan (Floating Header) */
            #navbar-top {
                border-bottom-left-radius: 4px !important;
                border-bottom-right-radius: 4px !important;
                border-left: 1px solid #ec4899 !important;
                border-right: 1px solid #ec4899 !important;
                border-bottom: 1px solid #ec4899 !important;
                box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2) !important;
            }
        }

        /* ==============================================================
           RESPONSIVE MOBILE / HP (KEMBALI 100% LAYAR PENUH)
           ============================================================== */
        @media (max-width: 768px) {
            #navbar-top {
                max-width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                box-shadow: none !important;
            }
            #main-slider {
                max-width: 100% !important;
                border-radius: 0 !important;
                border: none !important;
                box-shadow: none !important;
                margin-bottom: 10px !important;
            }
            #main-slider .carousel-inner {
                border-radius: 0 !important;
            }
        }
    `;

    // Eksekusi penanaman CSS ke dalam Website
    function injectLayoutStyles() {
        if (document.getElementById('sapatoto-layout-presisi')) return;
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-layout-presisi';
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }

    // Jalankan skrip sesegera mungkin
    injectLayoutStyles();
    document.addEventListener('DOMContentLoaded', injectLayoutStyles);
})();