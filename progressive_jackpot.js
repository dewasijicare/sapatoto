(function() {
    // --- 1. BLOK CSS KHUSUS JACKPOT (TEMA SAPATOTO - PINK & UNGU NEON) ---
    const jackpotStylesSapatoto = `
        @import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Exo+2:wght@700;900&display=swap');
        
        :root {
            --neon-pink: #f472b6;
            --neon-pink-dark: #ec4899;
            --neon-purple: #a855f7;
            --neon-purple-dark: #9333ea;
            --dark-bg: #1a252f;
        }

        /* --- PERBAIKAN LEBAR PRESISI 100% --- */
        .jackpot-container-main {
            font-family: 'Exo 2', sans-serif !important; 
            text-align: center;
            position: relative;
            margin: 0 auto 25px auto !important; /* Jarak disamakan dengan widget lain */
            z-index: 50;
            padding: 0 15px !important; /* Jarak kiri kanan untuk desktop */
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 1200px !important; /* MEMAKSA LEBAR MAKSIMAL 1200px */
        }

        /* Border Animasi (Denyutan Pink & Ungu Sapatoto) */
        .jackpot-animated-border {
            position: relative;
            border-radius: 15px; /* Lengkungan disamakan dengan widget lain */
            padding: 3px; /* Ketebalan border gradient */
            width: 100%;
            
            /* Background dasar sebelum di-masking oleh inner box */
            background: linear-gradient(45deg, var(--neon-pink-dark), var(--neon-purple-dark));
            
            animation: borderPulseSapatoto 2s ease-in-out infinite alternate;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
        }

        @keyframes borderPulseSapatoto {
            0% { 
                box-shadow: 0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(236, 72, 153, 0.4);
                filter: hue-rotate(0deg);
            }
            100% { 
                box-shadow: 0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6);
                filter: hue-rotate(30deg); /* Menciptakan transisi warna yang dinamis */
            }
        }

        /* Kotak konten utama Jackpot (Panel LED Gelap) */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background-color: var(--dark-bg); 
            border-radius: 12px; /* Sedikit lebih kecil dari outer border */
            min-height: 90px;
            position: relative;
            padding: 20px 15px; 
            z-index: 2;
            width: 100%;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.8);

            /* Background Dot-Matrix dengan hint Pink Gelap (Efek Panel LED Premium) */
            background-image: radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0);
            background-size: 4px 4px;
        }
        
        /* Judul Jackpot */
        .jackpot-main-title {
            color: #fff; 
            font-size: 1.2rem;
            font-weight: 900;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 8px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Ikon Trophy (Warna Pink/Ungu Neon) */
        .jackpot-main-title i {
            font-size: 1.3rem;
            margin-right: 10px;
            color: var(--neon-pink); 
            text-shadow: 0 0 10px var(--neon-pink), 0 0 20px var(--neon-purple);
            animation: iconBlink 2s infinite alternate;
        }

        @keyframes iconBlink {
            0% { opacity: 0.8; transform: scale(0.95); text-shadow: 0 0 5px var(--neon-pink); }
            100% { opacity: 1; transform: scale(1.05); text-shadow: 0 0 15px var(--neon-purple), 0 0 25px var(--neon-pink); }
        }

        /* Teks Judul yang Berjalan (Gradient Pink - Putih - Ungu) */
        .jackpot-animated-text {
            background: linear-gradient(90deg, #fff, var(--neon-pink), var(--neon-purple), #fff);
            background-size: 300% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: textFlow 3s linear infinite;
        }

        @keyframes textFlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
        }

        /* Angka Jackpot dengan Font Digital Aldrich & Glow Sapatoto */
        .jackpot-value-final {
            font-family: 'Aldrich', sans-serif !important;
            color: #fff; 
            font-size: 2.5rem; 
            font-weight: 400; 
            line-height: 1.1;
            letter-spacing: 2px; 
            
            /* Efek Glow Pink & Ungu yang Tajam */
            text-shadow: 
                0 0 5px #fff,
                0 0 10px var(--neon-pink), 
                0 0 20px var(--neon-pink-dark),
                0 0 40px var(--neon-purple); 
            
            white-space: nowrap;
            animation: textGlowSapatoto 1.5s ease-in-out infinite alternate;
        }

        @keyframes textGlowSapatoto {
            0% { 
                opacity: 0.9; 
                text-shadow: 0 0 5px #fff, 0 0 10px var(--neon-purple), 0 0 20px var(--neon-pink-dark);
            }
            100% { 
                opacity: 1; 
                text-shadow: 0 0 8px #fff, 0 0 15px var(--neon-pink), 0 0 30px var(--neon-purple), 0 0 50px var(--neon-pink-dark);
            }
        }

        /* Responsive Desktop */
        @media (min-width: 992px) {
            .jackpot-value-final {
                font-size: 3.5rem; /* Font diperbesar agar tidak melompong di PC */
                letter-spacing: 5px;
            }
            .jackpot-main-title {
                font-size: 1.4rem;
            }
            .jackpot-main-title i {
                font-size: 1.6rem;
            }
            /* BATASAN 700PX LAMA TELAH DIHAPUS DARI SINI */
        }

        /* Responsive Mobile: Menghilangkan Double Padding agar Rata Kiri Kanan */
        @media (max-width: 768px) {
            .jackpot-container-main {
                padding: 0 !important; /* Hapus margin/padding bawaan agar presisi */
            }
            .jackpot-value-final {
                font-size: 7vw; 
                letter-spacing: 0.5vw;
            }
            .jackpot-main-title {
                font-size: 1rem;
            }
            .jackpot-main-title i {
                font-size: 1.1rem;
            }
        }
    `;

    // Tambahkan CSS ke head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesSapatoto;
    document.head.appendChild(styleElement);


    // --- 2. FUNGSI LOGIKA COUNTER DINAMIS ---
    function startDynamicJackpotCounterFinal() {
        const element = document.getElementById('dynamic-jackpot-value-final');
        if (!element) return;

        let currentValue = 32462646763;
        const maxIncrement = 15;
        const updateInterval = 80;
        const resetThreshold = 32462700000;

        function updateJackpotValue() {
            const increment = Math.floor(Math.random() * maxIncrement) + 1;
            currentValue += increment;

            if (currentValue > resetThreshold) {
                currentValue = 32462646763;
            }

            let formattedNumber = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            element.textContent = 'IDR ' + formattedNumber;
        }

        updateJackpotValue();
        setInterval(updateJackpotValue, updateInterval);
    }

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML ---
    function injectJackpotHTMLFinal() {
        const targetElement = document.getElementById('row-togel');
        
        if (document.querySelector('.jackpot-container-main')) {
            return;
        }

        // Jika row-togel belum ada, tunggu sebentar lalu coba lagi
        if (!targetElement) {
            setTimeout(injectJackpotHTMLFinal, 200);
            return;
        }

        const jackpotHTMLFinal = `
            <div class="jackpot-container-main">
                <div class="jackpot-animated-border">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-main-title">
                            <i class="bi bi-trophy-fill"></i>
                            <span class="jackpot-animated-text">PROGRESSIVE JACKPOTS</span>
                        </div>
                        <div id="dynamic-jackpot-value-final" class="jackpot-value-final">IDR 32.462.646.763</div>
                    </div>
                </div>
            </div>
        `;

        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);
        startDynamicJackpotCounterFinal();
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
})();
