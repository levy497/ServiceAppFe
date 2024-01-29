import React, {useState, useEffect} from 'react';
import {TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@mui/material';
import Navbar from "./Navbar";
import axios from "axios";

const CarManagement = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState({
        rejestracja: '',
        nazwa_modelu: '',
        parametry_techniczne: '',
        rocznik: '',
        uwagi: ''
    });

    useEffect(() => {
        fetchCars();
    }, []);
    const fetchCars = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/get_all_pojazdy', config);
            setCars(response.data.pojazdy);
        } catch (error) {
            console.error('Wystąpił błąd przy pobieraniu danych o pojazdach:', error);
        }
    };

    const handleInputChange = (e) => {
        setSelectedCar({...selectedCar, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const url = selectedCar.id
            ? `http://127.0.0.1:5000/api/update_car/${selectedCar.id}`
            : `http://127.0.0.1:5000/api/add_pojazd`;

        try {
             selectedCar.id
                ? await axios.put(url, selectedCar, config)
                : await axios.post(url, selectedCar, config);

            fetchCars(); // Odśwież listę pojazdów po aktualizacji/dodaniu
        } catch (error) {
            console.error('Wystąpił błąd przy aktualizacji/dodawaniu pojazdu:', error);
            // Możesz tutaj dodać informację zwrotną dla użytkownika
        }
    };

    const handleEdit = (car) => {
        setSelectedCar(car);
    };
    const handleDelete = async (carId) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        try {
            await axios.delete(`http://127.0.0.1:5000/api/delete_pojazd/${carId}`, config);
            fetchCars(); // Odśwież listę pojazdów po usunięciu
        } catch (error) {
            console.error('Wystąpił błąd przy usuwaniu pojazdu:', error);
        }
    };

    return (
        <>
            <Navbar/>


            <Paper style={{padding: 16}}>
                <form onSubmit={handleSubmit}>
                    <TextField name="rejestracja" label="Rejestracja" value={selectedCar.rejestracja}
                               onChange={handleInputChange}/>
                    <TextField name="nazwa_modelu" label="Nazwa modelu" value={selectedCar.nazwa_modelu}
                               onChange={handleInputChange}/>
                    <TextField name="parametry_techniczne" label="Parametry techniczne"
                               value={selectedCar.parametry_techniczne} onChange={handleInputChange}/>
                    <TextField name="rocznik" label="Rocznik" value={selectedCar.rocznik} onChange={handleInputChange}/>
                    <TextField name="uwagi" label="Uwagi" value={selectedCar.uwagi} onChange={handleInputChange}/>
                    <Button type="submit">Zapisz</Button>
                </form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rejestracja</TableCell>
                            <TableCell>Nazwa Modelu</TableCell>
                            <TableCell>Parametry Techniczne</TableCell>
                            <TableCell>Rocznik</TableCell>
                            <TableCell>Uwagi</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.rejestracja}</TableCell>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car['parametry techniczne']}</TableCell>
                                <TableCell>{car.rocznik}</TableCell>
                                <TableCell>{car.uwagi}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(car)}>Edytuj</Button>
                                    <Button onClick={() => handleDelete(car.id)}>Usuń</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default CarManagement;
