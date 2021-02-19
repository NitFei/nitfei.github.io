class Tile {
    constructor(div, tags, image, link, id, scroller) {
        this.id = id;
        this.div = div;
        this.tags = tags;
        this.image = image;
        this.link = link;
        this.scroller = scroller;

        this.div.style.background = image;
        this.div.className = 'post-tile';
    }

    checkPosition = () => {
        return this.scroller.getTilePos(this);
    }
}