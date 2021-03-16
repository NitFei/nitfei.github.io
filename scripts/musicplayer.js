class MusicPlayer {
    constructor(_div, currentTrackURL, _post){
        this.div = _div;

        this.createAudio(currentTrackURL);
        this.createPlayPauseButton();
        this.createtimeHandler();

        this.currentTrack.addEventListener('loadedmetadata', () => {
            this.addMidPoints(_post);
            this.timeHandler.seekUpdate();
        });
    }

    createPlayPauseButton = () => {
        const ppButtonDiv = document.createElement('div');
        ppButtonDiv.classList.add('music-player', 'play-pause-button');
        this.div.appendChild(ppButtonDiv);

        this.ppButton = new PPButton(ppButtonDiv, this);
    }

    play = () => {
        this.currentTrack.play();
        this.timeHandler.startUpdating();
        this.ppButton.changeIconToPause();
    }

    pause = () => {
        this.currentTrack.pause();
        this.timeHandler.stopUpdating();
        this.ppButton.changeIconToPlay();
    }

    createtimeHandler = () => {
        const timeHandlerDiv = document.createElement('div');
        timeHandlerDiv.classList.add('music-player', 'time-handler');
        this.div.appendChild(timeHandlerDiv);

        this.timeHandler = new TimeHandler(timeHandlerDiv, this);
    }

    createAudio = (trackURL) => {
        this.currentTrack = document.createElement('audio');
        this.currentTrack.src = trackURL;
        this.currentTrack.load();

        this.currentTrack.addEventListener('ended', () => { 
            this.pause();
        });
    }

    seekTo = (sliderPos) => {
        const seekPos = this.currentTrack.duration * sliderPos;
        this.currentTrack.currentTime = seekPos;
        this.timeHandler.seekUpdate();
    }

    addMidPoints = (post) => {
        post.midPoints.forEach(midPoint => {
            this.timeHandler.addMidPoint(midPoint.time, midPoint.label); 
        });
    }

    resizePlayer = () => {
        this.timeHandler.resizeMidpoints();
    }
}