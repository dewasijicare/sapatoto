(function() {
    // --- BLOK CSS KHUSUS PASARAN TOGEL ---
    const togelGridStyles = `
        /* Peringatan Waktu Tutup (Diubah ke Kuning Sapatoto #ffdd00) */
        .togel-countdown-timer.show-warning-text { position: relative; font-size: 0 !important; -webkit-user-select: none; -ms-user-select: none; user-select: none; }
        .togel-countdown-timer.show-warning-text::before { content: "SEGERA TUTUP"; position: absolute; inset: 0; color: #ffdd00 !important; text-shadow: 0 0 5px #ffdd00; font-weight: bold; white-space: nowrap; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; transform: translateY(-5px); }
        .togel-countdown-timer.closing-soon { color: #ffdd00 !important; text-shadow: 0 0 5px #ffdd00; font-weight: bold; }
        .togel-countdown-timer.is-closed { color: #e74c3c !important; text-shadow: 0 0 5px rgba(192, 57, 43, 0.7); font-weight: bold; }
        
        /* Container & Tombol Show More (Border Radius stage-outer diubah ke 8px) */
        #carousel-togel .owl-stage-outer { max-height: 495px; overflow: hidden; transition: max-height 0.5s ease-in-out; border-radius: 0 0 8px 8px; }
        @media (min-width: 768px) { #carousel-togel .owl-stage-outer { max-height: 315px; } }
        #carousel-togel.show-all .owl-stage-outer { max-height: 2500px; }
        .show-more-wrapper { display: flex; justify-content: center; }
        .show-more-button { background: none !important; border: none !important; box-shadow: none !important; color: #f472b6 !important; text-align: center; margin-top: 15px !important; padding: 5px !important; cursor: pointer; font-weight: 700; text-transform: uppercase; transition: all .3s ease; }
        .show-more-button:hover { color: #fff !important; text-shadow: 0 0 10px #f472b6; }
        
        /* Grid Layout Override */
        #carousel-togel .owl-stage{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:15px;transform:none!important;width:100%!important}
        #carousel-togel .owl-item{width:auto!important;margin-right:0!important}
        
        /* Desain Card Pasaran (Border Radius diubah ke 8px) */
        #carousel-togel .card,.row.g-3 .card{background:linear-gradient(160deg,#2c3e50,#1a252f)!important;border:1px solid #ec4899!important;border-radius:8px!important;box-shadow:0 0 15px rgba(236, 72, 153, .5)!important;transition:transform .3s ease,box-shadow .3s ease;width:100%!important;font-family:'Exo 2',sans-serif!important}
        #carousel-togel .card:hover,.row.g-3 .card:hover{transform:translateY(-5px) scale(1.03);box-shadow:0 5px 25px rgba(236, 72, 153, .7)!important}
        
        /* Animasi Muncul Card */
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        #carousel-togel .card,.row.g-3 .card{animation:fadeIn .6s ease-out forwards}
        
        /* Text di dalam Card */
        #carousel-togel .card-body > .text-center > div:first-child,.row.g-3 .card-body > .text-center > div:first-child{color:#bdc3c7;font-size:.8em!important}
        #carousel-togel .card h2,.row.g-3 .card h2{background:0 0!important;margin:8px 0!important;font-size:2.2em!important}
        #carousel-togel .card h2 a,.row.g-3 .card h2 a{color:#fff!important;text-shadow:0 0 6px #fff,0 0 18px rgba(236,240,241,.7);letter-spacing:2px}
        #carousel-togel .card .togel-countdown-timer,.row.g-3 .card .togel-countdown-timer{color:#f472b6;opacity:.8}
    `;

    // Inject CSS ke dalam <head>
    const styleElement = document.createElement('style');
    styleElement.innerHTML = togelGridStyles;
    document.head.appendChild(styleElement);

    // --- FUNGSI JAVASCRIPT ---
    let intervalsInitialized = false;

    // Fungsi 1: Timer Hitung Mundur & Logika Status (Tutup/Blinking)
    function setupPersistentCountdownIntervals() { 
        if (intervalsInitialized) return; 
        
        setInterval(() => { 
            document.querySelectorAll('#carousel-togel .togel-countdown-timer').forEach(timer => { 
                const now = new Date().getTime(); 
                const closingTime = parseInt(timer.dataset.time, 10); 
                const status = parseInt(timer.dataset.status, 10); 
                
                if (status !== 1 || !closingTime || isNaN(closingTime) || (closingTime - now) <= 0) { 
                    timer.classList.remove('show-warning-text', 'closing-soon'); 
                    if (!timer.classList.contains('is-closed')) { 
                        timer.textContent = "TUTUP"; 
                        timer.classList.add('is-closed'); 
                    } 
                    return; 
                } 
                
                const diff = closingTime - now; 
                if (diff < 1800000) { // Kurang dari 30 menit
                    timer.classList.add('closing-soon'); 
                    let blinkCounter = parseInt(timer.dataset.blinkCounter || '0', 10); 
                    if (blinkCounter < 5) { 
                        timer.classList.add('show-warning-text'); 
                    } else { 
                        timer.classList.remove('show-warning-text'); 
                    } 
                    timer.dataset.blinkCounter = (blinkCounter + 1) % 10; 
                } else { 
                    timer.classList.remove('closing-soon', 'show-warning-text'); 
                    if (timer.dataset.blinkCounter) { 
                        delete timer.dataset.blinkCounter; 
                    } 
                } 
            }); 
        }, 1000); 
        intervalsInitialized = true; 
    }

    // Fungsi 2: Mengubah Carousel Bawaan Menjadi Grid Kustom
    function initializeTogelCarousel() { 
        const carousel = document.querySelector('#carousel-togel'); 
        if (!carousel || carousel.dataset.initialized === 'true') return; 
        
        setTimeout(() => { 
            const stage = carousel.querySelector('.owl-stage'); 
            if (!stage || carousel.dataset.initialized === 'true') return; 
            
            const items = Array.from(stage.querySelectorAll('.owl-item:not(.cloned)')); 
            if (items.length <= 1) return; 
            
            // Urutkan Pasaran Togel berdasarkan Waktu Tutup Terdekat
            const sortedItems = items.map(item => { 
                const timer = item.querySelector('.togel-countdown-timer'); 
                const time = timer ? parseInt(timer.dataset.time, 10) : Infinity; 
                const status = timer ? parseInt(timer.dataset.status, 10) : -1; 
                const isClosed = (timer && timer.textContent.trim().toUpperCase() === 'TUTUP') || status !== 1; 
                return { element: item, time: isClosed ? Infinity : time }; 
            }).sort((a, b) => a.time - b.time); 
            
            stage.innerHTML = ''; 
            sortedItems.forEach(item => stage.appendChild(item.element)); 
            
            // Tambahkan Tombol "Tampilkan Semua Pasaran"
            const existingButton = carousel.parentElement.querySelector(".show-more-wrapper"); 
            if (existingButton) existingButton.remove(); 
            
            const showMoreWrapper = document.createElement("div"); 
            showMoreWrapper.className = "show-more-wrapper"; 
            
            const showMoreButton = document.createElement("button"); 
            showMoreButton.className = "show-more-button"; 
            showMoreButton.innerHTML = 'Tampilkan Semua Pasaran <i class="bi bi-chevron-down"></i>'; 
            showMoreWrapper.appendChild(showMoreButton); 
            carousel.parentElement.insertBefore(showMoreWrapper, carousel.nextSibling); 
            
            showMoreButton.addEventListener("click", () => { 
                const isShowingAll = carousel.classList.toggle("show-all"); 
                showMoreButton.innerHTML = isShowingAll ? 'Tutup <i class="bi bi-chevron-up"></i>' : 'Tampilkan Semua Pasaran <i class="bi bi-chevron-down"></i>'; 
            }); 
            
            carousel.dataset.initialized = 'true'; 
        }, 700); 
    }

    // --- INISIALISASI ---
    document.addEventListener('DOMContentLoaded', () => {
        setupPersistentCountdownIntervals();
        // Pakai interval pendek agar jika page dimuat secara dinamis, grid tetap tereksekusi
        setInterval(initializeTogelCarousel, 250); 
        initializeTogelCarousel();
    });


})();
