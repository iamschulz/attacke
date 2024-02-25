import { Audio } from "./audio";
import config from "../../config.json" assert { type: "json" };
import { Collider2d, Polygon, Vector } from "collider2d";
import { Game } from "./main";
import { clamp, rotate } from "./util";
import { Obstacle } from "./obstacle";
import { Theme } from "../../public/themes/theme";
import { GamepadAdapter } from "./gamepadAdapter";

export class Character {
	private game: Game;
	private ctx: CanvasRenderingContext2D;
	private audio: Audio;
	private theme: Theme;
	private active: boolean;
	private collider: Collider2d;
	private gamepads: GamepadAdapter;
	private players: Character[];
	private obstacles: Obstacle[];
	private player: number;
	private size: number;
	private position: coordinates;
	private orientation: number;
	private speed: number;
	private maxVelocity: number;
	private range: number;
	private attackDuration: number;
	private blockDuration: number;
	private cooldownDuration: number;
	private velocity: coordinates;
	private obstacle: Obstacle;
	private action: {
		movingX: number;
		movingY: number;
		attacking: boolean;
		blocking: boolean;
		cooldown: boolean;
	};

	constructor(game: Game, player: number, theme: Theme) {
		this.game = game;
		this.ctx = game.ctx;
		this.audio = game.audio;
		this.theme = theme;
		this.active = false;
		this.gamepads = game.gamepadAdapter;
		this.collider = game.collider;
		this.players = game.players;
		this.obstacles = game.obstacles;
		this.player = player;
		this.size = 100;
		this.position = this.getInitialPosition();
		this.orientation = 0;
		this.speed = 1;
		this.range = 150;
		this.attackDuration = 200;
		this.blockDuration = 300;
		this.cooldownDuration = 800;
		this.maxVelocity = 20;
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.obstacle = this.createObstacle(`player${this.player}`);
		this.action = {
			movingX: 0,
			movingY: 0,
			attacking: false,
			blocking: false,
			cooldown: false,
		};

		this.registerControls();

		window.requestAnimationFrame(() => {
			this.move();
			this.turn();
		});

		this.ctx.canvas.addEventListener("tick", (event: TickEvent) => {
			this.onNextTick(event);
		});
	}

	private getInitialPosition(): { x: number; y: number } {
		if (this.player === 0) {
			return { x: 50, y: 50 };
		} else {
			return {
				x: this.ctx.canvas.width - 50 - this.size,
				y: this.ctx.canvas.height - 50 - this.size,
			};
		}
	}

	private createObstacle(id: string): Obstacle {
		return new Obstacle(this.collider, this.obstacles, id, {
			a: { x: this.position.x, y: this.position.y },
			b: { x: this.position.x + this.size, y: this.position.y },
			c: {
				x: this.position.x + this.size,
				y: this.position.y + this.size,
			},
			d: { x: this.position.x, y: this.position.y + this.size },
		});
	}

