import React from 'react';
import AdminNavbar from '../components/AdminNavBar';
import InfoSearchByStudentId from '../components/InfoSearchByStudentId';
import InfoSearchByRoomNumber from '../components/InfoSearchByRoomNumber';
import SnackAnnouncement from '../components/SnackAnnouncement';
import DormTransferRequestSearch from '../components/DormTransferRequestSearch';
import SnackReservationStatus from '../components/SnackReservationStatus';
import MaintenanceStatus from '../components/MaintenanceStatusSearch';
import { useAuth } from "../context/authContext";
function Admin() {
    const {admin} = useAuth()
    return admin ? (
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
    ) : (
        <div>
            <AdminNavbar />
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#721c24' }}>
                Please login first
            </p>
        </div>
    );
}

export default Admin;
