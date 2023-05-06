import { Theme } from "./../../public/themes/theme";

export class Audio {
	private theme: Theme;
	private ctx: AudioContext | null;
	private vol: GainNode;
	private sounds: SoundLibrary;
    private bgm: AudioBufferSourceNode;
	private bgmPlaying: boolean;

	constructor(theme: Theme) {
		this.theme = theme;
		this.ctx = new (window.AudioContext || window.AudioContext)();
		this.vol = this.ctx.createGain();
		this.vol.connect(this.ctx.destination);
		this.vol.gain.value = 0;
		this.populateSoundLibrary();
		this.enableVolumeControl();
	}

	private getAudioUrl(url: string) {
		return `/themes/${this.theme.config.name}/${url.replace("./", "")}`;
	}

	private populateSoundLibrary() {
		this.sounds = {};
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

	private async getSoundFile(url: string): Promise<ArrayBuffer> {
		const buf = fetch(url).then((res) => res.arrayBuffer());
		return await buf;
	}

	private terminateSound(source: AudioBufferSourceNode) {
		source.stop();
		source.disconnect();
	}

	public async play(sound: string): Promise<void> {
        if (!this.ctx) { 
            return;
        }

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

	public async playBGM(): Promise<void> {
        if (!this.ctx) { 
            return;
        }

		if (this.bgmPlaying) {
			return;
		}

		const bgmVol = this.ctx.createGain();
		bgmVol.connect(this.vol);
		bgmVol.gain.value = 0.25;

		const arrayBuffer = await this.getSoundFile(this.getAudioUrl(this.theme.config.bgAudio));
		this.bgm = this.ctx.createBufferSource();

		this.ctx.decodeAudioData(arrayBuffer, (audioBuffer) => {
			this.bgm.buffer = audioBuffer;
			this.bgm.connect(bgmVol);
			this.bgm.loop = true;
			this.bgm.start();
		});

		this.bgmPlaying = true;
	}

	private setVolume(volume: number) {
		this.vol.gain.value = volume;
	}

	private enableVolumeControl() {
		const audioRange = document.querySelector("#sound") as HTMLInputElement;
		audioRange.addEventListener("input", () => {
			this.setVolume(audioRange.valueAsNumber);

			if (!this.bgmPlaying && audioRange.valueAsNumber > 0) {
				this.playBGM();
			}
		});
	}
    
    public switchTheme(theme: Theme) {
        this.ctx
        this.theme = theme;
		this.populateSoundLibrary();
        if (this.bgmPlaying) {
            this.bgm.stop();
            this.bgmPlaying = false;
            this.playBGM();
        }
    }
}
