import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/signin';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import PrivateRoute from './utils/privateRoute';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />

        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}
        />

      </Routes>
      <Footer />
    </>
  );
}

export default App;