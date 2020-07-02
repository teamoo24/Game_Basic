/**
 * リソースの URL や命名規則のマスタ
 */
// こちはリリース用
//const for_dripcoke = ""

// こっちはローカル用
const for_dripcoke = ""
const Resource = Object.freeze({
	Static: {
		logo: [
			for_dripcoke+'assets/image/logo/logo.png',
		],
		Sprite: [
			for_dripcoke+'assets/image/sprite/test_bg.png',
		]
	}
})

export default Resource;
