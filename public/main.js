'use strict';

const sections = [
  ['login', 'Окно регистрации'],
  ['profile', 'Мой профиль'],
  ['about', 'Об игре'],
];

const application = document.querySelector('#application');
const nav = document.getElementById('navigation');

for (let section of sections) {
  const button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.setAttribute('data-section', section[0]);
  button.value = section[1];
  nav.appendChild(button);
}

const liveSectionsCollection = application.getElementsByTagName('section');

nav.addEventListener('click', function (event) {
  const sectionId = event.target.getAttribute('data-section');

  const liveSectionsArray = Array.from(liveSectionsCollection);

  liveSectionsArray.forEach(function (sectionElement) {
    sectionElement.hidden = true;
    if (sectionElement.id === sectionId) {
      sectionElement.hidden = false;
    }
  });
});

const greeting = document.getElementsByClassName('greeting')[0];

//greeting.addEventListener('click', () => {
//  greeting.classList.add('hidden');
//}, false);
