const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');

const app = express();

//Look for environnement variables
const mongoServer = process.env.MONGO_SERVER || localhost
const mongoServerPort = process.env.MONGO_SERVER_PORT || 27017
const mongoServerDB = process.env.MONGO_SERVER_DB || 'graphql'
const listenPort = 80

app.use(
  '/',
  graphqlHttp((req,res) => ({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: {req,res}
  }))
);

mongoose
  .connect(`mongodb://${mongoServer}:${mongoServerPort}/${mongoServerDB}`, {useNewUrlParser: true})
  .then(() => {
    app.listen(listenPort);
  })
  .catch(err => {
    console.log(err);
  });
