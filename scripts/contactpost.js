class ContactPost {
    constructor (_post, _div) {
        if(!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container','contact-post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.post = _post;

        this.bbuttonTimer = 0;

        this.insertImage();
        this.createDescription();
        this.createBackButton();
        this.addEventHandlers();
    }

    insertImage = () => {
        this.div.style.backgroundImage = 'url(' + this.post.bgImageURL + ')';
        this.div.style.backgroundSize = 'cover';
        this.div.style.backgroundPosition = 'center';
    }

    createDescription = () => {
        this.descDiv = document.createElement('div');
        this.descDiv.classList.add('contact-description-wrapper');
        this.div.appendChild(this.descDiv);

        const descPar1 = document.createElement('p');
        descPar1.classList.add('contact-description');
        descPar1.textContent = 'Bock Teil unserer Lesungen, interaktiver Texte oder Videos zu werden? Oder einfach nur eine Postkarte aus dem Urlaub schicken?'
        this.descDiv.appendChild(descPar1);

        const descPar2 = document.createElement('p');
        descPar2.classList.add('contact-description');
        descPar2.textContent = 'irgendwie248sachen@web.de';
        this.descDiv.appendChild(descPar2);

        const descPar3 = document.createElement('p');
        descPar3.classList.add('contact-description');
        descPar3.textContent = 'Oder:';
        this.descDiv.appendChild(descPar3);

        const fbWrapper = document.createElement('a');
        fbWrapper.href = 'https://www.facebook.com/irgendwie248sachen/'

        const fb = document.createElement('i');
        fb.classList.add('fa', 'fa-facebook-square', 'fa-3x');
        fb.setAttribute('aria-hidden', 'true');
        fb.style.color = '#4267B2'
        fb.style.padding = '20px';

        fb.addEventListener('mouseenter', () => {fb.classList = ['fa fa-facebook-square fa-4x'];})
        fb.addEventListener('mouseleave', () => {fb.classList = ['fa fa-facebook-square fa-3x'];})

        fbWrapper.appendChild(fb);
        this.descDiv.appendChild(fbWrapper);

        const igWrapper = document.createElement('a');
        igWrapper.href = 'https://www.instagram.com/irgendwie248sachen/'

        const ig = document.createElement('i');
        ig.classList.add('fa', 'fa-instagram', 'fa-3x', 'instagram-icon');
        ig.setAttribute('aria-hidden', 'true');
        ig.style.padding = '20px';

        ig.addEventListener('mouseenter', () => {ig.classList = ['fa fa-instagram fa-4x instagram-icon'];})
        ig.addEventListener('mouseleave', () => {ig.classList = ['fa fa-instagram fa-3x instagram-icon'];})

        igWrapper.appendChild(ig);
        this.descDiv.appendChild(igWrapper);
    }

    createBackButton = () => {
        this.bbuttonDiv = document.createElement('div');
        this.bbuttonDiv.classList.add('back-button');
        this.bbuttonDiv.addEventListener('click', this.returnToSlotmachine);

        const bbutton = document.createElement('img');
        bbutton.src = 'src/media/ui/backButtonArrow.png';
        bbutton.width = '100';

        this.bbuttonDiv.appendChild(bbutton);
        this.div.appendChild(this.bbuttonDiv);
    }

    returnToSlotmachine = () => {
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.removeChild(this.div);
        this.post.logic.startBackground();
    }

    addEventHandlers = () => {
        this.div.addEventListener('mousemove', this.showBackButton);
        this.bbuttonDiv.addEventListener('mouseenter', this.holdBB);
    }

    showBackButton = () => {
        this.bbuttonDiv.style.display = 'block';
        this.bbuttonDiv.style.opacity = 1;
        clearTimeout(this.showButtonTimer);
        clearTimeout(this.hideButtonTimer);
        this.showButtonTimer = setTimeout(() => {
            this.bbuttonDiv.style.opacity = 0;
            this.hideButtonTimer = setTimeout(() => {
                this.bbuttonDiv.style.display = 'none';
            }, 500);
        }, 1000);
    }

    resizePost = () => {
    }
}