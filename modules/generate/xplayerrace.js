var ndx = require('./ndx.js');

function getAngelicGuide(){
  var ret = {};
  var names = [
    "Tadriel",
    "Myllandra",
    "Seraphina",
    "Galladia",
    "Mykiel",
    "Valandras"
  ];

  var natures = [
    "Bookish and lecturing",
    "Compassionate and hopeful",
    "Practical and lighthearted",
    "Fierce and vengeful",
    "Stern and judgmental",
    "Kind and parental",
  ];

  ret.title = "Angelic Guide";
  ret.text = "*Name*: " + names[Math.floor(Math.random()*names.length)]
  + "\n*Nature*: " + natures[Math.floor(Math.random()*natures.length)];
  return ret;
}

function monsterOrigin()
{
  var origins = [
    "You are a spy sent to undermine your enemies from within.",
    "You are the victim of a curse or polymorph spelll.",
    "You were raised by humans, elves, or dwarves and "+
    "have adopted their culture.",
    "At a young age, you adopted a human religion and "+
    "now serve it faithfully.",
    "You received divine in$ight that sent you on your path,"+
    "and occasionally receive new visions that guide you.",
    "Your sworn enemy is an ally of your people, forcing "+
    "you to leave your tribe to gain vengeance.",
    "An evil entity corrupted your. people's society.",
    "An injury or strange event caused you to lose all memory "+
    "of your past, but occasional flashes of it return to you.",
  ];

  return ({"title":"Monsterous Origin", "text": origins[Math.floor(Math.random()*origins.length)]});
}


