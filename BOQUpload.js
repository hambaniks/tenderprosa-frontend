import React, { useState } from 'react';

function BOQUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('boqfile', file);
    try {
      const res = await fetch('/api/boq/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
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
      <h2>Upload BOQ File (Excel/CSV)</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>Upload & Analyze</button>
      </form>
      {loading && <p>Analyzing...</p>}
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

export default BOQUpload;
