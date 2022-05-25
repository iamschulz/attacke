export class Theme {
	private ctx: CanvasRenderingContext2D;
	public config: themeConfig;
	public assetsLoaded: boolean = false;
	private images: HTMLImageElement[] = [];
	private sprites: Sprite[] = [];

	constructor(ctx: CanvasRenderingContext2D, config: themeConfig) {
		this.ctx = ctx;
		this.config = config;

		this.assignGlobalColors();
		this.loadAssets();
	}

	private loadImage(src: string): Promise<HTMLImageElement> {
		const url = `./themes/${this.config.name}/${src}`;
		return fetch(url).then(() => {
			const img = new Image();
			img.src = url;
			if (!this.images.includes(img)) {
				this.images.push(img);
			}
			return img;
		});
	}

	public assignGlobalColors() {
		document.documentElement.style.setProperty("--color-p1", this.config.colors[0]);
		document.documentElement.style.setProperty("--color-p2", this.config.colors[1]);
	}

	public loadAssets() {
		const toLoad: HTMLImageElement[] = [];

		this.config.scene.images.forEach(async (image) => {
			const imageResp = await this.loadImage(image);
			if (toLoad.includes(imageResp)) {
				return;
			}
			imageResp.onload = () => {
				this.onAssetLoaded(toLoad);
			};
			toLoad.push(imageResp);
		});
		this.sprites.push(this.config.scene);

		this.config.players.forEach((player) => {
			const spriteSets = ["default", "move", "attack", "block"];
			spriteSets.forEach((spriteSet) => {
				Object.keys(player[spriteSet]).forEach((key: string) => {
					player[spriteSet][key].images.forEach(async (image: string) => {
						const imageResp = await this.loadImage(image);
						if (toLoad.includes(imageResp)) {
							return;
						}
						imageResp.onload = () => {
							this.onAssetLoaded(toLoad);
						};
						toLoad.push(imageResp);
					});
					this.sprites.push(player[spriteSet][key]);
				});
			});
		});
	}

	private onAssetLoaded(assetList: HTMLImageElement[]) {
		const loadComplete = assetList.every((x) => x.complete);
		const progress = Math.floor(
			((assetList.length - assetList.filter((x) => !x.complete).length) / assetList.length) * 100
		);
		const loadingEvent: LoadingEvent = new CustomEvent("loadingEvent", {
			detail: {
				progress,
			},
		});
		this.ctx.canvas.dispatchEvent(loadingEvent);

		if (loadComplete) {
			this.assetsLoaded = true;
		}
	}

	public drawSprite(ctx: CanvasRenderingContext2D, name: string, pos: coordinates, frameCount = 0) {
		const sprite = this.sprites.find((x) => x.name === name);
		if (!sprite) {
			return;
		}

		const spriteFrame = Math.floor((frameCount / sprite.animationSpeed) % sprite.images.length);

		const img = this.images.find((x) => x.src.endsWith(`${sprite.images[spriteFrame].replace("./", "")}`));

		if (!img) {
			return;
		}

		ctx.drawImage(img, pos.x + sprite.offset.x, pos.y + sprite.offset.y);
	}
}
