import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = ({ candidates = [] }: { candidates?: Candidate[] }) => {
  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <li key={candidate.id}>
              <h2>{candidate.name}</h2>
              <p><strong>Location:</strong> {candidate.location}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Company:</strong> {candidate.company}</p>
              <p><strong>Bio:</strong> {candidate.bio}</p>
              <p><strong>Hireable:</strong> {candidate.hireable ? 'Yes' : 'No'}</p>
            </li>
          ))
        ) : (
          <p>No candidates found.</p>
        )}
      </ul>
    </>
  );
};

export default SavedCandidates;
