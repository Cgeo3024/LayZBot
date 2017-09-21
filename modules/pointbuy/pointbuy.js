var maxpoints = 27;
var maxstats = 6;
var minstats = 6;
var maxscore = 15;
var minscore = 8;


var update = function(mpoint, mstat, mscore, nscore)
{
  maxpoints = mpoint;
  maxstats  = mstat;
  minstast  = mstat;
  maxscore  = mscore;
  minscore  = nscore;
}


var validate = function(data){

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

    if (val > maxscore)
    {
      err += "Value too high! Score " + count + " : " + val
      + " Should not exceed " + maxscore + "!\n";
    }


    if ( val > 13 )
    {
      curr += 2* val%13;
      val -= val%13;
    }
    if (val < minscore)
    {
      err == "Value too low! Score " + count + " : " + val
      + " Should be at least "+ minscore +"!\n";
    } else {
        curr += val%minscore;
    }

  }

  if (count < minstats)
  {
    err += "Not enough scores! You've only entered " + count +"/6 required scores\n";
  }

  if (count > maxstats)
  {
    err += "Too many scores! You've enetered "  + count +"/6 allowed scores\n";
  }

  if (curr > maxpoints)
  {
    err += "You've assigned too many points! You are allowed " + maxpoints +
    " and have assigned " + curr +"\n";
  }

  if (curr < maxpoints)
  {
    err += "You've assigned too few points! You are allowed " + maxpoints +
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
  return msg;
}

exports.config    = update;
exports.validate  = validate;
