const { items, crafts } = require('../lists');

const getCraftLevels = (synth, key) => {
  if (synth[key] != 0) {
    synth['crafts'].push({ craft: crafts[key], level: synth[key] });
  }
  delete synth[key];
};

const getIngredients = (synth, key) => {
  if (!synth[key] == 0) {
    if (synth['ingredients'].some(e => e.id == synth[key])) {
      var foundIndex = synth['ingredients'].findIndex(x => x.id == synth[key]);
      synth['ingredients'][foundIndex]['count'] += 1;
    } else {
      synth['ingredients'].push({
        name: items[synth[key]].name,
        id: synth[key],
        count: 1,
      });
    }
  }
  delete synth[key];
};

const getResults = (synth, key) => {
  synth['results'].push({
    name: items[synth[key]].name,
    count: synth[key + 'Qty'],
    type: key.replace('Result', '') == '' ? 'Normal' : key.replace('Result', ''),
    id: synth[key],
  });
  delete synth[key + 'Qty'];
  delete synth[key];
};

const sortMainCrafts = synth => {
  synth.crafts.sort(function (a, b) {
    var x = a.level > b.level ? -1 : 1;
    return x;
  });
};

const sortAllCrafts = recipes => {
  recipes.sort(function (a, b) {
    var x = a.crafts[0].level > b.crafts[0].level ? 1 : -1;
    return x;
  });
};

const parse = recipes => {
  recipes.map(synth => {
    synth['crafts'] = [];
    synth['ingredients'] = [];
    synth['results'] = [];
    delete synth['ResultName'];
    synth['CrystalName'] = items[synth['Crystal']].name;
    Object.keys(synth).map(keyName => {
      if (Object.keys(crafts).includes(keyName)) {
        getCraftLevels(synth, keyName);
      } else if (keyName.startsWith('Ingredient')) {
        getIngredients(synth, keyName);
      } else if (keyName.startsWith('Result') && !keyName.endsWith('Qty') && synth[keyName] > 0) {
        getResults(synth, keyName);
      }
    });
    sortMainCrafts(synth);
  });
  sortAllCrafts(recipes);
  return recipes;
};

module.exports = {
  parse,
};
