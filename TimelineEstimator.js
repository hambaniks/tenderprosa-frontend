import React, { useState } from 'react';

function TimelineEstimator() {
  const [laborDays, setLaborDays] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/timeline/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalLaborDays: laborDays })
      });
      if (!res.ok) throw new Error('Estimation failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Project Timeline Estimation</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" min="1" placeholder="Total Labor Days" value={laborDays} onChange={e => setLaborDays(e.target.value)} required />
        <button type="submit" disabled={loading}>Estimate</button>
      </form>
      {loading && <p>Estimating...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {result && (
        <div>
          <h3>Executive Summary</h3>
          <p>{result.executiveSummary}</p>
          <h4>Detailed Analysis</h4>
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result.detailedAnalysis, null, 2)}</pre>
          <h4>Recommendations</h4>
          <p>{result.recommendations}</p>
          <h4>Compliance Notes</h4>
          <p>{result.complianceNotes}</p>
          <h4>Next Steps</h4>
          <p>{result.nextSteps}</p>
        </div>
      )}
    </div>
  );
}

export default TimelineEstimator;
