import * as PIXI from 'pixi.js'

/**
 * ゲームシーンの抽象クラス
 * UiGraph を利用して UI 情報を透過的に読み込み初期化する
 * また、シーン間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default abstract class Scene extends PIXI.Container {

	/**
   	* GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   	*/
	public update(delta : number): void {
		this.updateRegisteredObjects(delta);
	}
	

	/**
	* 更新処理を行うべきオブジェクトを更新する
  	*/
	protected updateRegisteredObjects(delta: number): void {

	}

	
	/**
  	* シーン追加トランジション開始
   	* 引数でトランジション終了時のコールバックを指定できる
   	*
   	onTransitionFinished: (scene: Scene) => void

	==>

   	onTransitionFinished(scene:Scene):void {
	}

	=============================

	(scene: Scene) => void

	==>

	function(scene:Scene):void {
	
	}
   	*/
	public beginTransitionIn(onTransitionFinished: (scene: Scene) => void):void {
		onTransitionFinished(this);
	}


	/**
   	* シーン削除トランジション開始
   	* 引数でトランジション終了時のコールバックを指定できる
   	*/
   	public beginTransitionOut(onTransitionFinished: (scene: Scene) => void):void {
   		onTransitionFinished(this);
   	}
}