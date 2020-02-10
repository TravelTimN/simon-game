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

x.

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
    - METRICS:
        - There are **45** functions in this file.
        - Function with the largest signature take **1** arguments, while the median is **0**.
        - Largest function has **64** statements in it, while the median is **3**.
        - The most complex function has a cyclomatic complexity value of **11** while the median is **1**.
    - UNDEFINED VARIABLE:
        - `KeyboardEvent` (used for keyboard interaction)
- [Esprima](https://esprima.org/demo/validate.html)
    - Code is syntactically valid.

### Compatibility

Full details about compatibility tests can be found in my [testing folder](testing/?raw=true), which includes results from Chrome's DevTools Audit report as well.

To ensure a broad range of users can successfully use the site, I tested it across the 6 major browsers in both desktop and mobile configuration.

- **Chrome** (*v.79.0.3945.117*)
- **Edge** (*v.44.17763.831.0*)
- **Firefox** (*v.73.0beta*)
- **Safari** (*v.12.1.2*)
- **Opera** (*v.62.0.3331.99*)
- **Internet Explorer** (*v.11.885.17134.0*)

I have also created a testing matrix ([raw Excel file here](testing/testing-simon-matrix.xlsx?raw=true)).

**Testing Matrix**
![Testing Matrix](testing/testing-matrix.png "Testing Matrix")

**Chrome's DevTools Audit Report**

| Performance | Accessibility | Best Practices | SEO | PWA |
| :---: | :---: | :---: | :---: | :---: |
| 100% | 100% | 100% | 100% | - |

![Chrome DevTools Audit Report](testing/devtools-audit.png?raw=true "Chrome Audit Report")

### Known Issues

- x.

### Automated Testing

Jasmine Testing will go here eventually.

##### back to [top](#table-of-contents)

---

## Deployment

- x.

### Local Deployment

In order to run this project locally on your own system, you will need the following installed (as a bare minimum):

- [GIT](https://www.atlassian.com/git/tutorials/install-git) for cloning and version control.
- [Microsoft Visual Studio Code](https://code.visualstudio.com) (or any suitable IDE) to develop your project.

Next, there's a series of steps to take in order to proceed with local deployment:

- Clone this GitHub repository by either clicking the green "*Clone or download*" button above in order to download the project as a zip-file (remember to unzip it first), or by entering the following command into the Git CLI terminal:
    - `git clone https://github.com/TravelTimN/simon-game.git`

Congratulations! Your project should be completely setup and ready for local development! :tada:

### Remote Deployment

- x

Congratulations! Your project should be completely setup and ready for remote deployment! :tada:

##### back to [top](#table-of-contents)

---

## Credits

### Content

- [WaitingForFriday](https://www.waitingforfriday.com/?p=586) - Reverse Engineering a Simon Game.
- *"[How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)"* by Chris Beams *(as recommended by Code Institute assessors)*

### Media

- [Szynalski](https://www.szynalski.com/tone-generator/) - Online Tone Generator to create all sounds.
- [Techsini](https://techsini.com/multi-mockup/) - Mock-up Image for README.
- [TinyPNG](https://tinypng.com/) - Online Image Compressor.
- [Shields.io](https://shields.io) - Markdown badges for README.

### Code

- []() - x.

### Acknowledgements

- []() - x.

##### back to [top](#table-of-contents)
