import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISES } from '../utils/queries';


const ExerciseForm = () => {
    const [exerciseData, setExerciseData] = useState(null);
  
    const { loading, error, data } = useQuery(QUERY_EXERCISES, {
      variables: exerciseData,
    });
  
    useEffect(() => {
      if (!loading && !error && data) {
        setExerciseData(data.exercises);
      }
    }, [loading, error, data]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h2>Exercise List</h2>
        {exerciseData && exerciseData.map((exercise) => (
          <div key={exercise.name}>
            <p>Name: {exercise.name}</p>
            <p>Type: {exercise.type}</p>
            <p>Muscle: {exercise.muscle}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Instructions: {exercise.instructions}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  };
  
  export default ExerciseForm;