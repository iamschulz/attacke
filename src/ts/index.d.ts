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
