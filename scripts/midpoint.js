class MidPoint {
    constructor(_slider, _pos, _mP, _labelText) {
        this.slider = _slider;
        this.pos = _pos;
        this.mP = _mP;
        if(_labelText) {
            this.labelText = _labelText;
        } else {
            this.labelText = 'label missing';
        }
        this.createDiv();
        this.addLabel();
        this.point.addEventListener('mouseenter', this.showLabel);
        this.point.addEventListener('mouseleave', this.hideLabel);
        this.point.addEventListener('click', this.jumpToPointPos);
    }

    createDiv = () => {
        this.point = document.createElement('div');
        this.point.classList.add('mid-point');
        this.slider.parentElement.appendChild(this.point);

        this.positionPoint();
    }

    positionPoint = () => {
        const offsetL = Math.floor((this.pos / this.mP.currentTrack.duration * this.slider.clientWidth) + this.mP.timeHandler.div.offsetLeft);
        this.point.style.left = offsetL + 'px';
        console.log(offsetL);
    }

    addLabel = () => {
        this.label = document.createElement('span');
        this.label.textContent = this.labelText;
        this.label.classList.add('mid-point-label');
        this.point.appendChild(this.label);
    }

    showLabel = () => {
        this.label.style.opacity = 1;
        this.point.style.width = '25px';
        this.point.style.height = '25px';
    }

    hideLabel = () => {
        this.label.style.opacity = 0;
        this.point.style.width = '17px';
        this.point.style.height = '17px';
    }

    jumpToPointPos = () => {
        this.mP.seekTo(this.pos / this.mP.currentTrack.duration);
    }
}