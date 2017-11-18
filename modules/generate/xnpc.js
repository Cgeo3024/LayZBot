var xage = require('./xage.js');

var getIndividual = function()
{
  ret = {};
  ret.age = xage();
  ret.race = genNPCRace();
  ret.job = getOccupation();
  ret.alignment = getAlignment();

  return ret;
}

function genNPCRace()
{
  var raceChance = Math.floor(Math.random() *100)
  var race = "unset";
  if (raceChance > 95)
  {
    race = "DM's Choice";
  } else if (raceChance > 90)
  {
    race = "Tiefling";
  }else if (raceChance > 85)
  {
    race = "Half-Orc";
  }else if (raceChance > 80)
  {
    race = "Half-Elf";
  }else if (raceChance > 75)
  {
    race = "Gnome";
  }else if (raceChance > 70)
  {
    race = "Dragonborn";
  }else if (raceChance > 60)
  {
    race = "Halfling";
  }else if (raceChance > 50)
  {
    race = "Elf";
  }else if (raceChance > 40)
  {
    race = "Dwarf";
  }else
  {
    race = "Human";
  }
  return race;
}
var getAdventurer = function()
{
  var adv = getIndividual();
  adv.job = getClass();

  return adv;
}

function getAlignment()
{
  var aligns = [
    "Chaotic Evil or Chaotic Neutral",
    "Chaotic Evil or Chaotic Neutral",
    "Chaotic Evil or Chaotic Neutral",
    "Lawful Evil",
    "Lawful Evil",
    "Neutral Evil",
    "Neutral Evil",
    "Neutral Evil",
    "Neutral",
    "Neutral",
    "Neutral",
    "Neutral",
    "Neutral Good",
    "Neutral Good",
    "Neutral Good",
    "Lawful Good or Lawful Neutral",
    "Lawful Good or Lawful Neutral",
    "Chaotic Good or Chaotic Neutral",
  ];

  return (aligns[Math.floor(Math.random()*aligns.length)])
}

function getOccupation()
{
  var jobChance = Math.ceil(Math.random() * 100);
  var job = "";
  if (jobChance > 95)
  {
    job = "Soldier";
  } else if (jobChance > 90)
  {
    job = "Sailor";
  }else if (jobChance > 85)
  {
    job = "Priest";
  }else if (jobChance > 80)
  {
    job = "Politician or bureaucrat";
  }else if (jobChance > 75)
  {
    job = "Merchant";
  }else if (jobChance > 60)
  {
    job = "Laborer";
  }else if (jobChance > 55)
  {
    job = "Hunter or trapper";
  }else if (jobChance > 43)
  {
    job = "Farmer or herder";
  }else if (jobChance > 38)
  {
    job = "Explorer or wanderer";
  }else if (jobChance > 36)
  {
    job = "Exile, hermit or refuge";
  }else if (jobChance > 31)
  {
    job = "Entertainer";
  }else if (jobChance > 26)
  {
    job = "Criminal";
  }else if (jobChance > 11)
  {
    job = "Artisan or guild member";
  }else if (jobChance == 11)
  {
    job = "Aristocrat";
  }else if (jobChance > 5)
  {
    job = "Adventurer";
    job += " - " + getClass();
  }else
  {
    job = "Academic";
  }

  return job;
}

function getClass()
{
  var jobChance = Math.ceil(Math.random() * 100);
  var job = "";
  if (jobChance > 94)
  {
    job = "Wizard";
  } else if (jobChance > 89)
  {
    job = "Warlock";
  }else if (jobChance > 84)
  {
    job = "Sorcerer";
  }else if (jobChance > 70)
  {
    job = "Rogue";
  }else if (jobChance > 64)
  {
    job = "Ranger";
  }else if (jobChance > 58)
  {
    job = "Paladin";
  }else if (jobChance > 52)
  {
    job = "Monk";
  }else if (jobChance > 36)
  {
    job = "Fighter";
  }else if (jobChance > 29)
  {
    job = "Druid";
  }else if (jobChance > 14)
  {
    job = "Cleric";
  }else if (jobChance > 7)
  {
    job = "Bard";
  }else
  {
    job = "Barbarian";
  }

  return job;
}

module.exports.npc  = getIndividual;
module.exports.hero = getAdventurer;
