import React from 'react';

const SnackReserveSearchButton = ({ semester, admin, setFilteredReservations, setError, setShowResults }) => {
    const styles = {
        button: {
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        buttonDisabled: {
            padding: '10px 15px',
            backgroundColor: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'not-allowed',
        },
    };
    // console.log("semester", semester);
    const handleSearch = async () => {
        if (!semester) {
            setError('請先選擇學期');
            return;
        }

        setError(''); // 清除錯誤訊息

        try {
            // console.log("semester_trim", semester.replace(/\(.*?\)/g, '').trim());
            const response = await fetch(`http://localhost:8888/api/admin/snack_announcement_search?semester=${semester}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    semester: semester,
                    dorm_id: admin.dorm_id,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
                setFilteredReservations(data);
                setShowResults(true); // 顯示結果
            } else {
                console.error('Error fetching snack reservations');
                setError('查詢失敗，請稍後再試');
            }
        } catch (error) {
            console.error('Fail to get the reserved snacks:', error);
            setError('發生錯誤，請稍後再試');
        }
    };

    return (
        <button
            style={!semester ? styles.buttonDisabled : styles.button}
            onClick={handleSearch}
            disabled={!semester}
        >
            Search
        </button>
    );
};

export default SnackReserveSearchButton;
