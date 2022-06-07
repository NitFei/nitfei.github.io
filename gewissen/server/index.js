const express = require('express');
const Datastore = require('@rmanibus/nedb');

const app = express();
app.listen(3000, () => {console.log('listening at 3000')});
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const questionsDB = new Datastore('questions.db');
const answersDB = new Datastore('answers.db');
questionsDB.loadDatabase();
answersDB.loadDatabase();

app.post('/createPath', (request, response) => {
    console.log('Post received!');
    if(request.body.question && request.body.answers && request.body.layerID) {
        let question = {};
        question.layerID = request.body.layerID;
        question.text = request.body.question;
        questionsDB.insert(question);

        let answerDevil = {};
        answerDevil.layerID = request.body.layerID;
        answerDevil.text = request.body.answers.devil;
        answerDevil.type = 'devil';
        answersDB.insert(answerDevil);

        let answerAngel = {};
        answerAngel.layerID = request.body.layerID;
        answerAngel.text = request.body.answers.angel;
        answerAngel.type = 'angel';
        answersDB.insert(answerAngel);

        response.json({
            text: 'Your entry was added to the database. Your answers were ' + request.body.answers + '. The corresponding question was ' + 'request.body.question'
        });   

        console.log('new entry in database')
    } else {
        response.json({
            text: 'Something went wrong. Somebody call the cops!'
        });

        console.log('request body in wrong format')
    }
});

app.post('/getLayer', async (request, response) => {
    console.log('request for layer received.');

    if(request.body.layerID) {
        const requestedLayerID = request.body.layerID;
        getLayerTexts(requestedLayerID)
            .then((layerTexts) => {
                response.json(layerTexts);
                console.log('Layer texts sent!')
            });
    } else {
        console.log('request in wrong format');
    }
});


async function getLayerTexts(requestedLayerID) {
    let responseData = {question:'test', answers:{devil:'', angel:''}};
    responseData.answers.devil = await getDevilAnswer(requestedLayerID);
    responseData.answers.angel = await getAngelAnswer(requestedLayerID);
    responseData.question = await getQuestion(requestedLayerID);
    return responseData;
}

function getDevilAnswer(requestedLayerID) {
    return new Promise((resolve, reject) => {
        answersDB.find({layerID: requestedLayerID, type:'devil'}, (err, docs) => {
            if(err||!docs[0]) {
                resolve({exists: false, text: 'option not yet written (click here to add your answer)'});
            } else {
                resolve({exists: true, text: docs[0].text});
            }
        });
    });
};

function getAngelAnswer(requestedLayerID) {
    return new Promise((resolve, reject) => {
        answersDB.find({layerID: requestedLayerID, type:'angel'}, (err, docs) => {
            if(err||!docs[0]) {
                resolve({exists: false, text: 'option not yet written (click here to add your answer)'});
            } else {
                resolve({exists: true, text: docs[0].text});
            }
        });
    });
};

function getQuestion(requestedLayerID) {
    return new Promise((resolve, reject) => {
        questionsDB.find({layerID: requestedLayerID}, (err, docs) => {
            if(err||!docs[0]) {
                resolve({exists: false, text: 'question not yet written (click here to add your answer)'});
            } else {
                resolve({exists: true, text: docs[0].text});
            }
        });
    });
};

app.get('/getAllLayers', async (request, response) => {
    await findAllLayers().
        then((layers) => {
            response.json(layers);
        });
});

async function findAllLayers() {
    return new Promise(async (resolve) => {
        let data = await findAllQuestions();
        let layers = await addAnswersToQuestions(data);
        resolve(layers);
    });
}

function findAllQuestions() {
    return new Promise(async (resolve) => {
        questionsDB.find({}, (err, docs) => {
            if(err||!docs[0]) {
                resolve([]);
            } else {
                resolve(docs);
            }
        });
    });
}

async function addAnswersToQuestions(questions) {
    return new Promise(async (resolve) => {
        let layers = [];
        for await (let q of questions) {
            let layer = {layerID : q.layerID, question : q.text, answers: {devil : '', angel : ''}};
            layer.answers.devil = await getDevilAnswer(q.layerID);
            layer.answers.angel = await getAngelAnswer(q.layerID)
                .then(layers.push(layer));
        }
        resolve(layers);
    });
}