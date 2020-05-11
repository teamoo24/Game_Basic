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
   	* AudioBuffer インスタンス
   	*/
  	private buffer!: AudioBuffer;

  	/**
   	* AudioBufferSourceNode インスタンス
   	*/
  	private source: AudioBufferSourceNode | null = null;

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
		//this.source.onended = () => this.stop();
		
		// AudioGainNodeをAudioContext出力先に接続
		this.gainNode.connect(audioContext.destination);
		// AudioSourceNodeをAudioGainNodeに接続
		this.source.connect(this.gainNode);
		// AudioSourceNode処理開始
		this.source.start(0, offset);
	}
	public stop(): void {
	}
	public pause(): void {
	}
	public resume(): void {
	}
}