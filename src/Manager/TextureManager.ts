import * as PIXI from 'pixi.js';
import Resource from 'Resource';

export default class TextureManager { 
	public static Sheet:{[key:string]:PIXI.BaseTexture} = {}

	public static initSheet():boolean {
		TextureManager.Sheet["test_bg"] = PIXI.BaseTexture.from(Resource.Static.Sprite[0])
		return true;
	}
}
