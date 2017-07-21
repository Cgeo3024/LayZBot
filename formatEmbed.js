var allUsers = function(users, callback){
  //var padded = pad(msg);
  var str = "";
  for (var i = 0; i < users.length; i++)
  {
    str += "**" +users[i][0] + " is [" + users[i][1] + "](" + users[i][2] + ")**\n";
    str += "\n"
  }
  var embed = {description : str, color:randomColor() };
  callback(embed);
};

// formats the result messagge for looking up another user
var other = function(user, callback){
  var embed
  if (user.length < 1)
  {
    embed = {description : "Sorry, that user is not registered with me!", color:15158332}
  } else {
    var msg = user[0].user + " is [" + user[0].name + "](" + user[0].link +")";
    embed = { description : msg, color:randomColor()};
  }
  callback(embed);
};

var self = function(user, callback){
  var embed;
  if (user.length < 1)
  {
    embed = {description : "Sorry, I couldn't find you in my records!", color:15158332}
  } else {
    var msg = "You are [" + user[0].name + "](" + user[0].link +")";
    //console.log(msg);
    embed = {title: user[0].user, description : msg, color:randomColor()};
  }

  callback(embed);
};

var inits = function(inits, callback){
  //var padded = pad(msg);
  console.log(inits);
  var str = "";
  for (var i = 0; i < inits.length; i++)
  {
    str += inits[i].name + " rolled " + inits[i].roll + " " + (inits[i].bonus||"+0") + " **Total** : " +inits[i].init;
    str += "\n\n"
  }
  var embed = {title: "Initiatives", description : str, color:randomColor() };
  callback(embed);
}

var initsSparse = function(inits, callback){

  var names = [];
  for (var i = 0; i < inits.length; i++)
  {
    names.push(inits[i].name);
  }

  var L = longestName(names);
  var str = "```";

  console.log(names);
  for (var i = 0; i < names.length; i++)
  {
    while(names[i].length < L)
    {
      names[i] += " ";
    }
  }
  console.log(names);
  for (var i = 0; i < inits.length; i++)
  {
    console.log(names[i]);
    str += names[i] + " : " +inits[i].init +"\n";

  }
  str += "```"
  var embed = {title: "Initiatives", description : str, color:randomColor() };
  callback(embed);
}

var longestName = function(names){
  var longest = 0;
  for (var i = 0; i < names.length;i++)
  {
    if (names[i].length > longest)
    {
      longest = names[i].length;
    }

  }
  return longest;
}

var error = function(){};

function randomColor(){
  var colors = [1752220,
                3066993,
                3447003,
                10181046,
                15844367,
                9807270,
                8359053,
                3426654,
                1146986,
                2067276,
                2123412,
                7419530,
                12745742,
                2899536]

  return colors[Math.floor(Math.random() * colors.length)];
}

var showHelp = function(callback){
  var msg = "I respond to the following commands: \n"
   + "```?Help                    -> Gets you back to this list.\n"
   //+ "?Who am I                -> Lists the character I currently have linked for you.\n"
   + "?Who is [name]           -> Lists the character I currently have linked for player [name].\n"
   + "?Who is --everyone       -> Lists the characters I currently have linked for everyone on the server.\n"
   + "?Who is --me             -> Lists the character I currently have linked for you.\n"
   + "?I Am  [args]            -> Lets you update your details with me. \n"
   + " # where [args] is 1 or more of the following of\n"
   + "   ## --name [name]        \n"
   + "   ## --link [link]        \n```"
   //+ "   ## --init [init]        \n"
   //+ "?Init order              -> returns the current initiative list for the party.\n"
   //+ "?Roll init               -> rolls a new initiative list for the party. Please check your stored bonus!\n\n```"
   + "\nI also understand a few abbreviations\n\n"
   + "```?I --n [n] --l [l] == ?I Am --name [name] --link [link]\n"
   + "?w [name]          == ?Who is [name]\n"
   + "?w --m             == ?Who is --me\n"
   + "?w --e             == ?Who is --everyone```"
   //+ "?r        == ?Roll init\n"
   //+ "?o        == ?init order\n```"
   embed = {title: "Help", description : msg, color:randomColor()};
   callback(embed);
}

exports.allUsers = allUsers;
exports.self = self;
exports.other = other;
exports.help = showHelp;
exports.inits = inits;
exports.initsSparse = initsSparse;
