class Post {
    constructor (type, title, tags, image, link, columns) {
        this.type = type;
        this.title = title;
        this.tags = tags;
        this.image = image;
        this.link = link;

        this.tiles = []

        // check if the post is an author profile
        let isAuthor = false; 
        tags.forEach((tag) => {
            if(tag.toLowerCase() === 'autor*in' || tag.toLowerCase() === 'autor' || tag.toLowerCase() === 'autorin') {
                isAuthor = true;
            }
        });

        // if the post is an author profile, it will only take up 1 column instead of 3
        if (isAuthor) { 
            // create tile
            const newTile = this.createTile();
            // randomly choose a column to place tile in
            const randNum = Math.floor(Math.random()*columns.length); 
            columns[randNum].addTileAtRandomIndex(newTile);

        // if post is not an author profile, create 3 new tiles, each in its seperate column
        } else { 
            for (let i = 0; i < columns.length; i++) {
                //create tile
                const newTile = this.createTile()
                // solve image resizing problem here as well
                columns[i].addTileAtRandomIndex(newTile)
            }
        }
    }

    createTile = () => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'post-tile'
        tileDiv.innerText = this.title;

        const tile = new Tile(tileDiv, this.tags, this.image, '#header', false);
        this.tiles.push(tile);
        return tile;
    }
}