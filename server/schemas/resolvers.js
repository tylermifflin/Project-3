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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    exercises: async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
          // params: {
          //   name: 'dumbbell bench press',
          //   type: 'strength',
          //   muscle: 'chest',
          //   difficulty: 'beginner'
          // },
          headers: {
            'X-RapidAPI-Key': '28b5db87b4mshbf9a82e25a27861p1ce71cjsn88ff5c0f5ba5',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
          }
        };

        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch exercises from API');
      }
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
    addExercise: async (parent, { name, type, muscle, difficulty }, context) => {
      if (context.user) {
        const exercise = await Exercise.create({
          name,
          type,
          muscle,
          difficulty,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { exercises: exercise._id } }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const exercise = await Exercise.findOneAndDelete({
          _id: exerciseId,
          exerciseAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { exercises: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
