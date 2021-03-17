/* TODO:
SCROLLING:
    - make it draggable
    - make it react to touch

Make every subpage responsive and still look good

make tiles snap after resizing window

what happens when tiles are not aligned but clicked?
--> 
MUSICPLAYER:
- volume slider?
- what happens, when track ends?
- fotos den midpoints entsprechend wechseln
- wenn der post geschlossen wird, soll das audio zugehen

IMPRESSUM:
- hintergrundbild & kachelbild

TAGSYSTEM:
- wichtigste Tags zuerst anzeigen? Mit prioritätensystem

CROSSBROWSER

MOBILE

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

        // create Banners
        this.banners = [];

        const bannerText = JSON.parse(bannerTextJSON);

        const upperBanner = document.getElementById('upper-banner');
        const lowerBanner = document.getElementById('lower-banner');

        for (let i = 0; i < bannerText.length; i++) {
            if(bannerText[i].position === 'upper') {
                this.banners[0] = new Banner(upperBanner, bannerText[i]);
            } else if (bannerText[i].position === 'lower'){
                this.banners[1] = new Banner(lowerBanner, bannerText[i]);
            }
        }
        
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

const MAXSUPPORTEDSCREENWIDTH = 2000; // biggest supported screen width in pixels
const FEWESTTILESSTILLSCROLLABLE = 6; // fewest amount of tiles in a column to still be able to scroll smoothly
const HEADERSIZE = 56; // heiderheight in pixels

const logic = new Logic();

// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);