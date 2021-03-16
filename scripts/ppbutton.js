class PPButton {
    constructor(_div, _mP) {
        this.mP = _mP; // musicPlayer
        this.div = _div;
        this.isPlaying = false;

        this.addIcon();

        this.div.addEventListener('click', this.pausePlay);
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 32) {
                this.pausePlay();
            }
        })
    }

    addIcon = () => {
        const icon = document.createElement('i');
        icon.classList = ['fas fa-play-circle fa-3x'];
        icon.style.color = '#31b8ad';
        this.div.appendChild(icon);
    }

    pausePlay = () => {
        this.isPlaying = !this.isPlaying;
        if(this.isPlaying) {
            this.mP.play();
        } else {
            this.mP.pause();
        }
        this.mP.resizePlayer();
    }

    changeIconToPause = () => {
        this.div.children[0].classList = ['fas fa-pause-circle fa-3x'];
    }

    changeIconToPlay = () => {
        this.div.children[0].classList = ['fas fa-play-circle fa-3x'];
    }
}