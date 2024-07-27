// src/components/DocumentForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import axios from 'axios';
import './DocumentForm.css';

const DocumentForm = ({ documentData, onSave, onClose }) => {
  const [name, setName] = useState(documentData ? documentData.name : '');
  const [type, setType] = useState(documentData ? documentData.type : '');
  const [caseId, setCaseId] = useState(documentData ? documentData.case : '');
  const [url, setUrl] = useState(documentData ? documentData.url : '');
  const [cases, setCases] = useState([]);

  useEffect(() => {
    if (documentData) {
      setName(documentData.name);
      setType(documentData.type);
      setCaseId(documentData.case);
      setUrl(documentData.url);
    }
    fetchCases();
  }, [documentData]);

  const fetchCases = async () => {
    try {
      const response = await axios.get('/api/cases');
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDocumentData = { name, type, case: caseId, url };
    onSave(newDocumentData);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{documentData ? 'Edit Document' : 'Add New Document'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Case"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                fullWidth
                required
              >
                {cases.map((caseItem) => (
                  <MenuItem key={caseItem._id} value={caseItem._id}>
                    {caseItem.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="secondary">Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentForm;
