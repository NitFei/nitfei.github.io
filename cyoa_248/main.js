let currentSection = 0;
const firstBackgroundImgURL = "./src/imgs/lonely.jpg";
const sections = [
    {
        question: "Was schickst du deinem Tindermatch?",
        options: [
            { label: "GIF", correct: false, img: "./src/imgs/a.jpg" },
            { label: "Altes Foto", correct: true, img: "./src/imgs/b.jpg" },
            { label: "Heyyyyyyyyyyy, voll lang nicht gesehen ;)))))", correct: false, img: "./src/imgs/c.jpg" },
            { label: "Standort deines Lieblingsrestaurants", correct: false, img: "./src/imgs/d.jpg" },
        ],
    },
    {
        question: "Wo findet euer Date statt?",
        options: [
            { label: "Sternwarte", correct: false, img: "./src/imgs/e.jpg" },
            { label: "Kufa", correct: false, img: "./src/imgs/f.jpg" },
            { label: "Tonkuhle", correct: false, img: "./src/imgs/g.jpg" },
            { label: "India House", correct: true, img: "./src/imgs/h.jpg" },
        ],
    },
    {
        question: "Was ist deine Begrüßung?",
        options: [
            { label: "High Five", correct: false, img: "./src/imgs/a.jpg" },
            { label: "Body Check", correct: false, img: "./src/imgs/a.jpg" },
            { label: "Umarmung", correct: false, img: "./src/imgs/a.jpg" },
            { label: "Zungenkuss", correct: true, img: "./src/imgs/a.jpg" },
        ],
    },
];

$(document).ready(() => {
    loadSection(currentSection);
    $(".option-wrapper").click(function (e) {
        e.stopPropagation();
        let optID = $(this)[0].id.replace(/\D/g, "");
        optID--;
        hideOptions();
        setBackground(sections[currentSection].options[optID].img);
        displayIntermittentOption(sections[currentSection].options[optID]);
        $(window).on("click", function () {
            $(window).off("click");
            if (optionIsCorrect(optID)) {
                nextSection();
            }
            loadSection(currentSection);
            showOptions();
        });
    });
});

function hideOptions() {
    $(".options-container").addClass("hide");
}

function showOptions() {
    $(".options-container").removeClass("hide");
}

function displayIntermittentOption(option) {
    setQuestionContent(option.label);
}

function setBackground(url) {
    $(".cont").css("background-image", "url(" + url + ")");
}

function setQuestionContent(newContent) {
    $(".question-content").text(newContent);
}

function displayOptions(newOptions) {
    $(".option-wrapper").each((i, obj) => {
        // set label
        $(obj).children(".option-content").text(newOptions[i].label);

        // set image
        $(obj).children("img").attr("src", newOptions[i].img);
    });
}

function nextSection() {
    currentSection++;
    loadSection(currentSection);
}

function loadSection(index) {
    setQuestionContent(sections[index].question);
    displayOptions(sections[index].options);
    if (index === 0) {
        setBackground(firstBackgroundImgURL);
    } else {
        let correctPreviousOptionImgURL;
        sections[currentSection - 1].options.forEach((o) => {
            if (o.correct) {
                correctPreviousOptionImgURL = o.img;
            }
        });
        setBackground(correctPreviousOptionImgURL);
    }
}

function optionIsCorrect(index) {
    return sections[currentSection].options[index].correct;
}
