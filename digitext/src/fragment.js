class Fragment {
    constructor(_audioContext, _sound, _pos, _text) {
        this.div;

        this.audioContext = _audioContext;
        if(!_sound) {
            this.createRandomSound()
        } else {
            this.sound = _sound;
        }

        this.isPlaying = false;
        this.pos = _pos;
        this.text = _text;

        this.createDiv();
        this.createText();
        this.placeDiv();        
    }

    createDiv = () => {
        this.div = document.createElement('div');
        this.div.classList.add('cave-text');
        document.getElementById('cave-content').appendChild(this.div);
    }

    createText = () => {
        const p = document.createElement('p');
        p.textContent = this.text;
        this.div.appendChild(p);
    }

    // position div so that pos is the center instead of the upper left corner
    placeDiv = () => {
        const w = this.div.clientWidth,
            h = this.div.clientHeight;
        
        this.div.style.left = this.pos.x - (w * 0.5) + 'px';
        this.div.style.top = this.pos.y - (h * 0.5) + 'px';
    }

    createRandomSound = () => {
        this.osc = this.audioContext.createOscillator();
        this.osc.type = 'sawtooth';
        this.osc.frequency.value = Math.random() * 500 + 100;
        this.osc.start();

        this.filter = this.audioContext.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 0;
        this.filter.q = 2;
        
        this.gain = this.audioContext.createGain();
        this.gain.gain.value = 0.5;
        
        this.filter.connect(this.gain);
        this.gain.connect(audioContext.destination);
    }

    play = () => {
        if(!this.isPlaying) {
            this.osc.connect(this.filter);
            this.isPlaying = true;
            console.log(this.isPlaying + ' ' + this.pos.x + ' ' + this.pos.y);
        }
    }

    stop = () => {
        if(this.isPlaying) {
            this.osc.disconnect();
            this.isPlaying = false;
             console.log(this.isPlaying);
        }
    }
}