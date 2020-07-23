function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    let value = document.getElementById("output-value")
    if (num == "") {
        value.innerText = num;
    } else {
        value.innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

function reverseFormatter(num) {
    return Number(num.replace(/,/g, ''));
}

let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function(e) {
        e.preventDefault();
        if (this.id == "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id == "backspace") {
            let output = reverseFormatter(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output)
            }
        } else {
            let output = getOutput();
            let history = getHistory();
            //TODO: change operator condtion....
            if (output != "") {
                output = reverseFormatter(output);
                history = history + output;
                if (this.id == "equal") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                } else if (this.id == "times") {
                    history = history + "*";
                    printHistory(history);
                    printOutput("");
                } else if (this.id == "divide") {
                    history = history + "/";
                    printHistory(history);
                    printOutput("");
                } else {
                    history = history + this.innerText;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    })
}

let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function(e) {
        e.preventDefault();
        let output = reverseFormatter(getOutput());
        if (output != NaN) {
            output = output + this.id;
            printOutput(output)
        }
    })
}