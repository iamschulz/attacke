export class Theme {
	public config: themeConfig;
	public assetsLoaded: boolean;
	private assets: HTMLImageElement[] = [];

	constructor(config: themeConfig) {
		this.config = config;
		this.assetsLoaded = false;

		this.assignGlobalColors();
		this.loadAssets();
	}

	private getAssetUrl(asset: string): string {
		return `./themes/${this.config.name}/${asset}`;
	}

	public assignGlobalColors() {
		document.documentElement.style.setProperty("--color-p1", this.config.colors[0]);
		document.documentElement.style.setProperty("--color-p2", this.config.colors[1]);
	}

	public loadAssets() {
		const toLoad: string[] = [];
		toLoad.push(this.config.scene);
		this.config.players.forEach((player) => {
			const spriteSets = ["default", "move", "attack", "block"];
			spriteSets.forEach((spriteSet) => {
				Object.keys(player[spriteSet]).forEach((key) => {
					if (toLoad.includes(player[spriteSet][key])) {
						return;
					}
					toLoad.push(player[spriteSet][key]);
				});
			});
		});

		// load assets
		let loaded = 0;
		toLoad.forEach((asset) => {
			const img = new Image();
			img.src = this.getAssetUrl(asset);
			img.addEventListener("load", () => {
				this.assets.push(img);
				loaded++;
				if (loaded === this.assets.length) {
					this.assetsLoaded = true;
				}
			});
		});
	}

	public drawAsset(ctx: CanvasRenderingContext2D, asset: string, pos: coordinates, dims: dimensions) {
		const img = this.assets.find((x) => x.src.endsWith(asset.replace("./assets", "/assets")));
		if (!img) {
			return;
		}

		ctx.drawImage(img, pos.x, pos.y, dims.width, dims.height);
	}
}
