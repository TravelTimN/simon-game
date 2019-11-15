document.addEventListener("DOMContentLoaded", function() {

    let order = [];
    let playerOrder = [];
    let flash;
    let turn;
    let good;
    let comptTurn;
    let intervalId;
    let strict = false;
    let noise = true;
    let on = false;
    let win;

    const turnCounter = document.querySelector("#turn");
    const yellow = document.querySelector("#btn-yellow");
    const blue = document.querySelector("#btn-blue");
    const green = document.querySelector("#btn-green");
    const red = document.querySelector("#btn-red");
    const yellowAudio = document.querySelector("#yellowAudio");
    const blueAudio = document.querySelector("#blueAudio");
    const greenAudio = document.querySelector("#greenAudio");
    const redAudio = document.querySelector("#redAudio");
    const strictButton = document.querySelector("#strict");
    const powerButton = document.querySelector("#power");
    const startButton = document.querySelector("#start");

    function yellowClick() {
        yellow.classList.add("active");
        yellowAudio.play();
        setTimeout(function() {
            yellow.classList.remove("active");
        }, 100);
    }
    yellow.addEventListener("click", yellowClick);

    function blueClick() {
        blue.classList.add("active");
        blueAudio.play();
        setTimeout(function() {
            blue.classList.remove("active");
        }, 100);
    }
    blue.addEventListener("click", blueClick);

    function greenClick() {
        green.classList.add("active");
        greenAudio.play();
        setTimeout(function() {
            green.classList.remove("active");
        }, 100);
    }
    green.addEventListener("click", greenClick);

    function redClick() {
        red.classList.add("active");
        redAudio.play();
        setTimeout(function() {
            red.classList.remove("active");
        }, 100);
    }
    red.addEventListener("click", redClick);

});