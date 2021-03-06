class Tile {
    constructor(div, post, scroller) {
        this.id = post.id;
        this.div = div;
        this.tags = post.tags;
        this.imageURL = post.tileImageURL;
        this.image;
        this.link = post.link;
        this.scroller = scroller;
        this.post = post;

        this.div.style.background = post.imageURL;
        this.div.classList.add('post-tile');
        this.resizeTile();
        this.addClickHandler();
    }

    addImage = () => {
        this.image = document.createElement('img');
        this.image.addEventListener('error', () => {
            this.addBackupImage();
        })
        this.image.src = this.imageURL;
        this.image.classList.add('tile-image');

        this.div.appendChild(this.image);
        this.image.addEventListener('load', () => {
            this.placeImage();
        })
    }

    addBackupImage = () => {
        this.image.parentElement.removeChild(this.image);
        this.image = document.createElement('img');
        this.image.src = 'src/media/logo/248logo_stretched.jpg';
        this.image.classList.add('tile-image');
        this.image.width = '1920';

        this.div.appendChild(this.image);
        this.image.addEventListener('load', () => {
            this.placeImage();
        })

    }

    placeImage = () => {
        if (this.image) {
            let isActive = false;
            if (this.div.classList.contains('active-tile')) {
                isActive = true;
            }

            if (!isActive) {
                this.div.classList.remove('inactive-tile');
                this.div.classList.add('active-tile');
            }

            this.image.width = window.innerWidth;

            // top offset
            const divH = this.div.clientHeight;
            const imgH = this.image.clientHeight;
            const topPos = (divH - imgH) * 0.5;
            this.image.style.top = topPos + 'px';

            // left offset
            const columnPos = this.getColumnPos();
            const divW = this.div.clientWidth;
            const imgW = this.image.clientWidth;
            const leftPos = (divW - imgW) * 0.5 - divW * columnPos;
            this.image.style.left = leftPos + 'px';

            if (!isActive) {
                this.div.classList.remove('active-tile');
                this.div.classList.add('inactive-tile');
            }
        }
    }

    resizeTile = () => {
        this.div.style.height = (window.innerHeight - HEADERSIZE) / 3 + 'px';
        this.placeImage();
    }

    checkPosition = () => {
        return this.scroller.getTilePos(this);
    }

    getColumnPos = () => {
        let columnPos;
        if (this.div.parentElement.classList.contains('left')) {
            columnPos = -1;
        } else if (this.div.parentElement.classList.contains('middle')) {
            columnPos = 0;
        } else if (this.div.parentElement.classList.contains('right')) {
            columnPos = 1;
        }
        return columnPos;
    }

    addClickHandler = () => {
        this.div.addEventListener('click', () => {
            if (!this.scroller.isDragging) {
                let tilesAreAlgined = true;

                // if the post is an authorprofile, it has no other tiles to align with, so we can always treat it as if it "aligns with itself"
                if (this.post.type.toLowerCase() === 'autor_in' || this.post.type.toLowerCase() === 'autorin' || this.post.type.toLowerCase() === 'autor') {
                    tilesAreAlgined = true;
                } else {
                    //calculate whether the clicked tile is in the top, middle or bottom row of the slotmachine
                    const tileRow = this.getRow();
                    this.post.logic.scrollers.forEach((scroller) => {
                        const ttPos = scroller.getTopTilePos();
                        const comparedTile = scroller.column.getActiveTileAtIndex(ttPos + tileRow);
                        if (this.id != comparedTile.id) {
                            tilesAreAlgined = false;
                        }
                    })
                }

                if (tilesAreAlgined) {
                    this.post.logic.openPost(this.id);
                } else {
                    const tileRow = this.getRow();
                    this.post.logic.showCompletedPostTiles(this, tileRow);
                }
            }
        })
    }

    getRow = () => {
        const tileRow = Math.floor(((this.div.getBoundingClientRect().top - HEADERSIZE) / this.div.clientHeight) + 0.5);
        return tileRow;
    }

    getColumnPos = () => {
        let pos;
        const col = this.scroller.div.children[0];
        if (col.classList.contains('left')) {
            pos = 0;
        } else if (col.classList.contains('middle')) {
            pos = 1;
        } else if (col.classList.contains('right')) {
            pos = 2;
        }
        return pos;
    }
}