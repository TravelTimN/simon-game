document.addEventListener("DOMContentLoaded", function () {

    const levelCounter = document.querySelector("#levelCounter"); // level display
    const greenButton = document.querySelector("#greenButton"); // green button
    const redButton = document.querySelector("#redButton");
    const blueButton = document.querySelector("#blueButton");
    const yellowButton = document.querySelector("#yellowButton");
    const strictButton = document.querySelector("#checkbox-strict");
    const strictButtonLabel = document.querySelector(".strict label");
    const powerButton = document.querySelector("#power");
    const startButton = document.querySelector("#checkbox-start");
    const startButtonLabel = document.querySelector(".start label");
    const greenAudio = document.querySelector("#greenAudio");
    const redAudio = document.querySelector("#redAudio");
    const blueAudio = document.querySelector("#blueAudio");
    const yellowAudio = document.querySelector("#yellowAudio");
    const winAudio = document.querySelector("#winAudio");
    const loseAudio = document.querySelector("#loseAudio");

    let order = []; // random numbers (1-4)
    let playerOrder = []; // player's order
    let flash; // flash is number of times we've flashed a color
    let level; // what level is it?
    let correct; // check if any errors
    let simonTurn; // Simon's turn
    let intervalId; // game counter
    let strict = false; // is strict?
    let noise = true; // play noise
    let on = false; // is game on|off?
    let win; // has won?
    let orderColors = []; // temporary only for testing purposes ( REMOVE WHEN FINISHED )

    function disableStart() {
        startButton.setAttribute("disabled", "disabled");
        startButtonLabel.style.cursor = "default";
    }

    function enableStart() {
        startButton.removeAttribute("disabled");
        startButtonLabel.style.cursor = "pointer";
    }

    function disableStrict() {
        strictButton.setAttribute("disabled", "disabled");
        strictButtonLabel.style.cursor = "default";
    }

    function enableStrict() {
        strictButton.removeAttribute("disabled");
        strictButtonLabel.style.cursor = "pointer";
    }

    function disablePlayer() {
        window.removeEventListener("keydown", pushButton);
        greenButton.removeEventListener("click", pushButton);
        redButton.removeEventListener("click", pushButton);
        blueButton.removeEventListener("click", pushButton);
        yellowButton.removeEventListener("click", pushButton);
        greenButton.style.cursor = "default";
        redButton.style.cursor = "default";
        blueButton.style.cursor = "default";
        yellowButton.style.cursor = "default";
    }

    function enablePlayer() {
        window.addEventListener("keydown", pushButton);
        greenButton.addEventListener("click", pushButton);
        redButton.addEventListener("click", pushButton);
        blueButton.addEventListener("click", pushButton);
        yellowButton.addEventListener("click", pushButton);
        greenButton.style.cursor = "pointer";
        redButton.style.cursor = "pointer";
        blueButton.style.cursor = "pointer";
        yellowButton.style.cursor = "pointer";
    }

    // pause any existing audio elements
    function disableSounds() {
        // var sounds = document.getElementsByTagName("audio:not(#loseAudio):not(#winAudio)");
        // for (i = 0; i < sounds.length; i++) sounds[i].pause();
        // only the color buttons, as this causes errors with win/lose sounds
        greenAudio.pause();
        redAudio.pause();
        yellowAudio.pause();
        blueAudio.pause();
    }

    function disableColors() {
        greenButton.classList.remove("active");
        redButton.classList.remove("active");
        yellowButton.classList.remove("active");
        blueButton.classList.remove("active");
    }

    function enableColors() {
        greenButton.classList.add("active");
        redButton.classList.add("active");
        yellowButton.classList.add("active");
        blueButton.classList.add("active");
    }

    let audioLength = function (audio) {
        // shorten the audio time the further you play
        if (level <= 5) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 420);
        } else if (level >= 6 && level <= 13) {
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

    // initial load of page, buttons shouldn't be active until game is on
    disableStart();
    disableStrict();

    // toggle strict button true/false
    strictButton.addEventListener("click", () => strict = strictButton.checked);

    powerButton.addEventListener("click", () => {
        if (powerButton.checked) {
            on = true;
            levelCounter.className = ""; // clear all classes
            levelCounter.classList.add("on"); // add class 'on'
            levelCounter.innerHTML = "ON";
            enableStart();
            enableStrict();
        } else {
            on = false;
            startButton.checked = false;
            strictButton.checked = false;
            levelCounter.innerHTML = "";
            levelCounter.className = ""; // clear all classes
            disableStart();
            disableStrict();
            disableColors();
            disableSounds();
            clearInterval(intervalId);
        }
    });

    // play the game if 'on' or 'win'
    startButton.addEventListener("click", () => {
        if (on || win) {
            play();
            if (!startButton.checked) {
                startButton.checked = true; // only switch off if game is off
            }
        }
    });

    function play() {
        simonTurn = true; // Simon starts each round
        win = false;
        order = [];
        orderColors = [];
        playerOrder = [];
        flash = 0;
        intervalId = 0;
        correct = true;
        level = 1;
        levelCounter.className = ""; // clear all classes
        levelCounter.innerHTML = "01";
        for (let i = 0; i < 31; i++) {
            // push a random whole number (1-4) onto the 'order' array
            let randomNumber = Math.floor(Math.random() * 4) + 1;
            order.push(randomNumber);
            // temporarily assign each to a color for console testing
            if (randomNumber === 1) {
                orderColors.push("green");
            } else if (randomNumber === 2) {
                orderColors.push("red");
            } else if (randomNumber === 3) {
                orderColors.push("yellow");
            } else if (randomNumber === 4) {
                orderColors.push("blue");
            }
        }
        console.log(orderColors); // temporary on to test higher levels
        intervalId = setInterval(gameTurn, 800) // pause 0.8s between each round
    }

    function gameTurn() {
        on = false;
        disablePlayer();
        enableStart();
        levelCounter.className = ""; // clear all classes

        if (flash == level) {
            on = true;
            simonTurn = false;
            enablePlayer();
            clearInterval(intervalId);
            disableColors();
        }

        if (simonTurn) {
            disableStart();
            disableColors();
            setTimeout(() => {
                switch (order[flash]) {
                    case 1:
                        if (noise) {
                            disableSounds(); // pause all other sounds
                            greenAudio.currentTime = 0; // start sound from beginning
                            greenAudio.play(); // play the sound
                            audioLength(greenAudio); // specify playback length of audio
                        }
                        noise = true;
                        greenButton.classList.add("active");
                        break;
                    case 2:
                        if (noise) {
                            disableSounds(); // pause all other sounds
                            redAudio.currentTime = 0; // start sound from beginning
                            redAudio.play(); // play the sound
                            audioLength(redAudio); // specify playback length of audio
                        }
                        noise = true;
                        redButton.classList.add("active");
                        break;
                    case 3:
                        if (noise) {
                            disableSounds(); // pause all other sounds
                            yellowAudio.currentTime = 0; // start sound from beginning
                            yellowAudio.play(); // play the sound
                            audioLength(yellowAudio); // specify playback length of audio
                        }
                        noise = true;
                        yellowButton.classList.add("active");
                        break;
                    case 4:
                        if (noise) {
                            disableSounds(); // pause all other sounds
                            blueAudio.currentTime = 0; // start sound from beginning
                            blueAudio.play(); // play the sound
                            audioLength(blueAudio); // specify playback length of audio
                        }
                        noise = true;
                        blueButton.classList.add("active");
                        break;
                }
                flash++;
                // }, 800);
            }, 200);
        }
    }

    function check() {
        enableStart(); // option to restart the game
        if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
            correct = false;
        }

        if (playerOrder.length == 31 && correct) {
            enableWin();
        }

        if (correct == false) {
            disablePlayer();
            disableStart();
            disableSounds();
            loseAudio.currentTime = 0;
            loseAudio.play(); // play lose sound
            enableColors(); // flash all colors
            levelCounter.className = ""; // clear all classes
            levelCounter.classList.add("on"); // add class 'on'
            levelCounter.innerHTML = "NO";
            setTimeout(() => {
                disableColors();
                levelCounter.innerHTML = (level <= 9) ? `0${level}` : level; // add 0 if single digit
                levelCounter.className = ""; // clear all classes

                if (strict) {
                    disablePlayer();
                    enableStart();
                    startButton.checked = false;
                } else {
                    simonTurn = true;
                    flash = 0;
                    playerOrder = [];
                    correct = true;
                    intervalId = setInterval(gameTurn, 500); // repeat speed if lose
                }
            }, 1500);
            // noise = false; // commented-out due to first audio not playing on lose-repeat
        }

        if (level == playerOrder.length && correct && !win) {
            simonTurn = true;
            disablePlayer();
            level++;
            playerOrder = [];
            flash = 0;
            levelCounter.innerHTML = (level <= 9) ? `0${level}` : level; // add 0 if single digit

            // speed up the game the further you get
            if (level <= 5) {
                intervalId = setInterval(gameTurn, 500);
            } else if (level >= 6 && level <= 13) {
                intervalId = setInterval(gameTurn, 400);
            } else {
                intervalId = setInterval(gameTurn, 300);
            }
        }
    }

    function enableWin() {
        disableSounds();
        winAudio.currentTime = 0;
        winAudio.play(); // play power-on music
        enableColors();
        levelCounter.innerHTML = "WIN";
        levelCounter.classList.add("win");
        on = false;
        win = true;
        var _0xa633 = ["\x54\x68\x69\x73 \x63\x6f\x64\x65 \x6f\x72\x69\x67\x69\x6e\x61\x74\x65\x73 \x66\x72\x6f\x6d \x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x54\x72\x61\x76\x65\x6c\x54\x69\x6d\x4e\x2f\x73\x69\x6d\x6f\x6e\x2d\x67\x61\x6d\x65 \x61\x6e\x64 \x77\x61\x73 \x75\x73\x65\x64 \x77\x69\x74\x68\x6f\x75\x74 \x70\x65\x72\x6d\x69\x73\x73\x69\x6f\x6e\x2e", "\x6C\x6F\x67"];
        (function showWinMessage() {
            console[_0xa633[1]](_0xa633[0])
        }());
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
            const colorButton = document.querySelector(`.color-button[data-key="${btnKey}"]`);
            if (!audio) return;
            // reset audio to 0
            audio.currentTime = 0;
            disableSounds();
            // play current audio element
            if (correct != false && !win) {
                audio.play();
            }
            // add 'active' class
            colorButton.classList.add("active");
            // timeout to remove 'active' class
            if (!win) {
                setTimeout(() => {
                    colorButton.classList.remove("active");
                }, 100);
            }
        }
    }

});