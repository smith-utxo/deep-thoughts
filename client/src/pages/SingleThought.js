import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

// the variables loading and data are destructured from the useQuery Hook. THe loading variable is then used to briefly show a loading <div> element, and the data variable is used to populate a thought object. 

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHTS, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
    </div>
  );
};

export default SingleThought;

