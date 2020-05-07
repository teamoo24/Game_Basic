import * as PIXI from "pixi.js"

/**
* シーントランジションンのインターフェース
*/	
export default interface Transition {
	getContainer(): PIXI.Container | null;
	begin(): void;
	isBegan(): boolean;
	isActive(): boolean;
	update(dt: number): void;
	setCallback(callback: () => void):void;
}