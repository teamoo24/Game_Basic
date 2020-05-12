import * as WebFont from 'webfontloader';
import Resource from 'example/Resource';
import GameManager from 'example/GameManager'
import TitleScene from 'example/TitleScene'
import 'example/Config';

let fontLoaded = false;
let windowLoaded = false;

WebFont.load({
	custom: {
		families: [Resource.FontFamily.Default],
		urls:['base.css']
	},
	active: () => {
		fontLoaded = true;
		if (windowLoaded) {
			initGame();
		}
	}
})


function initGame() {
	GameManager.start({
		glWidth:1136,
		glHeight: 640,
		option: {
			backgroundColor: 0x222222
		},
		view:document.getElementById("game")
	})

	// 最初のシーンの読み込み
	GameManager.loadScene(new TitleScene());
}

window.onload = () => {
	windowLoaded = true;
	if (fontLoaded) {
		initGame();
	}
}