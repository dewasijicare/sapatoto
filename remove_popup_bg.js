(function() {
    let attempts = 0;
    
    // Gunakan interval untuk menunggu popup muncul
    let autoCloseInterval = setInterval(function() {
        attempts++;

        // 1. Cari gambar popup sebagai penanda
        const popupImage = document.querySelector('img[alt="popup image"]');

        if (popupImage) {
            // 2. Cari wadah modal-content
            const modalContent = popupImage.closest('.modal-content');

            if (modalContent) {
                // 3. Cari tombol OK di dalam popup tersebut
                const closeButton = modalContent.querySelector('button[data-bs-dismiss="modal"]');

                if (closeButton) {
                    // 4. Simulasikan klik pada tombol OK
                    closeButton.click();
                    
                    // Hentikan script karena tugas sudah selesai
                    clearInterval(autoCloseInterval); 
                    return; 
                }
            }
        }

        // Hentikan script setelah 10 detik agar tidak membebani browser
        // (100 percobaan x 100 milidetik = 10.000 ms / 10 detik)
        if (attempts > 100) {
            clearInterval(autoCloseInterval);
        }
    }, 100);
})();
