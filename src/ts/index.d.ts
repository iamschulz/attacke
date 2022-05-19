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

declare interface TickEvent extends Event {
	readonly detail?: {
		frameCount: number;
	};
}

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

declare type Sprite = {
	name: string;
	images: string[];
	animationSpeed: number; // use next image every N frames, max 60
	offset: coordinates;
};

declare type SpriteSet = {
	n: Sprite; // sprite facing north
	ne: Sprite; // sprite facing north-east
	e: Sprite; // etc
	se: Sprite;
	s: Sprite;
	sw: Sprite;
	w: Sprite;
	nw: Sprite;
};

declare type themeConfig = {
	name: string; // has to match folder name
	scene: Sprite; // scene image, 1920x1080
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
