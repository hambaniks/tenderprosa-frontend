import React, { useState, useEffect } from 'react';

function BOQAnalysis() {
    const [projectName, setProjectName] = useState('');
    const [items, setItems] = useState([{
        description: 'Concrete Grade 20',
        quantity: 1,
        unit: 'm³',
        laborType: 'Skilled artisan',
        laborDays: 1,
        equipmentType: 'None',
        equipmentDays: 0
    }]);
    const [analysis, setAnalysis] = useState(null);
    const [savedAnalyses, setSavedAnalyses] = useState([]);
    const [pricing, setPricing] = useState(null);

    useEffect(() => {
        fetchPricingData();
        fetchSavedAnalyses();
    }, []);

    const fetchPricingData = async () => {
        const response = await fetch('/api/pricing');
        const data = await response.json();
        setPricing(data);
    };

    const fetchSavedAnalyses = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            const response = await fetch(`/api/boq/${userId}`);
            const data = await response.json();
            setSavedAnalyses(data);
        }
    };

    const addItem = () => {
        setItems([...items, {
            description: 'Concrete Grade 20',
            quantity: 1,
            unit: 'm³',
            laborType: 'Skilled artisan',
            laborDays: 1,
            equipmentType: 'None',
            equipmentDays: 0
        }]);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const analyzeItem = async (item) => {
        const response = await fetch('/api/boq/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        return await response.json();
    };

    const analyzeAll = async () => {
        const analyzedItems = [];
        let totalCost = 0;

        for (const item of items) {
            const analysis = await analyzeItem(item);
            analyzedItems.push({
                ...item,
                ...analysis
            });
            totalCost += analysis.total;
        }

        setAnalysis({
            items: analyzedItems,
            totalCost,
            createdAt: new Date()
        });
    };

    const saveAnalysis = async () => {
        if (!analysis || !projectName) return;

        const userId = localStorage.getItem('userId');
        const response = await fetch('/api/boq/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                projectName,
                items: analysis.items,
                totalCostI have enhanced the backend API by adding comprehensive endpoints for BOQ analysis, safety plans, appointments, and pricing data, while keeping the existing authentication routes intact. The new endpoints include:

- POST /api/boq/analyze: Calculate costs for BOQ items with materials, labor, equipment, overhead, and VAT.
- POST /api/boq/save and GET /api/boq/:userId: Save and retrieve BOQ analyses.
- POST /api/safetyplan and GET /api/safetyplan/:userId: Save and retrieve safety plans.
- POST /api/appointments and GET /api/appointments/:userId: Save and retrieve appointments.
- GET /api/pricing: Retrieve current pricing data.

