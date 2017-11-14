  var race;
  var power;
  var background;
  var age;
  var lifeEventCount;

  var genStatics = function(values)
  {
    race = null;
    power = null;
    background = null;
    age = -1;


    var outstr = "**Race:**";

    var races = ["Human", "Elf", "Half-Elf",
    "Dwarf", "Tiefling", "Dragonborn",
     "Bugbear","Halfling","Orc", "Half-Orc", "Aarakocra",
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
      age = genAge();
    }
    setLifeEvents();
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
    var childhood = getChildhood();
    var siblings = getSiblings();
    var outstr =  "\n**Class:** " + power + "\n"+
                  "**Race:** " + race + "\n" +
                  "**Age:** " + age +"\n"+
                  "**Background:** " + background + "\n" +
                  "**Parents:** " + getParents() +"\n" +
                  "**Birthplace:** " + birthplace() +"\n"+
                  "**Siblings:** " + siblings.count +"\n"+
                  "**Raised By:** " + childhood.raisedBy +"\n"+
                  "**Childhood Home:** " + childhood.home +"\n"+
                  "**Childhood Lifestyle:** " + childhood.lifestyle +"\n"+
                  "\n*I became " + bgArticle + " " + background + " because ...* " + backgroundHistory() + "\n"+
                  "\n*I became a " + power + " because ...* " + classHistory() + "\n"+
                  "\n";

                  if(lifeEventCount > 0)
                  {
                    outstr += "\n**Life Events**  + ("+ lifeEventCount + ")\n\n";

                    for (var i = 0; i< lifeEventCount; i++)
                    {
                      outstr += getLifeEvent() +"\n\n";
                    }
                  }
                  if (siblings.count > 0)
                  {
                    outstr += "\n**Siblings Details**\n\n";
                    for (var i = 0; i < siblings.details.length; i++)
                    {
                      outstr += "Sibling " + (i +1) +":\n"+
                                "**Alignment:** " +siblings.details[i].alignment+"\n" +
                                "**Occupation:** " +siblings.details[i].occupation+"\n"+
                                "**Status:** " +siblings.details[i].status+"\n"+
                                "**Relationship**: " +siblings.details[i].relationship + " to you\n\n";
                    }
                    outstr += "\n\n";
                  }
    return (outstr);
    /*TODO Age
      Life Events
      siblings
      fmily details
    */
}

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
    ret = " A devil tempted you. Make a DC 10 Wisdom saving "+
          "throw. On a failed save, your alignment shifts one "+
          "step toward evil (if it‘s not evil already), and you "+
          "start the game with an additional " +
          Math.floor(Math.random()*20) + 50 +"gp.";
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
  var adventurer = getAdventurer();
  var commoner = getIndividual();
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
    ev = "You spent time working on a job related to "+
    "your background. Start the game with an extra " +Math.ceil(Math.random()*6)
    +Math.ceil(Math.random()*6) + " gold.";
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
    ev = "You gained a bit of good fortune. " +getBoon();
  } else if (eventChance > 0)
  {
    ev = "You suffered a tragedy. " +getTragedy();
  } else {
    ev = "Something truly strange happened to you. " + getWierd();
  }

  return ev;

}

