import React from 'react';
// useQuery from apollo/client is a HOOK
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request 

  //When we load the Home component in the application, we'll execute the query for the thought data. Because this is asynchronous, just like using fetch(), Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property.
  // working with promise-based functionality in react can get combersome but with loading property, we'll be able to conditionally render daa based on whether or not there is data to even display. 
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // this is called optional chaining. It negates the need to check if an object exists before accessing its properties. IN this case, no data will exist until the query to the server is finished. What we're saying is, if data exists, store in in the thoughts constant we just created. If data is undefined, save an empty array to the thoughts component. 
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
  <div className="flex-row justify-space-between">
    <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
  </div>
</main>
  )}

export default Home;
