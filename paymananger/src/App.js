import './App.css';
import PayrollList from './Components/PayrollList';
import React, {useEffect, useState} from 'react';

function App() {

  // Holding all staff data in state for now
  const [staff, setStaff] = useState([]);

  // Getting all data for staff members from API
  const getStaff = () => {
    fetch('http://localhost:3001/staff')
    .then(response => response.json())
    .then(data => setStaff(data));
  }

  useEffect(() => {
    getStaff();
  }, []);


  


  return (
    <div className="App">
      <h1>Payroll Manager</h1>
      <PayrollList staffData={staff}/>
    </div>
  );
}

export default App;
