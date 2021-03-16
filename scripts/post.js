class Post {
    constructor (_logic) {
        this.logic = _logic;
        this.tags = [];

        this.tiles = [];
    }


    init = () => {
        // check if the post is an author profile
        let isAuthor = false; 
        this.tags.forEach((tag) => {
            if(tag.toLowerCase() === 'autor*in' || tag.toLowerCase() === 'autor' || tag.toLowerCase() === 'autorin' || tag.toLowerCase() === 'autor_in' || tag.toLowerCase() === 'autor:in') {
                isAuthor = true;
            }
        });

        // if the post is an author profile, it will only take up 1 column instead of 3
        if (isAuthor) { 
            // randomly choose a column to place tile in
            const randNum = Math.floor(Math.random()*this.logic.columns.length); 
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
        tileDiv.classList.add(this.title);

        const tile = new Tile(tileDiv, this, scroller);
        this.addClickHandler(tile);
        this.tiles.push(tile);
        return tile;
    }

    addClickHandler = (tile) => {
        tile.div.addEventListener('click', () => {
            if(this.tilesAreAligned()) {
                this.openPost()
            } else {
                // what happens, when tiles are not aligned??? maybe each tile's border turns red and if the tile is currently not in the slotmachine's viewport, its direction (up or down) is marked with an arrow?
                console.log('post-tiles do not align');
            }
        })
    }

    tilesAreAligned = () => {
        let isAligned = false;
        // if the post is an authorprofile, it only has 1 tile, which means that it has no other tiles to align with, so we can always treat it as if it "aligns with itself"
        if(this.tiles.length === 1) {
            isAligned = true;
        } else {
            console.log('clicked');
            // check the positions of every tile belonging to the post.
            let positions = [];
            this.tiles.forEach((tile) => {
                positions.push(tile.checkPosition());
            })
            // if positions are the same, all tiles are aligned
            if(positions[0] === positions[1] && positions[1] === positions[2]){
                isAligned = true;
            }
        }
        return isAligned;
    }

    openPost = () => {
        console.log('opened post');
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
}