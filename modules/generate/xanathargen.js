var xclass         = require('./xclass.js');
var xbackground    = require('./xbackground.js');
var xage           = require('./xage.js');
var xsiblings      = require('./xsiblings.js');
var xplayerrace    = require('./xplayerrace.js');
var xchildhood     = require('./xchildhood.js');
var xevent         = require('./xevent.js');
var xnpc           = require('./xnpc.js');
var xdeath         = require('./xdeath.js');

var genStatics = function(values)
{
  var race = null;
  var power = null;
  var background = null;
  var age = -1;
  var lifeEventCount = 0;
  var outputList = [];

  var outstr = "**Race:**";

  var races = ["Human", "Elf", "Half-Elf",
                "Dwarf", "Tiefling", "Dragonborn",
                "Bugbear","Halfling","Half-Orc", "Aarakocra",
                "Aasimar", "Firebolg", "Genasi", "Gnome", "Goblin",
                "Goliath", "Hobgoblin","Kenku", "Kobold", "Lizardfolk",
                "Orc", "Tabaxi", "Triton","Tortle", "Yuan-Ti Pureblood"];

  var powers = ["Barbarian", "Bard", "Cleric", "Druid",
                  "Fighter","Paladin","Ranger", "Wizard",
                  "Warlock", "Sorcerer", "Rogue","Monk"];
  var backgrounds = ["Acolyte", "Charlatan", "Criminal"
            ,"Entertainer","Folk Hero", "Guild Artisan",
            "Hermit", "Noble", "Outlander",
            "Sage", "Sailor", "Soldier", "Urchin"];

  var nuVals = [];
  for (var i = 0; i < values.length; i++)
  {
    nuVals.push(values[i].replace("_", " "));
  }

  for (var i=0; i< nuVals.length; i++)
  {
    console.log(nuVals[i]);
    console.log(isNaN(nuVals[i]));
    if (!isNaN(nuVals[i]))
    {
      age = nuVals[i];
    }
  }
  console.log(age);
  if (age < 1)
  {
    age = xage();
  }
  lifeEventCount = setLifeEvents(age);
  race = validateOrReplace(races, nuVals);
  power = validateOrReplace(powers, nuVals);
  background = validateOrReplace(backgrounds, nuVals);

  var bgArticle = "a";
  if (background == "Acolyte" || background == "Urchin" || background == "Entertainer" || background == "Outlander")
  {
    bgArticle = "an";
  }

  console.log(values);

  console.log("selected");
  console.log(race);
  console.log(power);
  console.log(background);
  var raceSpecifics = xplayerrace.specifics(race);
  var classQuirks = xclass.quirks(power);
  var backgroundQuirks = xbackground.quirks(background);
  console.log(raceSpecifics);

  var childhood = xchildhood.childhood();
  var siblings = xsiblings(race);
  var outstr =  "\n**Class:** " + power + "\n"+
                "**Race:** " + race + "\n" +
                "**Age:** " + age +"\n";
  if (raceSpecifics.length > 0)
  {
    outstr+="\n";
  }

  for (var i = 0; i < raceSpecifics.length; i++)
  {
    outstr += "**" +raceSpecifics[i].title + "**\n";
    outstr += raceSpecifics[i].text + "\n\n";
  }
  outstr+=      "**Background:** " + background + "\n" +
                "**Parents:** " + xchildhood.parents() +"\n" +
                "**Birthplace:** " + xchildhood.birthplace() +"\n"+
                "**Siblings:** " + siblings.count +"\n"+
                "**Raised By:** " + childhood.raisedBy +"\n"+
                "**Childhood Home:** " + childhood.home +"\n"+
                "**Childhood Lifestyle:** " + childhood.lifestyle +"\n";
  outputList.push(outstr);

  outstr =      "\n*I became " + bgArticle + " " + background + " because ...* " + xbackground.history(background) + "\n"+
                "\n*I became a " + power + " because ...* " + xclass.history(power) + "\n"+
                "\n";
  console.log("Printing Class Quirks");
  if (classQuirks.length > 0)
  {
    outstr+= "\n**" + power + " Traits**\n\n";
  }
  for (var i = 0; i < classQuirks.length; i++)
  {
    outstr += "**" +classQuirks[i].title + "**\n";
    outstr += classQuirks[i].text + "\n\n";
  }
  outputList.push(outstr);
  console.log("Printing Life Events");

  if(lifeEventCount > 0)
  {
    outstr = "\n**Life Events**  ("+ lifeEventCount + ")\n\n";

    for (var i = 0; i< lifeEventCount; i++)
    {
      outstr += xevent.event() +"\n\n";
    }
  }
  outputList.push(outstr);
  console.log("Printing Siblings Details");

  if (siblings.count > 0)
  {
    outstr = "\n**Siblings Details**\n\n";
    for (var i = 0; i < siblings.details.length; i++)
    {
      outstr += "Sibling " + (i +1) +":\n"+
                "**Alignment:** " +siblings.details[i].alignment+"\n" +
                "**Occupation:** " +siblings.details[i].job+"\n"+
                "**Status:** " +siblings.details[i].status+"\n"+
                "**Relationship**: " +siblings.details[i].relationship + " to you\n\n";
    }
    outstr += "\n\n";
  }
  outputList.push(outstr);
  console.log("String Construction Finished");

  return (outputList);
  /*TODO Age
    Life Events
    siblings
    fmily details
  */
}

function setLifeEvents(age)
{
  var eventCount = 0;
  if (age >= 61)
  {
    eventCount = (Math.ceil(Math.random()*12));
  } else if (age >= 51)
  {
    eventCount = (Math.ceil(Math.random()*10));
  } else if (age >= 41)
  {
    eventCount = (Math.ceil(Math.random()*8));
  } else if (age >= 31)
  {
    eventCount = (Math.ceil(Math.random()*6));
  } else if (age >= 21)
  {
    eventCount = (Math.ceil(Math.random()*4));
  } else {
    eventCount = 1;
  }
  return eventCount;
}
var validateOrReplace = function(arr1, arr2)
{
console.log("Comparing");
console.log(arr1);
console.log(arr2);
var ret = null;
for (var i = 0; i < arr1.length; i++)
{
  for (var j = 0; j < arr2.length; j++)
  {
    if (arr1[i].toLowerCase() == arr2[j].toLowerCase())
    {
      console.log("ret is found!" + i + " " + j);
      console.log(arr1[i].toLowerCase())
      console.log("Matches");
      console.log(arr2[j].toLowerCase());
      ret = arr1[i];
      console.log(ret);
    }
  }
}
if (ret == null)
{
  var irr = Math.floor(Math.random()*arr1.length);
  ret = arr1[irr];
  console.log("replacing ret with " + irr);
  console.log(arr1[irr]);
}
console.log("I will be returning");
console.log(ret);
return ret;
}

module.exports.player = genStatics;
module.exports.hero   = xnpc.hero;
module.exports.npc    = xnpc.npc;
module.exports.death  = xdeath;
module.exports.boon   = xevent.boon;
module.exports.adventure = xevent.adventure;
module.exports.lifeEvent = xevent.event;
