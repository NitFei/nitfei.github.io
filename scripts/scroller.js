class Scroller {
    constructor(_div, _column){
        this.div = _div;
        this.column = _column;
        this.scrBarW = this.getScrollBarWidth();
        this.columnHeight;

        this.addEventHandler();
        this.resizeScroller(this.scrBarW);
        this.scrollingUp = true;
        this.scrollDest = 0;
        this.timer;
    }

    addEventHandler = () => {
        this.div.parentElement.addEventListener('wheel', (e) => {
            let delta;
            if (e.deltaMode === 1) { // returns true only on firefox and only if you use a mousewheel, in which case deltaY is significantly lower than usual. That's why we multiplay it with an arbitrary number
                delta = e.deltaY * 40;
            } else {
                delta = e.deltaY;
            }
            if (this.div.scrollTop < this.div.clientHeight*0.2) {
                this.addToTop();
            }
                
            if (!this.columnHeight) {
                this.columnHeight = this.column.getActiveColumnHeight();
            }
            if (this.div.scrollTop + (this.div.clientHeight * 1.2) >= this.columnHeight) { // *1.2 sets the threshhold 20% of the scrollers height below the maximum scrolling
                this.addToBottom();
            }

            this.scrollDest += delta;
            this.div.scrollTo(0, this.scrollDest);
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.snap()
            }, 100);
            console.log(e.deltaY);
            console.log(this.div.scrollTop);
            console.log(this.div.clientHeight);
        });
    }

    addToTop = () => {
        console.log('addtoTop')
        this.column.moveBottomTileToTop();
        const tileHeight = document.getElementsByClassName('active-tile')[0].clientHeight;

        this.div.scrollTop += tileHeight;
        this.scrollDest += tileHeight;
        // scrollbar gets stuck at the top and stops working when scrolling too fast. set it to 100 everytime that happens to avoid it
        if(this.div.scrollTop === 0) {
            this.div.scrollTop = 50;
        }        
    }

    addToBottom = () => {
        console.log('addtoBot')
        this.column.moveTopTileToBottom();
        const tileHeight = document.getElementsByClassName('active-tile')[0].clientHeight;

        this.div.scrollTop -= tileHeight;
        this.scrollDest -= tileHeight;
        // // scrollbar gets stuck at the bottom and stops working when scrolling too fast. set it to 100 everytime that happens to avoid it
        if(this.div.scrollTop + (this.div.clientHeight) >= this.columnHeight-1) {
            console.log('stuck');
             this.div.scrollTop = this.columnHeight - this.div.clientHeight - 100;
        } 
    }

    snap = () =>{
        console.log('snap now');
        const activeTile = document.getElementsByClassName('active-tile')[0];
        let tileSize = parseFloat(getComputedStyle(activeTile,null).getPropertyValue('height'));
        const topPos = Math.floor((this.div.scrollTop + (0.5*tileSize)) / tileSize) * tileSize;
        
        this.div.scrollTo({
            top: topPos,
            left: 0,
            behavior: 'smooth'
        })
    }

    resizeScroller = (scrBarW) => { // probably not gonna work because the parentElement doesnt get resized yet
        this.columnHeight = this.column.getActiveColumnHeight();
        this.div.style.width = this.div.parentElement.clientWidth + scrBarW + 'px';
    }

    // function to determine scrollbar width in order to add the right amount to the scoller-wrappers
    getScrollBarWidth = () => {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild (inner);
        
        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = "scroll";
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;
        
        document.body.removeChild (outer);
        
        return (w1 - w2);
    }

    getTilePos = (tile) => {
        let tilePos;

        //check the current top offset of the viewport (how many active tiles are there above the top currently visible tile in the slotmachine?)
        const ttPos = this.getTopTilePos();
        
        // collect all active tiles from column into one array
        let activeTiles = [];
        this.column.tiles.forEach((_tile) => {
            if(_tile.div.classList.contains('active-tile')){
                activeTiles.push(_tile);
            }
        })

        for (let i = 0; i < activeTiles.length; i++) {
            if(tile.id === activeTiles[i].id){
                tilePos = i;
            }
        }
        if(tilePos){
            tilePos -= ttPos;
        }
        return tilePos
    }

    getTopTilePos = () => {
        let pos = 0;
        let tileSize = parseFloat(getComputedStyle(document.getElementsByClassName('active-tile')[0],null).getPropertyValue('height'));
        pos = Math.floor((this.div.scrollTop / tileSize) + 0.5);
        return pos;
    }
}