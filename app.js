// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    /* --- ランダム化処理 --- */
    // 1. モデルのリスト
    const models = [
      /*{
            src: 'assets/kara_color.glb',      // Android用
            iosSrc: 'assets/kara_color.usdz', // iPhone用
            alt: 'カラー',
            poster: 'assets/color_texture.png'
        },*/
        {
            src: 'assets/kala_1.glb',
            iosSrc: 'assets/kara_color2.usdz',
            alt: '1',
            poster: 'assets/color_texture2.png'
        },
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
