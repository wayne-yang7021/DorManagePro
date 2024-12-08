import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import FacilityReservation from '../components/ReserveFacility';
import SnackRegistration from '../components/SnackRegister';
import FacilityMaintenanceForm from '../components/FacilityMaintenanceForm';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';

function Home() {
    const { user, loading } = useAuth(); // 假設你可以檢查是否正在加載中
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);
    
    // 當用戶數據還在加載時，顯示一個loading狀態
    if (loading) {
        return (
            <div>
                <Navbar />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div>
                <FacilityReservation />
                <SnackRegistration />
                <FacilityMaintenanceForm />
            </div>
        </div>
    );
}

export default Home;
