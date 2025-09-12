import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Transaction from "../components/transaction";
import './dashboard.css'

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [data, setData] = useState({ userDetails: [], totalBalance: 0 });
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    const fetchData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/signin");
            return;
        }

        const res = await axios.get("http://localhost:2000/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:2000/dashboard/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Deleted");

            setData((prevData) => {
                const deletedTxn = prevData.userDetails.find((txn) => txn._id === id);

                if (!deletedTxn) return prevData; 

                let newBalance = prevData.totalBalance;

                if (deletedTxn.type === "add") {
                    newBalance -= deletedTxn.amount; 
                } else {
                    newBalance += deletedTxn.amount; 
                }

                return {
                    ...prevData,
                    userDetails: prevData.userDetails.filter((txn) => txn._id !== id),
                    totalBalance: newBalance,
                };
            });
        } catch (e) {
            console.log("Error Deleting the transaction", e);
        }
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />

            <div className="main">

                <div className="total-balance"><p>Total Balance: {data.totalBalance}</p></div>

                <div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="btn">
                        Make Transaction
                    </button>
                </div>
 
            </div>

            <div className="fetch-data p-6">
                <div>
                    <ul className="space-y-2">
                        {data?.userDetails?.map((txn) => (
                            <li key={txn._id} className="p-3 bg-white shadow rounded">
                                <p><strong>Type:</strong> {txn.type}</p>
                                <p><strong>Amount:</strong> {txn.amount}</p>
                                <p><strong>Description:</strong> {txn.description}</p>
                                <p><strong>Date:</strong> {txn.date}</p>

                                <button onClick={() => handleDelete(txn._id)} className="del-txn" >
                                    Delete Transaction
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {isOpen && <Transaction onClose={onClose} />}
            </div>
        </div>
    )
}


export default Dashboard;