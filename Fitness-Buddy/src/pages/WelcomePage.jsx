import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/LoginPage"); //go to loginpage
    };

    return (
        <div className="welcome-container">
            <div className="welcome-page">
                <h1 className="app-title">Fitness Buddy</h1>

                <p className="app-titleline">Workout, Endurance, Transformation.</p>

                <div className="welcome-footer">
                    <button className="get-started-btn" onClick={handleGetStarted}>
                        Get Started  </button>
                    
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;