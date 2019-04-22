const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type User {
  _id: ID!
}

type Password {
  _id: ID!
}

type RootQuery {
  "Login using email/username and password, retrieve token+cookie"
  login(username:String,email:String,password:String!):Password!
}

type RootMutation {
  "Log in the request, store user and password to be used as 'new' in userID fields"
  loginMutation(username:String,email:String,password:String!):Password!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
