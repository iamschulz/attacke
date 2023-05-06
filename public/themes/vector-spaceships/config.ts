const getBgNames = () => {
	const images: string[] = [];
	for (let i = 0; i <= 59; i++) {
		images.push(`./assets/bg/bg_${("0" + i).slice(-2)}.jpg`);
	}
	return images;
};

export const VectorSpaceships: themeConfig = {
	name: "vector-spaceships",
	colors: ["#368dc8", "#d3b447"],
	scene: {
		name: "scene",
		images: getBgNames(),
		animationSpeed: 2,
		offset: { x: 0, y: 0 },
	},
	obstacles: [
		{
			// east wall
			a: { x: 0, y: 0 },
			b: { x: 0, y: 1080 },
			c: { x: 10, y: 1080 },
			d: { x: 10, y: 0 },
		},
		{
			// north wall
			a: { x: 0, y: 0 },
			b: { x: 1920, y: 10 },
			c: { x: 1920, y: 10 },
			d: { x: 0, y: 0 },
		},
		{
			// west wall
			a: { x: 1920, y: 0 },
			b: { x: 1920, y: 1080 },
			c: { x: 1920 - 10, y: 1080 },
			d: { x: 1920 - 10, y: 0 },
		},
		{
			// south wall
			a: { x: 0, y: 1080 },
			b: { x: 1920, y: 1080 },
			c: { x: 1920, y: 1080 - 10 },
			d: { x: 0, y: 1080 - 10 },
		},
	],
	players: [
		{
			default: {
				x: {
					name: "p1",
					images: ["./assets/p1.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			move: {
				x: {
					name: "p1_move",
					images: [
						"./assets/p1_move_1.png",
						"./assets/p1_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			attack: {
				x: {
					name: "p1_attack",
					images: [
						"./assets/p1_attack_1.png",
						"./assets/p1_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: 0 },
				},
			},
			block: {
				x: {
					name: "p1_block",
					images: ["./assets/p1_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
		},
		{
			default: {
				x: {
					name: "p2",
					images: ["./assets/p2.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			move: {
				x: {
					name: "p2_move",
					images: [
						"./assets/p2_move_1.png",
						"./assets/p2_move_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: 0 },
				},
			},
			attack: {
				x: {
					name: "p2_attack",
					images: [
						"./assets/p2_attack_1.png",
						"./assets/p2_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: 0 },
				},
			},
			block: {
				x: {
					name: "p2_block",
					images: ["./assets/p2_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
		},
	],
	turnSprites: true,
	shader: (ctx: CanvasRenderingContext2D) => {
		ctx.shadowColor = "rgba(0,0,0,0.3)";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 5;
	},
	bgAudio: "./assets/TheMothership.mp3",
	attackAudio: "./assets/attack.mp3",
	blockAudio: "./assets/attack.mp3",
	collideAudio: "./assets/collide.mp3",
	winAudio: "./assets/explosion.mp3",
};
