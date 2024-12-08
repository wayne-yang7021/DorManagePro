import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/authContext';
import { useMyContext } from '../context/context';
// import axios from 'axios';

const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
];

const FacilityReservation = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyDates, setWeeklyDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState({});

  const { facilities } = useMyContext();

  console.log(facilities)

  useEffect(() => {
    if (selectedFacility && selectedItem) {
      calculateWeeklyDates(selectedDate);
    }
  }, [selectedDate, selectedFacility, selectedItem]);



  const getFacilitySchedule = async (facilityId) => {
    try {
      const response = await fetch('http://localhost:8888/api/dorm/facility_schedule', {
        params: { facility_id: facilityId },
      });
      const scheduleData = response.data;

      // Map API response to time slots
      const slots = hours.map((hour) => {
        const reservation = scheduleData.find((r) => r.time === hour);
        return {
          time: hour,
          status: reservation ? 'Reserved' : 'Available',
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

  const handleDateClick = (date) => {
    setSelectedDay(date);
    if (selectedFacility) getFacilitySchedule(selectedFacility.id); // Fetch schedule for selected facility
  };

  const toggleCalendar = (id) => {
    setCalendarVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetSelection = () => {
    setSelectedFacility(null);
    setSelectedItem(null);
    setSelectedDate(new Date());
    setWeeklyDates([]);
    setSelectedDay(null);
    setTimeSlots([]);
    setCalendarVisible({});
  };

  const renderTimeSlots = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '10px' }}>Time</th>
          <th style={{ border: '1px solid #ddd', padding: '10px' }}>Status</th>
          <th style={{ border: '1px solid #ddd', padding: '10px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot) => (
          <tr key={slot.time}>
            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{slot.time}</td>
            <td
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                textAlign: 'center',
                color: slot.status === 'Available' ? 'green' : 'red',
              }}
            >
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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '50%', margin: '5px auto' }}>
      <h1>Dorm Facility Reservation</h1>
      <div>
        {facilities?.map((facility) => (
          <div
            key={facility.fid}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: selectedFacility?.id === facility.id ? '#f0f0f0' : 'white',
              marginBottom: '20px',
              position: 'relative',
            }}
          >
            {selectedFacility?.id === facility.fid && selectedItem && (
              <button
                onClick={resetSelection}
                style={{
                  position: 'relative',
                  top: '10px',
                  backgroundColor: '#fff',
                  color: '#007BFF',
                  border: '2px solid #fff',
                  borderRadius: '5px',
                  width: '100px',
                  height: '30px',
                  lineHeight: '26px',
                }}
              >
                ← back to list
              </button>
            )}
            <h2>{facility.fname}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {facility.items?.map((item) => (
                <button
                  key={item}
                  style={{
                    padding: '10px',
                    backgroundColor: selectedItem === item ? '#007BFF' : '#f0f0f0',
                    color: selectedItem === item ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedFacility(facility);
                    setSelectedItem(item);
                    setCalendarVisible({});
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            {selectedFacility?.id === facility.id && selectedItem && (
              <button
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#fff',
                  color: '#007BFF',
                  border: '2px solid #fff',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  lineHeight: '26px',
                }}
                onClick={() => toggleCalendar(facility.id)}
              >
                📅
              </button>
            )}
            {calendarVisible[facility.id] && (
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: '10px',
                  backgroundColor: 'white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '5px',
                  zIndex: 10,
                }}
              >
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    setCalendarVisible((prev) => ({ ...prev, [facility.id]: false }));
                  }}
                  value={selectedDate}
                />
              </div>
            )}
            {selectedFacility?.id === facility.id && selectedItem && weeklyDates.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Week View</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {weeklyDates.map((date) => (
                    <button
                      key={date.toISOString()}
                      style={{
                        padding: '10px',
                        backgroundColor: selectedDay?.toISOString() === date.toISOString() ? '#007BFF' : '#f0f0f0',
                        color: selectedDay?.toISOString() === date.toISOString() ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDateClick(date)}
                    >
                      {date.toDateString()}
                    </button>
                  ))}
                </div>
                {selectedDay && timeSlots.length > 0 && renderTimeSlots()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityReservation;
