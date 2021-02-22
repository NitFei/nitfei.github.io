class Column {
    constructor(_div) {
        this.div = _div;
        this.tiles = [];

        this.resizeColumn();
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
        // move every bottom tile to the top until we move one that is currently visible (not filtered out by searchbar)
        for (let i = 0; i < this.div.children.length; i++) {
            // handle tile object array
            const lastTile = this.tiles[this.tiles.length-1];
            this.tiles.pop(); // remove last array object
            this.tiles.unshift(lastTile); // add object at the beginning of array
            // handle DOM elements
            this.div.insertBefore(this.div.children[this.div.children.length-1], this.div.children[0]);
            //check if the new top tile is active (aka visible)
            if(this.div.children[0].classList.contains('active-tile')){
                break;
            }
        }
    }

    moveTopTileToBottom = () => {
        // move every top tile to the bottom until we move one that is currently visible (not filtered out by searchbar)
        for (let i = 0; i < this.div.children.length; i++) {
            // handle tile object array
            const firstTile = this.tiles[0];
            this.tiles.shift(); // remove first array object
            this.tiles.push(firstTile); // add object at the end of the array
            // handle DOM elements
            this.div.insertBefore(this.div.children[0], this.div.children[this.div.children.length]); // for some reason this has to be .length and not .length -1, probably has to do with the way insertBefore() works
            //check if the new top tile is active (aka visible)
            if(this.div.children[this.div.children.length-1].classList.contains('active-tile')){
                break;
            }
        }
    }

    resizeColumn = () => {
        if(this.div) {
            this.div.style.height = window.innerHeight * 0.9 + 'px';
        }
        this.tiles.forEach(tile => {
            tile.resizeTile();
        })
    }
}