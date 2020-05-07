import * as PIXI from 'pixi.js'
import UpdateObject from "interfaces/UpdateObject"
import Transition from 'interfaces/Transition'
import Immediate from 'example/transition/Immediate'



/**
 * ゲームシーンの抽象クラス
 * UiGraph を利用して UI 情報を透過的に読み込み初期化する
 * また、シーン間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default abstract class Scene extends PIXI.Container {

	protected transitionIn: Transition = new Immediate()
	protected transitionOut: Transition = new Immediate()
	/**
   	* GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   	*/
	public update(delta : number): void {
		if (this.transitionIn.isActive()) {
			this.transitionIn.update(delta);
		} else if (this.transitionOut.isActive()) {
			this.transitionOut.update(delta);
		}

	}
	

	/**
   	* 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
   	*/
	protected registerUpdatingObject(object: UpdateObject): void {
		
	}


	/**
	* 更新処理を行うべきオブジェクトを更新する
  	*/
	protected updateRegisteredObjects(delta: number): void {

	}


	/**
  	* シーン追加トランジション開始
   	* 引数でトランジション終了時のコールバックを指定できる
   	*/
	public beginTransitionIn(onTransitionFinished: (scene: Scene) => void):void {
		this.transitionIn.setCallback(() => onTransitionFinished(this));

		const container = this.transitionIn.getContainer();

		if (container) {
			this.addChild(container);
		}

		this.transitionIn.begin();
	}


	/**
   	* シーン削除トランジション開始
   	* 引数でトランジション終了時のコールバックを指定できる
   	*/
   	public beginTransitionOut(onTransitionFinished: (scene: Scene) => void):void {
   		this.transitionOut.setCallback(() => onTransitionFinished(this));

   		const container = this.transitionOut.getContainer();
   		if (container) {
   			this.addChild(container);
   		}

   		this.transitionOut.begin();
   	}
}