import * as PIXI from 'pixi.js';
import Immediate from 'example/transition/Immediate';
/**
 * ゲームシーンの抽象クラス
 * UiGraph を利用して UI 情報を透過的に読み込み初期化する
 * また、シーン間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default class Scene extends PIXI.Container {
    constructor() {
        super(...arguments);
        this.transitionIn = new Immediate();
        this.transitionOut = new Immediate();
    }
    /**
    * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
    */
    update(delta) {
        if (this.transitionIn.isActive()) {
            this.transitionIn.update(delta);
        }
        else if (this.transitionOut.isActive()) {
            this.transitionOut.update(delta);
        }
    }
    /**
    * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
    */
    registerUpdatingObject(object) {
    }
    /**
    * 更新処理を行うべきオブジェクトを更新する
    */
    updateRegisteredObjects(delta) {
    }
    /**
    * シーン追加トランジション開始
    * 引数でトランジション終了時のコールバックを指定できる
    */
    beginTransitionIn(onTransitionFinished) {
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
    beginTransitionOut(onTransitionFinished) {
        this.transitionOut.setCallback(() => onTransitionFinished(this));
        const container = this.transitionOut.getContainer();
        if (container) {
            this.addChild(container);
        }
        this.transitionOut.begin();
    }
}
