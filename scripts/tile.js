class Tile {
    constructor(div, tags, image, link, id, scroller) {
        this.id = id;
        this.div = div;
        this.tags = tags;
        this.imageSrc = image;
        this.image;
        this.link = link;
        this.scroller = scroller;

        this.div.style.background = image;
        this.div.className = 'post-tile';
        this.resizeTile();
    }

    addImage = () => {
        this.image = document.createElement('img');
        this.image.addEventListener('error', (e) => {
            this.addBackupImage();
        })
        this.image.src = this.imageSrc;
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
            if(this.div.classList.contains('active-tile')){
                isActive = true;
            }

            if(!isActive){
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

            if(!isActive){
                this.div.classList.remove('active-tile');
                this.div.classList.add('inactive-tile');
            }
        }
    }

    resizeTile = () => {
        this.div.style.height = window.innerHeight * 0.3 + 'px';
        this.placeImage();
    }

    checkPosition = () => {
        return this.scroller.getTilePos(this);
    }

    getColumnPos = () => {
        let columnPos;
        if(this.div.parentElement.classList.contains('left')) {
            columnPos = -1;
        } else if (this.div.parentElement.classList.contains('middle')) {
            columnPos = 0;
        } else if (this.div.parentElement.classList.contains('right')) {
            columnPos = 1;
        }
        return columnPos;
    }
}