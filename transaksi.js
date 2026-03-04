(function() {
    // 1. GENERATOR DATA PINTAR & NATURAL

    // Generator Username (Huruf Besar, Kecil, Angka, dan Random)
    function getRandomUsername() {
        const prefixes = ['and', 'bos', 'rat', 'dew', 'put', 'jay', 'hok', 'raj', 'sat', 'bms', 'pro', 'vip', 'agu', 'bud', 'wij', 'meg', 'kus', 'adi', 'bap', 'mas', 'mbk', 'tom', 'den', 'her'];
        let base = prefixes[Math.floor(Math.random() * prefixes.length)];

        // Acak Case (Semua kecil, Kapital depan, atau Semua Besar)
        const caseType = Math.floor(Math.random() * 3);
        if (caseType === 0) {
            base = base.toUpperCase();
        } else if (caseType === 1) {
            base = base.charAt(0).toUpperCase() + base.slice(1);
        }

        // Tambahkan angka acak
        const num = Math.floor(Math.random() * 999);
        const rawName = base + num.toString();

        // Kadang-kadang hasilkan 3 huruf+angka benar-benar acak (cth: A7X, K9P)
        if (Math.random() > 0.8) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randStr = '';
            for (let i = 0; i < 3; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
            return randStr + '***';
        }

        // Ambil 3 karakter pertama dan tambahkan bintang
        return rawName.substring(0, 3) + '***';
    }

    // Generator Nominal Deposit (Fokus 50k & 100k)
    function getDepositAmount() {
        const amounts = [10000, 20000, 25000, 50000, 50000, 50000, 50000, 100000, 100000, 100000, 150000, 200000, 250000, 500000];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }

    // Generator Nominal Withdraw (Super Natural & Campuran)
    function getWithdrawAmount() {
        const type = Math.random();
        if (type < 0.25) {
            // WD Kecil (500rb - 900rb)
            const amounts = [500000, 600000, 750000, 800000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        } else if (type < 0.50) {
            // WD Genap/Bulat (1 Juta - 19 Juta)
            const millions = [1, 2, 5, 10, 15, 19, 20];
            return millions[Math.floor(Math.random() * millions.length)] * 1000000;
        } else if (type < 0.75) {
            // WD Tanggung / Angka Unik (1 Juta - 10 Juta)
            const millions = Math.floor(Math.random() * 9) + 1; // 1-9
            const thousands = [150, 250, 340, 500, 750, 850][Math.floor(Math.random() * 6)];
            return (millions * 1000000) + (thousands * 1000); // cth: 4.250.000
        } else {
            // WD Besar / Jackpot (20 Juta - 80 Juta)
            const amounts = [24000000, 30000000, 38500000, 45000000, 50000000, 68000000, 80000000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        }
    }

    // Format IDR
    function formatIDR(angka) {
        return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
    }

    // 2. FUNGSI PEMBUAT BARIS & ANIMASI
    function renderTransactions() {
        const depList = document.getElementById('sapatoto-dep-list');
        const wdList = document.getElementById('sapatoto-wd-list');
        if (!depList || !wdList) return;

        // Siapkan antrean (20 Data)
        const deps = [];
        const wds = [];
        for (let i = 0; i < 20; i++) {
            deps.push({ user: getRandomUsername(), amount: getDepositAmount() });
            wds.push({ user: getRandomUsername(), amount: getWithdrawAmount() });
        }

        const buildRow = (item, type) => {
            const amountClass = type === 'deposit' ? 'tx-deposit' : 'tx-withdraw';
            return `
                <div class="tx-item">
                    <div class="tx-user"><i class="bi bi-person-circle text-muted me-2"></i><span class="fw-bold text-light">${item.user}</span></div>
                    <div class="tx-amount ${amountClass}">${formatIDR(item.amount)}</div>
                </div>
            `;
        };

        // Render 20 data asli + 20 data duplikat (untuk ilusi looping tanpa batas)
        const generateHTML = (arr, type) => {
            let html = '';
            arr.forEach(item => html += buildRow(item, type));
            arr.forEach(item => html += buildRow(item, type)); // Duplikat
            return html;
        };

        depList.innerHTML = generateHTML(deps, 'deposit');
        wdList.innerHTML = generateHTML(wds, 'withdraw');
    }

    // Fungsi Refresh Halus (Fade Out -> Ganti Data -> Fade In)
    function refreshTransactions() {
        const lists = document.querySelectorAll('.tx-marquee');
        lists.forEach(el => el.style.opacity = '0'); // Hilangkan sejenak
        setTimeout(() => {
            renderTransactions(); // Ganti data
            lists.forEach(el => {
                // Reset animasi ke awal
                el.style.animation = 'none';
                el.offsetHeight; /* trigger reflow */
                el.style.animation = null; 
                el.style.opacity = '1'; // Munculkan kembali
            });
        }, 500);
    }

    // 3. FUNGSI INJEKSI KE HALAMAN
    function injectTransactionsWidget() {
        const target = document.querySelector('#pintas-widget-wrapper');
        const existing = document.getElementById('sapatoto-recent-transactions');

        if (target && !existing) {
            const widgetHTML = `
                <div id="sapatoto-recent-transactions" style="max-width: 1200px; margin: 0 auto 25px auto; padding: 0 14px;">
                    <div class="row g-3 d-flex align-items-stretch">
                        
                        <div class="col-md-6 d-flex">
                            <div class="tx-card w-100 d-flex flex-column">
                                <div class="tx-header border-pink">
                                    <i class="bi bi-box-arrow-in-down tx-icon-pink"></i> 5 DEPOSIT TERAKHIR
                                </div>
                                <div class="tx-table-header">
                                    <div>USER</div>
                                    <div class="text-end">NOMINAL</div>
                                </div>
                                <div class="tx-body flex-grow-1">
                                    <div class="tx-marquee" id="sapatoto-dep-list">
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 d-flex">
                            <div class="tx-card w-100 d-flex flex-column">
                                <div class="tx-header border-purple">
                                    <i class="bi bi-cash-coin tx-icon-purple"></i> 5 WITHDRAW TERAKHIR
                                </div>
                                <div class="tx-table-header">
                                    <div>USER</div>
                                    <div class="text-end">NOMINAL</div>
                                </div>
                                <div class="tx-body flex-grow-1">
                                    <div class="tx-marquee" id="sapatoto-wd-list">
                                        </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;

            const cssHTML = `
                <style>
                    #sapatoto-recent-transactions { font-family: 'Exo 2', sans-serif; }
                    
                    /* Kartu Transaksi: Flexbox agar tingginya dinamis sama */
                    .tx-card {
                        background: linear-gradient(145deg, #2c3e50, #1a252f);
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 0 15px rgba(0,0,0,0.4);
                        border: 1px solid #34495e;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .tx-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 5px 20px rgba(236, 72, 153, 0.3);
                        border-color: #ec4899;
                    }

                    /* Header */
                    .tx-header {
                        padding: 12px 15px;
                        font-weight: 800;
                        color: #fff;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        background: rgba(0,0,0,0.3);
                        flex-shrink: 0; /* Cegah penyusutan */
                    }
                    .tx-header.border-pink { border-bottom: 2px solid #ec4899; text-shadow: 0 0 8px rgba(236, 72, 153, 0.6); }
                    .tx-header.border-purple { border-bottom: 2px solid #a855f7; text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }
                    .tx-icon-pink { color: #f472b6; margin-right: 8px; font-size: 1.2em; }
                    .tx-icon-purple { color: #c084fc; margin-right: 8px; font-size: 1.2em; }

                    /* Header Kolom Tabel Buatan */
                    .tx-table-header {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 15px;
                        background-color: rgba(236, 72, 153, 0.05);
                        border-bottom: 1px solid #34495e;
                        color: #bdc3c7;
                        font-weight: 700;
                        font-size: 0.8rem;
                        flex-shrink: 0;
                    }

                    /* Pembungkus Animasi (Sembunyikan scrollbar) */
                    .tx-body {
                        height: 200px; /* Persis 5 baris x 40px */
                        overflow: hidden;
                        position: relative;
                        background: transparent;
                    }

                    /* Baris Item (Dibuat tetap tingginya) */
                    .tx-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 15px;
                        height: 40px; /* Tinggi pasti per baris */
                        border-bottom: 1px solid #34495e;
                        font-size: 0.85rem;
                    }
                    .tx-item:hover { background-color: rgba(255,255,255,0.05); }

                    /* Animasi Marquee Vertikal Naik */
                    .tx-marquee {
                        transition: opacity 0.5s ease; /* Untuk refresh halus */
                        /* Menggerakkan 20 data ke atas selama 30 detik (looping infinite) */
                        animation: scrollUp 30s linear infinite;
                    }

                    /* Menggeser naik sebanyak tinggi 20 baris (20 x 40px = 800px) */
                    @keyframes scrollUp {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-800px); }
                    }

                    /* Styling Text Uang */
                    .tx-deposit {
                        color: #2ecc71;
                        font-weight: 800;
                        text-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
                    }
                    .tx-withdraw {
                        color: #fbbf24;
                        font-weight: 800;
                        text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
                        font-size: 0.95rem;
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', cssHTML);
            target.insertAdjacentHTML('afterend', widgetHTML);
            
            // Render data pertama kali
            renderTransactions();

            // Set interval refresh tiap 1 Menit (60000 ms)
            setInterval(refreshTransactions, 60000);

            return true;
        }
        return false;
    }

    // 4. JALANKAN SCRIPT
    const checkInterval = setInterval(() => {
        if (injectTransactionsWidget()) clearInterval(checkInterval);
    }, 500);

})();
