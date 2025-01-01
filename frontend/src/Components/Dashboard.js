import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [studentForeginId, setStudentForeginId] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/dashboard/getDocuments/${studentForeginId || '1'}`);
        setDocuments(response.data.documents);
      } catch (error) {
        console.error('Error fetching the documents',error);
      }
    };

    if (studentForeginId) {
      fetchDocuments();
    }
  }, [studentForeginId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',file);
    formData.append('documentType',documentType);
    formData.append('studentForeginId',studentForeginId);

    try {
      const response = await axios.post(`http://localhost:8080/dashboard/uploads/${documentType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully: ',response.data);
      setDocuments([...documents, response.data.data]);
    } catch(error){
      console.error('Error uploading the document:',error);
    }
  };

  return(
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label>Student Foregin ID:</label>
          <input
          type='text'
          value={studentForeginId}
          onChange={(e) => setStudentForeginId(e.target.value)}
          required 
          />
        </div>
        <div>
          <label>Document Type:</label>
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
            <option value='result_12th'>12th Result</option>
            <option value='aadharCard'>Aadhar Card</option>
            <option value='panCard'>PAN Card</option>
            <option value='mhtcetResult'>MHT-CET Result</option>
            <option value='admissionCard'>Admission Card</option>
            <option value='capCard'>CAP Card</option>
            <option value='domicile'>Domicile</option>
            <option value='birthCertificate'>Birth Certificate</option>
            <option value='leavingCertificate'>Leaving Certificate</option>
          </select>
        </div>
        <div>
          <label>File: </label>
          <input type='file' onChange={handleFileChange} required />
        </div>
        <button type='submit'>Upload</button>
      </form>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            {doc.documentType}: <a href={`http://localhost:8080/${doc.filePath}`} target='_blank' rel='noopener noreferrer'> View </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard