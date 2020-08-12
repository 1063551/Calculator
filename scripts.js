var hiddenScore = NaN;
var botScore;
var topScore;

var clearBottom = true;

const clear = document.getElementsByClassName("button--clear")[0];
const back = document.getElementsByClassName("button--back")[0];
const div = document.getElementsByClassName("button--division")[0];
const mult = document.getElementsByClassName("button--multiplication")[0];
const nine = document.getElementsByClassName("button--9")[0];
const eight = document.getElementsByClassName("button--8")[0];
const seven = document.getElementsByClassName("button--7")[0];
const minus = document.getElementsByClassName("button--minus")[0];
const six = document.getElementsByClassName("button--6")[0];
const five = document.getElementsByClassName("button--5")[0];
const four = document.getElementsByClassName("button--4")[0];
const plus = document.getElementsByClassName("button--plus")[0];
const three = document.getElementsByClassName("button--3")[0];
const two = document.getElementsByClassName("button--2")[0];
const one = document.getElementsByClassName("button--1")[0];
const equal = document.getElementsByClassName("button--equal")[0];
const dot = document.getElementsByClassName("button--dot")[0];
const zero = document.getElementsByClassName("button--0")[0];

nine.addEventListener('click', () => {
    addToDisplay("9")
})

eight.addEventListener('click', () => {
    addToDisplay("8")
})

seven.addEventListener('click', () => {
    addToDisplay("7")
})

six.addEventListener('click', () => {
    addToDisplay("6")
})

five.addEventListener('click', () => {
    addToDisplay("5")
})

four.addEventListener('click', () => {
    addToDisplay("4")
})

three.addEventListener('click', () => {
    addToDisplay("3")
})

two.addEventListener('click', () => {
    addToDisplay("2")
})

one.addEventListener('click', () => {
    addToDisplay("1")
})

zero.addEventListener('click', () => {
    addToDisplay("0")
})

dot.addEventListener('click', () => {
    addToDisplay(".")
})

plus.addEventListener('click', () => {
    addToDisplayTop("+")
})

minus.addEventListener('click', () => {
    addToDisplayTop("-")
})

mult.addEventListener('click', () => {
    addToDisplayTop("×");
})

div.addEventListener('click', () => {
    addToDisplayTop("÷");
})

equal.addEventListener('click', () => {
    addToDisplayTop("=")
})

clear.addEventListener('click', () => {
    document.getElementById("displayTextBot").innerHTML = "0";
    document.getElementById("displayTextTop").innerHTML = "";
    document.getElementById("displayTextBot").style.fontSize = "50px";
    document.getElementById("displayTextBot").style.alignItems = "flex-end";
})

back.addEventListener('click', () => {
    if(document.getElementById("displayTextBot").innerHTML == "0") {
        return;
    }
    else if(document.getElementById("displayTextBot").innerHTML.length == 1) {
        document.getElementById("displayTextBot").innerHTML = "0";
    }
    else {
        var inner = document.getElementById("displayTextBot").innerHTML;
        inner = inner.substring(0, inner.length - 1);
        document.getElementById("displayTextBot").innerHTML = inner;
    }
})

function addToDisplayTop(operand) {
    // Display to top after an operator is pressed 
    let top = document.getElementById("displayTextTop").innerHTML;
    let bot = document.getElementById("displayTextBot").innerHTML;
    document.getElementById("displayTextTop").innerHTML = top + bot + " " + operand + " ";
    clearBottom = true;
    if(operand == "=") {
        var result = getOperators(top, bot);
        document.getElementById("displayTextBot").innerHTML = result;
    }
}

function addToDisplay(numb) {
    makeSizeSmaller();
    checkClear();
    if(document.getElementById("displayTextBot").innerHTML.length >= 18) {
        return;
    }
    else if(document.getElementById("displayTextBot").innerHTML == "0") {
        botScore = "";
        botScore += numb;
        document.getElementById("displayTextBot").innerHTML = numb
    }
    else {
        document.getElementById("displayTextBot").innerHTML += numb
    }

}

function makeSizeSmaller() {
    if(document.getElementById("displayTextBot").innerHTML.length >= 9) {
        document.getElementById("displayTextBot").style.fontSize = "24px";
        document.getElementById("displayTextBot").style.alignItems = "center";
        console.log("entro");
    }
}

function checkClear() {
    if(clearBottom == true) { document.getElementById("displayTextBot").innerHTML = 0; clearBottom = false;}
}

function getOperators(top, bot) {
    let op = top[top.length - 2];
    let a = "";
    for(let i = top.length - 5;  i < top.length ; i++) {
        if(top[i] == " ") { break; }
        a += top[i];
    }
    let b = bot;
    hiddenScore = operate(op, parseInt(a), parseInt(b));
    return hiddenScore;
}

const operatorFunctions = {
    "+" : function(a, b) {
        return a + b;
    },
    "-" : function(a, b) {
        return a - b;
    },
    '×' : function(a, b) {
        return a * b;
    },
    "÷" : function(a, b) {
        return a / b;
    }
};

function operate(operand, a, b) {
    if(operand === "÷" && b === 0) {
        return "Cannot divide by zero";
    }
    return operatorFunctions[operand](a, b);
}