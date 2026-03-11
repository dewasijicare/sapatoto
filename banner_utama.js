(function() {
    console.log("=== SAPATOTO SLIDER DEBUG: SCRIPT MULAI JALAN ===");

    const bannerUrls = [
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%201.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%202.webp"
        // Saya potong jadi 2 URL dulu untuk mempercepat testing, nanti bisa ditambah lagi
    ];

    // 1. INJECT CSS
    const styleId = "sapatoto-vanilla-slider-css";
    if (!document.getElementById(styleId)) {
        console.log("DEBUG: Menginjeksi CSS...");
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            #slider.hidden-by-inject { display: none !important; }
            #sapatoto-custom-slider {
                position: relative; width: 100%; max-width: 1166px; margin: 0 auto;
                aspect-ratio: 1166 / 600; border-radius: 8px; overflow: hidden;
                box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3); background-color: #1a252f; display: block;
            }
            .sapatoto-slide-track { display: flex; width: 100%; height: 100%; transition: transform 0.6s ease; }
            .sapatoto-slide { min-width: 100%; height: 100%; flex-shrink: 0; }
            .sapatoto-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        `;
        document.head.appendChild(style);
    }

    // 2. FUNGSI BUAT SLIDER
    function createVanillaSlider() {
        console.log("DEBUG: Membuat elemen HTML slider baru...");
        const container = document.createElement('div');
        container.id = 'sapatoto-custom-slider';
        const track = document.createElement('div');
        track.className = 'sapatoto-slide-track';

        bannerUrls.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'sapatoto-slide';
            const img = document.createElement('img');
            img.src = url;
            slide.appendChild(img);
            track.appendChild(slide);
        });
        container.appendChild(track);
        return container;
    }

    // 3. FUNGSI CARI & TEMPEL
    function tryInjectSlider() {
        const oldSlider = document.getElementById('slider');
        
        if (!oldSlider) {
            console.log("DEBUG: Elemen id='slider' BELUM ditemukan di halaman. Menunggu...");
            return false;
        }

        if (!oldSlider.classList.contains('hidden-by-inject')) {
            console.log("DEBUG: Target id='slider' DITEMUKAN! Memulai injeksi...");
            oldSlider.classList.add('hidden-by-inject');
            const newSlider = createVanillaSlider();
            oldSlider.parentNode.insertBefore(newSlider, oldSlider);
            console.log("=== DEBUG SUKSES: SLIDER BERHASIL DI-INJECT! ===");
            return true;
        }
        return false;
    }

    // 4. PEMANTAUAN
    let attempts = 0;
    const injectInterval = setInterval(() => {
        attempts++;
        if (tryInjectSlider()) {
            clearInterval(injectInterval);
        } else if (attempts > 30) {
            console.error("DEBUG ERROR: Sudah mencoba 15 detik tapi id='slider' tidak pernah muncul!");
            clearInterval(injectInterval);
        }
    }, 500);
})();
