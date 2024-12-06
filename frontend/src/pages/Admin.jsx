import React from 'react';
import AdminNavbar from '../components/AdminNavBar';
import StudentInfoSearch from '../components/StudentInfoSearch';
import SnackAnnouncement from '../components/SnackAnnouncement';
import DormChangeRequestSearch from '../components/DormChangeRequestSearch';
import SnackReservationStatus from '../components/SnackReservationStatus';

function Admin() {

    return (
        <div>
            <AdminNavbar />
            <div>
                <StudentInfoSearch />
                <SnackAnnouncement />
                <DormChangeRequestSearch />
                <SnackReservationStatus />
            </div>
        </div>
    );
}

export default Admin;
