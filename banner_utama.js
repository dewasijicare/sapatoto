(function() {
    // ========================================================================
    // 1. DAFTAR URL BANNER
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
    // 2. INJECT CSS TEMA
    // ========================================================================
    const styleId = "sapatoto-vanilla-slider-css";
    if (!document.getElementById(styleId)) {
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
                max-width: 1166px; /* Sesuai request ukuran */
                margin: 0 auto;
                aspect-ratio: 1166 / 600;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3); /* Nuansa pink neon Sapatoto */
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
    // 3. BANGUN ELEMEN SLIDER
    // ========================================================================
    function createVanillaSlider() {
        const container = document.createElement('div');
        container.id = 'sapatoto-custom-slider';

        const track = document.createElement('div');
        track.className = 'sapatoto-slide-track';

        // Masukkan semua gambar ke dalam track
        bannerUrls.forEach((url, i) => {
            const slide = document.createElement('div');
            slide.className = 'sapatoto-slide';
            
            const img = document.createElement('img');
            img.src = url;
            // Gambar pertama langsung diload, sisanya lazy load agar web tetap cepat
            img.loading = i === 0 ? 'eager' : 'lazy'; 
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
    // 4. PEMANTAUAN AGRESIF & EKSEKUSI
    // ========================================================================
    function tryInjectSlider() {
        // Cari slider bawaan website
        const oldSlider = document.getElementById('slider');
        
        // Jika ketemu dan belum pernah kita sembunyikan sebelumnya
        if (oldSlider && !oldSlider.classList.contains('hidden-by-inject')) {
            
            // 1. Sembunyikan yang lama
            oldSlider.classList.add('hidden-by-inject');
            
            // 2. Buat yang baru
            const newSlider = createVanillaSlider();
            
            // 3. Sisipkan slider baru kita persis di atas slider lama
            oldSlider.parentNode.insertBefore(newSlider, oldSlider);
            
            return true; // Berhasil
        }
        return false; // Belum ketemu, coba lagi nanti
    }

    // Cek keberadaan #slider setiap setengah detik (500ms)
    // Ini memastikan slider kamu tetap tereksekusi meskipun website memuat elemen agak lambat
    const injectInterval = setInterval(() => {
        const success = tryInjectSlider();
        if (success) {
            clearInterval(injectInterval); // Hentikan pemantauan jika sudah berhasil
        }
    }, 500);

    // Keamanan: Hentikan pemantauan setelah 15 detik agar tidak membebani browser jika ada error lain
    setTimeout(() => {
        clearInterval(injectInterval);
    }, 15000);

})();
