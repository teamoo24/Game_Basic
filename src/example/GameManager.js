import * as PIXI from 'pixi.js';
export default class GameManager {
    /**
    * コンストラクタ
    * PIXI.Applicationインスタンスはユーザーイン委のものを使用する
    */
    constructor(app) {
        /**
        * シーンのトランジション完了フラグ
        * シーントランジションを制御するためのフラグ
        */
        this.sceneTransitionOutFinished = true;
        if (GameManager.instance) {
            throw new Error('GameManager can be instantiate only once');
        }
        this.game = app;
    }
    /**
    * ゲームを起動する
    * 画面サイズやPIXI.ApplicationOptionsを渡すことができる
    */
    static start(params) {
        // PIXI Application生成
        const game = new PIXI.Application(params.glWidth, params.glHeight, params.option);
        // GameManager インスタンス生成
        const instance = new GameManager(game);
        GameManager.instance = instance;
        // canvasをDOMに追加
        //document.body.appendChild(game.view);
        params.view.appendChild(game.view);
        // メインループ
        game.ticker.add((delta) => {
            if (instance.currentScene) {
                instance.currentScene.update(delta);
            }
        });
    }
    /**
    * 可能であれば新しいシーンへのトランジションを開始する
    */
    static transitionInIfPossible(newScene) {
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
        newScene.beginTransitionIn((_) => { });
        return true;
    }
    /**
    * シーンをロードする
    * 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
    * いずれも完了したら、新しいシーンのトランジションを開始する
    */
    static loadScene(newScene) {
        const instance = GameManager.instance;
        if (instance.currentScene) {
            instance.sceneTransitionOutFinished = false;
            instance.currentScene.beginTransitionOut((_) => {
                instance.sceneTransitionOutFinished = true;
                GameManager.transitionInIfPossible(newScene);
            });
        }
        else {
            instance.sceneTransitionOutFinished = true;
            GameManager.transitionInIfPossible(newScene);
        }
    }
}
