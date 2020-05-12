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
        * ループ再生フラグ
        */
        this.loop = false;
        /**
        * AudioBufferSourceNode インスタンス
        */
        this.source = null;
        /**
        * 再生開始フラグ
        */
        this.played = false;
        /**
        * 一時停止フラグ
        */
        this.paused = false;
        /**
        * サウンド再生開始時間オフセット
        */
        this.offset = 0;
        /**
        * AudioContext インスタンスの currentTime を基準に保持する再生開始時間
        */
        this.playedAt = 0;
        if (!SoundManager.sharedContext) {
            return;
        }
        this.buffer = buf;
        this.gainNode = SoundManager.sharedContext.createGain();
    }
    /**
    * サウンド再生時間を返す
    */
    get elapsedTime() {
        if (this.paused) {
            return this.offset;
        }
        const audioContext = SoundManager.sharedContext;
        if (!this.source || !audioContext) {
            return 0;
        }
        const playedTime = audioContext.currentTime - this.playedAt;
        // ループ再生の場合は合計の再生時間から割り出す
        if (this.loop) {
            const playLength = this.source.loopEnd - this.source.loopStart;
            if (playedTime > playLength) {
                return this.source.loopStart + (playedTime % playLength);
            }
        }
        return playedTime;
    }
    /**
    * paused の public ゲッタ
    */
    isPaused() {
        return this.paused;
    }
    set volume(value) {
        if (this.gainNode) {
            this.gainNode.gain.value = value;
        }
    }
    get volume() {
        return this.gainNode ? this.gainNode.gain.value : -1;
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
        this.source.onended = () => this.stop();
        // AudioGainNodeをAudioContext出力先に接続
        this.gainNode.connect(audioContext.destination);
        // AudioSourceNodeをAudioGainNodeに接続
        this.source.connect(this.gainNode);
        // AudioSourceNode処理開始
        this.source.start(0, offset);
        this.playedAt = audioContext.currentTime - offset;
        this.paused = false;
        this.played = true;
    }
    /**
    * 停止
    */
    stop() {
        if (!this.source || !this.played) {
            return;
        }
        this.source.disconnect();
        try {
            this.source.buffer = null;
        }
        catch (_e) {
        }
        this.source.onended = null;
        this.source = null;
        this.paused = false;
    }
    /**
    * 一時停止
    */
    pause() {
        if (this.paused || this.played || !this.source) {
            return;
        }
        this.offset = this.elapsedTime;
        this.stop();
    }
    /**
    * 再開
    */
    resume() {
        if (!this.paused || !this.played) {
            return;
        }
        this.play(this.loop, this.offset);
        this.paused = false;
    }
}
