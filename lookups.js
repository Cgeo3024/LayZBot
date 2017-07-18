var config = require('./config.js');
var http = require("http");
var mongojs = require("mongojs");
var db = mongojs(config.dburi, ["users"]);
var mycollection = db.collection('users');

var lookupEveryone = function(callback){
  var msg = [];
  db.users.find(function(err, docs) {
    //console.log(err);
    for (d in docs)
    {
      msg[d] = [];
      msg[d][0] = docs[d].user;
      msg[d][1] = docs[d].name;
      msg[d][2] = docs[d].link;
    }
    callback(msg);

  });
}

var singleLookUp = function (name, callback){
  //console.log("looking up " + name );
  db.users.find({user_lower : name.toLowerCase()}, function (err, r){
    //console.log("discovered ");
    //console.log(r);
    //console.log(err);
    callback(r);
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
      db.users.save({user: user, user_lower : user.toLowerCase}, function(){
        modify(update, user, function(){
          console.log("New User Added");
          callback(false);
        });
      });
    }
  });
}

exports.self = singleLookUp;
exports.everyone = lookupEveryone;
exports.other = singleLookUp;
exports.update = performUpdate;
