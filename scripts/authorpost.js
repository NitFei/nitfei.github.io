class AuthorPost {
    constructor(_post, _div) {
        if(!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.post = _post;

        this.name = this.post.title;
        this.descDivTimer = 0;
        this.bbuttonTimer = 0;
        this.hoveringDescDiv = false;

        this.insertImage();
        this.createDescription();
        this.createNameDiv();
        this.createBackButton();
        this.addEventHandlers();
    }

    insertImage = () => {
        this.div.style.backgroundImage = 'url(' + this.post.bgImageURL + ')';
        this.div.style.backgroundSize = 'cover';
        this.div.style.backgroundPosition = 'center';
    }

    resizePost = () => {
        this.resizeDescDiv();
    }

    createDescription = () => {
        this.descDiv = document.createElement('div');
        this.descDiv.classList.add('post-description-container');
        this.div.appendChild(this.descDiv);
        this.resizeDescDiv();
    }

    createNameDiv = () => {
        this.nameDiv = document.createElement('div');
        this.nameDiv.classList.add('post-name-container');
        this.div.appendChild(this.nameDiv);

        const firstName = document.createElement('p');
        firstName.textContent = this.post.title;
        firstName.classList.add('author-first-name');

        const lastName = document.createElement('p');
        lastName.textContent = this.post.title;
        lastName.classList.add('author-last-name');

        this.div.appendChild(firstName);
        this.div.appendChild(lastName);
    }

    resizeDescDiv = () => {
        this.descDiv.style.width = 0.3 * window.innerWidth + 'px';
        this.descDiv.style.float = 'right';
    }

    addEventHandlers = () => {
        this.div.addEventListener('mousemove', this.makeDescDivAndButtonVisible);
        this.descDiv.addEventListener('mouseenter', this.keepDescDivVisible);
        this.descDiv.addEventListener('mouseleave', this.hideDescDiv);
    }

    hideDescDiv = () => {
        this.hoveringDescDiv = false;
        this.descDivTimer = setTimeout(() => {
            this.descDiv.style.opacity = 0;
            this.bbuttonDiv.style.opacity = 0;
        }, 1000);
    }

    keepDescDivVisible = () => {
        this.hoveringDescDiv = true;
        clearTimeout(this.descDivTimer);
        this.bbuttonTimer = setTimeout(() => {
            this.bbuttonDiv.style.display = 'none';
        }, 500);
    }

    makeDescDivAndButtonVisible = () => {
        if(!this.hoveringDescDiv) {
            this.bbuttonDiv.style.display = 'block';
            this.bbuttonDiv.style.opacity = 1;
            this.descDiv.style.opacity = 1;
            clearTimeout(this.descDivTimer);
            this.descDivTimer = setTimeout(() => {
                this.descDiv.style.opacity = 0;
                this.bbuttonDiv.style.opacity = 0;
                clearTimeout(this.bbuttonTimer);
                this.bbuttonTimer = setTimeout(() => {
                    this.bbuttonDiv.style.display = 'none';
                }, 500);
            }, 1000);
        }
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
}