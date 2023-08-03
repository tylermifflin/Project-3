import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_EXERCISE = gql`
  mutation AddExercise(
    $name: String!
    $type: String!
    $muscle: String!
    $difficulty: String!
  ) {
    addExercise(
      name: $name
      type: $type
      muscle: $muscle
      difficulty: $difficulty
    ) {
      name
      type
      muscle
      difficulty
    }
  }
`;

const ExerciseForm = () => {
  const [exerciseData, setExerciseData] = useState({
    name: '',
    type: '',
    muscle: '',
    difficulty: '',
  });

  const [addExercise] = useMutation(ADD_EXERCISE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExercise({
        variables: {
          ...exerciseData,
        },
      });
      // Clear the form after successful submission
      setExerciseData({
        name: '',
        type: '',
        muscle: '',
        difficulty: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Exercise Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={exerciseData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            name="type"
            value={exerciseData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="muscle">Muscle:</label>
          <input
            type="text"
            name="muscle"
            value={exerciseData.muscle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            type="text"
            name="difficulty"
            value={exerciseData.difficulty}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default ExerciseForm;