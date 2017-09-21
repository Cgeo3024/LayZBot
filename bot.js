var Discord     = require('discord.io');
var logger      = require('winston');
var generate    = require('./modules/generate/gen');
var lookup      = require('./modules/data/lookups.js');
var embed       = require('./modules/messaging/formatEmbed.js');
var parseArgs   = require('./modules/messaging/parseArgs.js')
var initManager = require('./modules/data/initManager.js');
var config      = require('./resources/config.js');
var pointbuy = require('./resources/pointbuy.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.BOT_TOKEN,
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
        parseArgs.parse(message.substring(1), function (data, eventID, scope){
          logger.debug("recieved in bot.js");
          logger.debug(data);
          logger.debug(eventID);
          logger.debug(scope);
          switch (eventID)
          {
            /* Event Guide:
                value | Meaning
                  -1  | Silent Error : For bot issues, not user error
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
                  9   | Add user to initiaitve with Special syntax
                  10  | generates a random character idea (open-source http://whothefuckismydndcharacter.com/)
            */
            case 0:
              bot.sendMessage({to:channelID, message: data});
            break;
            case 1:
              embed.help(function(embed){
                sendEmbed(embed, channelID);
              });
            break;
            case 2:
              logger.debug("Handling Query");
              var queryChoices = [lookup.everyone, lookup.self, lookup.self];
              var userChoices = ["",user,data];
              logger.info(data);
              logger.info("Quering " + scope);
              var embedChoices = [embed.allUsers, embed.self, embed.other];
              handleQuery(userChoices[scope], channelID, queryChoices[scope], embedChoices[scope]);
            break;
            case 3:
              handleUpdate(user, data, channelID);
            break;
            case 4:
              recallInitiative(channelID, data);
            break;
            case 5:
              initManager.overwrite(data.name, data.init, function(ret)
            {
              switch(ret){
                case(0):
                  bot.sendMessage({ to:channelID, message: "Initaitve value for " + data.name + " overwritten!"}, function(){
                    logger.info("Recalling Initiatives");
                    recallInitiative(channelID, false);

                  });
                break;
                case(1):
                  bot.sendMessage({ to:channelID, message: "ERROR: Failed to over-write, no active initiatives."});
                break;
                case(2):
                  bot.sendMessage({ to:channelID, message: "ERROR: User " + data.name + " not found!"});
                break;
              }
            })
              // Over write initiative for specified user with specified value
            break;
            case 6:
              initManager.insert(data.name, data.name, data.init, function(ret){
                switch(ret){
                  case(-1):
                    bot.sendMessage({ to:channelID, message: "Cannot Add " + data.name + " They already exist!"});
                  break;
                  case(0):
                    bot.sendMessage({ to:channelID, message: data.name + " Added to initaitve!"});
                    recallInitiative(channelID, false);
                  break;
                }
              })
              //Add user to initiative
            break;
            case 7:
              //values will be true for a deep recall IE reload from DB, or false for a light one
              switch (scope){
                case 0:
                //deletes entire initiative
                initManager.clearInit();
                bot.sendMessage({ to:channelID, message: "Inits Cleared!"});
                break;
                case 1:
                  //deletes calling user initiative
                  initManager.forgetOne(user, function(){
                    recallInitiative(channelID, false);
                  });
                break;
                case 2:
                  initManager.forgetOne(data.name,function(){
                    recallInitiative(channelID, false);
                  });
                //deletes specified initiative
                break
              }
            break;
            case 8:
              //reroll initiative
              logger.info("Dealing with initiative");
              console.log(scope);
                var rollChoices = [initManager.rollAll, initManager.rollOne, initManager.rollOne];
                var userChoice = [data,user,data];
                console.log(rollChoices[2]);
                console.log(rollChoices);
                manageRolls(rollChoices[scope], userChoice[scope],channelID);
            break;
            case 9:
              var added = 0;
              var limit = data.count;
              var silenced = false;
              console.log(added);
              for (var i =0; i < limit; i++)
              {
                console.log(i);
                initManager.insert(data.name+ " " + (1+i), data.name, data.init, function(ret){
                  switch(ret){
                  case(-1):
                    if(!silenced){
                      silenced = true;
                      bot.sendMessage({ to:channelID, message: data.name + " already exist in order, adjusting index"});
                    }
                    limit++;
                  break;
                  case(0):
                    added +=1;
                  break;
                }
                });
              }

              while(added < data.count)
              {
                sleep(10);
              }

              bot.sendMessage({ to:channelID, message: data.count + " " + data.name + " Added to initaitve!"});
              recallInitiative(channelID, false);
              break;
            case 10:
                bot.sendMessage({ to:channelID, message: "You should play ... " + generate()});
            break;
            case 11:
              switch(scope){
                case 0:
                  var listtxt = "";
                  for(var i = 0; i < pointbuy.scores.length; i++)
                  {
                    listtxt += pointbuy.scores[i] + "\n";
                  }
                  bot.sendMessage({ to:channelID, message: listtxt});
                break;
                case 1:
                  var total = 27;
                  var curr = 0;
                  var count = 0;
                  var err ="";
                  var valid = true;
                  for (var i = 0; i < data.length; i++)
                  {
                    var val = parseInt(data[i]);
                    console.log("Working with " + val);
                    console.log("It was " + data[i]);
                    count += 1;

                    if (val > 15)
                    {
                      err += "Value too high! Score " + count + " : " + val
                      + " Should not exceed 15!\n";
                      continue;
                    }
                    if (val < 8)
                    {
                      err == "Value too low! Score " + count + " : " + val
                      + " Should be at least 8!\n";
                      valid = false;
                    }

                    if ( val > 13 )
                    {
                      curr += 2* val%13;
                      val -= val%13;
                    }

                    curr += val%8;
                  }

                  if (count < 6)
                  {
                    err += "Not enough scores! You've only entered " + count +"/6 required scores\n";
                  }

                  if (count > 6)
                  {
                    err += "Too many scores! You've enetered "  + count +"/6 allowed scores\n";
                  }

                  if (curr > total)
                  {
                    err += "You've assigned too many points! You are allowed " + total +
                    " and have assigned " + curr +"\n";
                  }

                  if (curr < total)
                  {
                    err += "You've assigned too few points! You are allowed " + total +
                    " and have assigned " + curr +"\n";
                  }

                  if(err.length < 1)
                  {
                    msg = "Your array " + data + " Is valid!";
                  }
                  else {
                    msg = "Your array " + data + " is *not* valid!\n\n" + err;
                  }
                  console.log(err);

                  bot.sendMessage({ to:channelID, message: msg});
                break;
              }

            break;
          }
        });
     }
});

function manageRolls(rollType, input, channelID)
{
  console.log(rollType);
  console.log(input);
  console.log(channelID);
  rollType(input, function(){
    recallInitiative(channelID, true);
  });
}

function recallInitiative(channelID, verbose){
  initManager.recall(function(inits){
    logger.debug("From bot.js init printing function")
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
    logger.info("Now recalling initiative");
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
  console.log("Querying ");
  console.log(name);
  console.log(channelID);
  console.log(query);
  console.log(embed);
  bot.sendMessage({ to:channelID, message: "Accessing Database..."});
  query(name, function(msg, err){
    console.log("returns");
    if (msg.length < 1)
    {
      bot.sendMessage({ to:channelID, message: "That user does not exist"});
    } else {
      embed(msg, function(embed){
        sendEmbed(embed, channelID);
      });
    }

  });
}
var sendEmbed = function(embed, channelID){
  bot.sendMessage({
      to: channelID,
      embed:embed
    });
};
