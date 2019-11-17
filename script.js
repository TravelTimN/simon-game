document.addEventListener("DOMContentLoaded", function () {

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
    const green = document.querySelector("#btn-green");
    const red = document.querySelector("#btn-red");
    const blue = document.querySelector("#btn-blue");
    const yellow = document.querySelector("#btn-yellow");
    const strictButton = document.querySelector("#strict");
    const powerButton = document.querySelector("#power");
    const startButton = document.querySelector("#start");

    function pushButton(e) {
        let btnKey = "";
        if (e instanceof KeyboardEvent) {
            btnKey = e.keyCode;
        } else if (e instanceof MouseEvent) {
            btnKey = this.dataset.key;
        }
        const audio = document.querySelector(`audio[data-key="${btnKey}"]`);
        const btn = document.querySelector(`.btn[data-key="${btnKey}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        btn.classList.add("active");
        setTimeout(function () {
            btn.classList.remove("active");
        }, 100);
    }
    window.addEventListener("keydown", pushButton);
    green.addEventListener("click", pushButton);
    red.addEventListener("click", pushButton);
    blue.addEventListener("click", pushButton);
    yellow.addEventListener("click", pushButton);

});