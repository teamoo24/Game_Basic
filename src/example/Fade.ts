import * as PIXI from 'pixi.js'
import GameManager from 'example/GameManager'

export default class Fade {

	// フェード開始時の黒画面アルファ
	private alphaFrom!: number;
	// フェード終了時の黒画面アルファ
	private alphaTo!: number;
	// 1フレーム毎に黒画面アルファ加算値
	private alphaProgress: number;
	// 黒画面のコンテナ
	private container = new PIXI.Container();
	// 黒画面の描画
	private overlay = new PIXI.Graphics();
	//FadeInチェック
	public isFadein:boolean
	public isFadeOut:boolean

	constructor(container: PIXI.Container,alphaProgress: number){

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

	public FadeIn():boolean {
		if(this.overlay.alpha > this.alphaTo) {
			this.overlay.alpha -= this.alphaProgress

			if(this.overlay.alpha < this.alphaTo) {
				this.overlay.alpha = this.alphaTo
				this.isFadein = true;
			}
			return false
		} else if(this.overlay.alpha <= this.alphaTo && this.isFadein){
			return true;
		}
	}

	public FadeOut():boolean {
		if(this.overlay.alpha < this.alphaFrom) {
			this.overlay.alpha += this.alphaProgress

			if(this.overlay.alpha > this.alphaFrom) {
				this.overlay.alpha = this.alphaFrom
				this.isFadeOut = true;
			}
			return false;
		} else if(this.overlay.alpha >= this.alphaTo && this.isFadeOut) {
			return true
		}
	}
}