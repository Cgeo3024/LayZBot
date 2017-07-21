var lookup = require('./lookups.js');
var inits = [{user: "alt+f7", name:"Lady Agatha Cherrybrook", bonus:"+0"},
              {user:"ulin207", name:"Phillia", bonus:"+3"}];
var set = false;
var loaded = false;
// resets the init bonuses
var forgetInit = function(callback){
  set = false;
  loaded = false;
  for (i in inits)
  {
    inits[i].init = null;
    inits[i].roll = null;
  }
}

var initInit = function(callback){
  inits = [];
  if (!loaded){
    lookup.everyone(null, function(result, err){
      console.log ("Lookup values:");
      console.log(result);
      console.log(err);
      for (var i =0; i < result.length; i++)
      {
        inits.push({user:result[i][0], name:result[i][1], roll: null, init: null, bonus:result[i][3]});
      }
      loaded = true;
      set = true;
      console.log("Finished loading all inits");
      console.log(inits);
      callback(true);
    });

  } else {
    callback(false);
  }
}

function random20(){
  return (Math.floor(Math.random() * 20) + 1);
}

// rolls the init values of the calling player
var rolleOne = function(user, callback){
  // look for the user
  for (i in inits){
    if (inits[i].user.toLowerCase() == user.toLowerCase())
    {

      // after we find the user we perform their roll
      var roll = random20();
      inits[i].init = roll + parseInt(inits[i].bonus);
      inits[i].roll = roll;
      callback({roll: roll, bonus: inits[i].bonus})
    }
  }
  // if we can't find this user return null
  callback(null);
}

// rolls the init values of all players
var rollAll = function(callback){
  if(!set){
    initInit(function(r){
      for (var i = 0; i < inits.length; i++)
      {

        var roll = random20();
        inits[i].roll = roll;
        inits[i].init = roll + (parseInt(inits[i].bonus) || 0);
      }
      console.log("Finished rolling inits from the rollAll function -- fresh");
      console.log(inits);
      callback(true);

    });
  } else {
    for (var i = 0; i < inits.length; i++)
    {
      var roll = Math.floor(Math.random() * 20) + 1;
      inits[i].roll = roll;
      inits[i].init = roll + (parseInt(inits[i].bonus) || 0);
    }
    console.log("Finished rolling inits from the rollAll function");
    console.log(inits);
    callback(true);
  }
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

  var orderedArray = [];
  orderedArray.push(inits[0]);
  for (var i = 1; i < inits.length; i++){

    var j = 0;

    // any players *not* participating should be listed last
    if (inits[i].init == null)
    {
      orderedArray.push(inits[i]);
      continue;
    }

    for(; j < orderedArray.length; j++)
    {
      if (orderedArray[j].init == null){
        break;
      }
      if (inits[i].init > orderedArray[j].init){
        break;
      }
    }

    orderedArray.splice(j, 0, inits[i]);
  }

  callback(orderedArray);

}

exports.recall = recallRolls;
exports.reroll = rollAll;
