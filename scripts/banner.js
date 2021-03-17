class Banner {
    constructor(div, _bannerText){
        this.div = div;
        this.bannerText = _bannerText;

        this.placeBanner();
        this.insertText();
        this.pos = 0;

        this.moveContent();
    }
    
    placeBanner = () => {
        const bannerHeight = 40;
        if(this.bannerText.position === 'upper'){
            this.div.style.top = (document.body.clientHeight - HEADERSIZE) / 3 - bannerHeight * (2 / 3) + HEADERSIZE + 'px';
        } else if (this.bannerText.position === 'lower') {
            this.div.style.top = (document.body.clientHeight - HEADERSIZE) * (2 / 3) - bannerHeight * (1 / 3) + HEADERSIZE + 'px';
        }
        this.div.style.height = bannerHeight + 'px';
    }

    insertText = () => {
        this.textDiv = document.createElement('div');
        this.textDiv.classList.add('banner-content-wrapper');
        this.div.appendChild(this.textDiv);


        while(this.textDiv.clientWidth < MAXSUPPORTEDSCREENWIDTH) {
            for (let i = 0; i < this.bannerText.content.length; i++) {
                const phraseSpan = document.createElement('span');
                phraseSpan.classList.add('banner-text');
                phraseSpan.textContent = this.bannerText.content[i].text;
                if(this.bannerText.content[i].color === 'standard') {
                    phraseSpan.style.color = 'black';
                }
                this.textDiv.appendChild(phraseSpan);

                const spacer1 = document.createElement('span');
                spacer1.classList.add('banner-spacer', 'primary-color');
                spacer1.textContent = '/';
                this.textDiv.appendChild(spacer1);

                const spacer2 = document.createElement('span');
                spacer2.classList.add('banner-spacer', 'secondary-color');
                spacer2.textContent = '/';
                this.textDiv.appendChild(spacer2);
            }
        }
    }

    moveContent = () => {
        this.pos--;
        this.textDiv.style.left = this.pos + 'px';
        requestAnimationFrame(this.moveContent);
        if(this.leftContentIsOutOfFrame()) {
            this.pos += this.textDiv.children[0].scrollWidth;
            this.textDiv.style.left = this.pos + 'px';
            this.textDiv.appendChild(this.textDiv.children[0]);
        };
    }

    leftContentIsOutOfFrame = () => {
        let outOfFrame = false;
        if(this.pos + this.textDiv.children[0].scrollWidth < 0) {
            outOfFrame = true;
        }
        return outOfFrame;
    }
}