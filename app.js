let Character = class {
  constructor(
    id,
    type,
    alias,
    level,
    health,
    damage,
    resistance,
    agility,
    stress
  ) {
    this.id = id;
    this.type = type;
    this.alias = alias;
    this.level = level;
    this.health = health;
    this.damage = damage;
    this.resistance = resistance;
    this.agility = agility;
    this.stress = stress;
  }
};

const currentPlayers = [];
const currentEnemies = [];
let currentTurn;

currentPlayers[0] = new Character(
  10195,
  "player",
  "Jean-Bob",
  1,
  264,
  25,
  12,
  28,
  0
);
console.log(currentPlayers);

currentEnemies[0] = new Character(
  31982,
  "enemy",
  "Méchant",
  1,
  113,
  8,
  6,
  29,
  0
);
currentEnemies[1] = new Character(
  65840,
  "enemy",
  "Crétin",
  1,
  98,
  11,
  9,
  16,
  4
);

// // // //
// Display //
// // // //

// Characters

const displayCharacters = () => {
  currentPlayers.forEach((char) => {
    const charFigure = document.createElement("DIV");
    charFigure.classList.add("character");
    charFigure.setAttribute("id", char.id);
    charFigure.innerHTML = `
      <p class="charAlias"><span>${char.alias}</span></p>
      <p class="charLevel">LVL<span>${char.level}</span></p>
      <p class="charHealth">HP<span>${char.health}</span></p>
      <p class="charDamage">DMG<span>${char.damage}</span></p>
      <p class="charResistance">RES<span>${char.resistance}</span></p>
      <p class="charAgility">AGI<span>${char.agility}</span></p>
      <p class="charStress">STR<span>${char.stress}</span></p>
    `;
    areaFight.appendChild(charFigure);
  });

  currentEnemies.forEach((char) => {
    const charFigure = document.createElement("DIV");
    charFigure.classList.add("character");
    charFigure.setAttribute("id", char.id);
    charFigure.classList.add("enemy");
    charFigure.innerHTML = `
      <p class="charAlias"><span>${char.alias}</span></p>
      <p class="charLevel">LVL<span>${char.level}</span></p>
      <p class="charHealth">HP<span>${char.health}</span></p>
      <p class="charDamage">DMG<span>${char.damage}</span></p>
      <p class="charResistance">RES<span>${char.resistance}</span></p>
      <p class="charAgility">AGI<span>${char.agility}</span></p>
      <p class="charStress">STR<span>${char.stress}</span></p>
    `;
    areaFight.appendChild(charFigure);
  });
};

displayCharacters();

const startTurn = (char) => {
  currentTurn = char;
  document.getElementById(char.id).style.outline = "4px solid orange";

  console.log(char.type);
  if (char.type === "player") {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("enemy")) {
        let aimedChar = currentEnemies.find((char) => (char.id = e.target.id));
        console.log(aimedChar);
        let attackResult = calculateDamage(currentTurn, aimedChar);
        displayAttackResult(attackResult);
        if (attackResult !== "dodge") {
          updateHealth(aimedChar, attackResult[0]);
        }
      }
    });
  }
};

// startTurn(currentEnemies[0]);

// Calculate Damage
const calculateDamage = (from, to) => {
  let agilityScore = getRandom(0, 100);
  if (agilityScore < to.agility + from.stress) {
    console.log("ESQUIVE...");
    return "dodge";
  } else {
    let strengthScore;
    let isHitCritical = getRandom(0, 1);
    console.log("critical", isHitCritical);
    if (!isHitCritical) {
      strengthScore = from.damage + getRandom(0, 5);
    } else {
      strengthScore = from.damage + getRandom(12, 16);
    }

    let resistanceScore = to.resistance + getRandom(0, 2);
    let takenDamage = strengthScore - resistanceScore;

    return [takenDamage, isHitCritical];
  }
};

// Display Attack Result
const updateHealth = (aim, hitDamage) => {
  aim.health -= hitDamage;
  document.getElementById(aim.id).querySelector('.charHealth span').innerText = aim.health;
};

const displayAttackResult = (hitDamage) => {
  if (hitDamage === "dodge") {
    hit.innerText = "Attaque ésquivée...";
  } else {
    if (hitDamage[1]) {
      hit.innerText = `Dégats: ${hitDamage[0]} - CRITIQUE !`;
    } else {
      hit.innerText = `Dégats: ${hitDamage[0]}`;
    }
  }
};

// generate random integer
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
