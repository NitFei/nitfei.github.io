class Distortion {
    constructor(audioCtx) {
        this.audioCtx = audioCtx;

        this.wetGain = this.audioCtx.createGain();
        this.wetGain.gain.value = 0.01;
        this.dryGain = this.audioCtx.createGain();

        this.waveShaper = this.audioCtx.createWaveShaper();
        this.waveShaper.curve = this.makeDistortionCurve(400);
        this.wetGain.connect(this.waveShaper);
        
        this.lowpass = this.audioCtx.createBiquadFilter();
        this.lowpass.type="lowpass";
        this.lowpass.frequency.value = 20000;

        this.waveShaper.connect(this.lowpass);
        this.dryGain.connect(this.lowpass);
    }

    makeDistortionCurve(amount) {
        var k = amount,
            n_samples = typeof sampleRate === 'number' ? sampleRate : 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for ( ; i < n_samples; ++i ) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k)*Math.atan(Math.sinh(x*0.25)*5) / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    connect(node) {
        this.lowpass.connect(node)
    }

    disconnect() {
        this.lowpass.disconnect();
    }

    fadeWetTo(amount, time) {
        // clamp amount between 0.001 and 1.0
        let val = max(0.01, min(1.0,amount));

        this.wetGain.gain.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + time);
        this.dryGain.gain.exponentialRampToValueAtTime(1.001-val, this.audioCtx.currentTime + time);
    }

    fadeLowPassFilterTo(amount, time) {
        let val = max(0.01, min(20000.0,amount));

        this.lowpass.frequency.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + time);
    }
}