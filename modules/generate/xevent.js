var npc = require('./xnpc.js');
var death = require('./xdeath.js');
function getCrime()
{
  var crimes = [
    "Murder",
    "Theft",
    "Burglary",
    "Assault",
    "Smuggling",
    "Kidnapping",
    "Extortion",
    "Counterfeiting"
  ];

  return crimes[Math.floor(Math.random()*crimes.length)];
}

function getPunishment()
{
  var puns = [
    "You did not commit the crime and were exonerated after being accused.",
    "You did not commit the crime and were exonerated after being accused.",
    "You did not commit the crime and were exonerated after being accused.",
    "You committed the crime, or helped to do so, but nonetheless " +
    "the authorities found you not guilty",
    "You committed the crime, or helped to do so, but nonetheless " +
    "the authorities found you not guilty",
    "You committed the crime, or helped to do so, but nonetheless " +
    "the authorities found you not guilty",
    "You were nearly caught in the act. You had to flee and are " +
    "wanted in the community where the crime occurred.",
    "You were nearly caught in the act. You had to flee and are " +
    "wanted in the community where the crime occurred.",
    "You were caught and convicted. You spent time in jail, chained to an oar " +
    "or performing hard labor. You served a sentence of " +
    Math.ceil(Math.random() * 4) +" years, or succeeded in " +
    "escaping after that much time",
    "You were caught and convicted. You spent time in jail, chained to an oar " +
    "or performing hard labor. You served a sentence of " +
    Math.ceil(Math.random() * 4) +" years, or succeeded in " +
    "escaping after that much time",
    "You were caught and convicted. You spent time in jail, chained to an oar " +
    "or performing hard labor. You served a sentence of " +
    Math.ceil(Math.random() * 4) +" years, or succeeded in " +
    "escaping after that much time",
    "You were caught and convicted. You spent time in jail, chained to an oar " +
    "or performing hard labor. You served a sentence of " +
    Math.ceil(Math.random() * 4) +" years, or succeeded in " +
    "escaping after that much time",
  ];

  return puns[Math.floor(Math.random()*puns.length)];
}

function getSupernatural()
{
  var supChance = Math.floor(Math.random() * 100);
  var ret = "";

  if (supChance > 95)
  {
    ret = "You saw a portal that you believe leads " +
    "to another plane of existence.";
  } else if (supChance > 90)
  {
    ret = "You briefly visited the Feywild or the Shadowfell";
  } else if (supChance > 85)
  {
    ret = "A celestial or a fiend visited you in your dreams "+
    "to give a warning of dangers to come.";
  } else if (supChance > 80)
  {
    ret = "You saw a ghoul feeding on a corpse.";
  } else if (supChance > 75)
  {
    ret = "You saw a ghost.";
  } else if (supChance > 70)
  {
    var entities = [
      "a celestial",
      "a devil",
      "a demon",
      "a fey",
      "an elemental",
      "an undead",
    ];
    ret = "You were briefly possessed by " +
    entities[Math.floor(Math.random()*entities.length)] +".";
  } else if (supChance > 60)
  {
    ret = "You explored an empty house and found "+
    "it to be haunted.";
  } else if (supChance > 50)
  {
    ret = "You witnessed a minor miracle.";
  } else if (supChance > 40)
  {
    ret = "You escaped certain death and believe "+
    "it was the intervention of a god that saved you."
  } else if (supChance > 30)
  {
    ret = "You witnessed a falling red star, a face appearing in "+
          "the frost, or some other bizarre happening. You are "+
          "certain that it was an omen of some sort.";
  } else if (supChance > 20)
  {
    ret = "You visited a holy site and felt the presence of the" +
          " divine there.";
  } else if (supChance > 15)
  {
    ret = "You woke up one morning miles from your home, " +
          "with no idea how you got there.";
  } else if (supChance > 10)
  {
    var value = (Math.floor(Math.random()*20) + 50);
    ret = " A devil tempted you. Make a DC 10 Wisdom saving "+
          "throw. On a failed save, your alignment shifts one "+
          "step toward evil (if it‘s not evil already), and you "+
          "start the game with an additional " +
          value +"gp.";
  } else if (supChance > 5)
  {
    ret = "You saw a demon and ran away before it could do " +
          "anything to you.";
  } else {
    ret = "You were ensorcelled by a fey and enslaved for " +
           Math.ceil(Math.random()*6) + " years before you escaped.";
  }

  return ret;
}
function getArcane(){
  var arcanes = [
    "You were charmed or frightened by a spell",
    "You were injured by the effects of a spell",
    "You witnessed a powerful spell being cast by a cleric, a druid" +
    " a sorcerer, a warlock or a wizard",
    "You drank a potion (of the DM's choice)",
    "You found a *spell scroll* (of the DM's choice) and succeeded in casting "+
    "the spell it contained",
    "You were affected by teleportation magic",
    "You turned invisible for a time",
    "You identified an illusion for what it was",
    "You saw a creature being conjured by magic",
    "Your fortune was read by a diviner."
  ];

  return arcanes[(Math.floor(Math.random()*arcanes.length))];
}

