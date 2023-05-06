import { Theme } from "../../public/themes/theme";

export class Gui {
	private ctx: CanvasRenderingContext2D;
	private theme: Theme;
	private score: number[];

	constructor(ctx: CanvasRenderingContext2D, theme: Theme, players: number) {
		this.ctx = ctx;
		this.theme = theme;
		this.score = [];
		this.score.length = players;
		this.score.fill(0);

		this.ctx.canvas.addEventListener("tick", () => {
			this.draw();
		});
	}

	incrementScore(player: number) {
		this.score[player]++;
	}

	draw() {
		this.ctx.save();
		this.score.forEach((score, player) => {
			this.ctx.shadowColor = this.theme.config.colors[player];
			this.ctx.shadowBlur = 8;
			this.ctx.fillStyle = this.theme.config.colors[player];
			this.ctx.font = `80px PressStart2P`;
			this.ctx.textAlign = player === 0 ? "right" : "left";

			if (this.theme.config.shader) {
				this.theme.config.shader(this.ctx);
			}

			this.ctx.fillText(score.toString(), this.ctx.canvas.width / 2 + (100 * (player === 0 ? -1 : 1)) / 2, 110);
		});
		this.ctx.restore();
	}
}
