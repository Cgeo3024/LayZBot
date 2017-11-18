// rolls number dice with sides, sides, and returns the sum.
function ndx(number, sides)
{
  var total = 0;
  for (var i = 0; i < number; i++)
  {
    total += (Math.ceil(Math.random()*sides));
  }
  console.log("Within ndx");
  console.log("Number " + number +", Sides " + sides +". TOTAL:" + total);
  return total;
}

module.exports = ndx;
