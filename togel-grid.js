(function() {
    // =========================================
    // BAGIAN 1: CSS TAMPILAN KEREN & FIX GRID
    // =========================================
    const togelGridStyles = `
        /* --- 1. Kustomisasi Container Utama (Wadah Baru) --- */
        #carousel-togel .custom-stage-outer {
            max-height: 520px; 
            overflow: hidden !important; 
            transition: max-height 0.5s ease-in-out;
            border-radius: 0 0 8px 8px;
            padding: 5px; 
        }
        @media (min-width: 768px) { #carousel-togel .custom-stage-outer { max-height: 335px; } }
        #carousel-togel.show-all .custom-stage-outer { max-height: 3000px; }
        
        /* Tombol Show More */
        .show-more-wrapper { display: flex; justify-content: center; margin-top: 15px; margin-bottom: 25px; position: relative; z-index: 10; }
        .show-more-button { background: none !important; border: 1px solid #f472b6 !important; border-radius: 20px; padding: 6px 15px !important; color: #f472b6 !important; text-align: center; cursor: pointer; font-weight: 600; text-transform: uppercase; transition: all .3s ease; font-size: 0.8rem; letter-spacing: 1px;}
        .show-more-button:hover { background: #f472b6 !important; color: #fff !important; box-shadow: 0 0 10px #f472b6; }

        /* Grid Setup (Struktur Kustom Anti-Gagal) */
        #carousel-togel .custom-stage { 
            display: grid !important; 
            grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); 
            grid-auto-rows: 1fr; 
            gap: 15px; width: 100% !important; margin-top: 5px; 
            align-items: stretch; 
        }
        #carousel-togel .custom-item { display: flex; height: auto !important; width: 100%; }

        /* --- 2. Desain BOX Keren --- */
        #carousel-togel .card, .row.g-3 .card {
            background: linear-gradient(145deg, rgba(44, 62, 80, 0.9), rgba(26, 37, 47, 0.95)) !important;
            backdrop-filter: blur(5px); border: 1px solid rgba(236, 72, 153, 0.4) !important;
            border-radius: 8px !important; box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease; width: 100%!important; font-family: 'Exo 2', sans-serif !important;
            position: relative; overflow: hidden; flex: 1; display: flex; flex-direction: column; justify-content: space-between; 
        }
        #carousel-togel .card-body { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px 8px !important; }

        /* --- 3. Animasi Hover "Shimmer" --- */
        #carousel-togel .card::after {
            content: ''; position: absolute; top: 0; left: -150%; width: 100%; height: 100%;
            background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
            transform: skewX(-25deg); transition: none; pointer-events: none;
        }
        #carousel-togel .card:hover::after { left: 150%; transition: all 0.7s ease-in-out; }
        #carousel-togel .card:hover, .row.g-3 .card:hover {
            transform: translateY(-4px) scale(1.01); border-color: #ec4899 !important; 
            box-shadow: 0 8px 20px rgba(0,0,0,0.5), 0 0 15px rgba(236, 72, 153, 0.4) !important;
        }

        /* --- 4. Tipografi & Detail --- */
        #carousel-togel .card-body > .text-center > div:first-child, .row.g-3 .card-body > .text-center > div:first-child {
            color: #bdc3c7; font-size: 0.75em !important; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; 
            display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 5px;
        }
        .market-name-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; max-width: 85%; }

        /* Indikator Dot */
        .status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; flex-shrink: 0; }
        .status-dot.active { background: #2ecc71; box-shadow: 0 0 5px #2ecc71; } 
        .status-dot.closing { background: #ffdd00; animation: pulse-yellow 1.5s infinite; } 
        .status-dot.closed { background: #e74c3c; opacity: 0.7; } 
        @keyframes pulse-yellow { 0% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0.5); } 70% { box-shadow: 0 0 0 4px rgba(255, 221, 0, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0); } }

        /* Angka Result */
        #carousel-togel .card h2, .row.g-3 .card h2 { background: 0 0 !important; margin: 8px 0 !important; font-size: 2.1em !important; font-weight: 700; }
        #carousel-togel .card h2 a, .row.g-3 .card h2 a {
            background: linear-gradient(to bottom, #ffffff 20%, #c0c0c0 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: 0 1px 5px rgba(0,0,0,0.5); letter-spacing: 2px; text-decoration: none;
        }

        /* --- 5. TIMER BADGE (KAPSUL WARNA WARNI FIX) --- */
        /* Warna Normal: Pink */
        #carousel-togel .card .togel-countdown-timer, .row.g-3 .card .togel-countdown-timer { 
            background: linear-gradient(45deg, #ec4899, #be185d) !important; 
            color: #ffffff !important; padding: 4px 15px; border-radius: 50px; 
            font-size: 0.8rem; font-weight: 700; display: inline-flex; 
            align-items: center; justify-content: center; min-width: 90px; height: 26px; 
            box-shadow: 0 3px 8px rgba(236, 72, 153, 0.4) !important;
            letter-spacing: 0.5px; text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            position: relative; margin: 0 auto;
        }

        /* Mode Kedip Peringatan (Segera Tutup) */
        #carousel-togel .card .togel-countdown-timer.show-warning-text, 
        .row.g-3 .card .togel-countdown-timer.show-warning-text { 
            color: transparent !important; text-shadow: none !important;
        }
        #carousel-togel .card .togel-countdown-timer.show-warning-text::before, 
        .row.g-3 .card .togel-countdown-timer.show-warning-text::before { 
            content: "SEGERA TUTUP"; position: absolute; inset: 0; color: #ffffff !important; 
            font-size: 0.75rem; display: flex; align-items: center; justify-content: center; 
            text-shadow: 0px 1px 2px rgba(0,0,0,0.5) !important; font-weight: 700; white-space: nowrap; 
        }

        /* Warna Status Segera Tutup: Kuning/Orange Terang */
        #carousel-togel .card .togel-countdown-timer.closing-soon, 
        .row.g-3 .card .togel-countdown-timer.closing-soon { 
            background: linear-gradient(45deg, #f59e0b, #d97706) !important; 
            box-shadow: 0 3px 8px rgba(245, 158, 11, 0.4) !important; 
        }

        /* Warna Status Tutup: Merah Gelap */
        #carousel-togel .card .togel-countdown-timer.is-closed, 
        .row.g-3 .card .togel-countdown-timer.is-closed { 
            background: linear-gradient(45deg, #e74c3c, #c0392b) !important; 
            box-shadow: 0 3px 8px rgba(231, 76, 60, 0.4) !important; 
        }

        /* Animasi Masuk */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        #carousel-togel .card, .row.g-3 .card { animation: fadeInUp 0.5s ease-out forwards; }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = togelGridStyles;
    document.head.appendChild(styleElement);

    // =========================================
    // BAGIAN 2: JAVASCRIPT (LOGIKA PENGURUTAN EKSTREM)
    // =========================================
    let intervalsInitialized = false;

    function setupPersistentCountdownIntervals() { 
        if (intervalsInitialized) return; 
        setInterval(() => { 
            document.querySelectorAll('#carousel-togel .card').forEach(card => {
                const timer = card.querySelector('.togel-countdown-timer');
                if (!timer) return;

                const now = new Date().getTime(); 
                const closingTime = parseInt(timer.dataset.time, 10); 
                const status = parseInt(timer.dataset.status, 10); 
                
                const titleContainer = card.querySelector('.card-body > .text-center > div:first-child');
                let dot = card.querySelector('.status-dot');
                
                if (titleContainer && !titleContainer.dataset.wrapped) {
                    const originalText = titleContainer.textContent.trim();
                    titleContainer.innerHTML = ''; 
                    
                    dot = document.createElement('span');
                    dot.className = 'status-dot active';
                    
                    const textSpan = document.createElement('span');
                    textSpan.className = 'market-name-text';
                    textSpan.textContent = originalText;
                    textSpan.title = originalText; 
                    
                    titleContainer.appendChild(dot);
                    titleContainer.appendChild(textSpan);
                    titleContainer.dataset.wrapped = 'true';
                }

                // Logika Status Tutup (MERAH)
                if (status !== 1 || !closingTime || isNaN(closingTime) || (closingTime - now) <= 0) { 
                    timer.classList.remove('show-warning-text', 'closing-soon'); 
                    if (!timer.classList.contains('is-closed')) { 
                        timer.textContent = "TUTUP"; 
                        timer.classList.add('is-closed'); 
                    }
                    if(dot) dot.className = 'status-dot closed'; 
                    return; 
                } 
                
                // Logika Status Segera Tutup (KUNING KEDIP)
                const diff = closingTime - now; 
                if (diff < 1800000) { 
                    timer.classList.add('closing-soon'); 
                    if(dot) dot.className = 'status-dot closing'; 
                    let blinkCounter = parseInt(timer.dataset.blinkCounter || '0', 10); 
                    if (blinkCounter < 5) { 
                        timer.classList.add('show-warning-text'); 
                    } else { 
                        timer.classList.remove('show-warning-text'); 
                    } 
                    timer.dataset.blinkCounter = (blinkCounter + 1) % 10; 
                } else { 
                    // Logika Status Aktif (PINK)
                    timer.classList.remove('closing-soon', 'show-warning-text', 'is-closed'); 
                    if(dot) dot.className = 'status-dot active'; 
                    if (timer.dataset.blinkCounter) { 
                        delete timer.dataset.blinkCounter; 
                    } 
                } 
            }); 
        }, 1000); 
        intervalsInitialized = true; 
    }

    function initializeTogelCarousel() { 
        const carousel = document.querySelector('#carousel-togel'); 
        if (!carousel || carousel.dataset.initialized === 'true') return; 
        
        setTimeout(() => { 
            if (carousel.dataset.initialized === 'true') return; 
            
            // 1. Ambil SEMUA Card tanpa peduli struktur web aslinya
            const allCards = Array.from(carousel.querySelectorAll('.card'));
            
            // Filter card clone (jika carousel sempat berjalan)
            const validCards = allCards.filter(card => {
                const parent = card.closest('.owl-item');
                return !parent || !parent.classList.contains('cloned');
            });

            if (validCards.length <= 1) return; 

            const now = new Date().getTime();
            
            // 2. Sorting Ekstrem Berdasarkan Waktu Terdekat
            const sortedCards = validCards.map(card => { 
                const timer = card.querySelector('.togel-countdown-timer'); 
                let timeObj = Infinity;
                
                if (timer) {
                    const timeData = parseInt(timer.dataset.time, 10);
                    const statusData = parseInt(timer.dataset.status, 10);
                    
                    const isTextClosed = timer.textContent.trim().toUpperCase() === 'TUTUP' || timer.classList.contains('is-closed');
                    const isLogicClosed = statusData !== 1 || !timeData || isNaN(timeData) || (timeData - now) <= 0;
                    
                    // Jika belum tutup, pakai waktunya untuk diurutkan (terkecil di depan)
                    if (!isTextClosed && !isLogicClosed) {
                        timeObj = timeData; 
                    }
                }
                return { element: card, time: timeObj }; 
            }).sort((a, b) => a.time - b.time); 
            
            // 3. Hancurkan struktur lama dan bangun Custom Grid kita sendiri
            carousel.innerHTML = ''; 
            
            const customStageOuter = document.createElement('div');
            customStageOuter.className = 'custom-stage-outer';
            
            const customStage = document.createElement('div');
            customStage.className = 'custom-stage';
            
            sortedCards.forEach(item => { 
                const wrapper = document.createElement('div');
                wrapper.className = 'custom-item';
                wrapper.appendChild(item.element);
                customStage.appendChild(wrapper);
            }); 
            
            customStageOuter.appendChild(customStage);
            carousel.appendChild(customStageOuter);
            
            // 4. Buat Ulang Tombol Show More
            const existingButton = carousel.parentElement.querySelector(".show-more-wrapper"); 
            if (existingButton) existingButton.remove(); 
            
            const showMoreWrapper = document.createElement("div"); 
            showMoreWrapper.className = "show-more-wrapper"; 
            
            const showMoreButton = document.createElement("button"); 
            showMoreButton.className = "show-more-button"; 
            showMoreButton.innerHTML = 'Tampilkan Semua <i class="bi bi-chevron-down ms-1"></i>'; 
            showMoreWrapper.appendChild(showMoreButton); 
            carousel.parentElement.insertBefore(showMoreWrapper, carousel.nextSibling); 
            
            showMoreButton.addEventListener("click", () => { 
                const isShowingAll = carousel.classList.toggle("show-all"); 
                showMoreButton.innerHTML = isShowingAll ? 'Tutup <i class="bi bi-chevron-up ms-1"></i>' : 'Tampilkan Semua <i class="bi bi-chevron-down ms-1"></i>'; 
            }); 
            
            carousel.dataset.initialized = 'true'; 
            setupPersistentCountdownIntervals();
        }, 700); 
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Cek secara berkala untuk memastikan render berjalan sukses
        setInterval(initializeTogelCarousel, 500); 
        initializeTogelCarousel();
    });

})();
