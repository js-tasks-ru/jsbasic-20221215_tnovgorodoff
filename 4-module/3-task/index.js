function highlight(table) {
  let tBody = table.getElementsByTagName('tbody')[0]; //получаем тело таблицы
  let trStrings = tBody.getElementsByTagName('tr'); //получаем строки из таблицы
  Array.from(trStrings).forEach( //создаем из строк массив, чтобы дальше с ним работать, можно наверное и через for с children[i]...
    (row) => {
      let checkAvailable = row.getElementsByTagName('td')[3]; //проверяем аттрибут Status
      if (checkAvailable.hasAttribute('data-available')) { //проверяем наличие data-available
        (checkAvailable.dataset.available === 'true') ? row.classList.add('available') : (row.classList.add('unavailable'));
      }//проставляем класс available/unavailable у ячейки Status
      else
        row.hidden = true; //скрываем строку, если нет аттрибута data-available

      let checkGender = row.getElementsByTagName('td')[2];
      (checkGender.textContent === 'm') ? row.classList.add('male') : row.classList.add('female'); //проставляем класс male/female по содержанию Gender (если не m, то точно f благо у нас всего 2 пола ;D)

      let checkAge = row.getElementsByTagName('td')[1];
      if (Number(checkAge.textContent) < 18) {
        row.style.textDecoration = 'line-through'; //зачеркиваем строку, если значение ячейки Age меньше 18
      }
    }
  )
}
