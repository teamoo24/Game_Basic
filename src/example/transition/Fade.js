import * as PIXI from 'pixi.js';
import GameManager from 'example/GameManager';
/**
 * トランジションのフェード表現
 */
export default class Fade {
    /**
    * コンストラクタ
    */
    constructor(alphaFrom, alphaTo, alphaProgress) {
        // 黒画面のコンテナ
        this.container = new PIXI.Container();
        // 黒画面の描画
        this.overlay = new PIXI.Graphics();
        // トランジション開始フラグ
        this.transitionBegan = false;
        // トランジション終了フラグ
        this.transitionFinished = false;
        // トランジション終了時のコールバック
        this.onTransitionFinished = () => { };
        this.alphaFrom = alphaFrom;
        this.alphaTo = alphaTo;
        this.alphaProgress = alphaProgress;
        const width = GameManager.instance.game.view.width;
        const height = GameManager.instance.game.view.height;
        // フェード用の黒い画面
        this.overlay.beginFill(0x0000);
        this.overlay.moveTo(0, 0);
        this.overlay.lineTo(width, 0);
        this.overlay.lineTo(width, height);
        this.overlay.lineTo(0, height);
        this.overlay.endFill();
        this.overlay.alpha = this.alphaFrom;
        this.container.addChild(this.overlay);
    }
    /**
    * トランジション描画物を含む PIXI.Container インスタンスを返す
    */
    getContainer() {
        return this.container;
    }
    /**
    * トランジション開始処理
    */
    begin() {
        this.transitionBegan = true;
    }
    /**
    * トランジションが開始しているかどうかを返す
    */
    isBegan() {
        return this.transitionBegan;
    }
    /**
    * トランジションが終了しているかどうかを返す
    */
    isFinished() {
        return this.transitionFinished;
    }
    /**
    * トランジションが実行中かどうかを返す
    */
    isActive() {
        return this.isBegan() && !this.isFinished();
    }
    /**
    * トランジションを更新する
    */
    update(_dt) {
        if (!this.isBegan())
            return;
        if (this.isFinished())
            return;
        if ((this.alphaTo <= this.alphaFrom && this.overlay.alpha <= this.alphaTo)
            ||
                (this.alphaTo >= this.alphaFrom && this.overlay.alpha >= this.alphaTo)) {
            this.onTransitionFinished();
            this.transitionFinished = true;
        }
        else {
            this.overlay.alpha += this.alphaProgress;
        }
    }
    /**
    * トランジション終了時のコールバックを登録する
    */
    setCallback(callback) {
        this.onTransitionFinished = callback;
    }
}
