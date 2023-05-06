import { Theme } from "../../public/themes/theme";
import { Game } from "./main";
import { Obstacle } from "./obstacle";

export class Scene {
    private game: Game;
	private ctx: CanvasRenderingContext2D;
	private theme: Theme;
	private width: number;
	private height: number;
	private obstacles: Obstacle[];

	constructor(game: Game, theme: Theme) {
        this.game = game;
		this.ctx = game.ctx;
		this.theme = theme;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
		this.obstacles = this.getObstacles();

		this.ctx.canvas.addEventListener("tick", (event: TickEvent) => {
			this.draw(event?.detail?.frameCount || 0);
		});
	}

	private draw(frameCount: number) {
		this.theme.drawSprite(
			this.ctx,
			this.theme.config.scene.name,
			{ x: 0, y: 0 },
			frameCount
		);
	}

    private getObstacles(): Obstacle[] {
        return this.theme.config.obstacles.map(
			(obstacle, i) =>
				new Obstacle(
					this.game.collider,
					this.game.obstacles,
					`scene${i}`,
					obstacle
				)
		);
    }

    public switchTheme(theme: Theme) {
        this.theme = theme;
        this.obstacles = this.getObstacles();
    }
}
