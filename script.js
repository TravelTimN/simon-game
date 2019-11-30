document.addEventListener("DOMContentLoaded", function () {

    const powerButton = document.querySelector("#powerButton"); // power button
    const startButton = document.querySelector("#startButton"); // start button
    const startButtonLabel = document.querySelector(".startButton label"); // start button cursor
    const strictButton = document.querySelector("#checkbox-strict"); // strict button
    const strictButtonLabel = document.querySelector(".strict label"); // strict button cursor
    const levelCounter = document.querySelector("#levelCounter"); // level display
    const greenButton = document.querySelector("#greenButton"); // green button
    const greenAudio = document.querySelector("#greenAudio"); // green audio file
    const redButton = document.querySelector("#redButton"); // red button
    const redAudio = document.querySelector("#redAudio"); // red audio file
    const yellowButton = document.querySelector("#yellowButton"); // yellow button
    const yellowAudio = document.querySelector("#yellowAudio"); // yellow audio file
    const blueButton = document.querySelector("#blueButton"); // blue button
    const blueAudio = document.querySelector("#blueAudio"); // blue audio file
    const winAudio = document.querySelector("#winAudio"); // win audio file
    const loseAudio = document.querySelector("#loseAudio"); // lose audio file

    let on = false; // is game on|off?
    let strict = false; // is strict mode?
    let order = []; // random numbers (1-4)
    let level; // what level is it?
    let intervalId; // game speed
    let simonTurn; // Simon's turn
    let noise = true; // play noise
    let flash; // flash is number of times we've flashed a color
    let playerOrder = []; // player's order
    let correct; // check if any errors
    let win; // has won?
    let orderColors = []; // temporary only for testing purposes ( REMOVE WHEN FINISHED )

    // disables the start button
    function disableStart() {
        startButton.setAttribute("disabled", "disabled");
        startButtonLabel.style.cursor = "default";
    }

    // enables the start button
    function enableStart() {
        startButton.removeAttribute("disabled");
        startButtonLabel.style.cursor = "pointer";
    }

    // disable the strict button
    function disableStrict() {
        strictButton.setAttribute("disabled", "disabled");
        strictButtonLabel.style.cursor = "default";
    }

    // enable the strict button
    function enableStrict() {
        strictButton.removeAttribute("disabled");
        strictButtonLabel.style.cursor = "pointer";
    }

    // disallow the player from making any moves
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

    // allow the user to make moves
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

    // pause the colored buttons' audio so another audio can play (no echoing)
    function disableSounds() {
        greenAudio.pause();
        redAudio.pause();
        yellowAudio.pause();
        blueAudio.pause();
    }

    // disable 'active' class for colored buttons flashing
    function disableColors() {
        greenButton.classList.remove("active");
        redButton.classList.remove("active");
        yellowButton.classList.remove("active");
        blueButton.classList.remove("active");
    }

    // enable 'active' class for colored buttons flashing
    function enableColors() {
        greenButton.classList.add("active");
        redButton.classList.add("active");
        yellowButton.classList.add("active");
        blueButton.classList.add("active");
    }

    // shorten the audio length the further you play (per original Simon game)
    let audioLength = function (audio) {
        if (level <= 5) {
            // levels 1-5 play for 0.42 seconds
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 420);
        } else if (level >= 6 && level <= 13) {
            // levels 6-13 play for 0.32 seconds
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
            }, 320);
        } else {
            // levels 13+ play for 0.22 seconds
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

    // power the game on|off with appropriate functions
    powerButton.addEventListener("click", () => {
        if (powerButton.checked) {
            levelCounter.className = ""; // clear all classes
            levelCounter.classList.add("on"); // add class 'on'
            levelCounter.innerHTML = "ON";
            enableStart();
            enableStrict();
            on = true;
        } else {
            simonTurn = false; // stop Simon if playing current round
            setTimeout(() => {
                startButton.checked = false;
                strictButton.checked = false;
                levelCounter.innerHTML = "";
                levelCounter.className = ""; // clear all classes
                disableStart();
                disableStrict();
                disableColors();
                disableSounds();
                clearInterval(intervalId);
                on = false;
            }, 500); // turn off after a second, allow Simon to play last move
        }
    });

    // play the game if 'on' or 'win'
    startButton.addEventListener("click", () => {
        if (on || win) {
            play();
            if (!startButton.checked) startButton.checked = true; // only switch off if game is off
        }
    });

    // the game play
    function play() {
        simonTurn = true; // Simon starts each round
        win = false;
        order = [];
        orderColors = []; // temporary testing only in console
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
            // temporarily assign each to a color for console testing higher rounds
            switch (randomNumber) {
                case 1:
                    orderColors.push("green");
                    break;
                case 2:
                    orderColors.push("red");
                    break;
                case 3:
                    orderColors.push("yellow");
                    break;
                case 4:
                    orderColors.push("blue");
                    break;
            }
        }
        console.log(orderColors); // temporary on to test higher levels
        intervalId = setInterval(gameTurn, 800) // pause 0.8s between each round // NOT WORKING?????
    }

    // handle whose turn it is (Simon or user)
    function gameTurn() {
        on = false;
        disablePlayer();
        enableStart();
        levelCounter.className = ""; // clear all classes

        // user's turn to play
        if (flash == level) {
            on = true;
            simonTurn = false;
            enablePlayer();
            clearInterval(intervalId);
            disableColors();
        }

        // Simon's turn to play
        if (simonTurn) {
            disableStart();
            disableColors();
            setTimeout(() => {
                colorAudio = "";
                colorButton = "";
                switch (order[flash]) {
                    case 1: // green
                        colorAudio = greenAudio;
                        colorButton = greenButton
                        break;
                    case 2: // red
                        colorAudio = redAudio;
                        colorButton = redButton;
                        break;
                    case 3: // yellow
                        colorAudio = yellowAudio;
                        colorButton = yellowButton;
                        break;
                    case 4: // blue
                        colorAudio = blueAudio;
                        colorButton = blueButton;
                }
                if (noise) {
                    disableSounds();
                    colorAudio.currentTime = 0;
                    colorAudio.play();
                    audioLength(colorAudio);
                }
                noise = true;
                colorButton.classList.add("active");
                flash++;
            }, 200); // was 800 but doesn't work (must be 200)
        }
    }

    // check if the user's round matches Simon's
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
        winAudio.play(); // play 'winner' music
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