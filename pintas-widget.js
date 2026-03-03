(function() {
    // Fungsi Check & Inject
    function injectPintasWidget() {
        // PERUBAHAN TARGET: Mencari elemen Running Text (#announcement)
        var target = document.querySelector('#announcement'); 
        var existingWidget = document.getElementById('pintas-widget-wrapper');

        // Jika running text ketemu dan widget belum ada
        if (target && !existingWidget) {
            
            var widgetHTML = `
                <div id="pintas-widget-wrapper" style="margin: 15px auto 25px auto; max-width: 1200px; padding: 0 15px;">
                    <a href="https://pintasdomain.com" target="_blank" style="text-decoration: none; display: block;">
                        
                        <div class="sapatoto-pintas-banner">
                            
                            <div class="pintas-icon-container">
                                <i class="bi bi-rocket-takeoff-fill rocket-move"></i>
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
                    /* 1. Container Style (Match Sapatoto Card/Glassmorphism) */
                    .sapatoto-pintas-banner {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(145deg, #2c3e50, #1a252f);
                        border: 1px solid #ec4899;
                        box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
                        border-radius: 15px; /* Sesuai radius card Sapatoto */
                        padding: 12px 20px;
                        position: relative;
                        overflow: hidden;
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                        font-family: 'Exo 2', sans-serif; /* Font default tema sapatoto */
                    }

                    /* Efek Hover Khas Sapatoto */
                    .sapatoto-pintas-banner:hover {
                        transform: translateY(-5px) scale(1.02);
                        box-shadow: 0 5px 25px rgba(236, 72, 153, 0.8);
                        border-color: #f472b6;
                    }

                    /* 2. Icon Roket (Bootstrap Icon) */
                    .pintas-icon-container {
                        font-size: 2.2rem;
                        margin-right: 18px;
                        color: #a855f7; /* Purple Sapatoto */
                        text-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
                        flex-shrink: 0;
                        line-height: 1;
                    }
                    .rocket-move {
                        display: inline-block;
                        animation: sapatotoBlastOff 2s infinite ease-in-out;
                    }

                    /* 3. Typography */
                    .pintas-content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        line-height: 1.3;
                        text-align: left;
                    }
                    .pintas-sub {
                        font-size: 0.75rem;
                        color: #bdc3c7; /* Warna teks pudar khas dark mode */
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }
                    .pintas-sub i {
                        color: #f472b6; /* Akses neon pink di icon sub */
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

                    /* ANIMASI ROKET & GLOW */
                    @keyframes sapatotoBlastOff {
                        0%, 100% { 
                            transform: translateY(0) rotate(0deg) scale(1); 
                        }
                        50% { 
                            transform: translateY(-4px) rotate(10deg) scale(1.1); 
                            color: #f472b6; /* Berubah jadi pink saat naik */
                            text-shadow: 0 0 15px rgba(244, 114, 182, 0.9); 
                        }
                    }

                    /* ANIMASI TEKS GRADIEN */
                    @keyframes neonGradientFlow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    
                    /* Responsivitas untuk mobile */
                    @media (max-width: 768px) {
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