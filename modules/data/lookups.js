var config = require('../../resources/config.js');
var http = require("http");
var mongojs = require("mongojs");
var db = mongojs(process.env.DBURI, ["users"]);
var mycollection = db.collection('users');

console.log(process.env.DBURI);

var lookupEveryone = function(user, callback){
  var msg = [];
  db.users.find(function(err, docs) {
    for (d in docs)
    {
      var temp = {};
      temp.user = docs[d].user;
      temp.name = docs[d].characters[docs[d].current].name;
      temp.link = docs[d].characters[docs[d].current].link;
      temp.init = docs[d].characters[docs[d].current].init;
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

var modify = function(update, user, callback)
{
  db.users.findAndModify({
    query: {user: user},
    update: { $set: update }
  }, function(err){
    callback();
  });
}

var performUpdate = function(update, user, callback)
{
  db.users.find({user : user}, function (err, r){
    //console.log(r);
    if (r.length > 0)
    {
      console.log("Modifying");
      modify(update, user, function (){
        callback(true);
        console.log("Existing user updated");
      });

    }
    else {
      update.user = user;
      update.user_lower = user.toLowerCase();
      console.log(update);
      db.users.save(update, function(){
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
