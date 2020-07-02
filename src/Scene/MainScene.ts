import * as PIXI from 'pixi.js';
import GameManager from 'Manager/GameManager';
import TextureManager from 'Manager/TextureManager';
import SoundManager from 'Manager/SoundManager'

import Scene from 'Scene/Scene';

import LogoScene from 'Scene/LogoScene';

/**
 * タイトルシーン
 */
export default class SecondScene extends Scene  {
  private text!: PIXI.Text;

  private bg:PIXI.Sprite;

  private count: number = 0;
  

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.bg = new PIXI.Sprite(new PIXI.Texture(TextureManager.Sheet["test_bg"],new PIXI.Rectangle(0,0,320,640)));

    this.bg.anchor.set(0,0)
    this.bg.position.set(0,-320);

    this.addChild(this.bg)

    const textStyle = new PIXI.TextStyle({
      fontSize: 20,
      fill: 0xffffff
    });

    const renderer = GameManager.instance.game.renderer;

    this.text = new PIXI.Text('Main Scene', textStyle);
    this.text.interactive = true;
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.addChild(this.text);

    //textを押下したときシーン移動
    this.text.on('pointerdown', this.click_sound)
    .on('touchstart',this.click_sound);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);

    this.text.text =  `Main Scene \n${this.count++}`;
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new LogoScene());
  }

  public click_sound(): void {
    if(!SoundManager.se["ok"].isPlaying)
          SoundManager.se["ok"].play()   
  }
}