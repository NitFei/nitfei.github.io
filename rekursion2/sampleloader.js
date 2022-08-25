class SampleLoader {
    constructor(json) {
        this.sampleList = json;
    }

    getSamples() {
        let samples = {a:[],b:[],c:[],d:[],e:[],f:[],g:[]};

        this.sampleList.forEach(s => {
            let mySample = {filepath: s.path, isLooping: s.isLooping, sequencerBars: s.sequencerBars}

            switch (s.section) {
                case "a":
                    samples.a.push(mySample);
                    break;
                case "b":
                    samples.b.push(mySample);
                    break;
                case "c":
                    samples.c.push(mySample);
                    break;
                case "d":
                    samples.d.push(mySample);
                    break;
                case "e":
                    samples.e.push(mySample);
                    break;
                case "f":
                    samples.f.push(mySample);
                    break;
                case "g":
                    samples.g.push(mySample);
                    break;
                default:
                    break;
            }
        });

        return samples;
    }
}