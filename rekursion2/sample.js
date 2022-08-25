class Sample {
    constructor(audioBuffer, isInSequence, barsToPlay, isPlaying, vca, audioCtx, loop) {
        this.audioBuffer = audioBuffer;
        this.isInSequence = isInSequence;
        this.barsToPlay = barsToPlay;
        this.isPlaying = isPlaying;
        this.vca = vca;
        this.audioCtx = audioCtx;
        this.loop = loop;

        this.isMuted = false;
    }

    mute() {
        console.log(this.audioCtx.currentTime);
        this.vca.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.0);
        this.isMuted = true;
    }

    unmute() {
        this.vca.gain.exponentialRampToValueAtTime(1.0, this.audioCtx.currentTime + 0.0);
        this.isMuted = false;
    }
}