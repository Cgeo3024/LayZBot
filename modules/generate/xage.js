function genAge()
{
  var ageChance = Math.ceil(Math.random()*100);
  var nuAge;

  if (ageChance == 100)
  {
    nuAge = 61 + Math.floor(Math.random()*22);
  } else if (ageChance > 89)
  {
    nuAge = 51 + Math.floor(Math.random()*10);
  } else if (ageChance > 69)
  {
    nuAge = 41 + Math.floor(Math.random()*10);
  } else if (ageChance > 59)
  {
    nuAge = 31 + Math.floor(Math.random()*10);
  } else if (ageChance > 20)
  {
    nuAge = 21 + Math.floor(Math.random()*10);
  } else {
    nuAge = 15 + Math.floor(Math.random()*5);
  }

  return nuAge;
}

module.exports = genAge;
