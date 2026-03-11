(function() {
    // Fungsi Check & Inject
    function injectPintasWidget() {
        
        // Target Injeksi di Bawah Tombol Aksi (Diatas Togel / Jackpot)
        var target = document.querySelector('.jackpot-container-main') || document.querySelector('#row-togel'); 
        var existingWidget = document.getElementById('pintas-widget-wrapper');

        // Jika target area bawah ketemu dan widget belum ada
        if (target && !existingWidget) {
            
            var widgetHTML = `
                <div id="pintas-widget-wrapper">
                    <div class="pintas-inner-spacing">
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
                </div>

                <style>
                    /* ==============================================================
                       BUNGKUSAN LUAR: LEBAR 1296PX DENGAN JARAK PRESISI 15PX
                       ============================================================== */
                    #pintas-widget-wrapper {
                        width: 100%;
                        max-width: 1296px !important; 
                        margin: 0 auto 15px auto !important; /* KUNCI PERBAIKAN: Jarak bawah pas 15px, atas 0px */
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Exo 2', sans-serif;
                    }

                    /* RUMUS PRESISI 8px SEJAJAR FITUR LAIN */
                    .pintas-inner-spacing {
                        padding: 0 8px;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    /* Container Style Widget Pintas */
                    .sapatoto-pintas-banner {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(145deg, #2c3e50, #1a252f);
                        border: 1px solid #ec4899;
                        box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
                        border-radius: 4px !important; /* LENGKUNGAN 4PX */
                        padding: 12px 20px;
                        position: relative;
                        overflow: hidden;
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .sapatoto-pintas-banner:hover {
                        transform: translateY(-5px) scale(1.01);
                        box-shadow: 0 5px 25px rgba(236, 72, 153, 0.8);
                        border-color: #f472b6;
                    }

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

                    /* =======================================================
                       TATA LETAK TEKS: SEBARIS DI PC
                       ======================================================= */
                    .pintas-content {
                        display: flex;
                        flex-direction: row; 
                        flex-wrap: wrap; 
                        align-items: center;
                        justify-content: center;
                        line-height: 1.3;
                        text-align: center;
                    }
                    .pintas-sub {
                        font-size: 1.1rem; 
                        color: #fbbf24; 
                        font-weight: 700;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        text-shadow: 0 0 5px rgba(251, 191, 36, 0.4);
                        margin-right: 12px; 
                    }
                    .pintas-sub i { margin-right: 5px; }
                    .pintas-title {
                        font-size: 1.25rem;
                        color: #ecf0f1;
                        font-weight: 900;
                        text-transform: uppercase;
                        text-shadow: 0 0 8px rgba(236, 72, 153, 0.6);
                        display: flex;
                        align-items: center;
                    }
                    
                    .highlight-neon {
                        background: linear-gradient(45deg, #be185d, #ec4899, #a855f7, #ec4899);
                        background-size: 300% 300%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 900;
                        animation: neonGradientFlow 3s ease infinite;
                        margin-left: 6px;
                    }

                    @keyframes blastOff {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        50% { transform: translate(3px, -3px) rotate(5deg); }
                    }

                    @keyframes neonGradientFlow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    
                    /* =======================================================
                       TATA LETAK TEKS: BERTUMPUK DI HP & LEBAR 100%
                       ======================================================= */
                    @media (max-width: 768px) {
                        #pintas-widget-wrapper { max-width: 100% !important; padding: 0 !important; }
                        .pintas-inner-spacing { padding: 0 !important; }
                        
                        .pintas-content {
                            flex-direction: column; 
                            align-items: flex-start;
                            text-align: left;
                        }
                        
                        .pintas-sub { 
                            font-size: 0.65rem; 
                            margin-right: 0; 
                            margin-bottom: 2px; 
                        }
                        .pintas-title { font-size: 1rem; }
                        .highlight-neon { margin-left: 4px; }
                        
                        .pintas-icon-container { font-size: 1.8rem; margin-right: 12px; }
                        .sapatoto-pintas-banner { padding: 10px 15px; border-radius: 4px !important; }
                    }
                </style>
            `;

            // INJEKSI: Meletakkan widget persis di ATAS area Togel/Jackpot 
            target.insertAdjacentHTML('beforebegin', widgetHTML);

            return true;
        }
        return false;
    }

    // Eksekutor yang memantau terus sampai elemen muncul
    var checkInterval = setInterval(function() {
        if (injectPintasWidget()) {
            clearInterval(checkInterval);
        }
    }, 500);

})();

