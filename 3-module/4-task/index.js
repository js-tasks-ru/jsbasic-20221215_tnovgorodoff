function showSalary(users, age) {
    return users.filter(user => user.age <= age).map(user => `${user.name}, ${user.balance}`).join('\n');
    //методом filter возвращаем все элементы исходного массива удв усл по age
    //и методом map преобразуем каждый элем нового массива к нужному виду, джойним с переносом строки
}
