(function() {
    // =========================================
    // BAGIAN 1: CSS (FORCE ALIGNMENT & ANTI-WRAP)
    // =========================================
    const togelGridStyles = `
        /* --- Kustomisasi Container Utama --- */
        #carousel-togel .custom-stage-outer { max-height: 520px; overflow: hidden !important; transition: max-height 0.5s ease-in-out; border-radius: 0 0 8px 8px; padding: 5px; }
        @media (min-width: 768px) { #carousel-togel .custom-stage-outer { max-height: 335px; } }
        #carousel-togel.show-all .custom-stage-outer { max-height: 3000px; }
        .show-more-wrapper { display: flex; justify-content: center; margin-top: 15px; margin-bottom: 25px; position: relative; z-index: 10; }
        .show-more-button { background: none !important; border: 1px solid #f472b6 !important; border-radius: 20px; padding: 6px 15px !important; color: #f472b6 !important; text-align: center; cursor: pointer; font-weight: 600; text-transform: uppercase; transition: all .3s ease; font-size: 0.8rem; letter-spacing: 1px;}
        .show-more-button:hover { background: #f472b6 !important; color: #fff !important; box-shadow: 0 0 10px #f472b6; }

        /* --- Grid Setup --- */
        #carousel-togel .custom-stage { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); grid-auto-rows: 1fr; gap: 15px; width: 100% !important; margin-top: 5px; align-items: stretch; }
        #carousel-togel .custom-item { display: flex; height: auto !important; width: 100%; }

        /* --- Desain BOX Keren --- */
        #carousel-togel .card, .row.g-3 .card {
            background: linear-gradient(145deg, rgba(44, 62, 80, 0.95), rgba(26, 37, 47, 0.98)) !important;
            backdrop-filter: blur(5px); border: 1px solid rgba(236, 72, 153, 0.4) !important;
            border-radius: 8px !important; box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease; width: 100%!important; font-family: 'Exo 2', sans-serif !important;
            position: relative; overflow: hidden; flex: 1; display: flex; flex-direction: column; justify-content: space-between; 
        }
        #carousel-togel .card-body { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px 8px !important; position: relative; z-index: 2; }

        /* --- Animasi Shimmer --- */
        #carousel-togel .card::after { content: ''; position: absolute; top: 0; left: -150%; width: 100%; height: 100%; background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%); transform: skewX(-25deg); transition: none; pointer-events: none; z-index: 3; }
        #carousel-togel .card:hover::after { left: 150%; transition: all 0.7s ease-in-out; }
        #carousel-togel .card:hover, .row.g-3 .card:hover { transform: translateY(-4px) scale(1.01); border-color: #ec4899 !important; box-shadow: 0 8px 20px rgba(0,0,0,0.5), 0 0 15px rgba(236, 72, 153, 0.4) !important; }

        /* --- Background Watermark --- */
        .market-bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0.15; mix-blend-mode: overlay; filter: grayscale(30%); z-index: 0; pointer-events: none; transition: all 0.5s ease; }
        #carousel-togel .card:hover .market-bg-image { opacity: 0.35; transform: scale(1.1); }

        /* ========================================================= */
        /* FIX 1: LAMPU STATUS & ANTI-WRAP PASARAN                   */
        /* ========================================================= */
        .title-wrapper-locked {
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
            width: 100% !important; 
            max-width: 100% !important; /* Wajib untuk memicu truncate */
            box-sizing: border-box !important;
            overflow: hidden !important; 
            margin-bottom: 8px !important;
            gap: 6px !important; /* Jarak pas antara lampu dan teks */
        }
        .market-name-text { 
            color: #bdc3c7; 
            font-size: 0.75rem !important; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            font-weight: 700 !important; 
            overflow: hidden !important; 
            text-overflow: ellipsis !important; 
            white-space: nowrap !important; 
            min-width: 0 !important; /* KUNCI ANTI-WRAP flexbox! */
            flex: 0 1 auto !important; /* Biarkan mengecil tapi tidak membesar berlebih */
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }
        .status-dot { 
            display: block !important; 
            width: 8px !important; 
            height: 8px !important; 
            border-radius: 50% !important; 
            flex-shrink: 0 !important; /* Jangan biarkan lampu mengecil */
            margin: 0 !important;
        }
        /* Warna Lampu Indikator */
        .status-dot.active { background: #22c55e !important; box-shadow: 0 0 6px #22c55e !important; } 
        .status-dot.closing { background: #eab308 !important; animation: pulse-yellow 1.5s infinite !important; } 
        .status-dot.closed { background: #ef4444 !important; opacity: 0.8 !important; } 
        @keyframes pulse-yellow { 0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.6); } 70% { box-shadow: 0 0 0 5px rgba(234, 179, 8, 0); } 100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); } }

        /* --- Angka Result --- */
        #carousel-togel .card h2, .row.g-3 .card h2 { background: 0 0 !important; margin: 8px 0 !important; font-size: 2.1em !important; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
        #carousel-togel .card h2 a, .row.g-3 .card h2 a { background: linear-gradient(to bottom, #ffffff 20%, #c0c0c0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 2px; text-decoration: none; }

        /* ========================================================= */
        /* FIX 2: BADGE SEGERA TUTUP CENTER VERTICAL                 */
        /* ========================================================= */
        #carousel-togel .card .togel-countdown-timer, .row.g-3 .card .togel-countdown-timer { 
            background: linear-gradient(45deg, #ec4899, #be185d) !important; 
            color: #ffffff !important; 
            padding: 0 10px !important; 
            border-radius: 50px !important; 
            font-size: 0.8rem !important; 
            font-weight: 700 !important; 
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
            min-width: 125px !important; 
            height: 28px !important; 
            line-height: normal !important; /* Reset agar ::before tidak terpengaruh */
            box-sizing: border-box !important;
            box-shadow: 0 3px 8px rgba(236, 72, 153, 0.4) !important; 
            letter-spacing: 0.5px !important; 
            text-shadow: 0 1px 2px rgba(0,0,0,0.3) !important; 
            position: relative !important; 
            margin: 0 auto !important;
            overflow: hidden !important;
        }
        
        #carousel-togel .card .togel-countdown-timer.show-warning-text, .row.g-3 .card .togel-countdown-timer.show-warning-text { 
            color: transparent !important; text-shadow: none !important; 
        }
        
        /* FIX ALIGNMENT: Gunakan inset: 0 dan line-height: normal */
        #carousel-togel .card .togel-countdown-timer.show-warning-text::before, .row.g-3 .card .togel-countdown-timer.show-warning-text::before { 
            content: "SEGERA TUTUP"; 
            position: absolute !important; 
            inset: 0 !important; /* Menggantikan top/left/right/bottom 0 dan mengunci area secara presisi */
            display: flex !important; 
            align-items: center !important; 
            justify-content: center !important; 
            padding: 0 !important; 
            margin: 0 !important;
            color: #ffffff !important; 
            font-size: 0.75rem !important; 
            text-shadow: 0px 1px 2px rgba(0,0,0,0.5) !important; 
            font-weight: 700 !important; 
            white-space: nowrap !important; 
            line-height: normal !important; /* Membunuh inherited line-height yang bikin tulisan naik */
        }
        
        #carousel-togel .card .togel-countdown-timer.closing-soon, .row.g-3 .card .togel-countdown-timer.closing-soon { background: linear-gradient(45deg, #eab308, #ca8a04) !important; box-shadow: 0 3px 8px rgba(234, 179, 8, 0.4) !important; }
        #carousel-togel .card .togel-countdown-timer.is-closed, .row.g-3 .card .togel-countdown-timer.is-closed { background: linear-gradient(45deg, #ef4444, #b91c1c) !important; box-shadow: 0 3px 8px rgba(239, 68, 68, 0.4) !important; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        #carousel-togel .card, .row.g-3 .card { animation: fadeInUp 0.5s ease-out forwards; }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = togelGridStyles;
    document.head.appendChild(styleElement);

    // =========================================
    // KAMUS GAMBAR BACKGROUND POLA GARIS
    // =========================================
    const marketBackgrounds = {
        'DEFAULT': 'http://googleusercontent.com/image_generation_content/1' 
    };

    // =========================================
    // BAGIAN 2: JAVASCRIPT (LOGIKA)
    // =========================================
    let intervalsInitialized = false;

    // FUNGSI INJEKSI KUAT
    function lockAndFormatMarketTitle(card) {
        const textCenterBox = card.querySelector('.card-body > .text-center');
        if (!textCenterBox) return null;
        
        const firstDiv = textCenterBox.querySelector('div:first-child');
        if (!firstDiv) return null;

        // Cek apakah sudah kita modifikasi
        if (!firstDiv.classList.contains('title-wrapper-locked')) {
            const originalText = firstDiv.textContent.trim();
            
            // Bersihkan div asli dan ubah jadi Flexbox Wrapper
            firstDiv.innerHTML = '';
            firstDiv.className = 'title-wrapper-locked'; 
            
            // 1. Buat Titik Lampu
            const dot = document.createElement('span');
            dot.className = 'status-dot active'; // Default hijau, akan diupdate oleh timer
            
            // 2. Buat Teks Pasaran (Anti Wrap)
            const textSpan = document.createElement('span');
            textSpan.className = 'market-name-text';
            textSpan.textContent = originalText;
            textSpan.title = originalText; // Tooltip saat di-hover jika kepotong (ellipsis)
            
            // Gabungkan
            firstDiv.appendChild(dot);
            firstDiv.appendChild(textSpan);

            // 3. Masukkan Background Image
            if (!card.querySelector('.market-bg-image')) {
                const bgDiv = document.createElement('div');
                bgDiv.className = 'market-bg-image';
                
                let bgUrl = marketBackgrounds['DEFAULT'];
                const nameUpper = originalText.toUpperCase();
                for (const key in marketBackgrounds) {
                    if (key !== 'DEFAULT' && nameUpper.includes(key)) { bgUrl = marketBackgrounds[key]; break; }
                }
                bgDiv.style.backgroundImage = `url('${bgUrl}')`;
                card.insertBefore(bgDiv, card.firstChild);
            }
        }
        
        // Selalu kembalikan elemen lampu titik terbaru untuk diupdate statusnya
        return firstDiv.querySelector('.status-dot');
    }

    function setupPersistentCountdownIntervals() { 
        if (intervalsInitialized) return; 
        setInterval(() => { 
            document.querySelectorAll('#carousel-togel .card, .row.g-3 .card').forEach(card => {
                const timer = card.querySelector('.togel-countdown-timer');
                if (!timer) return;

                const now = new Date().getTime(); 
                const closingTime = parseInt(timer.dataset.time, 10); 
                const status = parseInt(timer.dataset.status, 10); 
                
                // Pastikan format judul dan titik selalu terkunci, dan ambil elemen dot-nya
                let dot = lockAndFormatMarketTitle(card);

                // --- LOGIKA STATUS TIMER & LAMPU TITIK ---
                if (status !== 1 || !closingTime || isNaN(closingTime) || (closingTime - now) <= 0) { 
                    // PASARAN TUTUP (MERAH)
                    timer.classList.remove('show-warning-text', 'closing-soon'); 
                    if (!timer.classList.contains('is-closed')) { timer.textContent = "TUTUP"; timer.classList.add('is-closed'); }
                    if (dot) { dot.className = 'status-dot closed'; } 
                    return; 
                } 
                
                const diff = closingTime - now; 
                if (diff < 1800000) { // Kurang dari 30 Menit (KUNING)
                    timer.classList.add('closing-soon'); 
                    if (dot) { dot.className = 'status-dot closing'; } 
                    
                    let blinkCounter = parseInt(timer.dataset.blinkCounter || '0', 10); 
                    if (blinkCounter < 5) { timer.classList.add('show-warning-text'); } 
                    else { timer.classList.remove('show-warning-text'); } 
                    timer.dataset.blinkCounter = (blinkCounter + 1) % 10; 
                } else { // Waktu Normal Aktif (HIJAU)
                    timer.classList.remove('closing-soon', 'show-warning-text', 'is-closed'); 
                    if (dot) { dot.className = 'status-dot active'; } 
                    if (timer.dataset.blinkCounter) { delete timer.dataset.blinkCounter; } 
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
            
            const allCards = Array.from(carousel.querySelectorAll('.card'));
            const validCards = allCards.filter(card => {
                const parent = card.closest('.owl-item');
                return !parent || !parent.classList.contains('cloned');
            });

            if (validCards.length <= 1) return; 

            const now = new Date().getTime();
            
            // Pengurutan Pasaran
            const sortedCards = validCards.map(card => { 
                const timer = card.querySelector('.togel-countdown-timer'); 
                let timeObj = Infinity;
                
                if (timer) {
                    const timeData = parseInt(timer.dataset.time, 10);
                    const statusData = parseInt(timer.dataset.status, 10);
                    const isTextClosed = timer.textContent.trim().toUpperCase() === 'TUTUP' || timer.classList.contains('is-closed');
                    const isLogicClosed = statusData !== 1 || !timeData || isNaN(timeData) || (timeData - now) <= 0;
                    if (!isTextClosed && !isLogicClosed) { timeObj = timeData; }
                }
                return { element: card, time: timeObj }; 
            }).sort((a, b) => a.time - b.time); 
            
            carousel.innerHTML = ''; 
            
            const customStageOuter = document.createElement('div');
            customStageOuter.className = 'custom-stage-outer';
            
            const customStage = document.createElement('div');
            customStage.className = 'custom-stage';
            
            sortedCards.forEach(item => { 
                lockAndFormatMarketTitle(item.element);
                const wrapper = document.createElement('div');
                wrapper.className = 'custom-item';
                wrapper.appendChild(item.element);
                customStage.appendChild(wrapper);
            }); 
            
            customStageOuter.appendChild(customStage);
            carousel.appendChild(customStageOuter);
            
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
        setInterval(initializeTogelCarousel, 300); 
        initializeTogelCarousel();
    });

})();
