class FamilyTree {
    constructor() {
        this.nodes = [];
    }

    display(_progress) {
        this.nodes.forEach((n) => {
            const lineProg = _progress / 10;
            n.display(lineProg);
        });
    }

    addNode(node) {
        this.nodes.push(node);
    }
}