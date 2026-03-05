(async function() {
    // =========================================
    // KONFIGURASI WIDGET JACKPOT TERBESAR
    // =========================================
    const TARGET_SELECTOR = '#row-togel'; 
    const WIDGET_ID = 'sapatoto-jackpot-slider';
    
    // =========================================
    // DATABASE GAME VIP (GAMBAR CADANGAN RESMI GLOBAL)
    // =========================================
    const VIP_GAMES = [
        { name: "Mahjong Ways", provider: "PG SOFT", link: "/slots", img: "https://demogamesfree-pgsoft.akamaized.net/images/games/mahjong-ways.png", weight: 150 },
        { name: "Mahjong Ways 2", provider: "PG SOFT", link: "/slots", img: "https://demogamesfree-pgsoft.akamaized.net/images/games/mahjong-ways-2.png", weight: 150 },
        { name: "Gates of Olympus", provider: "PRAGMATIC PLAY", link: "/slots", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/02/Gates-of-Olympus-1-200x200.jpg", weight: 120 },
        { name: "Gates of Olympus 1000", provider: "PRAGMATIC PLAY", link: "/slots", img: "https://www.pragmaticplay.com/wp-content/uploads/2023/10/Gates-of-Olympus-1000-200x200.webp", weight: 100 },
        { name: "Starlight Princess", provider: "PRAGMATIC PLAY", link: "/slots", img: "https://www.pragmaticplay.com/wp-content/uploads/2021/08/starlight-princess-200x200.png", weight: 90 },
        { name: "Starlight Princess 1000", provider: "PRAGMATIC PLAY", link: "/slots", img: "https://www.pragmaticplay.com/wp-content/uploads/2023/10/Starlight-Princess-1000-200x200.png", weight: 80 },
        { name: "Sweet Bonanza", provider: "PRAGMATIC PLAY", link: "/slots", img: "https://www.pragmaticplay.com/wp-content/uploads/2019/06/sweet-bonanza-200x200.jpg", weight: 70 }
    ];

    let LIVE_GAME_LIBRARY = [...VIP_GAMES]; 

    // =========================================
    // MESIN ACAK SINKRONISASI GLOBAL (PRNG)
    // Mengunci hasil acakan agar sama untuk semua visitor
    // =========================================
    let globalSeed = 1;
    function prng() {
        globalSeed = (globalSeed * 9301 + 49297) % 233280;
        return globalSeed / 233280;
    }

    // =========================================
    // DETEKSI PROVIDER SUPER AKURAT (3 LAPIS)
    // =========================================
    function detectProvider(name, imgUrl, linkUrl) {
        let text = (name + " " + imgUrl + " " + linkUrl).toLowerCase();

        if (text.includes('pragmatic') || text.includes('/pp/') || text.includes('vs20') || text.includes('vs10') || name.toLowerCase().includes('olympus') || name.toLowerCase().includes('princess') || name.toLowerCase().includes('bonanza') || name.toLowerCase().includes('sugar') || name.toLowerCase().includes('aztec') || name.toLowerCase().includes('rhino') || name.toLowerCase().includes('megaways') || name.toLowerCase().includes('lions') || name.toLowerCase().includes('thor')) {
            return "PRAGMATIC PLAY";
        }
        if (text.includes('pgsoft') || text.includes('pg-soft') || text.includes('/pg/') || name.toLowerCase().includes('mahjong') || name.toLowerCase().includes('neko') || name.toLowerCase().includes('bandito') || name.toLowerCase().includes('shaolin') || name.toLowerCase().includes('wealth') || name.toLowerCase().includes('qilin') || name.toLowerCase().includes('hatch') || name.toLowerCase().includes('caishen') || name.toLowerCase().includes('macau')) {
            return "PG SOFT";
        }
        if (text.includes('habanero') || text.includes('/hb/') || name.toLowerCase().includes('koi gate') || name.toLowerCase().includes('fa cai shen') || name.toLowerCase().includes('hot hot')) {
            return "HABANERO";
        }
        if (text.includes('joker') || text.includes('/jk/')) return "JOKER GAMING";
        if (text.includes('microgaming') || text.includes('/mg/')) return "MICROGAMING";
        if (text.includes('spade') || text.includes('/sg/')) return "SPADEGAMING";
        if (text.includes('playtech') || text.includes('/pt/')) return "PLAYTECH";
        if (text.includes('cq9')) return "CQ9";
        if (text.includes('nolimit') || text.includes('no limit')) return "NOLIMIT CITY";
        
        return "SLOT ONLINE";
    }

    // =========================================
    // FUNGSI 1: AUTO-SCRAPE DARI RTP 
    // =========================================
    async function fetchGamesFromRTP() {
        try {
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
                    
                    let link = node.href || node.dataset.playurl || '/slots';
                    if (link.includes('javascript:') || link.endsWith('#') || link === window.location.href) {
                        link = '/slots'; 
                    }

                    let provider = detectProvider(name, imgUrl, link);

                    let existingVip = LIVE_GAME_LIBRARY.find(g => g.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(g.name.toLowerCase()));
                    
                    if (existingVip) {
                        existingVip.img = imgUrl; 
                        existingVip.link = link;
                    } else {
                        if (!fetchedGames.find(g => g.name === name)) {
                            fetchedGames.push({ name, provider, img: imgUrl, link, weight: 15 });
                        }
                    }
                }
            });

            LIVE_GAME_LIBRARY = [...VIP_GAMES, ...fetchedGames];

        } catch(err) {
            console.warn("Gagal scrape /rtp, hanya menggunakan data VIP fallback.", err);
        }
    }

    // =========================================
    // FUNGSI 2: GENERATOR NATURAL (GLOBAL SEED)
    // =========================================
    function getRandomItemWeighted(items) {
        let totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = prng() * totalWeight; // Menggunakan PRNG Global
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
        const rand = prng(); // Menggunakan PRNG Global
        let min, max;
        if (rand < 0.65) { min = 20; max = 45; }
        else if (rand < 0.88) { min = 46; max = 85; }
        else if (rand < 0.97) { min = 86; max = 130; }
        else { min = 131; max = 200; }
        
        const millions = Math.floor(prng() * (max - min + 1)) + min;
        const thousands = Math.floor(prng() * 999);
        const hundreds = Math.floor(prng() * 9) * 100;
        return (millions * 1000000) + (thousands * 1000) + hundreds;
    }

    function generateUsername() {
        const prefixes = ['An','Bo','Ci','De','Ed','Fa','Ga','He','In','Je','Ke','Li','Ma','No','Pu','Ri','Sa','Ti','Vi','Wi','Yo','Za'];
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let pre = prefixes[Math.floor(prng() * prefixes.length)];
        let post = chars.charAt(Math.floor(prng() * chars.length));
        return pre + '****' + post;
    }

    function generateDate(baseTime) {
        // Base time adalah waktu MULAINYA blok 30 menit. Kita kurangi 0-30 menit lagi ke belakang dari waktu itu.
        const pastTime = new Date(baseTime - Math.floor(prng() * 1800000)); 
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const year = pastTime.getFullYear();
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    }

    function generateJackpotData(count = 15) {
        // 1. KUNCI UTAMA: Dapatkan Waktu Blok 30 Menit Saat Ini
        // Contoh: 12:00 s/d 12:29 akan menghasilkan angka blok yang SAMA PERSIS
        const timeBlock = Math.floor(Date.now() / (30 * 60 * 1000));
        
        // 2. Set Seed Generator menggunakan angka blok tersebut
        globalSeed = timeBlock;
        
        // 3. Tentukan batas waktu asli (agar jam mundur stabil)
        const baseTime = timeBlock * 30 * 60 * 1000;

        const data = [];
        for (let i = 0; i < count; i++) {
            const game = getRandomItemWeighted(LIVE_GAME_LIBRARY);
            data.push({
                gameName: game.name,
                provider: game.provider,
                image: game.img,
                link: game.link, 
                amount: generateJackpotAmount(),
                user: generateUsername(),
                date: generateDate(baseTime)
            });
        }
        
        // Acak posisinya menggunakan PRNG juga agar konsisten
        return data.sort(() => prng() - 0.5);
    }

    // =========================================
    // FUNGSI 3: RENDER HTML & CSS
    // =========================================
    function buildCardHTML(item) {
        return `
            <a href="${item.link}" class="jp-card">
                <div class="jp-img-wrapper">
                    <img src="${item.image}" alt="${item.gameName}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150/1a252f/f472b6?text=SLOT';">
                    <div class="play-overlay">
                        <i class="bi bi-play-circle-fill"></i> MAIN
                    </div>
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
        cardsHTML += cardsHTML; // Infinite loop

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
                    max-width: 1200px; margin: 0 auto 25px auto; padding: 0 14px; font-family: 'Exo 2', sans-serif;
                }
                .sapatoto-jp-wrapper {
                    background: linear-gradient(145deg, rgba(44, 62, 80, 0.9), rgba(26, 37, 47, 0.95));
                    border: 1px solid #ec4899; border-radius: 12px; padding: 0; 
                    box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); overflow: hidden;
                }
                .jp-header {
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(90deg, #ec4899, #a855f7, #3b82f6); 
                    padding: 12px 15px; margin-bottom: 15px; border-bottom: 2px solid #fff;
                }
                .jp-header h4 {
                    margin: 0; color: #fff; font-weight: 800; text-transform: uppercase;
                    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); font-size: 1.25rem; letter-spacing: 1px;
                }
                .jp-slider-container {
                    width: 100%; overflow-x: auto; position: relative; padding-bottom: 15px; 
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
                    -ms-overflow-style: none; scrollbar-width: none; cursor: grab;
                }
                .jp-slider-container::-webkit-scrollbar { display: none; }
                .jp-slider-track {
                    display: inline-flex; gap: 15px; width: max-content; padding: 0 15px; 
                }
                .jp-card {
                    display: block; text-decoration: none !important; width: 170px; 
                    background: linear-gradient(160deg, rgba(30,42,55,1), rgba(15,20,25,1));
                    border: 1px solid #34495e; border-radius: 10px; overflow: hidden;
                    position: relative; flex-shrink: 0;
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                    user-select: none; -webkit-user-drag: none;
                }
                .jp-card:hover {
                    transform: translateY(-5px); border-color: #a855f7;
                    box-shadow: 0 5px 15px rgba(168, 85, 247, 0.6); z-index: 5;
                }
                .jp-img-wrapper {
                    width: 100%; aspect-ratio: 1 / 1; overflow: hidden;
                    background-color: #0c0c1e; border-bottom: 2px solid #ec4899; position: relative;
                }
                .jp-img-wrapper img {
                    width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; pointer-events: none; 
                }
                .jp-card:hover .jp-img-wrapper img { transform: scale(1.1); }
                .play-overlay {
                    position: absolute; inset: 0; background: rgba(236, 72, 153, 0.8);
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    opacity: 0; transition: opacity 0.3s ease; color: #fff;
                    font-weight: 900; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                .play-overlay i { font-size: 2.5rem; margin-bottom: 5px; }
                .jp-card:hover .play-overlay { opacity: 1; }
                .jp-info { padding: 10px; text-align: center; }
                .jp-provider { font-size: 0.65rem; color: #bdc3c7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; font-weight: bold;}
                .jp-name { font-size: 0.85rem; color: #fff; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
                .jp-amount { font-size: 1.05rem; color: #f1c40f; font-weight: 900; text-shadow: 0 0 10px rgba(241, 196, 15, 0.8); margin-bottom: 8px; background: rgba(0,0,0,0.4); padding: 5px; border-radius: 5px; border: 1px dashed #f1c40f; }
                .jp-user-date { display: flex; flex-direction: column; align-items: center; font-size: 0.65rem; color: #bdc3c7; gap: 3px; }
                .jp-user-date span:first-child { color: #ecf0f1; font-weight: 600; font-size: 0.75rem; }
                .jp-user-date i { color: #a855f7; margin-right: 2px; }

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
        let isDown = false; let startX; let scrollLeft; let exactScrollLeft = 0;
        let isHovered = false; let isDraggingCard = false; 
        
        function autoScroll() {
            if (!isDown && !isHovered) {
                exactScrollLeft += 0.5; 
                if (exactScrollLeft >= container.scrollWidth / 2) exactScrollLeft = 0;
                container.scrollLeft = exactScrollLeft;
            } else {
                exactScrollLeft = container.scrollLeft; 
            }
            requestAnimationFrame(autoScroll);
        }

        container.addEventListener('mousedown', (e) => {
            isDown = true; isDraggingCard = false; container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft; scrollLeft = container.scrollLeft;
        });
        container.addEventListener('mouseleave', () => { isDown = false; isHovered = false; container.style.cursor = 'grab'; });
        container.addEventListener('mouseup', () => { isDown = false; container.style.cursor = 'grab'; });
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            const x = e.pageX - container.offsetLeft; const walk = (x - startX) * 1.5; 
            if (Math.abs(walk) > 3) isDraggingCard = true; 
            
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0; startX = e.pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });
        
        container.addEventListener('touchstart', (e) => {
            isDown = true; isDraggingCard = false;
            startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = container.scrollLeft;
        });
        container.addEventListener('touchend', () => { isDown = false; });
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft; const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 3) isDraggingCard = true;
            
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0; startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });

        container.addEventListener('mouseenter', () => { isHovered = true; });
        container.addEventListener('click', (e) => { if (isDraggingCard) e.preventDefault(); });

        autoScroll();

        // =========================================
        // LOGIKA AUTO-REFRESH TEPAT WAKTU (SINKRONISASI JAM)
        // Mengecek setiap 1 Menit, jika blok 30-menitan berubah, render ulang.
        // =========================================
        let currentBlock = Math.floor(Date.now() / (30 * 60 * 1000));
        
        setInterval(() => {
            const newBlock = Math.floor(Date.now() / (30 * 60 * 1000));
            if (newBlock !== currentBlock) {
                currentBlock = newBlock; // Update blok saat ini
                const track = document.getElementById('jp-slider-track');
                if (track) {
                    const newData = generateJackpotData(15);
                    let newHTML = newData.map(buildCardHTML).join('');
                    track.innerHTML = newHTML + newHTML;
                }
            }
        }, 60000); // Check tiap 60 detik

        return true;
    }

    // =========================================
    // EKSEKUSI
    // =========================================
    fetchGamesFromRTP().then(() => {
        const checkInterval = setInterval(() => {
            if (injectWidget()) clearInterval(checkInterval);
        }, 500);
    });

})();
