function makeFriendsList(friends) {
  let ul = document.createElement('ul'); //создаем элемент список на странице
  ul.innerHTML = friends.map(element => `<li>${Object.values(element).join(' ')}</li>`).join('');
  //через innerHTML заполняем содержание списка ul значениями из массива friends
  return ul; //ф-ция возвращает DOM элемент ul
}
