function truncate(str, maxlength) {
    if (str.length >= maxlength) {
        str = str.slice(0, maxlength - 1) + "…"; // если длина строки больше или равна maxlength обрезаем
    }
    else {
        str; // иначе возвращаем исходную str
    }
    return str;
    // можно не городить с if и свернуть через условный оператор "?": (str.length >= maxlength) ? str = str.slice(0, maxlength - 1) + "…" : str;
}
