function getSeparator() {
    //Determine which seperator (- or _) to use for the dashify function.
    let separator = document.querySelector('input[name="separator"]:checked').value;
    return separator == "dash" ? "-" : "_";
}

function dashify(text, separator) { 
    //Format text as lower-case words joined by - or _, only alphanumeric characters permitted.
    let dashedText = text.toLowerCase().replace(/[^a-zA-Z0-9-_\s]/g, "").trim().replace(/\s+/g, separator);
    return dashedText;
}

function camelfy(text) {
    //Format text as camel-case, piggy-backing off of dashify.
    let words = dashify(text, "-").split("-");
    let cameledText = words[0];
    for(let i = 1; i < words.length; i++) {
        cameledText += words[i][0].toUpperCase() + words[i].slice(1);
    }
    return cameledText;
}

function reverse(text) {
    //Reverse text character by character.
    let reversed = "";
    for(let i = text.length - 1; i >= 0; i--) {
        reversed += text[i];
    }
    return reversed;
}

function rot13(text) {
    //Rotate each letter (A through Z) by 13, looping around the alphabet like a clock. Leave non-letter characters untouched.
    let rot13Text = "";
    for(let i = 0; i < text.length; i++) {
        if(/[^A-Za-z]/.test(text[i])) {
            rot13Text += text[i];
        }
        else {
            let charCode = text.codePointAt(i);
            if((charCode >= 65 && charCode <= 77) 
               || (charCode >= 97 && charCode <= 109)){
                rot13Text += String.fromCharCode(charCode + 13);
            }
            else {
                rot13Text += String.fromCharCode(charCode - 13);
            }
        }
    }
    return rot13Text;
}

function hash(text) {
    //Returns a simple 0-25 hash of all letters in the string.
    text = text.toLowerCase();
    let hashedText = 0;
    for(let i = 0; i < text.length; i++) {
        if(/[a-z]/.test(text[i])) {
            hashedText += text.codePointAt(i) - 96;
        }
    }
    return hashedText % 26;
}

//Grab all necessary DOM elements:
let input = document.getElementById("original-text"),
    dashifyButton = document.getElementById("dashify-button"),
    camelfyButton = document.getElementById("camelfy-button"),
    reverseButton = document.getElementById("reverse-button"),
    rotateButton = document.getElementById("rotate-button"),
    output = document.getElementById("output-text"),
    switchButton = document.getElementById("switch-button"),
    resetButton = document.getElementById("reset-button"),
    hashButton = document.getElementById("hash-button");

//Add the appropriate function to each button, getting the input at the time of the click.
dashifyButton.addEventListener("click", function(){
    let separator = getSeparator()
    output.value = dashify(input.value, separator);
});

camelfyButton.addEventListener("click", function(){
    output.value = camelfy(input.value);
});

reverseButton.addEventListener("click", function(){
    output.value = reverse(input.value);
});
       
rotateButton.addEventListener("click", function() {
    output.value = rot13(input.value);
});

hashButton.addEventListener("click", function() {
    output.value = hash(input.value);
})

//The switch button triggers an anonymous function that reverses the input and output.
switchButton.addEventListener("click", function() {
    let tempInput = input.value;
    input.value = output.value;
    output.value = tempInput;
});

//The reset button triggers an anonymous function that clears input and output.
resetButton.addEventListener("click", function(){
    input.value = "";
    output.value = "";
})