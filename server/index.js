require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , helmet = require('helmet')
    , chalk = require('chalk');

const adversaries = require('./controllers/adversaries')
	 , careers = require('./controllers/careers')
    , species = require('./controllers/species')
    , talents = require('./controllers/talents');

const app = express();
app.use(express.static(`${__dirname}/../src`));

/* local dev */
app.use((req, res, next) => {
	process.env.DEV && res.header('Access-Control-Allow-Origin', '*');
	next();
});

/* middleware */
app.use(helmet());
app.use(bodyParser.json());

/* endpoints */
// ADVERSARIES
app.get('/api/adversaries', adversaries.getMany);
app.get('/api/adversaries/:name', adversaries.getOne);
// CAREERS
app.get('/api/careers', careers.getMany);
app.get('/api/careers/:name', careers.getOne);
// SPECIES
app.get('/api/species', species.getMany);
app.get('/api/species/:name', species.getOne);
// TALENTS
app.get('/api/talents', talents.getMany);
app.get('/api/talents/:name', talents.getOne);


const PORT = process.env.PORT || 3030;
const portChalk = chalk.cyan.underline;
app.listen(PORT, () => {
  	console.log(portChalk(`listening on port ${PORT}`));
});
