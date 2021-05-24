class TextMenu {
    constructor(_post, _div, _hWPost) {
        this.post = _post;
        this.div = _div;
        this.hWPost = _hWPost; // haendewaschenpost, god forgive this atrocity

        this.texts = [];

        this.post.texts.forEach((text) => {
            this.addText(text);
        });

        this.resizeMenu();
    }

    addText(text) {
        this.texts.push(text);

        const textDiv = document.createElement('div');
        textDiv.classList.add('haendewaschen-textmenu-option');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('haendewaschen-textmenu-author-image');
        console.log(text);
        imageDiv.style.backgroundImage = 'url(' + text.authorImageURL + ')';
        imageDiv.addEventListener('click', () => {this.openAuthorProfile(text.authorProfileID)});

        const textTitle = document.createElement('span');
        textTitle.classList.add('haendewaschen-textmenu-text-title');
        textTitle.textContent = text.authorName + ' - ' + text.title;
        textTitle.addEventListener('click', () => {this.hWPost.mP.loadTrackAndPlay(text.audioURL)});
        
        textDiv.appendChild(textTitle);
        textDiv.appendChild(imageDiv);

        this.div.appendChild(textDiv);
        
        // authorname - title

        // eventlistener click, currenttrack load text.audioURL, play once loaded
    }

    openAuthorProfile = (id) => {
        this.hWPost.returnToSlotmachine();
        this.post.logic.openPost(id);
    }

    resizeMenu = () => {
        this.div.style.height = window.innerHeight - 108 + 'px'; // 108 is the calculated musicplayer size
    }
}