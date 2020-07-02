import * as PIXI from 'pixi.js';
import GameManager from 'Manager/GameManager';
import TextureManager from 'Manager/TextureManager';
import Scene from 'Scene/Scene';
import LogoScene from 'Scene/LogoScene';
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
        this.bg = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["bg"], new PIXI.Rectangle(0, 0, 320, 640)));
        const textStyle = new PIXI.TextStyle({
            fontSize: 20,
            fill: 0xffffff
        });
        const renderer = GameManager.instance.game.renderer;
        this.text = new PIXI.Text('Main Scene', textStyle);
        this.text.interactive = true;
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
        this.addChild(this.text);
        //textを押下したときシーン移動
        //this.text.on('pointerdown', this.nextScene);
    }
    /**
     * 毎フレームの更新処理
     */
    update(dt) {
        super.update(dt);
        this.text.text = `Main Scene \n${this.count++}`;
    }
    /**
     * 次のシーンへの遷移
     */
    nextScene() {
        GameManager.loadScene(new LogoScene());
    }
}
