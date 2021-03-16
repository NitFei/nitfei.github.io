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
        
        this.pointProg = document.createElement('div');
        this.pointProg.classList.add('music-player', 'time-slider-progress');
        this.point.appendChild(this.pointProg);

        this.positionPoint();
    }

    positionPoint = () => {
        const offsetL = Math.floor((this.pos / this.mP.currentTrack.duration * this.slider.clientWidth));
        this.point.style.left = offsetL - this.point.clientWidth*0.5 + 'px';
        this.pointProg.style.left = -offsetL + this.point.clientWidth*0.5 + 'px';
    }

    addLabel = () => {
        this.label = document.createElement('span');
        this.label.textContent = this.labelText;
        this.label.classList.add('mid-point-label');
        this.point.appendChild(this.label);
    }

    showLabel = () => {
        const newSize = 150;
        this.label.style.opacity = 1;
        this.point.style.width = newSize + 'px';
        this.point.style.height = newSize + 'px';
        this.point.style.left = Math.floor((this.pos / this.mP.currentTrack.duration * this.slider.clientWidth)) - (newSize*0.5) + 'px';
        
        const ll = (newSize - this.label.clientWidth) * 0.5;
        const lt = (newSize - this.label.clientHeight) * 0.5;
        this.label.style.top = lt + 'px';
        this.label.style.left = ll + 'px';
    }

    hideLabel = () => {
        const originalSize = 16;
        this.label.style.opacity = 0;
        this.point.style.width = originalSize + 'px';
        this.point.style.height = originalSize + 'px';
        this.point.style.left = Math.floor((this.pos / this.mP.currentTrack.duration * this.slider.clientWidth)) - (originalSize*0.5) + 'px';

        const ll = (originalSize - this.label.clientWidth) * 0.5;
        const lt = (originalSize - this.label.clientHeight) * 0.5;
        this.label.style.top = lt + 'px';
        this.label.style.left = ll + 'px';
    }

    jumpToPointPos = () => {
        this.mP.seekTo(this.pos / this.mP.currentTrack.duration);
    }
}