import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Navbar from "./Navbar";

function DataActionsTable() {
    const [usterki, setUsterki] = useState([]);

    useEffect(() => {
        fetchUsterki();
    }, []);

    const fetchUsterki = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_usterki', config);
            setUsterki(response.data.usterki);
        } catch (error) {
            console.error('Błąd podczas pobierania danych o usterekach:', error);
        }
    };

    // ... Funkcje handleDelete, handleUpdate, handleAssignIssue

    return (
        <>
            <Navbar/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Usterki</TableCell>
                            <TableCell>Opis</TableCell>
                            <TableCell>Priorytet</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Użytkownik</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usterki.map((usterka) => (
                            <TableRow key={usterka.id}>
                                <TableCell>{usterka.id}</TableCell>
                                <TableCell>{usterka.opis}</TableCell>
                                <TableCell>{usterka.priorytet ? 'Tak' : 'Nie'}</TableCell>
                                <TableCell>{usterka.status}</TableCell>
                                <TableCell>{`${usterka.uzytkownik.imie} ${usterka.uzytkownik.nazwisko}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default DataActionsTable;
