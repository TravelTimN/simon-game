document.addEventListener("DOMContentLoaded", function () {

    let order = []; // random numbers (1-4)
    let playerOrder = []; // player's order
    let flash; // flash is number of times we've flashed a color
    let turn; // whose turn is it?
    let good; // check if any errors
    let compTurn; // computer's turn
    let intervalId; // game counter
    let strict = false; // is strict?
    let noise = true; // play noise
    let on = false; // is game on|off?
    let win; // has won?

    const turnCounter = document.querySelector("#turn");
    const green = document.querySelector("#btn-green");
    const red = document.querySelector("#btn-red");
    const blue = document.querySelector("#btn-blue");
    const yellow = document.querySelector("#btn-yellow");
    const strictButton = document.querySelector("#checkbox-strict");
    const strictButtonLabel = document.querySelector(".strict label");
    const powerButton = document.querySelector("#power");
    const startButton = document.querySelector("#checkbox-start");
    const startButtonLabel = document.querySelector(".start label");
    const powerOnAudio = document.querySelector("#powerOnAudio");
    const loseAudio = document.querySelector("#loseAudio");

    startButton.setAttribute("disabled", "disabled");
    strictButton.setAttribute("disabled", "disabled");

    // toggle strict button true/false
    strictButton.addEventListener("click", () => strict = strictButton.checked);

    powerButton.addEventListener("click", () => {
        if (powerButton.checked) {
            startButtonLabel.style.cursor = "pointer";
            strictButtonLabel.style.cursor = "pointer";
            startButton.removeAttribute("disabled");
            strictButton.removeAttribute("disabled");
            on = true;
            turnCounter.innerHTML = "- -";
        } else {
            startButton.checked = false;
            strictButton.checked = false;
            startButtonLabel.style.cursor = "default";
            strictButtonLabel.style.cursor = "default";
            startButton.setAttribute("disabled", "disabled");
            strictButton.setAttribute("disabled", "disabled");
            on = false;
            turnCounter.innerHTML = "";
            clearColor();
            clearInterval(intervalId);
        }
    });

    // play the game if 'on' or 'win'
    startButton.addEventListener("click", () => {
        if (on || win) {
            play();
            startButtonLabel.style.cursor = "default";
            startButton.setAttribute("disabled", "disabled");
        }
    });

    function play() {
        win = false;
        order = [];
        playerOrder = [];
        flash = 0;
        intervalId = 0;
        turn = 1;
        turnCounter.innerHTML = "01";
        good = true;
        for (let i = 0; i < 31; i++) {
            // push a random whole number (1-4) onto the 'order' array
            order.push(Math.floor(Math.random() * 4) + 1);
        }
        compTurn = true; // computer starts
        intervalId= setInterval(gameTurn, 800) // pause 0.8s between each round
    }

    function gameTurn() {
        on = false;
        green.style.cursor = "default";
        red.style.cursor = "default";
        blue.style.cursor = "default";
        yellow.style.cursor = "default";

        if (flash == turn) {
            green.style.cursor = "pointer";
            red.style.cursor = "pointer";
            blue.style.cursor = "pointer";
            yellow.style.cursor = "pointer";
            clearInterval(intervalId);
            compTurn = false;
            clearColor();
            on = true;
        }

        if (compTurn) {
            clearColor();
            setTimeout(() => {
                if (order[flash] == 1) one();
                if (order[flash] == 2) two();
                if (order[flash] == 3) three();
                if (order[flash] == 4) four();
                flash++;
            }, 200);
        }
    }

    function one() {
        if (noise) {
            let audio = document.querySelector("#greenAudio");
            stopSounds();
            audio.currentTime = 0;
            audio.play();
        }
        noise = true;
        green.classList.add("active");
    }

    function two() {
        if (noise) {
            let audio = document.querySelector("#redAudio");
            stopSounds();
            audio.currentTime = 0;
            audio.play();
        }
        noise = true;
        red.classList.add("active");
    }

    function three() {
        if (noise) {
            let audio = document.querySelector("#yellowAudio");
            stopSounds();
            audio.currentTime = 0;
            audio.play();
        }
        noise = true;
        yellow.classList.add("active");
    }

    function four() {
        if (noise) {
            let audio = document.querySelector("#blueAudio");
            stopSounds();
            audio.currentTime = 0;
            audio.play();
        }
        noise = true;
        blue.classList.add("active");
    }

    function clearColor() {
        green.classList.remove("active");
        red.classList.remove("active");
        yellow.classList.remove("active");
        blue.classList.remove("active");
    }

    function flashColor() {
        green.classList.add("active");
        red.classList.add("active");
        yellow.classList.add("active");
        blue.classList.add("active");
    }

    green.addEventListener("click", () => {
        if (on) {
            playerOrder.push(1);
            check();
            one();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    });

    red.addEventListener("click", () => {
        if (on) {
            playerOrder.push(2);
            check();
            two();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    });

    yellow.addEventListener("click", () => {
        if (on) {
            playerOrder.push(3);
            check();
            three();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    });

    blue.addEventListener("click", () => {
        if (on) {
            playerOrder.push(4);
            check();
            four();
            if (!win) {
                setTimeout(() => {
                    clearColor();
                }, 300);
            }
        }
    });

    function check() {
        if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
            good = false;
        }

        if (playerOrder.length == 5 && good) {
            winGame();
        }

        if (good == false) {
            stopSounds();
            loseAudio.currentTime = 0;
            loseAudio.play(); // play lose sound
            flashColor();
            turnCounter.innerHTML = "☹";
            setTimeout(() => {
                if (turn <= 9) {
                    turnCounter.innerHTML = `0${turn}`;
                } else {
                    turnCounter.innerHTML = turn;
                }
                clearColor();

                if (strict) {
                    play();
                } else {
                    compTurn = true;
                    flash = 0;
                    playerOrder = [];
                    good = true;
                    intervalId = setInterval(gameTurn, 800);
                }
            }, 1500);

            noise = false;
        }

        if (turn == playerOrder.length && good && !win) {
            turn++;
            playerOrder = [];
            compTurn = true;
            flash = 0;
            if (turn <= 9) {
                turnCounter.innerHTML = `0${turn}`;
            } else {
                turnCounter.innerHTML = turn;
            }
            intervalId = setInterval(gameTurn, 800);
        }
    }

    function winGame() {
        stopSounds();
        powerOnAudio.currentTime = 0;
        powerOnAudio.play(); // play power-on music
        flashColor();
        turnCounter.innerHTML = "☺";
        on = false;
        win = true;
    }

    // pause any existing audio elements
    function stopSounds() {
        var sounds = document.getElementsByTagName("audio");
        for(i=0; i<sounds.length; i++) sounds[i].pause();
    }

    // power button (on|off)
    // powerButton.addEventListener("click", () => {
    //     on = !on;
    //     if (on) { // power is on
    //         stopSounds();
    //         powerOnAudio.currentTime = 0;
    //         powerOnAudio.play(); // play power-on music
    //         green.style.cursor = "pointer";
    //         red.style.cursor = "pointer";
    //         blue.style.cursor = "pointer";
    //         yellow.style.cursor = "pointer";
    //         window.addEventListener("keydown", pushButton); // enable keyCode press
    //         green.addEventListener("click", pushButton); // enable click green
    //         red.addEventListener("click", pushButton); // enable click red
    //         blue.addEventListener("click", pushButton); // enable click blue
    //         yellow.addEventListener("click", pushButton); // enable click yellow
    //     } else { // power is off
    //         stopSounds();
    //         loseAudio.currentTime = 0;
    //         loseAudio.play(); // play 42Hz 'lose' audio
    //         green.style.cursor = "default";
    //         red.style.cursor = "default";
    //         blue.style.cursor = "default";
    //         yellow.style.cursor = "default";
    //         window.removeEventListener("keydown", pushButton); // disable keyCode press
    //         green.removeEventListener("click", pushButton); // disable click green
    //         red.removeEventListener("click", pushButton); // disable click red
    //         blue.removeEventListener("click", pushButton); // disable click blue
    //         yellow.removeEventListener("click", pushButton); // disable click yellow
    //     }
    // });

    // function pushButton(e) {
    //     let btnKey = "";
    //     if (e instanceof KeyboardEvent) {
    //         // keyboard event (typing 'R', 'G', 'B', 'Y')
    //         btnKey = e.keyCode;
    //     } else if (e instanceof MouseEvent) {
    //         // click event per button
    //         btnKey = this.dataset.key;
    //     }
    //     // get dataset.key from audio element
    //     const audio = document.querySelector(`audio[data-key="${btnKey}"]`);
    //     // get dataset.key from div.btn element
    //     const btn = document.querySelector(`.btn[data-key="${btnKey}"]`);
    //     if (!audio) return;
    //     // reset audio to 0
    //     audio.currentTime = 0;
    //     stopSounds();
    //     // play current audio element
    //     audio.play();
    //     // if (turn <= 5) {
    //     //     setTimeout(() => {
    //     //         audio.pause();
    //     //         audio.currentTime = 0;
    //     //     }, 420);
    //     // } else if (turn <= 13 && turn >= 6) {
    //     //     setTimeout(() => {
    //     //         audio.pause();
    //     //         audio.currentTime = 0;
    //     //     }, 320);
    //     // } else if (turn > 13) {
    //     //     setTimeout(() => {
    //     //         audio.pause();
    //     //         audio.currentTime = 0;
    //     //     }, 220);
    //     // }
    //     // add 'active' class
    //     btn.classList.add("active");
    //     // timeout to remove 'active' class
    //     setTimeout(() => {
    //         btn.classList.remove("active");
    //     }, 100);
    // }

});