	private registerControls(): void {
		// move left
		config.controls[this.player].left.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key && event.repeat === false) {
					this.action.movingX = -1;
				}
			});
			document.addEventListener("keyup", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key) {
					this.action.movingX = 0;
				}
			});
		});

		// move right
		config.controls[this.player].right.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key && event.repeat === false) {
					this.action.movingX = 1;
				}
			});
			document.addEventListener("keyup", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key) {
					this.action.movingX = 0;
				}
			});
		});

		// move up
		config.controls[this.player].up.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key && event.repeat === false) {
					this.action.movingY = -1;
				}
			});
			document.addEventListener("keyup", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key) {
					this.action.movingY = 0;
				}
			});
		});

		// move down
		config.controls[this.player].down.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key && event.repeat === false) {
					this.action.movingY = 1;
				}
			});
			document.addEventListener("keyup", (event: KeyboardEvent) => {
				this.captureEvent(event);
				if (event.code === key) {
					this.action.movingY = 0;
				}
			});
		});

		// move by stick
		document.addEventListener(
			"gamepadStickMove",
			(event: GamepadStickEvent) => {
				if (
					event.detail?.gamepadId !== this.player ||
					event.detail.stickIndex !== 0
				) {
					return;
				}

				this.action.movingX = event.detail.stick.x;
				this.action.movingY = event.detail.stick.y;
			}
		);

		// attack
		config.controls[this.player].attack.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				if (
					this.active &&
					event.code === key &&
					event.repeat === false &&
					!this.action.cooldown
				) {
					this.action.attacking = true;
				}
			});

			document.addEventListener(
				"gamepadButtonDown",
				(event: GamepadButtonEvent) => {
					if (
						event.detail?.gamepadId === this.player &&
						event.detail.buttonIndex === config.gamepad.attack &&
						!this.action.cooldown
					) {
						this.action.attacking = true;
					}
				}
			);
		});

		// block
		config.controls[this.player].block.forEach((key: string) => {
			document.addEventListener("keydown", (event: KeyboardEvent) => {
				if (
					this.active &&
					event.code === key &&
					event.repeat === false &&
					!this.action.cooldown
				) {
					this.action.blocking = true;
				}
			});

			document.addEventListener(
				"gamepadButtonDown",
				(event: GamepadButtonEvent) => {
					if (
						event.detail?.gamepadId === this.player &&
						event.detail.buttonIndex === config.gamepad.block &&
						!this.action.cooldown
					) {
						this.action.blocking = true;
					}
				}
			);
		});
	}

	private captureEvent(event: KeyboardEvent): void {
		if (
			event.target === this.ctx.canvas &&
			config.controls.find((x) =>
				Object.values(x).some((y) => y.includes(event.code))
			)
		) {
			event.preventDefault();
		}
	}

	public setActive(active: boolean): void {
		this.reset();
		this.active = active;
	}

	private collide(): void {
		const obstacles = this.obstacles.filter(
			(obstacle) => obstacle.getId() !== this.obstacle.getId()
		);
		obstacles.forEach((obstacle) => {
			const collision = this.obstacle.collidesWith(obstacle);
			const friction = 0.8;

			if (!collision) {
				return;
			}

			this.velocity.x =
				(this.velocity.x + collision.overlapV.x * -1) * friction;
			this.velocity.y =
				(this.velocity.y + collision.overlapV.y * -1) * friction;

			this.audio.play(this.theme.config.collideAudio);
			this.gamepads.vibrate(this.player, 0.3, 0.3, 80);
		});
	}

	private move(): void {
		const { position, velocity, action } = this;
		const newX =
			position.x + action.movingX * this.speed + velocity.x * this.speed;
		const newY =
			position.y + action.movingY * this.speed + velocity.y * this.speed;

		position.x = newX;
		position.y = newY;

		if (position.x < 0) {
			position.x = 0;
		} else if (newX > this.ctx.canvas.width - this.size) {
			position.x = this.ctx.canvas.width - this.size;
		}

		if (position.y < 0) {
			position.y = 0;
		} else if (newY > this.ctx.canvas.height - this.size) {
			position.y = this.ctx.canvas.height - this.size;
		}

		this.obstacle.editObstacle({
			a: { x: position.x, y: position.y },
			b: { x: position.x + this.size, y: position.y },
			c: { x: position.x + this.size, y: position.y + this.size },
			d: { x: position.x, y: position.y + this.size },
		});

		this.velocity.x = clamp(
			(action.movingX
				? this.velocity.x + action.movingX
				: this.velocity.x * 0.8) * this.speed,
			this.maxVelocity * -1,
			this.maxVelocity
		);
		this.velocity.y = clamp(
			(action.movingY
				? this.velocity.y + action.movingY
				: this.velocity.y * 0.8) * this.speed,
			this.maxVelocity * -1,
			this.maxVelocity
		);
	}

	private turn(): void {
		const otherPlayer = this.player === 0 ? 1 : 0;
		const orientationTarget: coordinates = this.players[otherPlayer]
			?.position || { x: 0, y: 0 };
		const angle = Math.atan2(
			orientationTarget.y - this.position.y,
			orientationTarget.x - this.position.x
		);
		this.orientation = angle;

		const obstacle = {
			a: { x: this.position.x, y: this.position.y },
			b: { x: this.position.x + this.size, y: this.position.y },
			c: {
				x: this.position.x + this.size,
				y: this.position.y + this.size,
			},
			d: { x: this.position.x, y: this.position.y + this.size },
		};

		const rotatedObstacle = rotate(
			{
				a: { x: this.position.x, y: this.position.y },
				b: { x: this.position.x + this.size, y: this.position.y },
				c: {
					x: this.position.x + this.size,
					y: this.position.y + this.size,
				},
				d: { x: this.position.x, y: this.position.y + this.size },
			},
			this.orientation
		);

		this.obstacle.editObstacle(
			this.theme.config.turnSprites ? rotatedObstacle : obstacle
		);
	}

	private attack(): void {
		if (!this.active || !this.action.attacking || this.action.cooldown) {
			return;
		}

		this.action.cooldown = true;

		// strike duration
		window.setTimeout(() => {
			this.action.attacking = false;
		}, this.attackDuration);

		// cooldown to next attack/block
		window.setTimeout(() => {
			this.action.cooldown = false;
		}, this.cooldownDuration);

		this.strike();
	}

	private getWeaponPosition(): rectangle {
		return rotate(
			{
				a: { x: this.position.x, y: this.position.y },
				b: {
					x: this.position.x + this.size + this.range,
					y: this.position.y,
				},
				c: {
					x: this.position.x + this.size + this.range,
					y: this.position.y + this.size,
				},
				d: { x: this.position.x, y: this.position.y + this.size },
			},
			this.orientation,
			{ x: this.range / 2, y: 0 } // todo: this works only by chance. need to refactor!
		);
	}

	private strike(): void {
		const otherPlayerId = this.player === 0 ? 1 : 0;
		const otherPlayer: rectangle =
			this.players[otherPlayerId].obstacle?.getObject();

		this.gamepads.vibrate(this.player, 0.7, 0.7, 100);

		const blocked = this.players[otherPlayerId].action.blocking;
		if (blocked) {
			this.audio.play(this.theme.config.blockAudio);
			this.gamepads.vibrate(otherPlayerId, 0.3, 0.3, 100);
			return;
		}

		this.audio.play(this.theme.config.attackAudio);

		const otherPlayerPolygon = new Polygon(new Vector(0, 0), [
			new Vector(otherPlayer.a.x, otherPlayer.a.y),
			new Vector(otherPlayer.b.x, otherPlayer.b.y),
			new Vector(otherPlayer.c.x, otherPlayer.c.y),
			new Vector(otherPlayer.d.x, otherPlayer.d.y),
		]);

		const weaponPosition = this.getWeaponPosition();
		const weaponPolygon = new Polygon(new Vector(0, 0), [
			new Vector(weaponPosition.a.x, weaponPosition.a.y),
			new Vector(weaponPosition.b.x, weaponPosition.b.y),
			new Vector(weaponPosition.c.x, weaponPosition.c.y),
			new Vector(weaponPosition.d.x, weaponPosition.d.y),
		]);

		const hit = this.collider.testPolygonPolygon(
			weaponPolygon,
			otherPlayerPolygon
		) as boolean;
		if (hit) {
			setTimeout(() => {
				this.gamepads.vibrate(this.player, 1, 0, 100);
			}, 0);
			setTimeout(() => {
				this.gamepads.vibrate(this.player, 1, 0, 380);
			}, 190);

			this.gamepads.vibrate(otherPlayerId, 1, 1, 500);
			this.finish();
		}
	}

	private finish(): void {
		const finish: FinishEvent = new CustomEvent("countdown", {
			detail: {
				winner: this.player,
			},
		});
		this.audio.play(this.theme.config.winAudio);

		this.ctx.canvas.dispatchEvent(finish);
	}

	private block(): void {
		if (!this.action.blocking || this.action.cooldown) {
			return;
		}

		this.action.cooldown = true;

		// block duration
		window.setTimeout(() => {
			this.action.blocking = false;
		}, this.blockDuration);

		// cooldown to next attack/block
		window.setTimeout(() => {
			this.action.cooldown = false;
		}, this.cooldownDuration);
	}

	private reset(): void {
		this.position = this.getInitialPosition();
		this.velocity = { x: 0, y: 0 };
		this.move();
		window.requestAnimationFrame(() => {
			this.turn();
		});
	}

	private getSprite(): Sprite {
		const directions = ["w", "nw", "n", "ne", "e", "se", "s", "sw", "w"];
		const zones = directions.map((z, i) => ({
			zone: z,
			start: Math.PI * -1 - Math.PI / 8 + (i * Math.PI) / 4,
			end: Math.PI * -1 - Math.PI / 8 + ((i + 1) * Math.PI) / 4,
		}));

		const direction = this.theme.config.turnSprites
			? undefined
			: zones.find(
					(zone) =>
						this.orientation >= zone.start &&
						this.orientation < zone.end
			  );

		let action = "default";
		if ((this.active && this.action.blocking) || this.action.blocking) {
			action = "block";
		} else if (
			(this.active && this.action.attacking) ||
			this.action.attacking
		) {
			action = "attack";
		} else if (
			this.active &&
			(this.action.movingX || this.action.movingY)
		) {
			action = "move";
		}

		return this.theme.config.players[this.player][action][
			direction?.zone || "x"
		];
	}

	private draw(frameCount: number): void {
		this.ctx.save();
		this.ctx.translate(
			Math.round(this.position.x + this.size / 2),
			Math.round(this.position.y + this.size / 2)
		);

		this.theme.config.turnSprites && this.ctx.rotate(this.orientation);

		/*
        // uncomment for debugging
		// body
		this.ctx.shadowColor = this.theme.config.colors[this.player];
		this.ctx.shadowBlur = 10;
		this.ctx.fillStyle = this.theme.config.colors[this.player];
		this.ctx.fillRect(this.size / -2, this.size / -2, this.size, this.size);

		// face
		this.ctx.shadowColor = "#ff00ff";
		this.ctx.shadowBlur = 8;
		this.ctx.fillStyle = "#ff00ff";
		this.ctx.fillRect(this.size / 2 - 20, this.size / -2, 20, this.size);
        */

		// character
		this.theme.config.shader && this.theme.config.shader(this.ctx);
		this.theme.drawSprite(
			this.ctx,
			this.getSprite().name,
			{ x: this.size / -2, y: this.size / -2 },
			frameCount
		);

		this.ctx.restore();

		/*
        // uncomment for debugging
		// draw weapon in absolute space
		if (this.action.attacking && this.active) {
			const weaponPosition = this.getWeaponPosition();
			this.ctx.fillStyle = "#ff0000";
			this.ctx.moveTo(weaponPosition.a.x, weaponPosition.a.y);
			this.ctx.beginPath();
			this.ctx.lineTo(weaponPosition.b.x, weaponPosition.b.y);
			this.ctx.lineTo(weaponPosition.c.x, weaponPosition.c.y);
			this.ctx.lineTo(weaponPosition.d.x, weaponPosition.d.y);
			this.ctx.lineTo(weaponPosition.a.x, weaponPosition.a.y);
			this.ctx.closePath();
			this.ctx.fill();
		}
        */
	}

	private executeCharacterActions(): void {
		if (this.active) {
			this.move();
			this.turn();
			this.collide();
			this.attack();
			this.block();
		}
	}

	private onNextTick(tick: TickEvent): void {
		this.executeCharacterActions();

		for (let i = 0; i < tick.detail!.frameSkip; i++) {
			this.executeCharacterActions();
		}
		this.draw(tick.detail!.frameCount);
	}

	public switchTheme(theme: Theme) {
		this.theme = theme;
		this.obstacles = this.game.obstacles;
		this.obstacle = this.createObstacle(`player${this.player}`);
	}
}
