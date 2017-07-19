var expect = require("chai").expect;
var dbfile = require("../lookups.js");
console.log(dbfile);
describe("Database Interface", function(){
  describe("Look up everyone", function(){
    it('Should return an array of values', function(done){
      dbfile.everyone( function(result, err){
        expect(err).to.be.null;
        expect(result).to.have.lengthOf.at.least(1);
        done();
      });

    });
  });
});
