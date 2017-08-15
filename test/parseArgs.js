var expect = require("chai").expect;
var parser = require("../modules/messaging/parseArgs.js");

describe('parsing general', function(){

  context("when the input is completely empty", function(){
    it('Should return an error string', function(){
      parser.parse("", function(data, eventID){
        expect(data).to.equal("Error: Empty String");
      });
    });
    it('Should indicate a silent error', function(){
      var result = parser.parse("", function(data,eventID){
          expect(eventID).to.equal(-1);
      });
    });
  });

});

describe('parsing help', function(){
  it('Should recognise the full string', function(){
    parser.parse("Help", function(data, eventID){
      //expect(data).to.equal("");
      expect(eventID).to.equal(1);
    });
  });
  it('Should recognise the full string in randomCase', function(){
    parser.parse("hELp", function(data, eventID){
      //expect(data).to.equal("");
      expect(eventID).to.equal(1);
    });
  });
  it('Should recognise the single letter', function(){
    parser.parse("h", function(data, eventID){
      //expect(data).to.equal("");
      expect(eventID).to.equal(1);
    });
  });
});

describe('parsing "?Who"', function(){

  context("when given the --everyone flag",function(){
    it('Should indicate a global query', function(){
      parser.parse("Who is --everyone", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(0);
      });
    });
    it('Should recognise shorthand --e flag', function(){
      parser.parse("Who is --e", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(0);
      });
    });
    it('Should recognise shorthand ?w --e command', function(){
      parser.parse("W --e", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(0);
      });
    });
  });

  context("when given the --me flag",function(){
    it('Should indicate a self query', function(){
      parser.parse("?Who is --me", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(1);
      });
    });
    it('Should recognise shorthand --m flag', function(){
      parser.parse("Who is --m", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(1);
      });
    });
    it('Should recognise shorthand ?w --m command', function(){
      parser.parse("W --m", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(1);
      });
    });
    it('Should recognise the ?Who am I command', function(){
      parser.parse("Who am I", function(data, eventID,scope){
        expect(eventID).to.equal(2);
        expect(scope).to.equal(1);
      });
    });
  });
  context("When given a name", function(){
    it('Should return the queried name', function(){
      parser.parse("Who is Erica", function(data, eventID){
        expect(data).to.equal("Erica");
      });
    });
    it('Should indicate a query event', function(){
      var result = parser.parse("Who is Erica", function(data,eventID){
          expect(eventID).to.equal(2);
      });
    });
    it('Should indicate the correct scope', function(){
      var result = parser.parse("Who is Erica", function(data,eventID,scope){
          expect(scope).to.equal(2);
      });
    });
  });
});
