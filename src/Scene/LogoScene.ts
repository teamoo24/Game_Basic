import * as PIXI from 'pixi.js';

import GameManager from 'Manager/GameManager'
import TextureManager from 'Manager/TextureManager'
import SoundManager from 'Manager/SoundManager'

import MainScene from 'Scene/MainScene'
import Fade from 'Transition/Fade'
import Scene from 'Scene/Scene'
import Resource from 'Resource'


export default class LogoScene extends Scene {
	// fadeを制御する変数
	private static fade:Fade;
	// logoのSprite
	private logo = new PIXI.Sprite();
	/**
	*	コンストラクタ
	*/
	constructor() {
		super();

		this.logo = PIXI.Sprite.fromImage(Resource.Static.logo[0])
		this.addChild(this.logo)

		LogoScene.fade = new Fade(this,0.01);

	}

	/*
	*	素材の初期化
	*/
	public initall():boolean {
		TextureManager.initSheet();
		SoundManager.init_sound();
		return true;
	}

  	/**
   	* 毎フレームの更新処理
   	*/
   	public update(dt: number): void {
   		super.update(dt);
 	  	if(!LogoScene.fade.isFadein) {
 	  		//fadein実行
 	  		LogoScene.fade.FadeIn()
 	  	}
 	  	if(LogoScene.fade.isFadein && this.initall()) {
 	  		//fadein完了の時
 	  		//fadeout実行
 	  		LogoScene.fade.FadeOut()
 	  	}
 	  	if(LogoScene.fade.isFadeOut) {
 	  		//fadeout完了の時
   			GameManager.loadScene(new MainScene());
 	  	}
   	}
}