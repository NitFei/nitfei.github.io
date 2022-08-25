class FamilyTree {
    constructor() {
        this.nodes = [];
    }

    display(_progress) {
        this.nodes.forEach((n) => {
            const lineProg = (_progress / 40);

            // let w, h;

            // for (let k = 0; k < 2; k++) {
            //     h = k * 0.5 * height + 0.25*height;

            //     for (let j = 0; j < 3; j++) {
            //         w = j * 0.5 * width;
    
            //         for (let i = 0; i < 4; i++) {
            //             n.display((lineProg + i * 0.5) % 2, w, h, -1);
            //             n.display((lineProg + i * 0.5) % 2, w, h, 1);
            //         }
            //     }
            // }

            n.display(lineProg, width*0.5, height*0.5, 1);

            if (lineProg > 1) {
                n.display((lineProg + 1), width*0.5, height*0.5, 1);
            }

            // if (lineProg > 7.5) {
            //     n.display((lineProg + 0.5), width*0.5, height*0.5, 1);
            // }

            // if (lineProg > 8.5) {
            //     n.display((lineProg + 1.5), width*0.5, height*0.5, 1);
            // }

            // n.display((lineProg + 1.5) % 2, width*0.5, height*0.5);
          
            // if (_progress > 100) {
            //     n.display((lineProg + 0.25) % 2)
            //     n.display((lineProg + 0.75) % 2);
            //     n.display((lineProg + 1.25) % 2);
            //     n.display((lineProg + 1.75) % 2);
            // }
        });
    }

    addNode(node) {
        this.nodes.push(node);
    }
}