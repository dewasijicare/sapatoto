(function() {
    const layoutPresisiStyles = `
        /* ==============================================================
           1. PRESISI HEADER MENU (NAVBAR TOP)
           ============================================================== */
        /* Mengakali class fixed-top bawaan agar bisa di-center sejajar 1296px */
        #navbar-top-wrapper.fixed-top {
            width: 100% !important;
            max-width: 1296px !important;
            margin: 0 auto !important;
            left: 0 !important;
            right: 0 !important;
        }

        #navbar-top {
            width: 100% !important;
            border-radius: 0 !important; /* Pastikan tidak ada lengkungan */
            border: none !important;     /* Pastikan tidak ada garis */
            box-shadow: none !important;
        }

        /* ==============================================================
           2. PRESISI BANNER SLIDER & TINGGI 600PX (Tanpa Border/Siku)
           ============================================================== */
        #main-slider {
            width: 100% !important;
            max-width: 1296px !important; /* LEBAR DIKUNCI 1296PX */
            margin: 0 auto 15px auto !important; /* TENGAH & JARAK 15PX KE BAWAH */
            border: none !important;             /* HAPUS BORDER */
            border-radius: 0 !important;         /* HAPUS ROUND CORNER */
            box-shadow: none !important;         /* HAPUS SHADOW */
            background-color: transparent !important;
        }

        #main-slider .carousel-inner {
            border-radius: 0 !important;         /* HAPUS ROUND CORNER DI DALAM */
        }

        /* Menarik tinggi gambar menjadi 600px dengan proporsi cover */
        #main-slider .carousel-item img {
            height: 600px !important;
            object-fit: cover !important;        /* Mencegah gambar menjadi gepeng */
            object-position: center top !important; /* Fokus pada bagian tengah-atas gambar */
            width: 100% !important;
            border-radius: 0 !important;
        }

        /* ==============================================================
           3. RESPONSIVE MOBILE / HP
           ============================================================== */
        @media (max-width: 768px) {
            /* Header dan Banner kembali 100% di layar HP */
            #navbar-top-wrapper.fixed-top,
            #main-slider {
                max-width: 100% !important;
            }
            
            /* Tinggi gambar di HP disesuaikan agar tidak kebesaran memenuhi layar */
            #main-slider .carousel-item img {
                height: 250px !important; 
            }
        }
    `;

    // Eksekusi penanaman CSS ke dalam Website
    function injectLayoutStyles() {
        const existingStyle = document.getElementById('sapatoto-layout-presisi');
        if (existingStyle) {
            existingStyle.innerHTML = layoutPresisiStyles;
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'sapatoto-layout-presisi';
        styleElement.innerHTML = layoutPresisiStyles;
        document.head.appendChild(styleElement);
    }

    // Jalankan skrip 
    injectLayoutStyles();
    document.addEventListener('DOMContentLoaded', injectLayoutStyles);
})();
