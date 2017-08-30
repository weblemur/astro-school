//        *** Database Seed File ***
// run 'node seed' or 'npm run seed' to excecute

const chalk = require('chalk');
const { db, Student, Campus } = require('./db');

const campusData = [
  { name: 'Luna', imageUrl: 'https://svs.gsfc.nasa.gov/vis/a000000/a004200/a004236/phase_waning_gibbous.0940_preview.jpg',
    students: [
      { name: 'Douglas', email: 'doug@moon.com' },
      { name: 'Elise', email: 'elle@moon.com' }
    ] },
  { name: 'Terra', imageUrl: 'http://janetturpinmyers.com/wp-content/uploads/2012/09/Whole-earth_Apollo8_first-photo_Dec.-1968.jpg',
    students: [
      { name: 'Walter', email: 'wally@gmail.com' },
      { name: 'Jenna', email: 'jenna@erf.com' },
      { name: 'Herbert', email: 'nugget@terra.net' }
    ] },
  { name: 'Mars', imageUrl: 'https://pbs.twimg.com/media/Chn9RP3UUAI_IUV.jpg',
    students: [
      { name: 'Martha', email: 'not-a-martian@totally-the-earth.com' }
    ] },
  { name: 'Titan', imageUrl: 'http://static5.businessinsider.com/image/58fe49030ba0b8ac008b5a91-943/titan-moon-cassini-april-22-2017-kevin-gill-flickr-ccbysa2-33860063290e39a7c765ao.jpg',
    students: [
      { name: 'Sarah-beth', email: 'terra@nugget.com' },
      { name: 'Alfonso', email: 'burps@saturnius.com' },
      { name: 'Denise', email: 'ded@saturnius.com' }
    ] }
];

db.sync({ force: true })
.then(() => {
  console.log(chalk.blue('  –––––––––––––––––––––––––––  '));
  console.log(chalk.cyan('        Database Cleared       '));
  console.log(chalk.blue('  –––––––––––––––––––––––––––  '));
  console.log('             * * *             ');
  return campusData;
})
.map(campus => Campus.create(campus, { include: [Student] }))
.then(function () {
  console.log(chalk.blue('  –––––––––––––––––––––––––––  '));
  console.log(chalk.green('        Database Seeded        '));
  console.log(chalk.blue('  –––––––––––––––––––––––––––  '));
})
.catch(function (err) {
  console.error(chalk.bgRed.white('  –––––––––––––––––––––––––––  '));
  console.error(chalk.bgRed.white.bold('  There was totally a problem  '));
  console.error(chalk.bgRed.white('  –––––––––––––––––––––––––––  '));
  console.error(err, err.stack);
})
.finally(function () {
  db.close();
  console.log('connection closed');
  return null;
});
