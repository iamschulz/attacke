import config from '../../config.json' assert { type: 'json' };

export class Gui {
	private ctx: CanvasRenderingContext2D;
	players: number;
	private score: number[];

	constructor(ctx: CanvasRenderingContext2D, players: number) {
		this.ctx = ctx;
		this.score = [];
		this.score.length = players;
		this.score.fill(0);

		this.ctx.canvas.addEventListener('tick', () => {
			this.draw();
		});
	}

	incrementScore(player: number) {
		this.score[player]++;
	}

	draw() {
		this.ctx.save();
		this.score.forEach((score, player) => {
			this.ctx.fillStyle = config.theme.player[player];
			this.ctx.font = `100px angryblue`;
			this.ctx.textAlign = player === 0 ? 'right' : 'left';
			this.ctx.fillText(score.toString(), this.ctx.canvas.width / 2 + (100 * (player === 0 ? -1 : 1)) / 2, 100);
		});
		this.ctx.restore();
	}
}
