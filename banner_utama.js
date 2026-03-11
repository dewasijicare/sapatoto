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
        // Karena Sapatoto pakai jQuery dan OwlCarousel, kita tunggu sampai library-nya siap diload
        if (typeof $ === 'undefined' || typeof $.fn.owlCarousel === 'undefined') {
            setTimeout(replaceExistingSlider, 100);
            return;
        }

        const $oldSlider = $('#slider');
        
        // Cek apakah banner asli ada, dan pastikan kita belum melakukan injeksi
        if ($oldSlider.length === 0 || $oldSlider.data('custom-injected')) return;

        // Simpan posisi wadah aslinya (div.col-12)
        const $parent = $oldSlider.parent();

        // Hapus slider bawaan website sepenuhnya agar tidak terjadi bentrok script
        $oldSlider.remove();

        // Bangun ulang kerangka slider dengan ID asli bawaan situs
        const $newSlider = $('<div class="owl-carousel owl-theme" id="slider"></div>');
        $newSlider.data('custom-injected', true); // Penanda agar tidak meloop

        // Masukkan daftar gambar webp ke dalam slider baru
        bannerUrls.forEach((url, index) => {
            // Kita gunakan class 'img-fluid' dan 'rounded-3' sesuai HTML bawaan Sapatoto
            // Ditambah style aspect-ratio agar tidak ada layout shift
            const itemHtml = `
                <div class="item">
                    <a href="javascript:void(0);">
                        <img src="${url}" class="img-fluid rounded-3" alt="Banner Sapatoto ${index + 1}" style="width: 100%; aspect-ratio: 1166/600; object-fit: cover;">
                    </a>
                </div>
            `;
            $newSlider.append(itemHtml);
        });

        // Tempelkan slider baru ke posisi asli di dalam wadah HTML
        $parent.prepend($newSlider);

        // Aktifkan kembali Owl Carousel dengan konfigurasi yang rapi
        $newSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000, // Ganti gambar tiap 4 detik
            autoplayHoverPause: true,
            nav: false, // Disembunyikan, mengikuti tema asli Sapatoto
            dots: false, // Disembunyikan, mengikuti tema asli Sapatoto
            margin: 10
        });
    }

    // Eksekusi fungsi saat dokumen sudah siap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceExistingSlider);
    } else {
        replaceExistingSlider();
    }
})();