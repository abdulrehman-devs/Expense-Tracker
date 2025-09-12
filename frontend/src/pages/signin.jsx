import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import Navbar from "../components/navbar";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:2000/signin", { email, password });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } 
            
            else {
                alert("Invalid Credentials");
            }

        } catch (e) {
            console.log("Can't Login right now", e);
            alert("Error logging in. Try again later");
        }
    };

    return (
        <>
        <Navbar />
        <div className="signin-container">
            <form className="signin-card" onSubmit={handleLogin}>
                <h2 className="signin-title">Sign In</h2>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="signin-btn">
                    Login
                </button>
            </form>
        </div>
        </>
    );
};

export default Signin;
