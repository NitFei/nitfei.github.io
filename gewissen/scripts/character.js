class Character {
    constructor(_isDevil, _parent, _answer, _question) {
        this.parent = _parent;
        // is the character a devil or an angel?
        this.isDevil = _isDevil;

        // generate body. These strings will later be used to choose which body parts to draw
        const maxBodyPartOptions = 3;
        this.bodyParts = [maxBodyPartOptions];
        for (let i = 0; i < maxBodyPartOptions; i++) {
            this.bodyParts[i] = this.randomPathNumber(maxBodyPartOptions);
        }

        if(_answer) {
            this.answer = _answer;
        } else {
            this.answer = '';
        }
        
        if(_question) {
            this.question = _question;
        } else {
            this.question = '';
        }
    }

    randomPathNumber = (max) => {
        let rand = Math.floor(Math.random() * max) + 1;
        if (rand < 10) {
            rand = '00' + rand;
        } else if (rand < 100) {
            rand = '0' + rand;
        } return rand;
    }

    init = () => {
        this.children = [];
        this.children.push(new Character(true, this));
        this.children.push(new Character(false, this));
    }

    getParentCharacter = () => {
        return this.parent;
    }

    getChildCharacter = (index) => {
        if(!this.children) {
            this.init();
        }

        return this.children[index];
    }
}