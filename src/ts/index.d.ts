declare type coordinates = {
	x: number;
	y: number;
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
