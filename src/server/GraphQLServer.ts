import 'reflect-metadata';
import * as express from 'express'
import serverless = require('serverless-http')
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { UserResolvers } from '../modules/users/resolvers';
import { ProductResolvers } from '../modules/products/resolvers';

/**
 * A serverless capabale version of ApolloServer
 */
class GraphQLServer {
  express: any;
  server: ApolloServer;
  schema: GraphQLSchema;
  constructor() {
    // create an express app
    this.express = express();
    // combine and make the GraphQL schema
    this.schema = buildSchemaSync({
      resolvers: [UserResolvers, ProductResolvers]
    });
    // create an apollo server with the newly created schema
    this.server = new ApolloServer({
      schema: this.schema,
      introspection: true,
      playground: true
    });
    // inject express into apollos request middleware 
    this.server.applyMiddleware({ app: this.express });
  }

  /**
   * Local development handler to use with serverless offline
   */
  handler() {
    return serverless(this.express);
  }

  /**
   * Local development
   */
  async startLocal() {
    await this.express.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`
      )
    );
  }
}

export default GraphQLServer;
