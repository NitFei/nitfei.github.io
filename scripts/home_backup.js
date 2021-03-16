const scrollScrollers = document.getElementsByClassName('scroll-scroller');
const scrollWrappers = document.getElementsByClassName('scroll-wrapper');
const header = document.getElementById('header');
const scrollBarWidth = getScrollBarWidth();


// function to determine scrollbar width in order to add the right amount to the scoller-wrappers
function getScrollBarWidth () {
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
};

console.log(scrollBarWidth);


for (let i = 0; i < scrollScrollers.length; i++) {
    const cWidth = scrollScrollers[i].clientWidth;
    scrollScrollers[i].style.width = cWidth + 2 * scrollBarWidth + "px";
}

for (let i = 0; i < scrollWrappers.length; i++) {
    const iHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight; // cross-browser

    const wrapperHeight = iHeight - header.clientHeight;
    scrollScrollers[i].style.height = wrapperHeight + "px";
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

    addToColumn
}