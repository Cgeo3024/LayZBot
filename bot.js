var Discord = require('discord.io');
var logger = require('winston');
var lookup = require('./lookups.js');
var config = require('./config.js');
var embed = require('./formatEmbed.js');
var parseArgs = require('./parseArgs.js')

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
              handleAll(channelID);
            break;
            case 3:
              handleSelf(user, channelID);
            break;
            case 4:
              handleOther(values, channelID);
            break;
            case 5:
              handleUpdate(user, values, channelID);
            break;
          }

        });
     }
});

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

function handleSelf(user, channelID){
  //console.log("printing users' own info");
  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
  lookup.self(user, function(result){
      embed.self(result, function(embed){
          sendEmbed(embed, channelID);
      });
  });
};

function handleAll(channelID){
  //console.log("printing ALL users' info");
  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
  lookup.everyone(function(result){
    embed.allUsers(result, function(embed){
      sendEmbed(embed, channelID);

    });
  });
};
function handleOther(name, channelID){
  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
  lookup.other(name, function(msg){
      embed.other(msg, function(embed){
        sendEmbed(embed, channelID);
      });
  });
};
var sendEmbed = function(embed, channelID){
  //console.log("I received:");
  //console.log(embed);

  bot.sendMessage({
      to: channelID,
      embed:embed
    });
    //console.log("printing Done");
};
