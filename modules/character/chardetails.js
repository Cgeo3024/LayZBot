var lookup = require('../data/lookups.js');

var listAll = function(user, callback)
{
  lookup.allChars(user, function(res, current){

    var msg ="";
    for (var i =0; i < res.length; i++)
    {
      msg+= "["+ res[i].name + "](" + res[i].link + ")";
      if(res[i].name == current){
        msg += " - Active";
      }
      msg +="\n";
    }
    callback(msg);
  });
}

var addChar = function(user, newChar, callback)
{
  console.log("adding character from chardetails")
  lookup.allChars(user, function(res){
    console.log("We got in chardetails");
    console.log(res);
    var exists = false;
    if (res.length > 5)
    {
      callback(false);
      return;
    }
    for (var i = 0; i < res.length; i++)
    {
      if (res[i].name.toLowerCase() == newChar.name.toLowerCase())
      {
        console.log("HEY THIS IS NOT ON");
        console.log(res[i].name.toLowerCase + " == " + newChar.name.toLowerCase);
        exists = true;
      }
    }
    if(exists)
    {
      callback(-1);
    }
    else
    {
      console.log("adding character from chardetails -- mOving on")
      lookup.addChar(user, newChar, function(r){
        callback(r);
      });
    }
  });
}

var switchChar = function(user, target, callback)
{
  var found = -1;
  lookup.allChars(user, function(res){
    for (var i = 0; i < res.length; i++)
    {
      console.log(res);
      if (res[i].name.toLowerCase() == target.toLowerCase())
      {
        lookup.changeCurrentChar(user, target, function(){});
        found = 0;
        callback(found);
        return;
      }
    }

    callback(found);
  });
}

var deleteChar = function(user, target, callback)
{

}


module.exports.addChar = addChar;
module.exports.listAll = listAll
module.exports.switchChar = switchChar;
module.exports.deleteChar = deleteChar;
