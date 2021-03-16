class Banner {
    constructor(div, _text){
        this.div = div;
        this.text = _text;

        this.placeBanner();
        this.insertText();
    }
    
    placeBanner = () => {
        const bannerHeight = 40;
        if(this.div.classList.contains('upper')){
            this.div.style.top = (document.body.clientHeight - HEADERSIZE) / 3 - bannerHeight * (2 / 3) + HEADERSIZE + 'px';
        } else if (this.div.classList.contains('lower')) {
            this.div.style.top = (document.body.clientHeight - HEADERSIZE) * (2 / 3) - bannerHeight * (1 / 3) + HEADERSIZE + 'px';
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