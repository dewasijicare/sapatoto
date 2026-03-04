(function() {
    // =========================================
    // BAGIAN 1: CSS TAMPILAN KEREN (NEON & SHIMMER)
    // =========================================
    const togelGridStyles = `
        /* --- 1. Kustomisasi Container Utama --- */
        #carousel-togel .owl-stage-outer {
            max-height: 510px; /* Sedikit diperbesar untuk ruang shadow */
            overflow: visible !important; /* Visible agar shadow neon tidak terpotong */
            transition: max-height 0.5s ease-in-out;
            padding: 10px 5px; /* Padding agar shadow tidak mepet */
        }
        @media (min-width: 768px) { #carousel-togel .owl-stage-outer { max-height: 330px; } }
        #carousel-togel.show-all .owl-stage-outer { max-height: 3000px; }
        
        /* Tombol Show More */
        .show-more-wrapper { display: flex; justify-content: center; margin-top: 5px; }
        .show-more-button { background: none !important; border: 1px solid #f472b6 !important; border-radius: 20px; padding: 8px 20px !important; color: #f472b6 !important; text-align: center; cursor: pointer; font-weight: 700; text-transform: uppercase; transition: all .3s ease; font-size: 0.85rem; letter-spacing: 1px;}
        .show-more-button:hover { background: #f472b6 !important; color: #fff !important; box-shadow: 0 0 15px #f472b6; }

        /* Grid Setup */
        #carousel-togel .owl-stage { display:grid!important; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:20px; transform:none!important; width:100%!important; margin-top: 10px; }
        #carousel-togel .owl-item { width:auto!important; margin-right:0!important }

        /* --- 2. Desain BOX Keren (Glassmorphism + Neon) --- */
        #carousel-togel .card, .row.g-3 .card {
            /* Background Gelap Transparan ala Kaca */
            background: linear-gradient(145deg, rgba(44, 62, 80, 0.9), rgba(26, 37, 47, 0.95)) !important;
            backdrop-filter: blur(5px); /* Efek blur di belakang box */
            border: 1px solid rgba(236, 72, 153, 0.5) !important; /* Border pink semi-transparan */
            border-radius: 8px !important;
            /* Box Shadow: Neon Glow Pink di luar + Cahaya putih halus di dalam atas */
            box-shadow: 0 4px 15px rgba(0,0,0,0.3), 
                        0 0 15px rgba(236, 72, 153, 0.2), 
                        inset 0 1px 1px rgba(255,255,255,0.1) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efek membal halus */
            width: 100%!important;
            font-family: 'Exo 2', sans-serif !important;
            position: relative;
            overflow: hidden; /* Penting untuk efek shimmer */
        }

        /* --- 3. Animasi Hover "Shimmer" (Kilatan Cahaya) --- */
        #carousel-togel .card::after {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            /* Gradien cahaya miring */
            background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
            transform: skewX(-25deg); /* Memiringkan cahaya */
            transition: none;
            pointer-events: none;
        }
        #carousel-togel .card:hover::after {
            left: 150%; /* Menggerakkan cahaya dari kiri ke kanan */
            transition: all 0.7s ease-in-out;
        }
        
        /* Hover StateBox */
        #carousel-togel .card:hover, .row.g-3 .card:hover {
            transform: translateY(-7px) scale(1.02);
            border-color: #ec4899 !important; /* Border jadi pink solid saat hover */
            /* Glow menjadi lebih terang dan luas saat hover */
            box-shadow: 0 10px 25px rgba(0,0,0,0.5), 
                        0 0 25px rgba(236, 72, 153, 0.6),
                        inset 0 1px 1px rgba(255,255,255,0.2) !important;
        }

        /* --- 4. Tipografi & Detail --- */
        /* Nama Pasaran (Ditambah Indikator Dot) */
        #carousel-togel .card-body > .text-center > div:first-child, .row.g-3 .card-body > .text-center > div:first-child {
            color: #bdc3c7; font-size: 0.85em !important; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; display: flex; align-items: center; justify-content: center;
        }
        /* Indikator Dot Berdenyut */
        .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; flex-shrink: 0; }
        .status-dot.active { background: #2ecc71; box-shadow: 0 0 8px #2ecc71; } /* Hijau */
        .status-dot.closing { background: #ffdd00; animation: pulse-yellow 1.5s infinite; } /* Kuning Berdenyut */
        .status-dot.closed { background: #e74c3c; opacity: 0.7; } /* Merah */
        @keyframes pulse-yellow {
            0% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0.7); }
            70% { box-shadow: 0 0 0 6px rgba(255, 221, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 221, 0, 0); }
        }

        /* Angka Result (Dibuat Gradient Putih ke Abu agar lebih berdimensi) */
        #carousel-togel .card h2, .row.g-3 .card h2 { background: 0 0 !important; margin: 12px 0 !important; font-size: 2.4em !important; font-weight: 800; }
        #carousel-togel .card h2 a, .row.g-3 .card h2 a {
            background: linear-gradient(to bottom, #ffffff 20%, #c0c0c0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 15px rgba(255,255,255,0.3); /* Glow putih lembut pada angka */
            letter-spacing: 2px; text-decoration: none;
        }

        /* Timer Countdown & Peringatan (Kuning Sapatoto) */
        #carousel-togel .card .togel-countdown-timer, .row.g-3 .card .togel-countdown-timer { color: #f472b6; opacity: 0.9; font-size: 0.9em; font-weight: 600; }
        .togel-countdown-timer.show-warning-text { position: relative; font-size: 0 !important; }
        .togel-countdown-timer.show-warning-text::before { content: "SEGERA TUTUP"; position: absolute; inset: 0; color: #ffdd00 !important; text-shadow: 0 0 8px #ffdd00; font-weight: 800; white-space: nowrap; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; transform: translateY(-2px); }
        .togel-countdown-timer.closing-soon { color: #ffdd00 !important; text-shadow: 0 0 5px #ffdd00; font-weight: bold; }
        .togel-countdown-timer.is-closed { color: #e74c3c !important; font-weight: bold; opacity: 0.8; }

        /* Animasi Masuk */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        #carousel-togel .card, .row.g-3 .card { animation: fadeInUp 0.6s ease-out forwards; }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = togelGridStyles;
    document.head.appendChild(styleElement);

    // =========================================
    // BAGIAN 2: JAVASCRIPT (LOGIKA & STATUS DOT)
    // =========================================
    let intervalsInitialized = false;

    // Fungsi 1: Timer Hitung Mundur & Update Status Dot
    function setupPersistentCountdownIntervals() { 
        if (intervalsInitialized) return; 
        setInterval(() => { 
            document.querySelectorAll('#carousel-togel .card').forEach(card => {
                const timer = card.querySelector('.togel-countdown-timer');
                if (!timer) return;

                const now = new Date().getTime(); 
                const closingTime = parseInt(timer.dataset.time, 10); 
                const status = parseInt(timer.dataset.status, 10); 
                
                // Cari elemen Dot Status
                let dot = card.querySelector('.status-dot');
                if (!dot) {
                    // Jika belum ada dot, buat baru dan masukkan sebelum nama pasaran
                    const titleContainer = card.querySelector('.card-body > .text-center > div:first-child');
                    if (titleContainer) {
                        dot = document.createElement('span');
                        dot.className = 'status-dot active';
                        titleContainer.insertBefore(dot, titleContainer.firstChild);
                    }
                }

                // Logika Status Tutup
                if (status !== 1 || !closingTime || isNaN(closingTime) || (closingTime - now) <= 0) { 
                    timer.classList.remove('show-warning-text', 'closing-soon'); 
                    if (!timer.classList.contains('is-closed')) { 
                        timer.textContent = "TUTUP"; 
                        timer.classList.add('is-closed'); 
                    }
                    if(dot) dot.className = 'status-dot closed'; // Dot Merah
                    return; 
                } 
                
                // Logika Status Segera Tutup (Kurang dari 30 menit)
                const diff = closingTime - now; 
                if (diff < 1800000) { 
                    timer.classList.add('closing-soon'); 
                    if(dot) dot.className = 'status-dot closing'; // Dot Kuning Berdenyut
                    let blinkCounter = parseInt(timer.dataset.blinkCounter || '0', 10); 
                    if (blinkCounter < 5) { 
                        timer.classList.add('show-warning-text'); 
                    } else { 
                        timer.classList.remove('show-warning-text'); 
                    } 
                    timer.dataset.blinkCounter = (blinkCounter + 1) % 10; 
                } else { 
                // Logika Status Aktif Normal
                    timer.classList.remove('closing-soon', 'show-warning-text'); 
                    if(dot) dot.className = 'status-dot active'; // Dot Hijau
                    if (timer.dataset.blinkCounter) { 
                        delete timer.dataset.blinkCounter; 
                    } 
                } 
            }); 
        }, 1000); 
        intervalsInitialized = true; 
    }

    // Fungsi 2: Mengubah Carousel Menjadi Grid & Sorting
    function initializeTogelCarousel() { 
        const carousel = document.querySelector('#carousel-togel'); 
        if (!carousel || carousel.dataset.initialized === 'true') return; 
        
        setTimeout(() => { 
            const stage = carousel.querySelector('.owl-stage'); 
            if (!stage || carousel.dataset.initialized === 'true') return; 
            
            const items = Array.from(stage.querySelectorAll('.owl-item:not(.cloned)')); 
            if (items.length <= 1) return; 
            
            // Urutkan Pasaran Togel
            const sortedItems = items.map(item => { 
                const timer = item.querySelector('.togel-countdown-timer'); 
                const time = timer ? parseInt(timer.dataset.time, 10) : Infinity; 
                const status = timer ? parseInt(timer.dataset.status, 10) : -1; 
                const isClosed = (timer && timer.textContent.trim().toUpperCase() === 'TUTUP') || status !== 1; 
                return { element: item, time: isClosed ? Infinity : time }; 
            }).sort((a, b) => a.time - b.time); 
            
            stage.innerHTML = ''; 
            sortedItems.forEach(item => stage.appendChild(item.element)); 
            
            // Tambahkan Tombol "Tampilkan Semua"
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
            // Panggil setup interval setelah grid terbentuk untuk memastikan dot muncul
            setupPersistentCountdownIntervals();
        }, 700); 
    }

    // --- INISIALISASI ---
    document.addEventListener('DOMContentLoaded', () => {
        setInterval(initializeTogelCarousel, 250); 
        initializeTogelCarousel();
    });

})();
