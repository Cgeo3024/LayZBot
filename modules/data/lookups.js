var config = require('../../resources/config.js');
var http = require("http");
var mongojs = require("mongojs");
var db = mongojs(process.env.DBURI, ["users"]);
var mycollection = db.collection('users');

console.log(process.env.DBURI);

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
    callback(r, err);
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
      update.user = user;
      update.user_lower = user.toLowerCase();
      console.log(update);
      var ent = {current:0, characters:[update]};
      db.users.save(ent, function(){
        console.log("New User Added");
        callback(false);
      });
    }
  });
}

//exports.initDBConn  = initializeConnection;
exports.deleteUser  = deleteUser
exports.self        = singleLookUp;
exports.everyone    = lookupEveryone;
exports.other       = singleLookUp;
exports.update      = performUpdate;
