import React, { useState } from 'react';

const dormData = [
  {
    id: 1,
    name: 'Maple Hall',
    capacity: 200,
    currentOccupancy: 180,
    features: ['Air Conditioning', 'Study Lounge', 'Laundry Facilities'],
    location: 'North Campus',
    averageRating: 4.5
  },
  {
    id: 2,
    name: 'Oak Residence',
    capacity: 250,
    currentOccupancy: 220,
    features: ['Gym', 'Computer Lab', 'Kitchen Facilities'],
    location: 'Central Campus',
    averageRating: 4.2
  },
  {
    id: 3,
    name: 'Pine Tower',
    capacity: 150,
    currentOccupancy: 120,
    features: ['Quiet Study Areas', 'High-Speed Internet', 'Game Room'],
    location: 'West Campus',
    averageRating: 4.7
  },
  {
    id: 4,
    name: 'Cedar Lodge',
    capacity: 180,
    currentOccupancy: 160,
    features: ['Balconies', 'Music Practice Rooms', 'Recreation Center'],
    location: 'East Campus',
    averageRating: 4.3
  },
  {
    id: 5,
    name: 'Birch Complex',
    capacity: 220,
    currentOccupancy: 200,
    features: ['Dining Hall', 'Computer Center', 'Community Spaces'],
    location: 'South Campus',
    averageRating: 4.4
  }
];

const DormTransferApplication = () => {
  const [selectedDorms, setSelectedDorms] = useState([]);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleDormRanking = (dormId) => {
    // If dorm is already selected, remove it
    if (selectedDorms.includes(dormId)) {
      setSelectedDorms(selectedDorms.filter(id => id !== dormId));
    } 
    // If less than 5 dorms selected, add the dorm
    else if (selectedDorms.length < 5) {
      setSelectedDorms([...selectedDorms, dormId]);
    }
  };

  const handleSubmitApplication = () => {
    if (selectedDorms.length === 5) {
      setApplicationSubmitted(true);
      // In a real application, you would send this to a backend
      console.log('Submitted Dorm Preferences:', selectedDorms);
    }
  };

  const getRankingColor = (rank) => {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#4169E1', '#228B22'];
    return colors[rank];
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '900px', 
      margin: 'auto', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333' 
      }}>
        Dorm Transfer Application
      </h1>

      {applicationSubmitted ? (
        <div style={{ 
          textAlign: 'center', 
          backgroundColor: '#e6f3e6', 
          padding: '20px', 
          borderRadius: '10px' 
        }}>
          <h2 style={{ color: '#28a745' }}>Application Submitted Successfully!</h2>
          <p>Your dorm transfer preferences have been recorded.</p>
        </div>
      ) : (
        <>
          <div style={{ 
            marginBottom: '20px', 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px' 
          }}>
            <p style={{ margin: 0, textAlign: 'center' }}>
              <strong>Instructions:</strong> Select and rank your top 5 preferred dorms by clicking on them.
              Your current order of selection will determine their ranking.
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {dormData.map((dorm, index) => {
              const dormRank = selectedDorms.indexOf(dorm.id);
              const isSelected = dormRank !== -1;

              return (
                <div 
                  key={dorm.id} 
                  style={{ 
                    border: isSelected 
                      ? `3px solid ${getRankingColor(dormRank)}` 
                      : '1px solid #ddd', 
                    borderRadius: '8px', 
                    padding: '15px', 
                    backgroundColor: isSelected ? '#f0f0f0' : 'white',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => handleDormRanking(dorm.id)}
                >
                  {isSelected && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px', 
                      backgroundColor: getRankingColor(dormRank),
                      color: 'white',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold'
                    }}>
                      {dormRank + 1}
                    </div>
                  )}
                  <h2 style={{ 
                    margin: '0 0 10px 0', 
                    color: '#007bff' 
                  }}>
                    {dorm.name}
                  </h2>
                  <div style={{ 
                    backgroundColor: '#f1f3f5', 
                    padding: '10px', 
                    borderRadius: '4px' 
                  }}>
                    <div><strong>Location:</strong> {dorm.location}</div>
                    <div>
                      <strong>Occupancy:</strong> {dorm.currentOccupancy} / {dorm.capacity}
                    </div>
                    <div><strong>Rating:</strong> {dorm.averageRating}/5.0</div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Features:</strong>
                    <ul style={{ 
                      paddingLeft: '20px', 
                      margin: '5px 0' 
                    }}>
                      {dorm.features.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center' 
          }}>
            <button 
              onClick={handleSubmitApplication}
              disabled={selectedDorms.length !== 5}
              style={{ 
                backgroundColor: selectedDorms.length === 5 ? '#007bff' : '#6c757d', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '5px', 
                fontSize: '16px',
                cursor: selectedDorms.length === 5 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s ease'
              }}
            >
              Submit Application
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DormTransferApplication;