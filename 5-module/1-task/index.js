function hideSelf() {
  let hideButton = document.querySelector('.hide-self-button'); //возвращаем элемент документа hide-self-button
  hideButton.addEventListener('click', () => hideButton.hidden = true);
}
