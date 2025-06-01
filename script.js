const characters = [
  { name: "Sylphina", rarity: 1, image: "assets/sylphina.png" },
  { name: "Pyroclast", rarity: 2, image: "assets/pyroclast.png" },
  { name: "Voltress", rarity: 3, image: "assets/voltress.png" },
  { name: "Chronor", rarity: 4, image: "assets/chronor.png" },
  { name: "Aetheron", rarity: 5, image: "assets/aetheron.png" }
];
const chances = [35, 25, 20, 15, 5];

const gachaBtn = document.getElementById("gacha-btn");
const resultPage = document.getElementById("result-page");
const mainPage = document.getElementById("main-page");
const resultChar = document.getElementById("result-character");
const resultName = document.getElementById("character-name");
const resultStars = document.getElementById("rarity-stars");
const backBtn = document.getElementById("back-btn");
const gachaAnim = document.getElementById("gacha-animation");

function getRandomCharacter() {
  let rand = Math.random() * 100;
  let total = 0;
  for (let i = 0; i < chances.length; i++) {
    total += chances[i];
    if (rand <= total) return characters[i];
  }
  return characters[0];
}

gachaBtn.onclick = () => {
  gachaAnim.classList.remove("hidden");
  setTimeout(() => {
    gachaAnim.classList.add("hidden");
    const result = getRandomCharacter();
    resultChar.src = result.image;
    resultName.textContent = result.name;
    resultStars.innerHTML = "★".repeat(result.rarity);
    resultPage.classList.remove("hidden");
    mainPage.classList.add("hidden");
    saveToCollection(result.name);
  }, 500);
};

backBtn.onclick = () => {
  resultPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
};

function saveToCollection(name) {
  let collection = JSON.parse(localStorage.getItem("collection") || "[]");
  if (!collection.includes(name)) {
    collection.push(name);
    localStorage.setItem("collection", JSON.stringify(collection));
  }
}
