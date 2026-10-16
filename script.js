// Khushi's birthday scrapbook — beginner-friendly interactions.
document.addEventListener("DOMContentLoaded", () => {
  const screens = [...document.querySelectorAll(".screen")];
  const confettiLayer = document.getElementById("confettiLayer");
  const noBtn = document.getElementById("noBtn");
  const noMessage = document.getElementById("noMessage");
  const openGift = document.getElementById("openGift");
  const finalReveal = document.getElementById("finalReveal");
  const giftHint = document.getElementById("giftHint");
  const moreCompliments = document.getElementById("moreCompliments");
  const dramaticNote = document.getElementById("dramaticNote");
  const audio = document.getElementById("birthdayAudio");
  const audioNote = document.getElementById("audioNote");

  // Add a new screen ID here if you make another screen in index.html.
  function showScreen(id) {
    const target = document.getElementById(id);
    if (!target) return;
    screens.forEach(screen => {
      screen.classList.remove("active");
      screen.setAttribute("aria-hidden", "true");
    });
    target.classList.add("active");
    target.setAttribute("aria-hidden", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id === "reveal") makeConfetti(65);
    if (id === "final") {
      openGift.classList.remove("open");
      finalReveal.hidden = true;
      giftHint.hidden = false;
    }
  }

  // All buttons/links with data-go move to their matching screen.
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });

  // Playful NO button: keep it friendly and usable on touchscreens.
  let noCount = 0;
  const noMessages = [
    "No? Are you suuuure? 🥺",
    "Khushi, the surprise is getting shy now 😭",
    "One tiny YES for your bestie? ❤️",
    "Okay okay... but the YES button looks cute 👀"
  ];
  noBtn.addEventListener("click", () => {
    noCount += 1;
    noMessage.textContent = noMessages[(noCount - 1) % noMessages.length];
    noBtn.animate(
      [{ transform: "rotate(0deg)" }, { transform: "translateX(-7px) rotate(-5deg)" },
       { transform: "translateX(7px) rotate(5deg)" }, { transform: "translateX(0) rotate(0deg)" }],
      { duration: 330, easing: "ease-out" }
    );
  });

  // A small rotating collection of silly compliments.
  const compliments = [
    "You are officially TOO iconic to be a normal person. 😭❤️",
    "Your laugh deserves its own award. No debate. 🏆",
    "Certified bestie material. The committee has decided. 🧡",
    "Warning: being this lovable may cause excessive hugs. 🎀",
    "Khushi = 10/10 human, 100/10 chaos. Scientific fact. ✨"
  ];
  let complimentIndex = 0;
  moreCompliments.addEventListener("click", () => {
    complimentIndex = (complimentIndex + 1) % compliments.length;
    dramaticNote.textContent = compliments[complimentIndex];
    dramaticNote.animate(
      [{ opacity: .2, transform: "translateY(8px) rotate(-2deg)" },
       { opacity: 1, transform: "translateY(0) rotate(-1deg)" }],
      { duration: 350, easing: "ease-out" }
    );
  });

  // Gift box opening: animate the lid, reveal the message, and throw confetti.
  openGift.addEventListener("click", () => {
    if (openGift.classList.contains("open")) return;
    openGift.classList.add("open");
    giftHint.hidden = true;
    window.setTimeout(() => {
      finalReveal.hidden = false;
      makeConfetti(95);
    }, 520);
  });

  document.getElementById("restartBtn").addEventListener("click", () => {
    showScreen("welcome");
  });

  // Confetti uses simple CSS rectangles—no external library needed.
  function makeConfetti(amount = 55) {
    const colors = ["#df493b", "#f28b36", "#ffd36e", "#f7b6b0", "#ffeed1"];
    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.7}s`;
      piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
      piece.style.transform = `rotate(${Math.random() * 180}deg)`;
      confettiLayer.appendChild(piece);
      window.setTimeout(() => piece.remove(), 4300);
    }
  }

  // If the audio file hasn't been added, show a helpful note instead of an error.
  audio.addEventListener("error", () => {
    audioNote.textContent = "Add your own MP3 at audio/birthday-song.mp3 to make the player work.";
  });

  // Start with only the welcome screen visible.
  screens.forEach(screen => {
    screen.setAttribute("aria-hidden", screen.classList.contains("active") ? "false" : "true");
  });
});
