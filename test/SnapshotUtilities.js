'use strict';

const expect = require("expect");
const jestSnapshot = require("jest-snapshot");

let currentTest = null;

function toMatchSnapshot (received, propertyMatchers, testName) {
  console.log("toMatchSnapshot received=", received);
  console.log("toMatchSnapshot propertyMatchers=", propertyMatchers);
  console.log("toMatchSnapshot testName=", testName);
  // console.log("toMatchSnapshot currentTest=", currentTest);

  // create a snapshot state
  const snapshotState = new jestSnapshot.SnapshotState(currentTest.file, {
    // updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new"
  });

  // create the "this" object required by jestSnapshot
  const thisForJest = {
    currentTestName: makeTestTitleForJest(currentTest),
    // isNot - not needed
    snapshotState
  };

  // bind the this object
  const matcher = jestSnapshot.toMatchSnapshot.bind(thisForJest);

  // call the matcher
  console.log("toMatchSnapshot actual=", this.actual);
  const result = matcher(this.actual);
  console.log("toMatchSnapshot result=", result);

  // save the snap shot if needed
  snapshotState.save();

  // handle the result
  expect.assert(result.pass, !result.pass ? result.report() : "");

  return this;
}

function makeTestTitleForJest(test) {
  const title = [];

  let current = test;
  do {
    title.push(current.title);
    current = current.parent;
  } while (current)

  return title.reverse().join(" ");
}

function extendExpect() {
  console.log("calling expect.extend()");
  expect.extend({ toMatchSnapshot });
}

function attachSnapshot() {
  console.log(`attachSnapshot title=${this.currentTest.title}`);
  currentTest = this.currentTest;
}

function detachSnapshot() {
  console.log(`detachSnapshot title=${currentTest.title}`);
  currentTest = null;
}

export { extendExpect, attachSnapshot, detachSnapshot };
