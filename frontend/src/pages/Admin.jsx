import React, { useEffect } from 'react';
import AdminNavbar from '../components/AdminNavBar';
import InfoSearchByStudentId from '../components/InfoSearchByStudentId';
import InfoSearchByRoomNumber from '../components/InfoSearchByRoomNumber';
import SnackAnnouncement from '../components/SnackAnnouncement';
import DormTransferRequestSearch from '../components/DormTransferRequestSearch';
import SnackReservationStatus from '../components/SnackReservationStatus';
import MaintenanceStatus from '../components/MaintenanceStatusSearch';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const {admin, loading} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !admin) {
            navigate('/adminLogin');
        }
    }, [admin, loading, navigate]);

    // 當用戶數據還在加載時，顯示一個loading狀態
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

    return (
        <div>
            <AdminNavbar />
            <div>
                <InfoSearchByStudentId />
                <InfoSearchByRoomNumber />
                <SnackAnnouncement />
                <DormTransferRequestSearch />
                <SnackReservationStatus />
                <MaintenanceStatus />
            </div>
        </div>
    ) 
}

export default Admin;
