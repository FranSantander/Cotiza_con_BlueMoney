var exec = require('child_process').exec
exec('node index.js prueba4 txt utm 7000000', function (err, stdout, stderr) {
  console.log(stdout)
})