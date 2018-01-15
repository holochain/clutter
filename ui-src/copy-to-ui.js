const fs = require('fs')
var rimraf = require('rimraf')
rimraf.sync('../ui')
fs.renameSync('build', '../ui')
