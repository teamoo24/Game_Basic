import GameManager from './example/GameManager';
window.onload = () => {
    GameManager.start({
        glWidth: 1136,
        glHeight: 640,
        option: {
            backgroundColor: 0x222222
        },
        view: document.getElementById("game")
    });
};
