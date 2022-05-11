import { Vector, Polygon, Collider2d } from "collider2d";
import CollisionDetails from "collider2d/build/collision_details";

export class Obstacle {
	private collider: Collider2d;
	private obstacles: Obstacle[];
	private id: string;
	private object: rectangle;

	constructor(
		collider: Collider2d,
		obstacles: Obstacle[],
		id: string,
		object: rectangle
	) {
		this.collider = collider;
		this.obstacles = obstacles;
		this.id = id;
		this.object = object;

		this.obstacles.push(this);
	}

	public getId(): string {
		return this.id;
	}

	public getObject(): rectangle {
		return this.object;
	}

	public editObstacle(payload: rectangle) {
		this.object = payload;
	}

	public removeObstacle() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.id !== this.id
		);
	}

	public collidesWith(obstacle: Obstacle): CollisionDetails {
		const thisPolygon = new Polygon(new Vector(0, 0), [
			new Vector(this.object.a.x, this.object.a.y),
			new Vector(this.object.b.x, this.object.b.y),
			new Vector(this.object.c.x, this.object.c.y),
			new Vector(this.object.d.x, this.object.d.y),
		]);

		const otherPolygon = new Polygon(new Vector(0, 0), [
			new Vector(obstacle.object.a.x, obstacle.object.a.y),
			new Vector(obstacle.object.b.x, obstacle.object.b.y),
			new Vector(obstacle.object.c.x, obstacle.object.c.y),
			new Vector(obstacle.object.d.x, obstacle.object.d.y),
		]);

		return this.collider.testPolygonPolygon(
			thisPolygon,
			otherPolygon,
			true
		) as CollisionDetails;
	}
}
