// Add_Worker.js
import React, { useState } from 'react';
import './Add_Worker.css';
import Layout from './Layout';
import axios from 'axios'; // Don't forget to import axios

const Add_Worker = () => {
  const [workerData, setWorkerData] = useState({
    TC_Identity: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    EmployeeRole: '',
    DepartmentId: '',
  });
  const jwtToken = localStorage.getItem('jwtToken');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for TC_Identity and ensure it contains only digits
    if (name === 'TC_Identity' && !/^\d+$/.test(value)) {
      return;
    }

    setWorkerData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      console.log(updatedData.TC_Identity);
      console.log(updatedData.LastName);
      console.log(updatedData.DepartmentId);
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate TC_Identity has exactly 11 digits
    if (workerData.TC_Identity.length !== 11 || !/^\d+$/.test(workerData.TC_Identity)) {
      alert('TC Kimlik Numarası 11 hane ve sadece rakam olmalıdır.');
      setWorkerData({
        TC_Identity: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        EmployeeRole: '',
        DepartmentId: '',
      });
      return;
    }
  
    // Validate that the "Department" field is selected
    if (!workerData.DepartmentId) {
      alert('Lütfen bir departman seçin.');
      return;
    }
  
    try {
      // Make API request to add worker
      const response = await axios.post(
        'http://localhost:5070/api/workers/add',
        workerData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    
      // Check response status and handle accordingly
      if (response.status === 200) {
        console.log('Worker added successfully');
        // Reset the form or redirect to another page
        setWorkerData({
          TC_Identity: '',
          FirstName: '',
          LastName: '',
          Email: '',
          Password: '',
          EmployeeRole: '',
          DepartmentId: '',
        });
      } else {
        console.error('Error adding worker:', response.data);
        alert('Çalışan eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('API request failed:', error);
    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    
      alert('API isteği başarısız oldu.');
    }
    
  };
  

  return (
    <Layout>
      <div className="add-worker-content">
        <h1>Çalışan Ekle</h1>
        <form onSubmit={handleSubmit}>
          <label>
            TC Identity:
            <input
              type="text"
              name="TC_Identity"
              value={workerData.TC_Identity}
              onChange={handleInputChange}
              maxLength="11"
            />
          </label>
          <label>
            İsim:
            <input
              type="text"
              name="FirstName"
              value={workerData.FirstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Soyad:
            <input
              type="text"
              name="LastName"
              value={workerData.LastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={workerData.Email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Şifre:
            <input
              type="password"
              name="Password"
              value={workerData.Password}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Çalışan Rolü:
            <select
              name="EmployeeRole"
              value={workerData.EmployeeRole}
              onChange={handleInputChange}
            >
              <option value="">Rol Seç</option>
              <option value="Çalışan">Çalışan</option>
              <option value="Şef">Şef</option>
              <option value="HR">HR</option>
              <option value="Müdür">Müdür</option>
            </select>
          </label>
          <label>
            Departman:
            <select
              name="DepartmentId"
              value={workerData.DepartmentId}
              onChange={handleInputChange}
            >
              <option value="">Departman Seç</option>
              <option value="1">Numune</option>
              <option value="2">Dikim</option>
              <option value="3">Kalite-paket</option>
              <option value="4">Kesim</option>
              <option value="5">İK</option>
            </select>
          </label>
          <button type="submit">Add Worker</button>
        </form>
      </div>
    </Layout>
  );
};

export default Add_Worker;
