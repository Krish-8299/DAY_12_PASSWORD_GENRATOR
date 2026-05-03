const password = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const excludeSimilar = document.getElementById("excludeSimilar");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]<>?/|";

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrength();
});

function generatePassword() {
    let chars = "";
    let generatedPassword = "";

    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {
        alert("Please select at least one option!");
        return;
    }

    for (let i = 0; i < lengthSlider.value; i++) {
        generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    password.value = generatedPassword;
    updateStrength();
}

function updateStrength() {
    let score = 0;

    if (uppercase.checked) score++;
    if (lowercase.checked) score++;
    if (numbers.checked) score++;
    if (symbols.checked) score++;

    if (lengthSlider.value >= 12) score++;
    if (lengthSlider.value >= 18) score++;

    if (score <= 2) {
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ff1744";
        strengthText.textContent = "Weak";
    }
    else if (score <= 4) {
        strengthFill.style.width = "60%";
        strengthFill.style.background = "#ffea00";
        strengthText.textContent = "Medium";
    }
    else {
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#00e676";
        strengthText.textContent = "Strong";
    }
}

copyBtn.addEventListener("click", () => {
    if (!password.value) {
        alert("Generate password first!");
        return;
    }

    navigator.clipboard.writeText(password.value);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 2000);
});

generateBtn.addEventListener("click", generatePassword);

generatePassword();