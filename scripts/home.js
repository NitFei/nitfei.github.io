/* TODO:
make classes their own files and find a way to export them
remake the scrolling so it measures how far the wheel actually scrolls instead of just scrolling to the next scrollFactor
find a solution to the window resizing issue
style searchbar
find a way to split up images into the three columns
make tags filter the tiles
redesign logo
make the columns draggable
find a way to check if posts align, and if so make them clickable (make cursor change when it hovers over them)
make the iframes
*/

class Banner{
    constructor() {

    }
}

class Tile {

    constructor(div, tags, image, link, alligned) {
        this.div = div;
        this.tags = tags;
        this.image = image;
        this.link = link;
        this.alligned = alligned; // is the tile in the same row as the 2 other tiles belonging to the post?

        this.div.style.background = image;
        this.div.className = 'post-tile';
        //this.div.style.height = document.body.clientHeight * 0.3 + 'px';
    }
}

class Searchbar { // might be obsolete with token-autocomplete

    //https://www.w3schools.com/howto/howto_js_filter_lists.asp

    constructor() {
        this.inputField = document.getElementById('searchbar');
        this.inputField.addEventListener('keyup', () => {this.filterSuggestions()});
        this.inputField.addEventListener('focus', () => {this.makeSuggestionsVisible()});
        this.inputField.addEventListener('blur', () => {this.makeSuggestionsInvisible()});

        this.mouseHoveringSuggestions = false;

        this.suggestionDiv = document.getElementById('searchbar-suggestion-wrapper');
        this.suggestions = this.suggestionDiv.children;
    }

    filterSuggestions = () => {
        const lowerCaseInput = this.inputField.value.toLowerCase();
        
        for (let i = 0; i < this.suggestions.length; i++) {
            const a = this.suggestions[i].getElementsByTagName("a")[0];
            const txtValue = a.textContent || a.innerText;
            if (txtValue.toLowerCase().indexOf(lowerCaseInput) >= 0) {
                this.suggestions[i].style.display = "";
            } else {
                this.suggestions[i].style.display = "none";
            }
        }
    }

    makeSuggestionsVisible = () => {
        this.suggestionDiv.style.display = 'block';
    }

    makeSuggestionsInvisible = () => {
        if(!this.mouseHoveringSuggestions){
            this.suggestionDiv.style.display = 'none';
        }
    }

    confirmInput(){
        checkTags(this.inputField.value);
    }
}

class Post {

    constructor (type, title, tags, image, link) {
        this.type = type;
        this.title = title;
        this.tags = tags;
        this.image = image;
        this.link = link;

        this.tiles = []

        let isAuthor = false; // check if the post is an author profile. If so, it only takes up 1 column instead of 3
        tags.forEach((tag) => {
            if(tag.toLowerCase() === 'autor*in' || tag.toLowerCase() === 'autor' || tag.toLowerCase() === 'autorin') {
                isAuthor = true;
            }
        });

        const columns = document.getElementsByClassName('column');
        if (isAuthor) {
            const randNum = Math.floor(Math.random()*3); // randomly choose a column to place tile in
            this.createTile(columns[randNum]);
        } else { // if post is not an author profile, create 3 new tiles, each in its seperate column
            for (let i = 0; i < columns.length; i++) {
                this.createTile(columns[i])
            }
        }
    }

    createTile = (column) => {
        const tileDiv = document.createElement('div');
        tileDiv.className = 'post-tile'
        tileDiv.innerText = this.title;

        if(column.children.length >= 0) {
            column.insertBefore(tileDiv, column.children[Math.floor(Math.random()*column.children.length)]);
        } else {
            column.appendChild(tileDiv);
        }

        const tile = new Tile(tileDiv, this.tags, this.image, '#header', false);
        this.tiles.push(tile);
    }
}

class Logic {

    constructor() {
        /***** scrolling *****/

        const scrollHelpers = document.getElementsByClassName('scroll-helper');
        const columns = document.getElementsByClassName('column');
        const scrollFactor = document.body.clientHeight*0.3;

        for (let i = 0; i < scrollHelpers.length; i++) {
            scrollHelpers[i].addEventListener('wheel', (e) => {
                const oldOffset = scrollHelpers[i].children[0].offsetTop - scrollHelpers[i].parentElement.offsetTop;
                const newOffset = Math.floor(oldOffset/scrollFactor) * scrollFactor + Math.sign(e.deltaY) * scrollFactor;
                scrollHelpers[i].children[0].style.top = newOffset + 'px';
                console.log(e.deltaY);
            })
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
            this.posts.push(new Post(type, 'demo-' + type, tags, 'hsl(' + 12*i + ', 65%, 60%)', '#header'))
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

        const resizeElements = () => {
            for (let i = 0; i < columns.length; i++) {
                columns[i].style.height = window.innerHeight * 0.9 + 'px';
            }
            const tiles = document.getElementsByClassName('post-tile');
            for (let i = 0; i < tiles.length; i++) {
                tiles[i].style.height = window.innerHeight * 0.3 + 'px';
            }
        }
        
        window.onresize = resizeElements;
        resizeElements();
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
                        tile.div.style.display = 'block';
                    } else {
                        tile.div.style.display = 'none';
                    }
                });
            });
        } else {
            this.posts.forEach((post) => {
                post.tiles.forEach((tile) => {
                    tile.div.style.display = 'block';
                })
            })
        }
        
    }
}

const logic = new Logic();