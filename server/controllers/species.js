const {
   get, includes, filter, find, orderBy, some,
} = require('lodash');
// using "archetypes" for plurality
const archetypes = require('../../data/species.json');

const errorMessage = 'We cannot find any matching species. Please check your query and try again.';
module.exports = {
   getMany: (req, res) => {
      const {
         sort = 'name', sortOrder = 'asc', brawn, agility, intellect, cunning, willpower, presence,
         wt, st, xp, skill, skillChoice, activation, setting, source,
      } = req.query;

      // filter by queries
      let list = filter(archetypes, archetype => {
         const matchSkillChoice = () => {
            return skillChoice.toLowerCase() === 'true' && archetype.skills.choice
               || skillChoice.toLowerCase() === 'false' && !archetype.skills.choice;
         };

         if (
            brawn && archetype.characteristics.brawn != brawn
            || agility && archetype.characteristics.agility != agility
            || intellect && archetype.characteristics.intellect != intellect
            || cunning && archetype.characteristics.cunning != cunning
            || willpower && archetype.characteristics.willpower != willpower
            || presence && archetype.characteristics.presence != presence
            || wt && archetype.wt != wt
            || st && archetype.st != st
            || xp && archetype.xp != xp
            || skill && !includes(archetype.skills.skills, skill.toLowerCase())
            || skillChoice && !matchSkillChoice()
            // || skillChoice && archetype.skills.choice !== skillChoice
            || activation && some(archetype.abilities, a => a.activation === activation)
            || setting && !includes(archetype.settings, setting.toLowerCase())
            || source && !includes(archetype.source.toLowerCase(), source.toLowerCase())
         ) return false;

         return true;
      });

      // deep sorting
      const sortOn = archetype => get(archetype, sort.toLowerCase());
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

		let archetype;
		if (fuzzy) {
			archetype = filter(archetypes, c => includes(c.name.toLowerCase(), name.toLowerCase()));
		} else {
			archetype = find(archetypes, c => name.toLowerCase() === c.name.toLowerCase());
		}

      if (Array.isArray(archetype) && archetype.length === 0) {
			res.status(400).send({ message: errorMessage });
      } else if (archetype) {
			res.status(200).send(archetype);
		} else {
			res.status(400).send({ message: errorMessage });
		}
   },
};
