const {
   get, includes, filter, find, orderBy,
} = require('lodash');
const careers = require('../../data/careers.json');

const errorMessage = 'We cannot find any matching careers. Please check your query and try again.';
module.exports = {
   getMany: (req, res) => {
      const { sort = 'name', sortOrder = 'asc', skill, setting, source } = req.query;

      // filter by queries
      let list = filter(careers, career => {
         if (
            skill && !includes(career.careerSkills, skill.toLowerCase())
            || setting && !includes(career.settings, setting.toLowerCase())
            || source && !includes(career.source.toLowerCase(), source.toLowerCase())
         ) return false;

         return true;
      });

      // deep sorting
      const sortOn = career => get(career, sort.toLowerCase());
      // sort by given value, then by name for matching values. Default order is asc
      list = orderBy(list, [sortOn, 'name'], sortOrder.toLowerCase());

      if (list.length > 0) {
			res.status(200).send(list);
		} else {
			res.status(400).send({ message: errorMessage });
		}
   },

   getOne: (req, res) => {
      const { name } = req.params;
		const { fuzzy } = req.query;

		let career;
		if (fuzzy) {
			career = filter(careers, c => includes(c.name.toLowerCase(), name.toLowerCase()));
		} else {
			career = find(careers, c => name.toLowerCase() === c.name.toLowerCase());
		}

      if (Array.isArray(career) && career.length === 0) {
			res.status(400).send({ message: errorMessage });
      } else if (career) {
			res.status(200).send(career);
		} else {
			res.status(400).send({ message: errorMessage });
		}
   },
};
