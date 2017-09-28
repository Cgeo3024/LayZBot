var allUsers = function(users, callback){
  //var padded = pad(msg);
  var str = "";
  for (var i = 0; i < users.length; i++)
  {
    str += "**" +users[i].user + " is [" + users[i].name + "](" + users[i].link + ")**\n";
    str += "\n"
  }
  var embed = {description : str, color:randomColor() };
  callback(embed);
};

// formats the result messagge for looking up another user
var other = function(user, callback){
  console.log(user);
  var embed = {description : user[0].user + " is ["};
  callback(formatSingleUserEmbed(embed, user));
};

var formatSingleUserEmbed = function(embed, user)
{
  console.log(user);
  if(user.length < 1)
  {
    return ({description : "Sorry, that user is not registered with me!", color:15158332});
  }
  embed.description += user[0].name +"](" + user[0].link + ") ";
  embed.color = randomColor();
  console.log(embed);
  return embed;
}

var self = function(user, callback){
  var embed = {title:user[0].user, description: "You are ["};

  callback(formatSingleUserEmbed(embed, user));
};

var inits = function(inits, callback){
  //var padded = pad(msg);
  console.log(inits);
  var str = "";
  for (var i = 0; i < inits.length; i++)
  {
    str += inits[i].name + " rolled " + inits[i].roll + " " + inits[i].bonus + " **Total**: " + inits[i].init;
    str += "\n\n"
  }
  var embed = {title: "Initiatives", description : str, color:randomColor() };
  callback(embed);
}

var initsSparse = function(inits, callback){

  console.log("Publishing the sparse init list");
  console.log(inits);
  var names = [];
  for (var i = 0; i < inits.length; i++)
  {
    names.push(inits[i].name);
  }
  console.log(names);
  var L = longestName(names);
  var str = "```";

  for (var i = 0; i < inits.length; i++)
  {
    while(names[i].length < L)
    {
      names[i] += " ";
    }
    str += names[i] + " : " + inits[i].init +"\n";
    console.log(str);
  }
  str += "```"
  var embed = {title: "Initiatives", description : str, color:randomColor() };
  console.log("returning sparse embed");
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
  /* + "```?Help                    -> Gets you back to this list.\n"
   //+ "?Who am I                -> Lists the character I currently have linked for you.\n"
   + "?Who is [name]           -> Lists the character I currently have linked for player [name].\n"
   + "?Who is --everyone       -> Lists the characters I currently have linked for everyone on the server.\n"
   + "?Who is --me             -> Lists the character I currently have linked for you.\n"
   //+ "?Who plays [name]        -> Tells you which user controls a specified character name\n"
   + "?I Am  [args]            -> Lets you update your details with me. \n"
   + " # where [args] is 1 or more of the following of\n"
   + "   ## --name [name]        \n"
   + "   ## --link [link]        \n"
   + "   ## --init [init]        \n```"
   +"\n The initiative tracking module has its own set of commands\n\n"
   + "```"
   +"?Rolls [--verbose]              -> Lists the current initative values. Use the --verbose flag to see exactly what was rolled\n"
   +"?Rolls --add --name [name] --i N-> Adds an enitity to the init tracking for this combat\n"
   +"?Rolls --forget [name]          -> removes the specified entity from the init tracking for this combat\n"
   +"?Rolls --forget --me            -> removes *you* from the init tracking for this combat\n"
   +"?Rolls --forget --everyone      -> Drops all initiative tracking for this combat"
   +"?Reroll                         -> rolls initiative for everyone being tracked\n"
   +"?Reroll --me                    -> rolls initiative for you.\n"
   +"?Reroll --n [name]              -> Rolls initiative for the named player/character.\n"
   +"?Reroll --d                     -> Loads character information from the database to reroll. CAUTION: This removes anyone added via ?Rolls --add\n```"
   //+ "?Init order              -> returns the current initiative list for the party.\n"
   //+ "?Roll init               -> rolls a new initiative list for the party. Please check your stored bonus!\n\n```"
   */
   msg += "```?Help\n"
   + "?Who is [name]\n"
   + "?Who is --everyone\n"
   + "?Who is --me\n"
   + "?I Am  [args]\n"
   + " # where [args] is 1 or more of the following of\n"
   + "   ## --name [name]        \n"
   + "   ## --link [link]        \n"
   + "   ## --init [init]        \n```"
   +"\n The initiative tracking module has its own set of commands\n\n"
   + "```"
   +"?Rolls {--verbose}\n"
   //+"?Rolls --overwrite --name [name] --init [init]\n"
   +"?Rolls --add --name [name] --init [initBonus]\n"
   //+"?Rolls --forget [name]\n"
  // +"?Rolls --forget --me\n"
   //+"?Rolls --forget --everyone\n"
   +"?Rolls --forget\n"
   +"?Reroll\n"
   +"?Reroll --me\n"
   +"?Reroll --name [name]\n"
   +"?Reroll --deep CAUTION: Drops all --add additions\n```"
   + "\nI also understand a few abbreviations\n\n"
   + "```"
   + "?I --n [n] --l [l]\n"
   + "?w [name]\n"
   + "?w --m\n"
   + "?w --e\n"
   + "?r [--v]\n"
   + "?r --a [n] --i [i]\n"
   + "?r --f\n"
   + "?rr --m/--d\n```"
   embed = {title: "Help", description : msg, color:randomColor()};
   callback(embed);
}

exports.allUsers = allUsers;
exports.self = self;
exports.other = other;
exports.help = showHelp;
exports.inits = inits;
exports.initsSparse = initsSparse;
