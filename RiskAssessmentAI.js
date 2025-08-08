import React, { useState } from 'react';

function RiskAssessmentAI() {
  const [activities, setActivities] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const acts = activities.split('\n').map(a => a.trim()).filter(Boolean);
      const res = await fetch('/api/risk/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activities: acts })
      });
      if (!res.ok) throw new Error('Risk assessment failed');
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
      <h2>AI-Powered Risk Assessment</h2>
      <form onSubmit={handleSubmit}>
        <textarea rows="5" cols="40" placeholder="Enter activities, one per line" value={activities} onChange={e => setActivities(e.target.value)} required />
        <br />
        <button type="submit" disabled={loading}>Assess Risk</button>
      </form>
      {loading && <p>Assessing...</p>}
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

export default RiskAssessmentAI;
