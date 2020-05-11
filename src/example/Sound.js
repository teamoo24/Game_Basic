import SoundManager from 'example/SoundManager';
/**
* サウンド処理を行うクラス
*/
export default class Sound {
    /**
    * コンストラクタ
    * AudioBuffer はユーザ側で用意する
    */
    constructor(buf) {
        /**
        * AudioBufferSourceNode インスタンス
        */
        this.source = null;
        if (!SoundManager.sharedContext) {
            return;
        }
        this.buffer = buf;
        this.gainNode = SoundManager.sharedContext.createGain();
    }
    /**
    * 再生開始
    */
    play(loop = false, offset = 0) {
        const audioContext = SoundManager.sharedContext;
        if (!audioContext) {
            return;
        }
        // AudioSourceNode の初期化
        this.source = audioContext.createBufferSource();
        // ループ情報の設定
        this.source.loop = loop;
        this.source.loopStart = 0;
        this.source.loopEnd = this.buffer.duration;
        // バッファを渡す
        this.source.buffer = this.buffer;
        //this.source.onended = () => this.stop();
        // AudioGainNodeをAudioContext出力先に接続
        this.gainNode.connect(audioContext.destination);
        // AudioSourceNodeをAudioGainNodeに接続
        this.source.connect(this.gainNode);
        // AudioSourceNode処理開始
        this.source.start(0, offset);
    }
    stop() {
    }
    pause() {
    }
    resume() {
    }
}
