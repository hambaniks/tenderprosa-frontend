import React from 'react';

function RiskAssessment() {
    // In a real app, this data would be dynamic and interactive
    const risks = [
        { activity: 'Working at height', risk: 'Falling', control: 'Use scaffolding and harnesses' },
        { activity: 'Excavation', risk: 'Trench collapse', control: 'Shore up trench walls' },
        { activity: 'Electrical work', risk: 'Electrocution', control: 'Lock-out/Tag-out procedures' },
    ];

    return (
        <div>
            <h2>Risk Assessment Matrix</h2>
            <table border="1" style={{ width: '100%', color: 'white' }}>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Risk</th>
                        <th>Control Measure</th>
                    </tr>
                </thead>
                <tbody>
                    {risks.map((risk, index) => (
                        <tr key={index}>
                            <td>{risk.activity}</td>
                            <td>{risk.risk}</td>
                            <td>{risk.control}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RiskAssessment;