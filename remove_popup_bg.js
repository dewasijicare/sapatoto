(function() {
    // Kita gunakan interval untuk mengecek berkali-kali setiap 100 milidetik.
    // Ini berguna untuk 'menangkap' elemen yang munculnya delay karena animasi.
    let attempts = 0;
    
    let clearPopupInterval = setInterval(function() {
        attempts++;

        // 1. Cari gambar spesifik sebagai penanda utama
        const popupImage = document.querySelector('img[alt="popup image"]');
        
        // 2. Cari juga SEMUA backdrop gelap yang ada di halaman
        const backdrops = document.querySelectorAll('.modal-backdrop');

        // Jika gambar ditemukan ATAU ada backdrop yang mengunci layar
        if (popupImage || backdrops.length > 0) {
            
            // Eksekusi penghapusan wadah popup jika gambarnya ada
            if (popupImage) {
                const modal = popupImage.closest('.modal');
                if (modal) modal.remove();
                
                const modalContent = popupImage.closest('.modal-content');
                if (modalContent) modalContent.remove();
            }

            // Eksekusi penghapusan SEMUA backdrop gelap
            backdrops.forEach(function(bg) {
                bg.remove();
            });

            // Buka kembali kunci scroll pada body (wajib agar halaman bisa di-scroll lagi)
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            
            // Jika kita sudah yakin elemen spesifiknya dihapus, kita bisa hentikan intervalnya
            if (popupImage) {
                clearInterval(clearPopupInterval);
            }
        }

        // Hentikan proses pencarian setelah 5 detik (50 attempts x 100ms) 
        // agar script tidak berjalan terus-menerus dan membebani browser.
        if (attempts > 50) {
            clearInterval(clearPopupInterval);
        }
        
    }, 100);
})();
