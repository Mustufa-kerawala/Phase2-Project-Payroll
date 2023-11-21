import React, { useState } from 'react'

function PayrollList({staffData, setStaffData}) {
   
    const [editing, setEditing] = useState(null);
    const [newData, setNewData] = useState({});

    if (!staffData || staffData.length === 0) {
        return <div>Loading...</div>;
    }

    const keys = Object.keys(staffData[0]);

    const handleEdit = (index) => {
        setEditing(index);
        setNewData(staffData[index]);
    };

    const handleSave = (index) => {
        const updatedStaffMember = newData;

        fetch(`http://localhost:3001/staff/${updatedStaffMember.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStaffMember),
        })
        .then(response => response.json())
        .then(data => {
            const updatedStaffData = [...staffData];
            updatedStaffData[index] = data;
            setStaffData(updatedStaffData);
            setEditing(null);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    {keys.map((key, i) => <th key={i}>{key}</th>)}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {staffData.map((staffMember, index) => (
                    <tr key={index}>
                        {keys.map((key, i) => 
                            <td key={i}>
                                {editing === index ? 
                                    <input 
                                        value={newData[key]} 
                                        onChange={(e) => setNewData({...newData, [key]: e.target.value})}
                                    /> 
                                    : 
                                    staffMember[key]
                                }
                            </td>
                        )}
                        <td>
                            {editing === index ? 
                                <button onClick={() => handleSave(index)}>Save</button> 
                                : 
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PayrollList;