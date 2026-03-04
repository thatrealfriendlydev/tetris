(function() {
  const AUDIO_URL = "https://thatrealfriendlydev.github.io/tetris/EPIKPARTY.mp3";
  const CSS_URL = "https://thatrealfriendlydev.github.io/tetris/PARTY.css";

  // 1. Inject CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = CSS_URL;
  document.head.appendChild(link);

  // 2. Setup Audio
  const audio = new Audio(AUDIO_URL);
  audio.play();

  // 3. Find a random "star" element to start the party
  const allElements = document.querySelectorAll("img, div, span, p, h1, h2, button");
  const firstMover = allElements[Math.floor(Math.random() * allElements.length)];
  firstMover.classList.add("party-item");

  // 4. The Beat Drop (approx 15 seconds in)
  setTimeout(() => {
    // Add strobe light
    const strobe = document.createElement("div");
    strobe.className = "mw-strobe_light";
    document.body.appendChild(strobe);

    // Make everyone else dance
    allElements.forEach(el => {
      if (el !== firstMover) {
        el.classList.add("party-item");
      }
    });
  }, 15500); // Adjust this timing to match your mp3 drop!
})();