// Print something
console.log('From application global context');
var fileName = './README.md';
console.log('Application going to write ' + fileName);
// fs.readFile(fileName, function(err, src) {
//   console.log('File ' + fileName + ' size ' + src.length);
// });
fs.writeFile('message.txt', 'Hello Node.js', function(err) {
  if (err) throw err;
});
