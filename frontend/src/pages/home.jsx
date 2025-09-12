import React from 'react';
import Signup from '../components/signup.jsx';
import Navbar from '../components/navbar';

const Home = () => {
    return (
        <div>
            <Navbar isLoggedIn={false} />
            <Signup />
        </div>
    );
}

export default Home;
