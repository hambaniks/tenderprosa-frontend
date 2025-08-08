import React, { useState } from 'react';

function SafetyPlan() {
    const [projectName, setProjectName] = useState('');
    const [safetyOfficer, setSafetyOfficer] = useState('');

    const generatePlan = () => {
        alert(`Safety Plan Generated!\n\nProject: ${projectName}\nSafety Officer: ${safetyOfficer}`);
    };

    return (
        <div>
            <h2>Generate Site-Specific Safety Plan</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Project Name: </label>
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
                <div>
                    <label>Safety Officer: </label>
                    <input type="text" value={safetyOfficer} onChange={(e) => setSafetyOfficer(e.target.value)} />
                </div>
                <button onClick={generatePlan}>Generate Plan</button>
            </form>
        </div>
    );
}

export default SafetyPlan;