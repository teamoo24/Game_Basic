import { detect, BrowserInfo, BotInfo, NodeInfo } from 'detect-browser';

/**
 * サウンドを扱う
 * Sound の高級機能
 */
export default class SoundManager {
	
	/**
   	* シングルトンインスタンス
   	*/
	public static instance: SoundManager;

	/**
   	* AudioCntext インスタンスのゲッタ
   	* ブラウザによっては生成数に上限があるため、SoundManager では単一のインスタンスのみ生成する
   	*/
	public static get sharedContext(): AudioContext | null {
		return SoundManager.context;
	}

	/**
   	* AudioCntext インスタンス
   	*/
   	private static context: AudioContext | null = null;

   	/**
   	* コンストラクタ
   	*/
   	constructor() {
   		if (SoundManager.instance) {
   			throw new Error('SoundManager can not be initialized twice');
   		}
   	}

   	/**
   	* 初期化処理
   	* ユーザで生成した AudioContext を渡すこともできる
   	*/
   	public static init(ctx?: AudioContext):void {
   		if (SoundManager.instance) {
   			return;
   		}

   		SoundManager.instance = new SoundManager();

   		if (ctx) {
   			SoundManager.context = ctx;
   		} else {
   			const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudio;
   			SoundManager.context = new AudioContextClass();
   		}

   		const browser = detect();
   		if(!browser) {
   			return;
   		}


   	}

	/**
	* サウンドを初期化するためのイベントを登録する
	* 多くのブラウザではタップ等のユーザ操作を行わないとサウンドを再生できない
	* そのため、初回画面タップ時にダミーの音声を再生させて以降のサウンド再生処理を許容できるようにする
	*/
	public static setSoundInitializeEvent ( browser: BrowserInfo | BotInfo | NodeInfo): void {
		const eventName = (document.ontouchend == undefined) ? 'mousedown':'ontouchend';

		let soundInitializer:() => void;

		const majorVersion = (browser.version) ? browser.version.split('.')[0] : '0';

		if (browser.name == 'chrome' && Number.parseInt(majorVersion, 10) >= 66) {
         soundInitializer = () => {
            if (SoundManager.sharedContext) {
               SoundManager.sharedContext.resume();
            }
            document.body.removeEventListener(eventName, soundInitializer);
         };
		} else if (browser.name == 'safari') {
         soundInitializer = () => {
            if (SoundManager.sharedContext) {
               const silentSource = SoundManager.sharedContext.createBufferSource();
               silentSource.buffer = SoundManager.sharedContext.createBuffer(1, 1, 44100);
               silentSource.connect(SoundManager.sharedContext.destination);
               silentSource.start(0);
               silentSource.disconnect();
            }

            document.body.removeEventListener(eventName, soundInitializer);
         };
		} else {
			return;
		}

		document.body.addEventListener(eventName, soundInitializer);
	}
}