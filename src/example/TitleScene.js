import * as PIXI from 'pixi.js';
import GameManager from './GameManager';
import Scene from './Scene';
import Resource from './Resource';
import Fade from './transition/Fade';
import Sound from 'example/Sound';
export default class TitleScene extends Scene {
    /**
    * コンストラクタ
    */
    constructor() {
        super();
        this.sound = null;
        this.transitionIn = new Fade(1.0, 0.0, -0.02);
        this.transitionOut = new Fade(0.0, 1.0, 0.02);
        this.interactive = true;
        this.on('pointerup', () => this.showOrderScene());
    }
    /**
    * リソースリストを作成し返却する
    */
    createInitialResourceList() {
        let assets = super.createInitialResourceList();
        const staticResource = Resource.Static;
        assets = assets.concat(staticResource.BattleBgFores.slice(0, 3));
        assets = assets.concat(staticResource.BattleBgMiddles.slice(0, 3));
        assets = assets.concat(staticResource.BattleBgBacks.slice(0, 3));
        assets.push(Resource.Audio.Bgm.Title);
        return assets;
    }
    /**
    * リソースがロードされた時のコールバック
    */
    onResourceLoaded() {
        super.onResourceLoaded();
        const renderer = GameManager.instance.game.renderer;
        const resources = PIXI.loader.resources;
        const bgOrder = [
            Resource.Static.BattleBgBacks,
            Resource.Static.BattleBgMiddles,
            Resource.Static.BattleBgFores
        ];
        for (let i = 0; i < bgOrder.length; i++) {
            const bgs = bgOrder[i];
            for (let j = 0; j < 3; j++) {
                const sprite = new PIXI.Sprite(resources[bgs[j]].texture);
                sprite.position.set(sprite.width * j, 0);
                this.addChild(sprite);
            }
        }
        this.text = new PIXI.Text('TOUCH TO START', new PIXI.TextStyle({
            fontFamily: 'MisakiGothic',
            fontSize: 64,
            fill: 0xffffff,
            padding: 14
        }));
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
        this.addChild(this.text);
        this.sound = new Sound(resources[Resource.Audio.Bgm.Title].buffer);
        this.sound.volume = 0.25;
        this.sound.play();
    }
    /**
    * タップされたときのコールバック
    */
    showOrderScene() {
        console.log("should go to order scene");
        if (this.sound) {
            (this.sound.isPaused())
                ? this.sound.resume()
                : this.sound.pause();
        }
    }
}
