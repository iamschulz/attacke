import { Theme } from "../../public/themes/theme";
import { Game } from "./main";
import { Obstacle } from "./obstacle";

export class Scene {
	private ctx: CanvasRenderingContext2D;
	private theme: Theme;
	private width: number;
	private height: number;
	private obstacles: Obstacle[];

	constructor(game: Game, theme: Theme) {
		this.ctx = game.ctx;
		this.theme = theme;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
		this.obstacles = this.theme.config.obstacles.map(
			(obstacle, i) =>
				new Obstacle(
					game.collider,
					game.obstacles,
					`scene${i}`,
					obstacle
				)
		);

		this.ctx.canvas.addEventListener("tick", () => {
			this.draw();
		});
	}

	private draw() {
		this.theme.drawAsset(
			this.ctx,
			this.theme.config.scene,
			{ x: 0, y: 0 },
			{ width: this.width, height: this.height }
		);
	}
}
