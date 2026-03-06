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

        /* ==============================================================
           BUNGKUSAN LUAR & DALAM UNTUK PRESISI LEBAR AUTO-SYNC
           ============================================================== */
        #jackpot-outer-wrapper {
            width: 100%;
            margin: 0 auto 25px auto !important;
            padding: 0 !important; /* Dibiarkan 0 agar disuntik JS */
            box-sizing: border-box;
            transition: max-width 0.3s ease;
            font-family: 'Exo 2', sans-serif !important;
            z-index: 50;
            position: relative;
        }

        .jackpot-inner-spacing {
            padding: 0 8px; /* Rumus sejajar 8px untuk PC */
            width: 100%;
            box-sizing: border-box;
        }

        /* ==============================================================
           BORDER KOTAK JACKPOT: DITIPISKAN (1px) & SIKU TAJAM (4px)
           ============================================================== */
        .jackpot-animated-border {
            position: relative;
            border-radius: 4px !important; /* SIKU 4PX */
            padding: 1px; /* KETEBALAN BORDER DIKURANGI MENJADI 1PX */
            width: 100%;
            background: linear-gradient(45deg, var(--neon-pink-dark), var(--neon-purple-dark));
            animation: borderPulseSapatoto 2s ease-in-out infinite alternate;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
        }

        @keyframes borderPulseSapatoto {
            0% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5); filter: hue-rotate(0deg); }
            100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.6); filter: hue-rotate(30deg); }
        }

        /* Kotak konten utama Jackpot */
        .jackpot-display-box-content {
            display: flex;
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            background-color: var(--dark-bg); 
            border-radius: 3px !important; /* Sedikit lebih kecil dari border luar */
            min-height: 90px;
            position: relative;
            padding: 20px 15px; 
            z-index: 2;
            width: 100%;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
            background-image: radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0);
            background-size: 4px 4px;
            overflow: hidden; /* Mencegah efek cahaya keluar batas */
        }

        /* ==============================================================
           ✨ EFEK PREMIUM 1: SAPUAN CAHAYA MENGKILAP (GLASS SHINE)
           ============================================================== */
        .jackpot-shine {
            position: absolute;
            top: 0; left: -150%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-25deg);
            animation: shineSweeper 5s infinite;
            z-index: 1;
            pointer-events: none;
        }

        @keyframes shineSweeper {
            0% { left: -150%; }
            15% { left: 200%; } /* Lewat cepat di awal */
            100% { left: 200%; } /* Jeda lama sebelum mengulang */
        }

        /* ==============================================================
           ✨ EFEK PREMIUM 2: PARTIKEL API NEON (SPARKS) MELAYANG
           ============================================================== */
        .jackpot-spark {
            position: absolute;
            width: 4px; height: 4px;
            border-radius: 50%;
            opacity: 0;
            z-index: 1;
            animation: floatUp 4s infinite linear;
        }
        .spark-1 { left: 15%; animation-delay: 0s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); }
        .spark-2 { left: 35%; animation-delay: 1.5s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); }
        .spark-3 { left: 65%; animation-delay: 2.2s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); }
        .spark-4 { left: 85%; animation-delay: 0.8s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); }

        @keyframes floatUp {
            0% { bottom: -10px; opacity: 0; transform: scale(0.5); }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            100% { bottom: 100%; opacity: 0; transform: scale(1.2); }
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
            z-index: 5;
            position: relative;
        }

        /* Ikon Trophy */
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

        /* Teks Judul yang Berjalan */
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

        /* Angka Jackpot */
        .jackpot-value-final {
            font-family: 'Aldrich', sans-serif !important;
            color: #fff; 
            font-size: 2.5rem; 
            font-weight: 400; 
            line-height: 1.1;
            letter-spacing: 2px; 
            text-shadow: 0 0 5px #fff, 0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink-dark), 0 0 40px var(--neon-purple); 
            white-space: nowrap;
            animation: textGlowSapatoto 1.5s ease-in-out infinite alternate;
            z-index: 5;
            position: relative;
        }

        @keyframes textGlowSapatoto {
            0% { opacity: 0.9; text-shadow: 0 0 5px #fff, 0 0 10px var(--neon-purple), 0 0 20px var(--neon-pink-dark); }
            100% { opacity: 1; text-shadow: 0 0 8px #fff, 0 0 15px var(--neon-pink), 0 0 30px var(--neon-purple), 0 0 50px var(--neon-pink-dark); }
        }

        /* Responsive Desktop */
        @media (min-width: 992px) {
            .jackpot-value-final { font-size: 3.8rem; letter-spacing: 5px; }
            .jackpot-main-title { font-size: 1.4rem; }
            .jackpot-main-title i { font-size: 1.6rem; }
        }

        /* Responsive Mobile / HP */
        @media (max-width: 768px) {
            #jackpot-outer-wrapper { padding: 0 !important; }
            .jackpot-inner-spacing { padding: 0 15px !important; } 
            .jackpot-value-final { font-size: 7.5vw; letter-spacing: 0.5vw; }
            .jackpot-main-title { font-size: 1rem; }
            .jackpot-main-title i { font-size: 1.1rem; }
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

    // --- 3. FUNGSI UNTUK MENYISIPKAN HTML & AUTO-SYNC ---
    function injectJackpotHTMLFinal() {
        const targetElement = document.getElementById('row-togel');
        
        if (document.getElementById('jackpot-outer-wrapper')) {
            return;
        }

        if (!targetElement) {
            setTimeout(injectJackpotHTMLFinal, 200);
            return;
        }

        const jackpotHTMLFinal = `
            <div id="jackpot-outer-wrapper">
                <div class="jackpot-inner-spacing">
                    <div class="jackpot-animated-border">
                        <div class="jackpot-display-box-content">
                            <div class="jackpot-shine"></div>
                            <div class="jackpot-spark spark-1"></div>
                            <div class="jackpot-spark spark-2"></div>
                            <div class="jackpot-spark spark-3"></div>
                            <div class="jackpot-spark spark-4"></div>
                            
                            <div class="jackpot-main-title">
                                <i class="bi bi-trophy-fill"></i>
                                <span class="jackpot-animated-text">PROGRESSIVE JACKPOTS</span>
                            </div>
                            <div id="dynamic-jackpot-value-final" class="jackpot-value-final">IDR 32.462.646.763</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        targetElement.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);
        startDynamicJackpotCounterFinal();

        // ==========================================================
        // FUNGSI SENSOR PRESISI (Sama persis dengan Transaksi & Pintas)
        // ==========================================================
        function syncJackpotWidth() {
            var jackpotWidget = document.getElementById('jackpot-outer-wrapper');
            
            if (window.innerWidth <= 768) {
                if (jackpotWidget) {
                    jackpotWidget.style.maxWidth = '100%';
                    jackpotWidget.style.paddingLeft = '0px';
                    jackpotWidget.style.paddingRight = '0px';
                }
                return;
            }

            var referenceElement = document.querySelector('#row-togel'); 
            if (jackpotWidget && referenceElement && referenceElement.parentElement) {
                var mainContainer = referenceElement.parentElement; 
                var exactWidth = mainContainer.getBoundingClientRect().width;
                var computedStyle = window.getComputedStyle(mainContainer);
                
                if (exactWidth > 0) {
                    jackpotWidget.style.maxWidth = exactWidth + 'px';
                    jackpotWidget.style.paddingLeft = computedStyle.paddingLeft;
                    jackpotWidget.style.paddingRight = computedStyle.paddingRight;
                }
            }
        }

        // Jalankan sinkronisasi lebar
        setTimeout(syncJackpotWidth, 50);
        setInterval(syncJackpotWidth, 1000); 
        window.addEventListener('resize', syncJackpotWidth);
    }

    // --- 4. EKSEKUSI ---
    document.addEventListener('DOMContentLoaded', injectJackpotHTMLFinal);
})();
