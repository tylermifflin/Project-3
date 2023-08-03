const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Quote, Exercise } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('goals exercises');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('goals exercises');
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    goal: async (parent, { goalId }) => {
      return Goal.findOne({ _id: goalId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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
    addGoal: async (parent, { goalText }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalText,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({
          _id: goalId,
          goalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addExercise: async (parent, { name, type, muscle, difficulty }) => {
      // Create the exercise in your local MongoDB
      const exercise = await Exercise.create({ name, type, muscle, difficulty });

      // If you want, you can also make the API call here and save the data directly to your MongoDB
      // Example:
      const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {
          name,
          type,
          muscle,
          difficulty,
        },
        headers: {
          'X-RapidAPI-Key': '28b5db87b4mshbf9a82e25a27861p1ce71cjsn88ff5c0f5ba5',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const exerciseDataFromAPI = response.data;
        // Save exerciseDataFromAPI to your MongoDB if needed
      } catch (error) {
        console.error(error);
      }

      return exercise;
    },
  },
};

module.exports = resolvers;
