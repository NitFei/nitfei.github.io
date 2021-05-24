class Column {
    constructor(_div) {
        this.div = _div;
        this.tiles = [];

        this.resizeColumn();
    }

    getActiveColumnHeight = () => {
        let totalHeight = 0;
        this.tiles.forEach(tile => {
            if (tile.div.classList.contains('active-tile')) {
                totalHeight += tile.div.clientHeight;
            }
        })
        return totalHeight;
    }

    addTileAtIndex = (tile, index) => {
        this.tiles.splice(index, 0, tile);
    }

    addTileAtRandomIndex = (tile) => {
        const randNum = Math.floor(Math.random() * this.tiles.length);
        this.addTileAtIndex(tile, randNum);
    }

    addTileDivsToColumn = () => {
        const children = this.div.children;
        for (let i = 0; i < children.length; i++) {
            this.div.removeChild(children[i]);
        }

        this.tiles.forEach(tile => {
            this.div.appendChild(tile.div);
        })
    }

    moveBottomTileToTop = () => {
        // move every bottom tile to the top until we move one that is currently visible (not filtered out by searchbar)
        for (let i = 0; i < this.div.children.length; i++) {
            if (!this.div.children[this.div.children.length - 1].classList.contains('fake-div')) {
                // handle tile object array
                const lastTile = this.tiles[this.tiles.length - 1];
                this.tiles.pop(); // remove last array object
                this.tiles.unshift(lastTile); // add object at the beginning of array
            }
            // handle DOM elements
            this.div.insertBefore(this.div.children[this.div.children.length - 1], this.div.children[0]);
            //check if the new top tile is active (aka visible)
            if (this.div.children[0].classList.contains('active-tile')) {
                break;
            }
        }
    }

    moveTopTileToBottom = () => {
        // move every top tile to the bottom until we move one that is currently visible (not filtered out by searchbar)
        for (let i = 0; i < this.div.children.length; i++) {
            if (!this.div.children[0].classList.contains('fake-div')) {
                // handle tile object array
                const firstTile = this.tiles[0];
                this.tiles.shift(); // remove first array object
                this.tiles.push(firstTile); // add object at the end of the array
            }

            // handle DOM elements
            this.div.insertBefore(this.div.children[0], this.div.children[this.div.children.length]); // for some reason this has to be .length and not .length -1, probably has to do with the way insertBefore() works
            //check if the new top tile is active (aka visible)
            if (this.div.children[this.div.children.length - 1].classList.contains('active-tile')) {
                break;
            }
        }
    }

    resizeColumn = () => {
        if (this.div) {
            this.div.style.height = window.innerHeight - 56 + 'px';
        }
        this.tiles.forEach(tile => {
            tile.resizeTile();
        })
    }

    cloneTiles = (activeTiles) => {
        if (activeTiles.length > 0) {
            for (let j = Math.floor(FEWESTTILESSTILLSCROLLABLE / activeTiles.length); j > 0; j--) {
                for (let i = 0; i < activeTiles.length; i++) {
                    const tileDiv = document.createElement('div');
                    tileDiv.classList = activeTiles[i].div.classList;
                    tileDiv.classList.add('copy-tile');

                    const tile = new Tile(tileDiv, activeTiles[i].post, activeTiles[i].scroller);
                    tile.addImage();
                    //this.addClickHandler(tile);
                    this.tiles.push(tile);
                }
            }
        }
        this.addTileDivsToColumn();
    }

    removeCopiedTiles() {
        for (let i = this.tiles.length - 1; i >= 0; i--) {
            if (this.tiles[i].div.classList.contains('copy-tile')) {
                this.tiles[i].div.parentElement.removeChild(this.tiles[i].div);
                this.tiles.splice(i, 1);

            }
        }
    }

    getActiveTileAtIndex = (index) => {
        return this.getActiveTiles()[index];
    }

    showCompletedPostTiles = (tile, row, scroller) => {
        // row = 0 for top, 1 for middle, 2 for bottom
        const fakeDiv = document.createElement('div');
        fakeDiv.classList.add('fake-div');
        const fDHeight = (window.innerHeight - HEADERSIZE) / 3;
        const fDWidth = tile.div.clientWidth;
        fakeDiv.style.height = fDHeight + 'px';
        fakeDiv.style.width = fDWidth + 'px';
        fakeDiv.style.top = row * fDHeight + scroller.div.scrollTop + 'px';

        this.div.appendChild(fakeDiv);

        const image = document.createElement('img');
        image.addEventListener('error', () => {
            this.addBackupImage();
        })
        image.src = tile.imageURL;
        image.classList.add('tile-image');

        fakeDiv.appendChild(image);
        image.addEventListener('load', () => {
            image.width = window.innerWidth;

            // top offset
            const divH = fakeDiv.clientHeight;
            const imgH = image.clientHeight;
            const topPos = (divH - imgH) * 0.5;
            image.style.top = topPos + 'px';

            // left offset
            const columnPos = this.getColumnPos();
            const divW = fakeDiv.clientWidth;
            const imgW = image.clientWidth;
            const leftPos = (divW - imgW) * 0.5 - divW * columnPos;
            image.style.left = leftPos + 'px';
        })

        setTimeout(() => {
            fakeDiv.classList.add('fake-div-appear');
            setTimeout(() => {
                fakeDiv.classList.remove('fake-div-appear');
                setTimeout(() => {
                    this.div.removeChild(fakeDiv);
                }, 1000);
            }, 1500)
        }, 100);
    }

    getColumnPos = () => {
        let columnPos;
        if (this.div.classList.contains('left')) {
            columnPos = -1;
        } else if (this.div.classList.contains('middle')) {
            columnPos = 0;
        } else if (this.div.classList.contains('right')) {
            columnPos = 1;
        }
        return columnPos;
    }

    getActiveTileIndexByID = (id) => {
        let index = -1;

        const activeTiles = this.getActiveTiles();
        for (let i = 0; i < activeTiles.length; i++) {
            if(activeTiles[i].id === id) {
                index = i;
            }
        }

        return index;
    }

    getActiveTiles = () => {
        // collect all active tiles from column into one array
        let activeTiles = [];
        this.tiles.forEach((_tile) => {
            if (_tile.div.classList.contains('active-tile')) {
                activeTiles.push(_tile);
            }
        })

        return activeTiles;
    }

}