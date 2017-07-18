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
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        //console.log(message);
        var argVals = [];
        var args = message.substring(1).split('--');
        for (var i = 0; i < args.length; i++){
          argVals[i] = args[i].replace(/\s+$/, '').split(' ');
          //console.log(i + " :: " + argVals[i]);
        }

        console.log(args);
        console.log(argVals);
        var cmd = argVals[0][0];
        console.log("User " + user + " Messaged Me");
        console.log(cmd);
        switch(cmd) {
            // !ping
            case 'lhello':
            case 'Lhello':
            case 'lHello':
            case 'LHello':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hi :3'
                });
            break;

            case 'LH':
            case 'lH':
            case 'Lh':
            case 'lh':
            case 'lHelp':
            case 'LHelp':
            case 'lhelp':
            case 'Lhelp':

              var msg = "";
              if (argVals.length > 2)
              {
                msg = "Sorry, I don't understand what you just said. Make sure you only ask one thing at a time.";
              } else if (argVals[0].length == 1){
                msg = '```Hello! I am a simple helper bot. \nI respond to : \n\n'
                + '!LList       | !LL  - Lists all characters who are registered with me.\n'
                + '!LUpdate     | !LU  - Allows you to change the details of a character assigned to you\n'
                + '!LRegister   | !LR  - Allows you to register a character with me. Only one character is allowed per user!\n'
                + "!LDelete     | !LD  - Deletes your information from the database. Goodbye ~\n```"
              } else {
                switch (argVals[0][1]) {
                  case "!LU":
                  case "!LUpdate":
                  case "LU":
                  case "LUpdate":
                    msg = "```Use LUpdate to change your information in the database. Simple provide any flags you wish to update\n"
                    + ' --name [name]           => This is the name of your character\n'
                    + ' --link [link]           => This is a link to your character sheet\n'
                    + '\nExample: !LUpdate --init +5```'

                    break;
                  case "!LR":
                  case "!LRegister":
                  case "LR":
                  case "LRegister":
                    msg = "```Use LRegister to add your information to the database. Simple provide any flags you wish to store\n"
                    + ' --name [name]           => This is the name of your character\n'
                    + ' --link [link]           => This is a link to your character sheet\n'
                    + ' --init [initativeBonus] => This is your initiative bonus\n'
                    + '\nExample: !LR --name Jeremiah Schmitt --Link Example.com\n'
                    + '\nUsers are limited to one character only, please use LUpdate or LDelete if you already have a registered character```'

                    break;
                  default:
                    msg = "Sorry, I have no help to offer on " + argVals[0][1];

                }
              }
              bot.sendMessage({
                  to: channelID,
                  message:msg
                });

              break;
            case 'Avrae':
              bot.sendMessage({
                  to: channelID,
                  message: 'Avrae is alright I guess....'
              });
            break;

            // allows a new user to register their character
            case 'Lr' :
            case 'Lregister' :
            case 'lr' :
            case 'lregister' :
            case 'lR' :
            case 'lRegister' :
            case 'LR' :
            case 'LRegister' :
              console.log("all args" + args);
              console.log("args 0" + args[0]);
              console.log("args 1" + args[1]);
              var msg = "";
              bot.sendMessage({
                to: channelID,
                message: 'Recording ' + user + "'s infortmation'"
              }, function ( ) {
                  db.users.find({user : user}, function (err, r){
                    console.log(r);
                    if (r.length > 0)
                    {
                      msg = "Sorry, you already have a character. Try !LUpdate or !LDelete instead";
                      console.log("Too many characters!");
                    }
                    else {
                      db.users.save(getDBFormatObj(argVals, user, channelID));

                    }
                });


              });

              break;
            case 'Lu' :
            case 'Lupdate' :
            case 'lu' :
            case 'lupdate' :
            case 'lU' :
            case 'lUpdate' :
            case 'LU' :
            case 'LUpdate' :
            bot.sendMessage({
              to: channelID,
              message: 'Recording ' + user + "'s infortmation'"
            }, function ( ) {
                db.users.find({user : user}, function (err, r){
                  console.log(r);
                  if (r.length < 0)
                  {
                    msg = "Sorry, you Do Not already have a character. Try !LRegister instead";
                    console.log("Too many characters!");
                  }
                  else {
                    var item = getDBFormatObj(argVals, user, channelID);
                    db.users.findAndModify({
                    	query: {user: user},
                    	update: { $set: item }
                    }, function (err, doc, lastErrorObject) {
                    	// doc.tag === 'maintainer'
                    })
                  }
              });
            });
            break;

            case 'LList':
            case 'Llist':
            case 'llist':
            case 'll':
            case 'LL':
            case 'Ll':
            case 'lL':
              bot.sendMessage({
                  to: channelID,
                  message: 'Accessing Database ....'
              }, function(){
                db.users.find(function(err, docs) {

                  console.log(err);
                  var msg = "";
                  for (d in docs)
                  {
                    msg += docs[d].user + " is playing " + docs[d].name +  " Link : " + docs[d].link + "\n";

                  }
                  msg += "End of Data!";
                  bot.sendMessage({
                      to:channelID,
                      message: msg
                    });
                });

              });

              break;

              case 'LInit':
              case 'LI':
              case 'linit':
              case 'li':
                console.log(argVals);
              break;

              case 'LDelete':
              case 'ldelete':
              case 'Ldelete':
              case 'lDelete':
              case 'LD':
              case 'ld':
              case 'Ld':
              case 'lD':
                db.users.remove({user : user}, function (){
                  bot.sendMessage({
                      to:channelID,
                      message: "Your data has now been deleted. Goodbye " + user + "!~"
                    });
                });
              break;
            // Just add any case commands if you want to..
         }
     }
});

function getDBFormatObj(values, user)
{
 console.log("I need to save ");
 console.log(values);

 var obj = {"user" : user};
 for (var j = 1; j < values.length; j++)
 {
   switch(values[j][0]) {
     case "name":
     case "Name":
     case "n":
     case "N":
      var name = values[j][1];
      var k = 2;
      while (k < values[j].length)
      {
        name += " " + values[j][k]
        k += 1;
      }

      obj.name = name;

      break;
      case "link":
      case "Link":
      case "l":
      case "L":
        obj.link = values[j][1];
     break;

     case "Init":
     case "init":
     case "I":
     case "i":
       obj.link = values[j][1];
    break;
   }

 }
 return obj;
}
