import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import FacilityMaintenanceForm from '../components/FacilityMaintenanceForm';

import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('facilityReservation');

    useEffect(() => {
        if (!loading && !user) {
            // navigate('/login');
        }
    }, [user, loading, navigate]);

    // When user data is loading, show a loading state
    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    // Tab content rendering based on activeTab
    const renderContent = () => {
        switch (activeTab) {
            case 'facilityReservation':
                return <FacilityReservation />;
            case 'snackRegistration':
                return <SnackRegistration />;
            case 'facilityMaintenance':
                return <FacilityMaintenanceForm />;
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: '#282828', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: '#333', border: '5px solid #fff', boxShadow: '5px 5px 15px rgba(255, 255, 255, 0.3)', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '2.5em', fontFamily: 'Impact, sans-serif', textAlign: 'center', color: '#ffcc00', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)' }}>Facility Management</h1>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                    <nav style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#444', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <button onClick={() => setActiveTab('facilityReservation')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'facilityReservation' ? '#007bff' : '#e9ecef', color: activeTab === 'facilityReservation' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Reserve Facility</button>
                        <button onClick={() => setActiveTab('snackRegistration')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'snackRegistration' ? '#007bff' : '#e9ecef', color: activeTab === 'snackRegistration' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Snack Registration</button>
                        <button onClick={() => setActiveTab('facilityMaintenance')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'facilityMaintenance' ? '#007bff' : '#e9ecef', color: activeTab === 'facilityMaintenance' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Facility Maintenance</button>
                    </nav>
                    <div style={{ flex: '3', padding: '20px', backgroundColor: '#555', borderRadius: '8px', boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.5)' }}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
