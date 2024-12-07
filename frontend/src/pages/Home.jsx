import React from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import FacilityMaintenanceForm from '../components/FacilityMaintenanceForm';

function Home() {
    return (
        <div>
            <Navbar />
            <div>
                <FacilityReservation />
                <SnackRegistration />
                <FacilityMaintenanceForm/>
            </div>
        </div>
    );
}

export default Home;