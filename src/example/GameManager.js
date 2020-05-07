import * as PIXI from 'pixi.js';
export default class GameManager {
    /**
    * コンストラクタ
    * PIXI.Applicationインスタンスはユーザーイン委のものを使用する
    */
    constructor(app) {
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
        //GameManagerインスタンス生成
        GameManager.instance = new GameManager(game);
        // canvasをDOMに追加
        //document.body.appendChild(game.view);
        params.view.appendChild(game.view);
        game.ticker.add((delta) => {
            //メインループ
        });
    }
}
