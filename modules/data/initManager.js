var lookup = require('./lookups.js');
var inits = [];
var entities = [];
var orderedInits = [];

var set = false;
var loaded = false;
var ordered = false;

// resets the init bonuses, keeps data-base data
var forgetInit = function(){
  set = false;
  ordered = false;
  orderedInits = [];
  inits = [];
}

// completely clears initiaitive. Will result in a database call
var deepForgetInit = function(){
    forgetInit();
    loaded = false;
    entities = [];
}

// calls the database to laod character information
var initInit = function(callback){

  deepForgetInit();

  lookup.everyone(null, function(result, err){
    console.log ("Lookup values:");
    console.log(result);
    console.log(err);
    for (var i =0; i < result.length; i++)
    {
      entities.push({user:result[i].user, name:result[i].name, bonus:result[i].init});
    }
    loaded = true;
    console.log("Finished loading all entities");
    console.log(entities);
    callback(true);
  });
}

function random20(){
  return (Math.floor(Math.random() * 20) + 1);
}

//verifies if the entities need to be reloaded from the database
// loads them if they are not loaded
function enforceLoaded(deep, callback)
{
  console.log("loaded:" + loaded + ", : deep: " + deep);
  if(!loaded || deep){
    console.log("Forced to reload because:")
    console.log("loaded : " + loaded);
    console.log("deep :"+ deep);
    initInit(function(r){
      callback();
    });
  }else {
      callback();
  }
}

// rolls the init values of all players
var rollAll = function(deep, callback){
  forgetInit();
  //ensures entities have been loaded from the database before loading them
  enforceLoaded(deep, function(){
    for (var i = 0; i < entities.length; i++)
    {
      var e = {user:entities[i].user, name:entities[i].name};
      var roll = random20();

      e.roll = roll;
      e.bonus = parseInt(entities[i].bonus) ? entities[i].bonus : "+0";
      e.init = roll + parseInt(e.bonus);
      inits.push(e);
    }
    loaded = true;
    set = true;
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

var insert = function(name, user, bonus, callback)
{
  console.log("adding new Entity");
  console.log(inits);
  for (var i = 0; i < entities.length; i++)
  {
    if (entities[i].name.toLowerCase() == name.toLowerCase())
    {
      callback(-1);
      return;
    }
  }

  var roll = random20();
  var nuBonus = parseInt(bonus) ? bonus : "+0"; // undefined, null NAN etc are "falsy" in node.
  var total = parseInt(nuBonus) + roll;
  entities.push({user: user, name:name, bonus:nuBonus});
  inits.push({name: name, roll: roll, init:total, bonus:nuBonus, user:user });

  if (ordered)
  {
    insertIntoPreOrdered({name: name, roll: roll, init:total, bonus:nuBonus, user:user})
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



function forgetFromInitEntity(entity, name)
{
  var found = false;
  var index = [];
  for (var i = 0; i < entity.length; i++)
  {
    if (entity[i].name.toLowerCase() == name.toLowerCase())
    {
      console.log(entity[i]);
      found = true;
      index.push(i);
    } else {
      if(entity[i].user.toLowerCase() == name.toLowerCase())
      {
        console.log(entity[i]);
        found = true;
        index.push(i);
      }
    }

  }

  for (var i = index.length -1; i >= 0; i--)
  {
    entity.splice(index[i],1);
  }
}

var forgetEntity = function(name, callback)
{
  forgetFromInitEntity(orderedInits,name);
  forgetFromInitEntity(inits,name);
  forgetFromInitEntity(entities, name);

  console.log(inits);
  callback();


}

//returns the current init values
var recallRolls = function(callback){
  // we want the rolls to be ordered by initiative for readability
  // return an error signifying 'null' when we have no users
  console.log("Initiative arrays");
  console.log("Inits");
  console.log(inits);
  console.log("Ordered Ints");
  console.log(orderedInits);
  console.log("Entities");
  console.log(entities);
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

exports.forgetOne = forgetEntity;
exports.clearInit = forgetInit;
exports.overwrite = overwrite;
exports.insert = insert;
exports.recall = recallRolls;
exports.rollAll = rollAll;
