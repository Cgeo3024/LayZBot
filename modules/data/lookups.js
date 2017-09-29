var config = require('../../resources/config.js');
var http = require("http");
var mongojs = require("mongojs");
var db = mongojs(process.env.DBURI, ["users"]);
var mycollection = db.collection('users');

console.log(process.env.DBURI);

var changeCurrentChar = function(user, target, callback){
  console.log("switching current character to " + target )
  db.users.find({user : user}, function (err, r){
    //console.log(r);
    var fullname;
    console.log(r);
    if (r.length > 0)
    {
      console.log("checking if character in DB");
      var exists = false;
      for (var i = 0; i < r[0].characters.length; i++)
      {
        if (r[0].characters[i].name.toLowerCase() == target.toLowerCase()){
          exists = true;
          fullname = r[0].characters[i].name;
        }
      }
      console.log("Character exists? " + exists);
      if(exists){
        db.users.findAndModify({
          query: {user: user},
          update: {$set: {current : fullname}}
        }, function(err,r){
          console.log(err);
          console.log(r);
          callback();
        });
      }

    }
  });
}

var lookupEveryone = function(user, callback){
  var msg = [];

  db.users.find(function(err, docs) {
    console.log(docs);
    for (d in docs)
    {
      console.log(docs[d]);
      var temp = {};
      var current = docs[d].current;

      temp.user = docs[d].user;
      for (var i = 0; i < docs[d].characters.length; i++)
      {
        console.log("Entering loop");
        console.log(docs[d].characters[i]);
        console.log(i);
        if (docs[d].characters[i].name == current){

          temp.name = docs[d].characters[i].name;
          temp.link = docs[d].characters[i].link;
          temp.init = docs[d].characters[i].init;
        }
      }

      msg.push(temp);
    }
    callback(msg, err);

  });
}

var deleteUser = function(name, callback){
  db.users.remove({user: name}, function(error, value){
    callback(value, error);
  });
};

var singleLookUp = function (name, callback){
  //console.log("looking up " + name );
  db.users.find({user_lower : name.toLowerCase()}, function (err, r){

    var ret = {};
    ret.user = r[0].user;
    for (var i = 0; i < r[0].characters.length; i++)
    {
      if (r[0].current == r[0].characters[i].name)
      {
        ret.name = r[0].characters[i].name;
        ret.init = r[0].characters[i].init;
        ret.link = r[0].characters[i].link;
      }
    }
    callback(ret, err);
  });
}

var modify = function(update, user, current,callback)
{
  var fullupdate = {};
  if(update.name)
  {
    fullupdate["characters.$.name"] = update.name;
    fullupdate["current"] = update.name;
  }
  if(update.link)
  {
    fullupdate["characters.$.link"] = update.link;
  }
  if(update.init)
  {
    fullupdate["characters.$.init"] = update.init;
  }
  console.log("looking for: " +current );
  console.log(fullupdate);
  db.users.findAndModify({
    query: {user: user, "characters.name":current},
    update: {$set: fullupdate}
  }, function(err,r){
    console.log(err);
    console.log(r);
    callback();
  });
}

var addCharacter = function(user, character, callback){
  console.log("adding character from lookups")
  db.users.find({user : user}, function (err, r){
    //console.log(r);
    console.log(r);
    if (r.length > 0)
    {
      console.log("checking if character in DB");
      var exists = false;
      for (var i = 0; i < r[0].characters.length; i++)
      {
        if (r[0].characters[i].name.toLowerCase() == character.name.toLowerCase()){
          exists = true;
        }
      }
      console.log("Character exists? " + exists);
      if(exists){
        callback(false);
      } else {
        var fullupdate = {};
        if(character.name)
        {
          fullupdate["characters.$.name"] = character.name;
        }
        if(character.link)
        {
          fullupdate["characters.$.link"] = character.link;
        }
        if(character.init)
        {
          fullupdate["characters.$.init"] = character.init;
        }
        console.log("adding a new character. Lookups.js step");
        console.log(fullupdate);
        db.users.findAndModify({
          query: {user: user},
          update: {$push: {characters : character}}
        }, function(err,r){
          console.log(err);
          console.log(r);
          callback();
        });
      }

    }
    else {
      newUser(user, character, function(r){
        callback(false);
      });
    }
  });
}

function newUser(user, details, callback)
{
  details.user = user;
  details.user_lower = user.toLowerCase();
  console.log(update);
  var ent = {user: details.user, user_lower: details.user.lower, current:details.name, characters:[update]};
  db.users.save(ent, function(){
    console.log("New User Added");
    callback(true);
  });
}
var performUpdate = function(update, user, callback)
{
  db.users.find({user : user}, function (err, r){
    //console.log(r);
    console.log(r);
    if (r.length > 0)
    {
      console.log("Modifying");
      var current = r[0].current;
      modify(update, user, current, function (){
        callback(true);
        console.log("Existing user updated");
      });

    }
    else {
      newUser(user, update, function(r){
        callback(false);
      });
    }
  });
}

var allChars = function(user, callback)
{
  db.users.find({user:user}, function (err, r){
    if (r.length < 1)
    {
      callback(-1);
    }
    else {
      callback(r[0].characters,r[0].current);
    }
  });
}
//exports.initDBConn  = initializeConnection;
exports.deleteUser  = deleteUser
exports.self        = singleLookUp;
exports.everyone    = lookupEveryone;
exports.other       = singleLookUp;
exports.update      = performUpdate;
exports.allChars    = allChars;
exports.changeCurrentChar = changeCurrentChar;
exports.addChar     = addCharacter;
