const lengthSlider = document.querySelector(".password-length input");
const generateBtn = document.getElementById("generate-btn");
const options = document.querySelectorAll(".option input");
const inputPassword = document.querySelector(".password-input input");
const copyBtn = document.querySelector(".password-input .input-icons span");
const copyText = document.querySelector(
  ".password-input .input-icons .input-icon-copied"
);
const passStrengthDiv = document.querySelector(".strength-divs");
const strengthText = document.querySelector(".password-strength-text");

const character = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-?><';:}{[]|",
};

function generatePassword() {
  let staticPassword = "";
  let randomPassword = "";
  let passLength = lengthSlider.value;
  options.forEach((option) => {
    if (option.checked) {
      staticPassword += character[option.id];
    } else {
      return staticPassword;
    }
  });

  for (let i = 0; i < passLength; i++) {
    randomPassword =
      staticPassword === ""
        ? staticPassword
        : (randomPassword +=
            staticPassword[Math.floor(Math.random() * staticPassword.length)]);
  }
  inputPassword.value = randomPassword;
}

function updateSlider() {
  document.querySelector(".password-length span").innerHTML =
    lengthSlider.value;
  const value = +lengthSlider.value;
  const min = parseInt(lengthSlider.min);
  const max = parseInt(lengthSlider.max);
  const percent = `${((value - min) / (max - min)) * 100}%`;

  lengthSlider.style.background = `linear-gradient(90deg, var(--green-200) ${percent}, var(--grey-850) ${percent})`;
  generatePassword();
  updatePasswordStrength();
}
function updatePasswordStrength() {
  passStrengthDiv.id =
    lengthSlider.value <= 5
      ? "weak"
      : lengthSlider.value <= 10
      ? "medium"
      : "strong";

  if (passStrengthDiv.id === "weak") {
    strengthText.textContent = "weak";
  } else if (passStrengthDiv.id === "medium") {
    strengthText.textContent = "medium";
  } else {
    strengthText.textContent = "strong";
  }
}

function copyPassword() {
  navigator.clipboard.writeText(inputPassword.value);
  copyText.textContent = "Copied";

  setTimeout(() => {
    copyText.textContent = " ";
    inputPassword.value = "";
  }, 3000);
}

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
