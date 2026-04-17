(function() {
    // 1. IIFE: Mengisolasi variabel agar tidak bentrok dengan script bawaan website
    
    // 2. DOMContentLoaded: Menunggu kerangka website selesai dimuat
    document.addEventListener("DOMContentLoaded", function() {
        
        const popupImage = document.querySelector('img[alt="popup image"]');
        
        if (popupImage) {
            // Mencari wadah terluar
            let modalContainer = popupImage.closest('.modal') || popupImage.closest('.modal-content');
            
            if (modalContainer) {
                // Menghapus wadah popup
                modalContainer.remove();
                
                // Menghapus sisa background gelap jika ada
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
                
                // Memulihkan fungsi scroll halaman
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        }
    });
})();