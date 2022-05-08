export function rotate(object: rectangle, angle: number, offset = { x: 0, y: 0 }): rectangle {
	const { a, b, c, d } = object;
	const center = {
		x: (a.x + b.x + c.x + d.x) / 4 - offset.x,
		y: (a.y + b.y + c.y + d.y) / 4,
	};
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	const rotatedA = {
		x: (a.x - center.x) * cos - (a.y - center.y) * sin + center.x,
		y: (a.x - center.x) * sin + (a.y - center.y) * cos + center.y,
	};
	const rotatedB = {
		x: (b.x - center.x) * cos - (b.y - center.y) * sin + center.x,
		y: (b.x - center.x) * sin + (b.y - center.y) * cos + center.y,
	};
	const rotatedC = {
		x: (c.x - center.x) * cos - (c.y - center.y) * sin + center.x,
		y: (c.x - center.x) * sin + (c.y - center.y) * cos + center.y,
	};
	const rotatedD = {
		x: (d.x - center.x) * cos - (d.y - center.y) * sin + center.x,
		y: (d.x - center.x) * sin + (d.y - center.y) * cos + center.y,
	};

	// todo: offset doesnt work properly yet

	return { a: rotatedA, b: rotatedB, c: rotatedC, d: rotatedD };
}

export function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
