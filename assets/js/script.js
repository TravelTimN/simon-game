/* jshint esversion: 8 */

const powerButton = document.querySelector("#powerButton"); // power button
const startButton = document.querySelector("#startButton"); // start button
const startButtonLabel = document.querySelector(".startButton label"); // start button cursor
const strictButton = document.querySelector("#strictButton"); // strict button
const strictButtonLabel = document.querySelector(".strictButton label"); // strict button cursor
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
const gameConsole = document.querySelector("#outer-circle"); // game console
const infoModal = document.querySelector("#info-modal"); // info-modal
const infoBtn = document.querySelector("#info"); // info button
const winModal = document.querySelector("#win-modal"); // win-modal
const loseModal = document.querySelector("#lose-modal"); // lose-modal
const modalCloseBtn = document.querySelectorAll(".modal-close"); // modal close button
const gameTime = document.querySelector("#gameTime"); // game length time span
const levelEnd = document.querySelector("#levelEnd"); // game level-end span


let isOn = false; // game begins powered off
let isStrict = false; // game begins in normal mode
let simonOrder = []; // random numbers (1-4)
let colors = ["green", "red", "yellow", "blue"]; // array of colors
let colorAudio; // matching color to audio
let colorButton; // which button is played
let rounds = 31; // number of rounds to win
let easy = 5; // levels 1-5 are 'easy'
let easySpeed = 420; // levels 1-5 play at 0.42s
let medium = 13; // levels 6-13 are 'medium' // levels 14-31 are 'hard'
let mediumSpeed = 320; // levels 6-13 play at 0.32s
let hardSpeed = 220; // levels 14+ play at 0.22s
let level = 0; // level increases as you play
let gameSpeed; // game speed
let gameTimer; // 45second inactive power off
let gameLength; // length of game
let seconds = 0; // game length in seconds
let minsCalc; // calculation of minutes
let secsCalc; // calculation of seconds
let simonTurn; // Simon's turn to play
let flash; // flash is number of times we've flashed a color
let playerOrder = []; // player's order
let playerTimer; // player gets 3 seconds to play
let isCorrect; // check if player is correct
let hasWon, youWin; // has the player won?


// enable Info Button
function enableInfo() {
    infoBtn.classList.add("add");
    infoBtn.classList.remove("remove");
    infoBtn.style.cursor = "pointer";
}


// disable Info Button
function disableInfo() {
    infoBtn.classList.add("remove");
    infoBtn.classList.remove("add");
    infoBtn.style.cursor = "default";
}


// show the Info Modal
infoBtn.addEventListener("click", showInfoModal);
function showInfoModal() {
    disableInfo();
    infoModal.classList.add("show");
    infoModal.classList.remove("remove");

    // pagination - previous buttons
    let prevBtns = document.querySelectorAll(".info-prev");
    prevBtns.forEach((prevBtn) => {
        prevBtn.addEventListener("click", (e) => {
            let parentId = e.target.parentNode.id.split("-");
            let prevDiv = parseInt(parentId[1]) - 1; // -1 page
            document.querySelector(`#${parentId[0]}-${parentId[1]}`).classList.add("remove");
            document.querySelector(`#${parentId[0]}-${prevDiv}`).classList.remove("remove");
        });
    });

    // pagination - next buttons
    let nextBtns = document.querySelectorAll(".info-next");
    nextBtns.forEach((nextBtn) => {
        nextBtn.addEventListener("click", (e) => {
            let parentId = e.target.parentNode.id.split("-");
            let nextDiv = parseInt(parentId[1]) + 1; // +1 page
            document.querySelector(`#${parentId[0]}-${parentId[1]}`).classList.add("remove");
            document.querySelector(`#${parentId[0]}-${nextDiv}`).classList.remove("remove");
        });
    });
}


// closing all of the modals
modalCloseBtn.forEach((modal) => {
    modal.addEventListener("click", closeModal);
});
function closeModal() {
    infoModal.classList.add("hide");
    winModal.classList.add("hide");
    loseModal.classList.add("hide");
    infoModal.classList.remove("show");
    winModal.classList.remove("show");
    loseModal.classList.remove("show");
    // reset all info-# divs to beginning of pagination
    let infoDivs = document.querySelectorAll(".modal-header div[id^='info-']");
    infoDivs.forEach((infoDiv) => {
        infoDiv.classList.add("remove");
    });
    // reset pagination back to first page
    setTimeout(() => {document.querySelector("#info-1").classList.remove("remove");}, 1000);
    // show the info '?' after a delay if the game is powered-off
    if (!powerButton.checked) {
        setTimeout(() => {enableInfo();}, 400);
    }
}


// initial load of page, buttons shouldn't be active until game is on
disableStart();
disableStrict();


// power the game on|off with appropriate functions
powerButton.addEventListener("click", () => {
    if (powerButton.checked) {
        powerOn();
    } else {
        powerOff();
    }
});


