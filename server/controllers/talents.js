const {
	includes, filter, find, orderBy,
} = require('lodash');
const talents = require('../../data/talents.json');

module.exports = {
	getMany: (req, res) => {
		const { sort, sortOrder, tier, activation, ranked, source } = req.query;

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

		// sort by query
		if (sort) {
			// allows for case-insensitive sorting
			const sortOn = keyMap[sort.toLowerCase()];
			// sort by given value, then by name for matching values. Default order is asc
			list = orderBy(list, [sortOn, 'name'], sortOrder || 'asc');
		}

		if (list.length > 0) {
			res.status(200).send(list);
		} else {
			res.status(400).send('There are no talents that match the provided criteria.');
		}
	},

	getOne: (req, res) => {
		const { name } = req.params;
		const { fuzzy } = req.query;

		let talent;
		if (fuzzy) {
			talent = filter(talents, talent => includes(talent.name.toLowerCase(), name.toLowerCase()));
		} else {
			talent = find(talents, talent => name.toLowerCase() === talent.name.toLowerCase());
		}

		if (talent) {
			res.status(200).send(talent);
		} else {
			res.status(400).send('We cannot find a talent with that name. Please check your spelling and try again');
		}
	},
};