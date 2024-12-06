import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminInformation from './pages/AdminInformation';
import { AuthProvider } from './context/authContext';
import LoginPage from './pages/login';
import RegisterPage from './pages/Register';

function App() {
    return (
            <AuthProvider>
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
                            <Route path="/register" element={<RegisterPage/>} />
                        </Routes>
                    </main>
                </div>
            </Router>
            </AuthProvider>
    );
}

export default App;
