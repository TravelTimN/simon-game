![Simon Memory Game](assets/img/favicon.png?raw=true "Simon Memory Game")

# [Simon Memory Game](https://traveltimn.github.io/simon-game)

## Table of Contents
1. [**UX**](#ux)
    - [**User Stories**](#user-stories)
    - [**Design**](#design)
        - [**Framework**](#framework)
        - [**Color Scheme**](#color-scheme)
        - [**Icons**](#icons)
        - [**Typography**](#typography)
    - [**Wireframes**](#wireframes)

2. [**Features**](#features)
    - [**Existing Features**](#existing-features)
    - [**Features Left to Implement**](#features-left-to-implement)

3. [**Technologies Used**](#technologies-used)
    - [**Front-End Technologies**](#front-end-technologies)
    - [**Miscellaneous Technologies**](#miscellaneous-technologies)

4. [**Testing**](#testing)
    - [**Validators**](#validators)
    - [**Compatibility**](#compatibility)
    - [**Known Issues**](#known-issues)
    - [**Automated Testing**](#automated-testing)

5. [**Deployment**](#deployment)
    - [**Local Deployment**](#local-deployment)
    - [**Remote Deployment**](#remote-deployment)

6. [**Credits**](#credits)
    - [**Content**](#content)
    - [**Media**](#media)
    - [**Code**](#code)
    - [**Acknowledgements**](#acknowledgements)

---

## UX

This project is an example project for the **Interactive Front-End** module of the [Code Institute](https://codeinstitute.net/) Full Stack Software Development course. The objective for this milestone project is to "*build an interactive front-end site that should respond to users' actions, such as a data dashboard, a memory game, or use of an external API such as Google Maps*".

### User Stories

"**_As a user, I would like to_** _______________"

- read the instructions on how to play the game.
- test my logical memory skills by matching a progressively difficult level of a series of colorful buttons.
- play the game using either a mouse, the keyboard, or tapping with my finger on a touch screen.
- play the game with both visual and audio effects from the buttons and sounds.
- be notified when I've made a mistake from the sound of an error klaxon.
- continue playing if I've made a mistake, but repeat the previous level a bit slower.
- play the game in either standard mode, or strict mode (which ends the game immediately if I get one wrong answer).
- restart the game at any point during my turn.
- win the game after successfully matching 31 consecutive randomized colors.
- hear the winning razz once I've completed all 31 levels successfully.

### Design

A standard layout that is fully responsive on mobile devices and larger screens has been utilized. The constant use of responsive CSS sizing elements such as `vw`, `vh`, `%`, and `calc()` helps to ensure the site responds to the appropriate user device.

#### Framework

There was no need to utilize any particular frameworks or libraries for this project, such as the following:

- Bootstrap / Materialize
- CSS Grid / Flexbox
- jQuery

#### Color Scheme

- ![#008000](https://placehold.it/15/008000/008000) green button
- ![#FF0000](https://placehold.it/15/FF0000/FF0000) red button
- ![#FFFF00](https://placehold.it/15/FFFF00/FFFF00) yellow button
- ![#0000FF](https://placehold.it/15/0000FF/0000FF) blue button


All of these colors are set at `:root` level within my [style.css](assets/css/styles.css) file. This also allows me to reuse my colors as a `class` across the site, instead of having to assign the colors each and every time.

#### Icons

There was no need to utilize any particular set of icons, such as Font Awesome, for this project.

#### Typography

- 4 [Google Fonts](https://fonts.google.com/) were used across the site:
    - [Original Surfer](https://fonts.google.com/specimen/Original+Surfer) : main body text.
    - [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) : button letters (RGBY).
    - [Quantico](https://fonts.google.com/specimen/Quantico) : counter and announcements.
    - [Sarpanch](https://fonts.google.com/specimen/Sarpanch) : game logo text.

### Wireframes

I built mockup concept wireframes using [Balsamiq Wireframes](https://balsamiq.com/).
- Code Institute have provided all students with free access until the end of 2020.

My wireframes for this project can be found in the [**wireframes**](assets/wireframes/?raw=true) folder.

- [Wireframe](assets/wireframes/simon-wireframe.bmpr/?raw=true): original `Balsamiq.bmpr` file.
- [Wireframe](assets/wireframes/simon-wireframe.png/?raw=true): visual representation for GitHub.

![Wireframe](assets/wireframes/simon-wireframe.png/?raw=true)

##### back to [top](#table-of-contents)

---

## Features

In accordance to the project brief, I have successfully implemented all of the *required* features, as well as a few additional features to improve user experience!

### Existing Features

**JavaScript Memory Game**:
- Build a memory game using JavaScript to execute instructions to perform arithmetic, logic, controlling, and input/output operations to a user.

**Progressive Difficulty**:
- Players can progress through multiple levels if successfully matching Simon's moves each round. Levels get harder the further you manage to play.

**Strict Mode**:
- To truly test their memory matching skills, players can choose to play in Strict Mode, but one wrong move will immediately end the game!

**Restart Game**:
- At any point during their turn, player's can opt to restart the game for a new randomized series of colors.

**Player Timeout**:
- If the player doesn't make a move within 3 seconds, a klaxon will sound to signify an error. This 3 second timer resets after each move. The level will repeat again at a slower playback speed only if *Strict Mode* is not active.

**Automatic Console Shut-off**:
- If the player does not interact with the game console for a consecutive 45 seconds, the game console will automatically shut itself off. This 45 second timer does not apply when it is Simon's turn; this is to take in consideration when player's are at high levels and have made an error, Simon repeats the round at a slower speed, which nearly exhausts the entire 45 seconds of inactivity.

**Winning Razz**:
- If the player is successful enough to beat Simon's 31 levels, the traditional winning *'Razz'* will trigger. This is a combination of rapid pulses of the final color, mixed with a round of applause in order from Red, Yellow, Blue, Green on repeat, followed by the losing klaxon to signify the player has won the game!

### Features Left to Implement

**Leaderboard**:
- Ideally, I'd like to implement a leaderboard of session users that have completed all 31 levels successfully, which can be displayed to anybody else.

##### back to [top](#table-of-contents)

---

## Technologies Used

### Front-End Technologies

- ![HTML5](https://img.shields.io/static/v1?label=HTML&message=5&color=E34F26&logo=html5&logoColor=ffffff)
    - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used as the base for markup text.
- ![CSS3](https://img.shields.io/static/v1?label=CSS&message=3&color=1572B6&logo=css3&logoColor=ffffff)
    - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) - Used as the base for cascading styles.
- ![JavaScript](https://img.shields.io/static/v1?label=JavaScript&message=ES6&color=F7DF1E&logo=javascript&logoColor=ffffff)
    - [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Used as the base for game interaction.
- ![Jasmine](https://img.shields.io/static/v1?label=Jasmine&message=3.5.0&color=8A4182)
    - [Jasmine](https://jasmine.github.io/) - Used for Test-Driven Development (TDD).
- ![jasmine-jquery](https://img.shields.io/static/v1?label=jasmine-jquery&message=2.1.1&color=535B9F)
    - [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) - Used to simplify some of the Jasmine automated tests.

### Miscellaneous Technologies

- ![Visual Studio Code](https://img.shields.io/static/v1?label=VS%20Code&message=1.36.1&color=007ACC&logo=visual%20studio%20code&logoColor=ffffff)
    - [VS Code](https://code.visualstudio.com/) - Used as my primary IDE for developing projects.
- ![GitHub](https://img.shields.io/static/v1?label=GitHub&message=TravelTimN&color=181717&logo=github&logoColor=ffffff)
    - [GitHub](https://github.com/) - Used as remote storage of my projects online.
- ![Balsamiq Wireframes](https://img.shields.io/static/v1?label=Balsamiq&message=3.5.17&color=CC0200)
    - [Balsamiq](https://balsamiq.com/) - Used to bring my wireframes to life.

##### back to [top](#table-of-contents)

---

## Testing

A thorough mix of automated and manual testing have gone into building the project. In addition to tests, I have validated all files against online validation sites, and checked compatibilities across various modern browsers and devices.

### Validators

**HTML**
- [W3C HTML Validator](https://validator.w3.org)
    - Document checking completed. No errors or warnings to show.

**CSS**
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
    - The W3C Jigsaw validator does not yet recognize root variables, and therefore shows 110 **Parse** and **Value** **Errors**. These are used to set/use global CSS variables.
        - `:root`
        - `var(--foo)`
    - I also received 2 **Warnings**:
        - Imported style sheets are not checked in direct input and file upload modes.
        - `-webkit-tap-highlight-color` is an unknown vendor extension.

**JavaScript**
- [JShint](https://jshint.com/)
    - File: [script.js](assets/js/script.js?raw=true)
        - METRICS:
            - There are **44** functions in this file.
            - Function with the largest signature take **1** arguments, while the median is **0**.
            - Largest function has **21** statements in it, while the median is **3**.
            - The most complex function has a cyclomatic complexity value of **11** while the median is **1**.
        - UNDEFINED VARIABLE:
            - `KeyboardEvent`

    - File: [simon-tests.js](testing/automated/specs/simon-tests.js?raw=true)
        - METRICS:
            - There are **91** functions in this file.
            - Function with the largest signature take **0** arguments, while the median is **0**.
            - Largest function has **16** statements in it, while the median is **3**.
            - The most complex function has a cyclomatic complexity value of **2** while the median is **1**.
        - UNDEFINED VARIABLES:
            - `describe`
            - `beforeEach`
            - `it`
            - `expect`
            - `spyOn`
            - `jasmine`
            - `method`
            - `$`
- [Esprima](https://esprima.org/demo/validate.html)
    - Code is syntactically valid.

### Compatibility

Full details about compatibility tests can be found in my [testing folder](testing/?raw=true), which includes results from Chrome's DevTools Audit report as well.

To ensure a broad range of users can successfully use the site, I tested it across the 6 major browsers in both desktop and mobile configuration.

- **Chrome** (*v.80.0.3987.116*)
- **Firefox** (*v.74.0b5* - *Developer Edition*)
- **Edge** (*v.80.0.361.56*)
- **Safari** (*v.12.1.2*)
- **Opera** (*v.62.0.3331.99*)
- **Internet Explorer** (*v.11.885.17134.0*)

I have also created a testing matrix ([raw Excel file here](testing/manual/testing-simon-matrix.xlsx?raw=true)).

**Testing Matrix**

![Testing Matrix](testing/manual/testing-simon-matrix.png?raw=true "Testing Simon Matrix")

**Chrome's DevTools Audit Report**

| Performance | Accessibility | Best Practices | SEO | PWA |
| :---: | :---: | :---: | :---: | :---: |
| 100% | 100% | 100% | 100% | - |

![Chrome DevTools Audit Report](testing/manual/devtools-audit.png?raw=true "Chrome Audit Report")

### Known Issues

![GitHub closed issues](https://img.shields.io/github/issues-closed/traveltimn/simon-game)

While passing my code through the online validators, I encountered one questionable issue. I opened an *Issue* on GitHub so I could revisit this problem and resolve it later.

- [KeyboardEvent.keyCode depreciated](https://github.com/TravelTimN/simon-game/issues/1)
    - This was fixed and pushed with [commit a6eab2a](https://github.com/TravelTimN/simon-game/commit/a6eab2aae265c7248225227dfaaf15050112a751).

### Automated Testing

I used [Jasmine](https://jasmine.github.io/) to build all automated tests (test-driven development). These tests can be found in the [testing/automated](testing/automated/?raw=true) folder.

There are **59 tests** in my specs, all successfully passing, with **0 failures**.

![Jasmine Spec Results](testing/automated/jasmine-spec-results.png?raw=true "Jasmine Spec Results")

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Power Button</b></summary>

- should exist
- should be *'off'* by default
- should not trigger Simon's turn *(if power=off)*
- should trigger the **strictButton** to be *'false'* *(during power off)*
- should call the `disablePlayer()` function *(during power off)*
- should call the `disableStart()` function after 500ms *(during power off)*
- should call the `disableStrict()` function after 500ms *(during power off)*
- should call the `disableColors()` function after 500ms *(during power off)*
- should clear the **gameSpeed interval** after 500ms *(during power off)*
- should clear the **playerTimer timeout** after 500ms *(during power off)*
- should trigger the **game console** to turn *'on'* if clicked
- should call the `enableStart()` function *(during power on)*
- should call the `enableStrict()` function *(during power on)*
- should call the `inactiveGame()` function *(during power on)*
- should turn the **Level Counter** *'on'* *(during power on)*

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Start Button</b></summary>

- should exist
- should be *'disabled'* *(if power=off)*
- should have a **default** cursor *(if power=off)*
- should be *'enabled'* *(if power=on)*
- should have a **pointer** cursor *(if power=on)*
- should call the `enablePlay()` function if clicked

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Strict Button</b></summary>

- should exist
- should be *'disabled'* *(if power=off)*
- should have a **default** cursor *(if power=off)*
- should be *'enabled'* *(if power=on)*
- should have a **pointer** cursor *(if power=on)*
- should end the game if *'enabled'* and player is **incorrect**

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Level Counter</b></summary>

- should exist
- should show **ON** when the game is powered *'on'*
- should show **01** when the game *'starts'*
- should show **NO** if a player is *'incorrect'*
- should show **15** when a player reaches the *'fastest'* mode
- should show **WIN** if a player completes all *'31 levels'*

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Green Button</b></summary>

- should exist
- should not be *'enabled'* if the `disablePlayer()` function is called
- should call the `pushButton()` function if clicked during the `enablePlayer()` function
- should have class **active** if the `enableColors()` function is called
- should *not* have class **active** if the `disableColors()` function is called
- should play the **greenAudio** audio file if player **isCorrect**

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Red Button</b></summary>

- should exist
- should not be *'enabled'* if the `disablePlayer()` function is called
- should call the `pushButton()` function if clicked during the `enablePlayer()` function
- should have class **active** if the `enableColors()` function is called
- should *not* have class **active** if the `disableColors()` function is called
- should play the **redAudio** audio file if player **isCorrect**

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Yellow Button</b></summary>

- should exist
- should not be *'enabled'* if the `disablePlayer()` function is called
- should call the `pushButton()` function if clicked during the `enablePlayer()` function
- should have class **active** if the `enableColors()` function is called
- should *not* have class **active** if the `disableColors()` function is called
- should play the **yellowAudio** audio file if player **isCorrect**

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Blue Button</b></summary>

- should exist
- should not be *'enabled'* if the `disablePlayer()` function is called
- should call the `pushButton()` function if clicked during the `enablePlayer()` function
- should have class **active** if the `enableColors()` function is called
- should *not* have class **active** if the `disableColors()` function is called
- should play the **blueAudio** audio file if player **isCorrect**

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>'Lose' audio file</b></summary>

- should exist
- should play the **lose** audio file if player **is not correct**

</details>

##### back to [top](#table-of-contents)

---

## Deployment

My [simon-game repository](https://github.com/TravelTimN/simon-game/commit/a6eab2aae265c7248225227dfaaf15050112a751) was developed locally using **VS Code**, and all commits were pushed to **GitHub** using **Git**.

### Local Deployment

In order to run this project locally on your own system, you will need the following installed (as a bare minimum):

- [GIT](https://www.atlassian.com/git/tutorials/install-git) for cloning and version control.
- [Microsoft Visual Studio Code](https://code.visualstudio.com) (or any suitable IDE) to develop your project.

Next, there are a series of steps to take in order to proceed with local deployment:

- Clone this GitHub repository by either clicking the green "*Clone or download*" button above (this will download the project as a zip-file, *remember to unzip it first*), or by entering the following command into the Git CLI terminal:
    - `git clone https://github.com/TravelTimN/simon-game.git`
    - [Troubleshooting for **git cloning**](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

Congratulations! Your project should be completely setup and ready for local development! :tada:

### Remote Deployment

This site was deployed using [GitHub Pages](https://pages.github.com/) using the **master branch**.

Deployed Site:
- [https://traveltimn.github.io/simon-game](https://traveltimn.github.io/simon-game)

Once you have the project setup locally, you can proceed to deploy it remotely with the following steps:

1. Navigate to your GitHub repository:
    - `https://github.com/USERNAME/REPO`
2. Click on the **Settings** tab at the top:
    - `https://github.com/USERNAME/REPO/settings`
3. Scroll down on that page to the **GitHub Pages** section.
4. The first drop-down field should be **Source** with *None* preselected.
5. Select **master branch** from the list.
6. The page should refresh.
7. Scroll back down to the **GitHub Pages** section.
8. You should now have a deployed link:
    - `https://USERNAME.github.io/REPO`

**IMPORTANT NOTE**:
- Please allow a few minutes to pass before opening your newly deployed link! Clicking this link too quickly may result in a failure to build the site, causing an Error 404 page instead.

Congratulations! Your project should be deployed successfully on GitHub Pages! :tada:

##### back to [top](#table-of-contents)

---

## Credits

### Content

- [WaitingForFriday](https://www.waitingforfriday.com/?p=586) - Reverse Engineering a Simon Game. I wanted to keep the game as real to the original as possible.
- *"[How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)"* by Chris Beams *(as recommended by Code Institute assessors)*.

### Media

- [Szynalski](https://www.szynalski.com/tone-generator/) - Online Tone Generator to create all sounds.
- [Techsini](https://techsini.com/multi-mockup/) - Mock-up Image for README.
- [TinyPNG](https://tinypng.com/) - Online Image Compressor.
- [Shields.io](https://shields.io) - Markdown badges for README.

### Code

- [Jasmine Cheatsheet](https://devhints.io/jasmine) - A helpful Jasmine cheatsheet.
- [Jasmine 'setFixtures'](https://lostechies.com/derickbailey/2011/10/14/quick-hack-to-work-around-jasmine-jquery-fixture-limitations/) - How to use `setFixtures` in Jasmine.
- [Jasmine 'spyOn'](https://stackoverflow.com/a/9511646) - How to use `spyOn` in Jasmine.
- [Jasmine 'createSpy' + 'createSpyObj'](https://scriptverse.academy/tutorials/jasmine-createspy-createspyobj.html) - How to use `createSpy` and `createSpyObj` in Jasmine.
- [Jasmine 'timeouts' + 'intervals'](https://stackoverflow.com/a/50883535) - How to use `set`||`clear` + `Timeout`||`Interval` in Jasmine.
- [Jasmine 'timeouts' + 'intervals'](https://makandracards.com/makandra/32477-testing-settimeout-and-setinterval-with-jasmine) - How to use `set`||`clear` + `Timeout`||`Interval` in Jasmine.
- [Jasmine 'addEventListener'](https://stackoverflow.com/a/32576013) - How to use `addEventListener` in Jasmine.
- [Jasmine 'removeEventListener'](https://stackoverflow.com/questions/43489131/jasmine-test-removeeventlistener) - How to use `removeEventListener` in Jasmine.
- [Jasmine audio files](https://stackoverflow.com/questions/53900671/testing-htmlmediaelement-play-in-angular-7-jasmine-karma-chrome) - How to test 'audio files' in Jasmine.

### Acknowledgements

- [Chris Quinn](https://github.com/10xOXR) - My accountability partner on all projects.

##### back to [top](#table-of-contents)
