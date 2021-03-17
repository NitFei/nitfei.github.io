// this is a placeholder for developement's sake. Ultimately this should be replaced by an xmlhhttprequest from a server

const bannerTextToJSON = [
    {
        "position":"upper",
        "content":[
            {"text":"Ich bin das obere Banner", "color":"standard"},
            {"text":"Hier gibt es Neues von 248 Sachen", "color":"standard"}
        ]
    },
    {
        "position":"lower",
        "content":[
            {"text":"Ich bin das untere Banner", "color":"standard"},
            {"text":"Hier gibt es Neues von 248 Sachen", "color":"standard"}
        ]
    }
];

const bannerTextJSON = JSON.stringify(bannerTextToJSON);