import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import FacilityMaintenanceForm from '../components/FacilityMaintenanceForm';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';



function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!loading && !user) {
    //         navigate('/login');
    //     }
    // }, [user, loading, navigate])
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