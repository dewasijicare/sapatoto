(function() {
    // CSS untuk styling panel member baru (TEMA SAPATOTO: DARK, NEON PINK & PURPLE)
    const panelStyles = `
        #member-status-panel.gavan-member-panel-enhanced {
            /* === WARNA BACKGROUND TEMA SAPATOTO === */
            background: linear-gradient(145deg, #2c3e50, #1a252f) !important;
            border: 1px solid #ec4899 !important; /* Border Pink Sapatoto */
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.4) !important; /* Glow Pink */
            /* ==================================== */
            border-radius: 12px !important;
            padding: 0.8rem 1rem !important;
            color: #ecf0f1 !important;
            display: flex;
            flex-direction: column;
            gap: 0.6rem !important;
            transition: all 0.3s ease;
        }

        #member-status-panel.gavan-member-panel-enhanced:hover {
             box-shadow: 0 5px 25px rgba(236, 72, 153, 0.6) !important; 
             transform: translateY(-2px);
        }

        .gmp-top-area {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            align-items: baseline;
            width: 100%;
            row-gap: 0.2rem;
            column-gap: 0.5rem;
        }

        .gmp-balance-label {
            grid-column: 1; grid-row: 1;
            font-size: 0.75em;
            font-weight: 600;
            color: #bdc3c7 !important; /* Abu-abu terang agar elegan */
            line-height: 1.1;
            text-transform: uppercase;
            text-align: left;
            align-self: end;
            letter-spacing: 0.5px;
        }

        .gmp-user-id-label {
            grid-column: 2; grid-row: 1;
            font-size: 0.75em;
            font-weight: 600;
            color: #bdc3c7 !important;
            line-height: 1.1;
            text-transform: uppercase;
            text-align: right;
            align-self: end;
            letter-spacing: 0.5px;
        }

        /* Styling untuk Nilai Saldo */
        .gmp-balance-value {
            grid-column: 1; grid-row: 2;
            font-size: 1.4em !important; 
            font-weight: 700 !important;
            line-height: 1 !important;
            color: #fff !important; /* Putih bersih */
            text-shadow: 0 0 8px rgba(255,255,255,0.4);
            display: inline-flex;
            align-items: baseline;
            white-space: nowrap;
            text-align: left;
            align-self: start;
        }
        
         /* Label Mata Uang IDR */
         .gmp-balance-value .currency-label {
             font-size: 0.55em;
             vertical-align: baseline;
             margin-left: 4px;
             font-weight: 700; 
             color: #f472b6 !important; /* Neon Pink Sapatoto */
             text-shadow: 0 0 5px rgba(244, 114, 182, 0.6);
         }

        /* Styling ikon mata (Toggle Saldo) */
        .gmp-balance-value .balance-toggle-icon {
            font-size: 0.8em !important;
            margin-left: 8px !important;
            cursor: pointer;
            color: #a855f7 !important; /* Ungu Sapatoto */
            vertical-align: middle;
            transition: all 0.2s ease;
        }
         .gmp-balance-value .balance-toggle-icon:hover {
             color: #c084fc !important; /* Ungu lebih cerah saat hover */
             text-shadow: 0 0 8px #a855f7;
         }

        /* Styling untuk Nama Username */
         .gmp-user-id-value {
             grid-column: 2; grid-row: 2;
             font-size: 1.2em !important; 
             font-weight: 700 !important;
             color: #a855f7 !important; /* Ungu Sapatoto */
             text-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
             line-height: 1 !important;
             text-align: right;
             align-self: start;
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
             max-width: 150px; 
        }

         /* Kontainer untuk tombol */
         .gmp-buttons-container {
             display: flex;
             justify-content: space-between;
             gap: 0.6rem !important;
             width: 100%;
             margin-top: 0.5rem !important; 
         }

         /* Styling dasar tombol aksi */
         .gmp-action-btn {
             flex: 1;
             padding: 0.4rem 0.5rem !important;
             font-size: 0.85em !important;
             font-weight: 700 !important;
             text-transform: uppercase;
             display: flex;
             align-items: center;
             justify-content: center;
             gap: 6px;
             border-radius: 6px !important;
             white-space: nowrap;
             border: none !important;
             transition: all 0.3s ease !important;
             text-decoration: none !important;
         }

         /* Tombol Deposit (Gradien Pink Sapatoto) */
          .gmp-action-btn.btn-primary {
             background: linear-gradient(45deg, #be185d, #ec4899) !important;
             color: #fff !important;
             box-shadow: 0 0 10px rgba(236, 72, 153, 0.6), inset 0 0 5px rgba(255,255,255,0.3) !important;
          }
          .gmp-action-btn.btn-primary:hover {
              background: linear-gradient(45deg, #ec4899, #be185d) !important;
              box-shadow: 0 0 15px rgba(236, 72, 153, 0.8), 0 0 25px rgba(190, 24, 93, 0.6), inset 0 0 5px rgba(255,255,255,0.5) !important;
              transform: translateY(-2px) scale(1.02);
              color: #fff !important;
          }
          
           /* Tombol Withdraw (Gradien Ungu Sapatoto) */
           .gmp-action-btn.btn-secondary {
             background: linear-gradient(45deg, #a855f7, #9333ea) !important;
             color: #fff !important;
             box-shadow: 0 0 10px rgba(168, 85, 247, 0.6), inset 0 0 5px rgba(255,255,255,0.3) !important;
          }
           .gmp-action-btn.btn-secondary:hover {
             background: linear-gradient(45deg, #c084fc, #a855f7) !important;
             box-shadow: 0 0 15px rgba(168, 85, 247, 0.8), 0 0 25px rgba(147, 51, 234, 0.6), inset 0 0 5px rgba(255,255,255,0.5) !important;
             transform: translateY(-2px) scale(1.02);
             color: #fff !important;
          }

          .gmp-action-btn i.bi {
              font-size: 1.1em;
          }
    `;

    // --- FUNGSI JAVASCRIPT ---
    function styleEnhancedMemberPanel() {
        const panel = document.getElementById('member-status-panel');
        if (!panel || panel.dataset.enhanced === 'true') {
            return;
        }

        const usernameElement = panel.querySelector('strong');
        const balanceSpan = panel.querySelector('.text-gradient');
        const originalBalanceValue = balanceSpan ? balanceSpan.textContent.trim() : '0';
        const toggleIconElement = panel.querySelector('.balance-toggle-icon');

        let userId = usernameElement ? usernameElement.textContent.replace('Halo,', '').trim() : 'N/A';

        panel.innerHTML = '';

        panel.innerHTML = `
            <div class="gmp-top-area">
                <div class="gmp-balance-label">SALDO TERSEDIA</div>
                <div class="gmp-user-id-label">USERNAME</div>
                <div class="gmp-balance-value">
                    <span class="balance-value">${originalBalanceValue}</span>
                    <span class="currency-label"> IDR</span>
                    </div>
                <div class="gmp-user-id-value">${userId}</div>
            </div>
            <div class="gmp-buttons-container">
                <a href="/deposit" class="btn btn-primary gmp-action-btn"><i class="bi bi-wallet2"></i> Deposit</a>
                <a href="/withdraw" class="btn btn-secondary gmp-action-btn"><i class="bi bi-cash-coin"></i> Withdraw</a>
            </div>
        `;

        const balanceValueContainer = panel.querySelector('.gmp-balance-value');
        if (balanceValueContainer) {
            const newToggleIcon = document.createElement('i');
            newToggleIcon.className = toggleIconElement ? toggleIconElement.className : 'bi bi-eye-fill balance-toggle-icon';
            newToggleIcon.style.cursor = 'pointer';

            balanceValueContainer.appendChild(newToggleIcon);

            const valueSpan = balanceValueContainer.querySelector('.balance-value');
            const storedState = localStorage.getItem('balanceVisibility') || 'visible';

            const updateView = (state) => {
                 if (!valueSpan) return;
                 if (state === 'hidden') {
                    valueSpan.textContent = '•••••';
                    newToggleIcon.className = 'bi bi-eye-slash-fill balance-toggle-icon';
                 } else {
                    valueSpan.textContent = originalBalanceValue;
                    newToggleIcon.className = 'bi bi-eye-fill balance-toggle-icon';
                 }
                 const sidebarIcon = document.querySelector("#sidebar .balance-toggle-icon");
                 const sidebarValue = document.querySelector("#sidebar .balance-value");
                 if(sidebarIcon && sidebarValue){
                     sidebarIcon.className = newToggleIcon.className;
                     if(state === 'hidden') sidebarValue.textContent = '•••••';
                     else {
                         const sidebarOriginalValue = originalBalanceValue.replace(/[^\d.]/g, '');
                         sidebarValue.textContent = formatNumberWithCommas(sidebarOriginalValue);
                     }
                 }
            };

            newToggleIcon.addEventListener('click', (e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 const currentState = (localStorage.getItem('balanceVisibility') || 'visible');
                 const newState = currentState === 'visible' ? 'hidden' : 'visible';
                 localStorage.setItem('balanceVisibility', newState);
                 updateView(newState);
            });

             updateView(storedState);
        }

        panel.classList.add('gavan-member-panel-enhanced');
        panel.classList.remove('glassmorphism', 'py-3', 'my-3', 'text-center');
        panel.dataset.enhanced = 'true';

        console.log("Member status panel Sapatoto enhanced applied.");
    }

     function formatNumberWithCommas(val) {
        if (val === null || val === undefined) return '';
        let stringVal = val.toString().replace(/,/g, '');
        if (isNaN(stringVal) || stringVal.trim() === '') return '';
        try {
            return Number(stringVal).toLocaleString('en-US');
        } catch (e) {
            return stringVal;
        }
    }

    function injectStyles() {
        if (document.getElementById('gavan-panel-styles')) {
            return;
        }
        const styleElement = document.createElement('style');
        styleElement.id = 'gavan-panel-styles';
        styleElement.innerHTML = panelStyles;
        document.head.appendChild(styleElement);
    }

    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        styleEnhancedMemberPanel();

        const observer = new MutationObserver((mutations) => {
            const panel = document.getElementById('member-status-panel');
            if (panel && !panel.dataset.enhanced) {
                 styleEnhancedMemberPanel();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        styleEnhancedMemberPanel();
    });

    if (document.readyState === 'complete') {
         injectStyles();
         styleEnhancedMemberPanel();
    }

})();