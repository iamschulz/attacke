export const MyNewTheme: themeConfig = {
	name: "my-new-theme",
	colors: ["#4764a6", "#d3b447"],
	scene: {
		name: "scene",
		images: ["./assets/scene1.png", "./assets/scene2.png"],
		animationSpeed: 15,
	},
	obstacles: [
		{
			// castle
			a: { x: 819, y: 469 },
			b: { x: 819, y: 629 },
			c: { x: 1100, y: 629 },
			d: { x: 1100, y: 469 },
		},
	],
	players: [
		{
			default: {
				n: {
					name: "p1_n",
					images: ["./assets/p1_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p1_ne",
					images: ["./assets/p1_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p1_e",
					images: ["./assets/p1_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p1_se",
					images: ["./assets/p1_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p1_s",
					images: ["./assets/p1_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p1_sw",
					images: ["./assets/p1_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p1_w",
					images: ["./assets/p1_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p1_nw",
					images: ["./assets/p1_nw_default.png"],
					animationSpeed: 15,
				},
			},
			move: {
				n: {
					name: "p1_n",
					images: [
						"./assets/p1_n_move_1.png",
						"./assets/p1_n_move_2.png",
					],
					animationSpeed: 15,
				},
				ne: {
					name: "p1_ne",
					images: [
						"./assets/p1_ne_move_1.png",
						"./assets/p1_ne_move_2.png",
					],
					animationSpeed: 15,
				},
				e: {
					name: "p1_e",
					images: [
						"./assets/p1_e_move_1.png",
						"./assets/p1_e_move_2.png",
					],
					animationSpeed: 15,
				},
				se: {
					name: "p1_se",
					images: [
						"./assets/p1_se_move_1.png",
						"./assets/p1_se_move_2.png",
					],
					animationSpeed: 15,
				},
				s: {
					name: "p1_move_s",
					images: [
						"./assets/p1_s_move_1.png",
						"./assets/p1_s_move_2.png",
					],
					animationSpeed: 15,
				},
				sw: {
					name: "p1_sw",
					images: [
						"./assets/p1_sw_move_1.png",
						"./assets/p1_sw_move_2.png",
					],
					animationSpeed: 15,
				},
				w: {
					name: "p1_w",
					images: [
						"./assets/p1_w_move_1.png",
						"./assets/p1_w_move_2.png",
					],
					animationSpeed: 15,
				},
				nw: {
					name: "p1_nw",
					images: [
						"./assets/p1_nw_move_1.png",
						"./assets/p1_nw_move_2.png",
					],
					animationSpeed: 15,
				},
			},
			attack: {
				n: {
					name: "p1_n",
					images: ["./assets/p1_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p1_ne",
					images: ["./assets/p1_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p1_e",
					images: ["./assets/p1_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p1_se",
					images: ["./assets/p1_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p1_s",
					images: ["./assets/p1_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p1_sw",
					images: ["./assets/p1_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p1_w",
					images: ["./assets/p1_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p1_nw",
					images: ["./assets/p1_nw_default.png"],
					animationSpeed: 15,
				},
			},
			block: {
				n: {
					name: "p1_n",
					images: ["./assets/p1_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p1_ne",
					images: ["./assets/p1_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p1_e",
					images: ["./assets/p1_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p1_se",
					images: ["./assets/p1_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p1_s",
					images: ["./assets/p1_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p1_sw",
					images: ["./assets/p1_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p1_w",
					images: ["./assets/p1_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p1_nw",
					images: ["./assets/p1_nw_default.png"],
					animationSpeed: 15,
				},
			},
		},
		{
			default: {
				n: {
					name: "p2_n",
					images: ["./assets/p2_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p12ne",
					images: ["./assets/p2_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p2_e",
					images: ["./assets/p2_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p12se",
					images: ["./assets/p2_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p2_s",
					images: ["./assets/p2_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p12sw",
					images: ["./assets/p2_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p2_w",
					images: ["./assets/p2_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p12nw",
					images: ["./assets/p2_nw_default.png"],
					animationSpeed: 15,
				},
			},
			move: {
				n: {
					name: "p2_n",
					images: [
						"./assets/p2_n_move_1.png",
						"./assets/p2_n_move_2.png",
					],
					animationSpeed: 15,
				},
				ne: {
					name: "p2_ne",
					images: [
						"./assets/p2_ne_move_1.png",
						"./assets/p2_ne_move_2.png",
					],
					animationSpeed: 15,
				},
				e: {
					name: "p2_e",
					images: [
						"./assets/p2_e_move_1.png",
						"./assets/p2_e_move_2.png",
					],
					animationSpeed: 15,
				},
				se: {
					name: "p2_se",
					images: [
						"./assets/p2_se_move_1.png",
						"./assets/p2_se_move_2.png",
					],
					animationSpeed: 15,
				},
				s: {
					name: "p2_move_s",
					images: [
						"./assets/p2_s_move_1.png",
						"./assets/p2_s_move_2.png",
					],
					animationSpeed: 15,
				},
				sw: {
					name: "p2_sw",
					images: [
						"./assets/p2_sw_move_1.png",
						"./assets/p2_sw_move_2.png",
					],
					animationSpeed: 15,
				},
				w: {
					name: "p2_w",
					images: [
						"./assets/p2_w_move_1.png",
						"./assets/p2_w_move_2.png",
					],
					animationSpeed: 15,
				},
				nw: {
					name: "p2_nw",
					images: [
						"./assets/p2_nw_move_1.png",
						"./assets/p2_nw_move_2.png",
					],
					animationSpeed: 15,
				},
			},
			attack: {
				n: {
					name: "p2_n",
					images: ["./assets/p2_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p2_ne",
					images: ["./assets/p2_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p2_e",
					images: ["./assets/p2_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p2_se",
					images: ["./assets/p2_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p2_s",
					images: ["./assets/p2_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p2_sw",
					images: ["./assets/p2_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p2_w",
					images: ["./assets/p2_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p2_nw",
					images: ["./assets/p2_nw_default.png"],
					animationSpeed: 15,
				},
			},
			block: {
				n: {
					name: "p2_n",
					images: ["./assets/p2_n_default.png"],
					animationSpeed: 15,
				},
				ne: {
					name: "p2_ne",
					images: ["./assets/p2_ne_default.png"],
					animationSpeed: 15,
				},
				e: {
					name: "p2_e",
					images: ["./assets/p2_e_default.png"],
					animationSpeed: 15,
				},
				se: {
					name: "p2_se",
					images: ["./assets/p2_se_default.png"],
					animationSpeed: 15,
				},
				s: {
					name: "p2_s",
					images: ["./assets/p2_s_default.png"],
					animationSpeed: 15,
				},
				sw: {
					name: "p2_sw",
					images: ["./assets/p2_sw_default.png"],
					animationSpeed: 15,
				},
				w: {
					name: "p2_w",
					images: ["./assets/p2_w_default.png"],
					animationSpeed: 15,
				},
				nw: {
					name: "p2_nw",
					images: ["./assets/p2_nw_default.png"],
					animationSpeed: 15,
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
	bgAudio: "./assets/bg.mp3",
	attackAudio: "./assets/attack.mp3",
	blockAudio: "./assets/block.mp3",
};
