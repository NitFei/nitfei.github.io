class EventPost {
    constructor(_post, _div) {
        this.post = _post;

        if (!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('post-container', 'event-post-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.name = this.post.title;
        this.showButtonTimer;
        this.hideButtonTimer;

        this.insertImage();
        this.createMusicPlayer();
        this.createDescription();
        this.createBackButton();
        this.addEventHandlers();
    }

    createMusicPlayer = () => {
        this.mPDiv = document.createElement('div');
        this.mPDiv.classList.add('music-player-wrapper');
        this.div.appendChild(this.mPDiv);

        this.mP = new MusicPlayer(this.mPDiv, this.post.audioURL, this.post);
    }

    insertImage = () => {
        this.div.style.backgroundImage = 'url(' + this.post.bgImageURLs[0] + ')';
        this.div.style.backgroundSize = 'cover';
        this.div.style.backgroundPosition = 'center';
    }


    resizePost = () => {
        this.mP.resizePlayer();
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
        this.mP.currentTrack.parentElement.removeChild(this.mP.currentTrack);
        //this removes the iframe from view, but the instance of the video object might not get cleaned from memory. How do I do that?
        document.body.removeChild(this.div);
        this.post.logic.startBackground();
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

    createDescription = () => {
        this.descDiv = document.createElement('div');
        this.descDiv.classList.add('event-description-wrapper');
        this.div.appendChild(this.descDiv);

        const title = document.createElement('h1');
        title.classList.add('event-description', 'event-description-title');
        title.textContent = 'IRGENDWIE 248 SACHEN - NO. 7';

        this.descDiv.appendChild(title);

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('event-description-author-wrapper');
        this.descDiv.appendChild(authorDiv);

        this.post.authors.forEach(author => {
            const container = document.createElement('div');
            container.classList = ('event-description-author');

            const name = document.createElement('p');
            name.classList.add('event-description-author-name', 'event-description-hoverable');
            name.textContent = author.name;
            name.addEventListener('click', () => { this.openAuthorProfile(author.profileID) });

            const audioPointsDiv = document.createElement('div');
            audioPointsDiv.style.display = 'flex';

            const text = document.createElement('p');
            text.classList.add('event-description-audiolink', 'event-description-hoverable');
            text.textContent = 'Lesung';
            text.addEventListener('click', () => { this.skipToMidpoint(author.midPointText) });

            // const spacer = document.createElement('i');
            // spacer.classList.add('fa', 'fa-circle');
            // spacer.style.fontSize = '6px';

            const interview = document.createElement('p');
            interview.classList.add('event-description-audiolink', 'event-description-hoverable');
            interview.textContent = 'Gespräch';
            interview.addEventListener('click', () => { this.skipToMidpoint(author.midPointInterview) });

            authorDiv.appendChild(container);
            container.appendChild(name);

            container.appendChild(audioPointsDiv);
            audioPointsDiv.appendChild(text);
            // audioPointsDiv.appendChild(spacer);
            audioPointsDiv.appendChild(interview);
        });
    }

    skipToMidpoint = (index) => {
        this.mP.timeHandler.midPoints[index].jumpToPointPos();
    }

    openAuthorProfile = (id) => {
        this.returnToSlotmachine();
        this.post.logic.openPost(id);
    }
}