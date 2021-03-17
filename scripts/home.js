/* TODO:
SCROLLING:
    - make it draggable
    - make it react to touch
find a solution to the window resizing issue
    - which elements still need to be resized?
        - SHOULD HEADER REALLY BE RESIZED?
        hori:
            - Banner
            - header
find a way to check if posts align, and if so make them clickable (make cursor change when it hovers over them)
make the iframes
what happens when tiles are not aligned but clicked?
MUSICPLAYER:
REDESIGN: --o--o--o--
- make labels not be inside the overflow hidden div

- volume slider?
- what happens, when track ends?
- fotos den midpoints entsprechend wechseln

IMPRESSUM:
- hintergrundbild & kachelbild

TAGSYSTEM:
- wichtigste Tags zuerst anzeigen? Mit prioritätensystem

organize everything into modules at the very end
*/

class Logic {
    constructor() {
        // create columns
        const columnDivs = document.getElementsByClassName('column');
        this.columns = [];
        for (let i = 0; i < columnDivs.length; i++) {
            this.columns[i] = new Column(columnDivs[i]);
        }

        /***** scrolling *****/
        const scrollHelpers = document.getElementsByClassName('scroll-helper');
        this.scrollers = [];

        for (let i = 0; i < scrollHelpers.length; i++) {
            this.scrollers.push(new Scroller(scrollHelpers[i], this.columns[i]));
        }

        // create all posts
        this.posts = [];
        // this.posts.push(new Post(104, 'autor_in', 'kkoki', ['', 'test', 'img', 'autor*in'], 'src/media/autor_innen/kkoki.jpg', '#', this.columns, this.scrollers, this));
        // this.posts.push(new Post(103, 'autor_in', 'casjen', ['', 'test', 'img', 'autor*in'], 'src/media/autor_innen/casjen.jpg', '#', this.columns, this.scrollers, this));
        // this.posts.push(new Post(102, 'autor_in', 'benedikt', ['', 'test', 'img', 'autor*in'], 'src/media/autor_innen/benedikt.jpg', '#', this.columns, this.scrollers, this));
        // this.posts.push(new Post(101, 'autor_in', 'alexa', ['', 'test', 'img', 'autor*in'], 'src/media/autor_innen/alexa.jpg', '#', this.columns, this.scrollers, this));
        // this.posts.push(new Post(100, 'autor_in', 'bilbi_der_schlumpf', ['', 'test', 'img', 'autor*in'], 'src/media/autor_innen/bilbi.jpg', '#', this.columns, this.scrollers, this));

        // this.posts.push(new Post(100, 'lesung', 'lesung3', ['', 'test', 'img', 'lesung'], 'src/media/lesungen/lesung3.jpeg', 'src/media/lesungen/disappear_adrianne_lenker.mp3', this.columns, this.scrollers, this));
        // // randomly create posts for demo 
        // for (let i = 0; i < 30; i++) {
        //     const tags = ['', 'test'];
        //     let type = '';

        //     const randNumb = Math.random();
        //     if (randNumb > 0.75) {
        //         tags.push('video');
        //         type = 'video';
        //     // } else if (randNumb > 0.5) {
        //     //     tags.push('lesung');
        //     //     type = 'lesung';
        //     } else if (randNumb > 0.25) {
        //         tags.push('text'); // changed to video for demo purposes, change it back to text asap
        //         type = 'text';
        //     } else {
        //         tags.push('autor*in');
        //         type = 'autor_in';
        //     }

        //     if(i < 10) {
        //         tags.push('letzte 10 Beiträge');    
        //     }
        //     this.posts.push(new Post(i, type, 'demo-' + type, tags, 'hsl(' + 12*i + ', 65%, 60%)', '#header', this.columns, this.scrollers, this))
        // }

        this.createPosts();

        // collect all possible tags from posts into an array
        let allTags = [];
        this.posts.forEach((post) => {
            post.tiles.forEach((tile) => {
                tile.tags.forEach((nextTag) => {
                    let alreadyAdded = false;
                    allTags.forEach((addedTag) => {
                        if(addedTag.toLowerCase() === nextTag.toLowerCase()) {
                            alreadyAdded = true;
                        }
                    })
            
                    if (!alreadyAdded) {
                        allTags.push(nextTag);
                    }
                })
            })
        })

        // create array of suggestions for the token-autocomplete
        let allSuggestions =[];
        allTags.forEach((tag) => {
            const newSugg = {value: tag, text: tag, description: tag};
            allSuggestions.push(newSugg);
        })

        //add post-tiles as html divs to columns
        this.columns.forEach(column => {
            column.addTileDivsToColumn();
        })

        // make post-tiles and columns the correct size
        this.resizeElements();

        // place tile images
        this.posts.forEach(post => {
            post.placeTileImages();
        })

        // create searchbar
        this.searchbar = new TokenAutocomplete({
            name: 'searchbar',
            selector: '#searchbar',
            noMatchesText: 'entspricht keinem Beitrag...',
            initialTokens: [
                {value: 'letzte 10 Beiträge', text: 'letzte 10 Beiträge'}
            ],
            initialSuggestions: allSuggestions
        }, this);

        this.banners = [];
        const upperBanner = document.getElementById('upper-banner');
        const lowerBanner = document.getElementById('lower-banner');
        this.banners[0] = new Banner(upperBanner, ['hallo', 'das ist so toll']);
        this.banners[1] = new Banner(lowerBanner, ['achtung ich bin das untere banner', 'alalala']);
        
        window.addEventListener('resize', this.resizeElements);
    }

