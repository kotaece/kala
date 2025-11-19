// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    // 1. ページ読み込み時にデバイス判定を実行
    checkDevice();

    /**
     * デバイス判定ロジック
     * UserAgentとタッチポイントを見て、スマホ/タブレットかPCかを判定する
     */
    function checkDevice() {
        var ua = navigator.userAgent;
        var isSmartDevice = false;

        // A. 一般的なスマホ（iPhone, Androidスマホ）の判定
        if (ua.indexOf('iPhone') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
            isSmartDevice = true;
        }
        // B. iPad（およびAndroidタブレット）の判定
        // "iPad"という文字が含まれる か "Macintosh"だがタッチポイントがある場合(iPadOS 13以降対策)
        else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 || (ua.indexOf('Macintosh') > 0 && navigator.maxTouchPoints > 1)) {
            isSmartDevice = true;
        }

        // 要素の取得
        var warning = document.querySelector('.pc-warning');
        var content = document.querySelector('.main-content');

        if (isSmartDevice) {
            // --- スマホ・タブレットの場合 ---
            if (warning) warning.style.display = 'none';
            if (content) content.style.display = 'flex'; // レイアウト崩れ防止のためflex指定
        } else {
            // --- PCの場合 ---
            if (warning) warning.style.display = 'block';
            if (content) content.style.display = 'none';
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