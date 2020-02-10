describe("Game Buttons", ()=> {

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
                        <input type="checkbox" name="powerButton" id="powerButton">
                        <span class="slider round"></span>
                        <span class="powerOff">OFF</span>
                        <span class="powerOn">ON</span>
                    </label>
                    <div class="checkbox-round startButton">
                        <input type="checkbox" id="startButton">
                        <label for="startButton"></label>
                    </div>
                    <div class="checkbox-round strict">
                        <input type="checkbox" id="checkboxStrict">
                        <label for="checkboxStrict"></label>
                    </div>
                    <div id="levelCounter"></div>
                    <div id="announce"></div>
                </div>
            </div>
        `)
    });

    describe("Power Button", ()=> {
        it("the power button should exist", ()=> {
            expect(powerOn).toBeDefined();
        });
        it("the power button be turned on once clicked", ()=> {
            $("#powerButton").click();
            expect($("#powerButton")).toBeChecked();
            // expect($("#levelCounter")).toHaveClass('"on"');
            // expect($("#levelCounter")).toHaveCss({fontSize: "2.5em"});
            // expect($("#levelCounter").text()).toEqual("ON");
            // expect($("#startButton").not.toHaveAttr("disabled"));
        });
    });

    describe("Start Button", ()=> {
        it("the start button should exist", ()=> {
            expect(enableStart).toBeDefined();
        });
    });

    describe("Strict Button", ()=> {
        it("the strict button should exist", ()=> {
            expect(enableStrict).toBeDefined();
        });
    });

    describe("Level Counter", ()=> {
        it("the level counter should exist", ()=> {
            expect(levelCounter).toBeDefined();
        });
        it("the level counter should have no class", ()=> {
            expect($("#levelCounter")).toHaveClass("");
        });
    });

    describe("Green Button", ()=> {
        it("the green button should exist", ()=> {
            expect(greenButton).toBeDefined();
        });
    });

    describe("Red Button", ()=> {
        it("the red button should exist", ()=> {
            expect(redButton).toBeDefined();
        });
    });

    describe("Yellow Button", ()=> {
        it("the yellow button should exist", ()=> {
            expect(yellowButton).toBeDefined();
        });
    });

    describe("Blue Button", ()=> {
        it("the blue button should exist", ()=> {
            expect(blueButton).toBeDefined();
        });
    });
});