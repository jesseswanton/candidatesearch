import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  // Remove candidate from array in local storage
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <>
      <h2>Potential Candidates</h2>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>GitHub</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td className="avatar-image-small">
                  <img src={candidate.avatar_url}/>
                </td>
                <td>{candidate.login || 'No Login Name Provided'} <br></br> ({candidate.name ? candidate.name : <em>Full name not provided</em>})</td>
                <td>{candidate.location || 'Not Specified'}</td>
                <td>{candidate.email || 'Not Specified'}</td>
                <td>{candidate.company || 'Not Specified'}</td>
                <td>{candidate.bio || 'No Bio Available'}</td>
                <td><a href={candidate.html_url || '#'} target="_blank" rel="noopener noreferrer">
                {candidate.html_url || 'Not Specified'}</a></td>
                <td>
                <div className="button-image-small" onClick={() => removeCandidate(candidate.login)}>
                  <img src="./minus-image.png" alt="Remove Candidate" />
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Please return to home and click the plus button to save candidates to this list</p>
      )}
    </>
  );
};

export default SavedCandidates;