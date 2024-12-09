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
            navigate('/login');
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
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <button onClick={() => setActiveTab('facilityReservation')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'facilityReservation' ? '#007bff' : '#e9ecef', color: activeTab === 'facilityReservation' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Reserve Facility</button>
                    <button onClick={() => setActiveTab('snackRegistration')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'snackRegistration' ? '#007bff' : '#e9ecef', color: activeTab === 'snackRegistration' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Snack Registration</button>
                    <button onClick={() => setActiveTab('facilityMaintenance')} style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'facilityMaintenance' ? '#007bff' : '#e9ecef', color: activeTab === 'facilityMaintenance' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Facility Maintenance</button>
                </nav>
                <div style={{ width: '100%', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Home;
