"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphiQL = require("apollo-server-module-graphiql");
var apollo_server_core_1 = require("apollo-server-core");
function graphqlActionhero(options, data, next) {
    console.log(data)
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    if (arguments.length !== 3) {
        throw new Error("Apollo Server expects exactly 3 argument, got " + arguments.length);
    }
    apollo_server_core_1.runHttpQuery([data], {
        method: data.connection.rawConnection.method,
        options: options,
        query: data.connection.rawConnection.method === 'POST' ? data.connection.rawConnection.params.body : data.connection.rawConnection.params.query,
    }).then(function (gqlResponse) {
        data.connection.rawConnection.responseHeaders.push(['Content-Type', 'application/json']);
        data.response = gqlResponse;
        next();
    }, function (error) {
        if ('HttpQueryError' !== error.name) {
            throw error;
        }
        if (error.headers) {
            Object.keys(error.headers).forEach(function (header) {
                data.connection.rawConnection.responseHeaders.push(header, error.headers[header]);
            });
        }
        data.connection.rawConnection.responseHttpCode = error.statusCode;
        next(error.message);
    });
}
exports.graphqlActionhero = graphqlActionhero;
function graphiqlActionhero(options, data, next) {
    var query = data.params;
    return GraphiQL.resolveGraphiQLString(query, options, data.connection.rawConnection.req).then(function (graphiqlString) {
        data.connection.rawConnection.responseHeaders.push(['Content-Type', 'text/html']);
        data.response = graphiqlString;
        next(false);
    }, function (error) {
        data.connection.rawConnection.status;
        data.connection.rawConnection.responseHttpCode = 500;
        next(error.message);
    });
}
exports.graphiqlActionhero = graphiqlActionhero;
//# sourceMappingURL=actionheroApollo.js.map
