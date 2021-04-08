/* TODO:

DONT FORGET INITIAL TOKENS

SCROLLING:
    - make it react to touch

Make every subpage responsive and still look good

--> 
MUSICPLAYER:
- volume slider?
- what happens, when track ends?
- fotos den midpoints entsprechend wechseln

TAGSYSTEM:
- wichtigste Tags zuerst anzeigen? Mit prioritätensystem

CROSSBROWSER

MOBILE

LEVER:
- post pos soll am ende in der mitte sein
- change the id search algorithm to only look at active tiles' ids

VIDEO:
- Credit description einfügen

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
                        if (addedTag.toLowerCase() === nextTag.toLowerCase()) {
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
        let allSuggestions = [];
        allTags.forEach((tag) => {
            const newSugg = { value: tag, text: tag, description: tag };
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
                // { value: 'letzte 10 Beiträge', text: 'letzte 10 Beiträge' }
            ],
            initialSuggestions: allSuggestions
        }, this);

        // create Banners
        this.banners = [];

        const bannerText = JSON.parse(bannerTextJSON);

        const upperBanner = document.getElementById('upper-banner');
        const lowerBanner = document.getElementById('lower-banner');

        for (let i = 0; i < bannerText.length; i++) {
            if (bannerText[i].position === 'upper') {
                this.banners[0] = new Banner(upperBanner, bannerText[i]);
            } else if (bannerText[i].position === 'lower') {
                this.banners[1] = new Banner(lowerBanner, bannerText[i]);
            }
        }

        const leverDiv = document.getElementById('lever-wrapper');
        this.lever = new Lever(this, leverDiv);
        window.addEventListener('resize', this.resizeElements);

        //this.checkTags();
        this.lastRandomId = 0;

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
                if (tile.image) {
                    tile.placeImage();
                }
            })
        })

        if (this.banners) {
            this.banners.forEach(banner => {
                banner.placeBanner();
            })
        }

        if (this.currentPost) {
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

        if (_tags.length > 0) {
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
                if (tile.div.classList.contains('active-tile')) {
                    activeTiles.push(tile);
                }
            });

            if (activeTiles.length < FEWESTTILESSTILLSCROLLABLE) {
                column.cloneTiles(activeTiles);
            }
        });
    }

    removeAllCopiedTiles = () => {
        this.columns.forEach((column) => { column.removeCopiedTiles() });
    }

    openPost = (id) => {
        for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === id) {
                this.posts[i].openPost();
                this.stopBackground();
                break;
            }
        }
    }

    stopBackground = () => {
        document.getElementsByClassName('home-wrapper')[0].style.display = 'none';
        this.banners.forEach((banner) => {
            banner.stopUpdating();
        })
    }

    startBackground = () => {
        document.getElementsByClassName('home-wrapper')[0].style.display = 'block';
        this.banners.forEach((banner) => {
            banner.startUpdating();
        })
        this.resizeElements();
    }

    showCompletedPostTiles = (tile, tileRow) => {
        const tileCol = tile.getColumnPos() + 1; // + 1 because getColumnPos returns -1 to 1 insteam of 0 to 2
        for (let i = 0; i < 3; i++) {
            if (i !== tileCol) {
                this.columns[i].showCompletedPostTiles(tile, tileRow, this.scrollers[i]);
            }
        }
    }

    alignRandomPost = () => {
        this.scrollers.forEach((scroller) => {
            clearTimeout(scroller.timer);
        })

        const randID = this.getRandomPostID();
        const scrollDestinations = this.findScrollDestination(randID);
        for (let i = 0; i < this.scrollers.length; i++) {
            //this.scrollers[i].scrollDest = 0;            
            this.spinTowardsDestination(this.scrollers[i], scrollDestinations[i]);
        }

    }

    spinScrollers = (spinSpeeds) => {
        for (let i = 0; i < spinSpeeds.length; i++) {
            this.scrollers[i].scrollAtSpeed(spinSpeeds[i]);
        }
        requestAnimationFrame(() => { this.spinScrollers(spinSpeeds) });
    }

    getRandomPostID = () => {
        const tokens = document.getElementsByClassName('token-autocomplete-token');
        let tags = [];
        for (let i = 0; i < tokens.length; i++) {
            for (let j = 0; j < tokens[i].childNodes.length; j++) {
                if (tokens[i].childNodes[j].nodeType === 3) {
                    tags.push(tokens[i].childNodes[j].data);
                }
            }
        }

        let activePosts = [];

        if (tags.length > 0) {
            this.posts.forEach((post) => {
                tags.forEach((tag) => {
                    post.tags.forEach((postTag) => {
                        if(postTag === tag) {
                            if(!(post.type.toLowerCase() === 'autor_in' || post.type.toLowerCase() === 'autorin' || post.type.toLowerCase() === 'autor')) {
                                activePosts.push(post);
                            }
                        }
                    })
                    
                })
            })
        } else {
            this.posts.forEach((post) => {
                if(!(post.type.toLowerCase() === 'autor_in' || post.type.toLowerCase() === 'autorin' || post.type.toLowerCase() === 'autor')) {
                    activePosts.push(post);
                }    
            })
        }

        console.log(activePosts);

        let randPost;

        if (activePosts.length > 0) {
            const randInd = Math.floor(Math.random() * (activePosts.length - 1));
            randPost = activePosts[randInd];
        }

        console.log(randPost.type);

        return randPost.id;
    }

    findScrollDestination = (id) => {
        const activeTile = document.getElementsByClassName('active-tile')[0];
        const tileSize = parseFloat(getComputedStyle(activeTile, null).getPropertyValue('height'));

        let scrollDestinations = [];

        for (let i = 0; i < this.scrollers.length; i++) {
            const tilePos = this.columns[i].getActiveTileIndexByID(id);
            const topPos = Math.floor((this.scrollers[i].div.scrollTop / tileSize) + 0.5);
            const midPos = topPos + 1;

            let diff = midPos - tilePos;
            if(diff < 0) {
                diff += this.columns[i].getActiveTiles().length;
            }

            const scrollDestination = (-1) * diff * tileSize - (tileSize * 0.1) - this.scrollers[i].column.getActiveColumnHeight();
            
            // const pos = this.columns[i].getActiveTileIndexByID(id) - this.columns[i].getActiveTiles().length;

            // const scrollDestination = ((pos + -3) * tileSize) - (tileSize * 0.1) + (this.scrollers[i].div.scrollTop - tileSize);
            // // const scrollDestination = ((pos + -3) * tileSize) - (tileSize * 0.1) - (this.scrollers[i].column.getActiveColumnHeight() * 3);

            // scrollDestinations[i] = scrollDestination;
            scrollDestinations[i] = scrollDestination;
        }
        return scrollDestinations;
    }

    spinTowardsDestination = (scroller, dest) => {
        const partDest = dest * 0.03;
        scroller.scrollTowards(partDest);
        dest -= partDest;

        if (scroller.scrollDest - scroller.div.scrollTop < -20 || dest < -20) {
            requestAnimationFrame(() => { this.spinTowardsDestination(scroller, dest) })
        } else {
            scroller.snap();
            document.getElementById('lever-wrapper').style.backgroundImage = "url(./src/media/ui/lever_unclicked.png)";
        }
    }
}

const MAXSUPPORTEDSCREENWIDTH = 2000; // biggest supported screen width in pixels
const FEWESTTILESSTILLSCROLLABLE = 6; // fewest amount of tiles in a column to still be able to scroll smoothly
const HEADERSIZE = 56; // headerheight in pixels

const logic = new Logic();