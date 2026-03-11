(function() {
    console.log("=== SAPATOTO CUSTOM SLIDER: SCRIPT BERHASIL DIMUAT ===");

    // ========================================================================
    // 1. DAFTAR URL BANNER (16 Banner)
    // ========================================================================
    const bannerUrls = [
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%201.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%202.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%203.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%204.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%205.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%206.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%207.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%208.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%209.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2010.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2011.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2012.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2013.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2014.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2015.webp",
        "https://cdn.jsdelivr.net/gh/dewasijicare/sapatoto@main/SLIDE%20BANNER%20SAPATOTO%2016.webp"
    ];

    // ========================================================================
    // 2. INJECT CSS TEMA SLIDER
    // ========================================================================
    const styleId = "sapatoto-vanilla-slider-css";
    if (!document.getElementById(styleId)) {
        console.log("=== SAPATOTO SLIDER: Menginjeksi CSS... ===");
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            /* Sembunyikan slider bawaan tanpa menghapusnya dari DOM */
            #slider.hidden-by-inject {
                display: none !important;
            }
            
            /* CSS Slider Buatan Kita */
            #sapatoto-custom-slider {
                position: relative;
                width: 100%;
                max-width: 1166px;
                margin: 0 auto 20px auto;
                aspect-ratio: 1166 / 600;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3);
                background-color: #1a252f;
                display: block;
            }
            
            .sapatoto-slide-track {
                display: flex;
                width: 100%;
                height: 100%;
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            }
            
            .sapatoto-slide {
                min-width: 100%;
                height: 100%;
                flex-shrink: 0;
            }
            
            .sapatoto-slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    // ========================================================================
    // 3. BANGUN ELEMEN HTML SLIDER
    // ========================================================================
    function createVanillaSlider() {
        console.log("=== SAPATOTO SLIDER: Membuat elemen HTML banner... ===");
        const container = document.createElement('div');
        container.id = 'sapatoto-custom-slider';

        const track = document.createElement('div');
        track.className = 'sapatoto-slide-track';

        bannerUrls.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'sapatoto-slide';
            
            const img = document.createElement('img');
            img.src = url;
            img.loading = i === 0 ? 'eager' : 'lazy'; // Gambar pertama load cepat
            img.alt = `Sapatoto Banner ${i + 1}`;
            
            slide.appendChild(img);
            track.appendChild(slide);
        });

        container.appendChild(track);

        // Logika Auto-Slide Vanilla JS (geser tiap 4 detik)
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % bannerUrls.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 4000);

        return container;
    }

    // ========================================================================
    // 4. PEMANTAUAN AGRESIF & EKSEKUSI (Cari Banner Asli & Timpa)
    // ========================================================================
    function tryInjectSlider() {
        const oldSlider = document.getElementById('slider');
        
        if (!oldSlider) {
            return false; // Belum ketemu, coba lagi nanti
        }

        if (!oldSlider.classList.contains('hidden-by-inject')) {
            console.log("=== SAPATOTO SLIDER: Target id='slider' DITEMUKAN! Memulai injeksi... ===");
            
            // 1. Sembunyikan yang lama
            oldSlider.classList.add('hidden-by-inject');
            
            // 2. Buat yang baru
            const newSlider = createVanillaSlider();
            
            // 3. Sisipkan slider baru kita persis di atas slider lama
            oldSlider.parentNode.insertBefore(newSlider, oldSlider);
            
            console.log("=== SAPATOTO SLIDER: SUKSES DI-INJECT! ===");
            return true; 
        }
        return false; 
    }

    // Cek keberadaan #slider setiap 200ms
    let attempts = 0;
    const maxAttempts = 50; // Maksimal coba 50 kali (10 detik)

    console.log("=== SAPATOTO SLIDER: Memulai pencarian elemen id='slider'... ===");
    const injectInterval = setInterval(() => {
        attempts++;
        const success = tryInjectSlider();
        
        if (success) {
            clearInterval(injectInterval); // Hentikan pemantauan jika sukses
        } else if (attempts >= maxAttempts) {
            console.error("=== SAPATOTO SLIDER ERROR: Elemen id='slider' tidak ditemukan setelah 10 detik! ===");
            clearInterval(injectInterval); // Hentikan agar tidak membebani browser
        }
    }, 200);

})();
