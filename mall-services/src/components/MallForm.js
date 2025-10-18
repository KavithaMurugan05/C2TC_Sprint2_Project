import React, { useState, useEffect } from 'react';
import './MallForm.css';

const MallForm = ({ fetchMalls, editingMall, setEditingMall }) => {
  // State variables for Mall entity fields
  const [id, setId] = useState('');
  const [generalmanager, setGeneralManager] = useState('');
  const [parkingAttendant, setParkingAttendant] = useState('');
  const [customerservice, setCustomerService] = useState('');
  const [storeManager, setStoreManager] = useState('');
  const [securityOfficer, setSecurityOfficer] = useState('');
  const [maintenanceTechnician, setMaintenanceTechnician] = useState('');

  useEffect(() => {
    if (editingMall) {
      // Populate form when editing an existing mall
      setId(editingMall.id || '');
      setGeneralManager(editingMall.generalmanager || '');
      setParkingAttendant(editingMall.parkingAttendant || '');
      setCustomerService(editingMall.customerservice || '');
      setStoreManager(editingMall.storeManager || '');
      setSecurityOfficer(editingMall.securityOfficer || '');
      setMaintenanceTechnician(editingMall.maintenanceTechnician || '');
    } else {
      // Clear form for adding a new mall
      setId('');
      setGeneralManager('');
      setParkingAttendant('');
      setCustomerService('');
      setStoreManager('');
      setSecurityOfficer('');
      setMaintenanceTechnician('');
    }
  }, [editingMall]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create the mall object to send to the backend
    const mall = { 
        id: id ? Number(id) : null, // Ensure ID is a number
        generalmanager, 
        parkingAttendant, 
        customerservice, 
        storeManager, 
        securityOfficer, 
        maintenanceTechnician 
    };

    try {
      if (editingMall) {
        // PUT request for updating
        await fetch(`http://localhost:8080/mall/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mall),
        });
      } else {
        // POST request for adding a new mall
        await fetch('http://localhost:8080/mall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mall),
        });
      }

      // Refresh the list, exit editing mode, and clear the form
      fetchMalls();
      setEditingMall(null);
      setId('');
      setGeneralManager('');
      setParkingAttendant('');
      setCustomerService('');
      setStoreManager('');
      setSecurityOfficer('');
      setMaintenanceTechnician('');

    } catch (error) {
      console.error('Error saving mall:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingMall ? 'Edit Mall Record' : 'Add New Mall Record'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Mall ID"
          required
          // Disable ID field when editing, as the ID is immutable
          disabled={!!editingMall} 
        />
        <input
          type="text"
          value={generalmanager}
          onChange={(e) => setGeneralManager(e.target.value)}
          placeholder="General Manager"
          required
        />
        <input
          type="text"
          value={parkingAttendant}
          onChange={(e) => setParkingAttendant(e.target.value)}
          placeholder="Parking Attendant"
          required
        />
        <input
          type="text"
          value={customerservice}
          onChange={(e) => setCustomerService(e.target.value)}
          placeholder="Customer Service Rep"
          required
        />
        <input
          type="text"
          value={storeManager}
          onChange={(e) => setStoreManager(e.target.value)}
          placeholder="Store Manager"
          required
        />
        <input
          type="text"
          value={securityOfficer}
          onChange={(e) => setSecurityOfficer(e.target.value)}
          placeholder="Security Officer"
          required
        />
        <input
          type="text"
          value={maintenanceTechnician}
          onChange={(e) => setMaintenanceTechnician(e.target.value)}
          placeholder="Maintenance Technician"
          required
        />
        <button type="submit">{editingMall ? 'Update Record' : 'Add Record'}</button>
        {editingMall && (
          <button type="button" onClick={() => setEditingMall(null)} className="cancel-btn">
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default MallForm;