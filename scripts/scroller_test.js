class Scroller {
    constructor(_div, _column){
        this.div = _div;
        this.column = _column;
        this.scrBarW = this.getScrollBarWidth();
        this.lastScrollTop = 0;
        this.scrollFactor = 20;

        this.addEventHandler();
        this.resizeScroller(this.scrBarW);
        this.scrollingUp = true;
    }


    addEventHandler = () => {
        this.div.addEventListener('wheel', (e) => {
            const oldOffset = this.div.children[0].offsetTop - this.div.parentElement.offsetTop;
            const newOffset = Math.floor(oldOffset/this.scrollFactor) * this.scrollFactor + e.deltaY * -1 * this.scrollFactor;
            this.div.children[0].style.top = newOffset + 'px';
            console.log(e);
        });

        // this.div.addEventListener('scroll', (e) => {
        //     // is the event scrolling up or down?
        //     //const scrollingUp = this.lastScrollTop > this.div.scrollTop;

        //     //console.log(this.div.scrollTop);

        //     if(this.scrollingUp) {
        //         if (this.div.scrollTop < 300) {     
        //             this.addToTop();
        //             console.log('wowie');
        //         }
        //     } else {
        //         if (this.div.scrollTop > this.div.clientHeight - 300){
        //             this.addToBottom();
        //             console.log('new');
        //         }
        //     }

        //     this.lastScrollTop = this.div.scrollTop;
        // })

        // this.div.addEventListener('wheel', (e) => {
        //     // is the event scrolling up or down?
        //     console.log(e);
        //     const scrollingUp = e.deltaY < 0;

        //     //console.log(this.div.scrollTop);

        //     if(scrollingUp) {
        //         if (this.div.scrollTop < 300) {     
        //             this.addToTop();
        //             console.log(this.div.scrollTop);
        //         }
        //     } else {
        //         /*if (this.div.scrollTop > this.div.clientHeight - 300){
        //             this.addToBottom();
        //             console.log('new');
        //         }*/
        //     }

            
        // })
    }

    addToTop = () => {
        this.column.moveBottomTileToTop();
        this.div.scrollTop += document.getElementsByClassName('active-tile')[0].clientHeight;
        // scrollbar gets stuck at the top and stops working when scrolling too fast. set it to 100 everytime that happens to avoid it
        if(this.div.scrollTop === 0) {
            this.div.scrollTop = 100;
        }        
    }

    addToBottom = () => {
        this.column.moveTopTileToBottom();

        // scrollbar gets stuck at the bottom and stops working when scrolling too fast. set it to 100 everytime that happens to avoid it
        if(this.div.scrollTop >= this.div.clientHeight) {
            this.div.scrollTop = this.div.clientHeight - 100;
        } 
    }

    snap = () =>{
        console.log((this.div.scrollTop + (0.5*document.getElementsByClassName('active-tile')[0].clientHeight)) / document.getElementsByClassName('active-tile')[0].clientHeight)
        const topPos = Math.floor((this.div.scrollTop + (0.5*document.getElementsByClassName('active-tile')[0].clientHeight)) / document.getElementsByClassName('active-tile')[0].clientHeight) * document.getElementsByClassName('active-tile')[0].clientHeight;
        this.div.scrollTo({
            top: topPos,
            left: 0,
            behavior: 'smooth'
        })
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