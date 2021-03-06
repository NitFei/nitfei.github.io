class HaendewaschenPost {
    constructor(_post, _div) {
        if (!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container', 'haendewaschen-post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.post = _post;
        console.log(this.post);

        this.showButtonTimer;
        this.hideButtonTimer;
        
        this.createBackButton();
        this.addEventHandlers();
        this.createMusicPlayer();
        this.createTextMenu();
    }

    createMusicPlayer = () => {
        this.mPDiv = document.createElement('div');
        this.mPDiv.classList.add('music-player-wrapper');
        this.mPDiv.style.backgroundColor = '#00000080';
        this.div.appendChild(this.mPDiv);

        this.mP = new MusicPlayer(this.mPDiv, this.post.texts[0].audioURL, this.post);
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

    addEventHandlers = () => {
        this.div.addEventListener('mousemove', this.showBackButton);
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
        this.textMenu.resizeMenu();
    }

    returnToSlotmachine = () => {
        this.mP.pause();
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.removeChild(this.div);
        this.post.logic.startBackground();
    }

    createTextMenu = () => {
        this.textMenuDiv = document.createElement('div');
        this.textMenuDiv.classList.add('text-menu');

        this.textMenu = new TextMenu(this.post, this.textMenuDiv, this);
        this.div.appendChild(this.textMenuDiv);
    }

    addText = () => {

    }
}