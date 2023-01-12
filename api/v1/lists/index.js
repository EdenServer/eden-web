/**
 * Data found at https://github.com/Windower/Resources/tree/master/resources_data
 * Data was converted from Lua to JSON via mass search and replace using regex patterns
 */
const titles = require('./titles');
const items = require('./itemNames.json');
const crafts = require('./craftNames');
const guilds = require('./guildNames');
const ranks = require('./guildRanks');
const itemDescriptions = require('./itemDescriptions.json');
Object.keys(itemDescriptions).forEach(itemid => {
  items[itemid].desc = itemDescriptions[itemid];
});

module.exports = {
  items,
  titles,
  crafts,
  guilds,
  ranks,
};
