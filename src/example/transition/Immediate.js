/**
 * 即座にシーン遷移させるトランジション
 */
export default class Immediate {
    constructor() {
        this.onTransitionFinished = () => { };
        this.finished = false;
    }
    /**
    * トランジション描画物を含む PIXI.Container インスタンスを返す
    */
    getContainer() {
        return null;
    }
    /**
    * トランジション開始処理
    * このトランジションは即時終了させる
    */
    begin() {
        this.finished = true;
        this.onTransitionFinished();
    }
    /**
    * トランジションが開始しているかどうかを返す
    * このトランジションは即時終了するため true になることなはない
    */
    isBegan() {
        return false;
    }
    /**
    * トランジションが終了しているかどうかを返す
    */
    isFinished() {
        return this.finished;
    }
    /**
    * トランジションが実行中かどうかを返す
    * このトランジションは即時終了するため true になることなはない
    */
    isActive() {
        return false;
    }
    /**
    * トランジションを更新する
    * このトランジションは即時終了するため何も行わない
    */
    update(_dt) {
        return;
    }
    /**
    * トランジション終了時のコールバックを登録する
    */
    setCallback(callback) {
        this.onTransitionFinished = callback;
    }
}
