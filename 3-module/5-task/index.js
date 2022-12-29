function getMinMax(str) {
    numbers = str.split(' ').map(str => Number(str)).filter(str => !isNaN(str));
    //создаем массив из строки, преобразуем каждый элем к числу [ 1, NaN, -5.8, NaN, 10, NaN, 34, NaN, -5.3, NaN, 73 ]
    //и исключаем не числа [ 1, -5.8, 10, 34, -5.3, 73 ]
    return {
        min: Math.min.apply(null, numbers),
        max: Math.max.apply(null, numbers)
    }
    //возвращаем объект, исп math для массива { min: -5.8, max: 73 }
}
