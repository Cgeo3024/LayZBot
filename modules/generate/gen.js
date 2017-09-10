var resource = require('./gensource.json');

var generate = function()
{
  var output = "";

  output =

  resource.adjective[Math.floor(Math.random() * resource.adjective.length)] + " " +
  resource.race[Math.floor(Math.random() * resource.race.length)] + " " +
  resource.dclass[Math.floor(Math.random() * resource.dclass.length)] + " from " +
  resource.location[Math.floor(Math.random() * resource.location.length)] + " who " +
  resource.backstory[Math.floor(Math.random() * resource.backstory.length)];
    //console.log(resource.race);
  console.log(output);
  return output;
}

module.exports = generate;
