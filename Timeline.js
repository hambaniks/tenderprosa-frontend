import React, { useState } from 'react';

function Timeline() {
    const [projectValue, setProjectValue] = useState(100000);
    const [estimation, setEstimation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectValue: Number(projectValue) }),
        });
        const data = await response.json();
        setEstimation(data.message);
    };

    return (
        <div>
            <h2>Estimate Project Timeline</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project Value (R): </label>
                    <input type="number" value={projectValue} onChange={(e) => setProjectValue(e.target.value)} />
                </div>
                <button type="submit">Estimate</button>
            </form>
            {estimation && <p>{estimation}</p>}
        </div>
    );
}

export default Timeline;