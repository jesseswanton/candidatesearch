import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  // Find a new candidate by username (login)
  const fetchCandidate = async () => {
    try {
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const login = candidates[0].login;
        if (login) {
          const candidateData = await searchGithubUser(login);
          setCandidate(candidateData);
        }
      }
    } catch (err) {
      console.error('Error fetching candidate:', err);
      setCandidate(null); // Clear state on error, was used during testing
    }
  };

  // Save candidate to local storage
  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      // Get a new candidate after saving
      fetchCandidate();
    }
  };

  // Load candidate on page refresh
  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div>
      <h1>Candidate Information</h1>
      {candidate ? (
        <div>
            <div className="avatar-image">
              {candidate.avatar_url ? (
                <img 
                  src={candidate.avatar_url}
                />
              ) : (
                <p>No avatar available</p>
              )}
            </div>
          <h2>
          <h2>
            {candidate.login || 'No Login Name Provided'} <span>({candidate.name ? candidate.name : <em>Full name not provided</em>})</span></h2>
          </h2>
          <p>
            <strong>Location:</strong> {candidate.location || 'Not Specified'}
          </p>
          <p>
            <strong>Email:</strong> {candidate.email || 'Not Specified'}
          </p>
          <p>
            <strong>Company:</strong> {candidate.company || 'Not Specified'}
          </p>
          <p>
            <strong>Bio:</strong> {candidate.bio || 'No Bio Available'}
          </p>
          <p>
          <strong>GitHub: </strong> 
              <a href={candidate.html_url || '#'} target="_blank" rel="noopener noreferrer">
                {candidate.html_url || 'Not Specified'}
              </a>
          </p>
        </div>
      ) : (
        <p>Loading candidate information...</p>
      )}
      <div className="button-container">
        <img
          className="button-image"
          src="./minus-image.png"
          alt="Fetch a new candidate"
          onClick={fetchCandidate}
        />
        <img
          className="button-image"
          src="./plus-image.png"
          alt="Save this candidate"
          onClick={saveCandidate}
        />
      </div>
    </div>
  );
};

export default CandidateSearch;