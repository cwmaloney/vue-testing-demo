// setup JSDOM
require('jsdom-global')();

const expect = require("expect");

// make expect available globally
global.expect = expect;

// const jestSnapshot = require("jest-snapshot");


// function toMatchSnapshot(received, propertyMatchers, testName) {
//   console.log("toMatchSnapshot this=", this);
//   if (!this.test) {
//     throw new Error("Missing toMatchSnapshot this.test");
//   }

//   const { test } = this;

//   // create a snapshot state
//   const snapshotState = new jestSnapshot.SnapshotState(test.file, {
//     // updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new"
//   });

//   // create the "this" object required by jestSnapshot
//   const thisForJest = {
//     currentTestName: makeTestTitleForJest(test),
//     // isNot - not needed
//     snapshotState
//   };

//   // bind the this object
//   const matcher = jestSnapshot.toMatchSnapshot.bind(thisForJest);

//   // call the matcher
//   const result = matcher(arguments);

//   // save the snap shot if needed
//   snapshotState.save();

//   // handle the result
//   expect.assert(result.pass, !result.pass ? result.report() : "");

//   return this;
// }

// function makeTestTitleForJest(test) {
//   const title = [];

//   let current = test;
//   while (!current.parent) {
//     title.push(current.title);
//     current = current.parent;
//   }

//   return title.reverse().join(" ");
// }

// console.log("expect=", expect);
// console.log("calling expect.extend({ toMatchSnapshot })");
// expect.extend({ toMatchSnapshot });
// console.log("expect=", expect);


const snapshot = require('jest-snapshot');

  expect.extend({
    toMatchSnapshot: snapshot.toMatchSnapshot,
    toThrowErrorMatchingSnapshot: snapshot.toThrowErrorMatchingSnapshot,
  });

  expect.addSnapshotSerializer = snapshot.addSerializer;
