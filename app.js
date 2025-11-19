// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {


    /* --- デバイス確認 --- */
    function checkDevice() {
        var ua = navigator.userAgent;
        var isSmartDevice = false;

        // 1. 一般的なスマホ（iPhone, Androidスマホ）の判定
        if (ua.indexOf('iPhone') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
            isSmartDevice = true;
        }
        // 2. iPad（およびAndroidタブレット）の判定
        // "iPad"という文字が含まれる か "Macintosh"だがタッチポイントがある場合
        else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 || (ua.indexOf('Macintosh') > 0 && navigator.maxTouchPoints > 1)) {
            isSmartDevice = true;
        }

        // 表示の切り替え処理
        var warning = document.querySelector('.pc-warning'); // 警告文の要素
        var content = document.querySelector('.main-content'); // メインコンテンツ

        if (isSmartDevice) {
            // スマホ・タブレットの場合
            if(warning) warning.style.display = 'none';
            if(content) content.style.display = 'flex'; // または block
        } else {
            // PCの場合
            if(warning) warning.style.display = 'block';
            if(content) content.style.display = 'none';
        }
    }

    /* --- ランダム化処理 --- */
    // 1. モデルのリスト
    const models = [
       {
            src: 'assets/kala_1.glb',      // Android用
            iosSrc: 'assets/kala_1.usdz', // iPhone用
            alt: '1',
            poster: 'assets/color_texture.png'
        },
        {
            src: 'assets/kala_1.glb',
            iosSrc: 'assets/kala_1.usdz',
            alt: '1',
            poster: 'assets/color_texture2.png'
        }//,
        /*{
            src: 'assets/kara_white.glb',
            iosSrc: 'assets/kara_white.usdz',
            alt: '白',
            poster: 'assets/white_texture.png'
        }*/
    ];
    // 2. リストからランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * models.length);
    const selectedModel = models[randomIndex];

    // 3. model-viewer 要素を取得
    const modelViewer = document.getElementById('random-model');

    // 4. 取得した要素の属性を書き換える (ios-src を追加)
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
    /* --- ランダム化処理ここまで --- */


    /* --- 
        ここからBGM処理を追記 
    --- */

    /// 1. HTMLから audio 要素とボタンを取得
    const bgm = document.getElementById('bgm');
    const unmuteButton = document.getElementById('unmute-button');
    bgm.volume = 0.5; 

    // 2. ページ読み込みと同時に「ミュート状態で」再生
    // (ミュート状態ならブラウザはブロックしない)
    bgm.play().catch(error => {
        // (基本的には成功するが、念のためエラーハンドリング)
        console.error("ミュート再生にも失敗しました:", error);
    });

    // 3. ミュート解除ボタンが押された時の処理
    unmuteButton.addEventListener('click', () => {
        if (bgm.muted) {
            // ミュートを解除
            bgm.muted = false;
            unmuteButton.textContent = '🔈 サウンド OFF';
        } else {
            // 再度ミュートする
            bgm.muted = true;
            unmuteButton.textContent = '🔊 サウンド ON';
        }
    });

});
