(function() {
    let attempts = 0;
    
    let tryCloseGracefully = setInterval(function() {
        attempts++;
        
        // 1. Cari gambar dan wadah utamanya
        const popupImage = document.querySelector('img[alt="popup image"]');
        
        if (popupImage) {
            const modalElement = popupImage.closest('.modal');
            
            if (modalElement) {
                // METODE A: Coba tutup menggunakan API Bootstrap Modern (Versi 5)
                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    let modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if (!modalInstance) {
                        modalInstance = new bootstrap.Modal(modalElement);
                    }
                    modalInstance.hide(); // Perintah resmi menutup popup
                    
                    clearInterval(tryCloseGracefully);
                } 
                // METODE B: Coba tutup menggunakan API Bootstrap Lama / jQuery (Versi 3 & 4)
                else if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.modal) {
                    window.jQuery(modalElement).modal('hide'); // Perintah resmi menutup popup via jQuery
                    
                    clearInterval(tryCloseGracefully);
                }
                // METODE C: Jalur Kasar Ekstrem (Memburu semua elemen berbau "gelap" / "overlay")
                else {
                    modalElement.style.display = 'none';
                    
                    // Cari kelas-kelas umum yang sering dipakai untuk background gelap
                    const backdrops = document.querySelectorAll('.modal-backdrop, .overlay, [class*="backdrop"], [class*="overlay"], [style*="z-index: 1040"]');
                    backdrops.forEach(bg => {
                        bg.style.display = 'none';
                        bg.style.opacity = '0';
                        bg.remove();
                    });
                    
                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = 'auto';
                    document.body.style.paddingRight = '0';
                }
            }
        }
        
        // Berhenti mencoba setelah 5 detik (50 x 100ms)
        if (attempts > 50) clearInterval(tryCloseGracefully);
        
    }, 100);
})();
