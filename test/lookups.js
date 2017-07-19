var expect = require("chai").expect;
var dbfile = require("../lookups.js");
console.log(dbfile);
describe("Database Interface", function(){
  describe("Look up everyone", function(){
    context("when called", function(){
      it('Should return an array of values and no error', function(done){
        dbfile.everyone(null, function(result, err){
          expect(err).to.be.null;
          expect(result).to.be.an('array');
          done();
        });
      });
    });

  });

  describe("Look up someone", function(){
    context("When used on a non existent user", function(){
      it('Should return an empty array and no error', function(done){
        dbfile.other("fakename", function(result, err){
          expect(err).to.be.null;
          expect(result).to.have.lengthOf(0);
          expect(result).to.be.an('array');
          done();
        });
      });
    });
    context("When used on a user that exists", function(){
      it("Should return that user's details", function(done){
        dbfile.other("Alt+F7", function(result, err){
          expect(err).to.be.null;
          expect(result).to.have.lengthOf(1);
          expect(result[0].name).to.equal("Lady Agatha Cherrybrook");
          done();
        });
      });
    });
  });

  describe("Update User", function(){
    context("When adding a new user", function(){
      it("Should add a user_lower value to the stored data", function(done){
        dbfile.deleteUser("TestUser", function(result){
          var update = {name:"Jeremy", link:"fake.com"}
          dbfile.update(update, "TestUser", function(r){
            expect(r).equals(false);
            dbfile.other("TestUser", function(result, err){
              expect(result).is.an('array');
              console.log(result);
              console.log(err);
              done();
            });
          });
        });
      });
    });
    context("When modifying an existing user", function(){

    });
  })
  /*describe("Remove User", function(){
    it("Should remove the user's details", function(done){
      dbfile.deleteUser("testuser", function(result, err){
        dbfile.update({name: "Jeremy", link : "Fake.com"}, "testuser", function(result){
          expect(result).to.be.false;
          console.log(result);
          dbfile.other("testuser", function(result, err){
            console.log(result);
            console.log(err);
            expect(result).to.have.lengthOf.at.least(1);
            dbfile.deleteUser("testuser", function(result, err){
              console.log(result);
              console.log(err);
              expect(err).to.be.null;
              dbfile.other("testuser", function(result, err){
                expect(result).to.have.lengthOf(0);
                done();
              });
            });
          });
        });
      });
    });
  }); */

});
