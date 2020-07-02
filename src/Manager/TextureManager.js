import * as PIXI from 'pixi.js';
import Resource from 'Resource';
let TextureManager = /** @class */ (() => {
    class TextureManager {
        static initSheet() {
            TextureManager.Sheet["test_bg"] = PIXI.BaseTexture.from(Resource.Static.Sprite[0]);
            return true;
        }
    }
    TextureManager.Sheet = {};
    return TextureManager;
})();
export default TextureManager;
