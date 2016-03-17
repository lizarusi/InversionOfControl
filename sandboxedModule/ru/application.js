// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');
setTimeout(function() {
  console.log("Hello");
}, 1000);
setInterval(function() {
  console.log("HelloInterval");
}, 3000);
util.format(1, 2, 3);
console.log(util.inspect(util, true, null));
module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};
