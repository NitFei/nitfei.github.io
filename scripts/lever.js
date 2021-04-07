class Lever {
    constructor(_logic, _div) {
        if (!_div) {
            this.div = document.createElement('div');
            this.div.classList.add('lever-container');
            document.body.appendChild(this.div);
        } else {
            this.div = _div;
        }

        this.logic = _logic;

        //this.div.onclick = () => { this.alignRandomPost };
        this.div.addEventListener('click', this.alignRandomPost);
    }

    alignRandomPost = () => {
        this.div.style.backgroundImage = "url(./src/media/ui/lever_clicked.png)";
        this.logic.alignRandomPost();
    }
}