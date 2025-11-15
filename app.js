document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greeting-form');
  const input = document.getElementById('first-name');
  const response = document.getElementById('response');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstName = input.value.trim();

    if (!firstName) {
      response.textContent = 'Bitte gib einen Namen ein.';
      return;
    }

    response.textContent = `Hallo ${firstName}!`;
    input.focus();
    input.select();
  });
});
