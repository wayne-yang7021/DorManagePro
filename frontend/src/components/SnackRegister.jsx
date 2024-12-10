import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';

const SnackRegistration = () => {
  const [registrations, setRegistrations] = useState({});
  const [expandedEvents, setExpandedEvents] = useState({});
  const [selectedSnacks, setSelectedSnacks] = useState({});

  const { snackOption, getSnackOption } = useMyContext();
  const [snackEvents, setSnackEvents] = useState([]);

  useEffect(() => {
    const snackMap = new Map();
    snackOption.forEach((event) => {
      const { dormId, semester, sName, snackName } = event;
      const key = `${dormId}-${semester}`;

      if (!snackMap.has(key)) {
        snackMap.set(key, {
          id: snackMap.size + 1,
          dormId,
          semester,
          snacks: [],
        });
      }

      snackMap.get(key).snacks.push(sName);
    });

    const result = Array.from(snackMap.values());
    setSnackEvents(result);
  }, [snackOption]);

  const handleRegistration = (eventId) => {
    setRegistrations((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const toggleEventDetails = (eventId) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleSnackSelection = (eventId, snack) => {
    setSelectedSnacks((prev) => ({
      ...prev,
      [eventId]: snack,
    }));
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: 'auto',
        padding: '20px',
        fontFamily: "'Tahoma', sans-serif",
        backgroundColor: '#c3c7cb', // Old Windows background
        border: '2px solid #3a3a3a',
        boxShadow: '4px 4px 8px #2e2e2e',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#000',
          backgroundColor: '#d4d0c8',
          padding: '10px',
          border: '2px solid #808080',
          borderRadius: '3px',
        }}
      >
        Dorm Snack Registrations
      </h1>

      <div
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {snackEvents.map((event) => (
          <div
            key={event.id}
            style={{
              padding: '20px',
              border: '2px solid #808080',
              backgroundColor: registrations[event.semester] ? '#d4d0c8' : '#e4e4e4',
              boxShadow: '2px 2px 4px #404040',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: '#000',
                  fontWeight: 'bold',
                }}
                onClick={() => toggleEventDetails(event.id)}
              >
                {event.title}
                <span
                  style={{
                    marginLeft: '10px',
                    fontSize: '14px',
                  }}
                >
                  {expandedEvents[event.semester] ? '▲' : '▼'}
                </span>
              </h2>
              <span
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#d4d0c8',
                  border: '1px solid #808080',
                  boxShadow: 'inset 1px 1px 2px #f4f4f4, inset -1px -1px 2px #404040',
                }}
              >
                {event.dormId}
              </span>
            </div>

            {expandedEvents[event.id] && (
              <>
                <p
                  style={{
                    color: '#000',
                    marginBottom: '10px',
                    backgroundColor: '#d4d0c8',
                    padding: '5px',
                    border: '1px solid #808080',
                  }}
                >
                  {event.description}
                </p>

                <div
                  style={{
                    padding: '10px',
                    marginBottom: '15px',
                    backgroundColor: '#e4e4e4',
                    border: '1px solid #808080',
                  }}
                >
                  <div>
                    <strong>Date:</strong> {event.date}
                  </div>
                  <div>
                    <strong>Time:</strong> {event.time}
                  </div>
                  <div>
                    <strong>Semester:</strong> {event.semester}
                  </div>
                </div>
              </>
            )}

            <div style={{ marginBottom: '15px' }}>
              <strong>Available Snacks:</strong>
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {event.snacks.map((snack) => (
                  <li
                    key={snack}
                    style={{
                      backgroundColor: selectedSnacks[event.id] === snack ? '#000080' : '#e4e4e4',
                      color: selectedSnacks[event.id] === snack ? '#fff' : '#000',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      border: '1px solid #808080',
                      boxShadow: 'inset 1px 1px 2px #f4f4f4, inset -1px -1px 2px #404040',
                    }}
                    onClick={() => handleSnackSelection(event.id, snack)}
                  >
                    {snack}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                {selectedSnacks[event.id] && (
                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '14px',
                      color: '#000',
                    }}
                  >
                    Selected Snack: {selectedSnacks[event.id]}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRegistration(event.id)}
                style={{
                  backgroundColor: registrations[event.id] ? '#000080' : '#c3c7cb',
                  color: registrations[event.id] ? '#fff' : '#000',
                  padding: '10px 20px',
                  border: '1px solid #808080',
                  boxShadow: '2px 2px 4px #404040',
                  cursor: 'pointer',
                }}
                disabled={event.currentParticipants >= event.maxParticipants || !selectedSnacks[event.id]}
              >
                {registrations[event.id] ? 'Registered' : 'Register'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnackRegistration;