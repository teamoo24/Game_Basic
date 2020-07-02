import * as PIXI from 'pixi.js';
import sound from 'pixi-sound';
import Resource from 'Resource';

export default class SoundManager {

	public static sevolume:number;

	public static se:{[key:string]:sound.Sound} = {}

	public static init_sound():boolean {

		SoundManager.sevolume = 1;

		//////////////////////////////se
		SoundManager.se["ok"] = sound.Sound.from({
			url:Resource.Sound.se[0],
			preload: true,
		});

		this.set_volume()
		
		return true;
	}

	public static set_volume():boolean {
		//seサウンドの連想配列のボリュームを設定
		for (let key in SoundManager.se) {
			if(SoundManager.se.hasOwnProperty(key)) {
				SoundManager.se[key].volume = SoundManager.sevolume;
			}
		}
		return true
	}
}