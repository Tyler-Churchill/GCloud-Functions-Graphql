import GraphQLServer from './server/GraphQLServer';

const server: GraphQLServer = new GraphQLServer();
let http: any; // exposed handler for the server

const env = process.env.NODE_ENV;

if (env === 'production') {
  // google cloud funcitons can handle express
  http = server.express;
} else if (env === 'local') {
  // run the apollo express server like usually locally
  server.startLocal();
} else {
  // proxy api-gateway/lambda events to apollo express
  http = server.handler();
}
 
module.exports.http = http;
