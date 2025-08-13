import React from "react";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/images/iconsgoogle.png";
import facebookIcon from "../assets/images/iconsfacebook.png";
import twitterIcon from "../assets/images/iconstwitter.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate("/LogWorkoutPage");
  };

  return (
    <div className="loginpage-container">
      <form onSubmit={handleGetStarted}>
        <h2>Create your Account</h2>

        <div className="input-box">
          <input type="text" placeholder="Username" required />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" required />
        </div>

        <div className="rem-forgot">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>

        {/* Login button now triggers handleGetStarted */}
        <button type="submit" className="btn">
          Login
        </button>

        <h3>or sign up with</h3>
        <div className="social-login">
          <button type="button" className="google-btn">
            <img src={googleIcon} alt="Google" /> Continue with Google
          </button>
          <button type="button" className="facebook-btn">
            <img src={facebookIcon} alt="Facebook" /> Continue with Facebook
          </button>
          <button type="button" className="twitter-btn">
            <img src={twitterIcon} alt="Twitter" /> Continue with Twitter
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
