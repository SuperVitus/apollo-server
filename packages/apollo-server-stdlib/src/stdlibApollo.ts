import * as url from 'url';
import Boom from 'boom';
import * as GraphiQL from 'apollo-server-module-graphiql';
import { GraphQLOptions, HttpQueryError, runHttpQuery } from 'apollo-server-core';

export interface StdlibGraphQLOptionsFunction {
  (context?: any): GraphQLOptions | Promise<GraphQLOptions>;
}

export function graphqlStdlib(options: GraphQLOptions, context: any, next: any): void {

  if (!options) {
    throw new Error('Apollo Server requires options.');
  }

  if (arguments.length !== 3) {
    throw new Error(`Apollo Server expects exactly 3 argument, got ${arguments.length}`);
  }
  runHttpQuery([context], {
    method: 'POST',
    options: options,
    query: context.params,
  }).then((gqlResponse) => {
    next(null, JSON.parse(gqlResponse);
  }, (error: HttpQueryError) => {
    if ( 'HttpQueryError' !== error.name ) {
      throw error;
    }

    var err = Boom.create(error.statusCode);
    err.output.payload.message = error.message;
    if (error.headers) {
        Object.keys(error.headers).forEach(function (header) {
            err.output.headers[header] = error.headers[header];
        });
    }
    return next(err);
    // if ( error.headers ) {
    //   Object.keys(error.headers).forEach((header) => {
    //     context.connection.rawConnection.responseHeaders.push(header, error.headers[header]);
    //   });
    // }

    // context.connection.rawConnection.responseHttpCode = error.statusCode;
    // next(error.message);
  });

}

export interface StdlibGraphiQLOptionsFunction {
  (context?: any): GraphiQL.GraphiQLData | Promise<GraphiQL.GraphiQLData>;
}

/* This middleware returns the html for the GraphiQL interactive query UI
 *
 * GraphiQLData arguments
 *
 * - endpointURL: the relative or absolute URL for the endpoint which GraphiQL will make queries to
 * - (optional) query: the GraphQL query to pre-fill in the GraphiQL UI
 * - (optional) variables: a JS object of variables to pre-fill in the GraphiQL UI
 * - (optional) operationName: the operationName to pre-fill in the GraphiQL UI
 * - (optional) result: the result of the query to pre-fill in the GraphiQL UI
 */

export function graphiqlStdlib(options: GraphiQL.GraphiQLData | StdlibGraphiQLOptionsFunction, context:any, next: any) {
  const query = context.params;
  return GraphiQL.resolveGraphiQLString(query, options, context.connection.rawConnection.req).then(graphiqlString => {
    context.connection.rawConnection.responseHeaders.push(['Content-Type','text/html'])
    context.response = graphiqlString
    next(false);
  }, error => {
    context.connection.rawConnection.status
    context.connection.rawConnection.responseHttpCode = 500;
    next(error.message);
  });
}
