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

};

export default Dashboard