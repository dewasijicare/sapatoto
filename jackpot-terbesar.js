(async function() {
    // =========================================
    // KONFIGURASI WIDGET JACKPOT TERBESAR
    // =========================================
    const TARGET_SELECTOR = '#row-togel'; // Target elemen (di atas kotak pasaran togel)
    const WIDGET_ID = 'sapatoto-jackpot-slider';
    
    // Variabel penyimpan data game dari halaman /rtp
    let LIVE_GAME_LIBRARY = [];

    // =========================================
    // FUNGSI 1: AUTO-SCRAPE GAMBAR & LINK DARI /RTP
    // =========================================
    async function fetchGamesFromRTP() {
        try {
            // Diam-diam mengambil data HTML dari halaman RTP
            const response = await fetch('/rtp');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const gameNodes = doc.querySelectorAll('.row.mb-3.g-1 > div[class*="col-"] a, .game-item a');
            let fetchedGames = [];

            gameNodes.forEach(node => {
                const imgEl = node.querySelector('img');
                if (imgEl && imgEl.src) {
                    let name = node.dataset.gamename || imgEl.alt || "Slot Game";
                    let imgUrl = imgEl.src;
                    
                    // AMBIL LINK GAME UNTUK DIKLIK
                    let link = node.href || node.dataset.playurl || '#';
                    let linkLower = link.toLowerCase();

                    // DETEKSI PROVIDER OTOMATIS BERDASARKAN LINK / NAMA
                    let provider = "SLOT ONLINE";
                    if(linkLower.includes('pragmatic')) provider = "PRAGMATIC PLAY";
                    else if(linkLower.includes('pgsoft')) provider = "PG SOFT";
                    else if(linkLower.includes('habanero')) provider = "HABANERO";
                    else if(linkLower.includes('microgaming')) provider = "MICROGAMING";
                    else if(linkLower.includes('joker')) provider = "JOKER GAMING";
                    else if(linkLower.includes('spade')) provider = "SPADEGAMING";
                    else if(linkLower.includes('cq9')) provider = "CQ9";
                    else if(linkLower.includes('playtech')) provider = "PLAYTECH";
                    else if(linkLower.includes('playn') || linkLower.includes('png')) provider = "PLAY'N GO";
                    else if(linkLower.includes('top-trend') || linkLower.includes('toptrend')) provider = "TOP TREND";
                    else if(linkLower.includes('nolimit')) provider = "NOLIMIT CITY";

                    // Atur Persentase Kemunculan (Bobot)
                    let weight = 10;
                    if(provider === "PRAGMATIC PLAY" || provider === "PG SOFT") weight = 30;
                    let nLower = name.toLowerCase();
                    if(nLower.includes("mahjong") || nLower.includes("olympus") || nLower.includes("starlight") || nLower.includes("1000")) weight = 60; // Paling sering muncul

                    // Masukkan ke array jika nama belum ada (cegah duplikat)
                    if (!fetchedGames.find(g => g.name === name)) {
                        fetchedGames.push({ name, provider, img: imgUrl, link, weight });
                    }
                }
            });

            if(fetchedGames.length >= 5) return fetchedGames;
            throw new Error("Game yang ditemukan kurang dari 5");

        } catch(err) {
            console.warn("Gagal scrape /rtp, menggunakan data cadangan.", err);
            // Data Cadangan beserta Link Dummy
            return [
                { name: "Mahjong Ways 2", provider: "PG SOFT", link: "/slots/pgsoft", img: "https://demogamesfree-pgsoft.akamaized.net/images/games/mahjong-ways-2.png", weight: 50 },
                { name: "Gates of Olympus", provider: "PRAGMATIC PLAY", link: "/slots/pragmatic", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/02/Gates-of-Olympus-1-200x200.jpg", weight: 50 },
                { name: "Starlight Princess", provider: "PRAGMATIC PLAY", link: "/slots/pragmatic", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/08/starlight-princess-200x200.png", weight: 40 },
                { name: "Sweet Bonanza", provider: "PRAGMATIC PLAY", link: "/slots/pragmatic", img: "https://www.pragmaticplay.com/wp-content/uploads/2019/06/sweet-bonanza-200x200.jpg", weight: 30 }
            ];
        }
    }

    // =========================================
    // FUNGSI 2: GENERATOR NATURAL
    // =========================================
    
    function getRandomItemWeighted(items) {
        let totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < items.length; i++) {
            if (random < items[i].weight) return items[i];
            random -= items[i].weight;
        }
        return items[0];
    }

    function formatIDR(angka) {
        return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
    }

    function generateJackpotAmount() {
        const rand = Math.random();
        let min, max;
        if (rand < 0.65) { min = 20; max = 45; }
        else if (rand < 0.88) { min = 46; max = 85; }
        else if (rand < 0.97) { min = 86; max = 130; }
        else { min = 131; max = 200; }
        
        const millions = Math.floor(Math.random() * (max - min + 1)) + min;
        const thousands = Math.floor(Math.random() * 999);
        const hundreds = Math.floor(Math.random() * 9) * 100;
        return (millions * 1000000) + (thousands * 1000) + hundreds;
    }

    function generateUsername() {
        const prefixes = ['An','Bo','Ci','De','Ed','Fa','Ga','He','In','Je','Ke','Li','Ma','No','Pu','Ri','Sa','Ti','Vi','Wi','Yo','Za'];
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let pre = prefixes[Math.floor(Math.random() * prefixes.length)];
        let post = chars.charAt(Math.floor(Math.random() * chars.length));
        return pre + '****' + post;
    }

    function generateDate() {
        const now = new Date();
        const pastTime = new Date(now.getTime() - Math.floor(Math.random() * 1800000)); // Mundur 0-30 Menit
        
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const year = pastTime.getFullYear();
        
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        
        return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    }

    function generateJackpotData(count = 15) {
        const data = [];
        for (let i = 0; i < count; i++) {
            const game = getRandomItemWeighted(LIVE_GAME_LIBRARY);
            data.push({
                gameName: game.name,
                provider: game.provider,
                image: game.img,
                link: game.link, // Ambil Link Game
                amount: generateJackpotAmount(),
                user: generateUsername(),
                date: generateDate()
            });
        }
        return data.sort(() => Math.random() - 0.5); // Acak Posisi
    }

    // =========================================
    // FUNGSI 3: RENDER HTML & CSS
    // =========================================
    
    function buildCardHTML(item) {
        return `
            <a href="${item.link}" class="jp-card">
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
            </a>
        `;
    }

    function injectWidget() {
        const target = document.querySelector(TARGET_SELECTOR);
        if (!target || document.getElementById(WIDGET_ID)) return false;

        const data = generateJackpotData(15); 
        let cardsHTML = data.map(buildCardHTML).join('');
        
        // Gandakan isi card agar infinite loop berfungsi (30 items total)
        cardsHTML += cardsHTML;

        const widgetHTML = `
            <div id="${WIDGET_ID}">
                <div class="sapatoto-jp-wrapper">
                    <div class="jp-header">
                        <h4><i class="bi bi-trophy-fill" style="color: #f1c40f;"></i> JACKPOT TERBESAR HARI INI</h4>
                    </div>
                    <div class="jp-slider-container" id="jp-slider-container">
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
                    padding: 0; /* Diubah jadi 0 karena header punya warna sendiri */
                    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
                    overflow: hidden;
                }
                
                /* HEADER BERWARNA GAMING */
                .jp-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(90deg, #ec4899, #a855f7, #3b82f6); /* Gradasi 3 Warna */
                    padding: 12px 15px;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #fff;
                }
                .jp-header h4 {
                    margin: 0;
                    color: #fff;
                    font-weight: 800;
                    text-transform: uppercase;
                    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
                    font-size: 1.25rem;
                    letter-spacing: 1px;
                }
                
                /* Sistem Slide Draggable */
                .jp-slider-container {
                    width: 100%;
                    overflow-x: auto;
                    position: relative;
                    padding-bottom: 15px; /* Spasi bawah */
                    /* Efek pudar di ujung */
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    /* Sembunyikan scrollbar bawaan */
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                    cursor: grab;
                }
                .jp-slider-container::-webkit-scrollbar {
                    display: none;
                }
                .jp-slider-track {
                    display: inline-flex;
                    gap: 15px;
                    width: max-content;
                    padding: 0 15px; /* Spasi kiri kanan */
                }

                /* Desain Kotak Game BISA DI KLIK */
                .jp-card {
                    display: block;
                    text-decoration: none !important;
                    width: 170px; 
                    background: linear-gradient(160deg, rgba(30,42,55,1), rgba(15,20,25,1));
                    border: 1px solid #34495e;
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                    flex-shrink: 0;
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                    /* Mencegah gambar / text nyangkut saat di drag */
                    user-select: none;
                    -webkit-user-drag: none;
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
                    aspect-ratio: 1 / 1; 
                    overflow: hidden;
                    background-color: #0c0c1e;
                    border-bottom: 2px solid #ec4899;
                }
                .jp-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                    pointer-events: none; /* Penting agar gambar tidak ketarik saat drag */
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

                @media (max-width: 768px) {
                    .jp-card { width: 140px; }
                    .jp-amount { font-size: 0.9rem; }
                    .jp-header h4 { font-size: 1.05rem; }
                }
            </style>
        `;

        target.insertAdjacentHTML('beforebegin', cssHTML + widgetHTML);

        // =========================================
        // LOGIKA DRAG & SWIPE (VANILLA JS)
        // =========================================
        const container = document.getElementById('jp-slider-container');
        let isDown = false;
        let startX;
        let scrollLeft;
        let exactScrollLeft = 0;
        let isHovered = false;
        let isDraggingCard = false; // Membedakan antara mengklik link atau mendrag slider
        
        // Fungsi Auto Scroll Mulus
        function autoScroll() {
            if (!isDown && !isHovered) {
                exactScrollLeft += 0.5; // Kecepatan Scroll, bisa diubah (0.5 = lambat, 1 = normal)
                
                // Jika sudah menyentuh setengah track (karena diduplikasi), reset ke 0 (Infinite Loop)
                if (exactScrollLeft >= container.scrollWidth / 2) {
                    exactScrollLeft = 0;
                }
                container.scrollLeft = exactScrollLeft;
            } else {
                exactScrollLeft = container.scrollLeft; // Sinkronisasi manual scroll
            }
            requestAnimationFrame(autoScroll);
        }

        // Mouse Events (Untuk PC)
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            isDraggingCard = false;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            isHovered = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // Kecepatan Drag
            if (Math.abs(walk) > 3) isDraggingCard = true; // Deteksi jika sedang drag
            
            // Logika Infinite Loop untuk drag manual
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.pageX - container.offsetLeft; // Reset start posisi agar tidak loncat
                scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });
        
        // Touch Events (Untuk HP)
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            isDraggingCard = false;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        container.addEventListener('touchend', () => { isDown = false; });
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 3) isDraggingCard = true;
            
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0;
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });

        // Hentikan auto-scroll saat kursor berada di atas slider
        container.addEventListener('mouseenter', () => { isHovered = true; });
        
        // Mencegah link di-klik jika user berniat untuk men-drag
        container.addEventListener('click', (e) => {
            if (isDraggingCard) e.preventDefault();
        });

        // Jalankan animasi loop
        autoScroll();

        // =========================================
        // LOGIKA AUTO-REFRESH (30 MENIT)
        // =========================================
        setInterval(() => {
            const track = document.getElementById('jp-slider-track');
            if (track) {
                const newData = generateJackpotData(15);
                let newHTML = newData.map(buildCardHTML).join('');
                track.innerHTML = newHTML + newHTML;
            }
        }, 30 * 60 * 1000); 

        return true;
    }

    // =========================================
    // EKSEKUSI (Tunggu data game ditarik dulu)
    // =========================================
    LIVE_GAME_LIBRARY = await fetchGamesFromRTP();

    const checkInterval = setInterval(() => {
        if (injectWidget()) clearInterval(checkInterval);
    }, 500);

})();
