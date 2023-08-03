import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goalText: String!) {
    addGoal(goalText: $goalText) {
      _id
      goalText
      createdAt
      username
      endDate
      startDate
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
      _id
      goalText
      createdAt
      username
      endDate
      startDate
    }
  }
`;

export const ADD_EXERCISE = gql`
  mutation addExercise($name: String!, $type: String!, $muscle: String!, $difficulty: String!) {
    addExercise(name: $name, type: $type, muscle: $muscle, difficulty: $difficulty) {
      name
      type
      muscle
      difficulty
    }
  }
`;

export const REMOVE_EXERCISE = gql`
  mutation removeExercise($exerciseId: ID!) {
    removeExercise(exerciseId: $exerciseId) {
      name
      type
      muscle
      difficulty
    }
  }
`;
