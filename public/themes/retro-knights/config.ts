export const RetroKnights: themeConfig = {
	name: "retro-knights",
	colors: ["#368dc8", "#d3b447"],
	scene: {
		name: "scene",
		images: ["./assets/scene1.png", "./assets/scene2.png"],
		animationSpeed: 30,
		offset: { x: 0, y: 0 },
	},
	obstacles: [
		{
			// castle
			a: { x: 819, y: 469 },
			b: { x: 819, y: 629 },
			c: { x: 1100, y: 629 },
			d: { x: 1100, y: 469 },
		},
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
				n: {
					name: "p1_n",
					images: ["./assets/p1_n_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p1_ne",
					images: ["./assets/p1_ne_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p1_e",
					images: ["./assets/p1_e_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p1_se",
					images: ["./assets/p1_se_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p1_s",
					images: ["./assets/p1_s_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p1_sw",
					images: ["./assets/p1_sw_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p1_w",
					images: ["./assets/p1_w_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p1_nw",
					images: ["./assets/p1_nw_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			move: {
				n: {
					name: "p1_move_n",
					images: [
						"./assets/p1_n_move_1.png",
						"./assets/p1_n_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p1_move_ne",
					images: [
						"./assets/p1_ne_move_1.png",
						"./assets/p1_ne_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p1_move_e",
					images: [
						"./assets/p1_e_move_1.png",
						"./assets/p1_e_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p_move1_se",
					images: [
						"./assets/p1_se_move_1.png",
						"./assets/p1_se_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p1_move_s",
					images: [
						"./assets/p1_s_move_1.png",
						"./assets/p1_s_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p1_move_sw",
					images: [
						"./assets/p1_sw_move_1.png",
						"./assets/p1_sw_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p1_move_w",
					images: [
						"./assets/p1_w_move_1.png",
						"./assets/p1_w_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p1_move_nw",
					images: [
						"./assets/p1_nw_move_1.png",
						"./assets/p1_nw_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			attack: {
				n: {
					name: "p1_n_attack",
					images: [
						"./assets/p1_n_attack_1.png",
						"./assets/p1_n_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: -150 },
				},
				ne: {
					name: "p1_ne_attack",
					images: [
						"./assets/p1_ne_attack_1.png",
						"./assets/p1_ne_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: -69 }, // noice
				},
				e: {
					name: "p1_e_attack",
					images: [
						"./assets/p1_e_attack_1.png",
						"./assets/p1_e_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 7, y: 0 },
				},
				se: {
					name: "p1_se_attack",
					images: [
						"./assets/p1_se_attack_1.png",
						"./assets/p1_se_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 7, y: 0 },
				},
				s: {
					name: "p1_s_attack",
					images: [
						"./assets/p1_s_attack_1.png",
						"./assets/p1_s_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p1_sw_attack",
					images: [
						"./assets/p1_sw_attack_1.png",
						"./assets/p1_sw_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: -112, y: 0 },
				},
				w: {
					name: "p1_w_attack",
					images: [
						"./assets/p1_w_attack_1.png",
						"./assets/p1_w_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: -150, y: 0 },
				},
				nw: {
					name: "p1_nw_attack",
					images: [
						"./assets/p1_nw_attack_1.png",
						"./assets/p1_nw_attack_2.png",
					],
					animationSpeed: 8,
					offset: { x: -100, y: -75 },
				},
			},
			block: {
				n: {
					name: "p1_block_n",
					images: ["./assets/p1_n_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p1_block_ne",
					images: ["./assets/p1_ne_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p1_block_e",
					images: ["./assets/p1_e_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p1_block_se",
					images: ["./assets/p1_se_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p1_block_s",
					images: ["./assets/p1_s_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p1_block_sw",
					images: ["./assets/p1_sw_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p1_block_w",
					images: ["./assets/p1_w_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p1_block_nw",
					images: ["./assets/p1_nw_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
		},
		{
			default: {
				n: {
					name: "p2_n",
					images: ["./assets/p2_n_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p2_ne",
					images: ["./assets/p2_ne_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p2_e",
					images: ["./assets/p2_e_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p2_se",
					images: ["./assets/p2_se_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p2_s",
					images: ["./assets/p2_s_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p2_sw",
					images: ["./assets/p2_sw_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p2_w",
					images: ["./assets/p2_w_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p_2nw",
					images: ["./assets/p2_nw_default.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			move: {
				n: {
					name: "p2_move_n",
					images: [
						"./assets/p2_n_move_1.png",
						"./assets/p2_n_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p2_move_ne",
					images: [
						"./assets/p2_ne_move_1.png",
						"./assets/p2_ne_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p2_move_e",
					images: [
						"./assets/p2_e_move_1.png",
						"./assets/p2_e_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p2_move_se",
					images: [
						"./assets/p2_se_move_1.png",
						"./assets/p2_se_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p2_move_s",
					images: [
						"./assets/p2_s_move_1.png",
						"./assets/p2_s_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p2_move_sw",
					images: [
						"./assets/p2_sw_move_1.png",
						"./assets/p2_sw_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p2_move_w",
					images: [
						"./assets/p2_w_move_1.png",
						"./assets/p2_w_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p2_move_nw",
					images: [
						"./assets/p2_nw_move_1.png",
						"./assets/p2_nw_move_2.png",
					],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
			attack: {
				n: {
					name: "p2_n_attack",
					images: [
						"./assets/p2_n_attack_1.png",
						"./assets/p2_n_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: -150 },
				},
				ne: {
					name: "p2_ne_attack",
					images: [
						"./assets/p2_ne_attack_1.png",
						"./assets/p2_ne_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: -69 }, // noice
				},
				e: {
					name: "p2_e_attack",
					images: [
						"./assets/p2_e_attack_1.png",
						"./assets/p2_e_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 7, y: 0 },
				},
				se: {
					name: "p2_se_attack",
					images: [
						"./assets/p2_se_attack_1.png",
						"./assets/p2_se_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 7, y: 0 },
				},
				s: {
					name: "p2_s_attack",
					images: [
						"./assets/p2_s_attack_1.png",
						"./assets/p2_s_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p2_sw_attack",
					images: [
						"./assets/p2_sw_attack_1.png",
						"./assets/p2_sw_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: -112, y: 0 },
				},
				w: {
					name: "p2_w_attack",
					images: [
						"./assets/p2_w_attack_1.png",
						"./assets/p2_w_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: -150, y: 0 },
				},
				nw: {
					name: "p2_nw_attack",
					images: [
						"./assets/p2_nw_attack_1.png",
						"./assets/p2_nw_attack_2.png",
					],
					animationSpeed: 2,
					offset: { x: -100, y: -75 },
				},
			},
			block: {
				n: {
					name: "p2_block_n",
					images: ["./assets/p2_n_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				ne: {
					name: "p2_block_ne",
					images: ["./assets/p2_ne_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				e: {
					name: "p2_block_e",
					images: ["./assets/p2_e_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				se: {
					name: "p2_block_se",
					images: ["./assets/p2_se_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				s: {
					name: "p2_block_s",
					images: ["./assets/p2_s_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				sw: {
					name: "p2_block_sw",
					images: ["./assets/p2_sw_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				w: {
					name: "p2_block_w",
					images: ["./assets/p2_w_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
				nw: {
					name: "p2_block_nw",
					images: ["./assets/p2_nw_block.png"],
					animationSpeed: 8,
					offset: { x: 0, y: 0 },
				},
			},
		},
	],
	turnSprites: false,
	shader: (ctx: CanvasRenderingContext2D) => {
		ctx.shadowColor = "rgba(0,0,0,0.3)";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 5;
	},
	bgAudio: "./assets/xDeviruchi_Decisive_Battle_01.mp3",
	attackAudio: "./assets/attack.mp3",
	blockAudio: "./assets/block.mp3",
	collideAudio: "./assets/bump.mp3",
	winAudio: "./assets/win.mp3",
};
