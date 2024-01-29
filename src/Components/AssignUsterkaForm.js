import React, { useState, useEffect } from 'react';
import { Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

const AssignUsterkaForm = () => {
    const [usterkaId, setUsterkaId] = useState('');
    const [zespolId, setZespolId] = useState('');
    const [usterki, setUsterki] = useState([]);
    const [zespoły, setZespoły] = useState([]);

    useEffect(() => {
        getUsterki();
        getZespoły();
    }, []);

    const getUsterki = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_usterki', config);
            setUsterki(response.data.usterki);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu usterek:', error);
        }
    };

    const getZespoły = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://127.0.0.1:5000/api/get_zespoly', config);
            const teamsData = response.data.zespoly;
            const transformedTeams = Object.keys(teamsData).map(key => {
                return {
                    nazwa: key,
                    id: teamsData[key].id_zespolu
                };
            });
            setZespoły(transformedTeams);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu zespołów:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { usterka_id: usterkaId, zespol_id: zespolId };

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.post('http://127.0.0.1:5000/api/assign_usterka_to_zespol', data, config);

            console.log(response.data); // Tylko do celów demonstracyjnych
        } catch (error) {
            console.error('Wystąpił błąd przy przesyłaniu danych:', error);
        }
    };


    return (
        <>
            <Navbar/>
        <Paper style={{ padding: 16 }}>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>ID Usterki</InputLabel>
                    <Select
                        value={usterkaId}
                        onChange={(e) => setUsterkaId(e.target.value)}
                        label="ID Usterki"
                    >
                        {usterki.map(usterka => (
                            <MenuItem key={usterka.id} value={usterka.id}>
                                {`Usterka ${usterka.id}: ${usterka.opis}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>ID Zespołu</InputLabel>
                    <Select
                        value={zespolId}
                        onChange={(e) => setZespolId(e.target.value)}
                        label="ID Zespołu"
                    >
                        {zespoły.map(zespol => (
                            <MenuItem key={zespol.id} value={zespol.id}>
                                {zespol.nazwa}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Przypisz Usterkę do Zespołu
                </Button>
            </form>
        </Paper>
        </>

    );
};

export default AssignUsterkaForm;
