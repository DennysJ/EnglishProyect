const story = {
  cover: {
    title: "The Selection",
    author: "Denise Jacobo García",
    choices: [
      { text: "Begin", next: "start" }
    ],
    isCover: true
  },

  start: {
    text: "The letter arrives at dawn. No one else seems to notice. Your name glows as if it had always been meant to be there.",
    image: "images/carta.jpg",
    choices: [
      { text: "Open the letter", next: "call" },
      { text: "Hide it", next: "hide" }
    ]
  },

  hide: {
    text: "You place it under the bed. The day goes on, but the air feels different. As if the world were waiting for your answer.",
    image: "",
    choices: [
      { text: "Take it out again", next: "call" },
      { text: "Burn it", next: "burn" }
    ]
  },

  burn: {
    text: "The paper turns into ash. Even so, the golden seal remains intact in your memory.",
    image: "images/fuego.jpg",
    choices: [
      { text: "Regret it", next: "call" },
      { text: "Choose a simple life", next: "simpleLife" }
    ]
  },

  call: {
    text: "You have been chosen for The Selection. The palace awaits you. The kingdom is already watching.",
    image: "images/corona.jpg",
    choices: [
      { text: "Accept the call", next: "departure" },
      { text: "Think of the one you love", next: "loveMemory" }
    ]
  },

  loveMemory: {
    text: "You think of someone who does not belong to the palace. Their voice promises no power, only truth.",
    image: "images/recuerdo.jpg",
    choices: [
      { text: "Go anyway", next: "departure" },
      { text: "Stay", next: "simpleLife" }
    ]
  },

  departure: {
    text: "The palace is immense. The other girls smile perfectly. Each one wants something.",
    image: "images/palacio.jpg",
    choices: [
      { text: "Learn the rules", next: "rules" },
      { text: "Observe silently", next: "observe" }
    ]
  },

  rules: {
    text: "You learn to walk straight, to smile little, to not say too much. Here, everything is measured.",
    image: "",
    choices: [
      { text: "Desire the crown", next: "ambition" },
      { text: "Feel out of place", next: "doubt" }
    ]
  },

  observe: {
    text: "You witness fragile alliances, long stares, silent promises. The game has already begun.",
    image: "",
    choices: [
      { text: "Play too", next: "ambition" },
      { text: "Resist", next: "doubt" }
    ]
  },

  ambition: {
    text: "You picture the crown upon your head. The weight does not scare you. What you might lose does.",
    image: "images/corona_sombra.jpg",
    choices: [
      { text: "Continue forward", next: "crownPath" },
      { text: "Remember who you were", next: "loveMemory" }
    ]
  },

  doubt: {
    text: "At night, the palace feels foreign. You wonder if you belong in this dream.",
    image: "images/noche.jpg",
    choices: [
      { text: "Escape", next: "freedom" },
      { text: "Stay one more day", next: "ambition" }
    ]
  },

  crownPath: {
    text: "You reach the end. The hall falls silent. The crown slowly descends.",
    image: "images/corona_final.jpg",
    choices: [
      { text: "Accept destiny", next: "queen" },
      { text: "Reject it", next: "freedom" }
    ]
  },

  queen: {
    text: "You are queen. Everyone sees you. No one knows you. The dream ends here.",
    image: "",
    choices: [
      { text: "Dream again", next: "cover" }
    ]
  },

  simpleLife: {
    text: "There is no palace. Only long days and quiet nights. Sometimes you think of what might have been.",
    image: "images/cielo.jpg",
    choices: [
      { text: "Dream again", next: "cover" }
    ]
  },

  freedom: {
    text: "You walk with no crown and no witnesses. Maybe that is the true choice.",
    image: "images/camino.jpg",
    choices: [
      { text: "Wake up", next: "cover" }
    ]
  }
};

let current = "cover";

function render() {
  const scene = story[current];
  const textEl = document.getElementById("text");

  // 👑 PORTADA
  if (scene.isCover) {
    textEl.innerHTML = `
      <span class="cover-title">${scene.title}</span>
      <span class="cover-author">${scene.author}</span>
    `;
    textEl.classList.add("portada");

    // 🔑 sincroniza con el fondo mágico
    if (typeof isCover !== "undefined") isCover = true;

  } else {
    // 📖 HISTORIA NORMAL
    textEl.innerText = scene.text;
    textEl.classList.remove("portada");

    if (typeof isCover !== "undefined") isCover = false;
  }

  const img = document.getElementById("sceneImage");
  if (scene.image) {
    img.src = scene.image;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scene.choices.forEach(choice => {
    const div = document.createElement("div");
    div.className = "choice";
    div.innerText = choice.text;
    div.onclick = () => {
      current = choice.next;
      render();
    };
    choicesDiv.appendChild(div);
  });
}

render();
