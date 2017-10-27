"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var actionheroApollo_1 = require("./actionheroApollo");
var apollo_server_integration_testsuite_1 = require("apollo-server-integration-testsuite");
var chai_1 = require("chai");
var path = require("path");
var ActionheroPrototype = require(path.join(__dirname, '/../../actionhero.js'));
var actionhero = new ActionheroPrototype();
describe('graphqlActionhero', function () {
    it('throws error if called without schema', function () {
        chai_1.expect(function () { return actionheroApollo_1.graphqlActionhero(undefined); }).to.throw('Apollo Server requires options.');
    });
    it('throws an error if called with more than one argument', function () {
        chai_1.expect(function () { return actionheroApollo_1.graphqlActionhero({}, 'x'); }).to.throw('Apollo Server expects exactly one argument, got 2');
    });
    it('generates a function if the options are ok', function () {
        chai_1.expect(function () { return actionheroApollo_1.graphqlActionhero({ schema: apollo_server_integration_testsuite_1.schema }); }).to.be.a('function');
    });
});
describe('integration:Actionhero', function () {
    return true;
});
//# sourceMappingURL=actionheroApollo.test.js.map