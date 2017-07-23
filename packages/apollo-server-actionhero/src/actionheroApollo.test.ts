import 'mocha';
import { graphiqlActionhero, graphqlActionhero } from './actionheroApollo';
import testSuite, { schema, CreateAppOptions } from 'apollo-server-integration-testsuite';
import { expect } from 'chai';
import { GraphQLOptions } from 'apollo-server-core';
import * as path from 'path';

var ActionheroPrototype = require(path.join(__dirname, '/../../actionhero.js'))
var actionhero = new ActionheroPrototype()

// function createApp(options: CreateAppOptions = {}) {

//   // Step 1 - Create server
//   // Step 2 - Register graphiql route
//   // Step 3 - Register POST/GET graph routes
//   return null
// }

describe('graphqlActionhero', () => {
  it('throws error if called without schema', () => {
     expect(() => graphqlActionhero(undefined as GraphQLOptions)).to.throw('Apollo Server requires options.');
  });

  it('throws an error if called with more than one argument', () => {
     expect(() => (<any>graphqlActionhero)({}, 'x')).to.throw(
       'Apollo Server expects exactly one argument, got 2');
  });

  it('generates a function if the options are ok', () => {
    expect(() => graphqlActionhero({ schema })).to.be.a('function');
  });
});

describe('integration:Actionhero', () => {
  // testSuite(createApp);
  return true
});
