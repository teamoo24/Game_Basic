import GameManager from 'example/GameManager'
import TitleScene from 'example/TitleScene'
import 'example/Config';


window.onload = () => {
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