function getLifeEvent()
{
  var eventChance = Math.floor(Math.random()*100);
  var ev = "";
  var adventurer = npc.hero();
  var commoner = npc.npc();
  if (eventChance > 95)
  {
    ev = getArcane();
  } else if (eventChance > 90)
  {
    ev = "You committed the crime of " + getCrime() + "\n" + getPunishment();
  } else if (eventChance > 85)
  {
    ev = "You fought in a battle. " + getWar();
  } else if (eventChance > 80)
  {
    ev = "You had a supernatural experience. " + getSupernatural();
  } else if (eventChance > 75)
  {
    ev = "You went on an adventure. " + getAdventure();
  } else if (eventChance > 70)
  {
    ev = "You met someone important. \n **Details**\n"+
    "*Age:* " +commoner.age +"\n"+
    "*Race:* "+commoner.race +"\n"+
    "*Occupation:* "+commoner.job +"\n"+
    "*Alignment:* "+commoner.alignment;
  } else if (eventChance > 50)
  {
    var value = Math.ceil(Math.random()*6)
    +Math.ceil(Math.random()*6);
    ev = "You spent time working on a job related to "+
    "your background. Start the game with an extra " + value + " gold.";
  } else if (eventChance > 40)
  {
    ev = "You made a friend of an adventurer.\n" +
          "\n **Details**\n"+
          "*Age:* " +adventurer.age +"\n"+
          "*Race:* "+adventurer.race +"\n"+
          "*Class:* "+adventurer.job +"\n"+
          "*Alignment:* "+adventurer.alignment;
  } else if (eventChance > 30)
  {
    ev = "You made an enemy of an adventurer.\n";
    if(Math.random() >= 0.5)
    {
      ev += "You are not to blame for this enmity.\n"
    }else {
      ev += "The rift is your fault.\n"
    }
     ev += "\n **Details**\n"+
     "*Age:* " +adventurer.age +"\n"+
     "*Race:* "+adventurer.race +"\n"+
     "*Class:* "+adventurer.job +"\n"+
     "*Alignment:* "+adventurer.alignment;
  } else if (eventChance > 20)
  {
    ev = "You fell in love or got married. If you get this result " +
          "more than once, you can choose to have a child instead.";
  } else if (eventChance > 10)
  {
    ev = getBoon();
  } else if (eventChance > 0)
  {
    ev = getTragedy();
  } else {
    ev = getWierd();
  }

  return ev;

}

