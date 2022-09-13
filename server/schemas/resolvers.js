// THis is the resolver function for the thought Query. We are using the find method on the thought model and returning the thought data in descending order using the sort method that we chained onto it. We don't have to worry about error handling here because apollo can infer if something goes wrong and will automatically respond for us! BUT we need to remember to import Thought at the top of resolvers.js
const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  }
};

module.exports = resolvers;
