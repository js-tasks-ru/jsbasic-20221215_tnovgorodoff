function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) { //получаем через rows.length кол-во строк <tr> таблицы
    table.rows[i].cells[i].style.background = 'red'; //когда нумератор у td и tr ячейки совпадает - закрашиваем
  }
}
