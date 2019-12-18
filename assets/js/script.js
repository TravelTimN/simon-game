document.addEventListener("DOMContentLoaded", function () {


    const powerButton = document.querySelector("#powerButton"); // power button
    const startButton = document.querySelector("#startButton"); // start button
    const startButtonLabel = document.querySelector(".startButton label"); // start button cursor
    const strictButton = document.querySelector("#checkbox-strict"); // strict button
    const strictButtonLabel = document.querySelector(".strict label"); // strict button cursor
    const levelCounter = document.querySelector("#levelCounter"); // level display
    const announce = document.querySelector("#announce"); // announce "faster" animation
    const greenButton = document.querySelector("#greenButton"); // green button
    const greenAudio = document.querySelector("#greenAudio"); // green audio file
    const redButton = document.querySelector("#redButton"); // red button
    const redAudio = document.querySelector("#redAudio"); // red audio file
    const yellowButton = document.querySelector("#yellowButton"); // yellow button
    const yellowAudio = document.querySelector("#yellowAudio"); // yellow audio file
    const blueButton = document.querySelector("#blueButton"); // blue button
    const blueAudio = document.querySelector("#blueAudio"); // blue audio file
    const loseAudio = document.querySelector("#loseAudio"); // lose audio file


    let isOn = false; // game begins powered off
    let isStrict = false; // game begins in normal mode
    let simonOrder = []; // random numbers (1-4)
    let colors = ["green", "red", "yellow", "blue"]; // array of colors
    let rounds = 31; // number of rounds to win
    let easy = 5; // levels 1-5 are 'easy'
    let easySpeed = 420; // levels 1-5 play at 0.42s
    let medium = 13; // levels 6-13 are 'medium' // levels 13-31 are 'hard'
    let mediumSpeed = 320; // levels 6-13 play at 0.32s
    let hardSpeed = 220; // levels 13+ play at 0.22s
    let level = 0; // level increases as you play
    let gameSpeed; // game speed
    let simonTurn; // Simon's turn to play
    let flash; // flash is number of times we've flashed a color
    let playerOrder = []; // player's order
    let isCorrect; // check if player is correct
    let hasWon; // has the player won?


    // initial load of page, buttons shouldn't be active until game is on
    disableStart();
    disableStrict();


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
        if (level <= easy) {
            // levels 1-5 play for 0.42 seconds
            setTimeout(disableColors, easySpeed - 50);
            setTimeout(disableSounds, easySpeed);
        } else if (level > easy && level <= medium) {
            // levels 6-13 play for 0.32 seconds
            setTimeout(disableColors, mediumSpeed - 50);
            setTimeout(disableSounds, mediumSpeed);
        } else {
            // levels 13+ play for 0.22 seconds
            setTimeout(disableColors, hardSpeed - 50);
            setTimeout(disableSounds, hardSpeed);
        }
    }


    // toggle strict button true/false
    strictButton.addEventListener("click", () => isStrict = strictButton.checked);


    // power the game on|off with appropriate functions
    powerButton.addEventListener("click", () => {
        if (powerButton.checked) {
            levelCounter.className = ""; // clear all classes
            levelCounter.classList.add("on"); // add class 'on'
            levelCounter.innerHTML = "ON";
            enableStart();
            enableStrict();
            isOn = true;
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
                clearInterval(gameSpeed);
                isOn = false;
            }, 500); // delay power-off - allow Simon to play last move
        }
    });


    // play the game if 'isOn' or 'hasWon'
    startButton.addEventListener("click", () => {
        if (isOn || hasWon) {
            enablePlay();
            if (!startButton.checked) startButton.checked = true; // only switch off if game is not active
        }
    });


    // the game play
    function enablePlay() {
        simonTurn = true; // Simon starts each round
        hasWon = false;
        simonOrder = [];
        orderColors = []; // temporary testing only in console
        playerOrder = [];
        flash = 0;
        isCorrect = true;
        level = 1;
        levelCounter.className = ""; // clear all classes
        levelCounter.innerHTML = "01";
        for (let i = 0; i < rounds; i++) {
            // push a random color into the 'simonOrder' array
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            simonOrder.push(randomColor);
        }
        console.log(simonOrder); // temporarily on to test higher levels ( DELETE LATER )
        gameSpeed = setInterval(gameTurn, 500) // start the game after 0.5s
    }


    // handle whose turn it is (Simon or user)
    function gameTurn() {
        isOn = false;
        disablePlayer();
        enableStart();
        levelCounter.className = ""; // clear all classes

        // user's turn to play
        if (flash == level) {
            isOn = true;
            simonTurn = false;
            enablePlayer();
            clearInterval(gameSpeed);
            disableColors();
        }

        // Simon's turn to play
        if (simonTurn) {
            disableStart();
            disableColors();
            colorAudio = "";
            colorButton = "";
            switch (simonOrder[flash]) {
                case "green":
                    colorAudio = greenAudio;
                    colorButton = greenButton
                    break;
                case "red":
                    colorAudio = redAudio;
                    colorButton = redButton;
                    break;
                case "yellow":
                    colorAudio = yellowAudio;
                    colorButton = yellowButton;
                    break;
                case "blue":
                    colorAudio = blueAudio;
                    colorButton = blueButton;
            }
            disableSounds();
            colorAudio.currentTime = 0;
            colorAudio.play();
            colorButton.classList.add("active");
            audioLength(colorAudio);
            flash++;
        }
    }


    // check if the user's round matches Simon's
    function check() {
        enableStart(); // option to restart the game

        // player made an error
        if (playerOrder[playerOrder.length - 1] !== simonOrder[playerOrder.length - 1]) {
            isCorrect = false;
        }

        // player finished all rounds - WINNER!
        if (playerOrder.length == rounds && isCorrect) {
            enableWin();
        }

        // player made an error
        if (!isCorrect) {
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
                if (isStrict) { // strict mode - don't repeat level
                    disablePlayer();
                    enableStart();
                    startButton.checked = false;
                } else { // normal mode - repeat mode at lower speed
                    simonTurn = true;
                    flash = 0;
                    playerOrder = [];
                    isCorrect = true;
                    gameSpeed = setInterval(gameTurn, 500); // repeat speed if lose
                }
            }, 1500);
        }

        // player was correct - advance to next round
        if (level == playerOrder.length && isCorrect && !hasWon) {
            setTimeout(() => {
                simonTurn = true; // wait 800ms between each turn
                levelCounter.innerHTML = (level <= 9) ? `0${level}` : level; // add 0 if single digit
            }, 800);
            disablePlayer();
            level++;
            playerOrder = [];
            flash = 0;

            // speed up the game the further you get
            if (level <= easy) {
                gameSpeed = setInterval(gameTurn, 500);
            } else if (level > easy && level <= medium) {
                gameSpeed = setInterval(gameTurn, 400);
            } else {
                gameSpeed = setInterval(gameTurn, 300);
            }

            // announce that the game is going faster after easy and medium completed
            switch (level) {
                case easy + 1:
                case medium + 1:
                    announce.classList.add("announce");
                    announce.innerHTML = "FASTER";
                    break;
                default:
                    announce.classList.remove("announce");
                    announce.innerHTML = "";
                    break;
            }
        }
    }


    // enable win functionality
    function enableWin() {
        announce.classList.add("announce");
        announce.innerHTML = "WINNER!";
        disableSounds();
        disablePlayer();
        levelCounter.innerHTML = "WIN";
        levelCounter.classList.add("win");
        isOn = false;
        hasWon = true;
        // to ensure code doesn't get copied without permission
        const _0xa633 = ["\x54\x68\x69\x73 \x63\x6f\x64\x65 \x6f\x72\x69\x67\x69\x6e\x61\x74\x65\x73 \x66\x72\x6f\x6d \x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f\x6d\x2f\x54\x72\x61\x76\x65\x6c\x54\x69\x6d\x4e\x2f\x73\x69\x6d\x6f\x6e\x2d\x67\x61\x6d\x65 \x61\x6e\x64 \x77\x61\x73 \x75\x73\x65\x64 \x77\x69\x74\x68\x6f\x75\x74 \x70\x65\x72\x6d\x69\x73\x73\x69\x6f\x6e\x2e", "\x6C\x6F\x67"];
        (function showWinMessage() {
            console[_0xa633[1]](_0xa633[0]);
        }());
        setTimeout(enableRazz, 1500); // allow delay for final color to pulse first
    }


    function enableRazz() {
        // razz: RYBG x5 followed by 0.8s lose buzzer
        let razz = setInterval(() => {
            redAudio.play(); // play red
            redButton.classList.add("active");
            setTimeout(() => {
                redAudio.pause();
                redAudio.currentTime = 0;
                redButton.classList.remove("active");
            }, 150); // stop after 0.15s
            setTimeout(() => {
                yellowAudio.play(); // play yellow
                yellowButton.classList.add("active");
                setTimeout(() => {
                    yellowAudio.pause();
                    yellowAudio.currentTime = 0;
                    yellowButton.classList.remove("active");
                }, 150); // stop after 0.15s
            }, 150); // delay yellow until after red plays (+0.15s)
            setTimeout(() => {
                blueAudio.play(); // play blue
                blueButton.classList.add("active");
                setTimeout(() => {
                    blueAudio.pause();
                    blueAudio.currentTime = 0;
                    blueButton.classList.remove("active");
                }, 150); // stop after 0.15s
            }, 300); // delay blue until after red and yellow play (+0.3s)
            setTimeout(() => {
                greenAudio.play(); // play green
                greenButton.classList.add("active");
                setTimeout(() => {
                    greenAudio.pause();
                    greenAudio.currentTime = 0;
                    greenButton.classList.remove("active");
                }, 150); // stop after 0.15s
            }, 450); // delay green until after red, yellow, and blue play (+0.45s)
        }, 600); // total 'razz' cycle takes 0.6s
        setTimeout(() => {
            clearInterval(razz); // stop the 'razz'
            setTimeout(() => {
                enableColors();
                loseAudio.currentTime = 0;
                loseAudio.play();
                setTimeout(() => {
                    loseAudio.pause();
                    loseAudio.currentTime = 0;
                    disableColors();
                    announce.classList.remove("announce");
                    announce.innerHTML = "";
                }, 800); // play lose buzzer for 0.8s
                startButton.checked = false; // turn start button off
                enableStart(); // allow the user to play again
            }, 700); // wait 0.7s after 'razz' to play lose buzzer
        }, 3000); // wait to stop 'razz' after 5x RGBA (0.6s * 5 = 3s)
    }


    // whether a keystroke is pushed or the button clicked
    function pushButton(e) {
        if (isOn) {
            let btnKey = "";
            if (e instanceof KeyboardEvent) {
                // keyboard event (typing 'R', 'G', 'B', 'Y')
                btnKey = e.keyCode;
            } else if (e instanceof MouseEvent) {
                // click event per button (parseInt to match KeyboardEvents)
                btnKey = parseInt(this.dataset.key);
            }
            switch (btnKey) {
                case 71: // green (G)
                    playerOrder.push("green");
                    break;
                case 82: // red (R)
                    playerOrder.push("red");
                    break;
                case 89: // yellow (Y)
                    playerOrder.push("yellow");
                    break;
                case 66: // blue (B)
                    playerOrder.push("blue");
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
            // add 'active' class
            colorButton.classList.add("active");
            // timeout to remove 'active' class
            if (!hasWon && isCorrect) {
                audio.play(); // play current audio element only if correct and not a win yet
                setTimeout(() => {
                    colorButton.classList.remove("active");
                }, 150);
            } else if (hasWon && isCorrect) {
                // play a winning pulse of the final color
                gameWin = setInterval(() => {
                    audio.play();
                    colorButton.classList.add("active");
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0;
                        colorButton.classList.remove("active");
                    }, 350);
                }, 100);
                // stop winning pulse and then play the winning razz music
                setTimeout(() => {
                    clearInterval(gameWin);
                }, 2000);
            }
        }
    }


});