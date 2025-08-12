import React from "react";
import "../styles/LoginPage.css";

const LoginPage = () => {
    return (
        <div className="loginpage-container">
            <form action="">
                 <h2>Create your Account</h2>
                <div class="input-box">
                    <input type="text" placeholder="Username" required
                    />
                    <i class="bx bxs-user"></i>
                </div>
                <div class="input-box">
                    <input type="password"
                        placeholder="Password" required
                    />
                    <i class="bx bxs-lock-alt"></i>
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
          <img src="/google-icon.png" alt="Google" /> Continue with Google
        </button>
        <button className="facebook-btn">
          <img src="/facebook-icon.png" alt="Facebook" /> Continue with Facebook
        </button>
        <button className="twitter-btn">
          <img src="/twitter-icon.png" alt="Twitter" /> Continue with Twitter
                    </button>
                    </div>
                </form>
            </div>
    );
};

export default LoginPage;