import React, { useState } from 'react';

function SafetyPlanPDF() {
  const [form, setForm] = useState({
    projectName: '',
    contractor: '',
    safetyOfficer: '',
    siteAddress: '',
    scopeOfWorks: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/safetyplan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SafetyPlan_${form.projectName || 'Project'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Health & Safety Plan (PDF)</h2>
      <form onSubmit={handleDownload}>
        <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} required /> <br />
        <input name="contractor" placeholder="Contractor" value={form.contractor} onChange={handleChange} required /> <br />
        <input name="safetyOfficer" placeholder="Safety Officer" value={form.safetyOfficer} onChange={handleChange} required /> <br />
        <input name="siteAddress" placeholder="Site Address" value={form.siteAddress} onChange={handleChange} required /> <br />
        <input name="scopeOfWorks" placeholder="Scope of Works" value={form.scopeOfWorks} onChange={handleChange} required /> <br />
        <button type="submit" disabled={loading}>Generate PDF</button>
      </form>
      {loading && <p>Generating PDF...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default SafetyPlanPDF;
