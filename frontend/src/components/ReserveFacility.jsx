import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useMyContext } from '../context/context';
import { useAuth } from '../context/authContext';
// import './ReserveFacility.css';

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
  const [reload, setReload] = useState(false);

  // Optimization: Memoize the effect dependencies
  useEffect(() => {
    if (selectedFacility && selectedDay) {
      calculateWeeklyDates(selectedDay);
      getFacilitySchedule(selectedFacility.fid);
    }
  }, [selectedDay, selectedFacility, reload]);

  const getFacilitySchedule = async (facilityId) => {
    try {
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
    <table className="time-slots-table">
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
            <td className={`slot-status ${slot.status}`}>{slot.status}</td>
            <td>
              <button
                disabled={slot.status === 'Reserved'}
                onClick={() => handleBook(slot.time)}
                className={`book-button ${slot.status === 'Available' ? 'available' : 'reserved'}`}
              >
                {slot.status === 'Available' ? 'Book' : 'Booked'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Optimization: Simplified facility button class determination
  const getFacilityButtonClass = (facility) => {
    return `select-facility-button ${facility.forRent && !facility.underMaintenance ? 'available' : 'facility-unavailable'}`;
  };

  return (
    <div className="reservation-container">
      <h1>Facility Reservation</h1>
      <div className="facility-list">
        {facilities?.map((facility) => (
          <div
            key={facility.fid}
            className={`facility-item ${selectedFacility?.fid === facility.fid ? 'selected' : ''}`}
          >
            <h2>{facility.fName}</h2>
            <p>For Rent: {facility.forRent ? 'Yes' : 'No'}</p>
            <p>Under Maintenance: {facility.underMaintenance ? 'Yes' : 'No'}</p>
            <button
              className={getFacilityButtonClass(facility)}
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
                  className="toggle-calendar-button"
                  onClick={toggleCalendar}
                >
                  📅 Select Date
                </button>
                {calendarVisible && (
                  <Calendar
                    onChange={(date) => setSelectedDay(date)}
                    value={selectedDay}
                    minDate={new Date()}
                    tileClassName="custom-tile"
                  />
                )}
                {selectedDay && renderTimeSlots()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityReservation;