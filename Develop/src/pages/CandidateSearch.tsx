import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import SavedCandidates from './SavedCandidates';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // State for storing saved candidates
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (username) {
      const fetchGithubUserData = async () => {
        const result = await searchGithubUser(username);
        setCandidates([result, ...candidates]); // Add the new candidate to the existing list
      };

      fetchGithubUserData();
    }
  }, [username]);

  return (
    <div>
      <h1>CandidateSearch</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <SavedCandidates candidates={candidates} />
    </div>
  );
};

export default CandidateSearch;
