(function() {
    // 1. FUNGSI PEMBUAT DATA FIKTIF YANG TERLIHAT ASLI
    
    // Generator Username Acak (Terlihat seperti nama orang Indonesia/Pemain)
    function getRandomUsername() {
        const prefixes = ['and', 'bos', 'rat', 'dew', 'put', 'jay', 'hok', 'raj', 'sat', 'bms', 'pro', 'vip', 'agu', 'bud', 'wij', 'meg', 'kus', 'adi', 'bap', 'mas', 'mbk', 'tom', 'den', 'her'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        // Tambahkan 1 atau 2 angka acak di belakangnya agar lebih natural (opsional sebelum dipotong)
        const randomNumber = Math.floor(Math.random() * 99); 
        const rawName = prefix + randomNumber.toString();
        // Ambil 3 karakter pertama dan tambahkan bintang
        return rawName.substring(0, 3) + '***';
    }

    // Generator Nominal Deposit (Fokus ke 50k dan 100k)
    function getDepositAmount() {
        // Kita perbanyak porsi 50k dan 100k di dalam array agar lebih sering muncul
        const amounts = [20000, 25000, 50000, 50000, 50000, 50000, 100000, 100000, 100000, 150000, 200000, 250000, 500000];
        return amounts[Math.floor(Math.random() * amounts.length)];
    }

    // Generator Nominal Withdraw (Acak 1 Juta - 80 Juta)
    function getWithdrawAmount() {
        const millions = Math.floor(Math.random() * 80) + 1; // 1 sampai 80
        const thousands = Math.floor(Math.random() * 1000); // 0 sampai 999
        return (millions * 1000000) + (thousands * 1000); // Contoh: 45.340.000
    }

    // Format Rupiah standar
    function formatIDR(angka) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    }

    // 2. FUNGSI PENYUSUN TABEL HTML
    function buildTableHTML(type) {
        let html = `
            <table class="table sapatoto-tx-table">
                <thead>
                    <tr>
                        <th>USER</th>
                        <th class="text-end">NOMINAL</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Buat 5 baris
        for(let i = 0; i < 5; i++) {
            const user = getRandomUsername();
            const amount = type === 'deposit' ? getDepositAmount() : getWithdrawAmount();
            const amountClass = type === 'deposit' ? 'tx-deposit' : 'tx-withdraw';
            
            html += `
                <tr>
                    <td><i class="bi bi-person-circle text-muted me-2"></i><span class="fw-bold text-light">${user}</span></td>
                    <td class="text-end ${amountClass}">${formatIDR(amount)}</td>
                </tr>
            `;
        }
        
        html += `</tbody></table>`;
        return html;
    }

    // 3. FUNGSI INJEKSI KE HALAMAN
    function injectTransactionsWidget() {
        // Target: Letakkan di bawah wrapper widget Pintas Domain
        const target = document.querySelector('#pintas-widget-wrapper');
        const existing = document.getElementById('sapatoto-recent-transactions');

        // Jika target ketemu dan tabel belum dibuat
        if (target && !existing) {
            
            // Susunan HTML 2 Kolom menggunakan Grid Bootstrap
            const widgetHTML = `
                <div id="sapatoto-recent-transactions" style="max-width: 1200px; margin: 0 auto 25px auto; padding: 0 14px;">
                    <div class="row g-3">
                        
                        <div class="col-md-6">
                            <div class="tx-card">
                                <div class="tx-header border-pink">
                                    <i class="bi bi-box-arrow-in-down tx-icon-pink"></i> 5 DEPOSIT TERAKHIR
                                </div>
                                <div class="tx-body">
                                    ${buildTableHTML('deposit')}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="tx-card">
                                <div class="tx-header border-purple">
                                    <i class="bi bi-cash-coin tx-icon-purple"></i> 5 WITHDRAW TERAKHIR
                                </div>
                                <div class="tx-body">
                                    ${buildTableHTML('withdraw')}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            `;

            // Style CSS khusus untuk tabel transaksi
            const cssHTML = `
                <style>
                    #sapatoto-recent-transactions {
                        font-family: 'Exo 2', sans-serif;
                    }
                    /* Kotak Utama */
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

                    /* Header Kotak */
                    .tx-header {
                        padding: 12px 15px;
                        font-weight: 800;
                        color: #fff;
                        text-align: center;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        background: rgba(0,0,0,0.3);
                    }
                    .tx-header.border-pink { border-bottom: 2px solid #ec4899; text-shadow: 0 0 8px rgba(236, 72, 153, 0.6); }
                    .tx-header.border-purple { border-bottom: 2px solid #a855f7; text-shadow: 0 0 8px rgba(168, 85, 247, 0.6); }
                    .tx-icon-pink { color: #f472b6; margin-right: 8px; font-size: 1.2em; }
                    .tx-icon-purple { color: #c084fc; margin-right: 8px; font-size: 1.2em; }

                    /* Desain Tabel */
                    .sapatoto-tx-table {
                        margin-bottom: 0;
                        color: #ecf0f1;
                        font-size: 0.85rem;
                    }
                    .sapatoto-tx-table th {
                        background-color: rgba(236, 72, 153, 0.05); /* Sedikit hint pink di header tabel */
                        border-bottom: 1px solid #34495e;
                        color: #bdc3c7;
                        font-weight: 700;
                        padding: 10px 15px;
                        font-size: 0.8rem;
                    }
                    .sapatoto-tx-table td {
                        background-color: transparent;
                        border-bottom: 1px solid #34495e;
                        padding: 10px 15px;
                        vertical-align: middle;
                    }
                    .sapatoto-tx-table tr:last-child td {
                        border-bottom: none; /* Hilangkan garis di baris terbawah */
                    }
                    .sapatoto-tx-table tbody tr:hover td {
                        background-color: rgba(255,255,255,0.05); /* Efek nyala saat baris disentuh */
                    }
                    
                    /* Warna Nominal Uang */
                    .tx-deposit {
                        color: #2ecc71; /* Hijau Terang khas Deposit sukses */
                        font-weight: 800;
                        text-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
                    }
                    .tx-withdraw {
                        color: #fbbf24; /* Kuning Emas khas JP/Withdraw besar */
                        font-weight: 800;
                        text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
                        font-size: 0.95rem; /* Nominal WD dibuat sedikit lebih besar */
                    }
                </style>
            `;

            // Suntikkan CSS dan HTML
            document.head.insertAdjacentHTML('beforeend', cssHTML);
            target.insertAdjacentHTML('afterend', widgetHTML);
            
            return true;
        }
        return false;
    }

    // 4. JALANKAN SCRIPT
    // Gunakan interval kecil untuk menunggu widget Pintas Domain dirender terlebih dahulu
    const checkInterval = setInterval(() => {
        if (injectTransactionsWidget()) {
            clearInterval(checkInterval); // Berhenti mengecek jika sudah berhasil dimunculkan
        }
    }, 500);

})();