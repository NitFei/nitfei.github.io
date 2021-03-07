class TimeHandler {
    constructor(_div, _mP) {
        this.mP = _mP; // musicPlayer
        this.div = _div;
        this.pos = 0;
        this.midPoints = [];

        this.createSlider();
        this.createTimeDisplay();
        this.updateTimer;
    }

    createTimeDisplay = () => {
        this.tDisp = document.createElement('span');
        this.tDisp.classList.add('music-player', 'time-display')
        this.tDisp.textContent = '00:00:00 / 00:00:00';

        this.div.appendChild(this.tDisp);
    }

    createSlider = () => {
        const sliderDiv = document.createElement('div');
        sliderDiv.classList.add('time-slider-wrapper');
        this.div.appendChild(sliderDiv);

        this.slider = document.createElement('input');
        this.slider.type = 'range';
        this.slider.min = '1';
        this.slider.max = '1000';
        this.slider.value = '0';
        this.slider.classList.add('music-player', 'time-slider', 'slider');

        this.slider.addEventListener('change', this.seekTo);

        sliderDiv.appendChild(this.slider);
    }

    seekTo = () => {
        this.mP.seekTo(this.slider.value / this.slider.max);
    }

    seekUpdate = () => { 
        let seekPosition = 0; 
        
        // Check if the current track duration is a legible number 
        if (!isNaN(this.mP.currentTrack.duration)) { 
            seekPosition = this.mP.currentTrack.currentTime * (this.slider.max / this.mP.currentTrack.duration); 
            this.slider.value = seekPosition; 
            
            // Calculate the time left and the total duration 
            let currentHours = Math.floor(this.mP.currentTrack.currentTime / 3600);
            let currentMinutes = Math.floor((this.mP.currentTrack.currentTime - currentHours * 60) / 60); 
            let currentSeconds = Math.floor(this.mP.currentTrack.currentTime - currentMinutes * 60);
            let durationHours = Math.floor(this.mP.currentTrack.duration / 3600);
            let durationMinutes = Math.floor((this.mP.currentTrack.duration - durationHours * 60) / 60); 
            let durationSeconds = Math.floor(this.mP.currentTrack.duration - durationMinutes * 60); 
            
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

    addMidPoint = () => {
        this.midPoints.push(new MidPoint(this.slider, 30, this.mP, 'label 1'));
        this.midPoints.push(new MidPoint(this.slider, 60, this.mP, 'label 2'));
    }

    resizeMidpoints = () => {
        this.midPoints.forEach(midPoint => {
            midPoint.positionPoint();
        })
    }
}