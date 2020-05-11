import { detect } from 'detect-browser';
/**
 * サウンドを扱う
 * Sound の高級機能
 */
export default class SoundManager {
    /**
    * コンストラクタ
    */
    constructor() {
        if (SoundManager.instance) {
            throw new Error('SoundManager can not be initialized twice');
        }
    }
    /**
    * AudioCntext インスタンスのゲッタ
    * ブラウザによっては生成数に上限があるため、SoundManager では単一のインスタンスのみ生成する
    */
    static get sharedContext() {
        return SoundManager.context;
    }
    /**
    * 初期化処理
    * ユーザで生成した AudioContext を渡すこともできる
    */
    static init(ctx) {
        if (SoundManager.instance) {
            return;
        }
        SoundManager.instance = new SoundManager();
        if (ctx) {
            SoundManager.context = ctx;
        }
        else {
            const AudioContextClass = window.AudioContext || window.webkitAudio;
            SoundManager.context = new AudioContextClass();
        }
        const browser = detect();
        if (!browser) {
            return;
        }
        SoundManager.useWebAudio(browser);
    }
    /**
    * オーディオデータをパースするための PIXI.Loader ミドルウェアを登録する
    */
    static useWebAudio(browser) {
        if (SoundManager.webAudioInitialized) {
            return;
        }
        ;
        const supportedExtensions = SoundManager.supportedExtensions;
        for (let i = 0; i < supportedExtensions.length; i++) {
            const extension = supportedExtensions[i];
            const PixiResource = PIXI.loaders.Loader.Resource;
            PixiResource.setExtensionXhrType(extension, PixiResource.XHR_RESPONSE_TYPE.BUFFER);
            PixiResource.setExtensionLoadType(extension, PixiResource.LOAD_TYPE.XHR);
        }
        // Chrome の一部バージョンでサウンドのデコード方法が異なるためメソッドを変える
        const majorVersion = (browser.version) ? browser.version.split('.')[0] : '0';
        let mathodName = 'decodeAudio';
        if (browser.name == 'chrome' && Number.parseInt(majorVersion, 10) === 64) {
            mathodName = 'decodeAudioWithPromise';
        }
        // resource-loader ミドルウェアの登録
        PIXI.loader.use((resource, next) => {
            const extension = resource.url.split('?')[0].split('.')[1];
            if (extension && supportedExtensions.indexOf(extension) !== -1) {
                // リソースにbufferという名前でプロパティを増やす
                SoundManager[mathodName](resource.data, (buf) => {
                    resource.buffer = buf;
                    next();
                });
            }
            else {
                next();
            }
        });
        SoundManager.webAudioInitialized = true;
    }
    /**
    * サウンドを初期化するためのイベントを登録する
    * 多くのブラウザではタップ等のユーザ操作を行わないとサウンドを再生できない
    * そのため、初回画面タップ時にダミーの音声を再生させて以降のサウンド再生処理を許容できるようにする
    */
    static setSoundInitializeEvent(browser) {
        const eventName = (document.ontouchend == undefined) ? 'mousedown' : 'ontouchend';
        let soundInitializer;
        const majorVersion = (browser.version) ? browser.version.split('.')[0] : '0';
        if (browser.name == 'chrome' && Number.parseInt(majorVersion, 10) >= 66) {
            soundInitializer = () => {
                if (SoundManager.sharedContext) {
                    SoundManager.sharedContext.resume();
                }
                document.body.removeEventListener(eventName, soundInitializer);
            };
        }
        else if (browser.name == 'safari') {
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
        }
        else {
            return;
        }
        document.body.addEventListener(eventName, soundInitializer);
    }
    /**
    * オーディオデータのデコード処理
    */
    static decodeAudio(binary, callback) {
        if (SoundManager.sharedContext) {
            SoundManager.sharedContext.decodeAudioData(binary, callback);
        }
    }
    /**
    * オーディオデータのデコード処理
    * ブラウザ種別やバージョンによっては I/F が異なるため、こちらを使う必要がある
    */
    static decodeAudioWithPromise(binary, callback) {
        if (SoundManager.sharedContext) {
            SoundManager.sharedContext.decodeAudioData(binary).then(callback);
        }
    }
}
/**
* SoundManager がサポートするサウンドファイル拡張子
*/
SoundManager.supportedExtensions = ['mp3'];
/**
* WebAudio 利用の初期化済みフラグ
*/
SoundManager.webAudioInitialized = false;
/**
* AudioContext インスタンス
*/
SoundManager.context = null;
