function camelize(str) {
    return str.split('-')
    //разбиваем строку на массив строк [ 'list', 'style', 'image' ]
             .map((word, i) => i !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
    //для каждого элемента массива кроме начального преобразуем первый символ к верхнему регистру и возвращаем новый массив [ 'list', 'Style', 'Image' ]
             .join('');
    //объединяем элементы массива в одну строку 'listStyleImage'
}
