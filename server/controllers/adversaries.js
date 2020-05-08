const {
  get, includes, filter, find, orderBy, some,
} = require('lodash');
const adversaries = require('../../data/adversaries.json');

const errorMessage = 'We cannot find any matching adversaries. Please check your query and try again.';
module.exports = {
  getMany: (req, res) => {
    //  const {
    //     sort = 'name', sortOrder = 'asc', brawn, agility, intellect, cunning, willpower, presence,
    //     wt, st, xp, skill, skillChoice, activation, setting, source,
    //  } = req.query;
    const {
      sort = 'name', sortOrder = 'asc', profile, type, brawn, agility, intellect, cunning, willpower, presence,
      wt, st, combat, social, general, silhouette, skill, spellcaster, setting, source,
    } = req.query;

     // filter by queries
     let list = filter(adversaries, adversary => {

        if (
            profile && adversary.profile != profile
            || type && adversary.type != type
            || brawn && adversary.characteristics.brawn != brawn
            || agility && adversary.characteristics.agility != agility
            || intellect && adversary.characteristics.intellect != intellect
            || cunning && adversary.characteristics.cunning != cunning
            || willpower && adversary.characteristics.willpower != willpower
            || presence && adversary.characteristics.presence != presence
            || wt && adversary.wt != wt
            || st && adversary.st != st
            || combat && adversary.powerLevel.combat != combat
            || social && adversary.powerLevel.social != social
            || general && adversary.powerLevel.general != general
            || silhouette && adversary.silhouette != silhouette
            || skill && !includes(adversary.skills.skills, skill.toLowerCase())
            || spellcaster && adversary.hasOwnProperty('spellcasting')
            || setting && !includes(adversary.settings, setting.toLowerCase())
            || source && !includes(adversary.source.toLowerCase(), source.toLowerCase())
        ) return false;

        return true;
     });

     // deep sorting
     const sortOn = adversary => get(adversary, sort.toLowerCase());
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

   let adversary;
   if (fuzzy) {
     adversary = filter(adversaries, c => includes(c.name.toLowerCase(), name.toLowerCase()));
   } else {
     adversary = find(adversaries, c => name.toLowerCase() === c.name.toLowerCase());
   }

     if (Array.isArray(adversary) && adversary.length === 0) {
     res.status(400).send({ message: errorMessage });
     } else if (adversary) {
     res.status(200).send(adversary);
   } else {
     res.status(400).send({ message: errorMessage });
   }
  },
};
