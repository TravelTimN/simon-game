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
    let orderColors = [];

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
    const winAudio = document.querySelector("#winAudio");
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
            stopSounds();
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
        orderColors = [];
        playerOrder = [];
        flash = 0;
        intervalId = 0;
        turn = 1;
        turnCounter.innerHTML = "01";
        good = true;
        for (let i = 0; i < 31; i++) {
            // push a random whole number (1-4) onto the 'order' array
            let randNum = Math.floor(Math.random() * 4) + 1;
            order.push(randNum);
            // order.push(Math.floor(Math.random() * 4) + 1);
            if (randNum === 1) {
                orderColors.push("green");
            } else if (randNum === 2) {
                orderColors.push("red");
            } else if (randNum === 3) {
                orderColors.push("yellow");
            } else if (randNum === 4) {
                orderColors.push("blue");
            }
        }
        console.log(orderColors);
        compTurn = true; // computer starts
        intervalId = setInterval(gameTurn, 800) // pause 0.8s between each round
    }

    let audioLength = function (audio) {
        // shorten the audio time the further you play
        if (turn <= 5) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 420);
        } else if (turn >= 6 && turn <= 13) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 320);
        } else {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 220);
        }
    }

    function gameTurn() {
        on = false;
        green.style.cursor = "default";
        red.style.cursor = "default";
        blue.style.cursor = "default";
        yellow.style.cursor = "default";

        if (flash == turn) {

            window.addEventListener("keydown", pushButton);
            green.addEventListener("click", pushButton);
            red.addEventListener("click", pushButton);
            blue.addEventListener("click", pushButton);
            yellow.addEventListener("click", pushButton);

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
                switch (order[flash]) {
                    case 1:
                        if (noise) {
                            let audio = document.querySelector("#greenAudio");
                            stopSounds();
                            audio.currentTime = 0;
                            audio.play();
                            audioLength(audio);
                        }
                        noise = true;
                        green.classList.add("active");
                        break;
                    case 2:
                        if (noise) {
                            let audio = document.querySelector("#redAudio");
                            stopSounds();
                            audio.currentTime = 0;
                            audio.play();
                            audioLength(audio);
                        }
                        noise = true;
                        red.classList.add("active");
                        break;
                    case 3:
                        if (noise) {
                            let audio = document.querySelector("#yellowAudio");
                            stopSounds();
                            audio.currentTime = 0;
                            audio.play();
                            audioLength(audio);
                        }
                        noise = true;
                        yellow.classList.add("active");
                        break;
                    case 4:
                        if (noise) {
                            let audio = document.querySelector("#blueAudio");
                            stopSounds();
                            audio.currentTime = 0;
                            audio.play();
                            audioLength(audio);
                        }
                        noise = true;
                        blue.classList.add("active");
                        break;
                }
                flash++;
            }, 800); //
        }
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

    function check() {
        if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
            good = false;
        }

        if (playerOrder.length == 31 && good) {
            winGame();
        }

        if (good == false) {
            window.removeEventListener("keydown", pushButton);
            green.removeEventListener("click", pushButton);
            red.removeEventListener("click", pushButton);
            blue.removeEventListener("click", pushButton);
            yellow.removeEventListener("click", pushButton);
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
                    setTimeout(() => {
                        order
                        play();
                    }, 800);
                } else {
                    compTurn = true;
                    flash = 0;
                    playerOrder = [];
                    good = true;
                    intervalId = setInterval(gameTurn, 500);
                }
            }, 1500);
            // noise = false; // commented-out due to first audio not playing on lose-repeat
        }

        if (turn == playerOrder.length && good && !win) {
            window.removeEventListener("keydown", pushButton);
            green.removeEventListener("click", pushButton);
            red.removeEventListener("click", pushButton);
            blue.removeEventListener("click", pushButton);
            yellow.removeEventListener("click", pushButton);
            turn++;
            playerOrder = [];
            compTurn = true;
            flash = 0;
            if (turn <= 9) {
                turnCounter.innerHTML = `0${turn}`;
            } else {
                turnCounter.innerHTML = turn;
            }

            // speed up the game the further you get
            if (turn <= 5) {
                intervalId = setInterval(gameTurn, 500);
            } else if (turn >= 6 && turn <= 13) {
                intervalId = setInterval(gameTurn, 400);
            } else {
                intervalId = setInterval(gameTurn, 300);
            }
        }
    }

    function winGame() {
        stopSounds();
        winAudio.currentTime = 0;
        winAudio.play(); // play power-on music
        flashColor();
        turnCounter.innerHTML = "☺";
        on = false;
        win = true;
    }

    // pause any existing audio elements
    function stopSounds() {
        // var sounds = document.getElementsByTagName("audio:not(#loseAudio):not(#winAudio)");
        // for (i = 0; i < sounds.length; i++) sounds[i].pause();
        document.querySelector("#greenAudio").pause();
        document.querySelector("#redAudio").pause();
        document.querySelector("#yellowAudio").pause();
        document.querySelector("#blueAudio").pause();
    }

    function pushButton(e) {
        if (on) {
            let btnKey = "";
            if (e instanceof KeyboardEvent) {
                // keyboard event (typing 'R', 'G', 'B', 'Y')
                btnKey = e.keyCode;
            } else if (e instanceof MouseEvent) {
                // click event per button (parseInt to match KeyboardEvents)
                btnKey = parseInt(this.dataset.key);
            }
            switch (btnKey) {
                case 71:
                    playerOrder.push(1);
                    break;
                case 82:
                    playerOrder.push(2);
                    break;
                case 89:
                    playerOrder.push(3);
                    break;
                case 66:
                    playerOrder.push(4);
                    break;
            }
            check();
            // get dataset.key from audio element
            const audio = document.querySelector(`audio[data-key="${btnKey}"]`);
            // get dataset.key from div.btn element
            const btn = document.querySelector(`.btn[data-key="${btnKey}"]`);
            if (!audio) return;
            // reset audio to 0
            audio.currentTime = 0;
            stopSounds();
            // play current audio element
            if (good != false && !win) {
                audio.play();
            }
            // add 'active' class
            btn.classList.add("active");
            // timeout to remove 'active' class
            if (!win) {
                setTimeout(() => {
                    btn.classList.remove("active");
                }, 100);
            }
        }
    }

});