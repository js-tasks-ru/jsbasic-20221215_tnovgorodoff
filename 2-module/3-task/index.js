let calculator = {

    read: function(a, b) {
        this.a = parseInt(a);
        this.b = parseInt(b);
        },

    sum: function() {
        return this.a + this.b;
        },

    mul: function() {
        return this.a * this.b;
    },

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
