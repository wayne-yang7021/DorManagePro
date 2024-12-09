import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavBar';
import InfoSearchByStudentId from '../components/InfoSearchByStudentId';
import InfoSearchByRoomNumber from '../components/InfoSearchByRoomNumber';
import SnackAnnouncement from '../components/SnackAnnouncement';
import DormTransferRequestSearch from '../components/DormTransferRequestSearch';
import SnackReservationStatus from '../components/SnackReservationStatus';
import MaintenanceStatus from '../components/MaintenanceStatusSearch';
import InfoSearchAllLivingStudent from '../components/InfoSearchAllLivingStudent';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const { admin, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('allLiving');

    useEffect(() => {
        if (!loading && !admin) {
            navigate('/adminLogin');
        }
    }, [admin, loading, navigate]);

    // When user data is loading, show a loading state
    if (loading) {
        return (
            <div>
                <AdminNavbar />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    // Tab content rendering based on activeTab
    const renderContent = () => {
        switch (activeTab) {
            case 'allLiving':
                return <InfoSearchAllLivingStudent />;
            case 'studentId':
                return <InfoSearchByStudentId />;
            case 'roomNumber':
                return <InfoSearchByRoomNumber />;
            case 'snackAnnouncement':
                return <SnackAnnouncement />;
            case 'dormTransfer':
                return <DormTransferRequestSearch />;
            case 'snackReservation':
                return <SnackReservationStatus />;
            case 'maintenanceStatus':
                return <MaintenanceStatus />;
            default:
                return null;
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '20px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <button onClick={() => setActiveTab('allLiving')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'allLiving' ? '#007bff' : '#e9ecef', color: activeTab === 'allLiving' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Search All Living Student</button>
                    <button onClick={() => setActiveTab('studentId')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'studentId' ? '#007bff' : '#e9ecef', color: activeTab === 'studentId' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Search by Student ID</button>
                    <button onClick={() => setActiveTab('roomNumber')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'roomNumber' ? '#007bff' : '#e9ecef', color: activeTab === 'roomNumber' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Search by Room Number</button>
                    <button onClick={() => setActiveTab('snackAnnouncement')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'snackAnnouncement' ? '#007bff' : '#e9ecef', color: activeTab === 'snackAnnouncement' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Snack Announcement</button>
                    <button onClick={() => setActiveTab('snackReservation')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'snackReservation' ? '#007bff' : '#e9ecef', color: activeTab === 'snackReservation' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Snack Reservation Status</button>
                    <button onClick={() => setActiveTab('maintenanceStatus')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'maintenanceStatus' ? '#007bff' : '#e9ecef', color: activeTab === 'maintenanceStatus' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Maintenance Status</button>
                    <button onClick={() => setActiveTab('dormTransfer')} 
                        style={{ padding: '10px', border: 'none', backgroundColor: activeTab === 'dormTransfer' ? '#007bff' : '#e9ecef', color: activeTab === 'dormTransfer' ? '#fff' : '#000', borderRadius: '4px', cursor: 'pointer', transition: '0.3s' }}>Dorm Transfer Requests</button>
                </nav>
                <div style={{ width: '100%', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Admin;
