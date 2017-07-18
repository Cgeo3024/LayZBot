var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// database details
var http = require("http");
var mongojs = require("mongojs");

var uri = "mongodb://layzbot:newlazybotpassword@ds034807.mlab.com:34807/trial_dnd_stats";

var db = mongojs(uri, ["users"]);
var mycollection = db.collection('users');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `?`
    if (message.substring(0, 1) == '?') {

        console.log(message);

        // splits on -- to allow for order-agnostic commands
        var argVals = [];
        var args = message.substring(1).split('--');

        console.log(args);

        // removes trailing white-space and further splits arguements into 'words'
        for (var i = 0; i < args.length; i++){
          argVals[i] = args[i].replace(/\s+$/, '').split(' ');
        }

        console.log(args);
        console.log(argVals);

        // takes the first input as the command to execute
        var cmd = argVals[0][0].toLowerCase();
        var msg = "Sorry, I'm not sure what you want.";
        switch(cmd) {

          // the hello message falls through to the help message
          case 'hello':
            msg = "Hello! I am a simple helper bot for this DnD Group.\n\n";
          break;
          case 'help':
          case 'h':
            msg = showHelp();
          break;
          case 'w':
            if (argVals.length > 1)
            {
              // handle -- flag
              var innerSwitch = argVals[1][0].toLowerCase();
              switch (innerSwitch)
              {
                case "e":
                case "everyone":
                // handle -- flag
                msg = '';
                bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                lookupEveryone(function(embed){
                  sendEmbed(embed, channelID);
                });
                break;
                case "m":
                case "me":
                msg = '';
                bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                lookupSelf(user, function(result){
                    sendEmbed(result, channelID);
                });
                break;
              }
            } else if (argVals[0].length > 1){
              // handle name
              var name = argVals[0][1];
              var i = 3;
              while (i < argVals.length)
              {
                name += " " + argVals[0][i];
                i++;
              }
              var verb = argVals[0][1].toLowerCase()
              if (name.toLowerCase() === "avrae")
                {
                  msg = "Avrae is my much more advanced co-worker. Toss them a !Help to learn more.";
                } else {
                  msg = '';
                  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                  lookupOther(name, function(msg){
                      sendEmbed(msg, channelID);
                  });
                }
              }
              break;
          case 'who':
            if (argVals.length > 1)
            {
              var innerSwitch = argVals[1][0].toLowerCase();
              switch (innerSwitch)
              {
                case "e":
                case "everyone":
                // handle -- flag
                msg = '';
                bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                lookupEveryone(function(embed){
                  sendEmbed(embed, channelID);
                });
                break;
                case "m":
                case "me":
                msg = '';
                bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                lookupSelf(user, function(result){
                  sendEmbed(result, channelID);
                });
                break;
              }

            } else if (argVals[0].length > 2){

              // handle names
              // recronstructs names with spaces in them
              var name = argVals[0][2];
              var i = 3;
              while (i < argVals.length)
              {
                name += " " + argVals[0][i];
                i++;
              }
              var verb = argVals[0][1].toLowerCase()

              if (verb === "am") {
                if (name.toLowerCase() === "i")
                {
                  msg = '';
                  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                  lookupSelf(user, function(result){
                    sendEmbed(result, channelID);
                  });
                }
              } else if (verb === "is"){
                if (name.toLowerCase() === "avrae")
                {
                  msg = "Avrae is my much more advanced co-worker. Toss them a !Help to learn more.";
                } else {
                  msg = '';
                  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                  lookupOther(name, function(msg){
                    sendEmbed(msg, channelID);
                  });
                }
              } else if (verb === "are") {
                if (name.toLowerCase() === "you")
                {
                  msg = showHelp();
                }
              } else {

                msg = "Oops! This command expects a verb after 'who'";

              }
            } else {
              msg = "Oops! you're missing a name or a verb! Please try again and provide a name, or use the --everyone or --me flag";
            }
          break;
          case 'i':
            if (argVals.length < 2)
            {
              msg = "I couldn't parse that, please make sure your '?I' command includes at least one -- flag";

            } else {
              var update = {};
              var correct = 0;
              for (var i = 1; i < argVals.length; i++)
              {
                console.log(argVals);
                if (argVals[i].length < 2)
                {
                  msg = "Oops, did you forget to add a value for your flag?\n";
                } else {
                  console.log("Switching on: " + argVals[i][0]);
                  switch (argVals[i][0].toLowerCase()){
                    case "n":
                    case "name":
                      console.log("Switching");
                      var name = argVals[i][1];
                      var j = 2;
                      console.log(argVals);
                      while (j < argVals[i].length)
                      {
                        name += " " + argVals[i][j];
                        j++;
                      }
                      update.name = name;
                      correct ++;
                    break;
                    case "l":
                    case "link":
                      update.link = argVals[i][1];
                      correct ++;
                    break;
                    case "i":
                    case "init":
                      update.init = argVals[i][1];
                      correct ++;
                    break;
                  }
                }
              }

              if (correct > 0) {
                msg = '';
                bot.sendMessage({ to:channelID, message: "Accessing Database..."});
                performUpdate(update, user, function(update){
                  if (update){
                    sendEmbed({title : user, description : "Your details have been successfully updated!", color:3066993}, channelID);
                  }
                  else {
                    sendEmbed({title : user, description : "Your details have been successfully recorded!", color:3066993}, channelID);
                  }
                });
              } else {
                msg += "Could not proceed with recording your information. No values were correctly flagged\n"
              }
            }
          break;
          default:

          break;
        }

        if (msg != '')
        {
          bot.sendMessage({
              to: channelID,
              message:msg
            });
        }
     }
});

