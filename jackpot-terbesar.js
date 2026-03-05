(async function() {
    // =========================================
    // KONFIGURASI WIDGET JACKPOT TERBESAR
    // =========================================
    const TARGET_SELECTOR = '#row-togel'; // Target elemen (di atas kotak pasaran togel)
    const WIDGET_ID = 'sapatoto-jackpot-slider';
    
    // Variabel penyimpan data game dari halaman /rtp
    let LIVE_GAME_LIBRARY = [];

    // =========================================
    // FUNGSI 1: AUTO-SCRAPE GAMBAR DARI /RTP
    // =========================================
    async function fetchGamesFromRTP() {
        try {
            // Diam-diam mengambil data HTML dari halaman RTP situs Anda sendiri
            const response = await fetch('/rtp');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Mencari elemen game slot (sesuai struktur umum Sapatoto/Nexus)
            const gameNodes = doc.querySelectorAll('.row.mb-3.g-1 > div[class*="col-"] a, .game-item a');
            let fetchedGames = [];

            gameNodes.forEach(node => {
                const imgEl = node.querySelector('img');
                if (imgEl && imgEl.src) {
                    let name = node.dataset.gamename || imgEl.alt || "Slot Game";
                    let imgUrl = imgEl.src;

                    // Deteksi Otomatis Provider berdasarkan nama game
                    let provider = "SLOT ONLINE";
                    let n = name.toLowerCase();
                    if(n.includes("mahjong") || n.includes("bandito") || n.includes("neko") || n.includes("shaolin")) provider = "PG SOFT";
                    else if(n.includes("olympus") || n.includes("princess") || n.includes("bonanza") || n.includes("sugar") || n.includes("starlight")) provider = "PRAGMATIC PLAY";

                    // Atur Persentase Kemunculan (Bobot)
                    let weight = 10;
                    if(provider === "PRAGMATIC PLAY" || provider === "PG SOFT") weight = 30; // Prioritas Menengah
                    if(n.includes("mahjong") || n.includes("olympus") || n.includes("starlight") || n.includes("1000")) weight = 60; // Sangat Sering Muncul!

                    // Masukkan ke array jika nama belum ada (cegah duplikat)
                    if (!fetchedGames.find(g => g.name === name)) {
                        fetchedGames.push({ name, provider, img: imgUrl, weight });
                    }
                }
            });

            if(fetchedGames.length >= 5) return fetchedGames;
            throw new Error("Game yang ditemukan kurang dari 5");

        } catch(err) {
            console.warn("Gagal scrape /rtp, menggunakan gambar cadangan server pusat.", err);
            // Gambar Cadangan jika halaman RTP gagal diakses
            return [
                { name: "Mahjong Ways 2", provider: "PG SOFT", img: "https://demogamesfree-pgsoft.akamaized.net/images/games/mahjong-ways-2.png", weight: 50 },
                { name: "Gates of Olympus", provider: "PRAGMATIC PLAY", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/02/Gates-of-Olympus-1-200x200.jpg", weight: 50 },
                { name: "Starlight Princess", provider: "PRAGMATIC PLAY", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/08/starlight-princess-200x200.png", weight: 40 },
                { name: "Sweet Bonanza", provider: "PRAGMATIC PLAY", img: "https://www.pragmaticplay.com/wp-content/uploads/2019/06/sweet-bonanza-200x200.jpg", weight: 30 }
            ];
        }
    }

    // =========================================
    // FUNGSI 2: GENERATOR NATURAL
    // =========================================
    
    // Pilih game berdasarkan persentase (bobot)
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
        else { min = 131; max = 200; }                  // 3% Peluang: 131 JT - 200 JT
        
        const millions = Math.floor(Math.random() * (max - min + 1)) + min;
        const thousands = Math.floor(Math.random() * 999);
        const hundreds = Math.floor(Math.random() * 9) * 100;
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

    // Generator Tanggal & Jam (Hanya mundur 0 - 30 Menit yang lalu)
    function generateDate() {
        const now = new Date();
        // Kurangi waktu acak dari 0 sampai maksimal 30 menit (1.800.000 millisecond)
        const pastTime = new Date(now.getTime() - Math.floor(Math.random() * 1800000));
        
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const year = pastTime.getFullYear(); // Tampilkan Tahun Lengkap
        
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        
        return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    }

    // Buat Kumpulan Data Jackpot
    function generateJackpotData(count = 15) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const game = getRandomItemWeighted(LIVE_GAME_LIBRARY);
            data.push({
                gameName: game.name,
                provider: game.provider,
                image: game.img,
                amount: generateJackpotAmount(),
                user: generateUsername(),
                date: generateDate()
            });
        }
        // Acak letaknya
        return data.sort(() => Math.random() - 0.5);
    }

    // =========================================
    // FUNGSI 3: RENDER HTML & CSS
    // =========================================
    
    function buildCardHTML(item) {
        return `
            <div class="jp-card">
                <div class="jp-img-wrapper">
                    <img src="${item.image}" alt="${item.gameName}">
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
        if (!target || document.getElementById(WIDGET_ID)) return false;

        const data = generateJackpotData(15); 
        let cardsHTML = data.map(buildCardHTML).join('');
        
        // Gandakan isi card agar animasi tidak pernah putus (Seamless Infinite Scroll)
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
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                }
                .jp-slider-track {
                    display: flex;
                    gap: 15px;
                    width: max-content;
                    /* Kecepatan diperlambat (75 Detik) */
                    animation: jpScroll 75s linear infinite;
                }
                .jp-slider-track:hover {
                    animation-play-state: paused;
                }

                /* Desain Kotak Game */
                .jp-card {
                    width: 170px; /* Dipersempit sedikit agar lebih presisi */
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
                
                /* Pembungkus Gambar Persegi 1:1 */
                .jp-img-wrapper {
                    width: 100%;
                    aspect-ratio: 1 / 1; /* PERSEGI MURNI */
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
                    transform: scale(1.1);
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
                    flex-direction: column;
                    align-items: center;
                    font-size: 0.65rem;
                    color: #bdc3c7;
                    gap: 3px;
                }
                .jp-user-date span:first-child {
                    color: #ecf0f1;
                    font-weight: 600;
                    font-size: 0.75rem;
                }
                .jp-user-date i {
                    color: #a855f7;
                    margin-right: 2px;
                }

                /* Keyframe untuk Slider */
                @keyframes jpScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 7.5px)); } 
                }

                /* Tampilan Mobile */
                @media (max-width: 768px) {
                    .jp-card { width: 140px; }
                    .jp-amount { font-size: 0.9rem; }
                    .jp-header h4 { font-size: 1.05rem; }
                }
            </style>
        `;

        target.insertAdjacentHTML('beforebegin', cssHTML + widgetHTML);

        // =========================================
        // LOGIKA AUTO-REFRESH 30 MENIT
        // =========================================
        setInterval(() => {
            const track = document.getElementById('jp-slider-track');
            if (track) {
                const newData = generateJackpotData(15);
                let newHTML = newData.map(buildCardHTML).join('');
                track.innerHTML = newHTML + newHTML;
                
                track.style.animation = 'none';
                track.offsetHeight; 
                track.style.animation = null; 
            }
        }, 30 * 60 * 1000); 

        return true;
    }

    // =========================================
    // EKSEKUSI (Tunggu gambar dari RTP ditarik dulu)
    // =========================================
    LIVE_GAME_LIBRARY = await fetchGamesFromRTP();

    const checkInterval = setInterval(() => {
        if (injectWidget()) clearInterval(checkInterval);
    }, 500);

})();
