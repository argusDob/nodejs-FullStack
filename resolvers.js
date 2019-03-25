const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const createTokens = (user, secret, expiresIn) =>{
  const {username , email} = user;
  return jwt.sign({username, email}, secret, {expiresIn});
}

module.exports = {
  

  //property("createdB") ==path
// ref to User (Στην ουσια φτιαχνει ενα τσασον σαν και αυτο )
//  query{
//   getPosts{
//     title,
//     imageUrl
//     createdBy{
//       username
//     }
//   }
   
  Query: {  
    getCurrentUser: async (_, args , { User, currentUser }) =>{
      if(!currentUser){
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path:'favorites',
        model:'Post'
      });
      console.log(user);
      return user;
    }, 
    getPosts: async(_, args, {Post}) =>{  //{Post refer to Context}
      const posts= await Post.find({}).sort({createdDate:'desc'}).populate({
        path:'createdBy',  
        model:'User',       
      });
      return posts;
    },

    getUsers: async(_, args, {User}) =>{  //{Post refer to Context}
    const users= await User.find({}).sort(username);
    return users;
  }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      
     const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    },
     
    signInUser:async(_,{username,password}, {User}) =>{
      const user=await User.findOne({username});
      if(!user){
        throw new Error("Sorry dude the user doesn't exist")
      }
      //take the password that the user typed and compare it with the hash passport from the DB

      const isValidPassord = await bcrypt.compare(password, user.password);
      if(!isValidPassord){
        throw new Error("Dude invalid password")
      }
      //κανονικα γυρναει εναν γιουσερ αλλα αντικατασταθηκε με το create Tokens για ασφαλεια..
      return {
        token: createTokens(user,process.env.SECRET, '1hr')
      
      };
      // return User;


    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return {token: createTokens(newUser,process.env.SECRET, '1hr')};
      // return User;
    }
  }
};
