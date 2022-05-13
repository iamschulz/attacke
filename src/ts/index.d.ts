declare type coordinates = {
	x: number;
	y: number;
};

declare type dimensions = {
	width: number;
	height: number;
};

declare type rectangle = {
	a: coordinates;
	b: coordinates;
	c: coordinates;
	d: coordinates;
};

declare interface FinishEvent extends Event {
	readonly detail?: {
		winner: number;
	};
}

declare interface GamepadButtonEvent extends Event {
	readonly detail?: {
		gamepadId: number;
		buttonIndex: number;
		button: GamepadButton;
	};
}

declare interface GamepadStickEvent extends Event {
	readonly detail?: {
		gamepadId: number;
		stickIndex: number;
		stick: coordinates;
	};
}

declare type SpriteSet = {
	n: string; // sprite facing north
	ne: string; // sprite facing north-east
	e: string; // etc
	se: string;
	s: string;
	sw: string;
	w: string;
	nw: string;
};

declare type themeConfig = {
	name: string; // has to match folder name
	scene: string; // link to scene image, 1920x1080
	colors: string[];
	obstacles: rectangle[]; // outline obsacles within the scene
	players: {
		default: SpriteSet; // player when standing still, 100x100
		move: SpriteSet; // player when moving, 100x100
		attack: SpriteSet; // player when attacking, 250x100
		block: SpriteSet; // player when blocking, 100x100
	}[]; // provide sprites for each player, else player 1 sprites will be re-used
	turnSprites?: boolean;
	shader?: (CanvasRenderingContext2D) => void;
	bgAudio: string; // link to background music audio
	attackAudio: string; // link to attack audio
	blockAudio: string; // link to block audio
};
