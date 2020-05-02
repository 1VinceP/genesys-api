require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , helmet = require('helmet')
    , chalk = require('chalk');

const talents = require('./controllers/talents');

const app = express();
app.use(express.static(`${__dirname}/../src`));

/* local dev */
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
// });

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
