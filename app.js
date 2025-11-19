document.addEventListener('DOMContentLoaded', () => {
    // 1. デバイス判定を実行
    checkDevice();

    // 2. サウンドボタンの処理
    initSoundButton();
});

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

/**
 * サウンドボタンの初期化
 */
function initSoundButton() {
    const soundButton = document.getElementById('unmute-button');
    const bgm = document.getElementById('bgm');

    if (soundButton && bgm) {
        soundButton.addEventListener('click', () => {
            if (bgm.muted) {
                // ミュート解除（再生）
                bgm.muted = false;
                bgm.play().catch(e => console.log("再生エラー:", e));
                soundButton.textContent = "🔊 サウンド OFF"; // ボタンの文字変更（必要であれば）
                soundButton.style.backgroundColor = "#ff3366"; // ONの時に色を変える演出
                soundButton.style.borderColor = "#ff3366";
            } else {
                // ミュート（停止）
                bgm.muted = true;
                bgm.pause(); // 完全に止めたい場合はpause
                soundButton.textContent = "🔊 サウンド ON";
                soundButton.style.backgroundColor = "#333"; // 元の色に戻す
                soundButton.style.borderColor = "#555";
            }
        });
    }
}