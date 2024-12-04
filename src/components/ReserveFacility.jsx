import React, { useState, useEffect } from 'react';

const facilitiesData = [
  {
    id: 1,
    name: 'Gym',
    items: ['Treadmill', 'Dumbbells', 'Bench Press'],
  },
  {
    id: 2,
    name: 'Study Room',
    items: ['Room A', 'Room B', 'Room C'],
  },
  {
    id: 3,
    name: 'Music Room',
    items: ['Piano', 'Drums', 'Guitar'],
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

const getReservationData = (facility, item) => {
  // Mock function to simulate reservation data
  return days.map(day => ({
    day,
    timeSlots: hours.map(hour => ({
      time: hour,
      status: Math.random() > 0.5 ? 'Available' : 'Reserved'
    }))
  }));
};

const FacilityReservation = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    if (selectedFacility && selectedItem) {
      const data = getReservationData(selectedFacility, selectedItem);
      setReservationData(data);
    }
  }, [selectedFacility, selectedItem]);

  const renderReservationTable = (data) => {
    const dayData = data.find(d => d.day === selectedDay);
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Time</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {dayData.timeSlots.map((slot) => (
            <tr key={slot.time}>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{slot.time}</td>
              <td style={{ 
                border: '1px solid #ddd', 
                padding: '10px', 
                textAlign: 'center',
                color: slot.status === 'Available' ? 'green' : 'red'
              }}>
                {slot.status}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                <button 
                  disabled={slot.status === 'Reserved'}
                  style={{
                    backgroundColor: slot.status === 'Available' ? '#28a745' : '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: slot.status === 'Available' ? 'pointer' : 'not-allowed'
                  }}
                >
                  {slot.status === 'Available' ? 'Book' : 'Booked'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>Dorm Facility Reservation</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {facilitiesData.map((facility) => (
          <div 
            key={facility.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              borderRadius: '5px',
              backgroundColor: selectedFacility === facility.name ? '#f0f0f0' : 'white'
            }}
          >
            <h2>{facility.name}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {facility.items.map((item) => (
                <div key={item} style={{ position: 'relative', width: '100%' }}>
                  <button
                    style={{
                      width: '100%',
                      margin: '5px 0',
                      padding: '10px',
                      backgroundColor: selectedItem === item ? '#007BFF' : '#f0f0f0',
                      color: selectedItem === item ? '#fff' : '#000',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                        if (selectedFacility === facility.name && selectedItem === item){
                            setSelectedFacility(null)
                            setSelectedItem(null)
                            return
                        }
                      setSelectedFacility(facility.name);
                      setSelectedItem(item);
                    }}
                  >
                    {item}
                  </button>
                  
                  {selectedItem === item && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '10px', 
                        marginBottom: '10px' 
                      }}>
                        {days.map(day => (
                          <button
                            key={day}
                            style={{
                              backgroundColor: selectedDay === day ? '#007BFF' : '#f0f0f0',
                              color: selectedDay === day ? '#fff' : '#000',
                              border: 'none',
                              padding: '5px 10px',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectedDay(day)}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                      
                      {reservationData.length > 0 && renderReservationTable(reservationData)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityReservation;