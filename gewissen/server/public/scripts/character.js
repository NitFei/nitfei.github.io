class Character {
    constructor(_isDevil, _parent, _answers, _question) {
        this.parent = _parent;
        // is the character a devil or an angel?
        this.isDevil = _isDevil;

        // generate body. These strings will later be used to choose which body parts to draw
        const maxBodyPartOptions = 3;
        this.bodyParts = [maxBodyPartOptions];
        for (let i = 0; i < maxBodyPartOptions; i++) {
            this.bodyParts[i] = this.randomPathNumber(maxBodyPartOptions);
        }

        if(_answers) {
            this.answers.devil = _answers.devil ? _answers.devil : 'option not yet written (click here to add your own answer)';
            this.answers.angel = _answers.angel ? _answers.angel : 'option not yet written (click here to add your own answer)';
        }
        this.question = _question ? _question : 'question not yet written (click here to add your own question)';
    }

    randomPathNumber = (max) => {
        let rand = Math.floor(Math.random() * max) + 1;
        if (rand < 10) {
            rand = '00' + rand;
        } else if (rand < 100) {
            rand = '0' + rand;
        }
        
        return rand;
    }

    // horrible name for what this function actually does
    init = () => {
        this.children = [];
        this.children.push(new Character(true, this));
        this.children.push(new Character(false, this));
    }

    birthChild(isDevil){
        this.children = this.children ? this.children : [{},{}];
        const child = new Character(isDevil, this);
        const index = isDevil ? 0 : 1;
        this.children[index] = child;
    }

    getParentCharacter = () => {
        return this.parent;
    }

    getChildCharacter = (index) => {
        if(!this.hasChildren()) {
            return false;
        }

        return this.children[index];
    }

    hasChildren  = () => {
        return this.children ? true : false;
    }

    hasDevilAnswer = () => {
        return this.answers.devil ? true : false; 
    } 

    hasAngelAnswer = () => {
        return this.answers.angel ? true : false;
    }
}