import React from 'react';
import { useQuery } from '@apollo/client';

import GoalList from '../components/GoalList';
import GoalForm from '../components/GoalForm';

import { QUERY_GOALS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_GOALS);
  const goals = data?.goals || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <GoalForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GoalList
              goals={goals}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
