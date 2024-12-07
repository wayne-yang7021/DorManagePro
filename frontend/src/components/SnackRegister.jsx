import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';


const SnackRegistration = () => {
  const [registrations, setRegistrations] = useState({});
  const [expandedEvents, setExpandedEvents] = useState({});
  const [selectedSnacks, setSelectedSnacks] = useState({});

  const { snackOption, getSnackOption } = useMyContext();
  const [snackEvents, setSnackEvents] = useState([]);

useEffect(() => {

  // Map for grouping the data
  const snackMap = new Map();
  snackOption.forEach(event => {
    const { dormId, semester, sName, snackName } = event;
    const key = `${dormId}-${semester}`;  // Create a unique key for each group

    // If the key doesn't exist in the map, initialize it
    if (!snackMap.has(key)) {
      snackMap.set(key, {
        id: snackMap.size + 1,  // Generate a unique id
        dormId,
        semester,
        snacks: []
      });
    }

    // Add the snackName to the corresponding snacks array
    snackMap.get(key).snacks.push(sName);
  });

  // Convert the map to an array and set the state
  const result = Array.from(snackMap.values());
  setSnackEvents(result);  // Set the state with the transformed data

}, [snackOption]);  // Empty dependency array to run once on component mount

  console.log(snackOption)


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
      maxWidth: '800px', 
      margin: 'auto', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333' 
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
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              backgroundColor: registrations[event.semester] ? '#e6f3e6' : 'white'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px' 
            }}>
              <h2 style={{ margin: 0, color: '#007bff', cursor: 'pointer' }} onClick={() => toggleEventDetails(event.id)}>
                {event.title}
                <span style={{ 
                  marginLeft: '10px', 
                  fontSize: '14px', 
                  color: '#6c757d' 
                }}>
                  {expandedEvents[event.semester] ? '▲' : '▼'}
                </span>
              </h2>
              <span style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '5px 10px', 
                borderRadius: '4px' 
              }}>
                {event.dormId}
              </span>
            </div>

            {expandedEvents[event.id] && (
              <>
                <p style={{ color: '#6c757d', marginBottom: '10px' }}>
                  {event.description}
                </p>

                <div style={{ 
                  backgroundColor: '#f1f3f5', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  marginBottom: '15px' 
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
                      backgroundColor: selectedSnacks[event.id] === snack ? '#28a745' : '#e9ecef', 
                      color: selectedSnacks[event.id] === snack ? 'white' : 'black',
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
                <strong>Participants:</strong> {event.currentParticipants} / {event.maxParticipants}
                {selectedSnacks[event.id] && (
                  <div style={{ 
                    marginTop: '10px', 
                    fontSize: '14px', 
                    color: '#28a745' 
                  }}>
                    Selected Snack: {selectedSnacks[event.id]}
                  </div>
                )}
              </div>
              <button 
                onClick={() => handleRegistration(event.id)}
                style={{ 
                  backgroundColor: registrations[event.id] ? '#28a745' : '#007bff', 
                  color: 'white', 
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