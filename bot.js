var Discord     = require('discord.io');
var logger      = require('winston');
var lookup      = require('./lookups.js');
var config      = require('./config.js');
var embed       = require('./formatEmbed.js');
var parseArgs   = require('./parseArgs.js')
var initManager = require('./initManager.js');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: config.auth,
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

        // passes the message to the parsing module
        parseArgs.parse(message.substring(1), function (cmd, values){
          switch (cmd)
          {
            /* Event Guide:
                value | Meaning
                  0   | Default, display a specific error message
                  1   | show the help menu
                  2   | show the details of everyone
                  3   | show the details of calling users
                  4   | show the details of a named user
                  5   | update the details of the calling user
            */
            case 0:
              bot.sendMessage({to:channelID, message: values});
            break;
            case 1:
              embed.help(function(embed){
                sendEmbed(embed, channelID);
              });
            break;
            case 2:
              handleQuery(" ", channelID, lookup.everyone, embed.allUsers);
            break;
            case 3:
              handleQuery(user, channelID, lookup.self, embed.self);
            break;
            case 4:
              handleQuery(values, channelID, lookup.other, embed.other);
            break;
            case 5:
              handleUpdate(user, values, channelID);
            break;
            case 6:
              //content will be "true" for sparse, or "false" for verbose
              recallInitiative(channelID, values);
            break;
            case 7:
              //values will be true for a deep recall IE reload from DB, or false for a light one
              console.log("case 7 values");
              console.log(values);
              rerollInitiative(channelID, values);
            break;
          }
        });
     }
});

function recallInitiative(channelID, verbose){
  initManager.recall(function(inits){
    console.log(inits);
    if(inits == null)
    {
      sendEmbed({title:"error", description:"No inits Set", color: 15158332}, channelID);
      return -1;
    }
    if(!verbose){
      embed.initsSparse(inits, function(embed){
        sendEmbed(embed, channelID);
      });
    } else {
      embed.inits(inits, function(embed){
        sendEmbed(embed, channelID);
      });
    }
  });
}

function rerollInitiative(channelID, deep){
  bot.sendMessage({ to:channelID, message: "Rollling for Initative!"});
  initManager.reroll(deep, function(){
    console.log("Now recalling initiative");
    recallInitiative(channelID, true);
  });
}

function handleUpdate(user, content, channelID){
  lookup.update(content, user, function(updated){
    //console.log("updating user info");
    var embed;
    if (updated) {
      embed = {description: "Your details have been successfully updated!", color: 3066993}
    }
    else {
      embed = {description: "Your details have been successfully registered!", color: 3066993}
    }
    sendEmbed(embed, channelID);
  });
}

function handleQuery(name, channelID, query, embed)
{
  console.log(embed);
  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
  query(name, function(msg){
    embed(msg, function(embed){
      sendEmbed(embed, channelID);
    });
  });
}
var sendEmbed = function(embed, channelID){
  bot.sendMessage({
      to: channelID,
      embed:embed
    });
};
