const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

rimraf.sync('../release');
fs.mkdirSync(path.join(__dirname, '../release'));
ncp('../ui', '../release/ui', function (err) {
    if (err) { return console.error(err); }
});
ncp('../dna', '../release/dna', function (err) {
    if (err) { return console.error(err); }
});
fs.createReadStream('../docker-compose.yml').pipe(fs.createWriteStream('../release/docker-compose.yml'));
