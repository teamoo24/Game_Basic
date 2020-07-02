import * as PIXI from 'pixi.js';

import GameManager from 'Manager/GameManager'
import TextureManager from 'Manager/TextureManager'

import MainScene from 'Scene/MainScene'
import Fade from 'Transition/Fade'
import Scene from 'Scene/Scene'
import Resource from 'Resource'


export default class FirstScene extends Scene {
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

		FirstScene.fade = new Fade(this,0.01);

	}

	/*
	*	素材の初期化
	*/
	public initall():boolean {
		TextureManager.initSheet();
		return true;
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
 	  	if(FirstScene.fade.isFadein && this.initall()) {
 	  		//fadein完了の時
 	  		//fadeout実行
 	  		FirstScene.fade.FadeOut()
 	  	}
 	  	if(FirstScene.fade.isFadeOut) {
 	  		//fadeout完了の時
   			GameManager.loadScene(new MainScene());
 	  	}
   	}
}