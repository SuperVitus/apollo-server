# graphql-server-actionhero

[![npm version](https://badge.fury.io/js/graphql-server-core.svg)](https://badge.fury.io/js/graphql-server-core)
[![Build Status](https://travis-ci.org/apollographql/graphql-server.svg?branch=master)](https://travis-ci.org/apollographql/graphql-server)
[![Coverage Status](https://coveralls.io/repos/github/apollographql/graphql-server/badge.svg?branch=master)](https://coveralls.io/github/apollographql/graphql-server?branch=master)
[![Get on Slack](https://img.shields.io/badge/slack-join-orange.svg)](http://www.apollodata.com/#slack)

This is the Actionhero integration of GraphQL Server. GraphQL Server is a community-maintained open-source GraphQL server that works with all Node.js HTTP server frameworks: Express, Connect, Hapi, Koa and Actionhero. [Read the docs](http://dev.apollodata.com/tools/apollo-server/index.html).

## Principles

GraphQL Server is built with the following principles in mind:

* **By the community, for the community**: GraphQL Server's development is driven by the needs of developers
* **Simplicity**: by keeping things simple, GraphQL Server is easier to use, easier to contribute to, and more secure
* **Performance**: GraphQL Server is well-tested and production-ready - no modifications needed


Anyone is welcome to contribute to GraphQL Server, just read [CONTRIBUTING.md](https://github.com/apollographql/apollo-server/blob/master/CONTRIBUTING.md), take a look at the [roadmap](https://github.com/apollographql/apollo-server/blob/master/ROADMAP.md) and make your first PR!

## Actionhero Action Usage

```js
import { graphqlActionhero, graphiqlActionhero } from 'apollo-server-actionhero';

exports.graph = {
  name: 'graph',
  description: 'Graph Endpoint',
  inputs: {
    variables : {
      default : function(){ return '{}' }
    },
    query : {},
  },
  run: function (api, data, next) {
    const schema = api.graphql.schema;
    graphqlActionhero({ schema : schema }),(api,data,next)
  }
};

exports.graphiql = {
  name: 'graphiql',
  description: 'Graph Endpoint',
  scopes : ['public'],
  middleware: [],

  inputs: {
    variables : {
      default : function(){ return '{}' }
    },
    query : {},
    operationName : {},
  },

  run: function (api, data, next) {
    const schema = api.graphql.schemas.graph
    graphiqlActionhero({ endpointURL: '/api/graph' })(api,data,next)
  }
};
```