    createPosts = () => {
        // xmlhttprequest comes here once everything is started from a server
        // for now, everything loads locally

        //allpostsJSON is created in posts.js for now
        const jPosts = JSON.parse(allPostsJSON);
        for (let i = 0; i < jPosts.length; i++) {
            const newPost = new Post(this);
            Object.assign(newPost, jPosts[i]);
            newPost.init();

            this.posts.push(newPost);
        }
    }

    resizeElements = () => {
        this.columns.forEach(column => {
            column.resizeColumn();
        })

        this.scrollers.forEach(scroller => {
            scroller.resizeScroller(scroller.scrBarW);
        })

        this.posts.forEach(post => {
            post.tiles.forEach(tile => {
                if(tile.image){
                    tile.placeImage();
                }
            })
        })

        if(this.banners){
            this.banners.forEach(banner => {
                    banner.placeBanner();
            })
        }

        if(this.currentPost) {
            this.currentPost.resizePost();
        }
    }

    checkTags = () => {
        const tokens = document.getElementsByClassName('token-autocomplete-token');
        let tags = [];
        for (let i = 0; i < tokens.length; i++) {
            for (let j = 0; j < tokens[i].childNodes.length; j++) {
                if (tokens[i].childNodes[j].nodeType === 3) {
                    tags.push(tokens[i].childNodes[j].data);
                }
            }
        }
        this.handleTilesAfterNewToken(tags);
        this.handleColumnsAfterNewToken();
    }

    handleColumnsAfterNewToken = () => {
        this.scrollers.forEach(scroller => {
            scroller.resizeScroller(scroller.scrBarW);
        })
    };

    handleTilesAfterNewToken = (_tags) => {
        this.removeAllCopiedTiles();

        if(_tags.length > 0) {
            this.posts.forEach((post) => {
                post.tiles.forEach((tile) => {
                    let containsTag = false;
                    tile.tags.forEach((tileTag) => {
                        _tags.forEach((tag) => {
                            if (tileTag.toLowerCase() === tag.toLowerCase()) {
                                containsTag = true;
                            }
                        })
                    })
            
                    if (containsTag) {
                        tile.div.classList.remove('inactive-tile');
                        tile.div.classList.add('active-tile');
                    } else {
                        tile.div.classList.remove('active-tile');
                        tile.div.classList.add('inactive-tile');
                    }
                });
            });
        } else {
            this.posts.forEach((post) => {
                post.tiles.forEach((tile) => {
                    tile.div.classList.remove('inactive-tile');
                    tile.div.classList.add('active-tile');
                })
            })
        }

        this.columns.forEach((column) => {
            let activeTiles = [];
            column.tiles.forEach((tile) => {
                if(tile.div.classList.contains('active-tile')){
                    activeTiles.push(tile);
                }
            });

            if(activeTiles.length < FEWESTTILESSTILLSCROLLABLE) {
                column.cloneTiles(activeTiles);
            }
        });
    }

    removeAllCopiedTiles = () => {
        this.columns.forEach((column) => {column.removeCopiedTiles()});
    }

    openPost = (id) => {
        for(let i = 0; i < this.posts.length; i++) {
            if(this.posts[i].id === id) {
                this.posts[i].openPost();
                break;
            }
        }
    }
}

const FEWESTTILESSTILLSCROLLABLE = 6;
const HEADERSIZE = 56;
const logic = new Logic();

// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);