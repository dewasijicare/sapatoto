(function() {
    // Fungsi Check & Inject
    function injectPintasWidget() {
        // PERUBAHAN TARGET: Mencari elemen Running Text (#announcement)
        var target = document.querySelector('#announcement'); 
        var existingWidget = document.getElementById('pintas-widget-wrapper');

        // Jika running text ketemu dan widget belum ada
        if (target && !existingWidget) {
            
            var widgetHTML = `
                <div id="pintas-widget-wrapper">
                    <a href="https://pintasdomain.com" target="_blank" style="text-decoration: none; display: block;">
                        
                        <div class="sapatoto-pintas-banner">
                            
                            <div class="pintas-icon-container">
                                <span class="rocket-move">🚀</span>
                            </div>

                            <div class="pintas-content">
                                <div class="pintas-sub"><i class="bi bi-shield-exclamation"></i> SUSAH AKSES / TERBLOKIR?</div>
                                <div class="pintas-title">
                                    Gunakan <span class="highlight-neon">PintasDomain.com</span>
                                </div>
                            </div>

                        </div>
                    </a>
                </div>

                <style>
                    /* 1. KUNCI PRESISI: Menyamakan rumus dengan Progressive Jackpot */
                    #pintas-widget-wrapper {
                        width: 100% !important;
                        max-width: 100% !important; /* Dibiarkan loss mengikuti container */
                        margin: 15px 0 25px 0 !important; /* Margin atas 15px, Kiri-Kanan 0, Bawah 25px */
                        padding: 0 8px !important; /* KUNCI: Padding 8px menyesuaikan gutter Togel & Jackpot */
                        box-sizing: border-box !important;
                    }

                    /* 2. Container Style (Match Sapatoto Card/Glassmorphism) */
                    .sapatoto-pintas-banner {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(145deg, #2c3e50, #1a252f);
                        border: 1px solid #ec4899;
                        box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
                        border-radius: 12px; /* Disamakan dengan radius kotak Progressive Jackpot */
                        padding: 12px 20px;
                        position: relative;
                        overflow: hidden;
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                        font-family: 'Exo 2', sans-serif; 
                        width: 100%;
                        box-sizing: border-box;
                    }

                    /* Efek Hover Khas Sapatoto */
                    .sapatoto-pintas-banner:hover {
                        transform: translateY(-5px) scale(1.01);
                        box-shadow: 0 5px 25px rgba(236, 72, 153, 0.8);
                        border-color: #f472b6;
                    }

                    /* 3. Icon Roket (Emoji Bawaan) */
                    .pintas-icon-container {
                        font-size: 2.2rem;
                        margin-right: 18px;
                        flex-shrink: 0;
                        line-height: 1;
                        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); 
                    }
                    .rocket-move {
                        display: inline-block;
                        animation: blastOff 2s infinite ease-in-out;
                    }

                    /* 4. Typography */
                    .pintas-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        line-height: 1.3;
                        text-align: left;
                    }
                    .pintas-sub {
                        font-size: 0.75rem;
                        color: #fbbf24; /* Kuning Emas agar hidup */
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        text-shadow: 0 0 5px rgba(251, 191, 36, 0.4);
                    }
                    .pintas-sub i {
                        color: #fbbf24; 
                        margin-right: 5px;
                    }
                    .pintas-title {
                        font-size: 1.25rem;
                        color: #ecf0f1;
                        font-weight: 900;
                        text-transform: uppercase;
                        text-shadow: 0 0 8px rgba(236, 72, 153, 0.6);
                    }
                    
                    /* Efek Teks Animasi Gradien untuk link utama */
                    .highlight-neon {
                        background: linear-gradient(45deg, #be185d, #ec4899, #a855f7, #ec4899);
                        background-size: 300% 300%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 900;
                        animation: neonGradientFlow 3s ease infinite;
                    }

                    /* ANIMASI ROKET ASLI */
                    @keyframes blastOff {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(3px, -3px) rotate(5deg); }
                    }

                    /* ANIMASI TEKS GRADIEN */
                    @keyframes neonGradientFlow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    
                    /* Responsivitas untuk mobile */
                    @media (max-width: 768px) {
                        #pintas-widget-wrapper {
                            padding: 0 8px !important; /* Memastikan mobile tetap 8px persis spt Jackpot */
                        }
                        .pintas-title { font-size: 1rem; }
                        .pintas-sub { font-size: 0.65rem; }
                        .pintas-icon-container { font-size: 1.8rem; margin-right: 12px; }
                        .sapatoto-pintas-banner { padding: 10px 15px; }
                    }
                </style>
            `;

            target.insertAdjacentHTML('afterend', widgetHTML);
            return true;
        }
        return false;
    }

    // Eksekusi
    if (!injectPintasWidget()) {
        document.addEventListener('DOMContentLoaded', function() {
            if (!injectPintasWidget()) {
                var attempts = 0;
                var interval = setInterval(function() {
                    attempts++;
                    if (injectPintasWidget() || attempts >= 5) clearInterval(interval);
                }, 1000);
            }
        });
    }
})();
