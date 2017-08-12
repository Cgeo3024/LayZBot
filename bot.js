var Discord     = require('discord.io');
var logger      = require('winston');
var lookup      = require('./lookups.js');
var config      = require('./config.js');
var embed       = require('./formatEmbed.js');
var parseArgs   = require('./parseArgs.js')
var initManager = require('./initManager.js');
var config = require('./config.js');

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
    //lookup.initDBConn(config.dburi)
    bot.setPresence({game :{name:"Dumb || Try ?Help"}});
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
          switch (cmd.id)
          {
            /* Event Guide:
                value | Meaning
                  0   | Default, display a specific error message
                  1   | show the help menu
                  2   | query
                        Scope :
                        0   | show the details of everyone
                        1   | show the details of calling users
                        2   | show the details of a named user
                  3   | update the details of the calling user
                  4   | Recall Initiatives
                  5   | Over-write Initiatives
                  6   | add user to initiatives
                  7   | Delete Initiatives
                        Scope :
                        0   | All users
                        1   | self
                        2   | specified user
                  8   | Reroll Initiatives
                        Scope:
                        0   | everyone
                        1   | self
                        2   | specified user
                        X3   | deep RerollX Now handled with a flag in content on case 0
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
              console.log("Handling QUery");
              console.log(values);
              switch(cmd.scope){
                case 0:
                  handleQuery(" ", channelID, lookup.everyone, embed.allUsers);
                  break;
                case 1:
                  handleQuery(user, channelID, lookup.self, embed.self);
                  break;
                case 2:
                  handleQuery(values, channelID, lookup.self, embed.other);
                  break;
              }
            break;
            case 3:
              handleUpdate(user, values, channelID);
            break;
            case 4:
              recallInitiative(channelID, values);
            break;
            case 5:
              initManager.overwrite(values.name, values.init, function(ret)
            {
              switch(ret){
                case(0):
                  bot.sendMessage({ to:channelID, message: "Initaitve value for " + values.name + " overwritten!"}, function(){
                    console.log("Recalling Initiatives");
                    recallInitiative(channelID, false);

                  });
                break;
                case(1):
                  bot.sendMessage({ to:channelID, message: "ERROR: Failed to over-write, no active initiatives."});
                break;
                case(2):
                  bot.sendMessage({ to:channelID, message: "ERROR: User " + values.name + " not found!"});
                break;
              }
            })
              // Over write initiative for specified user with specified value
            break;
            case 6:
              initManager.insert(values.name, values.init, function(ret){
                switch(ret){
                  case(-1):
                    bot.sendMessage({ to:channelID, message: "Cannot Add " + values.name + " They already exist!"});
                  break;
                  case(0):
                    bot.sendMessage({ to:channelID, message: values.name + " Added to initaitve!"});
                    recallInitiative(channelID, false);
                  break;
                }
              })
              //Add user to initiative
            break;
            case 7:
              //values will be true for a deep recall IE reload from DB, or false for a light one
              switch (cmd.scope){
                case 0:
                //deletes entire initiative
                initManager.clearInit();
                bot.sendMessage({ to:channelID, message: "Inits Cleared!"});
                break;
                case 1:
                //deletes calling user initiative
                break;
                case 2:
                //deletes specified initiative
                break
              }
            break;
            case 8:
              //reroll initiative
              console.log("Dealing with initiative");
              switch (cmd.scope){
                case 0:
                console.log("Rolling for everyone");
                manageRolls(initManager.rollAll, values, channelID);
                break;
                case 1:
                manageRolls(initManager.rollOne, user, channelID);
                break;
                case 2:
                manageRolls(initManager.rollOne, values, channelID);
                break;
              }
          }
        });
     }
});

function manageRolls(rollType, input, channelID)
{
  rollType(input, function(){
    recallInitiative(channelID, true);
  });
}

function recallInitiative(channelID, verbose){
  initManager.recall(function(inits){
    console.log("From bot.js init printing function")
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
    var embed;
    embed = {description: "Your details have been successfully " + updated ? "updated!" : "registered!", color: 3066993}
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
