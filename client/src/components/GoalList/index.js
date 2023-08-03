import React from 'react';
import { Link } from 'react-router-dom';

const GoalList = ({
  goals,
  goalText,
  showUsername = true,
}) => {
  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }

  return (
    <div>
      {showUsername && <h3>{goalText}</h3>}
      {goals &&
        goals.map((goal) => (
          <div key={goal._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${goal.goalText}`}
                >
                  {goal.goalText} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this goal on {goal.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this goal on {goal.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{goal.goalText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/goals/${goal._id}`}
            >
              Join the discussion on this Goal.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default GoalList;
