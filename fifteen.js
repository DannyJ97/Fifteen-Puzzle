/* this will record the game start time*/
var start = new Date();

/* this will record the current number of moves*/
var moves = 0;

// The div elements
var elements = [ "one", "two", "three", "four", 
                "five", "six", "seven", "eight",
            "nine", "ten", "eleven", "twelve",
        "thirteen", "fourteen", "fifteen", ""];

/*Since we need to shuffle the divs, copy the elements into 
the shuffled array*/
var shuffled = elements.slice();

/*Once shuffled, it's difficult to figure out which 
number is a digit*/
var elementsNum = {"one":1, "two":2, "three":3, "four":4,
                "five":5, "six":6, "seven":7, "eight":8,
                "nine":9, "ten":10, "eleven":11, "twelve":12,
         "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16};

/*once the person changes the background, the current 
background is stored here */
var currentbackground;

/* Maps the available movement. Looking at the elements array above,
you can see that at array 0, value one, if the empty block was
currently there, it can't move the top or left, but it can move
to the right and the bottom. top right bottom left
[o, 1, 1, 0]
*/

var movement = [
    [0, 1, 1, 0], //0: one can move right & down
    [0, 1, 1, 1], //1: two can move left, right, and down
    [0, 1, 1, 1], //2: three can move left, right, and down
    [0, 0, 1, 1], //3: four can move  left and down
    [1, 1, 1, 0], //4: five can move up, down, and right
    [1, 1, 1, 1], //5: six can move up, down, left, and right
    [1, 1, 1, 1], //6: seven can move up, down, left, and right
    [1, 0, 1, 1], //7: eight can move up, down, and left
    [1, 1, 1, 0], //8: nine can move up, down, and right
    [1, 1, 1, 1], //9: ten can move up, down, left, and right
    [1, 1, 1, 1], //10: eleven can move up, down, left, and right
    [1, 0, 1, 1], //11: twelve can move up, down, and left
    [1, 1, 0, 0], //12: thirteen can move up and right
    [1, 1, 0, 1], //13: fourteen can move up, left, and right
    [1, 1, 0, 1], //14: fifteen can move up, left, and right
    [1, 0, 0, 1]  //15: sixteen can move up and left
];

// The available backgrounds
var background = ["super-mario", "luigi", "bowser", "toad"];

/*
 * Starts the game
 * then shows a random image: one of the four characters from the background array
 * Sets all of the different div (100x100) blocks to have a class of title and the random background
*/

function startGame() {
    var background_id = Math.floor((Math.random() * 4));
    currentbackground = background[background_id];

    document.getElementById(background[background_id]).selected = true; 
    // Grab the selected option and mark it as selected

    for (var i = 0; i < elements.length - 1; i++) {
        document.getElementById(elements[i]).className = "tile " + background[background_id];
    }
}

/**
 * Once the user selects a new option from the drop-down menu, 
 * the image selected is populated
 * The background image of the main div and each of the block divs is replaced
 */
function switchBackground() {
    var className = document.getElementById("characters").value;

    if (background.indexOf(className) < 0) {
        return;
    }

    currentbackground = className;

    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < elements.length; i++) {
        if (elements[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } 
        else {
            var elements_name = elements[i];
            document.getElementById("main").innerHTML += '<div id="' + elements[i] + '" class="tile' + 
            " " + currentbackground + '">' + elementsNum[elements_name] + '</div>';
        }
    }
}
/**
 * Shuffles the board
 * Initializes the shuffle array to regular
 * Sets the empty block position
 * Loops through 500 times making sure the board is  shuffled
 * Generates a random number between 0 and 3: used for the movement array.
 * this corresponds to each block on the board
 * Checks to see if the movement that it selected for that particular 
 * block is set to 1, meaning that it can move,
 * otherwise it keeps trying a new random number.
 *  for example, if the empty block is in the sixteenth block 
 * (helps to look at the elements array), the only movement that it can
 *  do is to the top or to the left (for example, swap the position with it's neighbor). 
 * Which basically ensures that bloacks that shouln't be moving aren't.
 * Once the corrent movement is generated, the id of that movement is stored 
 * in idMovement. Looking at the movement
 * array, you'll notice that its indexes are mapped to top, right, bottom, 
 * left. If it needs to move to the top, you'll
 * need to subtract 4 from the current position.
 * Afterwards, the moved to and moved from are swapped in the shuffled array.
 * Finally, after all of the different possible shuffles, the 
 * displayBoard() function is called to display the board.
 */

function shuffleGame() {
    shuffled = elements.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    // Set a loop to go through 500 times
    for (var i = 0; i < 500; i++) {

        var idMovement = Math.floor((Math.random() * 4));

        while(movement[sixteen][idMovement] != 1) {
            idMovement = Math.floor((Math.random() * 4));
        }

        // The index id where the blank space will go to
        var moveTo;

        switch(idMovement) {
            case 0:
                moveTo = sixteen - 4;
                break;
                // subtract 4 to go to the top
            case 1:
                moveTo = sixteen + 1;
                break;
                // add 1 to go to the right
            case 2:
                moveTo = sixteen + 4;
                break;
                // subtract 4 to go to the bottom
            case 3:
                moveTo = sixteen - 1;
                break;
                // subtract 1 to go to the left
        }

        // swap sixteen and moveTo
        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[moveTo];
        shuffled[moveTo] = temp;

        sixteen = moveTo;
    }

    displayBoard();
}

/**
 * Clears the inner html of the file and cycles through the shuffled array 
 * displaying the div's within main in the correct order.
 */
function displayBoard() {
    document.getElementById("main").innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            document.getElementById("main").innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var idName = shuffled[i];
            document.getElementById("main").innerHTML += '<div id="' + shuffled[i] + '" class="tile' + 
            " " + currentbackground + '">' + elementsNum[idName] + '</div>';
        }
    }

    var idPortable;

    if (movement[shuffled.indexOf("")][0] == 1) {
        idPortable = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[idPortable]).className += " clickable";
        document.getElementById(shuffled[idPortable]).setAttribute("onclick", "swapPieces(" 
        + idPortable + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        idPortable = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[idPortable]).className += " clickable";
        document.getElementById(shuffled[idPortable]).setAttribute("onclick", "swapPieces(" 
        + idPortable + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        idPortable = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[idPortable]).className += " clickable";
        document.getElementById(shuffled[idPortable]).setAttribute("onclick", "swapPieces(" 
        + idPortable + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        idPortable = shuffled.indexOf("") -1;
        document.getElementById(shuffled[idPortable]).className += " clickable";
        document.getElementById(shuffled[idPortable]).setAttribute("onclick", "swapPieces(" 
        + idPortable + ", " + shuffled.indexOf("") + ")");
    }
}

