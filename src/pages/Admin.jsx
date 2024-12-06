import React from 'react';
import AdminNavbar from '../components/AdminNavBar';
import StudentSearch from '../components/StudentSearch';
import SnackAnnouncement from '../components/SnackAnnouncement';
import DormChangeRequest from '../components/DormChangeRequest';
import SnackReservationStatus from '../components/SnackReservationStatus';

function Admin() {

    return (
        <div>
            <AdminNavbar />
            <div className="mt-4">
                <StudentSearch />
                <SnackAnnouncement/>
                <DormChangeRequest/>
                <SnackReservationStatus/>
            </div>
        </div>
    );
}

export default Admin;
