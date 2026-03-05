(function() {
    // =========================================
    // KONFIGURASI WIDGET JACKPOT TERBESAR
    // =========================================
    const TARGET_SELECTOR = '#row-togel'; // Target elemen (akan diletakkan tepat di atas kotak pasaran togel)
    const WIDGET_ID = 'sapatoto-jackpot-slider';

    // DATABASE GAME POPULER (Bobot menentukan seberapa sering game ini muncul)
    // Semakin besar nilai 'weight', semakin sering muncul.
    const GAME_LIBRARY = [
        { name: "Mahjong Ways", provider: "PG SOFT", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/mahjong-ways.png", weight: 20 },
        { name: "Mahjong Ways 2", provider: "PG SOFT", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/mahjong-ways2.png", weight: 20 },
        { name: "Gates of Olympus", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20olympgate.png", weight: 18 },
        { name: "Gates of Olympus 1000", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20olympx.png", weight: 15 },
        { name: "Gates of Olympus Super Scatter", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20olympssc.png", weight: 12 },
        { name: "Starlight Princess", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20starlight.png", weight: 12 },
        { name: "Starlight Princess 1000", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20starlightx.png", weight: 10 },
        { name: "Sweet Bonanza", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20fruitsw.png", weight: 8 },
        { name: "Sugar Rush 1000", provider: "PRAGMATIC PLAY", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20sugarrushx.png", weight: 6 },
        { name: "Wild Bandito", provider: "PG SOFT", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/wild-bandito.png", weight: 5 },
        { name: "Koi Gate", provider: "HABANERO", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/koigate.png", weight: 4 }
    ];

    // =========================================
    // FUNGSI GENERATOR NATURAL
    // =========================================
    
    // Pilih game berdasarkan bobot
    function getRandomItemWeighted(items) {
        let totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < items.length; i++) {
            if (random < items[i].weight) return items[i];
            random -= items[i].weight;
        }
        return items[0];
    }

    // Format Rupiah
    function formatIDR(angka) {
        return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
    }

    // Generator Nominal Jackpot (20 Juta - 200 Juta) - Makin besar makin langka
    function generateJackpotAmount() {
        const rand = Math.random();
        let min, max;
        
        if (rand < 0.65) { min = 20; max = 45; }        // 65% Peluang: 20 JT - 45 JT
        else if (rand < 0.88) { min = 46; max = 85; }   // 23% Peluang: 46 JT - 85 JT
        else if (rand < 0.97) { min = 86; max = 130; }  // 9% Peluang: 86 JT - 130 JT
        else { min = 131; max = 200; }                  // 3% Peluang: 131 JT - 200 JT (Super Langka)
        
        const millions = Math.floor(Math.random() * (max - min + 1)) + min;
        const thousands = Math.floor(Math.random() * 999);
        const hundreds = Math.floor(Math.random() * 9) * 100; // Ratusan perak acak
        return (millions * 1000000) + (thousands * 1000) + hundreds;
    }

    // Generator Username Tersensor (Mi****9)
    function generateUsername() {
        const prefixes = ['An','Bo','Ci','De','Ed','Fa','Ga','He','In','Je','Ke','Li','Ma','No','Pu','Ri','Sa','Ti','Vi','Wi','Yo','Za'];
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        let post = chars.charAt(Math.floor(Math.random() * chars.length));
        return pre + '****' + post;
    }

    // Generator Tanggal & Jam Acak (Diambil mundur dari 12 jam terakhir)
    function generateDate() {
        const now = new Date();
        const pastTime = new Date(now.getTime() - Math.floor(Math.random() * 12 * 60 * 60 * 1000));
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        return `${day}/${month} ${hours}:${mins}:${secs}`;
    }

    // Buat Kumpulan Data Jackpot
    function generateJackpotData(count = 15) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const game = getRandomItemWeighted(GAME_LIBRARY);
            data.push({
                gameName: game.name,
                provider: game.provider,
                image: game.img,
                amount: generateJackpotAmount(),
                user: generateUsername(),
                date: generateDate()
            });
        }
        // Urutkan dari Terbesar ke Terkecil agar Rank 1 selalu yang paling fantastis
        data.sort((a, b) => b.amount - a.amount);
        data.forEach((item, index) => item.rank = index + 1);
        return data;
    }

    // =========================================
    // FUNGSI RENDER HTML & CSS
    // =========================================
    
    function buildCardHTML(item) {
        // Logika Warna Badge Peringkat (1: Gold, 2: Silver, 3: Bronze, Sisanya Pink Sapatoto)
        let rankBadge = '';
        if(item.rank === 1) rankBadge = 'background: linear-gradient(45deg, #ffd700, #d4af37); color: #000; box-shadow: 0 0 10px #ffd700;';
        else if(item.rank === 2) rankBadge = 'background: linear-gradient(45deg, #e0e0e0, #9e9e9e); color: #000; box-shadow: 0 0 10px #e0e0e0;';
        else if(item.rank === 3) rankBadge = 'background: linear-gradient(45deg, #cd7f32, #8b4513); color: #fff; box-shadow: 0 0 10px #cd7f32;';
        else rankBadge = 'background: linear-gradient(45deg, #ec4899, #be185d); color: #fff; box-shadow: 0 0 5px #ec4899;';

        return `
            <div class="jp-card">
                <div class="jp-rank" style="${rankBadge}">${item.rank}</div>
                <div class="jp-img-wrapper">
                    <img src="${item.image}" alt="${item.gameName}" onerror="this.src='https://via.placeholder.com/150/1a252f/f472b6?text=SLOT'">
                </div>
                <div class="jp-info">
                    <div class="jp-provider">${item.provider}</div>
                    <div class="jp-name" title="${item.gameName}">${item.gameName}</div>
                    <div class="jp-amount">${formatIDR(item.amount)}</div>
                    <div class="jp-user-date">
                        <span><i class="bi bi-person-circle"></i> ${item.user}</span>
                        <span>${item.date}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function injectWidget() {
        const target = document.querySelector(TARGET_SELECTOR);
        // Pastikan target ada dan widget belum pernah dibuat
        if (!target || document.getElementById(WIDGET_ID)) return false;

        const data = generateJackpotData(15); // Ambil Top 15 Data
        let cardsHTML = data.map(buildCardHTML).join('');
        
        // Gandakan isi card agar animasi scrolling looping tidak pernah putus (Seamless Infinite Scroll)
        cardsHTML += cardsHTML;

        const widgetHTML = `
            <div id="${WIDGET_ID}">
                <div class="sapatoto-jp-wrapper">
                    <div class="jp-header">
                        <h4><i class="bi bi-trophy-fill" style="color: #f1c40f;"></i> JACKPOT TERBESAR HARI INI</h4>
                    </div>
                    <div class="jp-slider-container">
                        <div class="jp-slider-track" id="jp-slider-track">
                            ${cardsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cssHTML = `
            <style>
                #${WIDGET_ID} {
                    max-width: 1200px;
                    margin: 0 auto 25px auto;
                    padding: 0 14px;
                    font-family: 'Exo 2', sans-serif;
                }
                .sapatoto-jp-wrapper {
                    background: linear-gradient(145deg, rgba(44, 62, 80, 0.9), rgba(26, 37, 47, 0.95));
                    border: 1px solid #ec4899;
                    border-radius: 12px;
                    padding: 15px;
                    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
                    overflow: hidden;
                }
                .jp-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 2px solid rgba(236, 72, 153, 0.3);
                    padding-bottom: 12px;
                    margin-bottom: 15px;
                }
                .jp-header h4 {
                    margin: 0;
                    color: #fff;
                    font-weight: 800;
                    text-transform: uppercase;
                    text-shadow: 0 0 10px rgba(236, 72, 153, 0.8);
                    font-size: 1.25rem;
                    letter-spacing: 1px;
                }
                
                /* Sistem Slide */
                .jp-slider-container {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    /* Menambahkan efek pudar (blur/fade) di ujung kiri dan kanan agar elegan */
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
                .jp-slider-track {
                    display: flex;
                    gap: 15px;
                    width: max-content;
                    /* Durasi 40 detik untuk 15 kotak, kecepatan pas untuk dibaca */
                    animation: jpScroll 40s linear infinite;
                }
                /* Berhenti jalan saat disentuh/hover */
                .jp-slider-track:hover {
                    animation-play-state: paused;
                }

                /* Desain Kotak Game */
                .jp-card {
                    width: 190px;
                    background: linear-gradient(160deg, rgba(30,42,55,1), rgba(15,20,25,1));
                    border: 1px solid #34495e;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .jp-card:hover {
                    transform: translateY(-5px);
                    border-color: #a855f7;
                    box-shadow: 0 5px 15px rgba(168, 85, 247, 0.6);
                    z-index: 5;
                }
                
                /* Pita Peringkat (Pojok Kiri Atas) */
                .jp-rank {
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 4px 12px;
                    font-weight: 900;
                    font-size: 0.9rem;
                    border-bottom-right-radius: 8px;
                    z-index: 2;
                }
                
                /* Pembungkus Gambar Mulus */
                .jp-img-wrapper {
                    width: 100%;
                    height: 125px;
                    overflow: hidden;
                    background-color: #0c0c1e;
                    border-bottom: 2px solid #ec4899;
                }
                .jp-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .jp-card:hover .jp-img-wrapper img {
                    transform: scale(1.1); /* Zoom gambar saat disentuh */
                }
                
                /* Bagian Teks */
                .jp-info {
                    padding: 10px;
                    text-align: center;
                }
                .jp-provider {
                    font-size: 0.65rem;
                    color: #bdc3c7;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 3px;
                }
                .jp-name {
                    font-size: 0.85rem;
                    color: #fff;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 6px;
                }
                .jp-amount {
                    font-size: 1.05rem;
                    color: #f1c40f;
                    font-weight: 900;
                    text-shadow: 0 0 10px rgba(241, 196, 15, 0.8);
                    margin-bottom: 8px;
                    background: rgba(0,0,0,0.4);
                    padding: 5px;
                    border-radius: 5px;
                    border: 1px dashed #f1c40f;
                }
                .jp-user-date {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.65rem;
                    color: #bdc3c7;
                }
                .jp-user-date span:first-child {
                    color: #ecf0f1;
                    font-weight: 600;
                }
                .jp-user-date i {
                    color: #a855f7;
                    margin-right: 2px;
                }

                /* Keyframe untuk Slider */
                @keyframes jpScroll {
                    0% { transform: translateX(0); }
                    /* Shift persis setengah dari total panjang track (karena diduplikasi) */
                    100% { transform: translateX(calc(-50% - 7.5px)); } 
                }

                /* Tampilan Mobile */
                @media (max-width: 768px) {
                    .jp-card { width: 155px; }
                    .jp-img-wrapper { height: 105px; }
                    .jp-amount { font-size: 0.9rem; }
                    .jp-header h4 { font-size: 1.05rem; }
                }
            </style>
        `;

        // Suntikkan ke HTML
        target.insertAdjacentHTML('beforebegin', cssHTML + widgetHTML);

        // =========================================
        // LOGIKA AUTO-REFRESH 30 MENIT
        // =========================================
        setInterval(() => {
            const track = document.getElementById('jp-slider-track');
            if (track) {
                // Hasilkan data baru yang 100% acak
                const newData = generateJackpotData(15);
                let newHTML = newData.map(buildCardHTML).join('');
                
                // Tempel ulang dengan duplikasi
                track.innerHTML = newHTML + newHTML;
                
                // Restart animasi CSS agar tidak bentrok posisi
                track.style.animation = 'none';
                track.offsetHeight; // trigger reflow
                track.style.animation = null; 
            }
        }, 30 * 60 * 1000); // 30 Menit (dalam millisecond)

        return true;
    }

    // Eksekutor Kuat
    const checkInterval = setInterval(() => {
        if (injectWidget()) clearInterval(checkInterval);
    }, 500);

})();