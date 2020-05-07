import * as PIXI from 'pixi.js'

export default class GameManager {
	// シングルトンインスタンス
	public static instance: GameManager;
	// PIXI.Applicationインスタンス
	public game!: PIXI.Application;

	/**
	* コンストラクタ
	* PIXI.Applicationインスタンスはユーザーイン委のものを使用する
	*/
	constructor(app: PIXI.Application) {
		if (GameManager.instance) {
			throw new Error('GameManager can be instantiate only once');
		}

		this.game = app;
	}

	/** 
	* ゲームを起動する
	* 画面サイズやPIXI.ApplicationOptionsを渡すことができる
	*/
	public static start(params: {
		glWidth: number,
		glHeight: number,
		option?: PIXI.ApplicationOptions,
		view?: HTMLElement
	}) : void {
		// PIXI Application生成
		const game = new PIXI.Application(params.glWidth, params.glHeight, params.option);
		//GameManagerインスタンス生成
		GameManager.instance = new GameManager(game);

		// canvasをDOMに追加

		//document.body.appendChild(game.view);
		params.view.appendChild(game.view)
		game.ticker.add((delta: number) => {
			//メインループ
		});
	}
}