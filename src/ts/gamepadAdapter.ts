export class GamepadAdapter {
	ctx: CanvasRenderingContext2D;
	gamepads: {
		buttons: {
			pressed: boolean;
			value: number;
		}[];
	}[];

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;

		this.gamepads = [null, null];
		this.saveGamepadsState();

		ctx.canvas.addEventListener("tick", () => {
			this.pollGamepads();
		});
	}

	saveGamepadsState() {
		navigator.getGamepads().forEach((gp, i) => {
			this.gamepads[i] = {
				buttons: gp?.buttons.map((b) => ({
					pressed: b.pressed,
					value: b.value,
				})),
			};
		});
	}

	pollGamepads() {
		// todo: only works chrome yet
		const gamepads = navigator.getGamepads();
		console.log(gamepads);
		for (var i = 0; i < gamepads.length; i++) {
			// todo: check for playstation and switch controllers
			if (!gamepads[i]?.id.includes("Xbox")) {
				this.saveGamepadsState();
				continue;
			}

			const gp = gamepads[i];
			if (gp && gp.buttons) {
				const axes = gp.axes;
				this.moveStick(i, 0, { x: axes[0], y: axes[1] });
				this.moveStick(i, 1, { x: axes[2], y: axes[3] });

				const buttons = gp.buttons
					.map((b, j) => ({
						index: j,
						button: b,
					}))
					.filter((b) => b.button.pressed);
				if (buttons.length > 0) {
					buttons.forEach((b) => {
						if (
							this.gamepads[i]?.buttons &&
							b.button.value !==
								this.gamepads[i]?.buttons[b.index]?.value
						) {
							this.pressButton(i, b.index, b.button);
						}
					});
				}
			} else {
				this.saveGamepadsState();
			}
		}
	}

	pressButton(gamepad: number, buttonIndex: number, button: GamepadButton) {
		this.gamepads[gamepad].buttons[buttonIndex] = button;
		const GamepadButtonDown: GamepadButtonEvent = new CustomEvent(
			"gamepadButtonDown",
			{
				detail: {
					gamepadId: gamepad,
					buttonIndex: buttonIndex,
					button: button,
				},
			}
		);
		document.dispatchEvent(GamepadButtonDown);
	}

	moveStick(gamepad: number, stickIndex: number, stick: coordinates) {
		// add deadzone to prevent drift
		const coords = {
			x: Math.abs(stick.x) < 0.2 ? 0 : stick.x,
			y: Math.abs(stick.y) < 0.2 ? 0 : stick.y,
		};

		const GamepadStickMove: GamepadStickEvent = new CustomEvent(
			"gamepadStickMove",
			{
				detail: {
					gamepadId: gamepad,
					stickIndex: stickIndex,
					stick: coords,
				},
			}
		);

		document.dispatchEvent(GamepadStickMove);
	}
}
