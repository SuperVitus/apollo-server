"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphiQL = require("apollo-server-module-graphiql");
var apollo_server_core_1 = require("apollo-server-core");
function graphqlStdlib(options, context, next) {
    console.log(data)
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    if (arguments.length !== 3) {
        throw new Error("Apollo Server expects exactly 3 argument, got " + arguments.length);
    }
    apollo_server_core_1.runHttpQuery([data], {
        method: 'POST',
        options: options,
        query: context.params,
    }).then(function (gqlResponse) {
        next(null,JSON.parse(gqlResponse));
    }, function (error) {
        if ('HttpQueryError' !== error.name) {
            throw error;
        }

        if (true === error.isGraphQLError) {
            return next(error.message)
            // .code(error.statusCode).type('application/json');
        }
        var err = Boom.create(error.statusCode);
        err.output.payload.message = error.message;
        if (error.headers) {
            Object.keys(error.headers).forEach(function (header) {
                err.output.headers[header] = error.headers[header];
            });
        }
        return next(err);

    });
}
exports.graphqlStdlib = graphqlStdlib;
function graphiqlStdlib(options, data, next) {
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
exports.graphiqlStdlib = graphiqlStdlib;
//# sourceMappingURL=StdlibApollo.js.map
