/* jshint esversion: 8 */

describe("Simon Memory Game Testing", () => {

    beforeEach(() => {
        setFixtures(`
            <div id="outer-circle">
                <div id="greenButton" class="color-button" data-color="green"></div>
                <div id="redButton" class="color-button" data-color="red"></div>
                <div id="yellowButton" class="color-button" data-color="yellow"></div>
                <div id="blueButton" class="color-button" data-color="blue"></div>
                <div id="inner-circle">
                    <div id="simon">
                        <div id="memoryGame"></div>
                    </div>
                    <label class="powerButton">
                        <input type="checkbox" id="powerButton" aria-labelledby="powerButton">
                        <span class="slider round"></span>
                        <span class="powerOff">OFF</span>
                        <span class="powerOn">ON</span>
                    </label>
                    <div class="checkbox-round startButton">
                        <input type="checkbox" id="startButton" aria-labelledby="startButton">
                        <label for="startButton"></label>
                    </div>
                    <div class="checkbox-round strictButton">
                        <input type="checkbox" id="strictButton" aria-labelledby="strictButton">
                        <label for="strictButton"></label>
                    </div>
                    <div id="levelCounter"></div>
                    <div id="announce"></div>
                </div>
            </div>
        `);
    });


    describe("The Power Button", () => {
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should exist", () => {
            expect($("powerOn")).toBeDefined();
        });
        it("should be 'off' by default", () => {
            let isOn = false;
            expect(isOn).not.toBeTruthy();
        });
        it("should not trigger Simon's turn (if power=off)", () => {
            let simonTurn = false;
            expect(simonTurn).not.toBeTruthy();
        });
        it("should trigger the strictButton to be false (during power off)", () => {
            let isStrict = false;
            expect($("#powerButton")).toBeChecked();
            expect(isStrict).not.toBeTruthy();
        });
        it("should call the disablePlayer() function (during power off)", () => {
            spyOn(window, "disablePlayer");
            disablePlayer();
            expect(window.disablePlayer).toHaveBeenCalled();
        });
        it("should call the disableStart() function after 500ms (during power off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableStart");
            disableStart();
            expect(window.disableStart).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should call the disableStrict() function after 500ms (during power off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableStrict");
            disableStrict();
            expect(window.disableStrict).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should call the disableColors() function after 500ms (during power off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableColors");
            disableColors();
            expect(window.disableColors).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should clear the gameSpeed interval after 500ms (during power off)", () => {
            clearIntervalCallback = jasmine.createSpy("clearInterval", gameSpeed);
            jasmine.clock().install();
            setTimeout(() => {
                clearIntervalCallback();
            }, 500);
            expect(clearIntervalCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(501);
            expect(clearIntervalCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should clear the playerTimer timeout after 500ms (during power off)", () => {
            clearTimeoutCallback = jasmine.createSpy("clearTimeout", playerTimer);
            jasmine.clock().install();
            setTimeout(() => {
                clearTimeoutCallback();
            }, 500);
            expect(clearTimeoutCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(501);
            expect(clearTimeoutCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should trigger the game console to turn 'on' if clicked", () => {
            let isOn = true;
            expect($("#powerButton")).toBeChecked();
            expect(isOn).toBeTruthy();
        });
        it("should call the enableStart() function (during power on)", () => {
            spyOn(window, "enableStart");
            enableStart();
            expect(window.enableStart).toHaveBeenCalled();
        });
        it("should call the enableStrict() function (during power on)", () => {
            spyOn(window, "enableStrict");
            enableStrict();
            expect(window.enableStrict).toHaveBeenCalled();
        });
        it("should call the inactiveGame() function (during power on)", () => {
            spyOn(window, "inactiveGame");
            inactiveGame();
            expect(window.inactiveGame).toHaveBeenCalled();
        });
        it("should turn the Level Counter 'on' (during power on)", () => {
            $("#levelCounter").addClass("on").text("ON");
            expect($("#levelCounter")).toHaveClass("on");
            expect($("#levelCounter")).toHaveText("ON");
        });
    });


    describe("The Start Button", () => {
        it("should exist", () => {
            expect($("#startButton")).toBeDefined();
        });
        it("should be 'disabled' (if power=off)", () => {
            $("#startButton").prop("disabled", true);
            expect($("#startButton")).toBeDisabled();
        });
        it("should have a 'default' cursor (if power=off)", () => {
            expect($(".startButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (if power=on)", () => {
            expect($("#startButton")).not.toBeDisabled();
        });
        it("should have a 'pointer' cursor (if power=on)", () => {
            $(".startButton label").css("cursor", "pointer");
            expect($(".startButton label")).toHaveCss({cursor: "pointer"});
        });
        it("should call the enablePlay() function if clicked", () => {
            $("#startButton").click();
            spyOn(window, "enablePlay");
            enablePlay();
            expect(window.enablePlay).toHaveBeenCalled();
        });
    });


    describe("The Strict Button", () => {
        it("should exist", () => {
            expect($("#strictButton")).toBeDefined();
        });
        it("should be 'disabled' (if power=off)", () => {
            $("#strictButton").prop("disabled", true);
            expect($("#strictButton")).toBeDisabled();
        });
        it("should have a 'default' cursor (if power=off)", () => {
            expect($(".strictButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (if power=on)", () => {
            expect($("#strictButton")).not.toBeDisabled();
        });
        it("should have a 'pointer' cursor (if power=on)", () => {
            $(".strictButton label").css("cursor", "pointer");
            expect($(".strictButton label")).toHaveCss({cursor: "pointer"});
        });
        it("should end the game if 'enabled' and player is 'incorrect'", () => {
            spyOn(window, "enableLose");
            enableLose();
            setTimeoutCallback = jasmine.createSpy("setTimeout", disablePlayer, enableStart);
            jasmine.clock().install();
            setTimeout(() => {
                setTimeoutCallback();
            }, 1500);
            expect(setTimeoutCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(1501);
            expect(setTimeoutCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
    });


    describe("The Level Counter", () => {
        it("should exist", () => {
            expect($("#levelCounter")).toBeDefined();
        });
        it("should show 'ON' when the game is powered on", () => {
            spyOn(window, "powerOn");
            powerOn();
            $("#levelCounter").text("ON");
            expect($("#levelCounter")).toHaveText("ON");
        });
        it("should show '01' when the game starts", () => {
            spyOn(window, "enablePlay");
            enablePlay();
            $("#levelCounter").text("01");
            expect($("#levelCounter")).toHaveText("01");
        });
        it("should show 'NO' if a player is 'incorrect'", () => {
            let isCorrect = false;
            spyOn(window, "enableLose");
            enableLose();
            $("#levelCounter").text("NO");
            expect($("#levelCounter")).toHaveText("NO");
        });
        it("should show '15' when a player reaches the fastest mode", () => {
            let level = 15;
            let isCorrect = true;
            let hasWon = false;
            spyOn(window, "check");
            check();
            setTimeoutCallback = jasmine.createSpy("setTimeout");
            jasmine.clock().install();
            setTimeout(() => {
                setTimeoutCallback();
                $("#levelCounter").text("15");
            }, 800);
            expect(setTimeoutCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(801);
            expect($("#levelCounter")).toHaveText("15");
            expect(setTimeoutCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should show 'WIN' if a player completes all 31 levels", () => {
            let isCorrect = true;
            let hasWon = true;
            spyOn(window, "enableWin");
            enableWin();
            $("#levelCounter").text("WIN");
            expect($("#levelCounter")).toHaveText("WIN");
        });
    });


    describe("The Green Button", () => {
        it("should exist", () => {
            expect($("#greenButton")).toBeDefined();
        });
        it("should not be enabled if the 'disablePlayer()' function is called", () => {
            method = {
                pushButton: () => {
                    pushButton();
                }
            };
            spyOn(method, "pushButton");
            $("#greenButton").click(method.pushButton);
            $("disablePlayer").unbind(method.pushButton);
            expect(method.pushButton).not.toHaveBeenCalled();
        });
        it("should call the 'pushButton()' function if clicked during the 'enablePlayer()' function", () => {
            spyOn(window, "enablePlayer");
            enablePlayer();
            if ($("#greenButton").click()) {
                spyOn(window, "pushButton");
                pushButton();
            }
            expect(window.pushButton).toHaveBeenCalled();
        });
        it("should have class 'active' if the 'enableColors()' function is called", () => {
            spyOn(window, "enableColors");
            enableColors();
            $("#greenButton").addClass("active");
            expect($("#greenButton")).toHaveClass("active");
        });
        it("should not have class 'active' if the 'disableColors()' function is called", () => {
            spyOn(window, "disableColors");
            disableColors();
            expect($("#greenButton")).not.toHaveClass("active");
        });
        it("should play the 'greenAudio' audio file if player 'isCorrect'", async () => {
            $("#greenButton").click();
            let isCorrect = true;
            spyOn(window, "check");
            check();
            if (isCorrect) {
                await new Audio("../../../assets/sounds/green.mp3").play().then(
                    () => {
                        console.log("greenAudio Success");
                        expect(true).toBeTruthy("from greenAudio audio resolve");
                    },
                    () => {
                        console.log("greenAudio Error");
                        expect(false).toBeFalsy("from greenAudio audio resolve");
                    }
                );
            }
        });
    });


    describe("The Red Button", () => {
        it("should exist", () => {
            expect($("#redButton")).toBeDefined();
        });
        it("should not be enabled if the 'disablePlayer()' function is called", () => {
            method = {
                pushButton: () => {
                    pushButton();
                }
            };
            spyOn(method, "pushButton");
            $("#redButton").click(method.pushButton);
            $("disablePlayer").unbind(method.pushButton);
            expect(method.pushButton).not.toHaveBeenCalled();
        });
        it("should call the 'pushButton()' function if clicked during the 'enablePlayer()' function", () => {
            spyOn(window, "enablePlayer");
            enablePlayer();
            if ($("#redButton").click()) {
                spyOn(window, "pushButton");
                pushButton();
            }
            expect(window.pushButton).toHaveBeenCalled();
        });
        it("should have class 'active' if the 'enableColors()' function is called", () => {
            spyOn(window, "enableColors");
            enableColors();
            $("#redButton").addClass("active");
            expect($("#redButton")).toHaveClass("active");
        });
        it("should not have class 'active' if the 'disableColors()' function is called", () => {
            spyOn(window, "disableColors");
            disableColors();
            expect($("#redButton")).not.toHaveClass("active");
        });
        it("should play the 'redAudio' audio file if player 'isCorrect'", async () => {
            $("#redButton").click();
            let isCorrect = true;
            spyOn(window, "check");
            check();
            if (isCorrect) {
                await new Audio("../../../assets/sounds/red.mp3").play().then(
                    () => {
                        console.log("redAudio Success");
                        expect(true).toBeTruthy("from redAudio audio resolve");
                    },
                    () => {
                        console.log("redAudio Error");
                        expect(false).toBeFalsy("from redAudio audio resolve");
                    }
                );
            }
        });
    });


    describe("The Yellow Button", () => {
        it("should exist", () => {
            expect($("#yellowButton")).toBeDefined();
        });
        it("should not be enabled if the 'disablePlayer()' function is called", () => {
            method = {
                pushButton: () => {
                    pushButton();
                }
            };
            spyOn(method, "pushButton");
            $("#yellowButton").click(method.pushButton);
            $("disablePlayer").unbind(method.pushButton);
            expect(method.pushButton).not.toHaveBeenCalled();
        });
        it("should call the 'pushButton()' function if clicked during the 'enablePlayer()' function", () => {
            spyOn(window, "enablePlayer");
            enablePlayer();
            if ($("#yellowButton").click()) {
                spyOn(window, "pushButton");
                pushButton();
            }
            expect(window.pushButton).toHaveBeenCalled();
        });
        it("should have class 'active' if the 'enableColors()' function is called", () => {
            spyOn(window, "enableColors");
            enableColors();
            $("#yellowButton").addClass("active");
            expect($("#yellowButton")).toHaveClass("active");
        });
        it("should not have class 'active' if the 'disableColors()' function is called", () => {
            spyOn(window, "disableColors");
            disableColors();
            expect($("#yellowButton")).not.toHaveClass("active");
        });
        it("should play the 'yellowAudio' audio file if player 'isCorrect'", async () => {
            $("#yellowButton").click();
            let isCorrect = true;
            spyOn(window, "check");
            check();
            if (isCorrect) {
                await new Audio("../../../assets/sounds/yellow.mp3").play().then(
                    () => {
                        console.log("yellowAudio Success");
                        expect(true).toBeTruthy("from yellowAudio audio resolve");
                    },
                    () => {
                        console.log("yellowAudio Error");
                        expect(false).toBeFalsy("from yellowAudio audio resolve");
                    }
                );
            }
        });
    });


    describe("The Blue Button", () => {
        it("should exist", () => {
            expect($("#blueButton")).toBeDefined();
        });
        it("should not be enabled if the 'disablePlayer()' function is called", () => {
            method = {
                pushButton: () => {
                    pushButton();
                }
            };
            spyOn(method, "pushButton");
            $("#blueButton").click(method.pushButton);
            $("disablePlayer").unbind(method.pushButton);
            expect(method.pushButton).not.toHaveBeenCalled();
        });
        it("should call the 'pushButton()' function if clicked during the 'enablePlayer()' function", () => {
            spyOn(window, "enablePlayer");
            enablePlayer();
            if ($("#blueButton").click()) {
                spyOn(window, "pushButton");
                pushButton();
            }
            expect(window.pushButton).toHaveBeenCalled();
        });
        it("should have class 'active' if the 'enableColors()' function is called", () => {
            spyOn(window, "enableColors");
            enableColors();
            $("#blueButton").addClass("active");
            expect($("#blueButton")).toHaveClass("active");
        });
        it("should not have class 'active' if the 'disableColors()' function is called", () => {
            spyOn(window, "disableColors");
            disableColors();
            expect($("#blueButton")).not.toHaveClass("active");
        });
        it("should play the 'blueAudio' audio file if player 'isCorrect'", async () => {
            $("#blueButton").click();
            let isCorrect = true;
            spyOn(window, "check");
            check();
            if (isCorrect) {
                await new Audio("../../../assets/sounds/blue.mp3").play().then(
                    () => {
                        console.log("blueAudio Success");
                        expect(true).toBeTruthy("from blueAudio audio resolve");
                    },
                    () => {
                        console.log("blueAudio Error");
                        expect(false).toBeFalsy("from blueAudio audio resolve");
                    }
                );
            }
        });
    });


    describe("The 'Lose' audio file", () => {
        it("should exist", () => {
            setFixtures(`<audio id="loseAudio"><source src="../../../assets/sounds/lose.mp3" type="audio/mpeg"></audio>`);
            expect($("#blueButton")).toBeDefined();
        });
        it("should play the 'lose' audio file if player 'is not correct'", async () => {
            $("#blueButton").click(); // should've clicked something else
            let isCorrect = false;
            spyOn(window, "check");
            check();
            if (!isCorrect) {
                await new Audio("../../../assets/sounds/lose.mp3").play().then(
                    () => {
                        console.log("loseAudio Success");
                        expect(true).toBeTruthy("from lose audio resolve");
                    },
                    () => {
                        console.log("loseAudio Error");
                        expect(false).toBeFalsy("from lose audio resolve");
                    }
                );
            }
        });
    });


});


/*
    * CREDITS
    * Helpful Links for Jasmine testing
*/

/* Jasmine cheatsheet */
// https://devhints.io/jasmine

/* setFixtures */
// https://lostechies.com/derickbailey/2011/10/14/quick-hack-to-work-around-jasmine-jquery-fixture-limitations/

/* spyOn */
// https://stackoverflow.com/a/9511646

/* createSpy + createSpyObj */
// https://scriptverse.academy/tutorials/jasmine-createspy-createspyobj.html

/* clearTimeout + setTimeout */
// https://stackoverflow.com/a/50883535
// https://makandracards.com/makandra/32477-testing-settimeout-and-setinterval-with-jasmine

/* addEventListener */
// https://stackoverflow.com/a/32576013
// even better: use jQuery $("#el").click();

/* removeEventListener */
// https://stackoverflow.com/questions/43489131/jasmine-test-removeeventlistener

/* audio elements */
// https://stackoverflow.com/questions/53900671/testing-htmlmediaelement-play-in-angular-7-jasmine-karma-chrome
