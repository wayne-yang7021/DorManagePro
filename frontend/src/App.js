import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminInformation from './pages/AdminInformation';
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/login';
import { MyProvider } from './context/context';
import AdminLoginPage from './pages/AdminLoginPage';
import FacilityReservationPage from './pages/FacilityResevation';
import UserInformation from './pages/UserInformation';
import DiscussionBoard from './pages/DiscussionBoard';
function App() {
    return (
            <AuthProvider>
            <MyProvider>
            <Router>
                <div className="min-h-screen bg-custom-primary">
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />}/>
                            <Route path="/info/:id" element={<Contact/ >}/>
                            <Route path="/admin_information" element={<AdminInformation />} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/adminLogin" element={<AdminLoginPage/>} />
                            <Route path="/facility_reservation" element={<FacilityReservationPage/>} />
                            <Route path="/discussion_board" element={<DiscussionBoard />} />
                            <Route path="/user_information" element={<UserInformation/>} />
                        </Routes>
                    </main>
                </div>
            </Router>
            </MyProvider>
            </AuthProvider>
    );
}

export default App;
