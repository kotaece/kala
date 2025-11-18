// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

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
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('sound-toggle');
        const bgm = document.getElementById('bgm');

        // スイッチが切り替わった時の処理
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                // ONの時
                bgm.muted = false;
                bgm.play().catch(e => {
                    console.log("再生エラー: ユーザー操作が必要です", e);
                    // 万が一再生に失敗した場合、スイッチをOFFに戻す
                    toggle.checked = false;
                });
            } else {
                // OFFの時
                bgm.pause();
                // または bgm.muted = true; だけでもOK
            }
        });
    });

});
