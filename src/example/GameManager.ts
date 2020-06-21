import * as PIXI from 'pixi.js'
import Scene from 'example/Scene';

export default class GameManager {
	// シングルトンインスタンス
	public static instance: GameManager;
	// PIXI.Applicationインスタンス
	public game!: PIXI.Application;

  	/**
   	* シーンのトランジション完了フラグ
   	* シーントランジションを制御するためのフラグ
   	*/
  	private sceneTransitionOutFinished: boolean = true;
  	
  	/**
   	* 現在のシーンインスタンス
   	*/
  	private currentScene?: Scene;


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
		view?: HTMLCanvasElement
	}) : void {
		// PIXI Application生成
		const game = new PIXI.Application({
      view:params.view,
      width:params.glWidth,
      height:params.glHeight
    });
		// GameManager インスタンス生成
    const instance = new GameManager(game);
		GameManager.instance = new GameManager(game);

		// canvasをDOMに追加
		game.ticker.add((delta: number) => {
			//メインループ
		});

		 // メインループ
    	game.ticker.add((delta: number) => {
      		if (instance.currentScene) {
        		instance.currentScene.update(delta);
      		}
    	});
	}


  	/**
   	* 可能であれば新しいシーンへのトランジションを開始する
   	*/
   	public static transitionInIfPossible(newScene: Scene): boolean {
   		const instance = GameManager.instance;

   		if (!instance.sceneTransitionOutFinished) {
   			return false;
   		}

   		if (instance.currentScene) {
   			instance.currentScene.destroy();
   		}
   		instance.currentScene = newScene;

   		if (instance.game) {
   			instance.game.stage.addChild(newScene);
   		}

   		newScene.beginTransitionIn((_: Scene) => {});

   		return true;
   	}

	/**
	* シーンをロードする
   	* 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
   	* いずれも完了したら、新しいシーンのトランジションを開始する
   	*/
   	public static loadScene(newScene: Scene):void {
   		const instance = GameManager.instance;

   		if (instance.currentScene) {
   			instance.sceneTransitionOutFinished = false;
   			instance.currentScene.beginTransitionOut((_:Scene) => {
   				instance.sceneTransitionOutFinished =true;
   				GameManager.transitionInIfPossible(newScene);
   			});
   		} else {
   			instance.sceneTransitionOutFinished = true;
   			GameManager.transitionInIfPossible(newScene);
   		}
   	}
}