function getAdventure(){
  var advChance = Math.floor(Math.random() * 100);
  var ret = "";

  if (advChance > 90)
  {
    ret = "You found a considerable amount of treasure on" +
          "your adventure. You have  "+
          Math.ceil(Math.random()*20) + 50 +" gp left from" +
          "your share of it.";
  } else if (advChance > 80)
  {
    ret = "You found some treasure on your adventure. "+
          "You have "+ Math.ceil(Math.random()*6) + Math.ceil(Math.random()*6)
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
    "A current or prospective romantic partner ofyours"+
    "died. Roll on the Cause of Death supplemental"+
    "table to find out how. lf the result is murder, roll a"+
    "d12. On a 1, you were responsible, whether directly"+
    "orindirectly.",
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

  var adventurer = getAdventurer();
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
}
function getBoon(){
  var commoner = getIndividual();

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

function getIndividual()
{
  ret = {};
  ret.age =genAge();
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
function getAdventurer()
{
  var adv = getIndividual();
  adv.job = getClass();

  return adv;
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

function genAge()
{
  var ageChance = Math.ceil(Math.random()*100);
  var nuAge;

  if (ageChance == 100)
  {
    nuAge = 61 + Math.floor(Math.random()*22);
  } else if (ageChance > 89)
  {
    nuAge = 51 + Math.floor(Math.random()*10);
  } else if (ageChance > 69)
  {
    nuAge = 41 + Math.floor(Math.random()*10);
  } else if (ageChance > 59)
  {
    nuAge = 31 + Math.floor(Math.random()*10);
  } else if (ageChance > 20)
  {
    nuAge = 21 + Math.floor(Math.random()*10);
  } else {
    nuAge = 15 + Math.floor(Math.random()*5);
  }

  return nuAge;
}

function setLifeEvents()
{
  if (age >= 61)
  {
    lifeEventCount = (Math.ceil(Math.random()*12));
  } else if (age >= 51)
  {
    lifeEventCount = (Math.ceil(Math.random()*10));
  } else if (age >= 41)
  {
    lifeEventCount = (Math.ceil(Math.random()*8));
  } else if (age >= 31)
  {
    lifeEventCount = (Math.ceil(Math.random()*6));
  } else if (age >= 21)
  {
    lifeEventCount = (Math.ceil(Math.random()*4));
  } else {
    lifeEventCount = 1;
  }
}
var classHistory = function()
{
  var ch = {"Barbarian":
  [
    "My devotion to my people lifted me in battle, making me powerful and dangerous.",
    "The spirits of my ancestors called on me to carry out a great task.",
    "I lost control in battle one day, and it was as if something else was manipulating my body, " +
    "forcing it to kill every foe I could reach.",
    "I went on a spiritual journey to find myself and instead found a spirit animal to guide, protect, " +
    "and inspire me.",
    "I was struck by lightning and lived. Afterward, I found a new strength within me that let me "+
    "push beyond my limitations.",
    "My anger needed to be channeled into battle, or I risked becoming an indiscriminate killer. ",
  ],
  "Bard":
  [
    "I awakened my latent bardic abilities through trial and error.",
    "I was a gifted performer and attracted the attention of a master bard who schooled me in the "+
    "old techniques.",
    "I joined a loose society of scholars and orators to learn new techniques of performance and "+
    "magic.",
    "I felt a calling to recount the deeds of champions and heroes, to bring them alive in song and "+
    "story.",
    "I joined one of the great colleges to learn old lore, the secrets of magic, and the art of "+
    "performance.",
    "I picked up a musical instrument one day and instantly discovered that I could play it. ",
  ],
  "Cleric":
  [
    "A supernatural being in service to the gods called me to become a divine agent in the world.",
    "I saw the injustice and horror in the world and felt moved to take a stand against them.",
    "My god gave me an unmistakable sign. I dropped everything to serve the divine.",
    "Although I was always devout, it wasn’t until I completed a pilgrimage that I knew my true " +
    "calling.",
    "I used to serve in my religion’s bureaucracy but found I needed to work in the world, to bring "+
    "the message of my faith to the darkest corners of the land.",
    "I realize that my god works through me, and I do as commanded, even though I don’t know "+
    "why I was chosen to serve. ",
  ],

  "Druid":
  [
    "I saw too much devastation in the wild places, too much of nature’s splendor ruined by the",
    "despoilers. I joined a circle of druids to fight back against the enemies of nature.",
    "I found a place among a group of druids after I fled a catastrophe.",
    "I have always had an affinity for animals, so I explored my talent to see how I could best use "+
    "it.",
    "I befriended a druid and was moved by druidic teachings. I decided to follow my friend’s "+
    "guidance and give something back to the world.",
    "While I was growing up, I saw spirits all around me — entities no one else could perceive. I "+
    "sought out the druids to help me understand the visions and communicate with these beings.",
    "I have always felt disgust for creatures of unnatural origin. For this reason, I immersed "+
    "myself in the study of the druidic mysteries and became a champion of the natural order. ",
  ],
  "Fighter":
  [
    "I wanted to hone my combat skills, and so I joined a war college.",
    "I squired for a knight who taught me how to fight, care for a steed, and conduct myself with "+
    "honor. I decided to take up that path for myself.",
    "Horrible monsters descended on my community, killing someone I loved. I took up arms to "+
    "destroy those creatures and others of a similar nature.",
    "I joined the army and learned how to fight as part of a group.",
    "I grew up fighting, and I refined my talents by defending myself against people who crossed "+
    "me.",
    "I could always pick up just about any weapon and know how to use it effectively.",
  ],
  "Monk":
  [
    "I was chosen to study at a secluded monastery. There, I was taught the fundamental "+
    "techniques required to eventually master a tradition.",
    "I sought instruction to gain a deeper understanding of existence and my place in the world.",
    "I stumbled into a portal to the Shadowfell and took refuge in a strange monastery, where I "+
    "learned how to defend myself against the forces of darkness.",
    "I was overwhelmed with grief after losing someone close to me, and I sought the advice of "+
    "philosophers to help me cope with my loss.",
    "I could feel that a special sort of power lay within me, so I sought out those who could help "+
    "me call it forth and master it.",
    "I was wild and undisciplined as a youngster, but then I realized the error of my ways. I "+
    "applied to a monastery and became a monk as a way to live a life of discipline. ",
  ],
  "Paladin":
  [
    "A fantastical being appeared before me and called on me to undertake a holy quest.",
    "One of my ancestors left a holy quest unfulfilled, so I intend to finish that work.",
    "The world is a dark and terrible place. I decided to serve as a beacon of light shining out "+
    "against the gathering shadows.",
    "I served as a paladin’s squire, learning all I needed to swear my own sacred oath.",
    "Evil must be opposed on all fronts. I feel compelled to seek out wickedness and purge it from "+
    "the world.",
    "Becoming a paladin was a natural consequence of my unwavering faith. In taking my vows, I "+
    "became the holy sword of my religion. ",
  ],
  "Ranger":
  [
    "I found purpose while I honed my hunting skills by bringing down dangerous animals at the "+
    "edge of civilization.",
    "I always had a way with animals, able to calm them with a soothing word and a touch.",
    "I suffer from terrible wanderlust, so being a ranger gave me a reason not to remain in one "+
    "place for too long.",
    "I have seen what happens when the monsters come out from the dark. I took it upon myself",
    "to become the first line of defense against the evils that lie beyond civilization’s borders.",
    "I met a grizzled ranger who taught me woodcraft and the secrets of the wild lands.",
    "I served in an army, learning the precepts of my profession while blazing trails and scouting "+
    "enemy encampments. ",
  ],
  "Rogue":[
    "I’ve always been nimble and quick of wit, so I decided to use those talents to help me make "+
    "my way in the world.",
    "An assassin or a thief wronged me, so I focused my training on mastering the skills of my "+
    "enemy to better combat foes of that sort.",
    "An experienced rogue saw something in me and taught me several useful tricks.",
    "I decided to turn my natural lucky streak into the basis of a career, though I still realize that "+
    "improving my skills is essential.",
    "I took up with a group of ruffians who showed me how to get what I want through sneakiness "+
    "rather than direct confrontation.",
    "I’m a sucker for a shiny bauble or a sack of coins, as long as I can get my hands on it without "+
    "risking life and limb. ",
  ],
  "Sorcerer":
  [
    "When I was born, all the water in the house froze solid, the milk spoiled, or all the iron turned " +
    "to copper. My family is convinced that this event was a harbinger of stranger things to come "+
    "for me.",
    "I suffered a terrible emotional or physical strain, which brought forth my latent magical "+
    "power. I have fought to control it ever since.",
    "My immediate family never spoke of my ancestors, and when I asked, they would change "+
    "the subject. It wasn’t until I started displaying strange talents that the full truth of my heritage "+
    "came out.",
    "When a monster threatened one of my friends, I became filled with anxiety. I lashed out "+
    "instinctively and blasted the wretched thing with a force that came from within me.",
    "Sensing something special in me, a stranger taught me how to control my gift.",
    "After I escaped from a magical conflagration, I realized that though I was unharmed, I was "+
    "not unchanged. I began to exhibit unusual abilities that I am just beginning to understand. ",
  ],
  "Warlock":
  [
    "While wandering around in a forbidden place, I encountered an otherworldly being that "+
    "offered to enter into a pact with me.",
    "I was examining a strange tome I found in an abandoned library when the entity that would "+
    "become my patron suddenly appeared before me.",
    "I stumbled into the clutches of my patron after I accidentally stepped through a magical "+
    "doorway.",
    "When I was faced with a terrible crisis, I prayed to any being who would listen, and the "+
    "creature that answered became my patron.",
    "My future patron visited me in my dreams and offered great power in exchange for my "+
    "service.",
    "One of my ancestors had a pact with my patron, so that entity was determined to bind me to "+
    "the same agreement. ",
  ],
  "Wizard":
  [
    "An old wizard chose me from among several candidates to serve an apprenticeship. ",
    "When I became lost in a forest, a hedge wizard found me, took me in, and taught me the "+
    "rudiments of magic.",
    "I grew up listening to tales of great wizards and knew I wanted to follow their path. I strove to "+
    "be accepted at an academy of magic and succeeded.",
    "One of my relatives was an accomplished wizard who decided I was smart enough to learn "+
    "the craft.",
    "While exploring an old tomb, library, or temple, I found a spellbook. I was immediately driven "+
    "to learn all I could about becoming a wizard.",
    "I was a prodigy who demonstrated mastery of the arcane arts at an early age. When I "+
    "became old enough to set out on my own, I did so to learn more magic and expand my "+
    "power. ",
  ],
};
  return(ch[power][Math.floor(Math.random()*ch[power].length)]);
}

var backgroundHistory = function(){
  var bh = {

    "Acolyte":[
      "I ran away from home at an early age and found refuge in a temple.",
      "My family gave me to a temple, since they were unable or unwilling to care for me.",
      "I grew up in a household with strong religious convictions. Entering the service of one or " +
      "more gods seemed natural.",
      "An impassioned sermon struck a chord deep in my soul and moved me to serve the faith.",
      "I followed a childhood friend, a respected acquaintance, or someone I loved into religious " +
      "service.",
      "After encountering a true servant of the gods, I was so inspired that I immediately entered " +
      "the service of a religious group.",
    ],
    "Charlatan":[
      "I was left to my own devices, and my knack for manipulating others helped me survive.",
      "I learned early on that people are gullible and easy to exploit.",
      "I often got in trouble, but I managed to talk my way out of it every time.",
      "I took up with a confidence artist, from whom I learned my craft.",
      "After a charlatan fleeced my family, I decided to learn the trade so I would never be fooled by" +
      " such deception again.",
      "I was poor or I feared becoming poor, so I learned the tricks I needed to keep myself out of "+
      "poverty.",
    ],

    "Criminal":[
      "I resented authority in my younger days and saw a life of crime as the best way to fight"+
      " against tyranny and oppression.",
      "Necessity forced me to take up the life, since it was the only way I could survive.",
      "I fell in with a gang of reprobates and ne’er-do-wells, and I learned my specialty from them.",
      "A parent or relative taught me my criminal specialty to prepare me for the family business.",
      "I left home and found a place in a thieves’ guild or some other criminal organization.",
      "I was always bored, so I turned to crime to pass the time and discovered I was quite good at it.",
    ],
    "Entertainer":[
      "Members of my family made ends meet by performing, so it was fitting for me to follow their" +
      " example.",
      "I always had a keen insight into other people, enough so that I could make them laugh or cry" +
      " with my stories or songs.",
      "I ran away from home to follow a minstrel troupe.",
      "I saw a bard perform once, and I knew from that moment on what I was born to do.",
      "I earned coin by performing on street corners and eventually made a name for myself.",
      "A traveling entertainer took me in and taught me the trade.",
    ],

    "Folk Hero" : [
      "I learned what was right and wrong from my family.",
      "I was always enamored by tales of heroes and wished I could be something more than " +
      "ordinary.",
      "I hated my mundane life, so when it was time for someone to step up and do the right thing, I "+
      "took my chance.",
      "A parent or one of my relatives was an adventurer, and I was inspired by that person’s "+
      "courage.",
      "A mad old hermit spoke a prophecy when I was born, saying that I would accomplish great "+
      "things.",
      "I have always stood up for those who are weaker than I am. ",
    ],

    "Guild Artisan":
    [
      "I was apprenticed to a master who taught me the guild’s business.",
      "I helped a guild artisan keep a secret or complete a task, and in return I was taken on as an " +
      "apprentice.",
      "One of my family members who belonged to the guild made a place for me.",
      "I was always good with my hands, so I took the opportunity to learn a trade.",
      "I wanted to get away from my home situation and start a new life.",
      "I learned the essentials of my craft from a mentor but had to join the guild to finish my "+
      "training. ",
    ],

    "Hermit":
    [
      "My enemies ruined my reputation, and I fled to the wilds to avoid further disparagement.",
      "I am comfortable with being isolated, as I seek inner peace.",
      "I never liked the people I called my friends, so it was easy for me to strike out on my own.",
      "I felt compelled to forsake my past, but did so with great reluctance, and sometimes I regret "+
      "making that decision.",
      "I lost everything — my home, my family, my friends. Going it alone was all I could do.",
      "Society’s decadence disgusted me, so I decided to leave it behind.",
    ],
    "Noble":
    [
      "I come from an old and storied family, and it fell to me to preserve the family name.",
      "My family has been disgraced, and I intend to clear our name.",
      "My family recently came by its title, and that elevation thrust us into a new and strange world.",
      "My family has a title, but none of my ancestors have distinguished themselves since we "+
      "gained it.",
      "My family is filled with remarkable people. I hope to live up to their example.",
      "I hope to increase my family’s power and influence.",
    ],
    "Outlander":
    [
      "I spent a lot of time in the wilderness as a youngster, and I came to love that way of life.",
      "From a young age, I couldn’t abide the stink of the cities and preferred to spend my time in " +
      "nature.",
      "I came to understand the darkness that lurks in the wilds, and I vowed to combat it.",
      "My people lived on the edges of civilization, and I learned the methods of survival from my "+
      "family.",
      "After a tragedy I retreated to the wilderness, leaving my old life behind.",
      "My family moved away from civilization, and I learned to adapt to my new environment. ",
    ],
    "Sage":
    [
      "I was naturally curious, so I packed up and went to a university to learn more about the "+
      "world.",
      "My mentor’s teachings opened my mind to new possibilities in that field of study.",
      "I was always an avid reader, and I learned much about my favorite topic on my own.",
      "I discovered an old library and pored over the texts I found there. That experience awakened " +
      "a hunger for more knowledge.",
      "I impressed a wizard who told me I was squandering my talents and should seek out an "+
      "education to take advantage of my gifts.",
      "One of my parents or a relative gave me a basic education that whetted my appetite, and I "+
      "left home to build on what I had learned. ",
    ],
    "Sailor":
    [
      "I was press-ganged by pirates and forced to serve on their ship until I finally escaped.",
      "I wanted to see the world, so I signed on as a deckhand for a merchant ship.",
      "One of my relatives was a sailor who took me to sea.",
      "I needed to escape my community quickly, so I stowed away on a ship. When the crew "+
      "found me, I was forced to work for my passage.",
      "Reavers attacked my community, so I found refuge on a ship until I could seek vengeance.",
      "I had few prospects where I was living, so I left to find my fortune elsewhere. ",
    ],
    "Soldier":
    [
      "I joined the militia to help protect my community from monsters.",
      "A relative of mine was a soldier, and I wanted to carry on the family tradition.",
      "The local lord forced me to enlist in the army.",
      "War ravaged my homeland while I was growing up. Fighting was the only life I ever knew.",
      "I wanted fame and fortune, so I joined a mercenary company, selling my sword to the "+
      "highest bidder.",
      "Invaders attacked my homeland. It was my duty to take up arms in defense of my people. ",
    ],
    "Urchin":
    [
      "Wanderlust caused me to leave my family to see the world. I look after myself.",
      "I ran away from a bad situation at home and made my own way in the world.",
      "Monsters wiped out my village, and I was the sole survivor. I had to find a way to survive.",
      "A notorious thief looked after me and other orphans, and we spied and stole to earn our "+
      "keep.",
      "One day I woke up on the streets, alone and hungry, with no memory of my early childhood.",
      "My parents died, leaving no one to look after me. I raised myself. ",
    ],
  };

  console.log(bh[background]);
  console.log(bh[background][0]);
  return(bh[background][Math.floor(Math.random()*bh[background].length)]);
}
var getSiblings = function()
{
  var sibRoll = Math.ceil(Math.random()*10);
  var sibs = [
    0,
    0,
    Math.ceil(Math.random()*3),
    Math.ceil(Math.random()*3),
    Math.ceil(Math.random()*4) + 1,
    Math.ceil(Math.random()*4) + 1,
    Math.ceil(Math.random()*6) + 2,
    Math.ceil(Math.random()*6) + 2,
    Math.ceil(Math.random()*8) + 3,
    Math.ceil(Math.random()*8) + 3,
  ]
  console.log(sibs);
  console.log(sibRoll);
  var sibCount = 0;
  if (race == "Elf" || race == "Dwarf")
  {
    sibRoll -= 2;
  }
  if(sibRoll <= 2)
  {
    sibCount = 0;
  } else {
    sibCount = sibs[sibRoll-1];
  }

  var sibList = [];
  for (var i = 0; i < sibCount; i++)
  {
    sibList.push(genSib());
  }
  //TO DO, generate Sibling Details
  //TO DO, Birth Order
  return {count:sibCount, details:sibList};
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
    job = "CLeric";
  }else if (jobChance > 7)
  {
    job = "Bard";
  }else
  {
    job = "Barbarian";
  }

  return job;
}

function getRelationship()
{
  var rels = [
    "Hostile",
    "Hostile",
    "Friendly",
    "Friendly",
    "Friendly",
    "Friendly",
    "Friendly",
    "Friendly",
    "Indifferent",
    "Indifferent",
  ];

  return (rels[Math.floor(Math.random()*rels.length)]);
}

function getStatus()
{
  var statii = [
    "Dead - " + death(),
    "Missing or unknown",
    "Missing or unknown",
    "Alive, but doing poorly due to injury, "+
    "financial trouble, or relationship difficulties",
    "financial trouble, or relationship difficulties",
    "financial trouble, or relationship difficulties",
    "Alive and well",
    "Alive and well",
    "Alive and well",
    "Alive and well",
    "Alive and quite successful",
    "Alive and quite successful",
    "Alive and quite successful",
    "Alive and infamous",
    "Alive and infamous",
    "Alive and famous"
  ];

  console.log(statii);
  return (statii[Math.floor(Math.random()*statii.length)]);
}
var genSib = function()
{
    var ret = {};
    ret.occupation = getOccupation();
    ret.alignment = getAlignment();
    ret.relationship = getRelationship();
    ret.status = getStatus();
    return ret;
}

var absentParent = function(both)
{
  var parentChance = Math.ceil(Math.random()*4);
  var txt = "";

  switch(parentChance)
  {
    case 1:
      txt = " died of " + death().toLowerCase();
    break;
    case 2:
      if(both)
      {
          txt = " were imprisoned, enslaved or otherwise taken away.";
      }
      else {
        txt = " was imprisoned, enslaved or otherwise taken away.";
      }
    break;
    case 3:
      txt = " abandoned you.";
    break;
    case 4:
      txt = " disappeared to an unknown fate."
    break;
  }

  return txt;
}

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

var getChildhood = function()
{
    var familyChance = Math.random();
    var family = "";
    var famchoices =
    [
      "None",
      "Institution, such as an asylum",
      "Temple",
      "Orphanage",
      "Orphanage",
      "Guardian",
      "Guardian",
    ];
    if (familyChance > 0.75)
    {
      family = "Mother and father";
    }
    else if (familyChance > 0.55){
      family = "Single mother or stepmother\n" +
      "Your father " + absentParent(false);
    }
    else if (familyChance > 0.35){
      family = "Single father or stepfather\n" +
      "Your mother " + absentParent(false);
    }
    else if (familyChance > 0.25){
      family = "Adoptive family (same or different race)\n"+
      "Your parents " + absentParent(true);
    }
    else if (familyChance > 0.15){
      family = "Paternal or maternal grandparent(s)\n" +
      "Your parents " + absentParent(true);
    }
    else if (familyChance > 0.07){
      family = "Paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan\n"+
      "Your parents " + absentParent(true);
    }
    else {
      family = famchoices[Math.floor(Math.random()*famchoices.length)];
      family += "\nYour parents " + absentParent(true);
    }

    var lifestyles = [
      "Wretched",
      "Wretched",
      "Wretched",
      "Squalid",
      "Squalid",
      "Poor",
      "Poor",
      "Poor",
      "Modest",
      "Modest",
      "Modest",
      "Modest",
      "Comfortable",
      "Comfortable",
      "Comfortable",
      "Wealthy",
      "Wealthy",
      "Aristocratic"
    ];
    var lifestylemods = [
      -40,
      -40,
      -40,
      -20,
      -20,
      -10,
      -10,
      -10,
      +0,
      +0,
      +0,
      +0,
      +10,
      +10,
      +10,
      +20,
      +20,
      +40,
    ];
    var lifestyleChance = Math.floor(Math.random()*lifestyles.length);
    var lifestyle = lifestyles[lifestyleChance];
    var homeMod = lifestylemods[lifestyleChance];
    //TODO Absent Parents
    homeMod += (Math.ceil(Math.random()*100));
    var home = null;

    if (homeMod >= 111)
    {
      home = "Palace or castle";
    } else if (homeMod > 90)
    {
      home = "Mansion";
    }else if (homeMod > 70)
    {
      home = "Large house";
    }else if (homeMod > 50)
    {
      home = "Small House";
    }else if (homeMod > 40)
    {
      home = "Apartment in a rundown neighborhood";
    }else if (homeMod > 30)
    {
      home = "Encampment or village in the wilderness";
    }else if (homeMod > 20)
    {
      home = "No Permanent residence; you moved around a lot";
    }else if (homeMod > 0)
    {
      home = "Rundown Shack";
    }else
    {
      home = "On the streets";
    }

    //todo childhood memories
    return {raisedBy: family, home:home, lifestyle:lifestyle};


}

var getParents = function()
{
  var parents = Math.random() > 0.95 ?
  "You do not know who your parents were" :
  "You know who your parents are or were" ;

  if(race == "Half-Elf")
  {
      var helf = [
        "\nOne parent was an elf, and the other was a half-elf",
        "\nOne parent was a human, and the other was a half-elf",
        "\nBoth parents were half-elves",
      ]
      if (Math.ceil(Math.random() * 8) < 6)
      {
        parents += "\nOne of your parents was an elf, the other a human";
      }
      else
      {
        parents += helf[Math.floor(Math.random()*helf.length)];
      }
  }
  if(race == "Half-Orc")
  {
      var horc = [
        "\nOne of your parents was an orc, the other was a human",
        "\nOne of your parents was an orc, the other was a human",
        "\nOne of your parents was an orc, the other was a human",
        "\nOne of your parents was an orc, the other was a half-orc",
        "\nOne of your parents was an orc, the other was a half-orc",
        "\nOne of your parents was an human, the other was a half-orc",
        "\nOne of your parents was an human, the other was a half-orc",
        "\nBoth parents were half-orcs",
      ]
      parents += horc[Math.floor(Math.random()*horc.length)];
  }
  if(race == "Tiefling")
  {
      var torc = [
        "\nBoth parents were humans, their infernal heritage dormant until you came along.",
        "\nBoth parents were humans, their infernal heritage dormant until you came along.",
        "\nBoth parents were humans, their infernal heritage dormant until you came along.",
        "\nBoth parents were humans, their infernal heritage dormant until you came along.",
        "\nOne parent was a tiefling and the other was a human",
        "\nOne parent was a tiefling and the other was a human",
        "\nOne parent was a tiefling and the other was a devil",
        "\nOne parent was a human and the other was a devil",
      ]
      parents += torc[Math.floor(Math.random()*torc.length)];
  }
  console.log(parents);

  return parents;
}

var birthplace = function()
{
  var born = null;
  var locs = [
    "Carriage, cart or wagon",
    "Carriage, cart or wagon",
    "Barn, shed, or other outbuilding",
    "Barn, shed, or other outbuilding",
    "Cave",
    "Cave",
    "Field",
    "Field",
    "Forest",
    "Forest",
    "Temple",
    "Temple",
    "Battlefield",
    "Alley or street",
    "Alley or street",
    "Brothel, tavern or inn",
    "Brothel, tavern or inn",
    "Castle, keep, tower or palace",
    "Castle, keep, tower or palace",
    "Sewer or rubbish heap",
    "Among people of a different race",
    "Among people of a different race",
    "On board a boat or a ship",
    "On board a boat or a ship",
    "In a prison, or the headquarters of a secret organization",
    "In a prison, or the headquarters of a secret organization",
    "In a sage's laboratory",
    "In a sage's laboratory",
    "In the Feywild",
    "In the Shadowfell",
    "On the Astral or Ethereal Planes",
    "On an Inner Plane of your choice",
    "On an Outer Plane of your choice",
  ]
  var bchance = Math.random();
  if (bchance <= 0.5)
  {
    born = "Home";
  }
  else if (bchance <= 0.55)
  {
    born = "Home of a family friend";
  }
  else if (bchance <= 0.63)
  {
    born = "Home of a healer or midwife";
  }
  else {
    born = locs[Math.floor(Math.random()*locs.length)];
  }

  return born;
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

module.exports = genStatics;
