class Scroller {
    constructor(_div, _column){
        this.div = _div;
        this.column = _column;
        this.scrBarW = this.getScrollBarWidth();
        this.lastScrollTop = 0;
        this.columnHeight;

        this.addEventHandler();
        this.resizeScroller(this.scrBarW);
        this.scrollingUp = true;
        this.scrollDest = 0;
        this.timer;
    }

    addEventHandler = () => {
        this.div.parentElement.addEventListener('wheel', (e) => {
            if (this.div.scrollTop < this.div.clientHeight*0.2) {
                this.addToTop();
            }
                
            if (!this.columnHeight) {
                this.columnHeight = this.column.getActiveColumnHeight();
            }
            if (this.div.scrollTop + (this.div.clientHeight * 1.2) >= this.columnHeight) { // *1.2 sets the threshhold 20% of the scrollers height below the maximum scrolling
                this.addToBottom();
            }

            this.scrollDest += e.deltaY;
            this.div.scrollTo(0, this.scrollDest);
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.snap()
            }, 100);
        });
    }

    addToTop = () => {
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
        const activeTile = document.getElementsByClassName('active-tile')[0];
        let tileSize = parseFloat(getComputedStyle(activeTile,null).getPropertyValue('height'));
        console.log(tileSize);
        const topPos = Math.floor((this.div.scrollTop + (0.5*tileSize)) / tileSize) * tileSize;
        
        this.div.scrollTo({
            top: topPos,
            left: 0,
            behavior: 'smooth'
        })
        console.log('snap now');
    }

    resizeScroller = (scrBarW) => { // probably not gonna work because the parentElement doesnt get resized yet
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
}