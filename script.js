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
    const powerOnAudio = document.querySelector("#powerOnAudio");
    const loseAudio = document.querySelector("#loseAudio");

    function stopSounds() {
        // pause any existing audio elements
        var sounds = document.getElementsByTagName("audio");
        for(i=0; i<sounds.length; i++) sounds[i].pause();
    }

    powerButton.addEventListener("click", () => {
        on = !on;
        if (on) {
            stopSounds();
            powerOnAudio.currentTime = 0;
            powerOnAudio.play(); // play power-on music
            green.style.cursor = "pointer";
            red.style.cursor = "pointer";
            blue.style.cursor = "pointer";
            yellow.style.cursor = "pointer";
            window.addEventListener("keydown", pushButton); // enable keyCode press
            green.addEventListener("click", pushButton); // enable click green
            red.addEventListener("click", pushButton); // enable click red
            blue.addEventListener("click", pushButton); // enable click blue
            yellow.addEventListener("click", pushButton); // enable click yellow
        } else {
            stopSounds();
            loseAudio.currentTime = 0;
            loseAudio.play(); // play 47Hz 'lose' audio
            green.style.cursor = "default";
            red.style.cursor = "default";
            blue.style.cursor = "default";
            yellow.style.cursor = "default";
            window.removeEventListener("keydown", pushButton); // disable keyCode press
            green.removeEventListener("click", pushButton); // disable click green
            red.removeEventListener("click", pushButton); // disable click red
            blue.removeEventListener("click", pushButton); // disable click blue
            yellow.removeEventListener("click", pushButton); // disable click yellow
        }
    });

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
        stopSounds();
        // play current audio element
        audio.play();
        if (count <= 5) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 420);
        } else if (count <= 13 && count >= 6) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 320);
        } else if (count > 13) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 220);
        }
        // add 'active' class
        btn.classList.add("active");
        // timeout to remove 'active' class
        setTimeout(() => {
            btn.classList.remove("active");
        }, 100);
    }

});