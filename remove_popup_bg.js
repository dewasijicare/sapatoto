(function() {
    // 1. SUNTIKAN CSS SUPER SPESIFIK
    const style = document.createElement('style');
    style.innerHTML = `
        /* Sembunyikan bagian dalam popup */
        .modal-content:has(a[href*="sapatoto-event-mahjong-ways-1-2"]) {
            display: none !important;
        }
        
        /* KUNCI UTAMA: Jika wadah luar (.modal) yang berwarna gelap, kita buat transparan dan tembus pandang (bisa di-klik tembus) */
        .modal:has(a[href*="sapatoto-event-mahjong-ways-1-2"]) {
            background-color: transparent !important;
            pointer-events: none !important; /* Agar klik kursor tembus ke website di belakangnya */
            z-index: -1 !important;
        }

        /* Jaga-jaga jika masih ada backdrop bawaan Bootstrap */
        .modal-backdrop {
            display: none !important;
            opacity: 0 !important;
        }

        /* Pastikan halaman bisa di-scroll kembali */
        body {
            overflow: auto !important;
            padding-right: 0 !important;
        }
    `;
    document.head.appendChild(style);

    // 2. SIMULASI KLIK NATIVE (Tembus proteksi framework)
    let attempts = 0;
    let clickInterval = setInterval(function() {
        attempts++;
        
        // Cari tombol OK di dalam struktur link promo tersebut
        const promoLink = document.querySelector('a[href*="sapatoto-event-mahjong-ways-1-2"]');
        
        if (promoLink) {
            const modalContent = promoLink.closest('.modal-content');
            if (modalContent) {
                const btnOk = modalContent.querySelector('button[data-bs-dismiss="modal"]');
                
                if (btnOk) {
                    // Gunakan MouseEvent asli (bukan sekadar .click()) agar framework mendeteksinya sebagai klik sungguhan
                    const clickEvent = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    btnOk.dispatchEvent(clickEvent);
                    
                    clearInterval(clickInterval); // Berhenti mencari jika sudah diklik
                }
            }
        }
        
        // Berhenti setelah 5 detik agar script tidak berjalan terus menerus
        if (attempts > 50) clearInterval(clickInterval); 
    }, 100);
})();
