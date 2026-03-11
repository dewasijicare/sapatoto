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

    let checkAttempts = 0;

    // ========================================================================
    // 2. FUNGSI INJEKSI YANG LEBIH AMAN
    // ========================================================================
    function injectCustomSlider() {
        checkAttempts++;
        // Hentikan jika sudah mencoba 50 kali (sekitar 10 detik) agar tidak looping selamanya jika ada error
        if (checkAttempts > 50) return;

        // Pastikan jQuery dan OwlCarousel sudah ter-load dengan sempurna di website
        if (typeof window.jQuery === 'undefined' || typeof window.jQuery.fn.owlCarousel === 'undefined') {
            setTimeout(injectCustomSlider, 200);
            return;
        }

        const $ = window.jQuery;
        const $oldSlider = $('#slider');
        
        // JIKA SLIDER ASLI BELUM MUNCUL, TUNGGU DAN CARI LAGI
        if ($oldSlider.length === 0) {
            setTimeout(injectCustomSlider, 200);
            return;
        }

        // Pastikan kita tidak meng-inject slider berkali-kali
        if ($oldSlider.data('custom-injected')) return;
        $oldSlider.data('custom-injected', true);

        // 1. Sembunyikan slider lama secara paksa
        $oldSlider.attr('style', 'display: none !important;');

        // 2. Buat wadah slider baru (Gunakan ID yang berbeda agar tidak bentrok dengan script bawaan)
        const $newSlider = $('<div class="owl-carousel owl-theme" id="sapatoto-custom-slider" style="width: 100%; aspect-ratio: 1166/600; display: block; overflow: hidden; border-radius: 8px;"></div>');

        // 3. Masukkan daftar gambar webp ke dalam slider baru
        bannerUrls.forEach((url, index) => {
            const itemHtml = `
                <div class="item" style="width: 100%; height: 100%;">
                    <a href="javascript:void(0);">
                        <img src="${url}" alt="Banner Promo ${index + 1}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </a>
                </div>
            `;
            $newSlider.append(itemHtml);
        });

        // 4. Letakkan slider baru ini persis SEBELUM slider lama
        $oldSlider.before($newSlider);

        // 5. Aktifkan Owl Carousel untuk slider baru
        $newSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000, 
            autoplayHoverPause: true,
            nav: false,
            dots: false,
            margin: 10
        });
    }

    // Jalankan skrip
    injectCustomSlider();
})();
