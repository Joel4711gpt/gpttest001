document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greeting-form');
  const input = document.getElementById('first-name');
  const response = document.getElementById('response');
  const continueButton = document.getElementById('continue-button');
  const overlay = document.getElementById('bounce-overlay');
  const canvas = document.getElementById('bounce-canvas');
  const stopButton = document.getElementById('stop-button');

  const context = canvas.getContext('2d');
  const initialVelocity = { vx: 3.2, vy: 2.4 };
  const ball = {
    radius: 20,
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: initialVelocity.vx,
    vy: initialVelocity.vy,
  };
  let animationFrameId = null;

  const clearAnimation = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = '#ff1744';
    context.fill();
    context.shadowColor = 'rgba(0,0,0,0.4)';
    context.shadowBlur = 10;
    context.closePath();
  };

  const animate = () => {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0) {
      ball.vx *= -1;
      ball.x = Math.min(Math.max(ball.x, ball.radius), canvas.width - ball.radius);
    }

    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
      ball.vy *= -1;
      ball.y = Math.min(Math.max(ball.y, ball.radius), canvas.height - ball.radius);
    }

    draw();
    animationFrameId = requestAnimationFrame(animate);
  };

  const openOverlay = () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.vx = initialVelocity.vx;
    ball.vy = initialVelocity.vy;
    overlay.hidden = false;
    draw();
    clearAnimation();
    animationFrameId = requestAnimationFrame(animate);
    stopButton.focus();
  };

  const closeOverlay = () => {
    clearAnimation();
    overlay.hidden = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    continueButton.focus();
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = input.value.trim();

    if (!firstName) {
      response.textContent = 'Bitte gib einen Namen ein.';
      return;
    }

    response.textContent = `Hallo ${firstName}!`;
    continueButton.hidden = false;
    continueButton.focus();
  });

  continueButton.addEventListener('click', () => {
    openOverlay();
  });

  stopButton.addEventListener('click', () => {
    closeOverlay();
  });
});
