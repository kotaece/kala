// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    // 1. ページ読み込み時にデバイス判定を実行
    checkDevice();

    /**
     * デバイスとブラウザの判定ロジック
     */
    function checkDevice() {
        // UserAgentを小文字にして取得（判定しやすくするため）
        var ua = navigator.userAgent.toLowerCase();
        var isSmartDevice = false;

        // A. 一般的なスマホ（iPhone, Androidスマホ）の判定
        if (ua.indexOf('iphone') > 0 || (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)) {
            isSmartDevice = true;
        }
        // B. iPad（およびAndroidタブレット）の判定
        else if (ua.indexOf('ipad') > 0 || ua.indexOf('android') > 0 || (ua.indexOf('macintosh') > 0 && navigator.maxTouchPoints > 1)) {
            isSmartDevice = true;
        }

        // --- 追加: アプリ内ブラウザの判定 ---
        var isInAppBrowser = false;
        if (isSmartDevice) {
            // LINE, Instagram, Facebook(FBAV), Twitter, TikTok などの文字列が含まれているか
            if (/line|instagram|fbav|facebook|twitter|tiktok/.test(ua)) {
                isInAppBrowser = true;
            }
        }

        // 要素の取得
        var pcWarning = document.querySelector('.pc-warning');       // PC用警告
        var browserWarning = document.querySelector('.browser-warning'); // アプリ内ブラウザ用警告
        var content = document.querySelector('.main-content');       // メインコンテンツ

        // 一旦すべてのエリアを非表示にする
        if (pcWarning) pcWarning.style.display = 'none';
        if (browserWarning) browserWarning.style.display = 'none';
        if (content) content.style.display = 'none';

        // --- 条件分岐と表示切り替え ---
        if (!isSmartDevice) {
            // 1. PCの場合 -> PC用警告（QRコード）を表示
            if (pcWarning) pcWarning.style.display = 'block';
        } 
        else if (isInAppBrowser) {
            // 2. スマホだが、アプリ内ブラウザの場合 -> ブラウザ変更警告を表示
            if (browserWarning) browserWarning.style.display = 'block';
        } 
        else {
            // 3. スマホで、かつ適切なブラウザの場合 -> ARコンテンツを表示
            if (content) content.style.display = 'flex';
        }
    }


    /* --- ランダム化処理 --- */
    // 1. モデルのリスト
    const models = [
        {
            src: 'assets/kala_1.glb',       // Android用
            iosSrc: 'assets/kala_1.usdz', // iPhone用
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

    // 2. リストからランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * models.length);
    const selectedModel = models[randomIndex];

    // 3. model-viewer 要素を取得
    const modelViewer = document.getElementById('random-model');

    if (modelViewer) {
        // 4. 取得した要素の属性を書き換える
        modelViewer.src = selectedModel.src;
        modelViewer.alt = selectedModel.alt;
      
        // ios-src が定義されていれば設定する
        if (selectedModel.iosSrc) {
            modelViewer.setAttribute('ios-src', selectedModel.iosSrc);
        }
        // poster属性も設定する場合
        if (selectedModel.poster) {
            modelViewer.poster = selectedModel.poster;
        }
    }
    /* --- ランダム化処理ここまで --- */


    /* --- BGM処理 --- */

    // 1. HTMLから audio 要素とボタンを取得
    const bgm = document.getElementById('bgm');
    const unmuteButton = document.getElementById('unmute-button');
    
    if (bgm && unmuteButton) {
        bgm.volume = 0.5; 

        // 2. ページ読み込みと同時に「ミュート状態で」再生
        // (ミュート状態ならブラウザはブロックしないため)
        bgm.play().catch(error => {
            console.error("ミュート再生にも失敗しました:", error);
        });

        // 3. ミュート解除ボタンが押された時の処理
        unmuteButton.addEventListener('click', () => {
            if (bgm.muted) {
                // ミュートを解除
                bgm.muted = false;
                unmuteButton.textContent = '🔈 サウンド OFF';
                // 追加演出: ONのときは色を変える
                unmuteButton.style.backgroundColor = "#ff3366";
                unmuteButton.style.borderColor = "#ff3366";
            } else {
                // 再度ミュートする
                bgm.muted = true;
                unmuteButton.textContent = '🔊 サウンド ON';
                // 色を戻す
                unmuteButton.style.backgroundColor = "#333";
                unmuteButton.style.borderColor = "#555";
            }
        });
    }
});