function getAdventure(){
  var advChance = Math.floor(Math.random() * 100);
  var ret = "";

  if (advChance > 90)
  {
    var value = Math.ceil(Math.random()*20) + 50;
    ret = "You found a considerable amount of treasure on" +
          "your adventure. You have  "+ value
           +" gp left from" +
          "your share of it.";
  } else if (advChance > 80)
  {
    var value = Math.ceil(Math.random()*6) + Math.ceil(Math.random()*6);
    ret = "You found some treasure on your adventure. "+
          "You have "+ value
          + " gp left from your share of it.";
  }else if (advChance > 70)
  {
    ret = "You learned a great deal during your adventure. The next time "+
          "you make an ability check or a saving throw, "+
          "you have advantage on the roll.";
  }else if (advChance > 60)
  {
    ret = "You were terribly frightened by something you encountered "+
        "and ran away, abandoning your companions to their fate.";
  }else if (advChance > 50)
  {
    ret = "You lost something of sentimental value to you during your "+
    "adventure. Remove one trinket from your possessions.";
  }else if (advChance > 40)
  {
    ret = "You were poisoned by a trap or a monster. You recovered, "+
    "but the next time you must make a saving throw against poison, "+
    "you make the saving throw with disadvantage.";
  }else if (advChance > 30)
  {
    ret = "You contracted a disease while exploring a filthy warren. "+
    "You recovered from the disease, but you have a persistent cough,"+
    " pockmarks on your skin, or prematurely gray hair.";
  }else if (advChance > 20)
  {
    ret = "You were wounded, but in time you fully recovered.";
  }else if (advChance > 10)
  {
    ret = "You suffered a grievous injury. Although the wound healed, "+
      "it still pains you from time to time.";
  }else if (advChance > 80)
  {
    ret = "You nearly died. You have nasty scars on your body, "+
    "and you are missing an ear, " + Math.ceil(Math.random()*3) +
    "fingers, or " + Math.ceil(Math.random()*4) +" toes.";
  }
  else {
    ret = "You came across a common magic item (of the DM's choice)";
  }


  return ret;
}
function getTragedy(){
  var trags = [
    "A family member or a close friend died - " + death(),
    "A friendship ended bitterly, and the other person "+
    "is now hostile to you. The cause might have been a "+
    "misunderstanding or something you or the former " +
    "friend did.",
    "You lost all your possessions in a disaster, and you "+
    "had to rebuild your life.",
    "You were imprisoned for a crime you didn’t commit "+
    "and spent " + Math.ceil(Math.random()*6) +" years at "+
    "hard labor, in jail, or " +
    "shackled to an oar in a slave galley.",
    "War ravaged your home community, reducing everything "+
    "to rubble and ruin. in the aftermath, you "+
    "either helped your town rebuild or moved somewhere "+
    "else.",
    "A lover disappeared without a trace. You have been "+
    "looking for that person ever since.",
    "A terrible blight in your home community caused "+
    "crops to fail, and many starved. You lost a sibling "+
    "or some other family member.",
    "You did something that brought terrible shame to "+
    "you in the eyes ofyour family. You might have been "+
    "involved in a scandal, dabbled in dark magic, or "+
    "offended someone important. The attitude of your "+
    "family members toward you becomes indifferent at "+
    "best, though they might eventually forgive you.",
    "For a reason you were never told, you were exiled "+
    "from your community. You then either wandered in "+
    "the wilderness for a time or promptly found a new "+
    "place to live.",
  ];
  if (Math.random() >= 0.5)
  {
      trags.push("A romantic relationship ended with bad feelings");
  } else {
     trags.push("A romantic relationship ended amicably");
  }

  var deathres = death();
  if (deathres == "Murder")
  {
    if((Math.random() * 12 ) <= 1)
    {
      trags.push(
        "A current or prospective romantic partner of yours"+
        "was murdered. You were responsible, whether directly"+
        "orindirectly."
      );
    } else {
      trags.push(
        "A current or prospective romantic partner of yours"+
        "was murdered."
      );
    }
  } else {
    trags.push(
      "A current or prospective romantic partner of yours"+
      "died of " +deathres +"."
    );
  }
  return (trags[Math.floor(Math.random()*trags.length)]);
}

