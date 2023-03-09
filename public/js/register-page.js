const userCheckbox = document.querySelector("input[name='user']");
const artistCheckbox = document.querySelector("input[name='artist']");

userCheckbox.addEventListener('click', (event) => {
  artistCheckbox.checked = false;
});

artistCheckbox.addEventListener('click', (event) => {
  userCheckbox.checked = false;
});