function getRaceSpecifics(inRace)
{
  console.log("Calculating Race Heights and Weights");
  var output = [];
  switch(inRace){
    case("Aarakocra") :
      var heightMod = ndx(2,6);
      var height = ((4 * 12) + 6) + heightMod;
      var weight = 70 + (ndx(1,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Aasimar") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 110 + (ndx(2,4) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(getAngelicGuide());
      console.log(heightMod);
      console.log(height);
      console.log(weight);
    break;
    case("Bugbear") :
      var heightMod = ndx(2,12);
      var height = (6 * 12) + heightMod;
      var weight = 200+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
      + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
    case("Dragonborn") :
      var heightMod = ndx(2,8);
      var height = ((5 * 12) + 6) + heightMod;
      var weight = 175+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Dwarf") :
      var heightMod = ndx(2,4);
      var height = ((3 * 12) + 8) + heightMod;
      var weight = 115+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight(Hill Dwarf)", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      var heightMod = ndx(2,4);
      var height = (4 * 12) + heightMod;
      var weight = 130 + (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight(Mountain Dwarf)", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Elf") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 6) + heightMod;
      var weight = 90+ (ndx(1,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight(High Elf)", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 6) + heightMod;
      var weight = 100+ (ndx(1,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight(Wood Elf)", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      var heightMod = ndx(2,6);
      var height = ((4 * 12) + 5) + heightMod;
      var weight = 75+ (ndx(1,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight(Drow)", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Firebolg") :
      var reasons =
      [
        "Outcast for murder",
        "Outcast for severely damaging home territory",
        "Clan slain, by, invading humanoids",
        "Clan slain by a dragon or demon",
        "Separated from the tribe and lost",
        "Homeland destroyed by natural disaster",
        "Personal quest ordained by omens",
        "Dispatched on a quest by tribe leaders"
      ];
      var heightMod = ndx(2,12);
      var height = ((6 * 12) + 2) + heightMod;
      var weight = 175+ (ndx(2,6) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push({"title":"Reason for Adventuring",
        "text":reasons[Math.floor(Math.random()*reasons.length)]});
        console.log(heightMod);
        console.log(height);
        console.log(weight);
    break;
    case("Genasi") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Gnome") :
      var heightMod = ndx(2,4);
      var height = ((2 * 12) + 11) + heightMod;
      var weight = 35+ (heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Goblin") :
      var heightMod = ndx(2,4);
      var height = ((3 * 12) + 5) + heightMod;
      var weight = 35+ (heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
                    + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
    case("Goliath") :
      var heightMod = ndx(2,10);
      var height = ((6 * 12) + 2) + heightMod;
      var weight = 200+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Half-Elf") :
      var heightMod = ndx(2,8);
      var height = ((4 * 12) + 9) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Halfling") :
      var heightMod = ndx(2,4);
      var height = ((2 * 12) + 7) + heightMod;
      var weight = 35 + heightMod;
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Half-Orc") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 10) + heightMod;
      var weight = 140+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Hobgoblin") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
                  + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
    case("Human") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Kenku") :
      var heightMod = ndx(2,8);
      var height = ((4 * 12) + 4) + heightMod;
      var weight = 50+ (ndx(1,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Kobold") :
      var heightMod = ndx(2,4);
      var height = ((2 * 12) + 1) + heightMod;
      var weight = 25 + (heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
                    + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
    case("Lizardfolk") :
      var quirks = [
        "You hate waste and see no reason not to scavenge "+
        "fallen enemies. Fingers are tasty and portable!",
        "You sleep best while mostly submerged in water.",
        "Money is meaningless to you.",
        "You think there are only two species of humanoid:" +
        "lizardfolk and meat.",
        "You have learned to laugh. You use this talent in "+
        "response to all emotional situations, to better fit in "+
        "with your comrades.",
        "You still don't understand how metaphors work." +
        "That doesn't stop you from using them at every opportunity",
        "You appreciate the soft humanoids who realize they "+
        "need chain mail and swords to match the gifts you "+
        "were born with.",
        "You enjoy eating your food while it's still wriggling."
      ];
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 9) + heightMod;
      var weight = 120+ (ndx(2,6) * heightMod);
      console.log(heightMod);
      console.log(height);
      console.log(weight);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
                    + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push({"title":"Lizardfolk Quirk",
      "text":quirks[Math.floor(Math.random()*quirks.length)]});
    break;
    case("Orc") :
      var heightMod = ndx(2,8);
      var height = ((5 * 12) + 4) + heightMod;
      var weight = 175+ (ndx(2,6) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
        + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
    case("Tabaxi") :
      var obsessions = [
        "A god or planar entity",
        "A monster",
        "A lost civilization",
        "A wizard's secrets",
        "A mundane item",
        "A magic item",
        "A location",
        "A legend or tale",
      ];
      var quirks = [
        "You miss your tropical home and complain endlessly "+
        "about the freezing, weather, even in summer.",
        "You never wear the same outfit twice, unless you absolutely must.",
        "You have a minor phobia of water and hate getting wet.",
        "Your tail always betrays your inner thoughts.",
        "You purr loudly when you are happy.",
        "You keep a small ball of yarn in your hand, which you "+
        "constantly fidget with.",
        "You are always in debt, since you spend your gold on "+
        "lavish parties and gifts for friends.",
        "When talking about something you're obsessed with," +
        "you speak quickly and never pause and others can't " +
        "understand you .",
        "You are a font of random trivia from the lore and stories "+
        "you have discovered.",
        "You can't help but pocket interesting objects you " +
        "come across.",
      ];
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 10) + heightMod;
      var weight = 90+ (ndx(2,4) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
                    + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push({"title":"*My curiosity is currently fixed on...*",
                    "text":obsessions[Math.floor(Math.random()*obsessions.length)]});
      output.push({"title":"Tabaxi Quirk",
                    "text":quirks[Math.floor(Math.random()*quirks.length)]});
    break;
    case("Tiefling") :
      var heightMod = ndx(2,8);
      var height = ((4 * 12) + 9) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Tortle") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 425+ (ndx(2,3) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Triton") :
      var quirks = [
        "You phrase requests as orders that you expect to be obeyed.",
        "You are quick to boast of the greatness of your civilization.",
        "You learned an antiquated version of Common and "+
        "drop 'thee' and 'thou' into your speech.",
        "You assume that people are telling you the truth " +
        "about local customs and expectations.",
        "The surface world is a wondrous place, and you catalog "+
        "all its details in a journal.",
        "You mistakenly assume that surface folk know about "+
        "and are impressed by your people's history.",
      ];
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 6) + heightMod;
      var weight = 90+ (ndx(2,4) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
  + height%12 +"\"\n*Weight*: " +weight + " lb"});
    break;
    case("Yuan-Ti Pureblood") :
      var heightMod = ndx(2,10);
      var height = ((4 * 12) + 8) + heightMod;
      var weight = 110+ (ndx(2,4) * heightMod);
      output.push({"title":"Height and Weight", "text":"*Height*: "+ Math.floor(height/12) +"\'"
              + height%12 +"\"\n*Weight*: " +weight + " lb"});
      output.push(monsterOrigin());
    break;
  }
  return output;
}

module.exports.specifics = getRaceSpecifics;
