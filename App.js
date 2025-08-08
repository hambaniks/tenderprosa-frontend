import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import BOQAnalysis from './BOQAnalysis';
import BOQUpload from './BOQUpload';
import SafetyPlan from './SafetyPlan';
import SafetyPlanPDF from './SafetyPlanPDF';
import Appointments from './Appointments';
import AppointmentLetterPDF from './AppointmentLetterPDF';
import RiskAssessment from './RiskAssessment';
import Contracts from './Contracts';
import Timeline from './Timeline';
import TimelineEstimator from './TimelineEstimator';
import RiskAssessmentAI from './RiskAssessmentAI';
import './App.css';

function App() {
    const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>TenderProSA AI</h1>
                    <nav>
                        <Link to="/">BOQ Analysis</Link> | 
                        <Link to="/boq-upload">BOQ Upload</Link> | 
                        <Link to="/safety">Safety</Link> | 
                        <Link to="/safety-pdf">Safety Plan PDF</Link> | 
                        <Link to="/appointments">Appointments</Link> | 
                        <Link to="/appointment-letter-pdf">Appointment Letter PDF</Link> | 
                        <Link to="/risk">Risk</Link> | 
                        <Link to="/contracts">Contracts</Link> | 
                        <Link to="/timeline">Timeline</Link> |
                        <Link to="/timeline-estimator">Timeline Estimator</Link> |
                        <Link to="/risk-ai">AI Risk Assessment</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<BOQAnalysis />} />
                        <Route path="/boq-upload" element={<BOQUpload />} />
                        <Route path="/safety" element={<SafetyPlan />} />
                        <Route path="/safety-pdf" element={<SafetyPlanPDF />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/appointment-letter-pdf" element={<AppointmentLetterPDF />} />
                        <Route path="/risk" element={<RiskAssessment />} />
                        <Route path="/contracts" element={<Contracts />} />
                        <Route path="/timeline" element={<Timeline />} />
                        <Route path="/timeline-estimator" element={<TimelineEstimator />} />
                        <Route path="/risk-ai" element={<RiskAssessmentAI />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;