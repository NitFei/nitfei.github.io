class Banner {
    constructor(div){
        this.div = div;
        this.placeBanner();
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
}