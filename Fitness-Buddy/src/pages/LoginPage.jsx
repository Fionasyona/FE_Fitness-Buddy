import React from "react";
import "../styles/LoginPage.css";
import googleIcon from '../assets/images/iconsgoogle.png';
import facebookIcon from "../assets/images/iconsfacebook.png";
import twitterIcon from "../assets/images/iconstwitter.png";

const LoginPage = () => {
    return (
        <div className="loginpage-container">
            <form action="">
                 <h2>Create your Account</h2>
                <div class="input-box">
                    <input type="text" placeholder="Username" required
                    />
                </div>
                <div class="input-box">
                    <input type="password"
                        placeholder="Password" required
                    />
                </div>
                <div class="rem-forgot">
                    <label>
                        <input type="checkbox" />Remember Me </label>
                    <a href="#">Forgot Password</a>
                    </div>
                <button type="submit" class="btn">Login</button>
                <h3>or sign up with</h3>
                 <div className="social-login">
          <button className="google-btn">
          <img src={googleIcon} alt="Google" /> Continue with Google
        </button>
        <button className="facebook-btn">
          <img src={facebookIcon} alt="Facebook" /> Continue with Facebook
        </button>
        <button className="twitter-btn">
          <img src={twitterIcon} alt="Twitter" /> Continue with Twitter
                    </button>
                    </div>
                </form>
            </div>
    );
};

export default LoginPage;