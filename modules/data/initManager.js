var lookup = require('./lookups.js');
var inits = [];
var entities = [];
var orderedInits = [];

var set = false;
var loaded = false;
var ordered = false;
// resets the init bonuses
var forgetInit = function(callback){
  set = false;
  loaded = false;
  ordered = false;
  orderedInits = [];
  inits = [];
}

var initInit = function(callback){
  inits = [];
  entities = [];
  lookup.everyone(null, function(result, err){
    console.log ("Lookup values:");
    console.log(result);
    console.log(err);
    for (var i =0; i < result.length; i++)
    {
      entities.push({user:result[i][0], name:result[i][1], bonus:result[i][3]});
    }
    loaded = true;
    console.log("Finished loading all inits");
    console.log(inits);
    callback(true);
  });
}

function random20(){
  return (Math.floor(Math.random() * 20) + 1);
}


var rollOneChar = function(name, callback){

  var i = inits.findIndex(init => init.name.toLowerCase() == name.toLowerCase());
  console.log(i + " Is the location of " + name + " in :\n");
  console.log(inits);
  // if we can't find this user check character names
  if (i > -1){
    var roll = random20();
    inits[i].init = roll + (parseInt(inits[i].bonus) || 0);
    inits[i].roll = roll;
    callback({roll: roll, bonus: inits[i].bonus})
  }
  callback(null);
}

// rolls the init values of the calling player
var rollOneUser = function(user, callback){
  // look for the user

  var i = inits.findIndex(init => init.user.toLowerCase() == user.toLowerCase());
  console.log(i + " Is the location of " + user + " in :\n");
  console.log(inits);
  // if we can't find this user check character names

  if (i > -1){
    var roll = random20();
    inits[i].init = roll + (parseInt(inits[i].bonus) || 0);
    inits[i].roll = roll;
    callback({roll: roll, bonus: inits[i].bonus})
    return 0;
  }

  rollOneChar(user, callback);

}

// rolls the init values of all players
var rollAll = function(deep, callback){
  forgetInit();
  loaded = true;
  set = true;
  //if(!loaded || deep){
    initInit(function(r){
      console.log("Rerolled for entitites");
      console.log(entities);
      for (var i = 0; i < entities.length; i++)
      {
        var e = {user:entities[i].user, name:entities[i].name};
        var roll = random20();

        e.roll = roll;
        e.bonus = parseInt(entities[i].bonus) ? entities[i].bonus : "+0";
        e.init = roll + parseInt(e.bonus);
        inits.push(e);
      }
      console.log("Finished rolling inits from the rollAll function -- fresh");
      console.log(inits);
      callback(true);

    });
}

var orderInits = function(){
  for (var i = 0; i < inits.length; i++)
  {
    var j = 0;

    // any players *not* participating should be listed last
    if (inits[i].init == null)
    {
      orderedInits.push(inits[i]);
      continue;
    }

    for(; j < orderedInits.length; j++)
    {
      if (orderedInits[j].init == null){
        break;
      }
      if (parseInt(inits[i].init) > parseInt(orderedInits[j].init)){
        break;
      }
      // randomly positions this element relative to the one with identical initiative
      if (parseInt(inits[i].init) == parseInt(orderedInits[j].init)){
        j += Math.floor(Math.random() * 2);
        break;
      }
    }

    orderedInits.splice(j, 0, inits[i]);
  }
  ordered = true;
  return true;
}

var insert = function(name, bonus, callback)
{
  console.log("adding new Entity");
  for (var i = 0; i < inits.length; i++)
  {
    if (inits[i].name.toLowerCase() == name.toLowerCase())
    {
      callback(-1);
      return;
    }
  }

  var roll = random20();
  var nuBonus = parseInt(bonus) ? bonus : "+0";
  var total = parseInt(nuBonus) + roll;
  inits.push({name: name, roll: roll, init:total, bonus:nuBonus, user:"LayZ" })

  if (ordered)
  {
    insertIntoPreOrdered({name: name, roll: roll, init:total, bonus:nuBonus, user:"LayZ"})
  }
  callback(0);
}

var insertIntoPreOrdered = function(entity)
{
  var j = 0;
  for(; j < orderedInits.length; j++)
  {
    if (orderedInits[j].init == null){
      break;
    }
    if (entity.init > parseInt(orderedInits[j].init)){
      break;
    }
    // randomly positions this element relative to the one with identical initiative
    if (entity.init == parseInt(orderedInits[j].init)){
      j += Math.floor(Math.random() * 2);
      break;
    }
  }

  orderedInits.splice(j, 0, entity);
}


/*
* Replaces existing roll in ordered inits with argVals
* Returns error codes:
* 0 when no error
* 1 when inits are not currently set
* 2 when selected name is not found
*/
var overwrite = function(name, roll, callback){
  if(!set)
  {
    callback(1);
    return;
  }
  var entity;
  var overwrote = false;
  var j = 0;
  for(; j < orderedInits.length; j++)
  {
    if (orderedInits[j].name.toLowerCase() == name.toLowerCase()){
      orderedInits[j].roll = roll;
      orderedInits[j].init = (parseInt(roll) || 0) + parseInt(orderedInits[j].bonus);
      overwrote = true;
      entity = orderedInits.splice(j,1)[0];
    }

  }

  if (overwrote)
  {
    insertIntoPreOrdered(entity);
  }

  callback(overwrote ? 0 : 2);
}

//returns the current init values
var recallRolls = function(callback){
  // we want the rolls to be ordered by initiative for readability
  // return an error signifying 'null' when we have no users
  if (!set) {
    console.log("Returning Null");
    callback(null);
    return -1;
  }
  if (inits.length < 0){
    callback(null);
    return -1;
  }

  if (!ordered)
  {
    orderInits();
    ordered = true;
  }
  callback(orderedInits);

}

exports.clearInit = forgetInit;
exports.overwrite = overwrite;
exports.insert = insert;
exports.rollOne = rollOneUser;
exports.recall = recallRolls;
exports.rollAll = rollAll;
