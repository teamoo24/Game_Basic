/**
 * リソースの URL や命名規則のマスタ
 */
 const Resource = Object.freeze(
 	{
 	/**
   	* 静的なリソースを有するオブジェクト
   	*/
  	Static: {
	    BattleBgFores: [
			'battle/bg_1_1.png',
			'battle/bg_1_2.png',
			'battle/bg_1_3.png',
			'battle/bg_1_4.png',
			'battle/bg_1_5.png',
			'battle/bg_1_6.png',
			'battle/bg_1_7.png',
			'battle/bg_1_8.png',
			'battle/bg_1_9.png',
			'battle/bg_1_10.png'
		],
	    BattleBgMiddles: [
			'battle/bg_2_1.png',
			'battle/bg_2_2.png',
			'battle/bg_2_3.png',
			'battle/bg_2_4.png',
			'battle/bg_2_5.png',
			'battle/bg_2_6.png'
		],
		BattleBgBacks: [
			'battle/bg_3_1.png',
			'battle/bg_3_2.png',
			'battle/bg_3_3.png'
		]
	},
	Audio: {
		Bgm: {
			Title: 'audio/bgm_title.mp3'
		},
		Se: {
		}
	}
});

 export default Resource;