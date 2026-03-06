(function() {
    const jackpotStylesSapatoto = `
        @import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Exo+2:wght@700;900&display=swap');
        
        :root { --neon-pink: #f472b6; --neon-pink-dark: #ec4899; --neon-purple: #a855f7; --neon-purple-dark: #9333ea; --dark-bg: #1a252f; }

        /* DINDING PEMISAH MUTLAK (Mencegah Overlap) */
        #sapatoto-jackpot-engine-v2 {
            display: block !important;
            width: 100% !important;
            max-width: 1296px !important; 
            margin: 0 auto 15px auto !important; 
            padding: 0 !important; 
            box-sizing: border-box !important;
            clear: both !important;
            overflow: hidden !important;
            position: relative !important;
            z-index: 10 !important; 
        }

        .jackpot-inner-spacing { padding: 0 8px; width: 100%; box-sizing: border-box; }
        .jackpot-animated-border { position: relative; border-radius: 4px !important; padding: 1px; width: 100%; background: linear-gradient(45deg, var(--neon-pink-dark), var(--neon-purple-dark)); animation: borderPulseSapatoto 2s ease-in-out infinite alternate; box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); }
        @keyframes borderPulseSapatoto { 0% { box-shadow: 0 0 10px rgba(236, 72, 153, 0.5); filter: hue-rotate(0deg); } 100% { box-shadow: 0 0 15px rgba(168, 85, 247, 0.6); filter: hue-rotate(30deg); } }

        .jackpot-display-box-content { display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: var(--dark-bg); border-radius: 3px !important; min-height: 90px; position: relative; padding: 20px 15px; z-index: 2; width: 100%; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); background-image: radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0); background-size: 4px 4px; overflow: hidden; }
        .jackpot-shine { position: absolute; top: 0; left: -150%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%); transform: skewX(-25deg); animation: shineSweeper 5s infinite; z-index: 1; pointer-events: none; }
        @keyframes shineSweeper { 0% { left: -150%; } 15% { left: 200%; } 100% { left: 200%; } }

        .jackpot-spark { position: absolute; width: 4px; height: 4px; border-radius: 50%; opacity: 0; z-index: 1; }
        .spark-1 { left: 5%; animation: floatUp 3.5s infinite linear 0s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-2 { left: 15%; animation: floatUp 4s infinite linear 1.2s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); } .spark-3 { left: 25%; animation: floatUp 4.5s infinite linear 0.5s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-4 { left: 35%; animation: floatUp 3s infinite linear 2s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); } .spark-5 { left: 45%; animation: floatUp 5s infinite linear 0.8s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-6 { left: 55%; animation: floatUp 3.8s infinite linear 1.5s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); } .spark-7 { left: 65%; animation: floatUp 4.2s infinite linear 0.2s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-8 { left: 75%; animation: floatUp 3.6s infinite linear 1.8s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); } .spark-9 { left: 85%; animation: floatUp 4.8s infinite linear 0.9s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-10 { left: 95%; animation: floatUp 3.2s infinite linear 2.5s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); } .spark-11 { left: 50%; animation: floatUp 4.1s infinite linear 3s; background: var(--neon-pink); box-shadow: 0 0 8px var(--neon-pink); } .spark-12 { left: 20%; animation: floatUp 3.9s infinite linear 2.8s; background: var(--neon-purple); box-shadow: 0 0 8px var(--neon-purple); }
        @keyframes floatUp { 0% { bottom: -10px; opacity: 0; transform: scale(0.5); } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { bottom: 100%; opacity: 0; transform: scale(1.5); } }
        
        .jackpot-main-title { color: #fff; font-size: 1.2rem; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; white-space: nowrap; display: flex; align-items: center; justify-content: center; z-index: 5; position: relative; }
        .jackpot-main-title i { font-size: 1.3rem; margin-right: 10px; color: var(--neon-pink); text-shadow: 0 0 10px var(--neon-pink), 0 0 20px var(--neon-purple); animation: iconBlink 2s infinite alternate; }
        @keyframes iconBlink { 0% { opacity: 0.8; transform: scale(0.95); text-shadow: 0 0 5px var(--neon-pink); } 100% { opacity: 1; transform: scale(1.05); text-shadow: 0 0 15px var(--neon-purple), 0 0 25px var(--neon-pink); } }
        .jackpot-animated-text { background: linear-gradient(90deg, #fff, var(--neon-pink), var(--neon-purple), #fff); background-size: 300% 100%; background-clip: text; -webkit-background-clip: text; color: transparent; animation: textFlow 3s linear infinite; }
        @keyframes textFlow { 0% { background-position: 0% 50%; } 100% { background-position: 300% 50%; } }

        .jackpot-value-final { font-family: 'Aldrich', sans-serif !important; color: #fff; font-size: 2.5rem; font-weight: 400; line-height: 1.1; letter-spacing: 2px; text-shadow: 0 0 5px #fff, 0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink-dark), 0 0 40px var(--neon-purple); white-space: nowrap; animation: textGlowSapatoto 1.5s ease-in-out infinite alternate; z-index: 5; position: relative; }
        @keyframes textGlowSapatoto { 0% { opacity: 0.9; text-shadow: 0 0 5px #fff, 0 0 10px var(--neon-purple), 0 0 20px var(--neon-pink-dark); } 100% { opacity: 1; text-shadow: 0 0 8px #fff, 0 0 15px var(--neon-pink), 0 0 30px var(--neon-purple), 0 0 50px var(--neon-pink-dark); } }

        @media (min-width: 992px) { .jackpot-value-final { font-size: 3.8rem; letter-spacing: 5px; } .jackpot-main-title { font-size: 1.4rem; } .jackpot-main-title i { font-size: 1.6rem; } }
        @media (max-width: 768px) { #sapatoto-jackpot-engine-v2 { max-width: 100% !important; padding: 0 !important; } .jackpot-inner-spacing { padding: 0 15px !important; } .jackpot-value-final { font-size: 7.5vw; letter-spacing: 0.5vw; } .jackpot-main-title { font-size: 1rem; } .jackpot-main-title i { font-size: 1.1rem; } }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = jackpotStylesSapatoto;
    document.head.appendChild(styleElement);

    const jackpotHTMLFinal = `
        <div id="sapatoto-jackpot-engine-v2">
            <div class="jackpot-inner-spacing">
                <div class="jackpot-animated-border">
                    <div class="jackpot-display-box-content">
                        <div class="jackpot-shine"></div>
                        <div class="jackpot-spark spark-1"></div><div class="jackpot-spark spark-2"></div><div class="jackpot-spark spark-3"></div><div class="jackpot-spark spark-4"></div><div class="jackpot-spark spark-5"></div><div class="jackpot-spark spark-6"></div><div class="jackpot-spark spark-7"></div><div class="jackpot-spark spark-8"></div><div class="jackpot-spark spark-9"></div><div class="jackpot-spark spark-10"></div><div class="jackpot-spark spark-11"></div><div class="jackpot-spark spark-12"></div>
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

    function startDynamicJackpotCounterFinal() {
        const element = document.getElementById('dynamic-jackpot-value-final');
        if (!element) return;
        let currentValue = 32462646763;
        const maxIncrement = 15;
        const updateInterval = 80;
        const resetThreshold = 32462700000;
        setInterval(() => {
            currentValue += Math.floor(Math.random() * maxIncrement) + 1;
            if (currentValue > resetThreshold) currentValue = 32462646763;
            element.textContent = 'IDR ' + currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }, updateInterval);
    }

    function injectJackpotSafely() {
        if (document.getElementById('sapatoto-jackpot-engine-v2')) return true;
        
        // MENGHAPUS VERSI LAMA AGAR TIDAK MENGGANGGU
        document.querySelectorAll('.jackpot-container-main, #jackpot-outer-wrapper').forEach(el => el.remove());

        // Target utama adalah MENEMPEL DI BAWAH TRANSAKSI V2
        const transactionV2 = document.getElementById('sapatoto-trx-engine-v2');
        const fallbackTarget = document.getElementById('row-togel');

        if (transactionV2) {
            transactionV2.insertAdjacentHTML('afterend', jackpotHTMLFinal);
            startDynamicJackpotCounterFinal();
            return true;
        } else if (fallbackTarget) {
            fallbackTarget.insertAdjacentHTML('beforebegin', jackpotHTMLFinal);
            startDynamicJackpotCounterFinal();
            return true;
        }
        return false;
    }

    const checkInterval = setInterval(() => { if (injectJackpotSafely()) clearInterval(checkInterval); }, 300);
})();
