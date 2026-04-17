(function() {
    // 1. SUNTIKAN CSS PAKSA
    // Menyuntikkan aturan CSS mutlak untuk menyembunyikan modal yang mengandung gambar tersebut.
    // Ini memastikan wadah popup tidak akan pernah terlihat meskipun sistem mencoba memunculkannya.
    const style = document.createElement('style');
    style.innerHTML = `
        /* Sembunyikan wadah modal HANYA JIKA di dalamnya ada gambar popup ini */
        .modal:has(img[alt="popup image"]),
        .modal-content:has(img[alt="popup image"]) {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }
        /* Paksa halaman agar selalu bisa di-scroll */
        body {
            overflow: auto !important;
            padding-right: 0 !important;
        }
    `;
    // Pasang CSS ke dalam halaman
    document.head.appendChild(style);


    // 2. RADAR PENGHANCUR BACKDROP (MutationObserver)
    // Karena latar gelap (backdrop) dibuat terpisah oleh Bootstrap, 
    // kita buat radar yang mengawasi HTML. Jika backdrop muncul, langsung hancurkan.
    const observer = new MutationObserver(function(mutations) {
        // Cek apakah gambar popup event ini ada di halaman
        const popupImage = document.querySelector('img[alt="popup image"]');
        
        if (popupImage) {
            // Jika popup-nya terdeteksi, cari dan hancurkan SEMUA latar gelap
            document.querySelectorAll('.modal-backdrop').forEach(function(bg) {
                bg.remove();
            });
            
            // Buka paksa kunci scroll bawaan Bootstrap
            document.body.classList.remove('modal-open');
        }
    });

    // Nyalakan radar untuk mengawasi seluruh aktivitas di dalam <body>
    function startObserver() {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        } else {
            // Jika body belum siap, tunggu sebentar
            requestAnimationFrame(startObserver);
        }
    }
    
    startObserver();
})();
