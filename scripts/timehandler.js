class TimeHandler {
    constructor(_div, _mP) {
        this.mP = _mP; // musicPlayer
        this.div = _div;
        this.pos = 0;
        this.midPoints = [];
        this.isDragging = false;

        this.createSlider();
        this.createTimeDisplay();
        this.updateTimer;
    }

    createTimeDisplay = () => {
        this.tDispDiv = document.createElement('div');
        this.tDispDiv.style.width = '200px';

        this.tDisp = document.createElement('span');
        this.tDisp.classList.add('music-player', 'time-display')
        this.tDisp.textContent = '00:00:00 / 00:00:00';

        this.tDispDiv.appendChild(this.tDisp);
        this.div.appendChild(this.tDispDiv);
    }

    createSlider = () => {
        const sliderDiv = document.createElement('div');
        sliderDiv.classList.add('time-slider-wrapper');
        this.div.appendChild(sliderDiv);

        // this.slider = document.createElement('input');
        // this.slider.type = 'range';
        // this.slider.min = '1';
        // this.slider.max = '1000';
        // this.slider.value = '0';
        // this.slider.classList.add('music-player', 'time-slider', 'slider');

        this.slider = document.createElement('div');
        this.slider.classList.add('music-player', 'time-slider');
        this.slider.addEventListener('mousedown', (e) => {
            this.seekTo(e);
            this.isDragging = true;
        });

        sliderDiv.appendChild(this.slider);

        this.sliderProg = document.createElement('div');
        this.sliderProg.classList.add('music-player', 'time-slider-progress');
        this.slider.appendChild(this.sliderProg);

        document.getElementsByClassName('post-container')[0].addEventListener('mouseup', () => { this.isDragging = false });
        document.getElementsByClassName('post-container')[0].addEventListener('mousemove', this.seekToDragging);
    }

    seekTo = (e) => {
        e.preventDefault();
        this.mP.seekTo(e.layerX / this.slider.clientWidth);
    }

    seekToDragging = (e) => {
        if (this.isDragging) {
            const seekPos = e.clientX - this.slider.getBoundingClientRect().left;
            this.mP.seekTo(seekPos / this.slider.clientWidth);
        }
    }

    seekUpdate = () => {
        let seekPosition = 0;

        // Check if the current track duration is a legible number 
        if (!isNaN(this.mP.currentTrack.duration)) {
            seekPosition = this.mP.currentTrack.currentTime * (this.slider.clientWidth / this.mP.currentTrack.duration);

            const prgs = document.getElementsByClassName('time-slider-progress');
            for (let i = 0; i < prgs.length; i++) {
                prgs[i].style.width = seekPosition + 'px';
            }

            // Calculate the time left and the total duration 
            let currentHours = Math.floor(this.mP.currentTrack.currentTime / 3600);
            let currentMinutes = Math.floor((this.mP.currentTrack.currentTime % 3600) / 60);
            let currentSeconds = Math.floor(this.mP.currentTrack.currentTime % 60);
            let durationHours = Math.floor(this.mP.currentTrack.duration / 3600);
            let durationMinutes = Math.floor((this.mP.currentTrack.duration % 3600) / 60);
            let durationSeconds = Math.floor(this.mP.currentTrack.duration % 60);

            // Add a zero to the single digit time values 
            if (currentSeconds < 10) { currentSeconds = '0' + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = '0' + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = '0' + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = '0' + durationMinutes; }

            // Display the updated duration 
            this.tDisp.textContent = currentHours + ':' + currentMinutes + ':' + currentSeconds + ' / ' + durationHours + ':' + durationMinutes + ':' + durationSeconds;
        }
    }

    startUpdating = () => {
        this.updateTimer = setInterval(() => {
            this.seekUpdate();
        }, 500);
    }

    stopUpdating = () => {
        clearInterval(this.updateTimer);
    }

    addMidPoint = (time, label) => {
        this.midPoints.push(new MidPoint(this.slider, time, this.mP, label));
    }

    resizeMidpoints = () => {
        this.midPoints.forEach(midPoint => {
            midPoint.positionPoint();
        })
    }
}