// power on the game console
function powerOn() {
    levelCounter.className = ""; // clear all classes
    levelCounter.classList.add("on"); // add class 'on'
    levelCounter.innerHTML = "ON";
    enableStart();
    enableStrict();
    isOn = true;
    inactiveGame();
    disableInfo();
    gameConsole.addEventListener("click", inactiveGame); // game console inactivity
    window.addEventListener("keydown", inactiveGame); // game console inactivity
}


// power off the game console
function powerOff() {
    clearInterval(gameLength);
    simonTurn = false; // stop Simon if playing current round
    disablePlayer();
    powerButton.disabled = true;
    setTimeout(() => {
        powerButton.checked = false;
        startButton.checked = false;
        strictButton.checked = false;
        levelCounter.innerHTML = "";
        levelCounter.className = ""; // clear all classes
        enableInfo();
        disableStart();
        disableStrict();
        disableColors();
        disableSounds();
        clearInterval(gameSpeed);
        isOn = false;
        isStrict = false;
        clearTimeout(playerTimer); // restart the player timer
    }, 500); // delay power-off - allow Simon to play last move
    setTimeout(() => {
        powerButton.disabled = false; // temporarily disable power button
    }, 1000);
}


// play the game if 'isOn' or 'hasWon'
startButton.addEventListener("click", () => {
    if (isOn || hasWon) {
        enablePlay();
        startTimer();
        if (!startButton.checked) startButton.checked = true; // only switch off if game is not active
    }
});


// game length timer
function startTimer() {
    seconds = 0;
    gameLength = setInterval(() => seconds++, 1000);
}


// player's get 5 seconds per move
function resetTimer() {
    clearTimeout(playerTimer);
    playerTimer = setTimeout(enableLose, 5000);
}


// turn the game off if no interaction within 45 seconds
function inactiveGame() {
    clearTimeout(gameTimer);
    gameTimer = setTimeout(powerOff, 45000);
}


// enable the start button
function enableStart() {
    startButton.removeAttribute("disabled");
    startButtonLabel.style.cursor = "pointer";
}


// disable the start button
function disableStart() {
    startButton.setAttribute("disabled", "disabled");
    startButtonLabel.style.cursor = "default";
}


// toggle strict button true/false
strictButton.addEventListener("click", () => isStrict = strictButton.checked);


// enable the strict button
function enableStrict() {
    strictButton.removeAttribute("disabled");
    strictButtonLabel.style.cursor = "pointer";
}


// disable the strict button
function disableStrict() {
    strictButton.setAttribute("disabled", "disabled");
    strictButtonLabel.style.cursor = "default";
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
    resetTimer(); // start the player timer
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


// pause the colored buttons' audio so another audio can play (no echoing)
function disableSounds() {
    greenAudio.pause();
    redAudio.pause();
    yellowAudio.pause();
    blueAudio.pause();
}


// shorten the audio length the further you play (per original Simon game)
function audioLength() {
    if (level <= easy) {
        // levels 1-5 play for 0.42 seconds
        setTimeout(disableColors, easySpeed - 50);
        setTimeout(disableSounds, easySpeed);
    } else if (level > easy && level <= medium) {
        // levels 6-13 play for 0.32 seconds
        setTimeout(disableColors, mediumSpeed - 50);
        setTimeout(disableSounds, mediumSpeed);
    } else {
        // levels 14+ play for 0.22 seconds
        setTimeout(disableColors, hardSpeed - 50);
        setTimeout(disableSounds, hardSpeed);
    }
}


// the game play
function enablePlay() {
    simonTurn = true; // Simon starts each round
    hasWon = false;
    simonOrder = [];
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
    // console.log(simonOrder); // demo for testing higher levels // disabled in production
    gameSpeed = setInterval(gameTurn, 500); // start the game after 0.5s
}


// handle whose turn it is (Simon or User)
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
        clearTimeout(playerTimer); // restart the player timer
        disableStart();
        disableColors();
        switch (simonOrder[flash]) {
            case "green":
                colorAudio = greenAudio;
                colorButton = greenButton;
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
        audioLength();
        flash++;
    }
}


