(function() {
    // 1. GENERATOR DATA PINTAR & NATURAL

    // Generator Username
    function getRandomUsername() {
        const prefixes = [
            'and','bud','cit','dew','eko','fit','gil','hen','iwa','jok','kev','luk','mar','nov','put','riz','sat','tri','vin','wid','yan','zul',
            'agu','bag','cah','dim','end','far','gun','had','ind','jam','kar','les','mah','nur','oka','pan','rah','sur','teg','unt','wah','yud',
            'bos','bro','pak','mas','mbk','cak','ban','jur','boy','roy','joy','coy','sob','gan','suh','dik','kak',
            'sri','ayu','rat','sus','lin','tin','des','mel','lia','nia','mia','tia','ria','fia','kia','cia','yul','wul',
            'hok','vip','pro','top','win','max','jpx','gac','hky','cpt'
        ];
        let base = prefixes[Math.floor(Math.random() * prefixes.length)];
        const caseType = Math.floor(Math.random() * 3);
        if (caseType === 0) base = base.toUpperCase();
        else if (caseType === 1) base = base.charAt(0).toUpperCase() + base.slice(1);

        const formatType = Math.random();
        let finalName = "";
        if (formatType < 0.40) finalName = base.substring(0, 3);
        else if (formatType < 0.70) finalName = base.substring(0, 2) + (Math.floor(Math.random() * 9) + 1);
        else if (formatType < 0.90) finalName = base.substring(0, 1) + (Math.floor(Math.random() * 89) + 10);
        else {
            const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 3; i++) finalName += chars.charAt(Math.floor(Math.random() * chars.length));
            if (caseType === 0 || caseType === 1) finalName = finalName.toUpperCase();
        }
        return finalName + '***';
    }

    // Generator Waktu Natural (Mundur ke belakang)
    function generateNaturalDate(minutesOffset) {
        const now = new Date();
        const pastTime = new Date(now.getTime() - (minutesOffset * 60000) - Math.floor(Math.random() * 60000));
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const year = pastTime.getFullYear();
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    }

    // Generator Nominal Deposit
    function getDepositAmount() {
        const prob = Math.random();
        if (prob < 0.60) {
            const amounts = [10000, 20000, 25000, 50000, 50000, 50000, 100000, 100000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        } else if (prob < 0.85) {
            const amounts = [150000, 200000, 250000, 300000, 500000, 500000, 750000, 1000000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        } else if (prob < 0.95) {
            const amounts = [1200000, 1500000, 1800000, 2000000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        } else {
            const millions = Math.floor(Math.random() * 18) + 3;
            const isHalf = Math.random() > 0.5 ? 500000 : 0;
            let result = (millions * 1000000) + isHalf;
            if (result > 20000000) result = 20000000;
            return result;
        }
    }

    // Generator Nominal Withdraw
    function getWithdrawAmount() {
        const prob = Math.random();
        if (prob < 0.50) {
            const amounts = [100000, 150000, 200000, 250000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000];
            return amounts[Math.floor(Math.random() * amounts.length)];
        } else if (prob < 0.85) {
            const millions = Math.floor(Math.random() * 5);
            const thousands = Math.floor(Math.random() * 999) + 1;
            let result = (millions * 1000000) + (thousands * 1000);
            if (result < 100000) result += 150000;
            return result;
        } else if (prob < 0.95) {
            const millions = Math.floor(Math.random() * 11) + 5;
            const isUnique = Math.random() > 0.5;
            const extra = isUnique ? (Math.floor(Math.random() * 99) + 1) * 10000 : 0; 
            return (millions * 1000000) + extra;
        } else {
            const millions = Math.floor(Math.random() * 61) + 20;
            const isUnique = Math.random() > 0.7;
            const extra = isUnique ? (Math.floor(Math.random() * 99) + 1) * 100000 : 0; 
            return (millions * 1000000) + extra;
        }
    }

    function formatIDR(angka) {
        return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
    }

    // 2. FUNGSI PEMBUAT BARIS & ANIMASI
    function renderTransactions() {
        const depList = document.getElementById('sapatoto-dep-list');
        const wdList = document.getElementById('sapatoto-wd-list');
        if (!depList || !wdList) return;

        const deps = [];
        const wds = [];
        for (let i = 0; i < 20; i++) {
            deps.push({ user: getRandomUsername(), amount: getDepositAmount(), time: generateNaturalDate(i * 2) });
            wds.push({ user: getRandomUsername(), amount: getWithdrawAmount(), time: generateNaturalDate(i * 3) });
        }

        const buildRow = (item, type) => {
            const amountClass = type === 'deposit' ? 'tx-deposit' : 'tx-withdraw';
            return `
                <div class="tx-item">
                    <div class="tx-col-user"><i class="bi bi-person-circle text-muted me-1" style="color:#a855f7 !important;"></i><span class="fw-bold text-light">${item.user}</span></div>
                    <div class="tx-col-time"><i class="bi bi-clock"></i> ${item.time}</div>
                    <div class="tx-col-amount ${amountClass}">${formatIDR(item.amount)}</div>
                </div>
            `;
        };

        const generateHTML = (arr, type) => {
            let html = '';
            arr.forEach(item => html += buildRow(item, type));
            arr.forEach(item => html += buildRow(item, type)); // Duplikat agar animasi tidak putus
            return html;
        };

        depList.innerHTML = generateHTML(deps, 'deposit');
        wdList.innerHTML = generateHTML(wds, 'withdraw');
    }

    function refreshTransactions() {
        const lists = document.querySelectorAll('.tx-marquee');
        lists.forEach(el => el.style.opacity = '0'); 
        setTimeout(() => {
            renderTransactions(); 
            lists.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; 
                el.style.animation = null; 
                el.style.opacity = '1'; 
            });
        }, 500);
    }

    // 3. FUNGSI INJEKSI KE HALAMAN
    function injectTransactionsWidget() {
        const target = document.querySelector('#pintas-widget-wrapper');
        const existing = document.getElementById('sapatoto-recent-transactions');

        if (target && !existing) {
            const widgetHTML = `
                <div id="sapatoto-recent-transactions">
                    <div class="sapatoto-trx-flex">
                        
                        <div class="trx-column">
                            <div class="tx-card d-flex flex-column">
                                <div class="tx-header border-pink">
                                    <i class="bi bi-box-arrow-in-down tx-icon-pink"></i> LIVE DEPOSIT
                                </div>
                                <div class="tx-table-header">
                                    <div class="tx-col-user">USER</div>
                                    <div class="tx-col-time" style="text-align:center;">WAKTU</div>
                                    <div class="tx-col-amount" style="text-align:right;">NOMINAL</div>
                                </div>
                                <div class="tx-body flex-grow-1">
                                    <div class="tx-marquee" id="sapatoto-dep-list"></div>
                                </div>
                            </div>
                        </div>

                        <div class="trx-column">
                            <div class="tx-card d-flex flex-column">
                                <div class="tx-header border-purple">
                                    <i class="bi bi-cash-coin tx-icon-purple"></i> LIVE WITHDRAW
                                </div>
                                <div class="tx-table-header">
                                    <div class="tx-col-user">USER</div>
                                    <div class="tx-col-time" style="text-align:center;">WAKTU</div>
                                    <div class="tx-col-amount" style="text-align:right;">NOMINAL</div>
                                </div>
                                <div class="tx-body flex-grow-1">
                                    <div class="tx-marquee" id="sapatoto-wd-list"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;

            const cssHTML = `
                <style>
                    /* KUNCI PERBAIKAN: Mengunci lebar di 1200px dan menempatkannya di tengah (Auto) */
                    #sapatoto-recent-transactions { 
                        width: 100%; 
                        max-width: 1200px !important; /* Batas maksimal selebar Pintas Widget / Container Utama */
                        margin: 0 auto 25px auto !important; /* Margin Kiri-Kanan 'auto' menempatkannya di tengah */
                        padding: 0 15px !important; /* Padding tepi kiri dan kanan */
                        box-sizing: border-box;
                        font-family: 'Exo 2', sans-serif; 
                    }

                    .sapatoto-trx-flex {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 16px; /* Jarak tengah antara dua kotak Deposit & WD */
                        width: 100%;
                        margin: 0;
                        padding: 0;
                    }

                    .trx-column {
                        flex: 1;
                        min-width: 320px; 
                        display: flex;
                        flex-direction: column;
                    }

                    .tx-card {
                        width: 100%;
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

                    .tx-header {
                        padding: 12px 15px;
                        font-weight: 800;
                        color: #fff;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        background: rgba(0,0,0,0.3);
                        flex-shrink: 0; 
                    }
                    .tx-header.border-pink { border-bottom: 2px solid #ec4899; text-shadow: 0 0 8px rgba(236, 72, 153, 0.6); }
                    .tx-header.border-purple { border-bottom: 2px solid #a855f7; text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }
                    .tx-icon-pink { color: #f472b6; margin-right: 8px; font-size: 1.2em; }
                    .tx-icon-purple { color: #c084fc; margin-right: 8px; font-size: 1.2em; }

                    .tx-table-header {
                        display: flex;
                        padding: 8px 15px;
                        background-color: rgba(236, 72, 153, 0.05);
                        border-bottom: 1px solid #34495e;
                        color: #bdc3c7;
                        font-weight: 700;
                        font-size: 0.8rem;
                        flex-shrink: 0;
                    }

                    .tx-item {
                        display: flex;
                        align-items: center;
                        padding: 0 15px;
                        height: 40px; 
                        border-bottom: 1px solid #34495e;
                        font-size: 0.85rem;
                    }
                    .tx-item:hover { background-color: rgba(255,255,255,0.05); }

                    .tx-col-user { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .tx-col-time { flex: 1.2; text-align: center; color: #bdc3c7; font-size: 0.75rem; }
                    .tx-col-amount { flex: 1; text-align: right; }

                    .tx-body {
                        height: 200px; 
                        overflow: hidden;
                        position: relative;
                        background: transparent;
                    }
                    .tx-marquee {
                        transition: opacity 0.5s ease;
                        animation: scrollUp 30s linear infinite;
                    }
                    @keyframes scrollUp {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-800px); } 
                    }

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

                    /* RESPONSIVE UNTUK HP */
                    @media (max-width: 768px) {
                        .tx-col-time { font-size: 0.65rem; }
                        .tx-item { font-size: 0.75rem; padding: 0 10px; }
                        .tx-table-header { padding: 8px 10px; font-size: 0.7rem; }
                        #sapatoto-recent-transactions { padding: 0 15px !important; }
                    }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', cssHTML);
            target.insertAdjacentHTML('afterend', widgetHTML);
            
            renderTransactions();
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
