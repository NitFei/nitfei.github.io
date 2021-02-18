class Column {
    constructor(_div) {
        this.div = _div;
        this.tiles = [];
    }

    getActiveColumnHeight = () => {
        let totalHeight = 0;
        this.tiles.forEach(tile => {
            if(tile.div.classList.contains('active-tile')) {
                totalHeight += tile.div.clientHeight;
            }
        })
        return totalHeight;
    }

    addTileAtIndex = (tile, index) => {
        this.tiles.splice(index, 0, tile);
    }

    addTileAtRandomIndex = (tile) => {
        const randNum = Math.floor(Math.random()*this.tiles.length);
        this.addTileAtIndex(tile, randNum);
    }

    addTileDivsToColumn = () => {
        this.tiles.forEach(tile => {
            this.div.appendChild(tile.div);
        })
    }

    moveBottomTileToTop = () => {
        for (let i = 0; i < this.div.children.length; i++) {
            //move the bottom tile to the top
            this.div.insertBefore(this.div.children[this.div.children.length-1], this.div.children[0]);
            //check if the new top tile is active (aka visible)
            if(this.div.children[0].classList.contains('active-tile')){
                break;
            }
        }
    }

    moveTopTileToBottom = () => {
        for (let i = 0; i < this.div.children.length; i++) {
            //move the bottom tile to the top
            this.div.insertBefore(this.div.children[0], this.div.children[this.div.children.length]); // for some reason this has to be .length and not .length -1, probably has to do with the way insertBefore() works
            //check if the new top tile is active (aka visible)
            if(this.div.children[this.div.children.length-1].classList.contains('active-tile')){
                break;
            }
        }
    }
}