function getWierd(){

  var adventurer = npc.hero();
  var wierds = [
    "You were turned into a toad and remained in that "+
    "form for "+ Math.ceil(Math.random()*4) + " weeks.",
    "You were petrified and remained a stone statue for "+
    "a time until someone freed you.",
    "You were enslaved by a hag, a satyr, or some other "+
    "being and lived in that creature’s thrall for "+
     Math.ceil(Math.random()*6) + " years.",
    "A dragon held you as a prisoner for "+
    Math.ceil(Math.random()*4) +" months" +
    "until adventurers killed it.",
    "You were taken captive by a race of evil humanoids "+
    "such as drow, kuo-toa, or quaggoths. You lived as a "+
    "slave in the Underdark until you escaped.",
    "You served a powerful adventurer as a hireling. You "+
    "have only recently left that service.\n **Details**\n"+
    "*Age:* " +adventurer.age +"\n"+
    "*Race:* "+adventurer.race +"\n"+
    "*Class:* "+adventurer.job +"\n"+
    "*Alignment:* "+adventurer.alignment,
    "You went insane for " + Math.ceil(Math.random()*6) +
    " years and recently regained "+
    "your sanity. A tic or some other bit of odd" +
    "behavior might linger.",
    "A lover of yours was secretly a silver dragon.",
    "You were captured by a cult and nearly sacrificed "+
    "on an altar to the foul being the cultists served. "+
    "You escaped, but you fear they will find you.",
    "You met a demigod, an archdevil, an archfey, a demon "+
    "lord, or a titan, and you lived to tell the tale.",
    "You were swallowed by a giant fish and spent a "+
    "month in its gullet before you escaped.",
    "A powerful being granted you a wish, but you "+
    "squandered it on something frivolous.",
  ];

  return wierds[Math.floor(Math.random()*wierds.length)];
}
function getBoon(){
  var commoner = npc.npc();

  var boons = [
    "A friendly wizard gave you a spell scroll containing one cantrip (of the DM’s choice).",
    "You saved the life of a commoner, who now owes you a life debt. This individual" +
    "accompanies you on your travels and performs mundane tasks for you, but will leave if" +
    "neglected, abused, or imperiled. \n **Details**\n"+
    "*Age:* " +commoner.age +"\n"+
    "*Race:* "+commoner.race +"\n"+
    "*Occupation:* "+commoner.job +"\n"+
    "*Alignment:* "+commoner.alignment,
    "You found a riding horse.",
    "You found some money. You have 1d20 gp in addition to your regular starting funds.",
    "A relative bequeathed you a simple weapon of your choice.",
    "You found something interesting. You gain one additional trinket.",
    "You once performed a service for a local temple. The next time you visit the temple, you "+
    "can receive healing up to your hit point maximum.",
    "A friendly alchemist gifted you with a potion of healing or a flask of acid, as you choose.",
    "You found a treasure map.",
    "A distant relative left you a stipend that enables you to live at the comfortable lifestyle for " +
    Math.ceil(Math.random()*20) + " years. " +
    "If you choose to live at a higher lifestyle, you reduce the price of the lifestyle by"+
    "2 gp during that time period.",
  ];

  return (boons[Math.floor(Math.random() * boons.length)]);
}

function getWar()
{
  var wars = [
    "You were knocked out and left for dead. You woke up hours later with "+
    "no recollection of the battle.",
    "You were badly injured in the fight, and you still bear the awful scars " +
    "of those wounds.",
    "You were badly injured in the fight, and you still bear the awful scars " +
    "of those wounds.",
    "You ran away from the battle to save your life, but " +
    "you still feel shame for your cowardice.",
    "You suffered only minor injuries, and the wounds all healed "+
    "without leaving scars",
    "You suffered only minor injuries, and the wounds all healed "+
    "without leaving scars",
    "You suffered only minor injuries, and the wounds all healed "+
    "without leaving scars",
    "You survived the battle, but you suffer from terrible "+
    "nightmares in which you relive the experience.",
    "You survived the battle, but you suffer from terrible "+
    "nightmares in which you relive the experience.",
    "You escaped the battle unscathed, though many of "+
    "your Friends were injured or lost.",
    "You escaped the battle unscathed, though many of "+
    "your Friends were injured or lost.",
    "You acquitted yourselfwell in battle and are "+
    "remembered as a hero. You might have received a "+
    "medal for your bravery.",
  ];
  return(wars[Math.floor(Math.random()*wars.length)]);
}

module.exports.event = getLifeEvent;
module.exports.adventure = getAdventure;
module.exports.boon = getBoon;
