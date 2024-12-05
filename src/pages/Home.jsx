import React from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';

function Home() {
    return (
        <div>
            <Navbar />
            <div 
                className="mt-4" 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px', // Adds spacing between the components
                    justifyContent: 'space-around', // Adjust as needed
                    alignItems: 'flex-start', // Ensures components align at the top
                }}
            >
                <FacilityReservation />
                <SnackRegistration />
            </div>
        </div>
    );
}

export default Home;