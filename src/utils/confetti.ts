import confetti from 'canvas-confetti';

export function fireLevelUpConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.2, x: 0.5 },
    zIndex: 9999
  });
}

export function fireAchievementConfetti() {
  confetti({
    particleCount: 50,
    spread: 50,
    origin: { y: 1, x: 0.5 },
    zIndex: 9999
  });
}

export function fireEasterEggConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      shapes: ['star'],
      zIndex: 9999
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      shapes: ['star'],
      zIndex: 9999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
