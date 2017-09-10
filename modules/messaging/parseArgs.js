var initialParse = function(raw, callback)
{
  var eventID = 0;
  /* Event Guide:
      value | Meaning
        0   | Default, display a specific error message
        1   | show the help menu
        2   | show the details of everyone
        3   | show the details of calling users
        4   | show the details of a named user
        5   | update the details of the calling user
        6   | recall initiative
        7   | roll initiative
  */
  var content;
  var specialCase = false;
  // splits on -- to allow for order-agnostic commands
  var args = raw.split('--');
  var argVals = [];

  // removes trailing white-space and further splits arguements into 'words'
  for (var i = 0; i < args.length; i++){
    argVals[i] = args[i].replace(/\s+$/, '').split(' ');
  }

  // takes the first input as the command to execute
  var cmd = argVals[0][0].toLowerCase();
  var msg = "Sorry, I'm not sure what you want.";
  var scope = null;
  var flags = parseFlags(argVals.slice(1));
  eventID = 0;
  switch(cmd) {

    // the hello message falls through to the help message
    case 'hello':
      content = "Hello! I am a simple helper bot for this DnD Group.\n\n";
    break;
    case 'forget':
    case 'f':
      console.log(argVals);
      console.log(flags);
      if (flags.self)
      {
        scope = 1;
        eventID = 7;
      }
      else {
        content = {};
        content.name = repairName(argVals[0],1);
        scope = 2;
        eventID = 7;
      }
    break;
    case 'help':
    case 'h':
      eventID = 1;
    break;
    // special adding syntax to reduce amount of flags
    case "quickadd":
    case "q":
    case "qa":
      console.log("Recieved:");
      console.log(argVals);
      eventID = 9
      if (argVals.length > 1)
      {
        msg = "ERROR: quickadd does not accept flags";
        eventID = 0;
        break;
      }
      if (argVals[0].length < 4)
      {
        msg = "ERROR: quickadd requires count, name and initiaitve bonus";
        eventID = 0;
        break;
      }
      content = {};
      content.count = parseInt(argVals[0][1]);
      content.init = parseInt(argVals[0].pop());
      content.name = repairName(argVals[0],2)

    break;
    // reroll command falls through into the who command, using similar input syntax
    case "rr":
    case "reroll":
      eventID = 8;
      content = true;
      scope = 0;
      if (flags.deep){
        content = true;
      }
    break;
    case 'who':

      switch(args[0].toLowerCase())
      {
        case("who are you"):
          content = "Hello! I am a simple helper bot for this DnD Group.\n\n";
          eventID = 0;
          console.log("self reporting");
          specialCase = true;
        break;
        case("who am i"):
          eventID = 2;
          scope = 1;
          specialCase = true;
        break;
        case("who is avrae"):
          content = "Avrae is my much more advanced co-worker. Toss them a !Help to learn more.";
          eventID = 1;
          specialCase = true;
        break;
      }
      if(specialCase)
      {
        callback(content, eventID, scope);
        return;
      }
      flags.name = (repairName(argVals[0],2)) // assumes there is a verb before the name (is, am, are)
      console.log("new flags");
      console.log(flags);
      break;
    case 'w':
      // our eventID is kept if it is from the reroll command
      console.log("WE ARE PARSING 'W'");
      console.log(args);
      eventID = Math.max(eventID, 2);
      if (flags.everyone) {
        scope = 0;
      } else if (flags.self) {
        scope = 1;
      } else if (flags.name)
      {
        scope = 2;
        content = flags.name;
      } else {
        content = repairName(argVals[0],1);
        scope = 2;
      }
      break;
    case 'rolls':
    case "r":
      eventID = 4;
      content = flags.verbose; // undefined is falsey in
      if (flags.forget)
      {
        scope = 0;
        eventID = 7;
      }
    break;

    case "add":
    case "a":
      eventID = Math.max(eventID,6);
    case ("overwrite"):
    case("o"):
      eventID = Math.max(eventID,5);
    case 'i':
      eventID = Math.max(eventID,3); // default 0 will be over-written, but not others
      content = flags; // validation to occur on other side
    break;
    default:

    break;
  }

  callback(content, eventID, scope)
}

// strips out all flags and their values from the input
function parseFlags(raw)
{
  var res = {};
  for (var l = 0; l < raw.length; l++)
  {
    switch (raw[l][0].toLowerCase())
    {
      case("name"):
      case("n"):
        res.name = repairName(raw[l], 1);
      break;
      case("init"):
      case("i"):
        res.init = raw[l][1];
      break;
      case("link"):
      case("l"):
        res.link = raw[l][1];
      break;
      case("me"):
      case("m"):
        res.self = true;
      break;
      case("everyone"):
      case("e"):
          res.everyone = true;
      break;
      case("forget"):
      case("f"):
        res.forget = true;
      break;
      case("add"):
      case("a")  :
        res.add = true;
      break;
      case("overwrite"):
      case("o"):
        res.overwrite = true;
      break;
      case("deep"):
      case("d"):
        res.deep = true;
      break;
      case("verbose"):
      case("v"):
        res.verbose = true;
      break;
    }
  }
  console.log(res);
  console.log("Generic Parse Resulted like thus");
  return res;

}

function repairName(arr, index)
{

  var name = arr[index];
  var i = index +1;
  while (i < arr.length)
  {
    name += " " + arr[i];
    i++;
  }
    return name;
}

exports.parse = initialParse;
