/* TODO:
SCROLLING:
    - make it snap
    - make it loop infinitely
    - make it draggable
make classes their own files and find a way to export them
remake the scrolling so it measures how far the wheel actually scrolls instead of just scrolling to the next scrollFactor
find a solution to the window resizing issue
find a way to split up images into the three columns
find a way to check if posts align, and if so make them clickable (make cursor change when it hovers over them)
make the iframes
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

        // randomly create posts for demo 
        for (let i = 0; i < 30; i++) {
            const tags = ['', 'test'];
            let type = '';

            const randNumb = Math.random();
            if (randNumb > 0.75) {
                tags.push('video');
                type = 'video';
            } else if (randNumb > 0.5) {
                tags.push('audio');
                type = 'audio';
            } else if (randNumb > 0.25) {
                tags.push('text');
                type = 'text';
            } else {
                tags.push('autor*in');
                type = 'autor*in';
            }

            if(i < 10) {
                tags.push('letzte 10 Beiträge');    
            }
            this.posts.push(new Post(type, 'demo-' + type, tags, 'hsl(' + 12*i + ', 65%, 60%)', '#header', this.columns))
        }

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

        const bannerHeight = document.body.clientHeight * 0.05;

        const upperBanner = document.getElementById('upper-banner');
        upperBanner.style.top = document.body.clientHeight * 0.4 - bannerHeight*0.5 + 'px';
        upperBanner.style.height = bannerHeight + 'px';

        const lowerBanner = document.getElementById('lower-banner');
        lowerBanner.style.top = document.body.clientHeight * 0.7 - bannerHeight*0.5 + 'px';
        lowerBanner.style.height = bannerHeight + 'px';
        
        window.addEventListener('resize', this.resizeElements);
        this.resizeElements();
    }

    resizeElements = () => {
        for (let i = 0; i < this.columns.length; i++) {
            this.columns[i].div.style.height = window.innerHeight * 0.9 + 'px';
        }
        const tiles = document.getElementsByClassName('post-tile');
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.height = window.innerHeight * 0.3 + 'px';
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
        console.log(tags);
        this.handleTilesAfterNewToken(tags);
    }

    handleTilesAfterNewToken = (_tags) => {
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
                        tile.div.classList.remove('inactive-tile')
                        tile.div.classList.add('active-tile');
                    } else {
                        tile.div.classList.remove('active-tile')
                        tile.div.classList.add('inactive-tile');
                    }
                });
            });
        } else {
            this.posts.forEach((post) => {
                post.tiles.forEach((tile) => {
                    tile.div.classList.remove('inactive-tile')
                    tile.div.classList.add('active-tile');
                })
            })
        }
        
    }
}

const logic = new Logic();