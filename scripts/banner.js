class Banner {
    constructor(div, _text){
        this.div = div;
        this.text = _text;

        this.placeBanner();
        this.insertText();
    }
    
    placeBanner = () => {
        const bannerHeight = document.body.clientHeight * 0.05;
        if(this.div.classList.contains('upper')){
            this.div.style.top = document.body.clientHeight * (0.4) - bannerHeight * (2 / 3) + 'px';
        } else if (this.div.classList.contains('lower')) {
            this.div.style.top = document.body.clientHeight * (0.7) - bannerHeight * (1 / 3) + 'px';
        }
        this.div.style.height = bannerHeight + 'px';
    }

    insertText = () => {
        this.text.forEach((phrase) => {
            const phraseSpan = document.createElement('span');
            phraseSpan.classList.add('banner-text');
            phraseSpan.textContent = phrase;
            this.div.appendChild(phraseSpan);
        });
    }
}