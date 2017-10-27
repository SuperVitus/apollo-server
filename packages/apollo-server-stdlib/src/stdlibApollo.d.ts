import * as restify from 'restify';
import { GraphQLOptions } from 'apollo-server-core';
import * as GraphiQL from 'apollo-server-module-graphiql';
export interface ActionheroHandler {
    (options: GraphQLOptions, data: any, next: any): void;
}
export interface ActionheroGraphQLOptionsFunction {
    (options: GraphQLOptions): GraphQLOptions | Promise<GraphQLOptions>;
}
export declare function graphqlActionhero(options: GraphQLOptions): ActionheroHandler;
export interface ActionheroGraphiQLOptionsFunction {
    (req?: restify.Request): GraphiQL.GraphiQLData | Promise<GraphiQL.GraphiQLData>;
}
export declare function graphiqlActionhero(options: GraphiQL.GraphiQLData | ActionheroGraphiQLOptionsFunction): (data: any, next: any) => Promise<void>;
