require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , helmet = require('helmet')
    , chalk = require('chalk');

const talents = require('./controllers/talents');

const app = express();

/* middleware */
app.use(helmet());
app.use(bodyParser.json());

/* endpoints */
// TALENTS
app.get('/api/talents', talents.getMany);
app.get('/api/talents/:name', talents.getOne);


const PORT = process.env.PORT || 3030;
const portChalk = chalk.cyan.underline;
app.listen(PORT, () => {
  	console.log(portChalk(`listening on port ${PORT}`));
});
