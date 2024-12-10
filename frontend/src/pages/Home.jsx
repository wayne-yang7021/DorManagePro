import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import FacilityMaintenanceForm from '../components/FacilityMaintenanceForm';
import DiscussionBoard from './DiscussionBoard';

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

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'facilityReservation':
                return <FacilityReservation />;
            case 'snackRegistration':
                return <SnackRegistration />;
            case 'facilityMaintenance':
                return <FacilityMaintenanceForm />;
            case 'discussionBoard':
                return <DiscussionBoard />
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: 'Tahoma, sans-serif', backgroundColor: '#E4E4E4', padding: '20px' }}>
            <Navbar />

            <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#003366' }}>
                Facility Management
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                    onClick={() => setActiveTab('facilityReservation')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'facilityReservation'
                            ? 'linear-gradient(to bottom, #D4D0C8, #A6A6A6)'
                            : 'linear-gradient(to bottom, #F3F3F3, #D4D0C8)',
                        border: '2px solid #808080',
                        borderRadius: '4px',
                        boxShadow: 'inset 2px 2px 1px #FFFFFF, inset -1px -1px 1px #808080',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'center',
                    }}
                >
                    Reserve Facility
                </button>

                <button
                    onClick={() => setActiveTab('snackRegistration')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'snackRegistration'
                            ? 'linear-gradient(to bottom, #D4D0C8, #A6A6A6)'
                            : 'linear-gradient(to bottom, #F3F3F3, #D4D0C8)',
                        border: '2px solid #808080',
                        borderRadius: '4px',
                        boxShadow: 'inset 2px 2px 1px #FFFFFF, inset -1px -1px 1px #808080',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'center',
                    }}
                >
                    Snack Registration
                </button>

                <button
                    onClick={() => setActiveTab('facilityMaintenance')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'facilityMaintenance'
                            ? 'linear-gradient(to bottom, #D4D0C8, #A6A6A6)'
                            : 'linear-gradient(to bottom, #F3F3F3, #D4D0C8)',
                        border: '2px solid #808080',
                        borderRadius: '4px',
                        boxShadow: 'inset 2px 2px 1px #FFFFFF, inset -1px -1px 1px #808080',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#000',
                        textAlign: 'center',
                    }}
                >
                    Facility Maintenance
                </button>
            </div>

            <div
                style={{
                    marginTop: '30px',
                    padding: '15px',
                    background: 'linear-gradient(to bottom, #FFFFFF, #E4E4E4)',
                    border: '2px solid #808080',
                    boxShadow: '2px 2px 5px #808080',
                    borderRadius: '4px',
                }}
            >
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;