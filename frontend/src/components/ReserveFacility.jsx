import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useMyContext } from '../context/context';
import { useAuth } from '../context/authContext';
const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
];

const FacilityReservation = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [weeklyDates, setWeeklyDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const { facilities } = useMyContext();
  const { user } = useAuth();
  const [reload, setReload] = useState(false); // New state for triggering reload


  useEffect(() => {
    console.log(selectedDay)
    if (selectedFacility && selectedDay) {
      calculateWeeklyDates(selectedDay);
      getFacilitySchedule(selectedFacility.fId);
    }
  }, [selectedDay, selectedFacility, reload]);

  const getFacilitySchedule = async (facilityId) => {
    try {
      console.log()
      const response = await fetch(`http://localhost:8888/api/dorm/facility_schedule?facility_id=${facilityId}&selectedDay=${selectedDay}`);
      const scheduleData = await response.json();
      
      const slots = hours.map((hour) => {
        const booking = scheduleData.find((booking) => {
          // Create a date object for the booking time
          const errorTime = new Date(booking.bookTime)
          errorTime.setHours(errorTime.getHours() - 8); // Subtract 8 hours
          const bookingTime = errorTime
          // Create a date object for the current slot
          const [slotHour] = hour.split(':');
          const slotDateTime = new Date(
            selectedDay.getFullYear(), 
            selectedDay.getMonth(), 
            selectedDay.getDate(), 
            parseInt(slotHour, 10), 
            0, 
            0
          );
  
          // Detailed comparison
          return (
            bookingTime.getFullYear() === slotDateTime.getFullYear() &&
            bookingTime.getMonth() === slotDateTime.getMonth() &&
            bookingTime.getDate() === slotDateTime.getDate() &&
            bookingTime.getHours() === slotDateTime.getHours()
          );
        });
      
        return {
          time: hour,
          status: booking ? (booking.isCancelled ? 'Available' : 'Reserved') : 'Available',

        };
      });

      setTimeSlots(slots);
    } catch (error) {
      console.error('Error fetching facility schedule:', error);
    }
  };

  const calculateWeeklyDates = (date) => {
    const dayOfWeek = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek + 1);
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
    setWeeklyDates(dates);
    setSelectedDay(date);
  };

  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev);
  };

  const handleBook = async (time) => {
    try {
      const year = selectedDay.getFullYear();
      const month = String(selectedDay.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDay.getDate()).padStart(2, "0");
  
      const bookTime = new Date(`${year}-${month}-${day}T${time}:00.000Z`).toISOString();
  
      const response = await fetch('http://localhost:8888/api/user/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ssn: user.ssn,
          fId: selectedFacility.fId,
          isCancelled: false,
          bookTime,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to book the reservation');
      }
  
      const data = await response.json();
      console.log('Booking successful:', data);
      setReload((prev) => !prev); // Trigger reload by toggling the `reload` state

    } catch (error) {
      console.error('Error booking reservation:', error);
    }
  };

  const renderTimeSlots = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot) => (
          <tr key={slot.time}>
            <td>{slot.time}</td>
            <td style={{ color: slot.status === 'Available' ? 'green' : 'red' }}>{slot.status}</td>
            <td>
              <button
                disabled={slot.status === 'Reserved'}
                onClick={() => {handleBook(slot.time)}}
                style={{
                  backgroundColor: slot.status === 'Available' ? '#28a745' : '#6c757d',
                  color: 'white',
                  padding: '5px 10px',
                  cursor: slot.status === 'Available' ? 'pointer' : 'not-allowed',
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

  return (
    <div style={{ padding: '20px', width: '50%', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dorm Facility Reservation</h1>
      <div>
        {facilities?.map((facility) => (
          <div
            key={facility.fId}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              backgroundColor: selectedFacility?.fId === facility.fId ? '#f0f0f0' : 'white',
            }}
          >
            <h2>{facility.fName}</h2>
            <p>For Rent: {facility.forRent ? 'Yes' : 'No'}</p>
            <p>Under Maintenance: {facility.underMaintenance ? 'Yes' : 'No'}</p>
            <button
              style={{
                padding: '10px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: facility.forRent && !facility.underMaintenance ? 'pointer' : 'not-allowed',
                opacity: facility.forRent && !facility.underMaintenance ? 1 : 0.6,
              }}
              disabled={!facility.forRent || facility.underMaintenance}
              onClick={() => {
                setSelectedFacility(facility);
                setCalendarVisible(false);
              }}
            >
              {selectedFacility?.fId === facility.fId ? 'Selected' : 'Select Facility'}
            </button>
            {selectedFacility?.fId === facility.fId && (
              <div>
                <button
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={toggleCalendar}
                >
                  📅 Select Date
                </button>
                {calendarVisible && (
                  <Calendar
                    onChange={(date) => setSelectedDay(date)}
                    value={selectedDay}
                    style={{ marginTop: '10px' }}
                  />
                )}
                {weeklyDates.length > 0 && (
                  <div style={{ marginTop: '20px' }}>

                    {selectedDay && timeSlots.length > 0 && renderTimeSlots()} 
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityReservation;