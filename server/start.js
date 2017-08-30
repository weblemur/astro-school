'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const chalk = require('chalk');

const pkg = require('../package.json');
const { db } = require('../db');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('morgan')('dev'));
}

//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.
  .use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(err, typeof next);
      console.error(err.stack);
    }
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

  // notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need) in the function body that follows.

if (module === require.main) {
  // Start listening only if we're the main module.

  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      db.sync()
        .then(() => {
          console.log(chalk.blue(`******* ${db.config.database} database synced *******`));
        })
        .catch(err => {
          console.error(chalk.red('*** Database Connection Failed ***'));
          console.error(chalk.red(err));
        })
        .finally(() => {
          console.log(`––– Started HTTP Server for ${pkg.name} –––`);
          console.log(`Listening on ${JSON.stringify(server.address())}`);
          console.log(chalk.underline.yellow(`http://localhost:${JSON.stringify(server.address().port)}/`));
        });
    }
  );
}
