document.addEventListener("DOMContentLoaded", function() {
    
    // --- FITUR ANTI-SPAM ---
    // Cek apakah pengunjung sudah pernah menutup popup ini sebelumnya
    if (sessionStorage.getItem('promoPopupSapatoto_Closed')) {
        return; // Jika sudah, hentikan script dan jangan munculkan popup
    }

    // 1. Membuat elemen background gelap (Backdrop)
    const backdrop = document.createElement('div');
    backdrop.id = 'custom-promo-backdrop';
    Object.assign(backdrop.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Latar belakang gelap
        zIndex: '999999', // Paling depan
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0',
        transition: 'opacity 0.3s ease-in-out'
    });

    // 2. Membuat wadah popup (Modal Container)
    const modal = document.createElement('div');
    Object.assign(modal.style, {
        position: 'relative',
        width: '90%',
        maxWidth: '450px', // Ukuran ideal untuk gambar promo
        transform: 'scale(0.8)', // Efek zoom-in
        transition: 'transform 0.3s ease-in-out'
    });

    // 3. Membuat Link dan Gambar Promo
    const link = document.createElement('a');
    // Ganti URL href di bawah ini dengan link halaman promo yang sesuai
    link.href = '/promotion/detail/2018/sapatoto-event-mahjong-ways-1-2'; 
    link.style.display = 'block';

    const img = document.createElement('img');
    // Menggunakan link gambar CDN yang Anda berikan
    img.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@39d4530be3459c36bde75d0c7b5837fc530646bd/popup-sapatoto.webp';
    img.alt = 'Promo Event Sapatoto';
    Object.assign(img.style, {
        width: '100%',
        height: 'auto',
        display: 'block',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
    });
    link.appendChild(img);

    // 4. Membuat bagian bawah untuk tombol OK
    const footer = document.createElement('div');
    Object.assign(footer.style, {
        backgroundColor: '#1b1b1b', // Warna gelap senada dengan website
        padding: '12px',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        display: 'grid',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
    });

    const btnOk = document.createElement('button');
    btnOk.innerText = 'OK';
    Object.assign(btnOk.style, {
        backgroundColor: '#ec4899', // Warna pink neon khas Sapatoto
        color: '#ffffff',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'background-color 0.2s'
    });
    
    // Efek hover sederhana pada tombol
    btnOk.onmouseover = function() { this.style.backgroundColor = '#d9468c'; }
    btnOk.onmouseout = function() { this.style.backgroundColor = '#ec4899'; }
    
    footer.appendChild(btnOk);

    // 5. Merakit semua elemen
    modal.appendChild(link);
    modal.appendChild(footer);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Mengunci scroll website saat popup aktif
    document.body.style.overflow = 'hidden';

    // 6. Memunculkan popup dengan animasi yang mulus
    setTimeout(() => {
        backdrop.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 150);

    // 7. Fungsi untuk menghapus popup
    function closePopup() {
        backdrop.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        // Simpan data di Session Storage agar tidak muncul lagi
        sessionStorage.setItem('promoPopupSapatoto_Closed', 'true');
        
        // Tunggu animasi selesai sebelum menghapus HTML
        setTimeout(() => {
            backdrop.remove();
            document.body.style.overflow = ''; // Bebaskan scroll
        }, 300);
    }

    // 8. Event Listener untuk menutup popup
    btnOk.addEventListener('click', closePopup);
    
    // Tutup popup juga jika user mengklik area gelap di luar gambar
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closePopup();
        }
    });
});