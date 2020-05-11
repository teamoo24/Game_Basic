import SoundManager from 'example/SoundManager';
/**
* サウンド処理を行うクラス
*/	
export default class Sound {

  	/**
   	* GainNode インスタンス
   	*/
  	public gainNode!: GainNode;

  	/**
   	* ループ再生フラグ
   	*/
  	public loop: boolean = false;

  	/**
   	* AudioBuffer インスタンス
   	*/
  	private buffer!: AudioBuffer;

  	/**
   	* AudioBufferSourceNode インスタンス
   	*/
  	private source: AudioBufferSourceNode | null = null;

  	/**
   	* 再生開始フラグ
   	*/
  	private played: boolean = false;

	/**
   	* 一時停止フラグ
   	*/
  	private paused: boolean = false;
  	/**
   	* サウンド再生開始時間オフセット
   	*/
  	private offset: number = 0;
  	/**
   	* AudioContext インスタンスの currentTime を基準に保持する再生開始時間
   	*/
  	private playedAt: number = 0;
  	/**
   	* サウンド再生時間を返す
   	*/
   	public get elapsedTime(): number {
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

   		return playedTime
   	}



	/**
   	* コンストラクタ
   	* AudioBuffer はユーザ側で用意する
   	*/
	constructor(buf: AudioBuffer) {
		if (!SoundManager.sharedContext) {
			return;
		}

		this.buffer = buf;
		this.gainNode = SoundManager.sharedContext.createGain();
	}

	/**
   	* 再生開始
   	*/
	public play(loop: boolean = false, offset: number = 0):void {
		const audioContext = SoundManager.sharedContext;
		if (!audioContext) {
			return;
		}
		
		// AudioSourceNode の初期化
		this.source = audioContext.createBufferSource();
		// ループ情報の設定
		this.source.loop = loop;
		this.source.loopStart = 0;
		this.source.loopEnd = this.buffer.duration as number;
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
	public stop(): void {
		if (!this.source || !this.played) {
			return;
		}

		this.source.disconnect();

		try {
			(this.source as any).buffer = null;
		} catch(_e) {
		}

		this.source.onended = null;
		this.source = null;

		this.paused = false;
	}

	/**
   	* 一時停止
   	*/
	public pause(): void {
		if (this.paused || this.played || !this.source) {
			return;
		}
		this.play(this.loop, this.offset);

		this.paused = false;
	}
	
	public resume(): void {
	}
}