/**
 * Swaps the pieces and increments the total number of moves a player has done
 * @param idPortable
 * @param idEmpty
 */
function swapPieces(idPortable, idEmpty) {
    animateMovement(idPortable, idEmpty);

    setTimeout(function() {
        var temp = shuffled[idEmpty];
        shuffled[idEmpty] = shuffled[idPortable];
        shuffled[idPortable] = temp;

        moves++;

        displayBoard();
        checkIfWon();
    }, 600);
}

/**
 * Animates the movement of the blocks
 * @param idPortable
 * @param idEmpty
 */
function animateMovement(idPortable, idEmpty) {
    if (idPortable - 4 == idEmpty) {
        console.log(shuffled[idPortable]);
        document.getElementById(shuffled[idPortable]).className += " animate-up";
    } else if (idPortable + 1 == idEmpty) {
        document.getElementById(shuffled[idPortable]).className += " animate-right";
    } else if (idPortable + 4 == idEmpty) {
        document.getElementById(shuffled[idPortable]).className += " animate-down";
    } else if (idPortable - 1 == idEmpty) {
        document.getElementById(shuffled[idPortable]).className += " animate-left";
    }
}

/**
 * Checks to see if the you won
 * Then converts the two arrays into strings and compares them
 * If the user won, the end date is subtracted from the start 
 * date and the milliseconds are converted to seconds
 * The winner is then shown the total number of time elapsed in seconds, 
 * a winning image and the number of moves used to complete the puzzle
 */
function checkIfWon() {
    if (elements.toString() == shuffled.toString()) { 
        // Test the image, time and number of turns by swapping == to !=
        var end        = new Date();
        var elapsedMS = end - start;
        var seconds    = Math.round(elapsedMS / 1000);
        
        var html = "You win!"

 /*       var html = "";
        html += "<img src='images/win.gif' alt='You win' />";
        html += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        html += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";
*/
        document.getElementById("win").innerHTML = html;
    }
}

/*Displaying a timer to allow users to see how long they are currently taking while playing the game*/

function startTimer(){
    let secs = 0;
    let min = 0;
    let hr = 0;
    
    /*display values*/
    let secs1 = 0;
    let min1 = 0;
    let hr1 = 0;
    
    
    function swatch(){
        secs++;
        
        /*logic that determines when to inc sec, min, hour*/
        
        if(secs>=60){
            secs = 0;
            min++;
        }
        
        if(min>=60){
            min = 0;
            hr++;
        }
        
        /*dealing with leading zeros*/
        if(secs < 10){
            secs1 = "0" + secs.toString();
        }
        else{
            secs1 = secs;
        }
        
        
        if(min < 10){
            min1 = "0" + min.toString();
        }
        else{
            min1 = min;
        }
        
        
        if(hr < 10){
            hr1 = "0" + hr.toString();
        }
        else{
            hr1 = hr;
        }
        
        /*updated time value display*/ document.getElementById("time-display").innerHTML = hr1 + ":" + min1 + ":" + secs1;
    }
    
       
        window.setInterval(swatch, 1000);
}


/*playing mario theme song*/
function playTheme(){
    var theme = document.getElementById('theme');
    
    theme.play();
}


