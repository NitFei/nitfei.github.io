class Post {
    constructor(_logic) {
        this.logic = _logic;
        this.tags = [];

        this.tiles = [];
    }


    init = () => {
        // check if the post is an author profile
        let isAuthor = false;
        this.tags.forEach((tag) => {
            if (tag.toLowerCase() === 'autor*in' || tag.toLowerCase() === 'autor' || tag.toLowerCase() === 'autorin' || tag.toLowerCase() === 'autor_in' || tag.toLowerCase() === 'autor:in') {
                isAuthor = true;
            }
        });

        // if the post is an author profile, it will only take up 1 column instead of 3
        if (isAuthor) {
            // randomly choose a column to place tile in
            const randNum = Math.floor(Math.random() * this.logic.columns.length);
            // create tile
            const newTile = this.createTile(this.logic.scrollers[randNum]);
            // add tile to column
            this.logic.columns[randNum].addTileAtRandomIndex(newTile);

            // if post is not an author profile, create 3 new tiles, each in its seperate column
        } else {
            for (let i = 0; i < this.logic.columns.length; i++) {
                //create tile
                const newTile = this.createTile(this.logic.scrollers[i]);
                // solve image resizing problem here as well
                this.logic.columns[i].addTileAtRandomIndex(newTile);
            }
        }
    }

    createTile = (scroller) => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'post-tile'
        tileDiv.classList.add(this.id);

        const tile = new Tile(tileDiv, this, scroller);
        this.tiles.push(tile);
        return tile;
    }

    openPost = () => {
        switch (this.type.toLowerCase()) {
            case 'autor_in':
                this.openAuthor();
                break;
            case 'event':
                this.openEvent();
                break;
            case 'lesung':
                this.openEvent();
                break;
            case 'kontakt':
                this.openContact();
                break;
            case 'video':
                this.openVideo();
                break;
            case 'haendewaschen':
                this.openHaendewaschen();
                break;
        }
        // const postDiv = document.createElement('div');
        // postDiv.classList.add('current-post');
        // document.body.appendChild(postDiv);
        // new Video(postDiv, this.link);
    }

    placeTileImages = () => {
        this.tiles.forEach(tile => {
            tile.addImage();
        })
    }

    openAuthor = () => {
        this.logic.currentPost = new AuthorPost(this);
    }

    openEvent = () => {
        this.logic.currentPost = new EventPost(this);
    }

    openContact = () => {
        this.logic.currentPost = new ContactPost(this);
    }

    openVideo = () => {
        this.logic.currentPost = new VideoPost(this);
    }

    openHaendewaschen = () => {
        this.logic.currentPost = new HaendewaschenPost(this);
    }
}