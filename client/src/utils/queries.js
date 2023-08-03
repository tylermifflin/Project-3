import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      goals {
        _id
        goalText
        createdAt
        startDate
        endDate
      }
      exercises {
        name
        type
        muscle
        difficulty
      }
    }
  }
`;

export const QUERY_GOALS = gql`
  query getGoals($username: String) {
    goals(username: $username) {
      _id
      goalText
      createdAt
      startDate
      endDate
    }
  }
`;

export const QUERY_EXERCISES = gql`
  query getExercises {
    exercises {
      name
      type
      muscle
      difficulty
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query getSingleGoal($goalId: ID!) {
    goal(goalId: $goalId) {
      _id
      goalText
      createdAt
      startDate
      endDate
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      goals {
        _id
        goalText
        createdAt
        startDate
        endDate
      }
      exercises {
        name
        type
        muscle
        difficulty
      }
    }
  }
`;





