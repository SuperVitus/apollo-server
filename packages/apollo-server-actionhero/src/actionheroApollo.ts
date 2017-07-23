import * as restify from 'restify';
import * as url from 'url';
import { GraphQLOptions, HttpQueryError, runHttpQuery } from 'apollo-server-core';
import * as GraphiQL from 'apollo-server-module-graphiql';

// Design principles:
// - You can issue a GET or POST with your query.
// - simple, fast and secure
//

export interface ActionheroHandler {
  (_: any, data: any, next: any): void;
}

export interface ActionheroGraphQLOptionsFunction {
  (_:any, data?: any, next?: any): GraphQLOptions | Promise<GraphQLOptions>;
}

export function graphqlActionhero(options: GraphQLOptions): ActionheroHandler {
  if (!options) {
    throw new Error('Apollo Server requires options.');
  }

  if (arguments.length > 1) {
    throw new Error(`Apollo Server expects exactly one argument, got ${arguments.length}`);
  }

  return (_: any, data: any, next: any): void => {
    runHttpQuery([data.connection.rawConnection.req], {
      method: data.connection.method,
      options: options,
      query: data.connection.rawConnection.method === 'POST' ? data.connection.rawConnection.params.body : data.connection.rawConnection.params.query,
    }).then((gqlResponse) => {
      data.connection.rawConnection.responseHeaders.push(['Content-Type','application/json']);
      data.response = gqlResponse;
      next();
    }, (error: HttpQueryError) => {
      if ( 'HttpQueryError' !== error.name ) {
        throw error;
      }

      if ( error.headers ) {
        Object.keys(error.headers).forEach((header) => {
          data.connection.rawConnection.responseHeaders.push(header, error.headers[header]);
        });
      }

      data.connection.rawConnection.responseHttpCode = error.statusCode;
      next(error.message);
    });
  };
}

export interface ActionheroGraphiQLOptionsFunction {
  (req?: restify.Request): GraphiQL.GraphiQLData | Promise<GraphiQL.GraphiQLData>;
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

export function graphiqlActionhero(options: GraphiQL.GraphiQLData | ActionheroGraphiQLOptionsFunction) {
  return (data:any, next: any) => {
    const query = data.params;
    return GraphiQL.resolveGraphiQLString(query, options, data.connection.rawConnection.req).then(graphiqlString => {
      data.connection.rawConnection.responseHeaders.push(['Content-Type','text/html'])
      data.response = graphiqlString
      next(false);
    }, error => {
      data.connection.rawConnection.status
      data.connection.rawConnection.responseHttpCode = 500;
      next(error.message);
    });
  };
}
