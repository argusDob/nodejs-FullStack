const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt =require("jsonwebtoken");

//import typDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");
//Import Environment Variables and Mongoose Models
require("dotenv").config({ path: "variables.env" });
const User = require("./models/models/User");
const Post = require("./models/models/Post");


//Connect function  which uis allowing as  to use the URI  to connect with the mongoDB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const getUser = async token => {
  if (token){
      try {
        console.log(jwt.verify(token, process.env.SECRET))
        return await jwt.verify(token, process.env.SECRET)
      } catch(err){
        console.log(err);
        throw new AuthenticationError("Your session has ended . Please login again")

      }
  }
}
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { User, Post, currentUser: await getUser(token) };
  }
});
  //  context:  {
  //    User,
  //    Post
  //  }


server.listen(900).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
  