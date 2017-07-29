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

  // takes the first input as the command to execute
  var cmd = argVals[0][0].toLowerCase();
  var msg = "Sorry, I'm not sure what you want.";
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
      eventID = sub.eid;
      content = sub.content;
      break;
    case 'who':
      var sub = parseWho(true, 2, argVals);
      eventID = sub.eid;
      content = sub.content;
    break;
    case 'r':
      // recall initiative
      if (argVals.length > 1)
      {
        console.log(argVals);
        switch(argVals[1][0].toLowerCase()) {

          case('r'):
            eventID = 7;
            content = false;
            break;
          case('d'):
            eventID = 7;
            content = true;
            break;
          case('v'):
            eventID = 6;
            content = true;
            break;
        }
      } else {
        eventID = 6;
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
        for (var i = 1; i < argVals.length; i++)
        {
          console.log(argVals);
          if (argVals[i].length < 2)
          {
            eventID = 0;
            content = "Oops, did you forget to add a value for your flag?\n";
          } else {
            console.log("Switching on: " + argVals[i][0]);
            switch (argVals[i][0].toLowerCase()){
              case "n":
              case "name":
                console.log("Switching");
                var name = repairName(argVals[i], 1);
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
          eventID = 5;
          content = update;

        } else {
          eventID = 0;
          content = "Could not proceed with recording your information. No values were correctly flagged"
        }
      }
    break;
    default:
    break;
  }

  callback(eventID, content)
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
        // handle -- flag
        eventID = 2;
      break;
      case "m":
      case "me":
        eventID = 3;
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
          eventID = 3;
          generic = false;
        }
      } else if (verbWord === "are"){
        if (name.toLowerCase() === "you")
        {
          //console.log (" I Need to post about myself");
          eventID = 1;
          generic = false;
        }
      } else {
        //console.log("Looking at generics");
        generic = true;
      }
    }
    if (generic){
      if (name.toLowerCase() === "avrae")
        {
          eventID = 0;
          content = "Avrae is my much more advanced co-worker. Toss them a !Help to learn more.";
        } else {
          eventID = 4;
          content = name
        }
      }
    } else {
      eventID = 0;
      content = "Oops! you're missing a name or a verb! Please try again and provide a name, or use the --everyone or --me flag";
    }
    return {eid:eventID, content:content};
}

exports.parse = initialParse;
