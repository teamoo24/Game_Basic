import * as PIXI from 'pixi.js';
import GameManager from 'Manager/GameManager'
import Scene from 'Scene/Scene'
import SecondScene from 'Scene/SecondScene'
import Fade from 'Transition/Fade'


export default class FirstScene extends Scene {
	private text!: PIXI.Text;
	// メインループ更新を確認するためのカウント
	private count: number = 0;
	private static fade:Fade;
	private static fornextScene:boolean
	/**
	*	コンストラクタ
	*	描画物を初期化する。
	*/
	constructor() {
		super();

		const renderer = GameManager.instance.game.renderer;
		this.text = new PIXI.Text('Game Main Page', new PIXI.TextStyle({
			fontSize: 64,
			fill: 0xffffff
		}));
		this.text.interactive = true;
		this.text.anchor.set(0.5, 0.5);
		this.text.position.set(renderer.width *0.5, renderer.height * 0.5);
		this.text.on('pointerdown', this.nextScene);
		this.addChild(this.text);

		FirstScene.fornextScene = false;

		FirstScene.fade = new Fade(this,0.01);

	}

  	/**
   	* 毎フレームの更新処理
   	*/
   	public update(dt: number): void {
   		super.update(dt);
 	  	if(!FirstScene.fade.isFadein) {
 	  		//fadein実行
 	  		FirstScene.fade.FadeIn()
 	  	}
 	  	if(FirstScene.fade.isFadein) {
 	  		//fadein完了の時
 	  	}
 	  	if(FirstScene.fornextScene) {
 	  		//fadeout実行
 	  		FirstScene.fade.FadeOut()
 	  	}
 	  	if(FirstScene.fade.isFadeOut) {
 	  		//fadeout完了の時
   			GameManager.loadScene(new SecondScene());
 	  	}
   		this.text.text = `Game Start \n${this.count++}`;
   	}

  	/**
   	* 次のシーンへの遷移
   	*/
   	public nextScene(): void {
   		FirstScene.fornextScene = true
   	}
}