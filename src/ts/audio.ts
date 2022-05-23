import { Theme } from "./../../public/themes/theme";

export class Audio {
	private theme: Theme;
	private ctx: AudioContext;
	private vol: GainNode;
	private sounds: Sounds;

	constructor(theme: Theme) {
		this.theme = theme;
		this.ctx = new (window.AudioContext || window.webkitAudioContext)();
		this.vol = this.ctx.createGain();
		this.vol.connect(this.ctx.destination);
		this.vol.gain.value = 0;
		this.sounds = {};
		this.theme.config.attackAudio;

		const actions = [
			this.getAudioUrl(this.theme.config.attackAudio),
			this.getAudioUrl(this.theme.config.blockAudio),
			this.getAudioUrl(this.theme.config.collideAudio),
			this.getAudioUrl(this.theme.config.winAudio),
		];

		actions.forEach((action) => {
			this.sounds[action] = {
				playing: false,
			};
		});
	}

	private getAudioUrl(url: string) {
		return `/themes/${this.theme.config.name}/${url.replace("./", "")}`;
	}

	private async getSoundFile(url: string): Promise<ArrayBuffer> {
		const buf = fetch(url).then((res) => res.arrayBuffer());
		return await buf;
	}

	private terminateSound(source: AudioBufferSourceNode) {
		source.stop();
		source.disconnect();
	}

	public async play(sound: string): Promise<void> {
		if (this.sounds[this.getAudioUrl(sound)].playing) {
			return;
		}

		this.sounds[this.getAudioUrl(sound)].playing = true;

		const arrayBuffer = await this.getSoundFile(this.getAudioUrl(sound));
		const source = this.ctx.createBufferSource();

		this.ctx.decodeAudioData(arrayBuffer, (audioBuffer) => {
			source.buffer = audioBuffer;
			source.connect(this.vol);
			source.loop = false;
			source.onended = () => {
				this.terminateSound(source);
				this.sounds[this.getAudioUrl(sound)].playing = false;
			};
			source.start();
		});
	}

	public setVolume(volume: number) {
		this.vol.gain.value = volume;
	}
}
