import React, { useState } from "react";
import axios from "axios";
import './signup.css'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [totalBalance, setTotalBalance] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:2000/signup/", {
                username,
                email,
                password,
                totalBalance,
            });

            console.log(res.data);
            if (res.status !== 200) {
                alert("User Already Exists");
            } else {
                alert("User Registered Successfully");
                setUsername("");
                setEmail("");
                setPassword("");
                setTotalBalance("");
            }
        } catch (e) {
            console.log("Error registering user", e.message);
            alert("Try again later.");
        }
    };

    return (
        <>
            {/* Hero + Signup */}
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px 20px",
                }}
            >
                <div className="main-signup" >
                    {/* Hero Section */}
                    <div>
                        <h1 style={{ fontSize: "42px", marginBottom: "20px", color: "#004d40" }}>
                            Take Control of Your Finances
                        </h1>
                        <p style={{ fontSize: "18px", marginBottom: "25px", lineHeight: "1.6", color: "#333" }}>
                            Track your expenses, manage your budget, and build better financial
                            habits with <strong>Expense Tracker</strong>. Sign up today and get
                            started in minutes!
                        </p>
                        <a
                            href="#signup-form"
                            style={{
                                display: "inline-block",
                                padding: "12px 24px",
                                background: "#009688",
                                color: "white",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            Get Started
                        </a>
                    </div>

                    {/* Signup Card */}
                    <form
                        id="signup-form"
                        onSubmit={handleSubmit}
                        style={{
                            background: "white",
                            padding: "40px 30px",
                            borderRadius: "12px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                            width: "100%",
                            maxWidth: "400px",
                        }}
                    >
                        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Sign Up</h2>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            <small style={{ color: "gray" }}>
                                We'll never share your email with anyone else.
                            </small>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label>Total Balance</label>
                            <input
                                type="number"
                                placeholder="Enter your total balance"
                                value={totalBalance}
                                onChange={(e) => setTotalBalance(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "5px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <input type="checkbox" id="remember" />{" "}
                            <label htmlFor="remember">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            style={{
                                background: "#009688",
                                color: "white",
                                width: "100%",
                                padding: "12px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
