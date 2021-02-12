export default class Post {

    constructor(div, tags, image, link, alligned) {
        this.div = div;
        this.tags = tags;
        this.image = image;
        this.link = link;
        this.alligned = alligned; // is the tile in the same row as the 2 other tiles belonging to the post?
    }

    
}