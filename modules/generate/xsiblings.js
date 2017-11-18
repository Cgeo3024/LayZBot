var xnpc     = require('./xnpc.js');
var xdeaths  = require('./xdeath.js');

var getSiblings = function(race)
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
  //console.log(sibs);
  //console.log(sibRoll);
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
    "Dead - " + xdeaths(),
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

  //console.log(statii);
  return (statii[Math.floor(Math.random()*statii.length)]);
}
var genSib = function()
{
    var ret = xnpc.npc();
    ret.relationship = getRelationship();
    ret.status = getStatus();
    return ret;
}

module.exports = getSiblings;
