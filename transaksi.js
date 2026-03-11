(function() {
    // 1. GENERATOR DATA PINTAR
    function getRandomUsername() {
        const prefixes = ['and','bud','cit','dew','eko','fit','gil','hen','iwa','jok','kev','luk','mar','nov','put','riz','sat','tri','vin','wid','yan','zul','agu','bag','cah','dim','end','far','gun','had','ind','jam','kar','les','mah','nur','oka','pan','rah','sur','teg','unt','wah','yud','bos','bro','pak','mas','mbk','cak','ban','jur','boy','roy','joy','coy','sob','gan','suh','dik','kak','sri','ayu','rat','sus','lin','tin','des','mel','lia','nia','mia','tia','ria','fia','kia','cia','yul','wul','hok','vip','pro','top','win','max','jpx','gac','hky','cpt'];
        let base = prefixes[Math.floor(Math.random() * prefixes.length)];
        const caseType = Math.floor(Math.random() * 3);
        if (caseType === 0) base = base.toUpperCase(); else if (caseType === 1) base = base.charAt(0).toUpperCase() + base.slice(1);
        const formatType = Math.random(); let finalName = "";
        if (formatType < 0.40) finalName = base.substring(0, 3); else if (formatType < 0.70) finalName = base.substring(0, 2) + (Math.floor(Math.random() * 9) + 1); else if (formatType < 0.90) finalName = base.substring(0, 1) + (Math.floor(Math.random() * 89) + 10);
        else { const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'; for (let i = 0; i < 3; i++) finalName += chars.charAt(Math.floor(Math.random() * chars.length)); if (caseType === 0 || caseType === 1) finalName = finalName.toUpperCase(); }
        return finalName + '***';
    }

    function generateNaturalDate(minutesOffset) {
        const pastTime = new Date(new Date().getTime() - (minutesOffset * 60000) - Math.floor(Math.random() * 60000));
        return `${String(pastTime.getDate()).padStart(2, '0')}/${String(pastTime.getMonth() + 1).padStart(2, '0')}/${pastTime.getFullYear()} ${String(pastTime.getHours()).padStart(2, '0')}:${String(pastTime.getMinutes()).padStart(2, '0')}:${String(pastTime.getSeconds()).padStart(2, '0')}`;
    }

    function getDepositAmount() {
        const prob = Math.random();
        if (prob < 0.60) return [10000, 20000, 25000, 50000, 50000, 50000, 100000, 100000][Math.floor(Math.random() * 8)]; 
        else if (prob < 0.85) return [150000, 200000, 250000, 300000, 500000, 500000, 750000, 1000000][Math.floor(Math.random() * 8)]; 
        else if (prob < 0.95) return [1200000, 1500000, 1800000, 2000000][Math.floor(Math.random() * 4)]; 
        else { let res = ((Math.floor(Math.random() * 18) + 3) * 1000000) + (Math.random() > 0.5 ? 500000 : 0); return res > 20000000 ? 20000000 : res; }
    }

    function getWithdrawAmount() {
        const prob = Math.random();
        if (prob < 0.50) return [100000, 150000, 200000, 250000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000][Math.floor(Math.random() * 11)]; 
        else if (prob < 0.85) { let res = (Math.floor(Math.random() * 5) * 1000000) + ((Math.floor(Math.random() * 999) + 1) * 1000); return res < 100000 ? res + 150000 : res; } 
        else if (prob < 0.95) return (Math.floor(Math.random() * 11) + 5) * 1000000 + (Math.random() > 0.5 ? (Math.floor(Math.random() * 99) + 1) * 10000 : 0); 
        else return (Math.floor(Math.random() * 61) + 20) * 1000000 + (Math.random() > 0.7 ? (Math.floor(Math.random() * 99) + 1) * 100000 : 0);
    }

    function formatIDR(angka) { return "Rp " + new Intl.NumberFormat('id-ID').format(angka); }

    // 2. RENDER BARIS TRANSAKSI
    function renderTransactions() {
        const depList = document.getElementById('sapatoto-dep-list-v2');
        const wdList = document.getElementById('sapatoto-wd-list-v2');
        if (!depList || !wdList) return;

        let deps = '', wds = '';
        for (let i = 0; i < 20; i++) {
            let userDep = getRandomUsername(), amtDep = formatIDR(getDepositAmount()), timeDep = generateNaturalDate(i * 2);
            let userWd = getRandomUsername(), amtWd = formatIDR(getWithdrawAmount()), timeWd = generateNaturalDate(i * 3);
            deps += `<div class="tx-item"><div class="tx-col-user"><i class="bi bi-person-circle me-1" style="color:#ec4899 !important;"></i><span class="fw-bold text-light">${userDep}</span></div><div class="tx-col-time"><i class="bi bi-clock"></i> ${timeDep}</div><div class="tx-col-amount tx-deposit">${amtDep}</div></div>`;
            wds += `<div class="tx-item"><div class="tx-col-user"><i class="bi bi-person-circle me-1" style="color:#a855f7 !important;"></i><span class="fw-bold text-light">${userWd}</span></div><div class="tx-col-time"><i class="bi bi-clock"></i> ${timeWd}</div><div class="tx-col-amount tx-withdraw">${amtWd}</div></div>`;
        }
        depList.innerHTML = deps + deps; wdList.innerHTML = wds + wds;
    }

    // 3. INJEKSI MESIN V2
    function injectTransactionsWidget() {
        const target = document.querySelector('#pintas-widget-wrapper');
        if (!target || document.getElementById('sapatoto-trx-engine-v2')) return false;

        // MENGHAPUS VERSI LAMA JIKA MASIH MENYANGKUT DI BROWSER USER
        document.querySelectorAll('#sapatoto-recent-transactions').forEach(el => el.remove());

        const widgetHTML = `
            <div id="sapatoto-trx-engine-v2">
                <div class="trx-inner-wrapper">
                    <div class="sapatoto-trx-flex">
                        <div class="trx-column">
                            <div class="tx-card tx-card-deposit d-flex flex-column">
                                <div class="tx-header border-pink"><i class="bi bi-box-arrow-in-down tx-icon-pink"></i> LIVE DEPOSIT</div>
                                <div class="tx-table-header header-pink"><div class="tx-col-user">USER</div><div class="tx-col-time" style="text-align:center;">WAKTU</div><div class="tx-col-amount" style="text-align:right;">NOMINAL</div></div>
                                <div class="tx-body flex-grow-1"><div class="tx-marquee" id="sapatoto-dep-list-v2"></div></div>
                            </div>
                        </div>
                        <div class="trx-column">
                            <div class="tx-card tx-card-withdraw d-flex flex-column">
                                <div class="tx-header border-purple"><i class="bi bi-cash-coin tx-icon-purple"></i> LIVE WITHDRAW</div>
                                <div class="tx-table-header header-purple"><div class="tx-col-user">USER</div><div class="tx-col-time" style="text-align:center;">WAKTU</div><div class="tx-col-amount" style="text-align:right;">NOMINAL</div></div>
                                <div class="tx-body flex-grow-1"><div class="tx-marquee" id="sapatoto-wd-list-v2"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cssHTML = `
            <style>
                /* DINDING PEMISAH MUTLAK (Mencegah Overlap) */
                #sapatoto-trx-engine-v2 { 
                    display: block !important;
                    width: 100% !important; 
                    max-width: 1296px !important; 
                    margin: 0 auto 15px auto !important; 
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    clear: both !important;
                    overflow: hidden !important; 
                    position: relative !important;
                    z-index: 20 !important;
                }

                .trx-inner-wrapper { padding: 0 8px; width: 100%; box-sizing: border-box; }
                .sapatoto-trx-flex { display: flex; flex-wrap: wrap; gap: 16px; width: 100%; margin: 0; padding: 0; }
                .trx-column { flex: 1; min-width: 320px; display: flex; flex-direction: column; }

                .tx-card { width: 100%; background: linear-gradient(145deg, #2c3e50, #1a252f); border-radius: 4px !important; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .tx-card-deposit { box-shadow: 0 0 15px rgba(236, 72, 153, 0.4); border: 1px solid #ec4899; }
                .tx-card-withdraw { box-shadow: 0 0 15px rgba(168, 85, 247, 0.4); border: 1px solid #a855f7; }

                .tx-header { padding: 12px 15px; font-weight: 800; color: #fff; text-align: center; text-transform: uppercase; letter-spacing: 1px; background: rgba(0,0,0,0.3); flex-shrink: 0; }
                .tx-header.border-pink { border-bottom: 2px solid #ec4899; text-shadow: 0 0 8px rgba(236, 72, 153, 0.6); }
                .tx-header.border-purple { border-bottom: 2px solid #a855f7; text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }
                .tx-icon-pink { color: #f472b6; margin-right: 8px; font-size: 1.2em; }
                .tx-icon-purple { color: #c084fc; margin-right: 8px; font-size: 1.2em; }

                .tx-table-header { display: flex; padding: 8px 15px; color: #ffffff !important; font-weight: 900; font-size: 0.8rem; flex-shrink: 0; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
                .header-pink { background: linear-gradient(90deg, #be185d, #ec4899); border-bottom: 2px solid #9d174d; }
                .header-purple { background: linear-gradient(90deg, #7e22ce, #a855f7); border-bottom: 2px solid #581c87; }

                .tx-item { display: flex; align-items: center; padding: 0 15px; height: 40px; border-bottom: 1px solid #34495e; font-size: 0.85rem; }
                .tx-col-user { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .tx-col-time { flex: 1.2; text-align: center; color: #bdc3c7; font-size: 0.75rem; }
                .tx-col-amount { flex: 1; text-align: right; }

                .tx-body { height: 200px; overflow: hidden; position: relative; background: transparent; }
                .tx-marquee { transition: opacity 0.5s ease; animation: scrollUp 30s linear infinite; }
                @keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-800px); } }

                .tx-deposit { color: #2ecc71; font-weight: 800; text-shadow: 0 0 5px rgba(46, 204, 113, 0.5); }
                .tx-withdraw { color: #fbbf24; font-weight: 800; text-shadow: 0 0 5px rgba(251, 191, 36, 0.5); font-size: 0.95rem; }

                @media (max-width: 768px) {
                    #sapatoto-trx-engine-v2 { max-width: 100% !important; padding: 0 !important; }
                    .trx-inner-wrapper { padding: 0 !important; }
                    .sapatoto-trx-flex { gap: 15px; }
                    .tx-col-time { font-size: 0.65rem; }
                    .tx-item { font-size: 0.75rem; padding: 0 10px; }
                    .tx-table-header { padding: 8px 10px; font-size: 0.7rem; }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', cssHTML);
        target.insertAdjacentHTML('afterend', widgetHTML);
        renderTransactions();
        setInterval(() => {
            const lists = document.querySelectorAll('.tx-marquee');
            lists.forEach(el => el.style.opacity = '0'); 
            setTimeout(() => { renderTransactions(); lists.forEach(el => { el.style.animation = 'none'; el.offsetHeight; el.style.animation = null; el.style.opacity = '1'; }); }, 500);
        }, 60000);
        return true;
    }

    const checkInterval = setInterval(() => { if (injectTransactionsWidget()) clearInterval(checkInterval); }, 300);
})();

