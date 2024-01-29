import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField
} from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

function AddIssueForm() {
    const [issue, setIssue] = useState({
        auto_id: '',
        opis: '',
        priorytet: false
    });
    const [pojazdy, setPojazdy] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_pojazdy', config);
            setPojazdy(response.data.pojazdy);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych o pojazdach:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setIssue({
            ...issue,
            [name]: name === 'priorytet' ? checked : value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const config = {
            headers: { Authorization: `Bearer ${token}` } // Użyj rzeczywistego tokena
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/add_issue', issue, config);
            if (response.data) {
                alert('Usterka została pomyślnie zgłoszona.');
                // Tutaj możesz dodać przekierowanie lub inne akcje po udanym zgłoszeniu
            }
        } catch (error) {
            console.error(error);
            alert('Błąd podczas zgłaszania usterki.');
        }
    };

    return (
        <>
            <Navbar/>

            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    Zgłoś Usterkę
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>ID Auta</InputLabel>
                        <Select
                            value={issue.auto_id}
                            onChange={handleChange}
                            label="ID Auta"
                            name="auto_id"
                        >
                            {pojazdy.map(pojazd => (
                                <MenuItem key={pojazd.id} value={pojazd.id}>
                                    {`${pojazd.model}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Opis"
                        name="opis"
                        multiline
                        rows={4}
                        value={issue.opis}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Switch checked={issue.priorytet} onChange={handleChange} name="priorytet"/>}
                        label="Priorytet"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Zgłoś
                    </Button>
                </form>
            </Container>
        </>
    );
}

export default AddIssueForm;
