class TextMenu {
    constructor(_post, _div) {
        this.post = _post;
        this.div = _div;

        this.texts = [];

        this.post.texts.forEach((text) => {
            this.addText(text);
        });
    }

    addText(text) {
        this.text.push(text);

        const textDiv = document.createElement('div');
        textDiv.classList.add('haendewaschen-textmenu-option');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('haendewaschen-textmenu-author-image');
        imageDiv.backgroundImage = text.authorImageURL;

        // eventlistener click, logic openpost text.authorprofile id

        // authorname - title

        // eventlistener click, currenttrack load text.audioURL, play once loaded
    }

    resizeMenu = () => {
        const
    }
}