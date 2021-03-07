class PPButton {
    constructor(_div, _mP) {
        this.mP = _mP; // musicPlayer
        this.div = _div;
        this.isPlaying = false;

        this.addIcon();

        this.div.addEventListener('click', this.pausePlay);
    }

    addIcon = () => {
        const icon = document.createElement('i');
        icon.classList = ['fas fa-play-circle fa-3x'];
        icon.style.color = '#d3d3d3';
        this.div.appendChild(icon);
    }

    pausePlay = () => {
        this.isPlaying = !this.isPlaying;
        if(this.isPlaying) {
            this.mP.play();
        } else {
            this.mP.pause();
        }
    }

    changeIconToPause = () => {
        this.div.children[0].classList = ['fas fa-pause-circle fa-3x'];
    }

    changeIconToPlay = () => {
        this.div.children[0].classList = ['fas fa-play-circle fa-3x'];
    }
}