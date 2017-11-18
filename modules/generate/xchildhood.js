var death = require('./xdeath.js');

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

var getParents = function(race)
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

module.exports.childhood = getChildhood;
module.exports.parents   = getParents;
module.exports.birthplace = birthplace;
