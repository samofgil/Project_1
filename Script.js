/**
 * markSquare - Marks the square on the board if it has been hit (red) or missed (grey)
 *
 * @param  {Object} element description
 * @return {}         description
 */

function markSquare(element) {

    return () =>
    {
        if(started) {
            if (element.firstChild.className == 'hitit') {
                element.firstChild.className = 'missme';

            } else {
                element.firstChild.className = 'hitit';

            }
        }

    }

}

/**
 * destroy - description
 *
 * @param  {Object} element description
 * @return {type}         description
 */

function destroy(element) {
    return () => {
        element.removeChild(element.firstChild);
        circ = document.createElement('span');
        circ.className = 'circle';
        element.append(circ);

    }
}

/**
 * markShip - This function marks on the players board if a ship has been hit or not
 *
 * @param  {Object} square description
 * @return {}        description
 */

function markShip(square) {
    return () => {
        if(started) {
            if (square.classList.contains('taken') && square.firstChild.className != 'hitit') {
                square.firstChild.className = 'hitit';
                if(sinking(square)) {
                    alert('Ship of size ' + square.className.substr(-1) + ' has sunk!');
                }
                if(gameCheck()){
                    alert('Game over! All your ships have sunk!');
                    alert('You can click reset to try again.');
                }
            } else if(square.firstChild.className == 'hitit') {
                alert('Ship has already been hit at this location.');
            } else {
                square.firstChild.className = 'missme';
            }
        }

    }
}

/**
 * gameCheck - Checks if all the ships have been labeled as hit or not
 *
 * @return {boolean}  returns true if all players ships have been hit
 */

function gameCheck() {
    if(sinkCounter == num2) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * whichHit - description
 *
 * @param  {Object} elem description
 * @return {string}      returns the className of the object passed in
 */

function whichHit(elem) {
    return elem.className;
}

/**
 * sinking - Checks if a ship has sunk
 *
 * @param  {Object} elem description
 * @return {boolean}      returns true if all parts of a ship have been hit
 */

function sinking(elem) {
    let isSink = false;
    whichShip = whichHit(elem);
    loopNum = parseInt(whichShip.substr(-1));
    firstLoc = document.querySelector(whichShip);
    firstNum = parseInt(elem.dataset.start);
    let check = new Array(true, true, true, true, true);
    for(let i = 0; i < 5; i++) {
        if(i < loopNum) {
            check[i] = false;
        }
    }
    if(elem.classList.contains('horizontal')) {
        for(let i = 0; i < loopNum; i++) {
            check[i] = (pSquares[firstNum + i].firstChild.className == 'hitit');
        }
    } else {
        for (let i = 0; i < loopNum; i++) {
            check[i] = (pSquares[firstNum + 9*i].firstChild.className == 'hitit');

        }
    }
    isSink = check[0] && check[1] && check[2] && check[3] && check[4];
    if(isSink == true) {
        sinkCounter++;
    }
    return isSink;
}

/**
 * setShipNumber - description
 *
 * @param  {int} input1 the number of ships chosen by user
 * @param  {Object} elem   description
 * @return {type}        description
 */

function setShipNumber(input1, elem) {
    return () => {
        let num1 = parseInt(input1.value);
        num2 = num1;
        if (!isNaN(num1) && (num1 > 5 || num1 < 1)) {
            alert('There are only five ships! Try again.');
        }
        else if (!isNaN(num1) && selected == false) {
            shipchoosing(num1);
            breakdown(elem);
            selected = true;
            alert('You have chosen ' + num1 + ' ships.');
        } else if (selected == true) {
            alert('You already selected a number!');
            alert('Note: reset only works if ships have been placed');
        } else {
            alert('Please enter a valid value!');
        }
    }
}

/**
 * shipchoosing - description
 *
 * @param  {int} num1 description
 * @return {void}      description
 */

function shipchoosing(num1) {
    for (let i = 0; i < (5 - num1); i++) {
        base.removeChild(base.lastElementChild);
    }
}
