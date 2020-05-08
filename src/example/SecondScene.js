import * as PIXI from 'pixi.js';
import GameManager from 'example/GameManager';
import Scene from 'example/Scene';
import FirstScene from 'example/FirstScene';
/**
 * タイトルシーン
 */
export default class SecondScene extends Scene {
    /**
     * コンストラクタ
     */
    constructor() {
        super();
        this.count = 0;
        const textStyle = new PIXI.TextStyle({
            fontSize: 64,
            fill: 0xffffff
        });
        const renderer = GameManager.instance.game.renderer;
        this.text = new PIXI.Text('Game Main', textStyle);
        this.text.interactive = true;
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
        this.addChild(this.text);
        this.text.on('pointerdown', this.nextScene);
    }
    /**
     * 毎フレームの更新処理
     */
    update(dt) {
        super.update(dt);
        this.text.text = `second scene \n${this.count++}`;
    }
    /**
     * 次のシーンへの遷移
     */
    nextScene() {
        GameManager.loadScene(new FirstScene());
    }
}
