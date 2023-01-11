function toggleText() {
  let getButton = document.querySelector('.toggle-text-button'); //получаем кнопку из DOM
  let hideText = function () {
    let divText = document.getElementById('text'); //получаем div с текстом из DOM
    (divText.hidden === true) ? divText.hidden = false : divText.hidden = true; //проверяем-выставляем видимость текста
  }
  getButton.addEventListener('click', hideText); //настраиваем событие нажатия на кнопку
}
