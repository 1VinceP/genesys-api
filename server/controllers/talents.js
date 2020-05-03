const {
	get, includes, filter, find, orderBy,
} = require('lodash');
const talents = require('../../data/talents.json');

const errorMessage = 'We cannot find any matching talents. Please check your query and try again.';
module.exports = {
	getMany: (req, res) => {
		const { sort = 'name', sortOrder = 'asc', tier, activation, ranked, source } = req.query;

		// filter by queries
		let list = filter(talents, talent => {
			if (
				tier && tier !== talent.tier
				|| activation && activation.toLowerCase() !== talent.activation.toLowerCase()
				|| ranked && ranked.toLowerCase() !== talent.ranked.toLowerCase()
				|| source && !includes(talent.source.toLowerCase(), source.toLowerCase())
			) return false;

			return true;
		});

      // deep sorting
      const sortOn = talent => get(talent, sort.toLowerCase());
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

		let talent;
		if (fuzzy) {
			talent = filter(talents, t => includes(t.name.toLowerCase(), name.toLowerCase()));
		} else {
			talent = find(talents, t => name.toLowerCase() === t.name.toLowerCase());
		}

		if (Array.isArray(talent) && talent.length === 0) {
         res.status(400).send({ message: errorMessage });
      } else if (talent) {
         res.status(200).send(talent);
		} else {
			res.status(400).send({ message: errorMessage });
		}
	},
};