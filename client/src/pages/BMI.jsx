
import React, { useState } from 'react';
import Layout from '../components/Layout';
import "../styles/Bmi.css"

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [message, setMessage] = useState('');

    const calculateBMI = () => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBMI(bmiValue);

            if (bmiValue < 18.5) {
                setMessage('Underweight');
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                setMessage('Normal weight');
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                setMessage('Overweight');
            } else {
                setMessage('Obesity');
            }
        }
    };

    return (
        <Layout>
            <div className="bmi-calculator">
                <h1>BMI Calculator</h1>
                <div className="input-group">
                    <label htmlFor="height">Height (cm):</label>
                    <input
                        type="number"
                        id="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <button onClick={calculateBMI}>Calculate BMI</button>
                {bmi && (
                    <div className="result">
                        <h2>Your BMI: {bmi}</h2>
                        <p>{message}</p>
                    </div>
                )}
            </div>

        </Layout>
    );
};

export default BMICalculator;
