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
    snackOption.forEach(event => {
      const { dormId, semester, sName, snackName } = event;
      const key = `${dormId}-${semester}`;

      if (!snackMap.has(key)) {
        snackMap.set(key, {
          id: snackMap.size + 1,
          dormId,
          semester,
          snacks: []
        });
      }

      snackMap.get(key).snacks.push(sName);
    });

    const result = Array.from(snackMap.values());
    setSnackEvents(result);
  }, [snackOption]);

  const handleRegistration = (eventId) => {
    setRegistrations(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const toggleEventDetails = (eventId) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handleSnackSelection = (eventId, snack) => {
    setSelectedSnacks(prev => ({
      ...prev,
      [eventId]: snack
    }));
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: 'auto', 
      padding: '20px', 
      backgroundColor: '#1e1e1e', 
      color: '#fdd835' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#fdd835' 
      }}>
        Dorm Snack Registrations
      </h1>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {snackEvents.map((event) => (
          <div 
            key={event.id} 
            style={{ 
              border: '1px solid #333', 
              borderRadius: '8px', 
              padding: '20px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: registrations[event.semester] ? '#2e2e2e' : '#1e1e1e'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px' 
            }}>
              <h2 style={{ margin: 0, color: '#fdd835', cursor: 'pointer' }} onClick={() => toggleEventDetails(event.id)}>
                {event.title}
                <span style={{ 
                  marginLeft: '10px', 
                  fontSize: '14px', 
                  color: '#fdd835' 
                }}>
                  {expandedEvents[event.semester] ? '▲' : '▼'}
                </span>
              </h2>
              <span style={{ 
                backgroundColor: '#333', 
                padding: '5px 10px', 
                borderRadius: '4px',
                color: '#fdd835' 
              }}>
                {event.dormId}
              </span>
            </div>

            {expandedEvents[event.id] && (
              <>
                <p style={{ color: '#bbb', marginBottom: '10px' }}>
                  {event.description}
                </p>

                <div style={{ 
                  backgroundColor: '#2a2a2a', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  marginBottom: '15px', 
                  color: '#fdd835' 
                }}>
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
              <ul style={{ 
                listStyleType: 'none', 
                padding: 0, 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px' 
              }}>
                {event.snacks.map((snack) => (
                  <li 
                    key={snack} 
                    style={{ 
                      backgroundColor: selectedSnacks[event.id] === snack ? '#fdd835' : '#333', 
                      color: selectedSnacks[event.id] === snack ? 'black' : '#fdd835',
                      padding: '5px 10px', 
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => handleSnackSelection(event.id, snack)}
                  >
                    {snack}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                {selectedSnacks[event.id] && (
                  <div style={{ 
                    marginTop: '10px', 
                    fontSize: '14px', 
                    color: '#fdd835' 
                  }}>
                    Selected Snack: {selectedSnacks[event.id]}
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleRegistration(event.id)}
                style={{ 
                  backgroundColor: registrations[event.id] ? '#fdd835' : '#333', 
                  color: registrations[event.id] ? 'black' : '#fdd835', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
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
