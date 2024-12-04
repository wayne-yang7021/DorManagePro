import React from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import DormTransferApplication from '../components/DormTransferApplication';

function Home() {
    const handleReserveFacility = () => {
        // Logic for reserving a facility
        alert("Reserve Facility functionality to be implemented.");
    };

    const handleApplyTransferDorm = () => {
        // Logic for applying for a transfer dorm
        alert("Apply for Transfer Dorm functionality to be implemented.");
    };

    const handleCheckQuestionnaire = () => {
        // Logic for checking if admin has announced a questionnaire
        alert("Check Questionnaire functionality to be implemented.");
    };

    return (
        <div>
            <Navbar />
            <div className="mt-4">
                <FacilityReservation/>
                <SnackRegistration/>
                <DormTransferApplication/>
            </div>
        </div>
    );
}

export default Home;
