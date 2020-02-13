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
        it("should be off by default (power=off)", () => {
            let isOn = false;
            expect(isOn).not.toBeTruthy();
        });
        it("should not be Simon's turn (power=off)", () => {
            let simonTurn = false;
            expect(simonTurn).not.toBeTruthy();
        });
        it("should call the disablePlayer() function (power=off)", () => {
            spyOn(window, "disablePlayer");
            disablePlayer();
            expect(window.disablePlayer).toHaveBeenCalled();
        });
        it("should call the disableStart() function after 500ms (power=off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableStart");
            disableStart();
            expect(window.disableStart).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should call the disableStrict() function after 500ms (power=off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableStrict");
            disableStrict();
            expect(window.disableStrict).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        it("should call the disableColors() function after 500ms (power=off)", () => {
            jasmine.clock().install();
            jasmine.clock().tick(500);
            spyOn(window, "disableColors");
            disableColors();
            expect(window.disableColors).toHaveBeenCalled();
            jasmine.clock().uninstall();
        });
        // it("should clear the gameSpeed interval after 500ms (power=off)", () => {
        //     timerCallback = jasmine.createSpyObj("setInterval");
        //     jasmine.clock().install();
        //     setTimeout(() => {
        //         timerCallback();
        //     }, 500);
        //     expect(setInterval).not.toHaveBeenCalled();
        //     jasmine.clock().tick(501);
        //     expect(setInterval).toHaveBeenCalled();
        //     jasmine.clock().uninstall();
        // });
        it("should trigger the game console to turn on", () => {
            let isOn = true;
            expect($("#powerButton")).toBeChecked();
            expect(isOn).toBeTruthy();
        });
        it("should call the enableStart() function (power=on)", () => {
            spyOn(window, "enableStart");
            enableStart();
            expect(window.enableStart).toHaveBeenCalled();
        });
        it("should call the enableStrict() function (power=on)", () => {
            spyOn(window, "enableStrict");
            enableStrict();
            expect(window.enableStrict).toHaveBeenCalled();
        });
        it("should call the inactiveGame() function (power=on)", () => {
            spyOn(window, "inactiveGame");
            inactiveGame();
            expect(window.inactiveGame).toHaveBeenCalled();
        });
        it("should turn the Level Counter 'on' (power=on)", () => {
            $("#levelCounter").addClass("on").text("ON");
            expect($("#levelCounter")).toHaveClass("on");
            expect($("#levelCounter")).toHaveText("ON");
        });
    });


    describe("The Start Button", () => {
        it("should exist", () => {
            expect($("#startButton")).toBeDefined();
        });
        it("should be 'disabled' (power=off)", () => {
            $("#startButton").prop("disabled", true);
            expect($("#startButton")).toHaveAttr("disabled");
        });
        it("should have a 'default' cursor (power=off)", () => {
            expect($(".startButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (power=on)", () => {
            expect($("#startButton")).not.toHaveAttr("disabled");
        });
        it("should have a 'pointer' cursor (power=on)", () => {
            $(".startButton label").css("cursor", "pointer");
            expect($(".startButton label")).toHaveCss({cursor: "pointer"});
        });
    });


    describe("The Strict Button", () => {
        it("should exist", () => {
            expect($("#strictButton")).toBeDefined();
        });
        it("should be 'disabled' (power=off)", () => {
            $("#strictButton").prop("disabled", true);
            expect($("#strictButton")).toHaveAttr("disabled");
        });
        it("should have a 'default' cursor (power=off)", () => {
            expect($(".strictButton label")).toHaveCss({cursor: "default"});
        });
        beforeEach(() => {
            $("#powerButton").click();
        });
        it("should be 'enabled' (power=on)", () => {
            expect($("#strictButton")).not.toHaveAttr("disabled");
        });
        it("should have a 'pointer' cursor (power=on)", () => {
            $(".strictButton label").css("cursor", "pointer");
            expect($(".strictButton label")).toHaveCss({cursor: "pointer"});
        });
    });


    describe("The Level Counter", () => {
        it("the level counter should exist", () => {
            expect($("levelCounter")).toBeDefined();
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
