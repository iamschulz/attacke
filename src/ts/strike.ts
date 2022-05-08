export class Strike {
	ctx: CanvasRenderingContext2D;
	player: number;
	range: number;

	constructor(ctx: CanvasRenderingContext2D, player: number, range: number) {
		this.ctx = ctx;
		this.player = player;
		this.range = range;
	}
}
