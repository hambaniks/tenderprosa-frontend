import React, { useState } from 'react';

function AppointmentLetterPDF() {
  const [form, setForm] = useState({
    projectName: '',
    contractor: '',
    appointeeName: '',
    role: '',
    date: '',
    siteAddress: ''
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
      const res = await fetch('/api/appointments/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AppointmentLetter_${form.role || 'Role'}.pdf`;
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
      <h2>Generate Appointment Letter (PDF)</h2>
      <form onSubmit={handleDownload}>
        <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} required /> <br />
        <input name="contractor" placeholder="Contractor" value={form.contractor} onChange={handleChange} required /> <br />
        <input name="appointeeName" placeholder="Appointee Name" value={form.appointeeName} onChange={handleChange} required /> <br />
        <input name="role" placeholder="Role (e.g. Safety Officer)" value={form.role} onChange={handleChange} required /> <br />
        <input name="date" type="date" value={form.date} onChange={handleChange} required /> <br />
        <input name="siteAddress" placeholder="Site Address" value={form.siteAddress} onChange={handleChange} required /> <br />
        <button type="submit" disabled={loading}>Generate PDF</button>
      </form>
      {loading && <p>Generating PDF...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default AppointmentLetterPDF;
