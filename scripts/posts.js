// this is a placeholder for developement's sake. Ultimately this should be replaced by an xmlhhttprequest from a server

const allPostsToJSON = [
    {
        "id":"10001",
        "type":"Autor_in",
        "firstName":"Freya",
        "lastName": "Petersen",
        "tags":["Autor*in","Lesung 7", "Freya Petersen"],
        "tileImageURL":"src/media/autor_innen/freyapetersen.jpg",
        "bgImageURL":"src/media/autor_innen/freyapetersen.jpg",
        "links":[{"external":true, "postID":"Wenn das ein interner Link ist, sollte hier die ID des Posts, zu dem geführt wird, stehen", "url":"PlatzhalterURL", "linktext":"Ich bin ein Link"},
            {"external":false, "postID":"Same as above", "url":"PlatzhalterURL", "linkText":"Ich bin ein Link"}],
        "bio":"Ich bin eine Platzhalterbio"
    },
    {
        "id":"10002",
        "type":"Autor_in",
        "firstName":"Phillip",
        "lastName": "Kampert",
        "tags":["Autor*in","Lesung 7", "Phillip Kampert"],
        "tileImageURL":"src/media/autor_innen/phillipkampert.jpg",
        "bgImageURL":"src/media/autor_innen/phillipkampert.jpg",
        "links":[{"external":true, "postID":"Wenn das ein interner Link ist, sollte hier die ID des Posts, zu dem geführt wird, stehen", "url":"PlatzhalterURL", "linktext":"Ich bin ein Link"},
            {"external":false, "postID":"Same as above", "url":"PlatzhalterURL", "linkText":"Ich bin ein Link"}],
        "bio":"Ich bin eine Platzhalterbio"
    },
    {
        "id":"10003",
        "type":"Autor_in",
        "firstName":"Monika",
        "lastName": "Schuster",
        "tags":["Autor*in","Lesung 7", "Monika Schuster"],
        "tileImageURL":"src/media/autor_innen/monikaschuster.jpg",
        "bgImageURL":"src/media/autor_innen/monikaschuster.jpg",
        "links":[{"external":true, "postID":"Wenn das ein interner Link ist, sollte hier die ID des Posts, zu dem geführt wird, stehen", "url":"PlatzhalterURL", "linktext":"Ich bin ein Link"},
            {"external":false, "postID":"Same as above", "url":"PlatzhalterURL", "linkText":"Ich bin ein Link"}],
        "bio":"Ich bin eine Platzhalterbio"
    },
    {
        "id":"10004",
        "type":"Autor_in",
        "firstName":"",
        "lastName": "Kkoki",
        "tags":["Autor*in","Lesung 7", "Kkoki"],
        "tileImageURL":"src/media/autor_innen/kkoki.jpg",
        "bgImageURL":"src/media/autor_innen/kkoki.jpg",
        "links":[{"external":true, "postID":"Wenn das ein interner Link ist, sollte hier die ID des Posts, zu dem geführt wird, stehen", "url":"PlatzhalterURL", "linktext":"Ich bin ein Link"},
            {"external":false, "postID":"Same as above", "url":"PlatzhalterURL", "linkText":"Ich bin ein Link"}],
        "bio":"Ich bin eine Platzhalterbio"
    },
    {
        "id":"20001",
        "type":"Lesung",
        "title":"Lesung-7",
        "tags":["Lesung", "Lesung 7", "Literaturkirche St. Jakobi", "Freya Petersen", "Phillip Kampert", "Monika Schuster", "Kkoki"],
        "tileImageURL":"src/media/lesungen/lesung7/lesung7kachel.jpg",
        "bgImageURLs":["src/media/lesungen/lesung7/lesung7bg1.jpg",
            "src/media/lesungen/lesung7/lesung7bg1.jpg"],
        "audioURL":"src/media/lesungen/lesung7/lesung7.wav",
        "midPoints":[{"label":"Freya Petersen Lesung", "time":"0"},
            {"label":"Freya Petersen Gespräch", "time":"549"},
            {"label":"Phillip Kampert Lesung", "time":"1311"},
            {"label":"Phillip Kampert Gespräch", "time":"2126"},
            {"label":"Monika Schuster Lesung", "time":"2910"},
            {"label":"Monika Schuster Gespräch", "time":"3692"},
            {"label":"Kkoki Lesung", "time":"4275"},
            {"label":"Kkoki Gespräch", "time":"5106"}
        ],
        "authors":[{"name": "Freya Petersen", "midPointText":"0", "midPointInterview":"1", "profileID":"10001"},
            {"name":"Phillip Kampert", "midPointText":"2", "midPointInterview":"3", "profileID":"10002"},
            {"name":"Monika Schuster", "midPointText":"4", "midPointInterview":"5", "profileID":"10003"},
            {"name":"Kkoki", "midPointText":"6", "midPointInterview":"7", "profileID":"10004"}
        ]
    },
    {
        "id":"50001",
        "type":"Kontakt",
        "tags":["Kontakt", "Mitmachen"],
        "tileImageURL":"src/media/kontakt/kontaktkachel.jpg",
        "bgImageURL":"src/media/kontakt/kontakt.jpg"
    }
];

const allPostsJSON = JSON.stringify(allPostsToJSON);