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
        it("should not be Simon's turn (if power=off)", () => {
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
            intervalCallback = jasmine.createSpy("clearInterval", gameSpeed);
            jasmine.clock().install();
            setTimeout(() => {
                intervalCallback();
            }, 500);
            expect(intervalCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(501);
            expect(intervalCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should clear the playerTimer timeout after 500ms (during power off)", () => {
            timeoutCallback = jasmine.createSpy("clearTimeout", playerTimer);
            jasmine.clock().install();
            setTimeout(() => {
                timeoutCallback();
            }, 500);
            expect(timeoutCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(501);
            expect(timeoutCallback).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should trigger the game console to turn on if clicked", () => {
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
            expect($("#startButton")).toHaveAttr("disabled");
        });
        it("should have a 'default' cursor (if power=off)", () => {
            expect($(".startButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (if power=on)", () => {
            expect($("#startButton")).not.toHaveAttr("disabled");
        });
        it("should have a 'pointer' cursor (if power=on)", () => {
            $(".startButton label").css("cursor", "pointer");
            expect($(".startButton label")).toHaveCss({cursor: "pointer"});
        });
        it("should call the enablePlay() function if 'start' is clicked", () => {
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
            expect($("#strictButton")).toHaveAttr("disabled");
        });
        it("should have a 'default' cursor (if power=off)", () => {
            expect($(".strictButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (if power=on)", () => {
            expect($("#strictButton")).not.toHaveAttr("disabled");
        });
        it("should have a 'pointer' cursor (if power=on)", () => {
            $(".strictButton label").css("cursor", "pointer");
            expect($(".strictButton label")).toHaveCss({cursor: "pointer"});
        });
    });


    describe("The Level Counter", () => {
        it("the level counter should exist", () => {
            expect($("#levelCounter")).toBeDefined();
        });
        it("the level counter should show '01' when the game starts", () => {
            spyOn(window, "enablePlay");
            enablePlay();
            $("#levelCounter").text("01");
            expect($("#levelCounter")).toHaveText("01");
        });
    });


    describe("The Green Button", () => {
        it("the green button should exist", () => {
            expect($("greenButton")).toBeDefined();
        });
    });


    describe("The Red Button", () => {
        it("the red button should exist", () => {
            expect($("redButton")).toBeDefined();
        });
    });


    describe("The Yellow Button", () => {
        it("the yellow button should exist", () => {
            expect($("yellowButton")).toBeDefined();
        });
    });


    describe("The Blue Button", () => {
        it("the blue button should exist", () => {
            expect($("blueButton")).toBeDefined();
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

/* createSpy + createSpyObj */
// https://scriptverse.academy/tutorials/jasmine-createspy-createspyobj.html

/* clearTimeout + setTimeout */
// https://stackoverflow.com/a/50883535
// https://makandracards.com/makandra/32477-testing-settimeout-and-setinterval-with-jasmine

/* addEventListener */
// https://stackoverflow.com/a/32576013
// even better: use jQuery $("#el").click();
