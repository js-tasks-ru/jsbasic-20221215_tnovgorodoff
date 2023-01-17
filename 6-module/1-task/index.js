/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.render(rows);
  }
  render(rows) {
    const table = document.createElement("table"); // создаем элемент таблица и правила рендеринга
    const list = rows.reduce(function(resultList, currentRow) {
      return resultList + `
          <tr>
          <td>${currentRow.name}</td>
          <td>${currentRow.age}</td>
          <td>${currentRow.salary}</td>
          <td>${currentRow.city}</td>
          <td><button>X</button></td>
          </tr>`;
    }, '');
    // заполняем структуру html
    table.innerHTML = `
      <table>
      <thead>
        <tr>
          <td>Имя</td>
          <td>Возраст</td>
          <td>Зарплата</td>
          <td>Город</td>
          <td></td>
        </tr>
      </thead>
      <tbody>${list}</tbody>
      </table>
    `;
    // по клику на "крестик" удаляем запись таблицы
    table.addEventListener( "click", (event) => event.target.closest('tr').remove());
    return table;
  }
}
