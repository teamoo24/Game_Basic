import * as PIXI from 'pixi.js';
import GameManager from 'example/GameManager';
import Scene from 'example/Scene';
import SecondScene from 'example/SecondScene';
export default class FirstScene extends Scene {
    /**
    *	コンストラクタ
    *	描画物を初期化する。
    */
    constructor() {
        super();
        // メインループ更新を確認するためのカウント
        this.count = 0;
        const renderer = GameManager.instance.game.renderer;
        this.text = new PIXI.Text('secont scene', new PIXI.TextStyle({
            fontSize: 64,
            fill: 0xffffff
        }));
        this.text.interactive = true;
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
        this.text.on('pointerdown', this.nextScene);
    }
    /**
    * 毎フレームの更新処理
    */
    updatee(dt) {
        super.update(dt);
        this.text.text = `Game Start \n${this.count++}`;
    }
    /**
    * 次のシーンへの遷移
    */
    nextScene() {
        GameManager.loadScene(new SecondScene());
    }
}
