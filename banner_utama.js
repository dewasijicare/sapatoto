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
    // 2. FUNGSI INJEKSI KE SLIDER BAWAAN (OWL CAROUSEL)
    // ========================================================================
    function replaceExistingSlider() {
        if (typeof $ === 'undefined' || typeof $.fn.owlCarousel === 'undefined') {
            setTimeout(replaceExistingSlider, 100);
            return;
        }

        const $oldSlider = $('#main-slider');
        if ($oldSlider.length === 0 || $oldSlider.data('custom-injected')) return;

        const $parent = $oldSlider.parent();
        $oldSlider.remove();

        // 1. Buat Wrapper: Batasi lebar maksimal area slider agar tidak full-width
        const $sliderWrapper = $('<div id="custom-slider-wrapper" style="max-width: 1166px; margin: 0 auto; overflow: hidden;"></div>');

        // 2. Buat elemen slider di dalam wrapper
        const $newSlider = $('<div class="owl-carousel owl-theme" id="custom-main-slider"></div>');
        $newSlider.data('custom-injected', true); 

        // 3. Masukkan gambar ke dalam slider (Lebar gambar cukup 100% dari wrapper)
        bannerUrls.forEach((url, index) => {
            const itemHtml = `
                <div class="item">
                    <a href="javascript:void(0);">
                        <img src="${url}" class="img-fluid" alt="Banner Sapatoto ${index + 1}" style="width: 100%; aspect-ratio: 1166/600; object-fit: cover;">
                    </a>
                </div>
            `;
            $newSlider.append(itemHtml);
        });

        // 4. Tempelkan slider ke dalam wrapper, lalu wrapper ke posisi asli di HTML
        $sliderWrapper.append($newSlider);
        $parent.prepend($sliderWrapper);

        // Aktifkan Owl Carousel
        $newSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000, 
            autoplayHoverPause: true,
            nav: false, 
            dots: false, 
            margin: 0 
        });
    }

    // Eksekusi fungsi saat dokumen sudah siap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceExistingSlider);
    } else {
        replaceExistingSlider();
    }
})();


