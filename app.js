// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. 設定と初期化 ---
    const dom = {
        pcWarning: document.querySelector('.pc-warning') || document.getElementById('pc-warning'),
        browserWarning: document.querySelector('.browser-warning') || document.getElementById('browser-warning'),
        content: document.querySelector('.main-content'),
        arButton: document.getElementById('ar-summon-btn') || document.querySelector('.ar-summon-button'),
        copyBtn: document.getElementById('copy-url-btn'),
        modelViewer: document.getElementById('random-model'),
        bgm: document.getElementById('bgm'),
        unmuteButton: document.getElementById('unmute-button')
    };

    // 1. デバイス判定と表示切り替えを実行
    checkDeviceAndRender();

    // 2. モデルのランダム選択
    setupRandomModel();

    // 3. BGM設定
    setupBGM();

    // 4. URLコピー機能の設定
    setupCopyButton();


    /**
     * デバイスとブラウザの判定ロジック
     */
    function checkDeviceAndRender() {
        const ua = navigator.userAgent.toLowerCase();
        
        // スマホ・タブレット判定
        const isSmartDevice = /iphone|ipad|ipod|android/.test(ua) || (ua.indexOf('macintosh') > -1 && 'ontouchend' in document);

        // アプリ内ブラウザ判定 (LINE, Instagram, Facebook, TikTok など)
        const isInAppBrowser = /line|instagram|fbav|facebook|tiktok|fban/.test(ua);

        // --- 条件分岐 ---
        if (!isSmartDevice) {
            // A. PCの場合
            // メインコンテンツを隠し、PC警告を表示
            if (dom.content) dom.content.style.display = 'none';
            if (dom.pcWarning) dom.pcWarning.style.display = 'flex';
        } 
        else {
            // B. スマホの場合
            // メインコンテンツはCSSで最初から表示されているので何もしなくてOK（念のためblock指定してもよい）
            if (dom.content) dom.content.style.display = 'block';

            if (isInAppBrowser) {
                // B-1. アプリ内ブラウザの場合 -> 警告を表示、ARボタンは非表示
                if (dom.browserWarning) dom.browserWarning.style.display = 'block';
                if (dom.arButton) dom.arButton.style.display = 'none';
            } else {
                // B-2. 通常ブラウザの場合 -> ARボタンを表示
                if (dom.arButton) dom.arButton.style.display = 'block';
                if (dom.browserWarning) dom.browserWarning.style.display = 'none';
            }
        }
    }

    /**
     * モデルのランダム選択処理
     */
    function setupRandomModel() {
        if (!dom.modelViewer) return;

        const models = [
            {
                src: 'assets/kala_1.glb',
                iosSrc: 'assets/kala_1.usdz',
                alt: '1',
                poster: 'assets/color_texture.png'
            },
            {
                src: 'assets/kala_2.glb',
                iosSrc: 'assets/kala_2.usdz',
                alt: '2',
                poster: 'assets/color_texture2.png'
            },
            {
                src: 'assets/kala_3.glb',
                iosSrc: 'assets/kala_3.usdz',
                alt: '3',
                poster: 'assets/color_texture2.png'
            },
            {
                src: 'assets/kala_4.glb',
                iosSrc: 'assets/kala_4.usdz',
                alt: '4',
                poster: 'assets/color_texture2.png'
            }
        ];

        const selected = models[Math.floor(Math.random() * models.length)];

        dom.modelViewer.src = selected.src;
        dom.modelViewer.alt = selected.alt;
        
        if (selected.iosSrc) {
            dom.modelViewer.setAttribute('ios-src', selected.iosSrc);
        }
        if (selected.poster) {
            dom.modelViewer.poster = selected.poster;
        }
    }

    /**
     * BGM再生・切り替え処理
     */
    function setupBGM() {
        if (!dom.bgm || !dom.unmuteButton) return;

        dom.bgm.volume = 0.5;

        // 自動再生を試みる（ミュートで）
        dom.bgm.play().catch(e => console.log("Autoplay blocked:", e));

        dom.unmuteButton.addEventListener('click', () => {
            if (dom.bgm.muted) {
                // ONにする
                dom.bgm.muted = false;
                dom.bgm.play().catch(e => console.error(e));
                dom.unmuteButton.textContent = '🔊 サウンド ON';
                dom.unmuteButton.style.backgroundColor = "#ff3366";
                dom.unmuteButton.style.borderColor = "#ff3366";
            } else {
                // OFFにする
                dom.bgm.muted = true;
                dom.unmuteButton.textContent = '🔇 サウンド OFF';
                dom.unmuteButton.style.backgroundColor = "rgba(50, 50, 50, 0.8)";
                dom.unmuteButton.style.borderColor = "rgba(255,255,255,0.2)";
            }
        });
    }

    /**
     * URLコピーボタンの処理
     */
    function setupCopyButton() {
        if (!dom.copyBtn) return;

        dom.copyBtn.addEventListener('click', () => {
            const url = window.location.href;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    alert('URLをコピーしました！\nSafariやChromeのアドレスバーに貼り付けてください。');
                }).catch(() => {
                    prompt('以下のURLをコピーしてください:', url);
                });
            } else {
                // クリップボードAPI非対応の場合
                prompt('以下のURLをコピーしてください:', url);
            }
        });
    }

});