var sendEmbed = function(embed, channelID){
  bot.sendMessage({
      to: channelID,
      embed:embed
    });
}

var lookupEveryone = function(callback){
  var msg = [];
  db.users.find(function(err, docs) {
    console.log(err);
    for (d in docs)
    {
      msg[d] = [];
      msg[d][0] = docs[d].user;
      msg[d][1] = docs[d].name;
      msg[d][2] = docs[d].link;
    }

    //var padded = pad(msg);
    var str = "";
    for (var i = 0; i < msg.length; i++)
    {
      str += "**" +msg[i][0] + " is [" + msg[i][1] + "](" + msg[i][2] + ")**\n";
      str += "\n"
    }

    var embed = {description : str, color:randomColor() };
    callback(embed);
  });
}
var performUpdate = function(update, user, callback)
{
  db.users.find({user : user}, function (err, r){
    console.log(r);
    if (r.length > 0)
    {
      console.log("Modifying");
      db.users.findAndModify({
        query: {user: user},
        update: { $set: update }
      }, function (Err){
        callback(true);
        console.log("Existing user updated");
      });

    }
    else {
      db.users.save({user: user, user_lower : user.toLowerCase}, function(){
        db.users.findAndModify({
          query: {user: user},
          update: { $set: update }
        }, function(){
          console.log("New User Added");
          callback(false);
        });
      });
    }


  });
}
var singleLookUp = function (name, callback){
  db.users.find({user_lower : name.toLowerCase()}, function (err, r){
    callback(r);
  });
}

// looks up a user who is not the current user
var lookupOther = function(name, callback){
  console.log("Looking up unkown user");

  singleLookUp(name, function(r) {
    var embed
    if (r.length < 1)
    {
      //console.log("ERROR EMBED");
      embed = { title: "RE: " + name, description : "Sorry, that user is not registered with me!", color:15158332}
    } else {
      var msg = r[0].user + " is [" + r[0].name + "](" + r[0].link +")";
      embed = { description : msg, color:randomColor()};
    }

    callback(embed);
  });
}

// slightly different wording for self-lookups
var lookupSelf = function(name, callback){
  singleLookUp(name, function(r) {

    var embed
    if (r.length < 1)
    {
      //console.log("ERROR EMBED");
      embed = { title : name, description : "Sorry, I couldn't find you in my records!", color:15158332}
    } else {
      var msg = "You are [" + r[0].name + "](" + r[0].link +")";
      embed = {title: r[0].user, description : msg, color:randomColor()};
    }
    callback(embed);
  });
}

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

  var val = colors[Math.floor(Math.random() * colors.length)];

  /* Color List
  AQUA: 1752220,
  GREEN: 3066993,
  BLUE: 3447003,
  PURPLE: 10181046,
  GOLD: 15844367,
  ORANGE: 15105570,
  RED: 15158332,
  GREY: 9807270,
  DARKER_GREY: 8359053,
  NAVY: 3426654,
  DARK_AQUA: 1146986,
  DARK_GREEN: 2067276,
  DARK_BLUE: 2123412,
  DARK_PURPLE: 7419530,
  DARK_GOLD: 12745742,
  DARK_ORANGE: 11027200,
  DARK_RED: 10038562,
  DARK_GREY: 9936031,
  LIGHT_GREY: 12370112,
  DARK_NAVY: 2899536
  */
  return val;
}

function showHelp(){
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
   + "I also understand a few abbreviations\n"
   + "```?I --n [n] --l [l] == ?I Am --name [name] --link [link]\n"
   + "?w [name]          == ?Who is [name]\n"
   + "?w --m             == ?Who is --me\n"
   + "?w --e             == ?Who is --everyone```"
   //+ "?r        == ?Roll init\n"
   //+ "?o        == ?init order\n```"

   return msg;
}
