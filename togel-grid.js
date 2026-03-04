(function() {
    // =========================================
    // BAGIAN 1: CSS TAMPILAN KEREN (FIX TINGGI KOTAK & TEKS PANJANG)
    // =========================================
    const togelGridStyles = `
        /* --- 1. Kustomisasi Container Utama --- */
        #carousel-togel .owl-stage-outer {
            max-height: 520px; 
            overflow: hidden !important; 
            transition: max-height 0.5s ease-in-out;
            border-radius: 0 0 8px 8px;
            padding: 5px; 
        }
        @media (min-width: 768px) { #carousel-togel .owl-stage-outer { max-height: 335px; } }
        #carousel-togel.show-all .owl-stage-outer { max-height: 3000px; }
        
        /* Tombol Show More */
        .show-more-wrapper { 
            display: flex; justify-content: center; 
            margin-top: 15px; margin-bottom: 25px; 
            position: relative; z-index: 10;
        }
        .show-more-button { background: none !important; border: 1px solid #f472b6 !important; border-radius: 20px; padding: 6px 15px !important; color: #f472b6 !important; text-align: center; cursor: pointer; font-weight: 600; text-transform: uppercase; transition: all .3s ease; font-size: 0.8rem; letter-spacing: 1px;}
        .show-more-button:hover { background: #f472b6 !important; color: #fff !important; box-shadow: 0 0 10px #f472b6; }

        /* Grid Setup (DIPERBAIKI AGAR TINGGI SAMA RATA) */
        #carousel-togel .owl-stage { 
            display: grid !important; 
            grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); 
            grid-auto-rows: 1fr; /* Memaksa semua baris punya ukuran seragam */
            gap: 15px; transform: none !important; width: 100% !important; margin-top: 5px; 
            align-items: stretch; /* Memaksa item merentang sama tinggi */
        }
        #carousel-togel .owl-item { 
            width: auto !important; margin-right: 0 !important;
            display: flex; /* Flex agar card di dalamnya bisa ditarik memanjang */
            height: auto !important;
        }

        /* --- 2. Desain BOX Keren (Glassmorphism + Flexbox) --- */
        #carousel-togel .card, .row.g-3 .card {
            background: linear-gradient(145deg, rgba(44, 62, 80, 0.9), rgba(26, 37, 47, 0.95)) !important;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(236, 72, 153, 0.4) !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease;
            width: 100%!important;
            font-family: 'Exo 2', sans-serif !important;
            position: relative;
            overflow: hidden; 
            flex: 1; /* Memaksa kotak mengisi ruang vertikal secara penuh */
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Membagi jarak rata atas, tengah, bawah */
        }
        
        #carousel-togel .card-body {
            display: flex; flex-direction: column; justify-content: center;
            padding: 12px 8px !important; /* Padding disesuaikan */
        }

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

        /* --- 4. Tipografi & Detail (FIX NAMA PANJANG) --- */
        /* Container Nama Pasaran */
        #carousel-togel .card-body > .text-center > div:first-child, .row.g-3 .card-body > .text-center > div:first-child {
            color: #bdc3c7; font-size: 0.75em !important; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; 
            display: flex; align-items: center; justify-content: center;
            width: 100%; margin-bottom: 5px;
        }
        
        /* Teks Nama Pasaran (Otomatis dipotong dengan ... jika terlalu panjang) */
        .market-name-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            max-width: 85%; /* Sisa ruang untuk dot status */
        }

        /* Indikator Dot */
        .status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; flex-shrink: 0; }
        .status-dot.active { background: #2ecc71; box-shadow: 0 0 5px #2ecc71; } 
        .status-dot.closing { background: #ffdd00; animation: pulse-yellow 1.5s infinite; } 
        .status-dot.closed { background: #e74c3c; opacity: 0.7; } 
        @keyframes pulse-yellow {
            0% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0.5); }
            70% { box-shadow: 0 0 0 4px rgba(255, 221, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0); }
        }

        /* Angka Result */
        #carousel-togel .card h2, .row.g-3 .card h2 { background: 0 0 !important; margin: 8px 0 !important; font-size: 2.1em !important; font-weight: 700; }
        #carousel-togel .card h2 a, .row.g-3 .card h2 a {
            background: linear-gradient(to bottom, #ffffff 20%, #c0c0c0 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: 0 1px 5px rgba(0,0,0,0.5); letter-spacing: 2px; text-decoration: none;
        }

        /* Timer Countdown */
        #carousel-togel .card .togel-countdown-timer, .row.g-3 .card .togel-countdown-timer { 
            color: #f472b6; opacity: 1; font-size: 0.85em; font-weight: 600; 
        }
        .togel-countdown-timer.show-warning-text { position: relative; font-size: 0 !important; }
        .togel-countdown-timer.show-warning-text::before { 
            content: "SEGERA TUTUP"; position: absolute; inset: 0; color: #ffdd00 !important; 
            text-shadow: 0px 1px 3px rgba(0,0,0,0.8); font-weight: 700; white-space: nowrap; font-size: 0.75rem; 
            display: flex; align-items: center; justify-content: center; transform: translateY(-2px); 
        }
        .togel-countdown-timer.closing-soon { color: #ffdd00 !important; text-shadow: 0px 1px 3px rgba(0,0,0,0.8); font-weight: 600; }
        .togel-countdown-timer.is-closed { color: #e74c3c !important; font-weight: bold; opacity: 0.8; }

        /* Animasi Masuk */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        #carousel-togel .card, .row.g-3 .card { animation: fadeInUp 0.5s ease-out forwards; }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = togelGridStyles;
    document.head.appendChild(styleElement);

    // =========================================
    // BAGIAN 2: JAVASCRIPT (LOGIKA, STATUS DOT & WRAPPING TEXT)
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
                
                // Membungkus Teks Nama Pasaran agar bisa dipotong (...) satu baris
                if (titleContainer && !titleContainer.dataset.wrapped) {
                    const originalText = titleContainer.textContent.trim();
                    titleContainer.innerHTML = ''; // Kosongkan
                    
                    dot = document.createElement('span');
                    dot.className = 'status-dot active';
                    
                    const textSpan = document.createElement('span');
                    textSpan.className = 'market-name-text';
                    textSpan.textContent = originalText;
                    textSpan.title = originalText; // Tooltip akan muncul jika nama lengkap di hover
                    
                    titleContainer.appendChild(dot);
                    titleContainer.appendChild(textSpan);
                    titleContainer.dataset.wrapped = 'true';
                }

                // Logika Status Timer
                if (status !== 1 || !closingTime || isNaN(closingTime) || (closingTime - now) <= 0) { 
                    timer.classList.remove('show-warning-text', 'closing-soon'); 
                    if (!timer.classList.contains('is-closed')) { 
                        timer.textContent = "TUTUP"; 
                        timer.classList.add('is-closed'); 
                    }
                    if(dot) dot.className = 'status-dot closed'; 
                    return; 
                } 
                
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
                    timer.classList.remove('closing-soon', 'show-warning-text'); 
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
            const stage = carousel.querySelector('.owl-stage'); 
            if (!stage || carousel.dataset.initialized === 'true') return; 
            
            const items = Array.from(stage.querySelectorAll('.owl-item:not(.cloned)')); 
            if (items.length <= 1) return; 
            
            const sortedItems = items.map(item => { 
                const timer = item.querySelector('.togel-countdown-timer'); 
                const time = timer ? parseInt(timer.dataset.time, 10) : Infinity; 
                const status = timer ? parseInt(timer.dataset.status, 10) : -1; 
                const isClosed = (timer && timer.textContent.trim().toUpperCase() === 'TUTUP') || status !== 1; 
                return { element: item, time: isClosed ? Infinity : time }; 
            }).sort((a, b) => a.time - b.time); 
            
            stage.innerHTML = ''; 
            sortedItems.forEach(item => stage.appendChild(item.element)); 
            
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

    // --- INISIALISASI ---
    document.addEventListener('DOMContentLoaded', () => {
        setInterval(initializeTogelCarousel, 250); 
        initializeTogelCarousel();
    });

})();
