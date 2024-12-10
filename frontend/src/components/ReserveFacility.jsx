import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';

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
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (selectedFacility && selectedDay) {
      calculateWeeklyDates(selectedDay);
      getFacilitySchedule(selectedFacility.fid);
    }
  }, [selectedDay, selectedFacility, reload]);

  const { facilities } = useMyContext();
  const { user } = useAuth();

  const getFacilitySchedule = async (facilityId) => {
    try {
      const response = await fetch(`http://localhost:8888/api/dorm/facility_schedule?facility_id=${facilityId}&selectedDay=${selectedDay}`);
      const scheduleData = await response.json();

      const slots = hours.map((hour) => {
        const booking = scheduleData.find((booking) => {
          const errorTime = new Date(booking.bookTime);
          errorTime.setHours(errorTime.getHours() - 8); // Adjust timezone
          const bookingTime = errorTime;
          const [slotHour] = hour.split(':');
          const slotDateTime = new Date(
            selectedDay.getFullYear(),
            selectedDay.getMonth(),
            selectedDay.getDate(),
            parseInt(slotHour, 10),
            0,
            0
          );

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
      const month = String(selectedDay.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDay.getDate()).padStart(2, '0');

      const bookTime = new Date(`${year}-${month}-${day}T${time}:00.000Z`).toISOString();

      const response = await fetch('http://localhost:8888/api/user/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ssn: user.ssn,
          fId: selectedFacility.fid,
          isCancelled: false,
          bookTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book the reservation');
      }

      const data = await response.json();
      console.log('Booking successful:', data);
      setReload((prev) => !prev);
    } catch (error) {
      console.error('Error booking reservation:', error);
    }
  };

  const renderTimeSlots = () => (
    <table style={{
      width: '100%', 
      borderCollapse: 'collapse', 
      marginTop: '20px',
      border: '2px groove #c3c7cb',
      backgroundColor: '#f0f0f0'
    }}>
      <thead>
        <tr style={{ backgroundColor: '#000080', color: 'white' }}>
          <th style={{ padding: '5px', border: '1px solid #808080' }}>Time</th>
          <th style={{ padding: '5px', border: '1px solid #808080' }}>Status</th>
          <th style={{ padding: '5px', border: '1px solid #808080' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot) => (
          <tr key={slot.time} style={{ backgroundColor: '#e4e4e4' }}>
            <td style={{ padding: '5px', border: '1px solid #c3c7cb', textAlign: 'center' }}>{slot.time}</td>
            <td style={{ 
              padding: '5px', 
              border: '1px solid #c3c7cb', 
              textAlign: 'center', 
              fontWeight: 'bold', 
              color: slot.status === 'Available' ? 'green' : 'red' 
            }}>
              {slot.status}
            </td>
            <td style={{ padding: '5px', border: '1px solid #c3c7cb', textAlign: 'center' }}>
              <button
                disabled={slot.status === 'Reserved'}
                onClick={() => handleBook(slot.time)}
                style={{
                  backgroundColor: slot.status === 'Available' ? '#c3c7cb' : '#a0a0a0',
                  color: '#000',
                  padding: '3px 10px',
                  border: '2px outset #c3c7cb',
                  cursor: slot.status === 'Reserved' ? 'not-allowed' : 'pointer',
                  boxShadow: slot.status === 'Available' 
                    ? 'inset -1px -1px 1px #808080, inset 1px 1px 1px white' 
                    : 'none'
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
    <div style={{ 
      padding: '20px', 
      maxWidth: '900px', 
      margin: 'auto',
      backgroundColor: '#f0f0f0',
      border: '2px groove #c3c7cb',
      fontFamily: 'Tahoma, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '1.5rem', 
        marginBottom: '20px',
        backgroundColor: '#000080',
        color: 'white',
        padding: '10px',
        borderBottom: '1px solid #808080'
      }}>Facility Reservation</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {facilities.map((facility) => (
          <div
            key={facility.fid}
            style={{
              padding: '15px',
              border: '2px groove #c3c7cb',
              backgroundColor: '#e4e4e4',
              boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white'
            }}
          >
            <h2 style={{ 
              marginTop: '0', 
              fontSize: '1.2rem', 
              color: '#000080',
              borderBottom: '1px solid #c3c7cb',
              paddingBottom: '5px'
            }}>
              {facility.fName}
            </h2>
            <p style={{ margin: '5px 0' }}>For Rent: {facility.forRent ? 'Yes' : 'No'}</p>
            <p style={{ margin: '5px 0' }}>Under Maintenance: {facility.underMaintenance ? 'Yes' : 'No'}</p>
            <button
              style={{
                backgroundColor: facility.forRent && !facility.underMaintenance ? '#c3c7cb' : '#a0a0a0',
                color: '#000',
                padding: '5px 10px',
                border: '2px outset #c3c7cb',
                cursor: facility.forRent && !facility.underMaintenance ? 'pointer' : 'not-allowed',
                boxShadow: facility.forRent && !facility.underMaintenance 
                  ? 'inset -1px -1px 1px #808080, inset 1px 1px 1px white' 
                  : 'none',
                marginTop: '10px'
              }}
              disabled={!facility.forRent || facility.underMaintenance}
              onClick={() => {
                setSelectedFacility(facility);
                setCalendarVisible(false);
              }}
            >
              {selectedFacility?.fid === facility.fid ? 'Selected' : 'Select Facility'}
            </button>
            {selectedFacility?.fid === facility.fid && (
              <div>
                <button
                  onClick={toggleCalendar}
                  style={{
                    backgroundColor: '#c3c7cb',
                    color: '#000',
                    marginTop: '10px',
                    padding: '5px 10px',
                    border: '2px outset #c3c7cb',
                    cursor: 'pointer',
                    boxShadow: 'inset -1px -1px 1px #808080, inset 1px 1px 1px white'
                  }}
                >
                  Select Date
                </button>
                {calendarVisible && (
                  <Calendar
                    onChange={(date) => setSelectedDay(date)}
                    value={selectedDay}
                    minDate={new Date()}
                    className="xp-calendar"
                  />
                )}
                {selectedDay && renderTimeSlots()}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        /* XP-style Calendar override */
        .xp-calendar {
          background-color: #f0f0f0 !important;
          border: 2px groove #c3c7cb !important;
          font-family: Tahoma, sans-serif !important;
        }
        .xp-calendar .react-calendar__tile {
          background-color: #e4e4e4 !important;
          border: 1px solid #c3c7cb !important;
        }
        .xp-calendar .react-calendar__tile--active {
          background-color: #000080 !important;
          color: white !important;
        }
        .xp-calendar .react-calendar__tile:hover {
          background-color: #c3c7cb !important;
        }
      `}</style>
    </div>
  );
};

export default FacilityReservation;