// whether a keystroke is pushed, or the button clicked/tapped
function pushButton(e) {
    if (isOn && e.isTrusted) {
        let btnKey = "";
        let doCheck = false; // allows only click/tap/and keyboard GRYB
        if (e instanceof KeyboardEvent) {
            // keyboard event only for corresponding colors
            switch (e.code) {
                case "KeyG": // allows "G" or "g"
                    btnKey = "green";
                    doCheck = true;
                    break;
                case "KeyR": // allows "R" or "r"
                    btnKey = "red";
                    doCheck = true;
                    break;
                case "KeyY": // allows "Y" or "y"
                    btnKey = "yellow";
                    doCheck = true;
                    break;
                case "KeyB": // allows "B" or "b"
                    btnKey = "blue";
                    doCheck = true;
                    break;
            }
        } else if (e instanceof MouseEvent) {
            // click event per button color
            btnKey = this.dataset.color;
            doCheck = true;
        }
        if (doCheck) {
            playerOrder.push(btnKey); // push color onto playerOrder array
            check(); // check if user is correct
            // get dataset.color from audio element
            colorAudio = document.querySelector(`audio[data-color="${btnKey}"]`);
            // get dataset.color from div.btn element
            colorButton = document.querySelector(`.color-button[data-color="${btnKey}"]`);
            if (!colorAudio) return;
            colorAudio.currentTime = 0; // reset colorAudio to 0
            disableSounds();
            colorButton.classList.add("active"); // add 'active' class
            // timeout to remove 'active' class
            if (!hasWon && isCorrect) {
                colorAudio.play(); // play current audio element only if correct and not a win yet
                setTimeout(() => {
                    colorButton.classList.remove("active");
                }, 150);
            } else if (hasWon && isCorrect) {
                // play a winning pulse of the final color
                let gameWin = setInterval(() => {
                    colorAudio.play();
                    colorButton.classList.add("active");
                    setTimeout(() => {
                        colorAudio.pause();
                        colorAudio.currentTime = 0;
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
}


// check if the user's round matches Simon's
function check() {
    enableStart(); // option to restart the game
    clearTimeout(playerTimer); // restart the player timer

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
        enableLose(); // incorrect move by player
    } else if (isCorrect && !hasWon) {
        resetTimer(); // start the player timer if player hasn't won yet
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


// enable lose functionality
function enableLose() {
    disablePlayer();
    disableStart();
    disableSounds();
    loseAudio.currentTime = 0;
    loseAudio.play(); // play lose sound
    enableColors(); // flash all colors
    levelCounter.className = ""; // clear all classes
    levelCounter.classList.add("on"); // add class 'on'
    levelCounter.innerHTML = "NO";
    announce.classList.add("announce");
    announce.innerHTML = "NO";
    setTimeout(() => {
        disableColors();
        levelCounter.innerHTML = (level <= 9) ? `0${level}` : level; // add 0 if single digit
        levelCounter.className = ""; // clear all classes
        announce.classList.remove("announce");
        announce.innerHTML = "";
        if (isStrict) { // strict mode - don't repeat level
            clearInterval(gameLength);
            disablePlayer();
            enableStart();
            startButton.checked = false;
            // lose modal showing the level achieved
            loseModal.classList.add("show");
            loseModal.classList.remove("remove");
            levelEnd.innerHTML = (level <= 9) ? `Level 0${level}` : `Level ${level}`;
        } else { // normal mode - repeat mode at lower speed
            simonTurn = true;
            flash = 0;
            playerOrder = [];
            isCorrect = true;
            gameSpeed = setInterval(gameTurn, 500); // repeat speed if lose
        }
    }, 1500);
}


// enable win functionality
function enableWin() {
    clearInterval(gameLength); // stop the game length timer
    minsCalc = Math.floor(seconds / 60); // get total minutes from 'seconds'
    secsCalc = (seconds % 60 <= 9) ? `0${seconds % 60}` : seconds % 60; // get remaining 'seconds'
    disableSounds();
    disablePlayer();
    levelCounter.innerHTML = "WIN";
    levelCounter.classList.add("win");
    announce.classList.add("announce");
    announce.innerHTML = "WINNER!";
    isOn = false;
    hasWon = true;
    // youWin = showWinMessage() + enableRazz() for the winning Razz!!
    youWin = ["\x54\x68\x69\x73 \x63\x6f\x64\x65 " +
        "\x6f\x72\x69\x67\x69\x6e\x61\x74\x65\x73 \x66\x72\x6f\x6d " +
        "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62" +
        "\x2e\x63\x6f\x6d\x2f\x54\x72\x61\x76\x65\x6c\x54\x69\x6d" +
        "\x4e\x2f\x73\x69\x6d\x6f\x6e\x2d\x67\x61\x6d\x65 \x61\x6e\x64 " +
        "\x77\x61\x73 \x75\x73\x65\x64 \x77\x69\x74\x68\x6f\x75\x74 " +
        "\x70\x65\x72\x6d\x69\x73\x73\x69\x6f\x6e\x2e", "\x6C\x6F\x67"];
        // (function showWinMessage() { /*console[youWin[1]](youWin[0]);*/ }());
    setTimeout(enableRazz, 1500); // allow delay for final color to pulse first
}


// enable winning razz functionality
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
                // win modal showing gameLength calculated
                winModal.classList.add("show");
                winModal.classList.remove("remove");
                gameTime.innerHTML = `${minsCalc} m : ${secsCalc} s`;
            }, 800); // play lose buzzer for 0.8s
            startButton.checked = false; // turn start button off
            enableStart(); // allow the user to play again
        }, 700); // wait 0.7s after 'razz' to play lose buzzer
    }, 3000); // wait to stop 'razz' after 5x RGBA (0.6s * 5 = 3s)
}
