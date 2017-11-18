var death = function()
{
  var deaths = [
    "Unknown cause",
    "Murder",
    "Battle",
    "An accident related to class or occupation",
    "An accidented unrelated to class or occupation",
    "Natural causes, such as disease or old age",
    "Natural causes, such as disease or old age",
    "Apparent suicide",
    "Torn apart by an animal or natural disaster",
    "Consumed by a monster",
    "Executed for a crime, or tortured to death",
    "Bizarre event, such as being hit by a meteorite, "+
    "struck down by an angry god, or killed by a hatching "+
    "slaad egg"
  ];

  return deaths[Math.floor(Math.random()*deaths.length)];
}

module.exports = death;
