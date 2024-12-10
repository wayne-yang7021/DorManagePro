import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import UserInformation from '../components/UserInfomation';
import ViewFacilityReservation from '../components/ViewFacilityReservation';
import ViewTransferApplicationStatus from '../components/ViewTransferApplicationStatus';

import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function UserInformationPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('UserInformation');

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
            case 'UserInformation':
                return <UserInformation />;
            case 'ViewFacilityReservation':
                return <ViewFacilityReservation />;
            case 'ViewTransferApplicationStatus':
                return <ViewTransferApplicationStatus />;
            default:
                return null;
        }
    };

    return (
        <div style={{ fontFamily: 'Tahoma, sans-serif', backgroundColor: '#E4E4E4', padding: '20px' }}>
            <Navbar />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                    onClick={() => setActiveTab('UserInformation')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'UserInformation'
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
                    User Information
                </button>

                <button
                    onClick={() => setActiveTab('ViewFacilityReservation')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'ViewFacilityReservation'
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
                    View Facility Reservation
                </button>

                <button
                    onClick={() => setActiveTab('ViewTransferApplicationStatus')}
                    style={{
                        padding: '10px 20px',
                        margin: '0 5px',
                        background: activeTab === 'ViewTransferApplicationStatus'
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
                    View Transfer Application Status
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

export default UserInformationPage;