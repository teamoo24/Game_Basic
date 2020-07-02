import * as PIXI from 'pixi.js';
import GameManager from 'Manager/GameManager';
export default class Fade {
    constructor(container, alphaProgress) {
        // 黒画面のコンテナ
        this.container = new PIXI.Container();
        // 黒画面の描画
        this.overlay = new PIXI.Graphics();
        this.alphaFrom = 1;
        this.alphaTo = 0;
        this.alphaProgress = alphaProgress;
        this.container = container;
        this.isFadein = false;
        this.isFadeOut = false;
        const width = GameManager.instance.game.view.width;
        const height = GameManager.instance.game.view.height;
        // フェード用の黒い画面
        this.overlay.beginFill(0x000000);
        this.overlay.moveTo(0, 0);
        this.overlay.lineTo(width, 0);
        this.overlay.lineTo(width, height);
        this.overlay.lineTo(0, height);
        this.overlay.endFill();
        this.overlay.alpha = this.alphaFrom;
        this.container.addChild(this.overlay);
    }
    FadeIn() {
        if (!this.isFadein) {
            if (this.overlay.alpha > this.alphaTo) {
                this.overlay.alpha -= this.alphaProgress;
                if (this.overlay.alpha < this.alphaTo) {
                    this.overlay.alpha = this.alphaTo;
                    this.isFadein = true;
                }
                return false;
            }
            else if (this.overlay.alpha <= this.alphaTo && this.isFadein) {
                return true;
            }
        }
    }
    FadeOut() {
        if (!this.isFadeOut && this.isFadein) {
            this.isFadein = true;
            if (this.overlay.alpha < this.alphaFrom) {
                this.overlay.alpha += this.alphaProgress;
                if (this.overlay.alpha > this.alphaFrom) {
                    this.overlay.alpha = this.alphaFrom;
                    this.isFadeOut = true;
                }
                return false;
            }
            else if (this.overlay.alpha >= this.alphaFrom && this.isFadeOut) {
                return true;
            }
        }
    }
}
