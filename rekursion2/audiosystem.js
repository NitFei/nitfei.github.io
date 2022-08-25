class AudioSystem {
    constructor(_audioCtx, sampleFilePaths) {
        this.audioCtx = _audioCtx;

        // sample loading
        this.samples = [];
        this.loadSample("./src/audio/sectione/tick2.wav", [0,2], false).then( () => {
            return this.loadSample("./src/audio/sectione/tick1.wav", [0,1,2,3], false);
        }).then( () => {
            return this.loadSample("./src/audio/sectione/tick3.wav", [0], false);
        }).then( () => {
            return this.loadSample("./src/audio/sectione/tick4.wav", [2], false);
        }).then ( () => {
            return this.loadSample("./src/audio/sectione/ambience.wav", [], true);
        });




        fetch("./src/samples.json")
            .then( response => { return response.json(); })
            .then( response => { return new SampleLoader(response); })
            .then( sl => {
                let sampArr = sl.getSamples();
                for (let [sec, samps] in sampArr) {
                    console.log(sec,samps);
                }
                sampArr.forEach(sec => {
                    sec.forEach(s => {
                        
                    })
                });
                })
            .then(()=> console.log(this.samples));

        // master VCA
        this.master = this.audioCtx.createGain();
        this.master.gain.value = 0.8;
        this.master.connect(this.audioCtx.destination);

        // sample VCA
        this.sampleVCA = this.audioCtx.createGain();

        // delay feedback (is a VCA, who woulda thought)
        this.delayFeedback = this.audioCtx.createGain();
        this.delayFeedback.gain.value = 0.5;

        // delay
        this.delay = this.audioCtx.createDelay();
        this.delay.delayTime.value = 0.5;
        this.delay.connect(this.delayFeedback);
        this.delayFeedback.connect(this.delay);
        this.delay.connect(this.master);

        // noise
        this.pinkNoise = (this.createPinkNoise(4096));
        
        
        this.distortion = new Distortion(this.audioCtx);
        this.sequencer = new Sequencer(this.audioCtx, this);
    }

    async getAudioFile(filepath) {
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }
      
    playSampleWithDelay(sample, time) {
        sample.isPlaying = true;
        const sampleSource = this.audioCtx.createBufferSource();
        sampleSource.buffer = sample.audioBuffer;
        sampleSource.connect(sample.vca);
        sample.vca.connect(this.delay);
        sampleSource.loop = sample.loop;
        sampleSource.start(time);
        return sampleSource;
    }

    playSample(sample, time) {
        sample.isPlaying = true;
        const sampleSource = this.audioCtx.createBufferSource();
        sampleSource.buffer = sample.audioBuffer;
        sampleSource.connect(sample.vca);
        sample.vca.connect(this.delay);
        sampleSource.loop = sample.loop;
        sampleSource.start(time);
        return sampleSource;
    }

    loadSample(s) {
        return this.getAudioFile(s.filepath).then( (buffer) => {
            let vca = this.audioCtx.createGain();
            vca.value = 1.0;
            let sample = new Sample(buffer, false, barsToPlay, false, vca, this.audioCtx, loop);
            return sample;
        });
    }

    createPinkNoise(bufferSize) {
        var b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        var node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        }
        node.isPlaying = false;
        return node;
    }   

    playDistortedPinkNoise() {
        this.pinkNoise.isPlaying = true;
        this.pinkNoise.connect(this.distortion.wetGain);
        this.pinkNoise.connect(this.distortion.dryGain);
    }
}