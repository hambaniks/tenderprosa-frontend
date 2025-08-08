import React, { useState } from 'react';

function Appointments() {
    const [appointeeName, setAppointeeName] = useState('');
    const [role, setRole] = useState('Safety Officer');
    const [confirmation, setConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/appointment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointeeName, role }),
        });
        const data = await response.json();
        setConfirmation(data.message);
    };

    return (
        <div>
            <h2>Generate Legal Appointment Letter</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Appointee Name: </label>
                    <input type="text" value={appointeeName} onChange={(e) => setAppointeeName(e.target.value)} />
                </div>
                <div>
                    <label>Role: </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option>Safety Officer</option>
                        <option>First Aider</option>
                        <option>Risk Assessor</option>
                    </select>
                </div>
                <button type="submit">Generate Letter</button>
            </form>
            {confirmation && <p>{confirmation}</p>}
        </div>
    );
}

export default Appointments;