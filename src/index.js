import GameManager from 'Manager/GameManager';
import LogoScene from 'Scene/LogoScene';
let windowLoaded = false;
window.onload = () => {
    windowLoaded = true;
    initGame();
};
function initGame() {
    GameManager.start({
        glWidth: 320,
        glHeight: 320,
        option: {
            backgroundColor: 0x222222
        },
        view: document.getElementById("game")
    });
    // 最初のシーンの読み込み
    GameManager.loadScene(new LogoScene());
}
