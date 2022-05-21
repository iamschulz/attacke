export const getGameAssets = (): string[] => {
	const assets = [];

	let retroKnightAssets = [
		"scene1.png",
		"scene2.png",
		"attack.mp3",
		"block.mp3",
		"bump.mp3",
		"win.mp3",
		"xDeviruchi_Decisive_Battle_01.mp3",
	];
	["p1", "p2"].forEach((player) => {
		["attack_1", "attack_2", "move_1", "move_2", "block", "default"].forEach((action) => {
			["n", "ne", "e", "se", "s", "sw", "w", "nw"].forEach((direction) => {
				retroKnightAssets.push(`${player}_${direction}_${action}.png`);
			});
		});
	});
	retroKnightAssets = retroKnightAssets.map((x) => `/themes/retro-knights/assets/${x}`);

	assets.push(...retroKnightAssets);
	return assets;
};
