const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    // query for getting logged in user's data
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //addUser mutation
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //login mutation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    
    // addBook mutation
    addBook: async (parent, args, context)=>{
      if(context.user){
        return User.findOneAndUpdate(
          {_id: args.userId},
          {
            $addToSet: {
              savedBooks: { bookId: args.bookId, authors: args.authors, title: args.title, description: args.description, image: args.image, link: args.link },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        )

      }
      throw new AuthenticationError('You need to be logged in!');
    },



    // deleteBook mutation
    deleteBook: async(parent, {userId, bookId}, context) =>{
      if(context.user){
        return User.findOneAndUpdate(
          {_id: userId},
          {
            $pull: {
              savedBooks: { bookId},
            },
          },
          {
            new: true,
            
          }
        )
      }
      throw new AuthenticationError('You need to be logged in!');
    },


    
  },
};

module.exports = resolvers;
