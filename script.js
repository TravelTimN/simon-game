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
            // keyboard event (typing 'R', 'G', 'B', 'Y')
            btnKey = e.keyCode;
        } else if (e instanceof MouseEvent) {
            // click event per button
            btnKey = this.dataset.key;
        }
        // get dataset.key from audio element
        const audio = document.querySelector(`audio[data-key="${btnKey}"]`);
        // get dataset.key from div.btn element
        const btn = document.querySelector(`.btn[data-key="${btnKey}"]`);
        if (!audio) return;
        // reset audio to 0
        audio.currentTime = 0;
        // pause any existing audio elements
        var sounds = document.getElementsByTagName("audio");
        for(i=0; i<sounds.length; i++) sounds[i].pause();
        // play current audio element
        audio.play();
        // add 'active' class
        btn.classList.add("active");
        // timeout to remove 'active' class
        setTimeout(function () {
            btn.classList.remove("active");
        }, 100);
    }
    window.addEventListener("keydown", pushButton); // keyCode
    green.addEventListener("click", pushButton); // click green
    red.addEventListener("click", pushButton); // click red
    blue.addEventListener("click", pushButton); // click blue
    yellow.addEventListener("click", pushButton); // click yellow

});