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

  // splits on -- to allow for order-agnostic commands
  var args = raw.split('--');
  var argVals = [];

  // removes trailing white-space and further splits arguements into 'words'
  for (var i = 0; i < args.length; i++){
    argVals[i] = args[i].replace(/\s+$/, '').split(' ');
  }
  console.log("PARSING ARGUMENTS");
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  console.log(argVals);
  console.log(args);
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  console.log("||||||||||||||||||||||||||");
  // takes the first input as the command to execute
  var cmd = argVals[0][0].toLowerCase();
  var msg = "Sorry, I'm not sure what you want.";
  var scope = null;
  switch(cmd) {

    // the hello message falls through to the help message
    case 'hello':
      content = "Hello! I am a simple helper bot for this DnD Group.\n\n";
    break;
    case 'help':
    case 'h':
      eventID = 1;
    break;
    case 'w':
      var sub = parseWho(false, 1, argVals);
      eventID = 2;
      content = sub.content;
      scope = sub.scope;
      break;
    case 'who':
      var sub = parseWho(true, 2, argVals);
      eventID = 2;
      scope = sub.scope;
      content = sub.content;
      break;
    case 'rolls':
    case "r":
      if (argVals.length > 1)
      {
        switch(argVals[1][0].toLowerCase()) {
          case "verbose":
          case "v":
            //a lookup with more details
            eventID = 4;
            content = true;
          break;
          case "overwrite":
          case "o":
            eventID = 5;
            // SET CONTENT TO USER NAME AND init\
            // REGENERAtE names
            // MANAGE OVERWRITING
            if (argVals.length < 4)
            {
              callback({id:0, scope: 0}, "ERROR: NOT ENOUGH ARGS IN OVERWRITE");
              return false;
            }

            var res = parseGeneric(argVals.slice(1));

            content = {name:res.name, init:res.init};
          break;
          case "add":
          case "a":
            eventID = 6;
            if (argVals.length < 4)
            {
              callback({id:0, scope: 0}, "ERROR: NOT ENOUGH ARGS IN OVERWRITE");
              return false;
            }

            var res = parseGeneric(argVals.slice(1));

            content = {name:res.name, init:res.init};
            console.log("Returning name " + res.name);
          break;
          case "forget":
          case "f":
            scope = 0;
            eventID = 7;
          break;
        }
      } else {
        // simple roll recall
        eventID = 4;
        content = false;
      }
    break;
    case "rr":
    case "reroll":
    eventID = 8;
    if (argVals.length > 1)
    {
      switch(argVals[1][0].toLowerCase()) {
        case "me":
        case "m":
          scope = 1;
        break;
        case "name":
        case "n":
          scope = 2;
          content = repairName(argVals[1], 1);
        break;
        case "deep":
        case "d":
          scope = 0;
          content = true;
        break;
      }
    } else {
      //rerolls everyone
      eventID = 8;
      scope = 0;
      content = false;
    }
    break;
    case 'i':
      if (argVals.length < 2)
      {
        eventID = 0;
        content = "I couldn't parse that, please make sure your '?I' command includes at least one -- flag";
      } else {
        var update = {};
        var correct = 0;

        var res = parseGeneric(argVals.slice(1));
        eventID = 3;
        content = res
      }
    break;
    default:
    break;
  }

  callback({id:eventID, scope: scope}, content)
}

function parseGeneric(raw)
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

// parses the "who" command to determine its target
function parseWho(verb, offset, argVals)
{
  var eventID = 0;
  var scope = null;
  var content = "AN UNSPECIFIED ERROR HAS OCCURED";
  var generic = true;
  var argOffset = 1;
  console.log(argVals);
  console.log(verb);
  console.log(offset);
  if (argVals.length > 1)
  {
    //console.log("Handling a flag");
    // handle -- flag
    var innerSwitch = argVals[1][0].toLowerCase();
    switch (innerSwitch)
    {
      case "e":
      case "everyone":
        scope = 0;
      break;
      case "m":
      case "me":
        scope = 1
      break;
    }
  } else if (argVals[0].length > offset){
    //console.log("Handling a name");
    // handle name
    var name = repairName(argVals[0], offset);
    console.log(name);
    if (verb) {
      verbWord = argVals[0][1].toLowerCase();
      console.log (" I have capture verbword " + verbWord);
      if (verbWord === "am")
      {
        if (name.toLowerCase() === "i")
        {
          scope = 1;
          generic = false;
        }
      } else if (verbWord === "are"){
        if (name.toLowerCase() === "you")
        {

          eventID = 1;
          generic = false;
        }
      } else {
        generic = true;
      }
    }
    if (generic){
      if (name.toLowerCase() === "avrae")
        {
          eventID = 0;
          content = "Avrae is my much more advanced co-worker. Toss them a !Help to learn more.";
        } else {
          eventID = 2;
          scope = 2;
          content = name
        }
      }
    } else {
      eventID = 0;
      content = "Oops! you're missing a name or a verb! Please try again and provide a name, or use the --everyone or --me flag";
    }
    return {eid:eventID, content:content, scope:scope};
}

exports.parse = initialParse;
