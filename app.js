document.addEventListener('DOMContentLoaded', () => {

    // --- 0. 設定と初期化 ---
    const dom = {
        pcWarning: document.querySelector('.pc-warning') || document.getElementById('pc-warning'),
        browserWarning: document.querySelector('.browser-warning') || document.getElementById('browser-warning'),
        content: document.querySelector('.main-content'),
        arButton: document.getElementById('ar-summon-btn'),
        copyBtn: document.getElementById('copy-url-btn'),
        modelViewer: document.getElementById('random-model'),
        bgm: document.getElementById('bgm'),
        unmuteButton: document.getElementById('unmute-button'),
        langSelector: document.getElementById('language-selector')
    };

    // 翻訳データ辞書
    const translations = {
        ja: {
            pc_title: "スマートフォンでご覧ください",
            pc_desc: "このコンテンツはAR機能を使用するため、<br>スマートフォンまたはタブレットでのアクセスを推奨しています。",
            sound_on: "🔊 サウンド ON",
            sound_off: "🔇 サウンド OFF",
            summon_btn: "カラを召喚する",
            browser_title: "ブラウザを変更してください",
            browser_sub: "Please open in default browser",
            browser_desc: "現在お使いのブラウザではAR機能が制限されています。<br><strong>Safari</strong> (iPhone) または <strong>Chrome</strong> で開き直してください。",
            copy_btn: "現在のURLをコピー",
            browser_note: "※右上のメニュー等から「ブラウザで開く」を選択するか、URLをコピーして貼り付けてください。",
            copy_success: "URLをコピーしました！\nSafariやChromeのアドレスバーに貼り付けてください。",
            copy_prompt: "以下のURLをコピーしてください:"
        },
        en: {
            pc_title: "Please view on a smartphone",
            pc_sub: "",
            pc_desc: "This content uses AR features.<br>We recommend accessing it via a smartphone or tablet.",
            sound_on: "🔊 Sound ON",
            sound_off: "🔇 Sound OFF",
            summon_btn: "Summon the Kala",
            browser_title: "Please change your browser",
            browser_desc: "AR features are limited in your current browser.<br>Please reopen in <strong>Safari</strong> (iPhone) or <strong>Chrome</strong>.",
            copy_btn: "Copy Current URL",
            browser_note: "*Select 'Open in Browser' from the menu or copy the URL.",
            copy_success: "URL copied!\nPlease paste it into Safari or Chrome.",
            copy_prompt: "Please copy the following URL:"
        },
        id: {
            pc_title: "Silakan lihat di ponsel cerdas",
            pc_sub: "Please view on a smartphone",
            pc_desc: "Konten ini menggunakan fitur AR.<br>Kami menyarankan untuk mengaksesnya melalui ponsel cerdas atau tablet.",
            sound_on: "🔊 Suara HIDUP",
            sound_off: "🔇 Suara MATI",
            summon_btn: "Panggil Kala",
            browser_title: "Silakan ganti browser Anda",
            browser_desc: "Fitur AR terbatas di browser Anda saat ini.<br>Silakan buka kembali di <strong>Safari</strong> (iPhone) atau <strong>Chrome</strong>.",
            copy_btn: "Salin URL Saat Ini",
            browser_note: "*Pilih 'Buka di Browser' dari menu atau salin URL.",
            copy_success: "URL disalin!\nSilakan tempel di Safari atau Chrome.",
            copy_prompt: "Silakan salin URL berikut:"
        },
        zh: {
            pc_title: "请在智能手机上查看",
            pc_desc: "此内容使用AR功能。<br>我们建议通过智能手机或平板电脑访问。",
            sound_on: "🔊 声音开启",
            sound_off: "🔇 声音关闭",
            summon_btn: "召唤Kala",
            browser_title: "请更换浏览器",
            browser_desc: "您当前的浏览器限制了AR功能。<br>请在 <strong>Safari</strong> (iPhone) 或 <strong>Chrome</strong> 中重新打开。",
            copy_btn: "复制当前链接",
            browser_note: "*请从菜单中选择“在浏览器中打开”或复制链接。",
            copy_success: "链接已复制！\n请粘贴到 Safari 或 Chrome 中。",
            copy_prompt: "请复制以下链接："
        }
    };

    // 現在の言語（初期値は日本語）
    let currentLang = 'ja';

    // --- 1. デバイス判定と表示 ---
    checkDeviceAndRender();

    // --- 2. モデルのランダム選択 ---
    setupRandomModel();

    // --- 3. BGM設定 ---
    setupBGM();

    // --- 4. URLコピー機能 ---
    setupCopyButton();

    // --- 5. 多言語対応の初期化 ---
    setupLanguage();


    /**
     * 多言語対応のセットアップ
     */
    function setupLanguage() {
        // ブラウザの言語設定を取得 (例: "en-US" -> "en")
        const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
        
        // サポートしている言語ならそれに設定、なければ日本語
        if (translations[browserLang]) {
            currentLang = browserLang;
        } else {
            currentLang = 'ja';
        }

        // セレクトボックスに反映
        if (dom.langSelector) {
            dom.langSelector.value = currentLang;
            
            // 変更イベント
            dom.langSelector.addEventListener('change', (e) => {
                currentLang = e.target.value;
                updateTexts();
            });
        }

        // 初回テキスト更新
        updateTexts();
    }

    /**
     * 画面上のテキストを現在の言語に更新
     */
    function updateTexts() {
        const t = translations[currentLang];
        
        // data-i18n属性を持つ要素をすべて取得して書き換え
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                // sound_on/off はボタンの状態によって変わるのでここでは除外
                if (key === 'sound_on' || key === 'sound_off') return;
                
                // HTMLタグを含むテキストに対応 (browser_descなど)
                el.innerHTML = t[key];
            }
        });

        // サウンドボタンのテキスト更新（現在のミュート状態に合わせて）
        updateSoundButtonText();
    }

    /**
     * サウンドボタンのテキストだけを更新するヘルパー
     */
    function updateSoundButtonText() {
        if (!dom.unmuteButton || !dom.bgm) return;
        const t = translations[currentLang];
        
        if (dom.bgm.muted) {
            dom.unmuteButton.textContent = t.sound_off;
        } else {
            dom.unmuteButton.textContent = t.sound_on;
        }
    }


    /**
     * デバイス判定
     */
    function checkDeviceAndRender() {
        const ua = navigator.userAgent.toLowerCase();
        const isSmartDevice = /iphone|ipad|ipod|android/.test(ua) || (ua.indexOf('macintosh') > -1 && 'ontouchend' in document);
        const isInAppBrowser = /line|instagram|fbav|facebook|tiktok|fban/.test(ua);

        if (!isSmartDevice) {
            if (dom.content) dom.content.style.display = 'none';
            if (dom.pcWarning) dom.pcWarning.style.display = 'flex';
        } else {
            if (dom.content) dom.content.style.display = 'block';
            if (isInAppBrowser) {
                if (dom.browserWarning) dom.browserWarning.style.display = 'block';
                if (dom.arButton) dom.arButton.style.display = 'none';
            } else {
                if (dom.arButton) dom.arButton.style.display = 'block';
                if (dom.browserWarning) dom.browserWarning.style.display = 'none';
            }
        }
    }

    /**
     * ランダムモデル
     */
    function setupRandomModel() {
        if (!dom.modelViewer) return;
        const models = [
            { src: 'assets/kala_1.glb', iosSrc: 'assets/kala_1.usdz', alt: '1', poster: 'assets/color_texture2.png' },
            { src: 'assets/kala_2.glb', iosSrc: 'assets/kala_2.usdz', alt: '2', poster: 'assets/color_texture2.png' },
            { src: 'assets/kala_3.glb', iosSrc: 'assets/kala_3.usdz', alt: '3', poster: 'assets/color_texture2.png' },
            { src: 'assets/kala_4.glb', iosSrc: 'assets/kala_4.usdz', alt: '4', poster: 'assets/color_texture2.png' }
        ];
        const selected = models[Math.floor(Math.random() * models.length)];
        dom.modelViewer.src = selected.src;
        dom.modelViewer.alt = selected.alt;
        if (selected.iosSrc) dom.modelViewer.setAttribute('ios-src', selected.iosSrc);
        if (selected.poster) dom.modelViewer.poster = selected.poster;
    }

    /**
     * BGM制御
     */
    function setupBGM() {
        if (!dom.bgm || !dom.unmuteButton) return;
        dom.bgm.volume = 0.5;
        dom.bgm.play().catch(e => console.log("Autoplay blocked:", e));

        dom.unmuteButton.addEventListener('click', () => {
            if (dom.bgm.muted) {
                // ONにする
                dom.bgm.muted = false;
                dom.bgm.play().catch(e => console.error(e));
                dom.unmuteButton.style.backgroundColor = "#ff3366";
                dom.unmuteButton.style.borderColor = "#ff3366";
            } else {
                // OFFにする
                dom.bgm.muted = true;
                dom.unmuteButton.style.backgroundColor = "rgba(50, 50, 50, 0.8)";
                dom.unmuteButton.style.borderColor = "rgba(255,255,255,0.3)";
            }
            // 言語に合わせてテキスト更新
            updateSoundButtonText();
        });
    }

    /**
     * URLコピー
     */
    function setupCopyButton() {
        if (!dom.copyBtn) return;
        dom.copyBtn.addEventListener('click', () => {
            const url = window.location.href;
            const t = translations[currentLang]; // 現在の言語のメッセージを使う
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    alert(t.copy_success);
                }).catch(() => {
                    prompt(t.copy_prompt, url);
                });
            } else {
                prompt(t.copy_prompt, url);
            }
        });
    }

});