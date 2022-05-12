import { Theme } from "../../public/themes/theme";

export class Scene {
	private ctx: CanvasRenderingContext2D;
	private theme: Theme;
	private width: number;
	private height: number;

	constructor(ctx: CanvasRenderingContext2D, theme: Theme) {
		this.ctx = ctx;
		this.theme = theme;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;

		ctx.canvas.addEventListener("tick", () => {
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
