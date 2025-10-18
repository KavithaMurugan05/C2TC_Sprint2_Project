import React from 'react';
import './MallList.css';

const MallList = ({ malls, fetchMalls, setEditingMall }) => {
  const handleDelete = async (id) => {
    try {
      // DELETE request to the Mall service
      await fetch(`http://localhost:8080/mall/${id}`, { method: 'DELETE' });
      fetchMalls();
    } catch (error) {
      console.error('Error deleting mall:', error);
    }
  };

  return (
    <div className="mall-list-container">
      <h2>Mall Staff Records</h2>
      {malls.length === 0 ? (
        <p className="no-data">No mall records available.</p>
      ) : (
        <div className="mall-grid">
          {malls.map((mall) => (
            // Using mall.id for the key
            <div key={mall.id} className="mall-card">
              <div className="mall-details">
                {/* Displaying General Manager as the primary title */}
                <h3>{mall.generalmanager} (GM)</h3>
                <p><strong>ID:</strong> {mall.id}</p>
                <p><strong>Parking Attendant:</strong> {mall.parkingAttendant}</p>
                <p><strong>Customer Service:</strong> {mall.customerservice}</p>
                <p><strong>Store Manager:</strong> {mall.storeManager}</p>
                <p><strong>Security Officer:</strong> {mall.securityOfficer}</p>
                <p><strong>Maintenance Technician:</strong> {mall.maintenanceTechnician}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingMall(mall)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(mall.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MallList;