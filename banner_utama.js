<script>
(function() {
    console.log("=== SAPATOTO CUSTOM SLIDER: SCRIPT MENTAH JALAN (UKURAN FIXED) ===");

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

    const styleId = "sapatoto-vanilla-slider-css";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
            /* Sembunyikan slider bawaan tanpa menghapusnya dari DOM */
            #slider.hidden-by-inject { 
                display: none !important; 
            }
            
            /* CSS Slider Buatan Kita (Disesuaikan proporsinya) */
            #sapatoto-custom-slider {
                position: relative; 
                width: 100%; 
                margin: 0 auto 15px auto;
                border-radius: 8px; 
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(236, 72, 153, 0.3); 
                background-color: transparent; 
                display: block;
                line-height: 0; /* Mencegah celah kosong di bawah gambar */
            }
            .sapatoto-slide-track { 
                display: flex; 
                width: 100%; 
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); 
            }
            .sapatoto-slide { 
                width: 100%; 
                flex-shrink: 0; 
            }
            .sapatoto-slide img { 
                width: 100%; 
                height: auto; /* Membiarkan tinggi gambar menyesuaikan lebar layar */
                display: block; 
            }
        `;
        document.head.appendChild(style);
    }

    function createVanillaSlider() {
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
            
            slide.appendChild(img);
            track.appendChild(slide);
        });

        container.appendChild(track);
        
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % bannerUrls.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 4000);

        return container;
    }

    function tryInjectSlider() {
        const oldSlider = document.getElementById('slider');
        if (!oldSlider) return false;

        if (!oldSlider.classList.contains('hidden-by-inject')) {
            oldSlider.classList.add('hidden-by-inject');
            const newSlider = createVanillaSlider();
            oldSlider.parentNode.insertBefore(newSlider, oldSlider);
            console.log("=== SAPATOTO SLIDER: UKURAN FIXED SUKSES DI-INJECT! ===");
            return true; 
        }
        return false; 
    }

    let attempts = 0;
    const injectInterval = setInterval(() => {
        attempts++;
        if (tryInjectSlider()) {
            clearInterval(injectInterval);
        } else if (attempts >= 50) {
            clearInterval(injectInterval);
        }
    }, 200);

})();
</script>
