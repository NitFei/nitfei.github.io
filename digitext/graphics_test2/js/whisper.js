class Whisper {
    constructor(_filePath, _audiocontext, index) {
        this.audioctx = _audiocontext;
        this.gain = this.audioctx.createGain();

        this.sample = this.setupSample(this.audioctx, _filePath).then((sample)=> {this.playSample(this.audioctx, sample, Math.floor((index/3)*sample.duration))});
    }

    async getFile(audioContext, filepath) {
        console.log("ac",audioContext)
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }

    async setupSample(audioCtx, filePath) {
        const sample = await this.getFile(audioCtx, filePath);
        return sample;
    }

    playSample(audioContext, audioBuffer, time) {
        console.log(time)
        if(audioBuffer) {
            const sampleSource = audioContext.createBufferSource();
            sampleSource.buffer = audioBuffer;
            sampleSource.loop = true;
            sampleSource.connect(this.gain).connect(audioContext.destination);
            sampleSource.start(0, time);
            return sampleSource;
        } else {
            console.log("no audiobuffer");
        }
    }

    setvolume = (newVolume) => {
        this.gain.gain.value = newVolume;
    }
}